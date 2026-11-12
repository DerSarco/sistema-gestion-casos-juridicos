"use client";
import Link from "next/link";
import { useActionState } from "react";
import { saveCaseAction, type CaseFormState } from "@/app/casos/actions";
import type { PersistentCase } from "@/modules/cases/domain/persistent-case";
import { PageHeading } from "./page-heading";

type Option = { id: string; displayName?: string; name?: string; code?: string };
export function PersistentCaseForm({ current, options }: { current: PersistentCase | null; options: { clients: Option[]; matters: Option[]; stages: Option[]; users: Option[] } }) {
  const [state, action, pending] = useActionState(saveCaseAction, { status: "idle" } as CaseFormState);
  const value = (key: keyof NonNullable<CaseFormState["values"]>, fallback = "") => state.values?.[key] ?? fallback;
  return <div className="form-page"><PageHeading title={current ? "Editar caso" : "Registrar caso"} subtitle="Registro interno persistente con trazabilidad" />
    <form className="form-card" action={action} noValidate>
      {current && <input type="hidden" name="caseId" value={current.id} />}
      {(state.status === "invalid" || state.status === "error") && <div className="error-summary" role="alert"><strong>Revise el formulario</strong><span>{state.message ?? Object.values(state.errors ?? {})[0]}</span></div>}
      <label className="field"><span>Cliente activo <b>*</b></span><select name="clientId" defaultValue={value("clientId", current?.clientId)}><option value="">Seleccionar cliente…</option>{options.clients.map((item) => <option key={item.id} value={item.id}>{item.displayName}</option>)}</select></label>
      <div className="form-grid"><label className="field"><span>Materia laboral <b>*</b></span><select name="matterId" defaultValue={value("matterId", current?.matterId)}><option value="">Seleccionar materia…</option>{options.matters.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="field"><span>Etapa <b>*</b></span><select name="stageId" defaultValue={value("stageId", current?.stageId)}><option value="">Seleccionar etapa…</option>{options.stages.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label></div>
      <label className="field"><span>Título <b>*</b></span><input name="title" defaultValue={value("title", current?.title)} /></label>
      <label className="field"><span>Responsable principal <b>*</b></span><select name="responsibleId" defaultValue={value("responsibleId", current?.responsibleId)}><option value="">Seleccionar responsable…</option>{options.users.map((item) => <option key={item.id} value={item.id}>{item.displayName}</option>)}</select></label>
      <aside className="notice"><strong>Registro manual interno</strong><span>Sin conexión, sincronización ni credenciales de la OJV.</span></aside>
      <div className="form-grid"><label className="field"><span>Tribunal <em>Opcional</em></span><input name="court" defaultValue={value("court", current?.court ?? "")} /></label><label className="field"><span>RIT <em>Opcional</em></span><input name="rit" defaultValue={value("rit", current?.rit ?? "")} /></label></div>
      <label className="field"><span>ROL <em>Opcional</em></span><input name="judicialRole" defaultValue={value("judicialRole", current?.judicialRole ?? "")} /></label>
      <label className="field"><span>Observaciones</span><textarea name="notes" defaultValue={value("notes", current?.notes ?? "")} /></label>
      <footer className="form-actions"><Link className="button button-secondary" href={current ? `/casos/${current.internalCode}` : "/casos"}>Cancelar</Link><button className="button button-primary" disabled={pending}>{pending ? "Guardando…" : "Guardar caso"}</button></footer>
    </form></div>;
}
