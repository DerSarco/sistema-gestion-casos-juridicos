import { describe, expect, it } from "vitest";
import { requirePartner } from "./server-actor";

describe("requirePartner", () => {
  it("permite acciones elevadas al perfil Socio", () => {
    expect(() => requirePartner({ id: "actor", studyId: "study", role: "Socio" })).not.toThrow();
  });

  it.each(["Abogado", "Asistente", "Procurador"])("rechaza acciones elevadas al perfil %s", (role) => {
    expect(() => requirePartner({ id: "actor", studyId: "study", role })).toThrow("No tienes permiso");
  });
});
