import { NextResponse } from "next/server";
import { createPrismaClientRepository } from "@/infrastructure/prisma/prisma-client-repository";
import { apiNotFound, apiValidation, authorizeApi, isApiError, isJsonError, readJsonObject } from "../../../_shared/http";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await authorizeApi("client:lifecycle");
  if (isApiError(actor)) return actor;
  const body = await readJsonObject(request);
  if (isJsonError(body)) return body;
  const status = body.status === "ACTIVE" ? "ACTIVE" : body.status === "INACTIVE" ? "INACTIVE" : null;
  const reason = String(body.reason ?? "").trim();
  const fields: Record<string, string> = {};
  if (!status) fields.status = "El estado debe ser ACTIVE o INACTIVE.";
  if (reason.length < 5) fields.reason = "Indica un motivo de al menos 5 caracteres.";
  if (Object.keys(fields).length) return apiValidation(fields);
  const { id } = await params;
  const changed = await createPrismaClientRepository(actor.studyId).changeStatus(id, status!, reason, actor.id);
  if (!changed) return apiNotFound("El cliente");
  return NextResponse.json({ data: { id, status } });
}
