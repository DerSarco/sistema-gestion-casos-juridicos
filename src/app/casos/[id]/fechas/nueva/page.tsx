import { PersistentCaseDetail } from "@/components/persistent-case-detail";
import { RelevantDateForm } from "@/components/relevant-date-form";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";
export const instant = false;
export default async function NewDatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const actor = await getServerActor();
  const repository = createPrismaCaseRepository(actor.studyId);
  const [legalCase, options] = await Promise.all([
    repository.findByIdOrCode(id),
    repository.formOptions(),
  ]);
  return (
    <PersistentCaseDetail
      legalCase={legalCase}
      modal={
        legalCase ? (
          <RelevantDateForm
            legalCase={legalCase}
            types={options.dateTypes}
            users={options.users}
          />
        ) : undefined
      }
    />
  );
}
