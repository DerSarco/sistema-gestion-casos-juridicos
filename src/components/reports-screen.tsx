import Link from "next/link";
import type { CountRow, ReportFilters, ReportSummary } from "@/modules/reports/domain/report";
import { PageHeading } from "./page-heading";

export function ReportsScreen({
  summary,
  canExport,
  filters,
}: {
  summary: ReportSummary;
  canExport: boolean;
  filters: ReportFilters;
}) {
  return (
    <>
      <PageHeading
        title="Reportes"
        subtitle="Carga y distribución interna del estudio"
        action={
          canExport ? (
            <form action="/reportes/exportar" method="post">
              <button className="button button-primary" type="submit">
                Exportar CSV
              </button>
            </form>
          ) : undefined
        }
      />
      <aside className="notice report-notice">
        <strong>Reporte operativo minimizado</strong>
        <span>
          No incluye RUT, contacto, antecedentes laborales ni conexión con la
          OJV. Solo el perfil Socio puede exportar y la acción queda auditada.
        </span>
      </aside>
      <form className="report-filters card" method="get">
        <label><span>Responsable</span><select name="responsable" defaultValue={filters.responsibleId ?? ""}><option value="">Todos</option>{summary.filterOptions.responsible.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <label><span>Etapa</span><select name="etapa" defaultValue={filters.stage ?? ""}><option value="">Todas</option>{summary.filterOptions.stage.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <label><span>Estado</span><select name="estado" defaultValue={filters.status ?? ""}><option value="">Todos</option>{summary.filterOptions.status.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <button className="button button-primary" type="submit">Aplicar filtros</button>
        <Link className="text-action" href="/reportes">Limpiar</Link>
      </form>
      <section className="report-metrics" aria-label="Resumen de casos">
        <article className="card report-metric">
          <span>Total</span>
          <strong>{summary.totalCases}</strong>
        </article>
        <article className="card report-metric">
          <span>Activos</span>
          <strong>{summary.activeCases}</strong>
        </article>
        <article className="card report-metric">
          <span>Archivados</span>
          <strong>{summary.archivedCases}</strong>
        </article>
        <article className="card report-metric report-metric-warning">
          <span>Sin responsable</span>
          <strong>{summary.unassignedCases}</strong>
        </article>
        <article className="card report-metric report-metric-warning">
          <span>Sin próxima fecha</span>
          <strong>{summary.casesWithoutUpcomingDate}</strong>
        </article>
      </section>
      <section className="table-card report-section">
        <header className="report-heading">
          <h2>Carga por responsable</h2>
        </header>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Responsable</th>
                <th>Activos</th>
                <th>Archivados</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {summary.workload.map((row) => (
                <tr key={row.responsibleId}>
                  <td>{row.responsible}</td>
                  <td>{row.activeCases}</td>
                  <td>{row.archivedCases}</td>
                  <td>{row.totalCases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="report-distributions">
        <CountBars title="Casos por etapa" rows={summary.byStage} />
        <CountBars title="Casos por estado" rows={summary.byStatus} />
      </div>
      <section className="card report-section upcoming-events">
        <header className="report-heading"><h2>Próximos eventos</h2><span>Máximo 6 fechas futuras</span></header>
        {summary.upcomingEvents.length === 0 ? <p className="report-empty">No hay próximas fechas para los filtros seleccionados.</p> : <ol>{summary.upcomingEvents.map((event) => <li key={`${event.caseCode}-${event.occursAt}-${event.title}`}><time dateTime={event.occursAt}>{new Intl.DateTimeFormat("es-CL", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Santiago" }).format(new Date(event.occursAt))}</time><div><strong>{event.title}</strong><span>{event.caseCode} · {event.responsible}</span></div></li>)}</ol>}
      </section>
    </>
  );
}

function CountBars({
  title,
  rows,
}: {
  title: string;
  rows: ReportSummary["byStage"];
}) {
  const maximum = Math.max(1, ...rows.map((row) => row.count));
  return (
    <section className="card report-section report-chart" aria-label={title}>
      <header className="report-heading">
        <h2>{title}</h2>
      </header>
      {rows.length === 0 ? <p className="report-empty">Sin datos para los filtros seleccionados.</p> : <ul>{rows.map((row: CountRow) => <li key={row.label}><span>{row.label}</span><div className="report-bar-track" aria-hidden="true"><span style={{ width: `${Math.max(8, (row.count / maximum) * 100)}%` }} /></div><strong aria-label={`${row.count} casos`}>{row.count}</strong></li>)}</ul>}
    </section>
  );
}
