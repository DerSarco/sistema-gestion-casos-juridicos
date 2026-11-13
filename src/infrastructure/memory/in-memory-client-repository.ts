import type { ClientListFilters, ClientRepository } from "@/modules/clients/application/client-repository";
import type { Client, ClientInput, ClientStatus } from "@/modules/clients/domain/client";

export class InMemoryClientRepository implements ClientRepository {
  private readonly clients: Client[];
  constructor(initialClients: Client[] = [], private readonly createId = () => crypto.randomUUID(), private readonly now = () => new Date().toISOString()) {
    this.clients = structuredClone(initialClients);
  }
  async list(filters: ClientListFilters = {}): Promise<Client[]> {
    const query = filters.query?.toLowerCase();
    return structuredClone(this.clients).filter((client) => (!filters.status || filters.status === "ALL" || client.status === filters.status) && (!query || `${client.displayName} ${client.rutNormalized} ${client.phone} ${client.email ?? ""} ${client.originMatter}`.toLowerCase().includes(query))).sort((a, b) => a.displayName.localeCompare(b.displayName, "es-CL"));
  }
  async findById(id: string): Promise<Client | null> { return structuredClone(this.clients.find((item) => item.id === id) ?? null); }
  async create(input: ClientInput): Promise<Client> {
    const timestamp = this.now();
    const client: Client = { id: this.createId(), displayName: input.displayName, rutNormalized: input.rut, phone: input.phone, email: input.email || null, originMatter: input.originMatter, status: "ACTIVE", statusChangedAt: null, statusReason: null, createdAt: timestamp, updatedAt: timestamp };
    this.clients.push(client); return structuredClone(client);
  }
  async update(id: string, input: ClientInput): Promise<Client | null> {
    const index = this.clients.findIndex((item) => item.id === id); if (index < 0) return null;
    this.clients[index] = { ...this.clients[index], displayName: input.displayName, rutNormalized: input.rut, phone: input.phone, email: input.email || null, originMatter: input.originMatter, updatedAt: this.now() };
    return structuredClone(this.clients[index]);
  }
  async changeStatus(id: string, status: ClientStatus, reason: string): Promise<Client | null> {
    const index = this.clients.findIndex((item) => item.id === id); if (index < 0) return null;
    const timestamp = this.now(); this.clients[index] = { ...this.clients[index], status, statusChangedAt: timestamp, statusReason: reason, updatedAt: timestamp };
    return structuredClone(this.clients[index]);
  }
}
