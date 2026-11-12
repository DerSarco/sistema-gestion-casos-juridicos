export type CaseLifecycle = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type PersistentCase = {
  id: string;
  internalCode: string;
  clientId: string;
  clientName: string;
  matterId: string;
  matter: string;
  stageId: string;
  stage: string;
  title: string;
  lifecycleStatus: CaseLifecycle;
  responsibleId: string;
  responsible: string;
  court: string | null;
  rit: string | null;
  judicialRole: string | null;
  notes: string | null;
  lifecycleReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PersistentCaseInput = {
  clientId: string;
  matterId: string;
  stageId: string;
  title: string;
  responsibleId: string;
  court: string;
  rit: string;
  judicialRole: string;
  notes: string;
};

export type CaseValidationErrors = Partial<Record<keyof PersistentCaseInput, string>>;

export function normalizePersistentCaseInput(input: PersistentCaseInput): PersistentCaseInput {
  return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, value.trim().replace(/\s+/g, " ")])) as PersistentCaseInput;
}

export function validatePersistentCaseInput(input: PersistentCaseInput): CaseValidationErrors {
  const errors: CaseValidationErrors = {};
  if (!input.clientId) errors.clientId = "Selecciona un cliente activo.";
  if (!input.matterId) errors.matterId = "Selecciona una materia laboral.";
  if (!input.stageId) errors.stageId = "Selecciona una etapa.";
  if (input.title.length < 3 || input.title.length > 160) errors.title = "Ingresa un título de entre 3 y 160 caracteres.";
  if (!input.responsibleId) errors.responsibleId = "Selecciona un responsable principal.";
  if (input.court.length > 120) errors.court = "El tribunal no puede superar 120 caracteres.";
  if (input.rit.length > 60) errors.rit = "El RIT no puede superar 60 caracteres.";
  if (input.judicialRole.length > 60) errors.judicialRole = "El ROL no puede superar 60 caracteres.";
  if (input.notes.length > 2000) errors.notes = "Las observaciones no pueden superar 2000 caracteres.";
  return errors;
}
