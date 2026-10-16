export type LegalCaseStatus = "DRAFT" | "ACTIVE" | "CLOSED" | "ARCHIVED";

export type CaseHistoryEvent = {
  id: string;
  action: "CASE_CREATED";
  occurredAt: string;
  description: string;
};

export type LegalCase = {
  id: string;
  internalCode: string;
  clientId: string;
  clientName: string;
  title: string;
  matter: string;
  stage: string;
  status: LegalCaseStatus;
  responsible: string;
  court: string | null;
  ritRol: string | null;
  createdAt: string;
  history: CaseHistoryEvent[];
};

export type LegalCaseInput = {
  clientId: string;
  title: string;
  matter: string;
  stage: string;
  responsible: string;
  court?: string;
  ritRol?: string;
};

export type LegalCaseValidationErrors = Partial<
  Record<
    "clientId" | "title" | "matter" | "stage" | "responsible" | "court" | "ritRol",
    string
  >
>;

export function normalizeLegalCaseInput(input: LegalCaseInput): LegalCaseInput {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      value.trim().replace(/\s+/g, " "),
    ]),
  ) as LegalCaseInput;
}

export function validateLegalCaseInput(
  input: LegalCaseInput,
): LegalCaseValidationErrors {
  const errors: LegalCaseValidationErrors = {};

  if (!input.clientId) errors.clientId = "Selecciona un cliente ficticio.";
  if (input.title.length < 3 || input.title.length > 160) {
    errors.title = "Ingresa un título de entre 3 y 160 caracteres.";
  }
  if (!input.matter) errors.matter = "Selecciona una materia.";
  if (!input.stage) errors.stage = "Selecciona una etapa.";
  if (!input.responsible) errors.responsible = "Selecciona un responsable.";
  if (input.court && input.court.length > 120) {
    errors.court = "El tribunal no puede superar 120 caracteres.";
  }
  if (input.ritRol && input.ritRol.length > 60) {
    errors.ritRol = "El RIT/ROL no puede superar 60 caracteres.";
  }

  return errors;
}

export type CaseFilters = {
  query?: string;
  status?: LegalCaseStatus | "ALL";
  responsible?: string | "ALL";
};

export function filterLegalCases(
  cases: LegalCase[],
  filters: CaseFilters,
): LegalCase[] {
  const query = filters.query?.trim().toLocaleLowerCase("es-CL") ?? "";

  return cases.filter((legalCase) => {
    const matchesQuery =
      !query ||
      [
        legalCase.internalCode,
        legalCase.title,
        legalCase.clientName,
        legalCase.matter,
      ].some((value) => value.toLocaleLowerCase("es-CL").includes(query));
    const matchesStatus =
      !filters.status ||
      filters.status === "ALL" ||
      legalCase.status === filters.status;
    const matchesResponsible =
      !filters.responsible ||
      filters.responsible === "ALL" ||
      legalCase.responsible === filters.responsible;

    return matchesQuery && matchesStatus && matchesResponsible;
  });
}
