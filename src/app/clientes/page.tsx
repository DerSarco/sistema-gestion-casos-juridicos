import { AppShell } from "@/components/app-shell";
import { ClientsScreen } from "@/components/clients-screen";
import { connection } from "next/server";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaClientRepository } from "@/infrastructure/prisma/prisma-client-repository";

export const instant = false;

export default async function ClientsPage() {
  await connection();
  const actor = await getServerActor();
  const clients = await createPrismaClientRepository(actor.studyId).list();
  return (
    <AppShell active="clients">
      <ClientsScreen
        clients={clients}
        canManageLifecycle={actor.role === "Socio"}
      />
    </AppShell>
  );
}
