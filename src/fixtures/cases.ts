import type { LegalCase } from "@/modules/cases/domain/legal-case";

export const fictionalCases: LegalCase[] = [
  {
    id: "20000000-0000-4000-8000-000000000001",
    internalCode: "CASO-001",
    clientId: "10000000-0000-4000-8000-000000000001",
    clientName: "Cliente 01",
    title: "Cobro de prueba 01",
    matter: "Civil",
    stage: "Redacción",
    status: "ACTIVE",
    responsible: "Abogado A",
    court: null,
    ritRol: null,
    createdAt: "2026-10-03T12:00:00.000Z",
    history: [
      {
        id: "30000000-0000-4000-8000-000000000001",
        action: "CASE_CREATED",
        occurredAt: "2026-10-03T12:00:00.000Z",
        description: "Caso ficticio registrado en memoria temporal.",
      },
    ],
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    internalCode: "CASO-002",
    clientId: "10000000-0000-4000-8000-000000000002",
    clientName: "Cliente 02",
    title: "Consulta laboral de prueba",
    matter: "Laboral",
    stage: "Antecedentes",
    status: "ACTIVE",
    responsible: "Abogado B",
    court: "Tribunal de prueba",
    ritRol: "RIT-FICTICIO-002",
    createdAt: "2026-10-04T12:00:00.000Z",
    history: [
      {
        id: "30000000-0000-4000-8000-000000000002",
        action: "CASE_CREATED",
        occurredAt: "2026-10-04T12:00:00.000Z",
        description: "Caso ficticio registrado en memoria temporal.",
      },
    ],
  },
];

export const fictionalMatters = ["Civil", "Laboral", "Familia"] as const;
export const fictionalStages = ["Antecedentes", "Redacción", "Ingresada"] as const;
export const fictionalResponsibleUsers = ["Abogado A", "Abogado B"] as const;
