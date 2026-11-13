import { describe, expect, it } from "vitest";
import { InMemoryClientRepository } from "@/infrastructure/memory/in-memory-client-repository";
import { fictionalClients } from "@/fixtures/clients";
import { RegisterClient } from "./register-client";

const actorId = "10000000-0000-4000-8000-000000000201";
const createUseCase = (repository = new InMemoryClientRepository()) => new RegisterClient(repository);
const validInput = { displayName: "Cliente 03", rut: "333333333", phone: "+56933333333", email: "CLIENTE03@EXAMPLE.TEST", originMatter: "Consulta laboral" };

describe("RegisterClient", () => {
  it("registra y normaliza una ficha ficticia válida", async () => {
    const repository = new InMemoryClientRepository([], () => "10000000-0000-4000-8000-000000000099", () => "2026-10-16T18:00:00.000Z");
    const result = await createUseCase(repository).execute(validInput, { actorId });
    expect(result.status).toBe("created");
    await expect(repository.list()).resolves.toEqual([expect.objectContaining({ displayName: "Cliente 03", email: "cliente03@example.test" })]);
  });

  it("rechaza datos inválidos sin persistir", async () => {
    const repository = new InMemoryClientRepository();
    const result = await createUseCase(repository).execute({ ...validInput, displayName: "A", rut: "x" }, { actorId });
    expect(result.status).toBe("invalid");
    await expect(repository.list()).resolves.toHaveLength(0);
  });

  it("advierte coincidencia por nombre y origen sin fusionar", async () => {
    const repository = new InMemoryClientRepository(fictionalClients);
    const result = await createUseCase(repository).execute({ ...validInput, displayName: "Cliente 01", originMatter: "Consulta laboral" }, { actorId });
    expect(result.status).toBe("potential-match");
    await expect(repository.list()).resolves.toHaveLength(2);
  });

  it("permite continuar después de confirmar la advertencia", async () => {
    const repository = new InMemoryClientRepository(fictionalClients);
    const result = await createUseCase(repository).execute({ ...validInput, displayName: "Cliente 01", originMatter: "Consulta laboral" }, { actorId, confirmPotentialMatch: true });
    expect(result.status).toBe("created");
    await expect(repository.list()).resolves.toHaveLength(3);
  });
});
