import { AppShell } from "@/components/app-shell";
import { PersistentCaseForm } from "@/components/persistent-case-form";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";

export const instant = false;

export default async function NewCasePage({ searchParams }: { searchParams: Promise<{ editar?: string }> }) {
  const { editar } = await searchParams;
  const actor = await getServerActor(); const repository = createPrismaCaseRepository(actor.studyId);
  const [current, options] = await Promise.all([editar ? repository.findByIdOrCode(editar) : Promise.resolve(null), repository.formOptions()]);
  return <AppShell active="cases"><PersistentCaseForm key={current?.id ?? "new"} current={current} options={options} actorId={actor.id} canDistribute={actor.role === "Socio"} /></AppShell>;
}
