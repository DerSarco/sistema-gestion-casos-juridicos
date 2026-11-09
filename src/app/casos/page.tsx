import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Icon } from "@/components/icons";
import { PageHeading } from "@/components/page-heading";
import { cases } from "@/fixtures/ui-data";

export default function CasesPage() {
  return (
    <AppShell active="cases">
      <PageHeading title="Casos" subtitle="Expedientes judiciales y gestiones procesales internas" action={<Link className="button button-primary" href="/casos/nuevo">+ Nuevo caso</Link>} />
      <section className="filters" aria-label="Filtros de casos">
        <label className="search-field"><Icon name="search" /><span className="sr-only">Buscar casos</span><input placeholder="Buscar por código, cliente o materia..." /></label>
        <select aria-label="Filtrar por estado" defaultValue=""><option value="">Estado: Todos</option><option>Activo</option><option>En revisión</option><option>Cerrado</option></select>
        <select aria-label="Filtrar por etapa" defaultValue=""><option value="">Etapa: Todas</option><option>Ingreso</option><option>Presentación</option></select>
        <select aria-label="Filtrar por responsable" defaultValue=""><option value="">Responsable: Todos</option><option>Abogado A</option><option>Abogado B</option></select>
      </section>
      <section className="table-card" aria-label="Listado de casos">
        <div className="table-scroll"><table><thead><tr><th>Código</th><th>Cliente</th><th>Materia</th><th>Responsable</th><th>Estado</th><th>Próxima fecha</th><th>Acción</th></tr></thead>
        <tbody>{cases.map((item) => <tr key={item.code}><td className="mono">{item.code}</td><td>{item.client}</td><td>{item.matter}</td><td>{item.lawyer}</td><td><span className={`status status-${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span></td><td>{item.nextDate}</td><td><Link className="table-link" href={`/casos/${item.code}`}>Ver ficha <Icon name="chevron" size={14} /></Link></td></tr>)}</tbody></table></div>
        <footer className="table-footer"><span>Mostrando 1 a {cases.length} de {cases.length} casos</span><span className="pagination"><button disabled>‹</button><button className="current">1</button><button disabled>›</button></span></footer>
      </section>
    </AppShell>
  );
}
