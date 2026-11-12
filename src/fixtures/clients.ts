import type { Client } from "@/modules/clients/domain/client";

export const fictionalClients: Client[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    displayName: "Cliente 01",
    rutNormalized: "111111111",
    email: "cliente01@example.test",
    phone: "+56911111111",
    originMatter: "Consulta laboral",
    status: "ACTIVE",
    statusChangedAt: null,
    statusReason: null,
    createdAt: "2026-10-01T12:00:00.000Z",
    updatedAt: "2026-10-01T12:00:00.000Z",
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    displayName: "Cliente 02",
    rutNormalized: "222222222",
    email: "cliente02@example.test",
    phone: "+56922222222",
    originMatter: "Consulta sindical",
    status: "ACTIVE",
    statusChangedAt: null,
    statusReason: null,
    createdAt: "2026-10-02T12:00:00.000Z",
    updatedAt: "2026-10-02T12:00:00.000Z",
  },
];
