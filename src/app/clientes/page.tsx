import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Icon } from "@/components/icons";
import { PageHeading } from "@/components/page-heading";
import { clients } from "@/fixtures/ui-data";

export default function ClientsPage() {
  return (
    <AppShell active="clients">
      <PageHeading title="Clientes" subtitle="Directorio interno de clientes del estudio" action={<Link className="button button-primary" href="/clientes/nuevo">+ Nuevo cliente</Link>} />
      <label className="search-field search-field-wide"><Icon name="search" /><span className="sr-only">Buscar clientes</span><input placeholder="Buscar por nombre, correo o teléfono..." /></label>
      <section className="table-card" aria-label="Listado de clientes">
        <div className="table-scroll"><table><thead><tr><th>Código</th><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Casos asociados</th><th>Acción</th></tr></thead>
        <tbody>{clients.map((item) => <tr key={item.code}><td className="mono">{item.code}</td><td><strong>{item.name}</strong></td><td>{item.email}</td><td>{item.phone}</td><td><span className="tag">{item.cases} {item.cases === 1 ? "caso" : "casos"}</span></td><td><Link className="table-link" href={`/clientes/nuevo?cliente=${item.code}`}>Editar <Icon name="chevron" size={14} /></Link></td></tr>)}</tbody></table></div>
        <footer className="table-footer"><span>Mostrando 1 a {clients.length} de {clients.length} clientes</span><span className="pagination"><button disabled>‹</button><button className="current">1</button><button disabled>›</button></span></footer>
      </section>
    </AppShell>
  );
}
