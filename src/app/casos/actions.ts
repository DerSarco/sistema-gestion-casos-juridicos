"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import {
  getServerActor,
  requirePartner,
} from "@/infrastructure/auth/server-actor";
import { createPrismaCaseRepository } from "@/infrastructure/prisma/prisma-case-repository";
import {
  normalizePersistentCaseInput,
  validatePersistentCaseInput,
  type CaseValidationErrors,
  type PersistentCaseInput,
} from "@/modules/cases/domain/persistent-case";

export type CaseFormState = {
  status: "idle" | "invalid" | "error";
  errors?: CaseValidationErrors;
  message?: string;
  values?: PersistentCaseInput;
};

function formInput(data: FormData): PersistentCaseInput {
  return {
    clientId: String(data.get("clientId") ?? ""),
    matterId: String(data.get("matterId") ?? ""),
    stageId: String(data.get("stageId") ?? ""),
    title: String(data.get("title") ?? ""),
    responsibleId: String(data.get("responsibleId") ?? ""),
    court: String(data.get("court") ?? ""),
    rit: String(data.get("rit") ?? ""),
    judicialRole: String(data.get("judicialRole") ?? ""),
    notes: String(data.get("notes") ?? ""),
  };
}

export async function saveCaseAction(
  _previous: CaseFormState,
  data: FormData,
): Promise<CaseFormState> {
  const actor = await getServerActor();
  const input = normalizePersistentCaseInput(formInput(data));
  const errors = validatePersistentCaseInput(input);
  if (Object.keys(errors).length)
    return { status: "invalid", errors, values: input };
  try {
    const saved = await createPrismaCaseRepository(actor.studyId).save(
      String(data.get("caseId") ?? "") || null,
      input,
      actor.id,
    );
    revalidatePath("/casos");
    redirect(`/casos/${saved.internalCode}`);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "No fue posible guardar el caso.",
      values: input,
    };
  }
}

export type CaseLifecycleState = { status: "idle" | "error"; message?: string };
export async function changeCaseLifecycleAction(
  _previous: CaseLifecycleState,
  data: FormData,
): Promise<CaseLifecycleState> {
  try {
    const actor = await getServerActor();
    requirePartner(actor);
    const reason = String(data.get("reason") ?? "").trim();
    if (reason.length < 5)
      return {
        status: "error",
        message: "Indica un motivo de al menos 5 caracteres.",
      };
    const target = data.get("target") === "ARCHIVED" ? "ARCHIVED" : "ACTIVE";
    const result = await createPrismaCaseRepository(
      actor.studyId,
    ).changeLifecycle(
      String(data.get("caseId") ?? ""),
      target,
      reason,
      actor.id,
    );
    if (!result)
      return {
        status: "error",
        message: "El caso no existe o no pertenece al estudio.",
      };
    revalidatePath("/casos");
    revalidatePath(`/casos/${result.internalCode}`);
    return { status: "idle" };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "No fue posible cambiar el ciclo del caso.",
    };
  }
}

export async function changeCaseStageAction(_previous: CaseLifecycleState, data: FormData): Promise<CaseLifecycleState> {
  try {
    const actor = await getServerActor();
    const result = await createPrismaCaseRepository(actor.studyId).changeStage(String(data.get("caseId") ?? ""), String(data.get("stageId") ?? ""), String(data.get("reason") ?? "").trim(), actor.id);
    if (!result) return { status: "error", message: "La etapa o el caso no pertenecen al estudio." };
    revalidatePath("/casos"); revalidatePath(`/casos/${result.internalCode}`);
    redirect(`/casos/${result.internalCode}`, RedirectType.replace);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return { status: "error", message: error instanceof Error ? error.message : "No fue posible cambiar la etapa." };
  }
}
