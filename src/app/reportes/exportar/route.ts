import { getOptionalServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaReportRepository } from "@/infrastructure/prisma/prisma-report-repository";
import { buildCaseCsv } from "@/modules/reports/csv";

export async function POST(): Promise<Response> {
  const actor = await getOptionalServerActor();
  if (!actor)
    return Response.json({ message: "Acceso no autorizado." }, { status: 401 });
  if (actor.role !== "Socio")
    return Response.json(
      { message: "La exportación requiere el perfil Socio." },
      { status: 403 },
    );
  const rows = await createPrismaReportRepository(actor.studyId).exportRows(
    actor.id,
  );
  return new Response(buildCaseCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="reporte-casos.csv"',
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
