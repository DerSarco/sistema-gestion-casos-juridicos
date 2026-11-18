import { NextResponse } from "next/server";
import { createPrismaReportRepository } from "@/infrastructure/prisma/prisma-report-repository";
import { authorizeApi, isApiError } from "../_shared/http";

export async function GET(request: Request) {
  const actor = await authorizeApi("report:read");
  if (isApiError(actor)) return actor;
  const query = new URL(request.url).searchParams;
  const summary = await createPrismaReportRepository(actor.studyId, actor).summary({
    responsibleId: query.get("responsable") || undefined,
    stage: query.get("etapa") || undefined,
    status: query.get("estado") || undefined,
  });
  return NextResponse.json({ data: summary });
}

