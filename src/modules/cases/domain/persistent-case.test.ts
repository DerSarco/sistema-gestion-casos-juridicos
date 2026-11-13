import { describe, expect, it } from "vitest";
import {
  normalizePersistentCaseInput,
  type PersistentCaseInput,
  validateLaborFields,
  validatePersistentCaseInput,
} from "./persistent-case";

const base: PersistentCaseInput = {
  clientId: "client",
  matterId: "matter",
  stageId: "stage",
  title: "Caso laboral",
  responsibleId: "user",
  participantIds: [],
  court: "",
  rit: "",
  judicialRole: "",
  notes: "",
  employerOrCounterparty: "",
  employmentStartDate: "",
  dismissalDate: "",
  collectiveOrganization: "",
  collectiveActionType: "",
  severanceDetails: "",
  amount: "",
};

describe("validateLaborFields", () => {
  it("exige los antecedentes propios de un despido", () => {
    expect(validateLaborFields(base, "DISMISSAL")).toEqual({
      employerOrCounterparty: "Ingresa el empleador o contraparte.",
      employmentStartDate: "Ingresa la fecha de inicio laboral.",
      dismissalDate: "Ingresa la fecha de despido.",
    });
  });

  it("rechaza una fecha de despido anterior al inicio laboral", () => {
    expect(
      validateLaborFields(
        {
          ...base,
          employerOrCounterparty: "Empresa Ficticia",
          employmentStartDate: "2026-10-10",
          dismissalDate: "2026-10-01",
        },
        "DISMISSAL",
      ).dismissalDate,
    ).toContain("no puede ser anterior");
  });

  it("exige organización y gestión solo para materia colectiva", () => {
    expect(validateLaborFields(base, "COLLECTIVE")).toEqual({
      collectiveOrganization: "Ingresa el sindicato u organización colectiva.",
      collectiveActionType: "Ingresa el tipo de gestión colectiva.",
    });
    expect(validateLaborFields(base, "OTHER")).toEqual({});
  });

  it("deduplica apoyos y evita repetir al responsable principal", () => {
    const normalized = normalizePersistentCaseInput({
      ...base,
      participantIds: ["support", "support"],
    });
    expect(normalized.participantIds).toEqual(["support"]);
    expect(validateLaborFields(normalized, "OTHER")).toEqual({});
    expect(
      validatePersistentCaseInput({
        ...normalized,
        participantIds: [normalized.responsibleId],
      }).participantIds,
    ).toContain("no debe repetirse");
  });
});
