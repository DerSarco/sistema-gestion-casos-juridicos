import { NextResponse } from "next/server";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";
import { can } from "@/modules/auth/domain/authorization";
import { validatePersistentCaseInput } from "@/modules/cases/domain/persistent-case";
import { apiError, apiNotFound, apiValidation, authorizeApi, isApiError, isJsonError, readJsonObject } from "../../_shared/http";
import { caseInput } from "../_input";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const actor = await authorizeApi("case:read");
  if (isApiError(actor)) return actor;
  const { id } = await params;
  const legalCase = await createPrismaCaseRepository(actor.studyId, actor).findByIdOrCode(id);
  if (!legalCase) return apiNotFound("El caso");
  return NextResponse.json({ data: legalCase });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await authorizeApi("case:write");
  if (isApiError(actor)) return actor;
  const body = await readJsonObject(request);
  if (isJsonError(body)) return body;
  const input = caseInput(body);
  const errors = validatePersistentCaseInput(input);
  if (Object.keys(errors).length) return apiValidation(errors as Record<string, string>);
  const { id } = await params;
  const repository = createPrismaCaseRepository(actor.studyId, actor);
  const current = await repository.findByIdOrCode(id);
  if (!current) return apiNotFound("El caso");
  const assignmentChanged = current.responsibleId !== input.responsibleId || current.participants.map((item) => item.id).sort().join(",") !== [...input.participantIds].sort().join(",");
  if (assignmentChanged && !can(actor.role, "case:assign"))
    return apiError(403, "FORBIDDEN", "Solo un Socio puede distribuir o reasignar el caso.");
  try {
    const legalCase = await repository.save(current.id, input, actor.id);
    return NextResponse.json({ data: legalCase });
  } catch (error) {
    return apiError(422, "CASE_INVALID", error instanceof Error ? error.message : "No fue posible actualizar el caso.");
  }
}

