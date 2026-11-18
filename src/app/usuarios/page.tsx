import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { UsersScreen } from "@/components/users-screen";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaUserRepository } from "@/infrastructure/prisma/prisma-user-repository";

export const instant = false;

export default async function UsersPage() {
  const actor = await getServerActor();
  if (actor.role !== "Socio") redirect("/casos");
  const repository = createPrismaUserRepository(actor.studyId);
  const [users, roles] = await Promise.all([repository.list(), repository.roles()]);
  return <AppShell active="users"><UsersScreen users={users} roles={roles} actorId={actor.id} /></AppShell>;
}
