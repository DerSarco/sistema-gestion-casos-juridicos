import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const schema = readFileSync("prisma/schema.prisma", "utf8");
const migration = readFileSync(
  "prisma/migrations/20261016193000_initial/migration.sql",
  "utf8",
);

describe("esquema PostgreSQL inicial", () => {
  it("mantiene antecedentes judiciales opcionales", () => {
    expect(schema).toContain("court        String?");
    expect(schema).toContain("ritRol       String?");
  });

  it("impide más de una asignación principal vigente por caso", () => {
    expect(migration).toContain("assignments_one_current_primary_per_case");
    expect(migration).toContain('WHERE "primary" = true AND "ended_at" IS NULL');
  });

  it("no modela credenciales judiciales ni documentos", () => {
    expect(schema.toLowerCase()).not.toMatch(/password|credential|secret|document/);
    expect(schema.toLowerCase()).not.toContain("ojv");
  });
});
