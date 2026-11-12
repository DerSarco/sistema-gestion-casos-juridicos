import { CatalogType, type PrismaClient } from "@/generated/prisma/client";
import { getPrismaClient } from "@/infrastructure/prisma/prisma-client";
import type {
  CaseLifecycle,
  PersistentCase,
  PersistentCaseInput,
} from "@/modules/cases/domain/persistent-case";

type Database = Pick<
  PrismaClient,
  | "legalCase"
  | "client"
  | "catalogValue"
  | "user"
  | "auditEvent"
  | "$transaction"
>;

const includeCase = {
  client: { select: { displayName: true } },
  matter: { select: { name: true } },
  stage: { select: { name: true } },
  participations: {
    where: { primary: true, endedAt: null },
    include: { participant: { select: { displayName: true } } },
  },
} as const;

type CaseRecord = Awaited<ReturnType<PrismaCaseRepository["findRecord"]>>;

export class PrismaCaseRepository {
  constructor(
    private readonly database: Database,
    private readonly studyId: string,
  ) {}

  async findRecord(idOrCode: string) {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        idOrCode,
      );
    return this.database.legalCase.findFirst({
      where: {
        studyId: this.studyId,
        ...(isUuid ? { id: idOrCode } : { internalCode: idOrCode }),
      },
      include: includeCase,
    });
  }

  private map(record: NonNullable<CaseRecord>): PersistentCase {
    const primary = record.participations[0];
    return {
      id: record.id,
      internalCode: record.internalCode,
      clientId: record.clientId,
      clientName: record.client.displayName,
      matterId: record.matterId,
      matter: record.matter.name,
      stageId: record.stageId,
      stage: record.stage.name,
      title: record.title,
      lifecycleStatus: record.lifecycleStatus,
      responsibleId: primary?.participantId ?? "",
      responsible: primary?.participant.displayName ?? "Sin responsable",
      court: record.court,
      rit: record.rit,
      judicialRole: record.judicialRole,
      notes: record.notes,
      lifecycleReason: record.lifecycleReason,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    };
  }

  async list(): Promise<PersistentCase[]> {
    const records = await this.database.legalCase.findMany({
      where: { studyId: this.studyId },
      include: includeCase,
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    });
    return records.map((record) => this.map(record));
  }

  async findByIdOrCode(idOrCode: string): Promise<PersistentCase | null> {
    const record = await this.findRecord(idOrCode);
    return record ? this.map(record) : null;
  }

  async formOptions() {
    const [clients, catalogs, users] = await Promise.all([
      this.database.client.findMany({
        where: { studyId: this.studyId, status: "ACTIVE" },
        select: { id: true, displayName: true },
        orderBy: { displayName: "asc" },
      }),
      this.database.catalogValue.findMany({
        where: {
          studyId: this.studyId,
          active: true,
          type: { in: [CatalogType.MATTER, CatalogType.STAGE] },
        },
        select: { id: true, type: true, name: true, code: true },
        orderBy: { sortOrder: "asc" },
      }),
      this.database.user.findMany({
        where: { studyId: this.studyId, status: "ACTIVE" },
        select: { id: true, displayName: true },
        orderBy: { displayName: "asc" },
      }),
    ]);
    return {
      clients,
      matters: catalogs.filter((item) => item.type === CatalogType.MATTER),
      stages: catalogs.filter((item) => item.type === CatalogType.STAGE),
      users,
    };
  }

  async save(
    id: string | null,
    input: PersistentCaseInput,
    actorId: string,
  ): Promise<PersistentCase> {
    const options = await this.formOptions();
    if (!options.clients.some((item) => item.id === input.clientId))
      throw new Error("El cliente no está activo o no pertenece al estudio.");
    if (
      !options.matters.some((item) => item.id === input.matterId) ||
      !options.stages.some((item) => item.id === input.stageId)
    )
      throw new Error("La materia o etapa no pertenece al estudio.");
    if (!options.users.some((item) => item.id === input.responsibleId))
      throw new Error("El responsable no pertenece al estudio.");

    const record = await this.database.$transaction(async (tx) => {
      const defaults = await Promise.all([
        tx.catalogValue.findFirstOrThrow({
          where: {
            studyId: this.studyId,
            type: CatalogType.CASE_NATURE,
            code: "INDIVIDUAL",
          },
        }),
        tx.catalogValue.findFirstOrThrow({
          where: {
            studyId: this.studyId,
            type: CatalogType.CASE_STATUS,
            code: "ENTERED",
          },
        }),
        tx.catalogValue.findFirstOrThrow({
          where: {
            studyId: this.studyId,
            type: CatalogType.PARTICIPATION_ROLE,
            code: "PRIMARY",
          },
        }),
      ]);
      const common = {
        clientId: input.clientId,
        matterId: input.matterId,
        stageId: input.stageId,
        title: input.title,
        court: input.court || null,
        rit: input.rit || null,
        judicialRole: input.judicialRole || null,
        notes: input.notes || null,
      };
      const legalCase = id
        ? await tx.legalCase.update({
            where: { id_studyId: { id, studyId: this.studyId } },
            data: common,
          })
        : await tx.legalCase.create({
            data: {
              ...common,
              studyId: this.studyId,
              natureId: defaults[0].id,
              statusId: defaults[1].id,
              lifecycleStatus: "ACTIVE",
              internalCode: `CASO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
            },
          });
      await tx.caseParticipation.updateMany({
        where: {
          caseId: legalCase.id,
          studyId: this.studyId,
          primary: true,
          endedAt: null,
        },
        data: {
          endedAt: new Date(),
          reason: "Cambio de responsable principal",
        },
      });
      await tx.caseParticipation.create({
        data: {
          studyId: this.studyId,
          caseId: legalCase.id,
          participantId: input.responsibleId,
          roleId: defaults[2].id,
          assignedById: actorId,
          primary: true,
        },
      });
      await tx.auditEvent.create({
        data: {
          studyId: this.studyId,
          caseId: legalCase.id,
          actorId,
          entityType: "LEGAL_CASE",
          entityId: legalCase.id,
          action: id ? "CASE_UPDATED" : "CASE_CREATED",
          protectedValue: { lifecycleStatus: legalCase.lifecycleStatus },
        },
      });
      return legalCase;
    });
    const result = await this.findByIdOrCode(record.id);
    if (!result) throw new Error("No fue posible recuperar el caso guardado.");
    return result;
  }

  async changeLifecycle(
    id: string,
    target: CaseLifecycle,
    reason: string,
    actorId: string,
  ): Promise<PersistentCase | null> {
    const current = await this.findByIdOrCode(id);
    if (!current) return null;
    await this.database.$transaction(async (tx) => {
      await tx.legalCase.update({
        where: { id_studyId: { id: current.id, studyId: this.studyId } },
        data: {
          lifecycleStatus: target,
          lifecycleChangedAt: new Date(),
          lifecycleChangedById: actorId,
          lifecycleReason: reason,
        },
      });
      await tx.auditEvent.create({
        data: {
          studyId: this.studyId,
          caseId: current.id,
          actorId,
          entityType: "LEGAL_CASE",
          entityId: current.id,
          action: target === "ARCHIVED" ? "CASE_ARCHIVED" : "CASE_REACTIVATED",
          reason,
          protectedValue: { from: current.lifecycleStatus, to: target },
        },
      });
    });
    return this.findByIdOrCode(current.id);
  }

  async changeStage(id: string, stageId: string, reason: string, actorId: string): Promise<PersistentCase | null> {
    const current = await this.findByIdOrCode(id);
    const stage = await this.database.catalogValue.findFirst({ where: { id: stageId, studyId: this.studyId, type: CatalogType.STAGE, active: true } });
    if (!current || !stage) return null;
    await this.database.$transaction(async (tx) => {
      await tx.legalCase.update({ where: { id_studyId: { id: current.id, studyId: this.studyId } }, data: { stageId } });
      await tx.auditEvent.create({ data: { studyId: this.studyId, caseId: current.id, actorId, entityType: "LEGAL_CASE", entityId: current.id, action: "CASE_STAGE_CHANGED", reason: reason || null, protectedValue: { from: current.stageId, to: stageId } } });
    });
    return this.findByIdOrCode(current.id);
  }
}

export function createPrismaCaseRepository(studyId: string) {
  return new PrismaCaseRepository(getPrismaClient(), studyId);
}
