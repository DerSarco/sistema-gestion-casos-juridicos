import { randomUUID } from "node:crypto";
import type { PrismaClient } from "@/generated/prisma/client";
import { getPrismaClient } from "@/infrastructure/prisma/prisma-client";
import {
  AUTHORIZATION_TEMPLATE,
  AUTHORIZATION_TEMPLATE_VERSION,
  type AuthorizationDocumentItem,
  type AuthorizationSnapshot,
} from "@/modules/authorizations/template";

type Database = Pick<PrismaClient, "authorizationDocument" | "client" | "study" | "auditEvent" | "$transaction">;

function mapDocument(record: {
  id: string; clientId: string; folio: string; templateVersion: string;
  status: AuthorizationDocumentItem["status"]; deliveredAt: Date | null;
  signedAt: Date | null; revokedAt: Date | null; archiveReference: string | null;
  createdAt: Date;
}): AuthorizationDocumentItem {
  return {
    ...record,
    deliveredAt: record.deliveredAt?.toISOString() ?? null,
    signedAt: record.signedAt?.toISOString() ?? null,
    revokedAt: record.revokedAt?.toISOString() ?? null,
    createdAt: record.createdAt.toISOString(),
  };
}

const selection = {
  id: true, clientId: true, folio: true, templateVersion: true, status: true,
  deliveredAt: true, signedAt: true, revokedAt: true, archiveReference: true,
  createdAt: true,
} as const;

export class PrismaAuthorizationRepository {
  constructor(private readonly database: Database, private readonly studyId: string) {}

  async generate(clientId: string, actorId: string): Promise<AuthorizationDocumentItem | null> {
    const client = await this.database.client.findFirst({
      where: { id: clientId, studyId: this.studyId },
      select: { displayName: true, rutNormalized: true, phone: true, email: true },
    });
    const study = await this.database.study.findFirst({ where: { id: this.studyId }, select: { name: true } });
    if (!client || !study) return null;
    const now = new Date();
    const folio = `AUT-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`;
    const snapshot: AuthorizationSnapshot = {
      client,
      studyName: study.name,
      template: AUTHORIZATION_TEMPLATE,
      generatedAt: now.toISOString(),
    };
    return this.database.$transaction(async (transaction) => {
      const record = await transaction.authorizationDocument.create({
        data: { studyId: this.studyId, clientId, generatedById: actorId, folio, templateVersion: AUTHORIZATION_TEMPLATE_VERSION, snapshot },
        select: selection,
      });
      await transaction.auditEvent.create({
        data: { studyId: this.studyId, actorId, entityType: "AUTHORIZATION_DOCUMENT", entityId: record.id, action: "AUTHORIZATION_GENERATED", protectedValue: { clientId, folio, templateVersion: AUTHORIZATION_TEMPLATE_VERSION } },
      });
      return mapDocument(record);
    });
  }

  async listForClient(clientId: string): Promise<AuthorizationDocumentItem[]> {
    const records = await this.database.authorizationDocument.findMany({
      where: { clientId, studyId: this.studyId }, orderBy: { createdAt: "desc" }, select: selection,
    });
    return records.map(mapDocument);
  }

  async findPrintable(id: string): Promise<{ document: AuthorizationDocumentItem; snapshot: AuthorizationSnapshot } | null> {
    const record = await this.database.authorizationDocument.findFirst({
      where: { id, studyId: this.studyId }, select: { ...selection, snapshot: true },
    });
    if (!record) return null;
    return { document: mapDocument(record), snapshot: record.snapshot as unknown as AuthorizationSnapshot };
  }

  async updateStatus(id: string, clientId: string, actorId: string, status: AuthorizationDocumentItem["status"], archiveReference: string): Promise<boolean> {
    const current = await this.database.authorizationDocument.findFirst({ where: { id, clientId, studyId: this.studyId }, select: { id: true } });
    if (!current) return false;
    const now = new Date();
    await this.database.$transaction(async (transaction) => {
      await transaction.authorizationDocument.update({
        where: { id_studyId: { id, studyId: this.studyId } },
        data: {
          status,
          updatedById: actorId,
          archiveReference: archiveReference || null,
          deliveredAt: status === "DELIVERED" || status === "SIGNED" ? now : undefined,
          signedAt: status === "SIGNED" ? now : null,
          revokedAt: status === "REVOKED" ? now : null,
        },
      });
      await transaction.auditEvent.create({
        data: { studyId: this.studyId, actorId, entityType: "AUTHORIZATION_DOCUMENT", entityId: id, action: "AUTHORIZATION_STATUS_CHANGED", protectedValue: { status, hasArchiveReference: Boolean(archiveReference) } },
      });
    });
    return true;
  }
}

export function createPrismaAuthorizationRepository(studyId: string): PrismaAuthorizationRepository {
  return new PrismaAuthorizationRepository(getPrismaClient(), studyId);
}
