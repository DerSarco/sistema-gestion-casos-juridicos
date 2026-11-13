import { AppShell } from "@/components/app-shell";
import { ReportsScreen } from "@/components/reports-screen";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaReportRepository } from "@/infrastructure/prisma/prisma-report-repository";

export const instant = false;

export default async function ReportsPage() {
  const actor = await getServerActor();
  const summary = await createPrismaReportRepository(actor.studyId).summary();
  return (
    <AppShell active="reports">
      <ReportsScreen summary={summary} canExport={actor.role === "Socio"} />
    </AppShell>
  );
}
