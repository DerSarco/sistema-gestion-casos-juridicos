import { PersistentCaseDetail } from "@/components/persistent-case-detail";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";

export const instant = false;

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const actor = await getServerActor(); return <PersistentCaseDetail legalCase={await createPrismaCaseRepository(actor.studyId).findByIdOrCode(id)} />; }
