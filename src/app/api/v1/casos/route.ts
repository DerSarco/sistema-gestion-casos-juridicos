import { NextResponse } from "next/server";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";
import { can } from "@/modules/auth/domain/authorization";
import { validatePersistentCaseInput } from "@/modules/cases/domain/persistent-case";
import { apiError, apiValidation, authorizeApi, isApiError, isJsonError, readJsonObject } from "../_shared/http";
import { caseInput } from "./_input";

export async function GET() {
  const actor = await authorizeApi("case:read");
  if (isApiError(actor)) return actor;
  const cases = await createPrismaCaseRepository(actor.studyId, actor).list();
  return NextResponse.json({ data: cases });
}

export async function POST(request: Request) {
  const actor = await authorizeApi("case:write");
  if (isApiError(actor)) return actor;
  const body = await readJsonObject(request);
  if (isJsonError(body)) return body;
  const input = caseInput(body);
  const errors = validatePersistentCaseInput(input);
  if (Object.keys(errors).length) return apiValidation(errors as Record<string, string>);
  if (!can(actor.role, "case:assign") && (input.responsibleId !== actor.id || input.participantIds.length))
    return apiError(403, "FORBIDDEN", "Solo un Socio puede distribuir el caso a otras personas.");
  try {
    const legalCase = await createPrismaCaseRepository(actor.studyId, actor).save(null, input, actor.id);
    return NextResponse.json({ data: legalCase }, { status: 201 });
  } catch (error) {
    return apiError(422, "CASE_INVALID", error instanceof Error ? error.message : "No fue posible crear el caso.");
  }
}

