"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { AppShell } from "./app-shell";
import { Icon } from "./icons";
import { useSessionStore } from "./session-store";

export function CaseDetail({ caseCode, modal }: { caseCode: string; modal?: ReactNode }) {
  const { cases, clients } = useSessionStore();
  const item = cases.find((entry) => entry.code === caseCode);
  if (!item) return <AppShell active="cases"><section className="empty-state card"><strong>Caso no disponible</strong><span>El código solicitado no existe en esta sesión.</span><Link className="button button-secondary" href="/casos">Volver a casos</Link></section></AppShell>;
  const client = clients.find(({ id }) => id === item.clientId); const statusClass = item.status.toLowerCase().replace(" ", "-"); const nextDate = item.dates[0];
  return <AppShell active="cases"><section className="case-header card"><div><div className="case-title-row"><h1>{item.code}</h1><span className={`status status-${statusClass}`}>{item.status}</span><span className="tag">{item.stage}</span></div><p>{item.title}</p></div><div className="button-row"><Link className="button button-secondary" href={`/casos/${item.code}/estado`}>Cambiar estado / etapa</Link><Link className="button button-primary" href={`/casos/nuevo?editar=${item.code}`}>Editar caso</Link></div></section>
    <div className="detail-grid"><div className="detail-main"><section className="card detail-card"><header><h2>Datos generales del caso</h2><Link className="text-action" href={`/casos/${item.code}/fechas/nueva`}>+ Registrar fecha</Link></header><dl className="facts"><div><dt>Cliente vinculado</dt><dd>{client?.name ?? "Cliente no disponible"}</dd></div><div><dt>Abogado responsable</dt><dd>{item.lawyer}</dd></div><div><dt>Estado actual</dt><dd><span className={`status status-${statusClass}`}>{item.status}</span></dd></div><div><dt>Etapa procesal</dt><dd>{item.stage}</dd></div></dl>{nextDate ? <div className="date-highlight"><Icon name="calendar" /><strong>{nextDate.date}{nextDate.time ? ` · ${nextDate.time}` : ""}</strong><span>{nextDate.name} · {nextDate.responsible}</span></div> : <p className="muted">No hay fechas relevantes registradas.</p>}</section>
      <section className="card detail-card"><header><h2>Descripción breve</h2></header><p>{item.description || "Sin descripción registrada."}</p></section><section className="card detail-card"><header><h2>Historial básico de cambios</h2></header>{item.history.length ? <ol className="timeline">{item.history.map((entry) => <li key={entry.id}><time>{entry.occurredAt}</time><span>{entry.description}</span></li>)}</ol> : <p className="muted">No hay cambios registrados en esta sesión.</p>}</section></div>
      <aside className="detail-side"><section className="card detail-card"><header><h2>Antecedentes judiciales</h2></header><dl className="facts facts-single"><div><dt>Tribunal</dt><dd>{item.court || "No registrado"}</dd></div><div><dt>RIT o ROL</dt><dd>{item.ritRol || "No registrado"}</dd></div></dl><p className="notice compact">Registro manual interno, sin sincronización externa.</p></section><section className="notice"><strong>Entorno de demostración</strong><span>La información es ficticia y se reinicia al recargar la aplicación.</span></section></aside></div>{modal}</AppShell>;
}
