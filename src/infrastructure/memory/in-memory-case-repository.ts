import type { CaseRepository } from "@/modules/cases/application/case-repository";
import type { LegalCase } from "@/modules/cases/domain/legal-case";

export class InMemoryCaseRepository implements CaseRepository {
  private readonly cases: LegalCase[];

  constructor(initialCases: LegalCase[] = []) {
    this.cases = structuredClone(initialCases);
  }

  list(): LegalCase[] {
    return structuredClone(this.cases).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
  }

  save(legalCase: LegalCase): void {
    this.cases.push(structuredClone(legalCase));
  }
}
