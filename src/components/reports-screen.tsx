import type { ReportSummary } from "@/modules/reports/domain/report";
import { PageHeading } from "./page-heading";

export function ReportsScreen({
  summary,
  canExport,
}: {
  summary: ReportSummary;
  canExport: boolean;
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
        <CountTable title="Casos por etapa" rows={summary.byStage} />
        <CountTable title="Casos por estado" rows={summary.byStatus} />
      </div>
    </>
  );
}

function CountTable({
  title,
  rows,
}: {
  title: string;
  rows: ReportSummary["byStage"];
}) {
  return (
    <section className="table-card report-section">
      <header className="report-heading">
        <h2>{title}</h2>
      </header>
      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Casos</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
