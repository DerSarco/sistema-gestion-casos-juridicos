import { describe, expect, it, vi } from "vitest";
import { PrismaReportRepository } from "./prisma-report-repository";

const studyId = "10000000-0000-4000-8000-000000000001";
const actorId = "10000000-0000-4000-8000-000000000201";
const record = {
  id: "10000000-0000-4000-8000-000000000401",
  internalCode: "CASO-FICTICIO-001",
  lifecycleStatus: "ACTIVE" as const,
  createdAt: new Date("2026-11-01T00:00:00.000Z"),
  matter: { name: "Despido ficticio" },
  stage: { name: "Ingreso" },
  businessStatus: { name: "Ingresado" },
  participations: [
    {
      participantId: actorId,
      participant: { displayName: "Socio Ficticio A" },
    },
  ],
  relevantDates: [{ occursAt: new Date("2026-12-01T12:00:00.000Z") }],
};

function repository() {
  const findMany = vi.fn().mockResolvedValue([record]);
  const create = vi.fn().mockResolvedValue({});
  const database = {
    legalCase: { findMany },
    auditEvent: { create },
  } as unknown as ConstructorParameters<typeof PrismaReportRepository>[0];
  return {
    repository: new PrismaReportRepository(database, studyId),
    findMany,
    create,
  };
}

describe("PrismaReportRepository", () => {
  it("calcula carga únicamente con casos del estudio", async () => {
    const context = repository();
    await expect(context.repository.summary()).resolves.toEqual(
      expect.objectContaining({
        totalCases: 1,
        activeCases: 1,
        workload: [
          expect.objectContaining({
            responsible: "Socio Ficticio A",
            activeCases: 1,
          }),
        ],
      }),
    );
    expect(context.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { studyId } }),
    );
  });

  it("audita la exportación sin guardar su contenido", async () => {
    const context = repository();
    const rows = await context.repository.exportRows(actorId);
    expect(rows[0]).not.toHaveProperty("clientName");
    expect(context.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        studyId,
        actorId,
        action: "CASE_REPORT_EXPORTED",
        protectedValue: { format: "CSV", rowCount: 1 },
      }),
    });
  });
});
