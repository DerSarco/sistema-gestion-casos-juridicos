import type { PrismaClient } from "@/generated/prisma/client";
import { getPrismaClient } from "@/infrastructure/prisma/prisma-client";
import type {
  CountRow,
  ExportCaseRow,
  ReportFilters,
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
    select: {
      title: true,
      occursAt: true,
      responsible: { select: { displayName: true } },
    },
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
    private readonly viewer?: { id: string; role: string },
  ) {}

  async findScopedCases() {
    return this.database.legalCase.findMany({
      where: {
        studyId: this.studyId,
        ...(this.viewer?.role === "Abogado"
          ? { participations: { some: { participantId: this.viewer.id, endedAt: null } } }
          : {}),
      },
      include: reportInclude(new Date()),
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    });
  }

  async summary(filters: ReportFilters = {}): Promise<ReportSummary> {
    const records = await this.findScopedCases();
    const filterOptions = {
      responsible: [...new Map(records.flatMap((record) => record.participations.map((participation) => [participation.participantId, participation.participant.displayName] as const))).entries()].map(([value, label]) => ({ value, label })).sort((left, right) => left.label.localeCompare(right.label, "es-CL")),
      stage: [...new Set(records.map((record) => record.stage.name))].sort((left, right) => left.localeCompare(right, "es-CL")).map((value) => ({ value, label: value })),
      status: [...new Set(records.map((record) => record.businessStatus.name))].sort((left, right) => left.localeCompare(right, "es-CL")).map((value) => ({ value, label: value })),
    };
    const filtered = records.filter((record) =>
      (!filters.responsibleId || record.participations[0]?.participantId === filters.responsibleId) &&
      (!filters.stage || record.stage.name === filters.stage) &&
      (!filters.status || record.businessStatus.name === filters.status),
    );
    const workload = new Map<string, WorkloadRow>();
    for (const record of filtered) {
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
      totalCases: filtered.length,
      activeCases: filtered.filter(
        (record) => record.lifecycleStatus !== "ARCHIVED",
      ).length,
      archivedCases: filtered.filter(
        (record) => record.lifecycleStatus === "ARCHIVED",
      ).length,
      unassignedCases: filtered.filter((record) => record.lifecycleStatus !== "ARCHIVED" && record.participations.length === 0).length,
      casesWithoutUpcomingDate: filtered.filter((record) => record.lifecycleStatus !== "ARCHIVED" && record.relevantDates.length === 0).length,
      workload: [...workload.values()].sort(
        (left, right) =>
          right.activeCases - left.activeCases ||
          left.responsible.localeCompare(right.responsible, "es-CL"),
      ),
      byStage: countBy(filtered, (record) => record.stage.name),
      byStatus: countBy(filtered, (record) => record.businessStatus.name),
      upcomingEvents: filtered.flatMap((record) => record.relevantDates.map((event) => ({
        caseCode: record.internalCode,
        title: event.title,
        occursAt: event.occursAt.toISOString(),
        responsible: event.responsible.displayName,
      }))).sort((left, right) => left.occursAt.localeCompare(right.occursAt)).slice(0, 6),
      filterOptions,
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

export function createPrismaReportRepository(studyId: string, viewer?: { id: string; role: string }) {
  return new PrismaReportRepository(getPrismaClient(), studyId, viewer);
}
