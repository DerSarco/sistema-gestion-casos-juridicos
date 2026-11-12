import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const schema = readFileSync("prisma/schema.prisma", "utf8");
const migration = readFileSync(
  "prisma/migrations/20261111233000_data_model_v2/migration.sql",
  "utf8",
);

const model = (name: string) => {
  const match = schema.match(new RegExp(`model ${name} \\{([\\s\\S]*?)\\n\\}`));
  expect(match, `No se encontró el modelo ${name}`).not.toBeNull();
  return match?.[1] ?? "";
};

describe("modelo de datos v2", () => {
  it("mantiene los antecedentes judiciales opcionales", () => {
    const legalCase = model("LegalCase");

    expect(legalCase).toMatch(/court\s+String\?/);
    expect(legalCase).toMatch(/rit\s+String\?/);
    expect(legalCase).toMatch(/judicialRole\s+String\?/);
  });

  it("ubica la fecha de despido en los datos del caso", () => {
    expect(model("LaborCaseData")).toMatch(/dismissalDate\s+DateTime\?/);
    expect(model("Client")).not.toContain("dismissalDate");
  });

  it("permite casos laborales individuales y colectivos sin campos rígidos por tipo", () => {
    const laborData = model("LaborCaseData");

    expect(laborData).toContain("collectiveOrganization");
    expect(laborData).toContain("collectiveActionType");
    expect(laborData).toContain("employerOrCounterparty");
  });

  it("modela catálogos configurables sin prioridad manual", () => {
    expect(schema).toContain("CASE_NATURE");
    expect(schema).toContain("CASE_STATUS");
    expect(schema).toContain("PARTICIPATION_ROLE");
    expect(schema).not.toContain("PRIORITY");
  });

  it("impide más de una participación principal vigente por caso", () => {
    expect(migration).toContain("case_participations_one_current_primary_per_case");
    expect(migration).toContain('WHERE "primary" = true AND "ended_at" IS NULL');
  });

  it("aplica aislamiento por estudio en las relaciones operativas", () => {
    expect(migration).toContain('FOREIGN KEY ("case_id", "study_id")');
    expect(migration).toContain('REFERENCES "legal_cases"("id", "study_id")');
    expect(migration).toContain('FOREIGN KEY ("participant_id", "study_id")');
    expect(migration).toContain('REFERENCES "users"("id", "study_id")');
  });

  it("exige una base de preproducción vacía para reemplazar el esquema", () => {
    expect(migration).toContain("requires an empty preproduction database");
    expect(migration).toContain('EXISTS (SELECT 1 FROM "legal_cases")');
  });

  it("no modela credenciales judiciales ni documentos", () => {
    expect(schema.toLowerCase()).not.toMatch(/password|credential|secret|document/);
    expect(schema.toLowerCase()).not.toContain("ojv");
  });
});
