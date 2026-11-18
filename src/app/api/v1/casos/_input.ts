import { normalizePersistentCaseInput, type PersistentCaseInput } from "@/modules/cases/domain/persistent-case";

export function caseInput(body: Record<string, unknown>): PersistentCaseInput {
  return normalizePersistentCaseInput({
    clientId: String(body.clientId ?? ""),
    matterId: String(body.matterId ?? ""),
    stageId: String(body.stageId ?? ""),
    title: String(body.title ?? ""),
    responsibleId: String(body.responsibleId ?? ""),
    participantIds: Array.isArray(body.participantIds) ? body.participantIds.map(String) : [],
    court: String(body.court ?? ""),
    rit: String(body.rit ?? ""),
    judicialRole: String(body.judicialRole ?? ""),
    notes: String(body.notes ?? ""),
    employerOrCounterparty: String(body.employerOrCounterparty ?? ""),
    employmentStartDate: String(body.employmentStartDate ?? ""),
    dismissalDate: String(body.dismissalDate ?? ""),
    collectiveOrganization: String(body.collectiveOrganization ?? ""),
    collectiveActionType: String(body.collectiveActionType ?? ""),
    severanceDetails: String(body.severanceDetails ?? ""),
    amount: String(body.amount ?? ""),
  });
}
