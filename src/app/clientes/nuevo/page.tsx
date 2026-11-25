import { AppShell } from "@/components/app-shell";
import { ClientForm } from "@/components/client-form";
import { connection } from "next/server";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaClientRepository } from "@/infrastructure/prisma/prisma-client-repository";
import { createPrismaAuthorizationRepository } from "@/infrastructure/prisma/prisma-authorization-repository";

export const instant = false;

export default async function NewClientPage({ searchParams }: { searchParams: Promise<{ cliente?: string }> }) {
  await connection();
  const { cliente } = await searchParams;
  const actor = await getServerActor();
  const client = cliente ? await createPrismaClientRepository(actor.studyId).findById(cliente) : null;
  const authorizationDocuments = client ? await createPrismaAuthorizationRepository(actor.studyId).listForClient(client.id) : [];
  return <AppShell active="clients"><ClientForm client={client ?? undefined} canManageLifecycle={actor.role === "Socio"} authorizationDocuments={authorizationDocuments} /></AppShell>;
}
