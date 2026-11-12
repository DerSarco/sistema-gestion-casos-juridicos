import type { PrismaClient } from "@/generated/prisma/client";
import type { Client } from "@/modules/clients/domain/client";
import { describe, expect, it, vi } from "vitest";
import { PrismaClientRepository } from "./prisma-client-repository";

const studyId = "10000000-0000-4000-8000-000000000001";

function databaseWith(client: {
  findMany?: ReturnType<typeof vi.fn>;
  create?: ReturnType<typeof vi.fn>;
}) {
  return {
    client: {
      findMany: client.findMany ?? vi.fn(),
      create: client.create ?? vi.fn(),
    },
  } as unknown as Pick<PrismaClient, "client">;
}

describe("PrismaClientRepository", () => {
  it("limita el listado al estudio y conserva el orden definido", async () => {
    const findMany = vi.fn().mockResolvedValue([
      {
        id: "10000000-0000-4000-8000-000000000010",
        displayName: "Cliente 01",
        email: "cliente01@example.test",
        phone: null,
        status: "ACTIVE",
        createdAt: new Date("2026-11-08T12:00:00.000Z"),
      },
    ]);
    const repository = new PrismaClientRepository(
      databaseWith({ findMany }),
      studyId,
    );

    await expect(repository.list()).resolves.toEqual([
      expect.objectContaining({
        displayName: "Cliente 01",
        createdAt: "2026-11-08T12:00:00.000Z",
      }),
    ]);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { studyId },
        orderBy: [{ displayName: "asc" }, { id: "asc" }],
      }),
    );
  });

  it("rechaza escrituras con la ficha temporal incompleta", async () => {
    const create = vi.fn().mockResolvedValue({});
    const repository = new PrismaClientRepository(
      databaseWith({ create }),
      studyId,
    );
    const client: Client = {
      id: "10000000-0000-4000-8000-000000000011",
      displayName: "Cliente 02",
      email: null,
      phone: "+56922222222",
      status: "ACTIVE",
      createdAt: "2026-11-08T13:00:00.000Z",
    };

    await expect(repository.save(client)).rejects.toThrow(
      "La escritura persistente de clientes se habilitará en el issue #80",
    );
    expect(create).not.toHaveBeenCalled();
  });
});
