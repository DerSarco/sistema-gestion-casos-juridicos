import type { Client } from "../domain/client";

export interface ClientRepository {
  list(): Client[];
  save(client: Client): void;
}
