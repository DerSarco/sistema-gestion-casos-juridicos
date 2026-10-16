import type { ClientRepository } from "@/modules/clients/application/client-repository";
import type { Client } from "@/modules/clients/domain/client";

export class InMemoryClientRepository implements ClientRepository {
  private readonly clients: Client[];

  constructor(initialClients: Client[] = []) {
    this.clients = structuredClone(initialClients);
  }

  list(): Client[] {
    return structuredClone(this.clients).sort((a, b) =>
      a.displayName.localeCompare(b.displayName, "es-CL"),
    );
  }

  save(client: Client): void {
    this.clients.push(structuredClone(client));
  }
}
