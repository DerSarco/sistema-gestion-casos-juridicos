import { NextResponse } from "next/server";
import { createPrismaUserRepository } from "@/infrastructure/prisma/prisma-user-repository";
import { apiError, apiValidation, authorizeApi, isApiError, isJsonError, readJsonObject } from "../_shared/http";

export async function GET() {
  const actor = await authorizeApi("user:manage");
  if (isApiError(actor)) return actor;
  const repository = createPrismaUserRepository(actor.studyId);
  const [users, roles] = await Promise.all([repository.list(), repository.roles()]);
  return NextResponse.json({ data: { users, roles } });
}

export async function POST(request: Request) {
  const actor = await authorizeApi("user:manage");
  if (isApiError(actor)) return actor;
  const body = await readJsonObject(request);
  if (isJsonError(body)) return body;
  const displayName = String(body.displayName ?? "").trim();
  const accessIdentifier = String(body.accessIdentifier ?? "").trim().toLocaleLowerCase("es-CL");
  const roleId = String(body.roleId ?? "");
  const fields: Record<string, string> = {};
  if (displayName.length < 3) fields.displayName = "Ingresa un nombre de al menos 3 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accessIdentifier)) fields.accessIdentifier = "Ingresa un identificador con formato de correo válido.";
  if (!roleId) fields.roleId = "Selecciona un rol.";
  if (Object.keys(fields).length) return apiValidation(fields);
  try {
    const user = await createPrismaUserRepository(actor.studyId).create({ displayName, accessIdentifier, roleId }, actor.id);
    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    return apiError(409, "USER_CONFLICT", error instanceof Error ? error.message : "No fue posible crear el usuario.");
  }
}

