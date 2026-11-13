import { describe, expect, it } from "vitest";
import { buildCaseCsv } from "./csv";

describe("buildCaseCsv", () => {
  it("exporta únicamente las columnas operativas minimizadas", () => {
    const csv = buildCaseCsv([
      {
        internalCode: "CASO-FICTICIO-001",
        matter: "Despido ficticio",
        stage: "Ingreso",
        status: "Ingresado",
        lifecycle: "Activo",
        responsible: "Abogado Ficticio A",
        nextRelevantDate: "2026-12-15T10:30:00.000Z",
      },
    ]);
    expect(csv).toContain("Código interno");
    expect(csv).toContain("CASO-FICTICIO-001");
    expect(csv).not.toMatch(/RUT|correo|teléfono|cliente/i);
  });

  it("neutraliza fórmulas y escapa comillas", () => {
    const csv = buildCaseCsv([
      {
        internalCode: "=1+1",
        matter: "Materia \"ficticia\"",
        stage: "Ingreso",
        status: "Ingresado",
        lifecycle: "Activo",
        responsible: "Abogado A",
        nextRelevantDate: "",
      },
    ]);
    expect(csv).toContain("'=1+1");
    expect(csv).toContain('Materia ""ficticia""');
  });
});
