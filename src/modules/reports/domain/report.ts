export type WorkloadRow = {
  responsibleId: string;
  responsible: string;
  activeCases: number;
  archivedCases: number;
  totalCases: number;
};

export type CountRow = {
  label: string;
  count: number;
};

export type ReportFilters = {
  responsibleId?: string;
  stage?: string;
  status?: string;
};

export type ReportFilterOption = { value: string; label: string };

export type UpcomingEventRow = {
  caseCode: string;
  title: string;
  occursAt: string;
  responsible: string;
};

export type ReportSummary = {
  totalCases: number;
  activeCases: number;
  archivedCases: number;
  unassignedCases: number;
  casesWithoutUpcomingDate: number;
  workload: WorkloadRow[];
  byStage: CountRow[];
  byStatus: CountRow[];
  upcomingEvents: UpcomingEventRow[];
  filterOptions: {
    responsible: ReportFilterOption[];
    stage: ReportFilterOption[];
    status: ReportFilterOption[];
  };
};

export type ExportCaseRow = {
  internalCode: string;
  matter: string;
  stage: string;
  status: string;
  lifecycle: "Activo" | "Archivado";
  responsible: string;
  nextRelevantDate: string;
};
