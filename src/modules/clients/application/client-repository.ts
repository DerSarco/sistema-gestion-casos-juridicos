import type { Client } from "../domain/client";

export interface ClientRepository {
  list(): Promise<Client[]>;
  save(client: Client): Promise<void>;
}
