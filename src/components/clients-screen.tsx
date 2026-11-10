"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "./icons";
import { PageHeading } from "./page-heading";
import { useSessionStore } from "./session-store";

export function ClientsScreen() {
  const { clients, cases } = useSessionStore();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => clients.filter((item) => `${item.name} ${item.email} ${item.phone}`.toLowerCase().includes(query.toLowerCase())), [clients, query]);
  return <>
    <PageHeading title="Clientes" subtitle="Directorio interno de clientes del estudio" action={<Link className="button button-primary" href="/clientes/nuevo">+ Nuevo cliente</Link>} />
    <label className="search-field search-field-wide"><Icon name="search" /><span className="sr-only">Buscar clientes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, correo o teléfono..." /></label>
    {query && <button className="clear-filters" type="button" onClick={() => setQuery("")}>Limpiar búsqueda</button>}
    <section className="table-card" aria-label="Listado de clientes" aria-live="polite">
      {filtered.length === 0 ? <div className="empty-state"><strong>No se encontraron clientes</strong><span>Revise el criterio ingresado o limpie la búsqueda.</span><button className="button button-secondary" onClick={() => setQuery("")}>Limpiar búsqueda</button></div> : <>
        <div className="table-scroll"><table><thead><tr><th>Código</th><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Casos asociados</th><th>Acción</th></tr></thead><tbody>{filtered.map((item) => { const count = cases.filter(({ clientId }) => clientId === item.id).length; return <tr key={item.id}><td className="mono">{item.code}</td><td><strong>{item.name}</strong></td><td>{item.email}</td><td>{item.phone}</td><td><span className="tag">{count} {count === 1 ? "caso" : "casos"}</span></td><td><Link className="table-link" href={`/clientes/nuevo?cliente=${item.code}`}>Editar <Icon name="chevron" size={14} /></Link></td></tr>; })}</tbody></table></div>
        <footer className="table-footer"><span>Mostrando {filtered.length} de {clients.length} clientes</span><span className="pagination"><button disabled>‹</button><button className="current">1</button><button disabled>›</button></span></footer>
      </>}
    </section>
  </>;
}
