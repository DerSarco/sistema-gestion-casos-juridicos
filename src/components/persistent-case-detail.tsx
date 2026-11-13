import Link from "next/link";
import type { ReactNode } from "react";
import type { PersistentCase } from "@/modules/cases/domain/persistent-case";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { AppShell } from "./app-shell";
import { CaseLifecycleForm } from "./case-lifecycle-form";
export async function PersistentCaseDetail({
  legalCase,
  modal,
}: {
  legalCase: PersistentCase | null;
  modal?: ReactNode;
}) {
  const actor = await getServerActor();
  if (!legalCase)
    return (
      <AppShell active="cases">
        <section className="empty-state card">
          <strong>Caso no disponible</strong>
          <span>No existe o no pertenece al estudio.</span>
          <Link className="button button-secondary" href="/casos">
            Volver
          </Link>
        </section>
      </AppShell>
    );
  const historyLabels: Record<string, string> = {
    CASE_CREATED: "Caso registrado",
    CASE_UPDATED: "Datos del caso actualizados",
    CASE_ASSIGNMENT_CHANGED: "Distribución del caso actualizada",
    CASE_STAGE_CHANGED: "Etapa modificada",
    CASE_ARCHIVED: "Caso archivado",
    CASE_REACTIVATED: "Caso reactivado",
    RELEVANT_DATE_CREATED: "Fecha relevante registrada",
  };
  return (
    <AppShell active="cases">
      <section className="case-header card">
        <div>
          <div className="case-title-row">
            <h1>{legalCase.internalCode}</h1>
            <span
              className={`status ${legalCase.lifecycleStatus === "ACTIVE" ? "status-activo" : "status-cerrado"}`}
            >
              {legalCase.lifecycleStatus === "ARCHIVED"
                ? "Archivado"
                : "Activo"}
            </span>
            <span className="tag">{legalCase.stage}</span>
          </div>
          <p>{legalCase.title}</p>
        </div>
        <div className="button-row">
          <Link
            className="button button-secondary"
            href={`/casos/${legalCase.internalCode}/fechas/nueva`}
          >
            Registrar fecha
          </Link>
          <Link
            className="button button-secondary"
            href={`/casos/${legalCase.internalCode}/estado`}
          >
            Cambiar etapa
          </Link>
          <Link
            className="button button-primary"
            href={`/casos/nuevo?editar=${legalCase.internalCode}`}
          >
            Editar caso
          </Link>
        </div>
      </section>
      <div className="detail-grid">
        <div className="detail-main">
          <section className="card detail-card">
            <header>
              <h2>Datos generales</h2>
            </header>
            <dl className="facts">
              <div>
                <dt>Cliente</dt>
                <dd>{legalCase.clientName}</dd>
              </div>
              <div>
                <dt>Materia</dt>
                <dd>{legalCase.matter}</dd>
              </div>
              <div>
                <dt>Responsable principal</dt>
                <dd>{legalCase.responsible}</dd>
              </div>
              <div>
                <dt>Participantes de apoyo</dt>
                <dd>
                  {legalCase.participants.length
                    ? legalCase.participants
                        .map((participant) => participant.name)
                        .join(", ")
                    : "Sin participantes adicionales"}
                </dd>
              </div>
              <div>
                <dt>Etapa</dt>
                <dd>{legalCase.stage}</dd>
              </div>
            </dl>
          </section>
          <section className="card detail-card">
            <header>
              <h2>Historial del caso</h2>
            </header>
            {legalCase.history.length ? (
              <ol className="timeline" data-testid="case-history">
                {legalCase.history.map((event) => (
                  <li key={event.id}>
                    <strong>
                      {historyLabels[event.action] ?? "Acción registrada"}
                    </strong>
                    <time>
                      {new Intl.DateTimeFormat("es-CL", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "America/Santiago",
                      }).format(new Date(event.occurredAt))}
                    </time>
                    <span>{event.actor}</span>
                    {event.reason && <small>Motivo: {event.reason}</small>}
                  </li>
                ))}
              </ol>
            ) : (
              <p>Sin eventos registrados.</p>
            )}
          </section>
          {(legalCase.matterCode === "DISMISSAL" ||
            legalCase.matterCode === "COLLECTIVE") && (
            <section className="card detail-card">
              <header>
                <h2>Antecedentes laborales</h2>
              </header>
              <dl className="facts">
                {legalCase.matterCode === "DISMISSAL" && (
                  <>
                    <div>
                      <dt>Empleador o contraparte</dt>
                      <dd>{legalCase.employerOrCounterparty}</dd>
                    </div>
                    <div>
                      <dt>Inicio laboral</dt>
                      <dd>{legalCase.employmentStartDate}</dd>
                    </div>
                    <div>
                      <dt>Fecha de despido</dt>
                      <dd>{legalCase.dismissalDate}</dd>
                    </div>
                    <div>
                      <dt>Finiquito</dt>
                      <dd>{legalCase.severanceDetails || "No registrado"}</dd>
                    </div>
                    <div>
                      <dt>Cuantía referencial</dt>
                      <dd>{legalCase.amount || "No registrada"}</dd>
                    </div>
                  </>
                )}
                {legalCase.matterCode === "COLLECTIVE" && (
                  <>
                    <div>
                      <dt>Sindicato u organización</dt>
                      <dd>{legalCase.collectiveOrganization}</dd>
                    </div>
                    <div>
                      <dt>Tipo de gestión</dt>
                      <dd>{legalCase.collectiveActionType}</dd>
                    </div>
                  </>
                )}
              </dl>
            </section>
          )}
          <section className="card detail-card">
            <header>
              <h2>Observaciones</h2>
            </header>
            <p>{legalCase.notes || "Sin observaciones."}</p>
          </section>
          <section className="card detail-card">
            <header>
              <h2>Fechas relevantes</h2>
            </header>
            {legalCase.relevantDates.length ? (
              <ol className="timeline">
                {legalCase.relevantDates.map((item) => (
                  <li key={item.id}>
                    <strong>{item.title}</strong>
                    <time>
                      {new Intl.DateTimeFormat("es-CL", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "America/Santiago",
                      }).format(new Date(item.occursAt))}
                    </time>
                    <span>
                      {item.type} · {item.responsible}
                    </span>
                    {item.source && <small>Fuente: {item.source}</small>}
                  </li>
                ))}
              </ol>
            ) : (
              <p>Sin fechas registradas.</p>
            )}
          </section>
        </div>
        <aside className="detail-side">
          <section className="card detail-card">
            <header>
              <h2>Antecedentes judiciales</h2>
            </header>
            <dl className="facts facts-single">
              <div>
                <dt>Tribunal</dt>
                <dd>{legalCase.court || "No registrado"}</dd>
              </div>
              <div>
                <dt>RIT</dt>
                <dd>{legalCase.rit || "No registrado"}</dd>
              </div>
              <div>
                <dt>ROL</dt>
                <dd>{legalCase.judicialRole || "No registrado"}</dd>
              </div>
            </dl>
            <p className="notice compact">
              Registro manual interno, sin sincronización externa.
            </p>
          </section>
          {actor.role === "Socio" && (
            <section className="card detail-card">
              <header>
                <h2>Ciclo del caso</h2>
              </header>
              <CaseLifecycleForm legalCase={legalCase} />
              {legalCase.lifecycleReason && (
                <p className="muted">
                  Último motivo: {legalCase.lifecycleReason}
                </p>
              )}
            </section>
          )}
        </aside>
      </div>
      {modal}
    </AppShell>
  );
}
