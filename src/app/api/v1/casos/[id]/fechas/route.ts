import { NextResponse } from "next/server";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";
import { apiNotFound, apiValidation, authorizeApi, isApiError, isJsonError, readJsonObject } from "../../../_shared/http";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await authorizeApi("case:date");
  if (isApiError(actor)) return actor;
  const body = await readJsonObject(request);
  if (isJsonError(body)) return body;
  const input = {
    typeId: String(body.typeId ?? ""),
    responsibleId: String(body.responsibleId ?? ""),
    title: String(body.title ?? "").trim(),
    occursAt: String(body.occursAt ?? ""),
    source: String(body.source ?? "").trim(),
    notes: String(body.notes ?? "").trim(),
  };
  const fields: Record<string, string> = {};
  if (!input.typeId) fields.typeId = "Selecciona un tipo de fecha.";
  if (!input.responsibleId) fields.responsibleId = "Selecciona un responsable.";
  if (input.title.length < 3) fields.title = "Ingresa un título de al menos 3 caracteres.";
  if (!input.occursAt || Number.isNaN(Date.parse(input.occursAt))) fields.occursAt = "Ingresa una fecha y hora válidas.";
  if (body.typeCode === "MANUAL_EXPIRY" && input.source.length < 3) fields.source = "La caducidad manual requiere indicar su fuente.";
  if (Object.keys(fields).length) return apiValidation(fields);
  const { id } = await params;
  const legalCase = await createPrismaCaseRepository(actor.studyId, actor).addRelevantDate(id, input, actor.id);
  if (!legalCase) return apiNotFound("El caso, tipo o responsable");
  return NextResponse.json({ data: legalCase }, { status: 201 });
}
