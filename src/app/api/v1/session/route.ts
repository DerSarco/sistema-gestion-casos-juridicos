import { NextResponse } from "next/server";
import { getOptionalServerActor } from "@/infrastructure/auth/server-actor";
import { apiError } from "../_shared/http";

export async function GET() {
  const actor = await getOptionalServerActor();
  if (!actor) return apiError(401, "UNAUTHENTICATED", "Se requiere una sesión vigente.");
  return NextResponse.json({ data: actor });
}

