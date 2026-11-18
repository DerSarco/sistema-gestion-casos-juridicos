import { NextResponse } from "next/server";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";
import { apiNotFound, apiValidation, authorizeApi, isApiError, isJsonError, readJsonObject } from "../../../_shared/http";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await authorizeApi("case:stage");
  if (isApiError(actor)) return actor;
  const body = await readJsonObject(request);
  if (isJsonError(body)) return body;
  const stageId = String(body.stageId ?? "");
  if (!stageId) return apiValidation({ stageId: "Selecciona una etapa." });
  const { id } = await params;
  const legalCase = await createPrismaCaseRepository(actor.studyId, actor).changeStage(id, stageId, String(body.reason ?? "").trim(), actor.id);
  if (!legalCase) return apiNotFound("El caso o la etapa");
  return NextResponse.json({ data: legalCase });
}
