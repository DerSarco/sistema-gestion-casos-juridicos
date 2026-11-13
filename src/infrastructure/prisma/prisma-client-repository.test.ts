import { describe, expect, it, vi } from "vitest";
import { PrismaClientRepository } from "./prisma-client-repository";

const studyId = "10000000-0000-4000-8000-000000000001";
const record = { id: "10000000-0000-4000-8000-000000000010", displayName: "Cliente 01", rutNormalized: "111111111", email: "cliente01@example.test", phone: "+56911111111", originMatter: "Consulta laboral", status: "ACTIVE" as const, statusChangedAt: null, statusReason: null, createdAt: new Date("2026-11-08T12:00:00.000Z"), updatedAt: new Date("2026-11-08T12:00:00.000Z") };

function repositoryWith(client: { findMany?: ReturnType<typeof vi.fn>; findFirst?: ReturnType<typeof vi.fn> }) {
  const database = { client: { findMany: client.findMany ?? vi.fn(), findFirst: client.findFirst ?? vi.fn() }, auditEvent: {}, $transaction: vi.fn() } as unknown as ConstructorParameters<typeof PrismaClientRepository>[0];
  return new PrismaClientRepository(database, studyId);
}

describe("PrismaClientRepository", () => {
  it("limita el listado al estudio y mapea las fechas", async () => {
    const findMany = vi.fn().mockResolvedValue([record]);
    const repository = repositoryWith({ findMany });
    await expect(repository.list()).resolves.toEqual([expect.objectContaining({ displayName: "Cliente 01", createdAt: "2026-11-08T12:00:00.000Z" })]);
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ studyId }) }));
  });

  it("no revela un cliente ausente del estudio", async () => {
    const findFirst = vi.fn().mockResolvedValue(null);
    const repository = repositoryWith({ findFirst });
    await expect(repository.findById(record.id)).resolves.toBeNull();
    expect(findFirst).toHaveBeenCalledWith(expect.objectContaining({ where: { id: record.id, studyId } }));
  });
});
