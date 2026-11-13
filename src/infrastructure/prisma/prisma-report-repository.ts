import type { PrismaClient } from "@/generated/prisma/client";
import { getPrismaClient } from "@/infrastructure/prisma/prisma-client";
import type {
  CountRow,
  ExportCaseRow,
  ReportSummary,
  WorkloadRow,
} from "@/modules/reports/domain/report";

type Database = Pick<PrismaClient, "legalCase" | "auditEvent">;

function reportInclude(now: Date) {
  return {
  matter: { select: { name: true } },
  stage: { select: { name: true } },
  businessStatus: { select: { name: true } },
  participations: {
    where: { endedAt: null, primary: true },
    include: { participant: { select: { displayName: true } } },
  },
  relevantDates: {
    where: { occursAt: { gte: now } },
    select: { occursAt: true },
    orderBy: { occursAt: "asc" as const },
    take: 1,
  },
  } as const;
}

type ReportRecord = Awaited<
  ReturnType<PrismaReportRepository["findScopedCases"]>
>[number];

function countBy(
  records: ReportRecord[],
  label: (record: ReportRecord) => string,
): CountRow[] {
  const counts = new Map<string, number>();
  for (const record of records) {
    const value = label(record);
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ label: value, count }))
    .sort((left, right) =>
      left.label.localeCompare(right.label, "es-CL"),
    );
}

export class PrismaReportRepository {
  constructor(
    private readonly database: Database,
    private readonly studyId: string,
  ) {}

  async findScopedCases() {
    return this.database.legalCase.findMany({
      where: { studyId: this.studyId },
      include: reportInclude(new Date()),
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    });
  }

  async summary(): Promise<ReportSummary> {
    const records = await this.findScopedCases();
    const workload = new Map<string, WorkloadRow>();
    for (const record of records) {
      const primary = record.participations[0];
      const responsibleId = primary?.participantId ?? "unassigned";
      const current = workload.get(responsibleId) ?? {
        responsibleId,
        responsible: primary?.participant.displayName ?? "Sin responsable",
        activeCases: 0,
        archivedCases: 0,
        totalCases: 0,
      };
      current.totalCases += 1;
      if (record.lifecycleStatus === "ARCHIVED") current.archivedCases += 1;
      else current.activeCases += 1;
      workload.set(responsibleId, current);
    }
    return {
      totalCases: records.length,
      activeCases: records.filter(
        (record) => record.lifecycleStatus !== "ARCHIVED",
      ).length,
      archivedCases: records.filter(
        (record) => record.lifecycleStatus === "ARCHIVED",
      ).length,
      workload: [...workload.values()].sort(
        (left, right) =>
          right.activeCases - left.activeCases ||
          left.responsible.localeCompare(right.responsible, "es-CL"),
      ),
      byStage: countBy(records, (record) => record.stage.name),
      byStatus: countBy(records, (record) => record.businessStatus.name),
    };
  }

  async exportRows(actorId: string): Promise<ExportCaseRow[]> {
    const records = await this.findScopedCases();
    const rows = records.map((record) => ({
      internalCode: record.internalCode,
      matter: record.matter.name,
      stage: record.stage.name,
      status: record.businessStatus.name,
      lifecycle:
        record.lifecycleStatus === "ARCHIVED"
          ? ("Archivado" as const)
          : ("Activo" as const),
      responsible:
        record.participations[0]?.participant.displayName ?? "Sin responsable",
      nextRelevantDate:
        record.relevantDates[0]?.occursAt.toISOString() ?? "",
    }));
    await this.database.auditEvent.create({
      data: {
        studyId: this.studyId,
        actorId,
        entityType: "REPORT",
        entityId: actorId,
        action: "CASE_REPORT_EXPORTED",
        protectedValue: { format: "CSV", rowCount: rows.length },
      },
    });
    return rows;
  }
}

export function createPrismaReportRepository(studyId: string) {
  return new PrismaReportRepository(getPrismaClient(), studyId);
}
