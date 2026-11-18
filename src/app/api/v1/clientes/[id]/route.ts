import { NextResponse } from "next/server";
import { createPrismaClientRepository } from "@/infrastructure/prisma/prisma-client-repository";
import { normalizeClientInput, validateClientInput } from "@/modules/clients/domain/client";
import { apiError, apiNotFound, apiValidation, authorizeApi, isApiError, isJsonError, readJsonObject } from "../../_shared/http";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await authorizeApi("client:write");
  if (isApiError(actor)) return actor;
  const body = await readJsonObject(request);
  if (isJsonError(body)) return body;
  const input = normalizeClientInput({
    displayName: String(body.displayName ?? ""),
    rut: String(body.rut ?? ""),
    phone: String(body.phone ?? ""),
    email: String(body.email ?? ""),
    originMatter: String(body.originMatter ?? ""),
  });
  const errors = validateClientInput(input);
  if (Object.keys(errors).length) return apiValidation(errors as Record<string, string>);
  try {
    const { id } = await params;
    const client = await createPrismaClientRepository(actor.studyId).update(id, input, actor.id);
    if (!client) return apiNotFound("El cliente");
    return NextResponse.json({ data: client });
  } catch (error) {
    return apiError(409, "CLIENT_CONFLICT", error instanceof Error ? error.message : "No fue posible actualizar el cliente.");
  }
}
