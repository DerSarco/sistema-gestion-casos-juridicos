"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { saveCaseAction, type CaseFormState } from "@/app/casos/actions";
import type { PersistentCase } from "@/modules/cases/domain/persistent-case";
import { PageHeading } from "./page-heading";

type Option = {
  id: string;
  displayName?: string;
  name?: string;
  code?: string;
};
export function PersistentCaseForm({
  current,
  options,
}: {
  current: PersistentCase | null;
  options: {
    clients: Option[];
    matters: Option[];
    stages: Option[];
    users: Option[];
  };
}) {
  const [state, action, pending] = useActionState(saveCaseAction, {
    status: "idle",
  } as CaseFormState);
  const initialMatterId = state.values?.matterId ?? current?.matterId ?? "";
  const [matterId, setMatterId] = useState(initialMatterId);
  const matterCode = options.matters.find((item) => item.id === matterId)?.code;
  const value = (
    key: keyof NonNullable<CaseFormState["values"]>,
    fallback = "",
  ) => state.values?.[key] ?? fallback;
  const selectedParticipants =
    state.values?.participantIds ??
    current?.participants.map((participant) => participant.id) ??
    [];
  return (
    <div className="form-page">
      <PageHeading
        title={current ? "Editar caso" : "Registrar caso"}
        subtitle="Registro interno persistente con trazabilidad"
      />
      <form className="form-card" action={action} noValidate>
        {current && <input type="hidden" name="caseId" value={current.id} />}
        {(state.status === "invalid" || state.status === "error") && (
          <div className="error-summary" role="alert">
            <strong>Revise el formulario</strong>
            <span>{state.message ?? Object.values(state.errors ?? {})[0]}</span>
          </div>
        )}
        <label className="field">
          <span>
            Cliente activo <b>*</b>
          </span>
          <select
            name="clientId"
            defaultValue={value("clientId", current?.clientId)}
          >
            <option value="">Seleccionar cliente…</option>
            {options.clients.map((item) => (
              <option key={item.id} value={item.id}>
                {item.displayName}
              </option>
            ))}
          </select>
        </label>
        <div className="form-grid">
          <label className="field">
            <span>
              Materia laboral <b>*</b>
            </span>
            <select
              name="matterId"
              value={matterId}
              onChange={(event) => setMatterId(event.target.value)}
            >
              <option value="">Seleccionar materia…</option>
              {options.matters.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>
              Etapa <b>*</b>
            </span>
            <select
              name="stageId"
              defaultValue={value("stageId", current?.stageId)}
            >
              <option value="">Seleccionar etapa…</option>
              {options.stages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {matterCode === "DISMISSAL" && (
          <fieldset className="form-section">
            <legend>Antecedentes del despido</legend>
            <label className="field">
              <span>
                Empleador o contraparte <b>*</b>
              </span>
              <input
                name="employerOrCounterparty"
                defaultValue={value(
                  "employerOrCounterparty",
                  current?.employerOrCounterparty ?? "",
                )}
              />
            </label>
            <div className="form-grid">
              <label className="field">
                <span>
                  Inicio de relación laboral <b>*</b>
                </span>
                <input
                  type="date"
                  name="employmentStartDate"
                  defaultValue={value(
                    "employmentStartDate",
                    current?.employmentStartDate ?? "",
                  )}
                />
              </label>
              <label className="field">
                <span>
                  Fecha de despido <b>*</b>
                </span>
                <input
                  type="date"
                  name="dismissalDate"
                  defaultValue={value(
                    "dismissalDate",
                    current?.dismissalDate ?? "",
                  )}
                />
              </label>
            </div>
            <div className="form-grid">
              <label className="field">
                <span>
                  Finiquito <em>Opcional</em>
                </span>
                <input
                  name="severanceDetails"
                  defaultValue={value(
                    "severanceDetails",
                    current?.severanceDetails ?? "",
                  )}
                />
              </label>
              <label className="field">
                <span>
                  Cuantía referencial <em>Opcional</em>
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="amount"
                  defaultValue={value("amount", current?.amount ?? "")}
                />
              </label>
            </div>
          </fieldset>
        )}
        {matterCode === "COLLECTIVE" && (
          <fieldset className="form-section">
            <legend>Antecedentes de gestión colectiva</legend>
            <label className="field">
              <span>
                Sindicato u organización <b>*</b>
              </span>
              <input
                name="collectiveOrganization"
                defaultValue={value(
                  "collectiveOrganization",
                  current?.collectiveOrganization ?? "",
                )}
              />
            </label>
            <label className="field">
              <span>
                Tipo de gestión colectiva <b>*</b>
              </span>
              <input
                name="collectiveActionType"
                defaultValue={value(
                  "collectiveActionType",
                  current?.collectiveActionType ?? "",
                )}
              />
            </label>
          </fieldset>
        )}
        <label className="field">
          <span>
            Título <b>*</b>
          </span>
          <input name="title" defaultValue={value("title", current?.title)} />
        </label>
        <label className="field">
          <span>
            Responsable principal <b>*</b>
          </span>
          <select
            name="responsibleId"
            defaultValue={value("responsibleId", current?.responsibleId)}
          >
            <option value="">Seleccionar responsable…</option>
            {options.users.map((item) => (
              <option key={item.id} value={item.id}>
                {item.displayName}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="form-section">
          <legend>Participantes de apoyo</legend>
          <p className="muted">
            Opcional. El responsable principal no debe seleccionarse nuevamente.
          </p>
          {options.users.map((item) => (
            <label className="checkbox" key={item.id}>
              <input
                type="checkbox"
                name="participantIds"
                value={item.id}
                defaultChecked={selectedParticipants.includes(item.id)}
              />
              <span>{item.displayName}</span>
            </label>
          ))}
        </fieldset>
        <aside className="notice">
          <strong>Registro manual interno</strong>
          <span>Sin conexión, sincronización ni credenciales de la OJV.</span>
        </aside>
        <div className="form-grid">
          <label className="field">
            <span>
              Tribunal <em>Opcional</em>
            </span>
            <input
              name="court"
              defaultValue={value("court", current?.court ?? "")}
            />
          </label>
          <label className="field">
            <span>
              RIT <em>Opcional</em>
            </span>
            <input name="rit" defaultValue={value("rit", current?.rit ?? "")} />
          </label>
        </div>
        <label className="field">
          <span>
            ROL <em>Opcional</em>
          </span>
          <input
            name="judicialRole"
            defaultValue={value("judicialRole", current?.judicialRole ?? "")}
          />
        </label>
        <label className="field">
          <span>Observaciones</span>
          <textarea
            name="notes"
            defaultValue={value("notes", current?.notes ?? "")}
          />
        </label>
        <footer className="form-actions">
          <Link
            className="button button-secondary"
            href={current ? `/casos/${current.internalCode}` : "/casos"}
          >
            Cancelar
          </Link>
          <button className="button button-primary" disabled={pending}>
            {pending ? "Guardando…" : "Guardar caso"}
          </button>
        </footer>
      </form>
    </div>
  );
}
