"use server";

import { revalidatePath } from "next/cache";
import { getServerActor, requirePartner } from "@/infrastructure/auth/server-actor";
import { createPrismaUserRepository } from "@/infrastructure/prisma/prisma-user-repository";

export type UserActionState = { status: "idle" | "error" | "success"; message?: string };

export async function createUserAction(_previous: UserActionState, data: FormData): Promise<UserActionState> {
  try {
    const actor = await getServerActor();
    requirePartner(actor);
    const displayName = String(data.get("displayName") ?? "").trim();
    const accessIdentifier = String(data.get("accessIdentifier") ?? "").trim().toLocaleLowerCase("es-CL");
    const roleId = String(data.get("roleId") ?? "");
    if (displayName.length < 3) return { status: "error", message: "Ingresa un nombre de al menos 3 caracteres." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accessIdentifier)) return { status: "error", message: "Ingresa un identificador con formato de correo válido." };
    await createPrismaUserRepository(actor.studyId).create({ displayName, accessIdentifier, roleId }, actor.id);
    revalidatePath("/usuarios");
    return { status: "success", message: "Usuario interno creado correctamente." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "No fue posible crear el usuario." };
  }
}

export async function changeUserStatusAction(_previous: UserActionState, data: FormData): Promise<UserActionState> {
  try {
    const actor = await getServerActor();
    requirePartner(actor);
    const changed = await createPrismaUserRepository(actor.studyId).changeStatus(
      String(data.get("userId") ?? ""),
      data.get("target") === "ACTIVE" ? "ACTIVE" : "INACTIVE",
      actor.id,
    );
    if (!changed) return { status: "error", message: "El usuario no pertenece al estudio." };
    revalidatePath("/usuarios");
    return { status: "success" };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "No fue posible cambiar el estado." };
  }
}
