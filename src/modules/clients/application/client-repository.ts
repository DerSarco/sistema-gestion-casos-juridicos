import type { Client, ClientInput, ClientStatus } from "../domain/client";

export type ClientListFilters = { query?: string; status?: ClientStatus | "ALL" };

export interface ClientRepository {
  list(filters?: ClientListFilters): Promise<Client[]>;
  findById(id: string): Promise<Client | null>;
  create(input: ClientInput, actorId: string): Promise<Client>;
  update(id: string, input: ClientInput, actorId: string): Promise<Client | null>;
  changeStatus(id: string, status: ClientStatus, reason: string, actorId: string): Promise<Client | null>;
}
