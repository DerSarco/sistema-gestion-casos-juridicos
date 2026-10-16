"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  fictionalMatters,
  fictionalResponsibleUsers,
  fictionalStages,
} from "@/fixtures/cases";
import { InMemoryCaseRepository } from "@/infrastructure/memory/in-memory-case-repository";
import { InMemoryClientRepository } from "@/infrastructure/memory/in-memory-client-repository";
import { RegisterCase } from "@/modules/cases/application/register-case";
import {
  filterLegalCases,
  type LegalCase,
  type LegalCaseStatus,
  type LegalCaseValidationErrors,
} from "@/modules/cases/domain/legal-case";
import type { Client } from "@/modules/clients/domain/client";
import styles from "./cases.module.css";

const statusLabels: Record<LegalCaseStatus, string> = {
  DRAFT: "Borrador",
  ACTIVE: "Activo",
  CLOSED: "Cerrado",
  ARCHIVED: "Archivado",
};

export function CaseWorkbench({
  initialCases,
  clients,
}: {
  initialCases: LegalCase[];
  clients: Client[];
}) {
  const [repository] = useState(() => new InMemoryCaseRepository(initialCases));
  const [clientRepository] = useState(
    () => new InMemoryClientRepository(clients),
  );
  const [registerCase] = useState(
    () =>
      new RegisterCase(
        repository,
        clientRepository,
        () => crypto.randomUUID(),
        () => `CASO-${String(repository.list().length + 1).padStart(3, "0")}`,
        () => new Date().toISOString(),
      ),
  );
  const [cases, setCases] = useState(() => repository.list());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<LegalCaseStatus | "ALL">("ALL");
  const [responsible, setResponsible] = useState<string | "ALL">("ALL");
  const [errors, setErrors] = useState<LegalCaseValidationErrors>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredCases = useMemo(
    () => filterLegalCases(cases, { query, status, responsible }),
    [cases, query, responsible, status],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = registerCase.execute({
      clientId: String(formData.get("clientId") ?? ""),
      title: String(formData.get("title") ?? ""),
      matter: String(formData.get("matter") ?? ""),
      stage: String(formData.get("stage") ?? ""),
      responsible: String(formData.get("responsible") ?? ""),
      court: String(formData.get("court") ?? ""),
      ritRol: String(formData.get("ritRol") ?? ""),
    });

    if (result.status === "invalid") {
      setErrors(result.errors);
      setFeedback(null);
      return;
    }

    setCases(repository.list());
    setErrors({});
    setFeedback(
      `${result.legalCase.internalCode} se agregó con un evento de historial inicial.`,
    );
    form.reset();
  }

  return (
    <>
      <section aria-labelledby="case-list-title" className={styles.listPanel}>
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.kicker}>Seguimiento temporal</p>
            <h2 id="case-list-title">{filteredCases.length} casos visibles</h2>
          </div>
          <div className={styles.filters}>
            <label>
              Buscar
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Código, cliente o materia"
              />
            </label>
            <label>
              Estado
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as LegalCaseStatus | "ALL")
                }
              >
                <option value="ALL">Todos</option>
                <option value="ACTIVE">Activos</option>
                <option value="CLOSED">Cerrados</option>
                <option value="ARCHIVED">Archivados</option>
              </select>
            </label>
            <label>
              Responsable
              <select
                value={responsible}
                onChange={(event) => setResponsible(event.target.value)}
              >
                <option value="ALL">Todos</option>
                {fictionalResponsibleUsers.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className={styles.caseGrid}>
          {filteredCases.length === 0 ? (
            <p className={styles.empty}>No hay casos para los filtros seleccionados.</p>
          ) : (
            filteredCases.map((legalCase) => (
              <article className={styles.caseCard} key={legalCase.id}>
                <div className={styles.cardTopline}>
                  <span className={styles.code}>{legalCase.internalCode}</span>
                  <span className={styles.status}>{statusLabels[legalCase.status]}</span>
                </div>
                <h3>{legalCase.title}</h3>
                <p className={styles.client}>{legalCase.clientName}</p>
                <dl>
                  <div>
                    <dt>Materia</dt>
                    <dd>{legalCase.matter}</dd>
                  </div>
                  <div>
                    <dt>Etapa</dt>
                    <dd>{legalCase.stage}</dd>
                  </div>
                  <div>
                    <dt>Responsable</dt>
                    <dd>{legalCase.responsible}</dd>
                  </div>
                  <div>
                    <dt>Tribunal / RIT</dt>
                    <dd>
                      {legalCase.court || legalCase.ritRol
                        ? [legalCase.court, legalCase.ritRol].filter(Boolean).join(" · ")
                        : "Pendiente de registro manual"}
                    </dd>
                  </div>
                </dl>
                <div className={styles.history}>
                  <span>Historial</span>
                  {legalCase.history[0]?.description}
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section aria-labelledby="new-case-title" className={styles.formPanel}>
        <div>
          <p className={styles.kicker}>Nuevo registro</p>
          <h2 id="new-case-title">Registrar caso ficticio</h2>
          <p>
            Tribunal y RIT/ROL son opcionales. Déjalos vacíos si no están
            disponibles; nunca ingreses valores reales en este entorno.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label>
            Cliente
            <select name="clientId" defaultValue="">
              <option value="" disabled>Selecciona un cliente</option>
              {clients.map((client) => (
                <option value={client.id} key={client.id}>{client.displayName}</option>
              ))}
            </select>
            {errors.clientId && <small role="alert">{errors.clientId}</small>}
          </label>
          <label>
            Título operativo
            <input name="title" placeholder="Caso de prueba 03" />
            {errors.title && <small role="alert">{errors.title}</small>}
          </label>
          <label>
            Materia
            <select name="matter" defaultValue="">
              <option value="" disabled>Selecciona una materia</option>
              {fictionalMatters.map((matter) => <option key={matter}>{matter}</option>)}
            </select>
            {errors.matter && <small role="alert">{errors.matter}</small>}
          </label>
          <label>
            Etapa
            <select name="stage" defaultValue="">
              <option value="" disabled>Selecciona una etapa</option>
              {fictionalStages.map((stage) => <option key={stage}>{stage}</option>)}
            </select>
            {errors.stage && <small role="alert">{errors.stage}</small>}
          </label>
          <label>
            Responsable
            <select name="responsible" defaultValue="">
              <option value="" disabled>Selecciona un responsable</option>
              {fictionalResponsibleUsers.map((name) => <option key={name}>{name}</option>)}
            </select>
            {errors.responsible && <small role="alert">{errors.responsible}</small>}
          </label>
          <label>
            Tribunal ficticio (opcional)
            <input name="court" />
            {errors.court && <small role="alert">{errors.court}</small>}
          </label>
          <label>
            RIT/ROL ficticio (opcional)
            <input name="ritRol" />
            {errors.ritRol && <small role="alert">{errors.ritRol}</small>}
          </label>
          {feedback && <p className={styles.success} role="status">{feedback}</p>}
          <button type="submit">Registrar en memoria temporal</button>
        </form>
      </section>
    </>
  );
}
