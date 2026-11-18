import { NextResponse } from "next/server";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";
import { apiNotFound, apiValidation, authorizeApi, isApiError, isJsonError, readJsonObject } from "../../../_shared/http";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await authorizeApi("case:lifecycle");
  if (isApiError(actor)) return actor;
  const body = await readJsonObject(request);
  if (isJsonError(body)) return body;
  const status = body.status === "ARCHIVED" ? "ARCHIVED" : body.status === "ACTIVE" ? "ACTIVE" : null;
  const reason = String(body.reason ?? "").trim();
  const fields: Record<string, string> = {};
  if (!status) fields.status = "El estado debe ser ACTIVE o ARCHIVED.";
  if (reason.length < 5) fields.reason = "Indica un motivo de al menos 5 caracteres.";
  if (Object.keys(fields).length) return apiValidation(fields);
  const { id } = await params;
  const legalCase = await createPrismaCaseRepository(actor.studyId, actor).changeLifecycle(id, status!, reason, actor.id);
  if (!legalCase) return apiNotFound("El caso");
  return NextResponse.json({ data: legalCase });
}
