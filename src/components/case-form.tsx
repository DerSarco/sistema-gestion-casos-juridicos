"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { PageHeading } from "./page-heading";
import { useSessionStore, type SessionCase } from "./session-store";

type Errors = Partial<Record<"client" | "title" | "lawyer" | "status" | "stage", string>>;

export function CaseForm({ caseCode }: { caseCode?: string }) {
  const router = useRouter();
  const { clients, cases, saveCase } = useSessionStore();
  const existing = cases.find((item) => item.code === caseCode);
  const [clientId, setClientId] = useState(existing?.clientId ?? "");
  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [lawyer, setLawyer] = useState(existing?.lawyer ?? "");
  const [status, setStatus] = useState<SessionCase["status"]>(existing?.status ?? "Activo");
  const [stage, setStage] = useState<SessionCase["stage"]>(existing?.stage ?? "Ingreso");
  const [court, setCourt] = useState(existing?.court ?? "");
  const [ritRol, setRitRol] = useState(existing?.ritRol ?? "");
  const [errors, setErrors] = useState<Errors>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!clientId) next.client = "Seleccione un cliente.";
    if (!title.trim()) next.title = "Ingrese el título o materia.";
    if (!lawyer) next.lawyer = "Seleccione un abogado responsable.";
    if (!status) next.status = "Seleccione un estado.";
    if (!stage) next.stage = "Seleccione una etapa.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const saved = saveCase({ clientId, title: title.trim(), description: description.trim(), lawyer, status, stage, court: court.trim(), ritRol: ritRol.trim() }, existing?.id);
    router.push(`/casos/${saved.code}`);
  }

  return <div className="form-page">
    <PageHeading title={existing ? "Editar caso" : "Registrar caso"} subtitle="Los cambios se conservan durante esta sesión de demostración" />
    <form className="form-card" onSubmit={submit} noValidate>
      {Object.keys(errors).length > 0 && <div className="error-summary" role="alert"><strong>Revise los campos indicados</strong><span>{Object.values(errors)[0]}</span></div>}
      <label className="field"><span>Cliente <b>*</b></span><select value={clientId} onChange={(event) => setClientId(event.target.value)} aria-invalid={Boolean(errors.client)} aria-describedby={errors.client ? "case-client-error" : undefined}><option value="">Seleccionar cliente...</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.code} · {client.name}</option>)}</select>{errors.client && <small id="case-client-error" className="field-error">{errors.client}</small>}</label>
      <label className="field"><span>Título o materia <b>*</b></span><input value={title} onChange={(event) => setTitle(event.target.value)} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "case-title-error" : undefined} />{errors.title && <small id="case-title-error" className="field-error">{errors.title}</small>}</label>
      <label className="field"><span>Descripción breve</span><textarea value={description} onChange={(event) => setDescription(event.target.value)} /></label>
      <label className="field"><span>Abogado responsable <b>*</b></span><select value={lawyer} onChange={(event) => setLawyer(event.target.value)} aria-invalid={Boolean(errors.lawyer)} aria-describedby={errors.lawyer ? "case-lawyer-error" : undefined}><option value="">Seleccionar abogado responsable...</option><option>Abogado A</option><option>Abogado B</option></select>{errors.lawyer && <small id="case-lawyer-error" className="field-error">{errors.lawyer}</small>}</label>
      <div className="form-grid"><label className="field"><span>Estado <b>*</b></span><select value={status} onChange={(event) => setStatus(event.target.value as SessionCase["status"])}><option>Activo</option><option>En revisión</option><option>Cerrado</option></select></label><label className="field"><span>Etapa <b>*</b></span><select value={stage} onChange={(event) => setStage(event.target.value as SessionCase["stage"])}><option>Ingreso</option><option>Presentación</option><option>Antecedentes</option><option>Finalizado</option></select></label></div>
      <aside className="notice"><strong>Registro manual interno</strong><span>No existe sincronización con plataformas judiciales externas.</span></aside>
      <div className="form-grid"><label className="field"><span>Tribunal <em>Opcional</em></span><input value={court} onChange={(event) => setCourt(event.target.value)} /></label><label className="field"><span>RIT o ROL <em>Opcional</em></span><input value={ritRol} onChange={(event) => setRitRol(event.target.value)} /></label></div>
      <footer className="form-actions"><Link className="button button-secondary" href={existing ? `/casos/${existing.code}` : "/casos"}>Cancelar</Link><button className="button button-primary" type="submit">Guardar caso</button></footer>
    </form>
  </div>;
}
