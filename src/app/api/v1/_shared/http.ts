import { NextResponse } from "next/server";
import { getOptionalServerActor, type ServerActor } from "@/infrastructure/auth/server-actor";
import { can, type Capability } from "@/modules/auth/domain/authorization";

export type ApiErrorBody = {
  error: { code: string; message: string; fields?: Record<string, string> };
};

export function apiError(
  status: number,
  code: string,
  message: string,
  fields?: Record<string, string>,
): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    { error: { code, message, ...(fields ? { fields } : {}) } },
    { status },
  );
}

export async function authorizeApi(
  capability: Capability,
): Promise<ServerActor | NextResponse<ApiErrorBody>> {
  const actor = await getOptionalServerActor();
  if (!actor) return apiError(401, "UNAUTHENTICATED", "Se requiere una sesión vigente.");
  if (!can(actor.role, capability))
    return apiError(403, "FORBIDDEN", "No tienes permisos para realizar esta acción.");
  return actor;
}

export function isApiError(value: ServerActor | NextResponse<ApiErrorBody>): value is NextResponse<ApiErrorBody> {
  return value instanceof NextResponse;
}

export function apiNotFound(resource: string): NextResponse<ApiErrorBody> {
  return apiError(404, "NOT_FOUND", `${resource} no está disponible.`);
}

export function apiValidation(fields: Record<string, string>): NextResponse<ApiErrorBody> {
  return apiError(422, "VALIDATION_ERROR", "Revisa los datos enviados.", fields);
}

export async function readJsonObject(
  request: Request,
): Promise<Record<string, unknown> | NextResponse<ApiErrorBody>> {
  try {
    const value: unknown = await request.json();
    if (!value || typeof value !== "object" || Array.isArray(value))
      return apiError(400, "INVALID_JSON", "El cuerpo debe ser un objeto JSON.");
    return value as Record<string, unknown>;
  } catch {
    return apiError(400, "INVALID_JSON", "El cuerpo JSON no es válido.");
  }
}

export function isJsonError(
  value: Record<string, unknown> | NextResponse<ApiErrorBody>,
): value is NextResponse<ApiErrorBody> {
  return value instanceof NextResponse;
}

