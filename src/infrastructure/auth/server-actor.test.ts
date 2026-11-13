import { describe, expect, it } from "vitest";
import { createSessionValue, requirePartner, requireSelfAssignment, verifySessionValue } from "./server-actor";

process.env.SESSION_SECRET = "test-session".padEnd(32, "x");
const actor = (role: string) => ({ id: "actor", studyId: "study", role, displayName: "Usuario" });

describe("requirePartner", () => {
  it("permite acciones elevadas al perfil Socio", () => {
    expect(() => requirePartner(actor("Socio"))).not.toThrow();
  });

  it.each(["Abogado", "Asistente", "Procurador"])("rechaza acciones elevadas al perfil %s", (role) => {
    expect(() => requirePartner(actor(role))).toThrow("requiere el perfil Socio");
  });

  it.each(["Abogado", "Asistente", "Procurador"])("limita la distribución inicial del perfil %s a sí mismo", (role) => {
    expect(() => requireSelfAssignment(actor(role), "actor", [])).not.toThrow();
    expect(() => requireSelfAssignment(actor(role), "otro", [])).toThrow("Solo un Socio");
    expect(() => requireSelfAssignment(actor(role), "actor", ["otro"])).toThrow("Solo un Socio");
  });

  it("verifica una sesión vigente y rechaza alteración o expiración", () => {
    const value = createSessionValue("user", "study", 1_000);
    expect(verifySessionValue(value, 2_000)).toEqual({ userId: "user", studyId: "study", expiresAt: expect.any(Number) });
    expect(verifySessionValue(`${value}x`, 2_000)).toBeNull();
    expect(verifySessionValue(value, 1_000 + 9 * 60 * 60 * 1_000)).toBeNull();
  });
});
