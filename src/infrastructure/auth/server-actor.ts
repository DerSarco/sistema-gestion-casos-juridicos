import { getPrismaClient } from "@/infrastructure/prisma/prisma-client";

const DEFAULT_STUDY_ID = "10000000-0000-4000-8000-000000000001";
const DEFAULT_ACTOR_ID = "10000000-0000-4000-8000-000000000201";

export type ServerActor = { id: string; studyId: string; role: string };

export async function getServerActor(): Promise<ServerActor> {
  const studyId = process.env.DEMO_STUDY_ID ?? DEFAULT_STUDY_ID;
  const actorId = process.env.DEMO_ACTOR_ID ?? DEFAULT_ACTOR_ID;
  const user = await getPrismaClient().user.findFirst({
    where: { id: actorId, studyId, status: "ACTIVE" },
    select: { id: true, studyId: true, role: { select: { name: true } } },
  });
  if (!user) throw new Error("El actor interno de demostración no está habilitado.");
  return { id: user.id, studyId: user.studyId, role: user.role.name };
}

export function requirePartner(actor: ServerActor): void {
  if (actor.role !== "Socio") {
    throw new Error("No tienes permiso para cambiar el estado de un cliente.");
  }
}
