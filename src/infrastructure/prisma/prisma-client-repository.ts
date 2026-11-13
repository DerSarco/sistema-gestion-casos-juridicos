import type { PrismaClient } from "@/generated/prisma/client";
import { getPrismaClient } from "@/infrastructure/prisma/prisma-client";
import type { ClientListFilters, ClientRepository } from "@/modules/clients/application/client-repository";
import type { Client, ClientInput, ClientStatus } from "@/modules/clients/domain/client";

type Database = Pick<PrismaClient, "client" | "auditEvent" | "$transaction">;
const clientSelection = { id: true, displayName: true, rutNormalized: true, phone: true, email: true, originMatter: true, status: true, statusChangedAt: true, statusReason: true, createdAt: true, updatedAt: true } as const;
type ClientRecord = { id: string; displayName: string; rutNormalized: string; phone: string; email: string | null; originMatter: string; status: ClientStatus; statusChangedAt: Date | null; statusReason: string | null; createdAt: Date; updatedAt: Date };

function mapClient(record: ClientRecord): Client {
  return { ...record, statusChangedAt: record.statusChangedAt?.toISOString() ?? null, createdAt: record.createdAt.toISOString(), updatedAt: record.updatedAt.toISOString() };
}

export class PrismaClientRepository implements ClientRepository {
  constructor(private readonly database: Database, private readonly studyId: string) {}

  async list(filters: ClientListFilters = {}): Promise<Client[]> {
    const query = filters.query?.trim();
    const records = await this.database.client.findMany({
      where: {
        studyId: this.studyId,
        ...(filters.status && filters.status !== "ALL" ? { status: filters.status } : {}),
        ...(query ? { OR: [
          { displayName: { contains: query, mode: "insensitive" } },
          { rutNormalized: { contains: query.replace(/[^0-9Kk]/g, "").toUpperCase() } },
          { phone: { contains: query.replace(/[\s()-]/g, "") } },
          { email: { contains: query, mode: "insensitive" } },
          { originMatter: { contains: query, mode: "insensitive" } },
        ] } : {}),
      },
      orderBy: [{ displayName: "asc" }, { id: "asc" }],
      select: clientSelection,
    });
    return records.map((record) => mapClient(record as ClientRecord));
  }

  async findById(id: string): Promise<Client | null> {
    const record = await this.database.client.findFirst({ where: { id, studyId: this.studyId }, select: clientSelection });
    return record ? mapClient(record as ClientRecord) : null;
  }

  async create(input: ClientInput, actorId: string): Promise<Client> {
    return this.database.$transaction(async (transaction) => {
      const record = await transaction.client.create({ data: { studyId: this.studyId, displayName: input.displayName, rutNormalized: input.rut, phone: input.phone, email: input.email || null, originMatter: input.originMatter }, select: clientSelection });
      await transaction.auditEvent.create({ data: { studyId: this.studyId, actorId, entityType: "CLIENT", entityId: record.id, action: "CLIENT_CREATED", protectedValue: { status: "ACTIVE" } } });
      return mapClient(record as ClientRecord);
    });
  }

  async update(id: string, input: ClientInput, actorId: string): Promise<Client | null> {
    const current = await this.findById(id);
    if (!current) return null;
    return this.database.$transaction(async (transaction) => {
      const record = await transaction.client.update({ where: { id_studyId: { id, studyId: this.studyId } }, data: { displayName: input.displayName, rutNormalized: input.rut, phone: input.phone, email: input.email || null, originMatter: input.originMatter }, select: clientSelection });
      await transaction.auditEvent.create({ data: { studyId: this.studyId, actorId, entityType: "CLIENT", entityId: id, action: "CLIENT_UPDATED", protectedValue: { contactChanged: current.phone !== input.phone || current.email !== (input.email || null) } } });
      return mapClient(record as ClientRecord);
    });
  }

  async changeStatus(id: string, status: ClientStatus, reason: string, actorId: string): Promise<Client | null> {
    const current = await this.findById(id);
    if (!current) return null;
    return this.database.$transaction(async (transaction) => {
      const record = await transaction.client.update({ where: { id_studyId: { id, studyId: this.studyId } }, data: { status, statusChangedAt: new Date(), statusChangedById: actorId, statusReason: reason }, select: clientSelection });
      await transaction.auditEvent.create({ data: { studyId: this.studyId, actorId, entityType: "CLIENT", entityId: id, action: status === "INACTIVE" ? "CLIENT_DEACTIVATED" : "CLIENT_REACTIVATED", reason, protectedValue: { from: current.status, to: status } } });
      return mapClient(record as ClientRecord);
    });
  }
}

export function createPrismaClientRepository(studyId: string): PrismaClientRepository {
  return new PrismaClientRepository(getPrismaClient(), studyId);
}
