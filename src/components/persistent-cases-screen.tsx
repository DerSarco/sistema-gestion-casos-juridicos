"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PersistentCase } from "@/modules/cases/domain/persistent-case";
import { Icon } from "./icons";
import { PageHeading } from "./page-heading";
import { CaseLifecycleForm } from "./case-lifecycle-form";

export function PersistentCasesScreen({ cases }: { cases: PersistentCase[] }) {
  const [query, setQuery] = useState(""); const [lifecycle, setLifecycle] = useState("ALL");
  const filtered = useMemo(() => cases.filter((item) => (lifecycle === "ALL" || item.lifecycleStatus === lifecycle) && `${item.internalCode} ${item.clientName} ${item.title} ${item.matter}`.toLocaleLowerCase("es-CL").includes(query.toLocaleLowerCase("es-CL"))), [cases, lifecycle, query]);
  return <><PageHeading title="Casos" subtitle="Casos laborales internos persistentes" action={<Link className="button button-primary" href="/casos/nuevo">+ Nuevo caso</Link>} />
    <section className="filters client-filters"><label className="search-field"><Icon name="search" /><span className="sr-only">Buscar casos</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por código, cliente o materia…" /></label><select aria-label="Filtrar por ciclo" value={lifecycle} onChange={(event) => setLifecycle(event.target.value)}><option value="ALL">Todos</option><option value="ACTIVE">Activos</option><option value="ARCHIVED">Archivados</option></select></section>
    {(query || lifecycle !== "ALL") && <button className="clear-filters" onClick={() => { setQuery(""); setLifecycle("ALL"); }}>Limpiar filtros</button>}
    <section className="table-card" aria-live="polite">{filtered.length === 0 ? <div className="empty-state"><strong>No se encontraron casos</strong><span>Revise los filtros o registre un caso.</span></div> : <><div className="table-scroll"><table><thead><tr><th>Código</th><th>Cliente</th><th>Materia</th><th>Etapa</th><th>Responsable</th><th>Ciclo</th><th>Acciones</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td className="mono">{item.internalCode}</td><td>{item.clientName}</td><td>{item.matter}</td><td>{item.stage}</td><td>{item.responsible}</td><td><span className={`status ${item.lifecycleStatus === "ACTIVE" ? "status-activo" : "status-cerrado"}`}>{item.lifecycleStatus === "ARCHIVED" ? "Archivado" : "Activo"}</span></td><td><div className="client-actions"><Link className="table-link" href={`/casos/${item.internalCode}`}>Ver ficha</Link><CaseLifecycleForm legalCase={item} /></div></td></tr>)}</tbody></table></div><footer className="table-footer">Mostrando {filtered.length} de {cases.length} casos</footer></>}</section>
  </>;
}
