"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PersistentCase } from "@/modules/cases/domain/persistent-case";
import { Icon } from "./icons";
import { PageHeading } from "./page-heading";

export function PersistentCasesScreen({ cases }: { cases: PersistentCase[] }) {
  const [query, setQuery] = useState("");
  const [lifecycle, setLifecycle] = useState("ALL");
  const [clientId, setClientId] = useState("ALL");
  const [responsibleId, setResponsibleId] = useState("ALL");
  const [stageId, setStageId] = useState("ALL");
  const uniqueOptions = <K extends "clientId" | "responsibleId" | "stageId">(
    key: K,
    label: "clientName" | "responsible" | "stage",
  ) =>
    Array.from(
      new Map(cases.map((item) => [item[key], item[label]])).entries(),
    ).sort((left, right) => left[1].localeCompare(right[1], "es-CL"));
  const filtered = useMemo(
    () =>
      cases.filter(
        (item) =>
          (lifecycle === "ALL" || item.lifecycleStatus === lifecycle) &&
          (clientId === "ALL" || item.clientId === clientId) &&
          (responsibleId === "ALL" || item.responsibleId === responsibleId) &&
          (stageId === "ALL" || item.stageId === stageId) &&
          `${item.internalCode} ${item.clientName} ${item.title} ${item.matter} ${item.responsible}`
            .toLocaleLowerCase("es-CL")
            .includes(query.toLocaleLowerCase("es-CL")),
      ),
    [cases, clientId, lifecycle, query, responsibleId, stageId],
  );
  return (
    <>
      <PageHeading
        title="Casos"
        subtitle="Casos laborales internos persistentes"
        action={
          <Link className="button button-primary" href="/casos/nuevo">
            + Nuevo caso
          </Link>
        }
      />
      <section className="filters">
        <label className="search-field">
          <Icon name="search" />
          <span className="sr-only">Buscar casos</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por código, cliente o materia…"
          />
        </label>
        <select
          aria-label="Filtrar por cliente"
          value={clientId}
          onChange={(event) => setClientId(event.target.value)}
        >
          <option value="ALL">Todos los clientes</option>
          {uniqueOptions("clientId", "clientName").map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <select
          aria-label="Filtrar por responsable"
          value={responsibleId}
          onChange={(event) => setResponsibleId(event.target.value)}
        >
          <option value="ALL">Todos los responsables</option>
          {uniqueOptions("responsibleId", "responsible").map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <select
          aria-label="Filtrar por etapa"
          value={stageId}
          onChange={(event) => setStageId(event.target.value)}
        >
          <option value="ALL">Todas las etapas</option>
          {uniqueOptions("stageId", "stage").map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <select
          aria-label="Filtrar por ciclo"
          value={lifecycle}
          onChange={(event) => setLifecycle(event.target.value)}
        >
          <option value="ALL">Todos</option>
          <option value="ACTIVE">Activos</option>
          <option value="ARCHIVED">Archivados</option>
        </select>
      </section>
      {(query ||
        lifecycle !== "ALL" ||
        clientId !== "ALL" ||
        responsibleId !== "ALL" ||
        stageId !== "ALL") && (
        <button
          className="clear-filters"
          onClick={() => {
            setQuery("");
            setLifecycle("ALL");
            setClientId("ALL");
            setResponsibleId("ALL");
            setStageId("ALL");
          }}
        >
          Limpiar filtros
        </button>
      )}
      <section className="table-card" aria-live="polite">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <strong>No se encontraron casos</strong>
            <span>Revise los filtros o registre un caso.</span>
          </div>
        ) : (
          <>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Cliente</th>
                    <th>Materia</th>
                    <th>Etapa</th>
                    <th>Responsable</th>
                    <th>Ciclo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id}>
                      <td className="mono">{item.internalCode}</td>
                      <td>{item.clientName}</td>
                      <td>{item.matter}</td>
                      <td>{item.stage}</td>
                      <td>{item.responsible}</td>
                      <td>
                        <span
                          className={`status ${item.lifecycleStatus === "ACTIVE" ? "status-activo" : "status-cerrado"}`}
                        >
                          {item.lifecycleStatus === "ARCHIVED"
                            ? "Archivado"
                            : "Activo"}
                        </span>
                      </td>
                      <td>
                        <Link
                          className="button button-secondary"
                          href={`/casos/${item.internalCode}`}
                        >
                          Ver ficha
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <footer className="table-footer">
              Mostrando {filtered.length} de {cases.length} casos
            </footer>
          </>
        )}
      </section>
    </>
  );
}
