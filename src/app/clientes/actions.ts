"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerActor, requirePartner } from "@/infrastructure/auth/server-actor";
import { createPrismaClientRepository } from "@/infrastructure/prisma/prisma-client-repository";
import { normalizeClientInput, validateClientInput, findPotentialMatches, type ClientInput, type ClientValidationErrors } from "@/modules/clients/domain/client";

export type ClientFormState = {
  status: "idle" | "invalid" | "potential-match" | "error";
  errors?: ClientValidationErrors;
  message?: string;
  values?: ClientInput;
};

export const initialClientFormState: ClientFormState = { status: "idle" };

function formInput(formData: FormData): ClientInput {
  return {
    displayName: String(formData.get("displayName") ?? ""),
    rut: String(formData.get("rut") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    originMatter: String(formData.get("originMatter") ?? ""),
  };
}

export async function saveClientAction(_previous: ClientFormState, formData: FormData): Promise<ClientFormState> {
  const actor = await getServerActor();
  const repository = createPrismaClientRepository(actor.studyId);
  const input = normalizeClientInput(formInput(formData));
  const errors = validateClientInput(input);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values: input };

  const clientId = String(formData.get("clientId") ?? "");
  const matches = findPotentialMatches(await repository.list(), input).filter((item) => item.id !== clientId);
  if (matches.length > 0 && formData.get("confirmPotentialMatch") !== "true") {
    return { status: "potential-match", message: `Existe una ficha con el mismo nombre y origen (${matches[0].displayName}). Verifica antes de continuar.`, values: input };
  }

  try {
    if (clientId) {
      const updated = await repository.update(clientId, input, actor.id);
      if (!updated) return { status: "error", message: "El cliente no existe o no pertenece al estudio.", values: input };
    } else {
      await repository.create(input, actor.id);
    }
  } catch {
    return { status: "error", message: "No fue posible guardar. Los datos ingresados se conservaron para reintentar.", values: input };
  }
  revalidatePath("/clientes");
  redirect("/clientes");
}

export type LifecycleState = { status: "idle" | "error"; message?: string };
export const initialLifecycleState: LifecycleState = { status: "idle" };

export async function changeClientStatusAction(_previous: LifecycleState, formData: FormData): Promise<LifecycleState> {
  try {
    const actor = await getServerActor();
    requirePartner(actor);
    const id = String(formData.get("clientId") ?? "");
    const target = formData.get("targetStatus") === "ACTIVE" ? "ACTIVE" : "INACTIVE";
    const reason = String(formData.get("reason") ?? "").trim();
    if (reason.length < 5) return { status: "error", message: "Indica un motivo de al menos 5 caracteres." };
    const updated = await createPrismaClientRepository(actor.studyId).changeStatus(id, target, reason, actor.id);
    if (!updated) return { status: "error", message: "El cliente no existe o no pertenece al estudio." };
    revalidatePath("/clientes");
    return { status: "idle" };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "No fue posible cambiar el estado." };
  }
}
