"use client";
import Link from "next/link";
import { useActionState } from "react";
import { changeCaseStageAction, type CaseLifecycleState } from "@/app/casos/actions";
import type { PersistentCase } from "@/modules/cases/domain/persistent-case";
import { Modal } from "./modal";

export function PersistentCaseStageForm({ legalCase, stages }: { legalCase: PersistentCase; stages: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(changeCaseStageAction, { status: "idle" } as CaseLifecycleState); const closeHref = `/casos/${legalCase.internalCode}`;
  return <Modal title="Cambiar etapa del caso" subtitle={`${legalCase.internalCode} · ${legalCase.clientName}`} closeHref={closeHref}><form className="modal-body" action={action}><input type="hidden" name="caseId" value={legalCase.id} /><div className="current-state"><span>Etapa actual</span><span className="tag">{legalCase.stage}</span></div>{state.message && <div className="error-summary" role="alert">{state.message}</div>}<label className="field"><span>Nueva etapa</span><select name="stageId" defaultValue={legalCase.stageId}>{stages.map((stage) => <option key={stage.id} value={stage.id}>{stage.name}</option>)}</select></label><label className="field"><span>Motivo u observación <em>Opcional</em></span><textarea name="reason" /></label><footer className="form-actions"><Link replace className="button button-secondary" href={closeHref}>Cancelar</Link><button className="button button-primary" disabled={pending}>{pending ? "Guardando…" : "Confirmar cambio"}</button></footer></form></Modal>;
}
