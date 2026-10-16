import type { ClientRepository } from "@/modules/clients/application/client-repository";
import {
  normalizeLegalCaseInput,
  type LegalCase,
  type LegalCaseInput,
  type LegalCaseValidationErrors,
  validateLegalCaseInput,
} from "../domain/legal-case";
import type { CaseRepository } from "./case-repository";

export type RegisterCaseResult =
  | { status: "created"; legalCase: LegalCase }
  | { status: "invalid"; errors: LegalCaseValidationErrors };

export class RegisterCase {
  constructor(
    private readonly cases: CaseRepository,
    private readonly clients: ClientRepository,
    private readonly createId: () => string,
    private readonly createInternalCode: () => string,
    private readonly now: () => string,
  ) {}

  execute(rawInput: LegalCaseInput): RegisterCaseResult {
    const input = normalizeLegalCaseInput(rawInput);
    const errors = validateLegalCaseInput(input);
    const client = this.clients.list().find(({ id }) => id === input.clientId);

    if (input.clientId && !client) {
      errors.clientId = "El cliente seleccionado no existe en este entorno.";
    }

    if (Object.keys(errors).length > 0 || !client) {
      return { status: "invalid", errors };
    }

    const createdAt = this.now();
    const legalCase: LegalCase = {
      id: this.createId(),
      internalCode: this.createInternalCode(),
      clientId: client.id,
      clientName: client.displayName,
      title: input.title,
      matter: input.matter,
      stage: input.stage,
      status: "ACTIVE",
      responsible: input.responsible,
      court: input.court || null,
      ritRol: input.ritRol || null,
      createdAt,
      history: [
        {
          id: `${this.createId()}-history`,
          action: "CASE_CREATED",
          occurredAt: createdAt,
          description: "Caso ficticio registrado en memoria temporal.",
        },
      ],
    };

    this.cases.save(legalCase);
    return { status: "created", legalCase };
  }
}
