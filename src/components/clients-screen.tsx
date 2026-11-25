"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Client } from "@/modules/clients/domain/client";
import { Icon } from "./icons";
import { PageHeading } from "./page-heading";

export function ClientsScreen({ clients }: { clients: Client[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const filtered = useMemo(() => clients.filter((item) => `${item.displayName} ${item.rutNormalized} ${item.email ?? ""} ${item.phone} ${item.originMatter}`.toLowerCase().includes(query.toLowerCase()) && (status === "ALL" || item.status === status)), [clients, query, status]);
  return <>
    <PageHeading title="Clientes" subtitle="Directorio persistente del estudio" action={<Link className="button button-primary" href="/clientes/nuevo">+ Nuevo cliente</Link>} />
    <div className="filters client-filters"><label className="search-field"><Icon name="search" /><span className="sr-only">Buscar clientes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, RUT, contacto u origen..." /></label><select aria-label="Filtrar por actividad" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}><option value="ALL">Todos los estados</option><option value="ACTIVE">Activos</option><option value="INACTIVE">Inactivos</option></select></div>
    {(query || status !== "ALL") && <button className="clear-filters" type="button" onClick={() => { setQuery(""); setStatus("ALL"); }}>Limpiar filtros</button>}
    <section className="table-card" aria-label="Listado de clientes" aria-live="polite">
      {filtered.length === 0 ? <div className="empty-state"><strong>No se encontraron clientes</strong><span>Revise los filtros o registre una nueva ficha.</span></div> : <div className="table-scroll"><table className="clients-table"><thead><tr><th>Cliente</th><th>RUT</th><th>Contacto</th><th>Origen</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><strong>{item.displayName}</strong></td><td className="mono">{item.rutNormalized}</td><td>{item.email ?? "Sin correo"}<br />{item.phone}</td><td>{item.originMatter}</td><td><span className={`status ${item.status === "ACTIVE" ? "status-activo" : "status-cerrado"}`}>{item.status === "ACTIVE" ? "Activo" : "Inactivo"}</span></td><td><div className="client-actions"><Link className="table-link" href={`/clientes/nuevo?cliente=${item.id}`}>Editar <Icon name="chevron" size={14} /></Link></div></td></tr>)}</tbody></table></div>}
      <footer className="table-footer"><span>Mostrando {filtered.length} de {clients.length} clientes</span></footer>
    </section>
  </>;
}
