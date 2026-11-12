import {
  findPotentialMatches,
  normalizeClientInput,
  type Client,
  type ClientInput,
  type ClientValidationErrors,
  validateClientInput,
} from "../domain/client";
import type { ClientRepository } from "./client-repository";

type RegisterOptions = { confirmPotentialMatch?: boolean; actorId: string };

export type RegisterClientResult =
  | { status: "created"; client: Client }
  | { status: "invalid"; errors: ClientValidationErrors }
  | { status: "potential-match"; matches: Client[] };

export class RegisterClient {
  constructor(private readonly repository: ClientRepository) {}

  async execute(rawInput: ClientInput, options: RegisterOptions): Promise<RegisterClientResult> {
    const input = normalizeClientInput(rawInput);
    const errors = validateClientInput(input);
    if (Object.keys(errors).length > 0) return { status: "invalid", errors };

    const matches = findPotentialMatches(await this.repository.list(), input);
    if (matches.length > 0 && !options.confirmPotentialMatch) {
      return { status: "potential-match", matches };
    }
    return { status: "created", client: await this.repository.create(input, options.actorId) };
  }
}
