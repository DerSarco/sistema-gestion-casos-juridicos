"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Modal } from "./modal";
import { useSessionStore } from "./session-store";

export function RelevantDateForm({ caseCode }: { caseCode: string }) {
  const router = useRouter();
  const { cases, clients, addRelevantDate } = useSessionStore();
  const item = cases.find((entry) => entry.code === caseCode);
  const client = clients.find(({ id }) => id === item?.clientId);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [responsible, setResponsible] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  if (!item) return null;
  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Ingrese el nombre de la fecha.";
    if (!date) next.date = "Seleccione una fecha.";
    if (!responsible) next.responsible = "Seleccione un responsable.";
    setErrors(next);
    if (Object.keys(next).length) return;
    addRelevantDate(item!.id, {
      name: name.trim(),
      date,
      time,
      responsible,
      notes: notes.trim(),
    });
    router.replace(`/casos/${caseCode}`);
  }
  return (
    <Modal
      title="Registrar fecha relevante"
      subtitle={`${caseCode} · ${client?.name ?? "Cliente no disponible"}`}
      closeHref={`/casos/${caseCode}`}
    >
      <form className="modal-body" onSubmit={submit} noValidate>
        <aside className="notice compact">
          La fecha se registra manualmente y debe ser verificada por el usuario.
        </aside>
        {Object.keys(errors).length > 0 && (
          <div className="error-summary" role="alert">
            <strong>Revise los campos indicados</strong>
            <span>{Object.values(errors)[0]}</span>
          </div>
        )}
        <label className="field">
          <span>
            Nombre de la fecha <b>*</b>
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <small className="field-error">{errors.name}</small>}
        </label>
        <div className="form-grid">
          <label className="field">
            <span>
              Fecha <b>*</b>
            </span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              aria-invalid={Boolean(errors.date)}
            />
            {errors.date && (
              <small className="field-error">{errors.date}</small>
            )}
          </label>
          <label className="field">
            <span>
              Hora <em>Opcional</em>
            </span>
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </label>
        </div>
        <label className="field">
          <span>
            Abogado responsable <b>*</b>
          </span>
          <select
            value={responsible}
            onChange={(event) => setResponsible(event.target.value)}
            aria-invalid={Boolean(errors.responsible)}
          >
            <option value="">Seleccionar responsable...</option>
            <option>Abogado A</option>
            <option>Abogado B</option>
          </select>
          {errors.responsible && (
            <small className="field-error">{errors.responsible}</small>
          )}
        </label>
        <label className="field">
          <span>
            Observación <em>Opcional</em>
          </span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </label>
        <footer className="form-actions">
          <Link replace className="button button-secondary" href={`/casos/${caseCode}`}>
            Cancelar
          </Link>
          <button className="button button-primary" type="submit">
            Guardar fecha
          </button>
        </footer>
      </form>
    </Modal>
  );
}
