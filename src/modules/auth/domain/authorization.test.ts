import { describe, expect, it } from "vitest";
import { CAPABILITIES, AuthorizationError, authorize, can } from "./authorization";

const common = [
  "client:read",
  "client:write",
  "case:read",
  "case:write",
  "case:stage",
  "case:date",
  "history:read",
  "report:read",
] as const;

const elevated = [
  "client:lifecycle",
  "case:assign",
  "case:lifecycle",
  "report:export",
  "user:manage",
] as const;

describe("matriz de autorización", () => {
  it.each(["Socio", "Abogado", "Asistente", "Procurador"])(
    "permite capacidades habituales a %s",
    (role) => {
      for (const capability of common) expect(can(role, capability)).toBe(true);
    },
  );

  it("reserva todas las capacidades elevadas al Socio", () => {
    for (const capability of elevated) {
      expect(can("Socio", capability)).toBe(true);
      expect(can("Abogado", capability)).toBe(false);
      expect(can("Asistente", capability)).toBe(false);
      expect(can("Procurador", capability)).toBe(false);
    }
  });

  it("mantiene toda capacidad declarada asignada explícitamente", () => {
    for (const capability of CAPABILITIES) {
      expect(typeof can("Socio", capability)).toBe("boolean");
    }
  });

  it("rechaza roles desconocidos y entrega un error tipado", () => {
    expect(can("Administrador", "user:manage")).toBe(false);
    expect(() => authorize("Abogado", "user:manage")).toThrow(AuthorizationError);
  });
});

