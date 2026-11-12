export type CaseLifecycle = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type PersistentCase = {
  id: string;
  internalCode: string;
  clientId: string;
  clientName: string;
  matterId: string;
  matter: string;
  matterCode: string;
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
  employerOrCounterparty: string | null;
  employmentStartDate: string | null;
  dismissalDate: string | null;
  collectiveOrganization: string | null;
  collectiveActionType: string | null;
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
  employerOrCounterparty: string;
  employmentStartDate: string;
  dismissalDate: string;
  collectiveOrganization: string;
  collectiveActionType: string;
};

export type CaseValidationErrors = Partial<
  Record<keyof PersistentCaseInput, string>
>;

export function normalizePersistentCaseInput(
  input: PersistentCaseInput,
): PersistentCaseInput {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      value.trim().replace(/\s+/g, " "),
    ]),
  ) as PersistentCaseInput;
}

export function validatePersistentCaseInput(
  input: PersistentCaseInput,
): CaseValidationErrors {
  const errors: CaseValidationErrors = {};
  if (!input.clientId) errors.clientId = "Selecciona un cliente activo.";
  if (!input.matterId) errors.matterId = "Selecciona una materia laboral.";
  if (!input.stageId) errors.stageId = "Selecciona una etapa.";
  if (input.title.length < 3 || input.title.length > 160)
    errors.title = "Ingresa un título de entre 3 y 160 caracteres.";
  if (!input.responsibleId)
    errors.responsibleId = "Selecciona un responsable principal.";
  if (input.court.length > 120)
    errors.court = "El tribunal no puede superar 120 caracteres.";
  if (input.rit.length > 60)
    errors.rit = "El RIT no puede superar 60 caracteres.";
  if (input.judicialRole.length > 60)
    errors.judicialRole = "El ROL no puede superar 60 caracteres.";
  if (input.notes.length > 2000)
    errors.notes = "Las observaciones no pueden superar 2000 caracteres.";
  return errors;
}

export function validateLaborFields(
  input: PersistentCaseInput,
  matterCode: string,
): CaseValidationErrors {
  const errors: CaseValidationErrors = {};
  if (matterCode === "DISMISSAL") {
    if (!input.employerOrCounterparty)
      errors.employerOrCounterparty = "Ingresa el empleador o contraparte.";
    if (!input.employmentStartDate)
      errors.employmentStartDate = "Ingresa la fecha de inicio laboral.";
    if (!input.dismissalDate)
      errors.dismissalDate = "Ingresa la fecha de despido.";
    if (
      input.employmentStartDate &&
      input.dismissalDate &&
      input.dismissalDate < input.employmentStartDate
    )
      errors.dismissalDate =
        "La fecha de despido no puede ser anterior al inicio laboral.";
  }
  if (matterCode === "COLLECTIVE") {
    if (!input.collectiveOrganization)
      errors.collectiveOrganization =
        "Ingresa el sindicato u organización colectiva.";
    if (!input.collectiveActionType)
      errors.collectiveActionType = "Ingresa el tipo de gestión colectiva.";
  }
  return errors;
}
