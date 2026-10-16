import type { LegalCase } from "../domain/legal-case";

export interface CaseRepository {
  list(): LegalCase[];
  save(legalCase: LegalCase): void;
}
