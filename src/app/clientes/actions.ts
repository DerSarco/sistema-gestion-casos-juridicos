"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerActor, requirePartner } from "@/infrastructure/auth/server-actor";
import { createPrismaAuthorizationRepository } from "@/infrastructure/prisma/prisma-authorization-repository";
import { createPrismaClientRepository } from "@/infrastructure/prisma/prisma-client-repository";
import { normalizeClientInput, validateClientInput, findPotentialMatches, type ClientInput, type ClientValidationErrors } from "@/modules/clients/domain/client";

export type ClientFormState = {
  status: "idle" | "invalid" | "potential-match" | "error";
  errors?: ClientValidationErrors;
  message?: string;
  values?: ClientInput;
};

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
      const created = await repository.create(input, actor.id);
      const authorization = await createPrismaAuthorizationRepository(actor.studyId).generate(created.id, actor.id);
      if (!authorization) return { status: "error", message: "El cliente se guardó, pero no fue posible generar el anexo.", values: input };
      revalidatePath("/clientes");
      redirect(`/clientes/${created.id}/autorizaciones/${authorization.id}`);
    }
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return { status: "error", message: "No fue posible guardar. Los datos ingresados se conservaron para reintentar.", values: input };
  }
  revalidatePath("/clientes");
  redirect("/clientes");
}

export async function generateClientAuthorizationAction(formData: FormData): Promise<void> {
  const actor = await getServerActor();
  const clientId = String(formData.get("clientId") ?? "");
  const document = await createPrismaAuthorizationRepository(actor.studyId).generate(clientId, actor.id);
  if (!document) throw new Error("El cliente no existe o no pertenece al estudio.");
  revalidatePath("/clientes/nuevo");
  redirect(`/clientes/${clientId}/autorizaciones/${document.id}`);
}

export async function updateAuthorizationStatusAction(formData: FormData): Promise<void> {
  const actor = await getServerActor();
  const clientId = String(formData.get("clientId") ?? "");
  const documentId = String(formData.get("documentId") ?? "");
  const value = String(formData.get("status") ?? "");
  const allowed = ["PENDING_SIGNATURE", "DELIVERED", "SIGNED", "REVOKED"] as const;
  const status = allowed.find((item) => item === value);
  if (!status) throw new Error("Estado de documento inválido.");
  const archiveReference = String(formData.get("archiveReference") ?? "").trim();
  if (archiveReference.length > 160) throw new Error("La referencia no puede superar 160 caracteres.");
  const updated = await createPrismaAuthorizationRepository(actor.studyId).updateStatus(documentId, clientId, actor.id, status, archiveReference);
  if (!updated) throw new Error("El documento no existe o no pertenece al estudio.");
  revalidatePath(`/clientes/nuevo?cliente=${clientId}`);
  redirect(`/clientes/nuevo?cliente=${clientId}`);
}

export type LifecycleState = { status: "idle" | "error"; message?: string };
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
    redirect("/clientes");
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return { status: "error", message: error instanceof Error ? error.message : "No fue posible cambiar el estado." };
  }
}
