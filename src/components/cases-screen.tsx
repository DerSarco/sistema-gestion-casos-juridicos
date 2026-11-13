"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSessionStore } from "./session-store";
import { Icon } from "./icons";
import { PageHeading } from "./page-heading";

export function CasesScreen() {
  const { cases, clients } = useSessionStore();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [stage, setStage] = useState("");
  const [lawyer, setLawyer] = useState("");
  const filtered = useMemo(() => cases.filter((item) => {
    const client = clients.find(({ id }) => id === item.clientId)?.name ?? "";
    const search = `${item.code} ${client} ${item.title}`.toLowerCase();
    return search.includes(query.toLowerCase()) && (!status || item.status === status) && (!stage || item.stage === stage) && (!lawyer || item.lawyer === lawyer);
  }), [cases, clients, lawyer, query, stage, status]);
  const hasFilters = Boolean(query || status || stage || lawyer);

  return <>
    <PageHeading title="Casos" subtitle="Expedientes judiciales y gestiones procesales internas" action={<Link className="button button-primary" href="/casos/nuevo">+ Nuevo caso</Link>} />
    <section className="filters" aria-label="Filtros de casos">
      <label className="search-field"><Icon name="search" /><span className="sr-only">Buscar casos</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por código, cliente o materia..." /></label>
      <select aria-label="Filtrar por estado" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Estado: Todos</option><option>Activo</option><option>En revisión</option><option>Cerrado</option></select>
      <select aria-label="Filtrar por etapa" value={stage} onChange={(event) => setStage(event.target.value)}><option value="">Etapa: Todas</option><option>Ingreso</option><option>Presentación</option><option>Antecedentes</option><option>Finalizado</option></select>
      <select aria-label="Filtrar por responsable" value={lawyer} onChange={(event) => setLawyer(event.target.value)}><option value="">Responsable: Todos</option><option>Abogado A</option><option>Abogado B</option></select>
    </section>
    {hasFilters && <button className="clear-filters" type="button" onClick={() => { setQuery(""); setStatus(""); setStage(""); setLawyer(""); }}>Limpiar filtros</button>}
    <section className="table-card" aria-label="Listado de casos" aria-live="polite">
      {filtered.length === 0 ? <div className="empty-state"><strong>No se encontraron casos</strong><span>Pruebe otra búsqueda o limpie los filtros.</span>{hasFilters && <button className="button button-secondary" onClick={() => { setQuery(""); setStatus(""); setStage(""); setLawyer(""); }}>Limpiar filtros</button>}</div> : <>
        <div className="table-scroll"><table><thead><tr><th>Código</th><th>Cliente</th><th>Materia</th><th>Responsable</th><th>Estado</th><th>Próxima fecha</th><th>Acción</th></tr></thead><tbody>{filtered.map((item) => { const client = clients.find(({ id }) => id === item.clientId); const nextDate = item.dates[0]?.date ?? (item.status === "Cerrado" ? "Finalizado" : "Sin fecha"); return <tr key={item.id}><td className="mono">{item.code}</td><td>{client?.name ?? "Cliente no disponible"}</td><td>{item.title}</td><td>{item.lawyer}</td><td><span className={`status status-${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span></td><td>{nextDate}</td><td><Link className="table-link" href={`/casos/${item.code}`}>Ver ficha <Icon name="chevron" size={14} /></Link></td></tr>; })}</tbody></table></div>
        <footer className="table-footer"><span>Mostrando {filtered.length} de {cases.length} casos</span><span className="pagination"><button disabled>‹</button><button className="current">1</button><button disabled>›</button></span></footer>
      </>}
    </section>
  </>;
}
