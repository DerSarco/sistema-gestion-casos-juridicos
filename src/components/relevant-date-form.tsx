"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import {
  addRelevantDateAction,
  type CaseLifecycleState,
} from "@/app/casos/actions";
import type { PersistentCase } from "@/modules/cases/domain/persistent-case";
import { Modal } from "./modal";

type Option = {
  id: string;
  name?: string;
  displayName?: string;
  code?: string;
};

export function RelevantDateForm({
  legalCase,
  types,
  users,
}: {
  legalCase: PersistentCase;
  types: Option[];
  users: Option[];
}) {
  const [state, action, pending] = useActionState(addRelevantDateAction, {
    status: "idle",
  } as CaseLifecycleState);
  const [typeId, setTypeId] = useState("");
  const selectedType = types.find((item) => item.id === typeId);
  const closeHref = `/casos/${legalCase.internalCode}`;
  return (
    <Modal
      title="Registrar fecha relevante"
      subtitle={`${legalCase.internalCode} · ${legalCase.clientName}`}
      closeHref={closeHref}
    >
      <form className="modal-body" action={action}>
        <input type="hidden" name="caseId" value={legalCase.id} />
        <input type="hidden" name="typeCode" value={selectedType?.code ?? ""} />
        <aside className="notice compact">
          Registro manual sujeto a verificación profesional. El sistema no
          calcula ni certifica plazos jurídicos.
        </aside>
        {state.message && (
          <div className="error-summary" role="alert">
            {state.message}
          </div>
        )}
        <label className="field">
          <span>
            Tipo <b>*</b>
          </span>
          <select
            name="typeId"
            value={typeId}
            onChange={(event) => setTypeId(event.target.value)}
          >
            <option value="">Seleccionar tipo…</option>
            {types.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>
            Título <b>*</b>
          </span>
          <input name="title" />
        </label>
        <label className="field">
          <span>
            Fecha y hora <b>*</b>
          </span>
          <input type="datetime-local" name="occursAt" />
        </label>
        <label className="field">
          <span>
            Responsable <b>*</b>
          </span>
          <select name="responsibleId">
            <option value="">Seleccionar responsable…</option>
            {users.map((item) => (
              <option key={item.id} value={item.id}>
                {item.displayName}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>
            Fuente{" "}
            {selectedType?.code === "MANUAL_EXPIRY" ? (
              <b>*</b>
            ) : (
              <em>Opcional</em>
            )}
          </span>
          <input name="source" placeholder="Documento o referencia manual" />
        </label>
        <label className="field">
          <span>
            Observación <em>Opcional</em>
          </span>
          <textarea name="notes" />
        </label>
        <footer className="form-actions">
          <Link replace className="button button-secondary" href={closeHref}>
            Cancelar
          </Link>
          <button className="button button-primary" disabled={pending}>
            {pending ? "Guardando…" : "Guardar fecha"}
          </button>
        </footer>
      </form>
    </Modal>
  );
}
