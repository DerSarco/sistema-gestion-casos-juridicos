import { NextResponse } from "next/server";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";
import { authorizeApi, isApiError } from "../../_shared/http";

export async function GET() {
  const actor = await authorizeApi("case:write");
  if (isApiError(actor)) return actor;
  const options = await createPrismaCaseRepository(actor.studyId, actor).formOptions();
  return NextResponse.json({ data: options });
}
