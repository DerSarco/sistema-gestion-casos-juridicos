import { describe, expect, it } from "vitest";
import { fictionalClients } from "@/fixtures/clients";
import { InMemoryCaseRepository } from "@/infrastructure/memory/in-memory-case-repository";
import { InMemoryClientRepository } from "@/infrastructure/memory/in-memory-client-repository";
import { filterLegalCases } from "../domain/legal-case";
import { RegisterCase } from "./register-case";

const createUseCase = (cases = new InMemoryCaseRepository()) =>
  new RegisterCase(
    cases,
    new InMemoryClientRepository(fictionalClients),
    () => "20000000-0000-4000-8000-000000000099",
    () => "CASO-099",
    () => "2026-10-16T20:00:00.000Z",
  );

describe("RegisterCase", () => {
  it("registra un caso activo con historial inicial", () => {
    const cases = new InMemoryCaseRepository();
    const result = createUseCase(cases).execute({
      clientId: fictionalClients[0].id,
      title: "Caso de prueba 03",
      matter: "Civil",
      stage: "Redacción",
      responsible: "Abogado A",
    });

    expect(result.status).toBe("created");
    expect(cases.list()[0]).toEqual(
      expect.objectContaining({
        internalCode: "CASO-099",
        court: null,
        ritRol: null,
        status: "ACTIVE",
        history: [expect.objectContaining({ action: "CASE_CREATED" })],
      }),
    );
  });

  it("rechaza un cliente inexistente y campos incompletos", () => {
    const cases = new InMemoryCaseRepository();
    const result = createUseCase(cases).execute({
      clientId: "cliente-inexistente",
      title: "",
      matter: "",
      stage: "",
      responsible: "",
    });

    expect(result.status).toBe("invalid");
    expect(cases.list()).toHaveLength(0);
  });

  it("filtra por texto, estado y responsable", () => {
    const first = createUseCase().execute({
      clientId: fictionalClients[0].id,
      title: "Caso civil filtrable",
      matter: "Civil",
      stage: "Redacción",
      responsible: "Abogado A",
    });
    if (first.status !== "created") throw new Error("fixture inválido");

    expect(
      filterLegalCases([first.legalCase], {
        query: "civil",
        status: "ACTIVE",
        responsible: "Abogado A",
      }),
    ).toHaveLength(1);
    expect(
      filterLegalCases([first.legalCase], { responsible: "Abogado B" }),
    ).toHaveLength(0);
  });
});
