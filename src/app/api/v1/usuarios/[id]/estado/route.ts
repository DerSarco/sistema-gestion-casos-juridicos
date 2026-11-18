import { NextResponse } from "next/server";
import { createPrismaUserRepository } from "@/infrastructure/prisma/prisma-user-repository";
import { apiError, apiNotFound, apiValidation, authorizeApi, isApiError, isJsonError, readJsonObject } from "../../../_shared/http";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await authorizeApi("user:manage");
  if (isApiError(actor)) return actor;
  const body = await readJsonObject(request);
  if (isJsonError(body)) return body;
  const status = body.status === "ACTIVE" ? "ACTIVE" : body.status === "INACTIVE" ? "INACTIVE" : null;
  if (!status) return apiValidation({ status: "El estado debe ser ACTIVE o INACTIVE." });
  try {
    const { id } = await params;
    const changed = await createPrismaUserRepository(actor.studyId).changeStatus(id, status, actor.id);
    if (!changed) return apiNotFound("El usuario");
    return NextResponse.json({ data: { id, status } });
  } catch (error) {
    return apiError(409, "USER_STATUS_CONFLICT", error instanceof Error ? error.message : "No fue posible cambiar el estado.");
  }
}
