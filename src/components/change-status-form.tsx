"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Modal } from "./modal";
import { useSessionStore, type SessionCase } from "./session-store";

export function ChangeStatusForm({ caseCode }: { caseCode: string }) {
  const router = useRouter();
  const { cases, clients, changeCaseState } = useSessionStore();
  const item = cases.find((entry) => entry.code === caseCode);
  const client = clients.find(({ id }) => id === item?.clientId);
  const [status, setStatus] = useState<SessionCase["status"]>(
    item?.status ?? "Activo",
  );
  const [stage, setStage] = useState<SessionCase["stage"]>(
    item?.stage ?? "Ingreso",
  );
  const [observation, setObservation] = useState("");
  if (!item) return null;
  function submit(event: FormEvent) {
    event.preventDefault();
    changeCaseState(item!.id, status, stage, observation.trim());
    router.replace(`/casos/${caseCode}`);
  }
  return (
    <Modal
      title="Cambiar estado o etapa"
      subtitle={`${caseCode} · ${client?.name ?? "Cliente no disponible"}`}
      closeHref={`/casos/${caseCode}`}
    >
      <form className="modal-body" onSubmit={submit}>
        <div className="current-state">
          <span>Situación actual</span>
          <span
            className={`status status-${item.status.toLowerCase().replace(" ", "-")}`}
          >
            {item.status}
          </span>
          <span className="tag">{item.stage}</span>
        </div>
        <div className="form-grid">
          <label className="field">
            <span>Nuevo estado</span>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as SessionCase["status"])
              }
            >
              <option>Activo</option>
              <option>En revisión</option>
              <option>Cerrado</option>
            </select>
          </label>
          <label className="field">
            <span>Nueva etapa</span>
            <select
              value={stage}
              onChange={(event) =>
                setStage(event.target.value as SessionCase["stage"])
              }
            >
              <option>Ingreso</option>
              <option>Presentación</option>
              <option>Antecedentes</option>
              <option>Finalizado</option>
            </select>
          </label>
        </div>
        <label className="field">
          <span>
            Observación <em>Opcional</em>
          </span>
          <textarea
            value={observation}
            onChange={(event) => setObservation(event.target.value)}
          />
        </label>
        <p className="helper">
          El cambio quedará registrado en el historial de esta sesión.
        </p>
        <footer className="form-actions">
          <Link replace className="button button-secondary" href={`/casos/${caseCode}`}>
            Cancelar
          </Link>
          <button className="button button-primary" type="submit">
            Confirmar cambio
          </button>
        </footer>
      </form>
    </Modal>
  );
}
