import { describe, expect, it } from "vitest";
import { InMemoryClientRepository } from "@/infrastructure/memory/in-memory-client-repository";
import { fictionalClients } from "@/fixtures/clients";
import { RegisterClient } from "./register-client";

const createUseCase = (repository = new InMemoryClientRepository()) =>
  new RegisterClient(
    repository,
    () => "10000000-0000-4000-8000-000000000099",
    () => "2026-10-16T18:00:00.000Z",
  );

describe("RegisterClient", () => {
  it("registra una ficha ficticia válida", () => {
    const repository = new InMemoryClientRepository();
    const result = createUseCase(repository).execute({
      displayName: "  Cliente 03  ",
      email: "CLIENTE03@EXAMPLE.TEST",
    });

    expect(result.status).toBe("created");
    expect(repository.list()).toEqual([
      expect.objectContaining({
        displayName: "Cliente 03",
        email: "cliente03@example.test",
      }),
    ]);
  });

  it("rechaza datos inválidos sin persistir", () => {
    const repository = new InMemoryClientRepository();
    const result = createUseCase(repository).execute({
      displayName: "A",
      email: "correo-invalido",
    });

    expect(result.status).toBe("invalid");
    expect(repository.list()).toHaveLength(0);
  });

  it("informa una coincidencia sin fusionar automáticamente", () => {
    const repository = new InMemoryClientRepository(fictionalClients);
    const result = createUseCase(repository).execute({
      displayName: "Otra etiqueta",
      email: "cliente01@example.test",
    });

    expect(result.status).toBe("potential-match");
    expect(repository.list()).toHaveLength(2);
  });

  it("permite confirmar una ficha separada después de advertir", () => {
    const repository = new InMemoryClientRepository(fictionalClients);
    const result = createUseCase(repository).execute(
      {
        displayName: "Cliente 01",
        phone: "+56999999999",
      },
      { confirmPotentialMatch: true },
    );

    expect(result.status).toBe("created");
    expect(repository.list()).toHaveLength(3);
  });
});
