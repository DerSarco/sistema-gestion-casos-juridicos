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

export type ReportSummary = {
  totalCases: number;
  activeCases: number;
  archivedCases: number;
  workload: WorkloadRow[];
  byStage: CountRow[];
  byStatus: CountRow[];
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
