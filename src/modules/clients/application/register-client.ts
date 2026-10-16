import {
  findPotentialMatches,
  normalizeClientInput,
  type Client,
  type ClientInput,
  type ClientValidationErrors,
  validateClientInput,
} from "../domain/client";
import type { ClientRepository } from "./client-repository";

type RegisterOptions = {
  confirmPotentialMatch?: boolean;
};

export type RegisterClientResult =
  | { status: "created"; client: Client }
  | { status: "invalid"; errors: ClientValidationErrors }
  | { status: "potential-match"; matches: Client[] };

export class RegisterClient {
  constructor(
    private readonly repository: ClientRepository,
    private readonly createId: () => string,
    private readonly now: () => string,
  ) {}

  execute(
    rawInput: ClientInput,
    options: RegisterOptions = {},
  ): RegisterClientResult {
    const input = normalizeClientInput(rawInput);
    const errors = validateClientInput(input);

    if (Object.keys(errors).length > 0) {
      return { status: "invalid", errors };
    }

    const matches = findPotentialMatches(this.repository.list(), input);
    if (matches.length > 0 && !options.confirmPotentialMatch) {
      return { status: "potential-match", matches };
    }

    const client: Client = {
      id: this.createId(),
      displayName: input.displayName,
      email: input.email || null,
      phone: input.phone || null,
      status: "ACTIVE",
      createdAt: this.now(),
    };

    this.repository.save(client);
    return { status: "created", client };
  }
}
