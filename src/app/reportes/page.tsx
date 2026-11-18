import { AppShell } from "@/components/app-shell";
import { ReportsScreen } from "@/components/reports-screen";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaReportRepository } from "@/infrastructure/prisma/prisma-report-repository";

export const instant = false;

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ responsable?: string; etapa?: string; estado?: string }> }) {
  const actor = await getServerActor();
  const query = await searchParams;
  const filters = { responsibleId: query.responsable, stage: query.etapa, status: query.estado };
  const summary = await createPrismaReportRepository(actor.studyId).summary(filters);
  return (
    <AppShell active="reports">
      <ReportsScreen summary={summary} canExport={actor.role === "Socio"} filters={filters} />
    </AppShell>
  );
}
