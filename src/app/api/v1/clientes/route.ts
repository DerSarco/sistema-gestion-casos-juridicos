import { NextResponse } from "next/server";
import { createPrismaClientRepository } from "@/infrastructure/prisma/prisma-client-repository";
import { normalizeClientInput, validateClientInput } from "@/modules/clients/domain/client";
import { apiError, apiValidation, authorizeApi, isApiError, isJsonError, readJsonObject } from "../_shared/http";

export async function GET() {
  const actor = await authorizeApi("client:read");
  if (isApiError(actor)) return actor;
  const clients = await createPrismaClientRepository(actor.studyId).list();
  return NextResponse.json({ data: clients });
}

export async function POST(request: Request) {
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
    const client = await createPrismaClientRepository(actor.studyId).create(input, actor.id);
    return NextResponse.json({ data: client }, { status: 201 });
  } catch (error) {
    return apiError(409, "CLIENT_CONFLICT", error instanceof Error ? error.message : "No fue posible crear el cliente.");
  }
}

