"use client";
import { useActionState } from "react";
import { changeCaseLifecycleAction, type CaseLifecycleState } from "@/app/casos/actions";
import type { PersistentCase } from "@/modules/cases/domain/persistent-case";
export function CaseLifecycleForm({ legalCase }: { legalCase: PersistentCase }) {
  const [state, action, pending] = useActionState(changeCaseLifecycleAction, { status: "idle" } as CaseLifecycleState);
  const archived = legalCase.lifecycleStatus === "ARCHIVED";
  return <form className="lifecycle-form" action={action}><input type="hidden" name="caseId" value={legalCase.id} /><input type="hidden" name="target" value={archived ? "ACTIVE" : "ARCHIVED"} /><input name="reason" aria-label="Motivo del cambio" placeholder="Motivo del cambio" required /><button className="table-link" disabled={pending}>{pending ? "Procesando…" : archived ? "Reactivar" : "Archivar"}</button>{state.message && <small className="field-error">{state.message}</small>}</form>;
}
