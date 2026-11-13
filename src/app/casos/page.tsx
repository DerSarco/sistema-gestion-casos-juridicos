import { AppShell } from "@/components/app-shell";
import { PersistentCasesScreen } from "@/components/persistent-cases-screen";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";
import { connection } from "next/server";

export const instant = false;

export default async function CasesPage() {
  await connection(); const actor = await getServerActor(); const cases = await createPrismaCaseRepository(actor.studyId).list();
  return <AppShell active="cases"><PersistentCasesScreen cases={cases} /></AppShell>;
}
