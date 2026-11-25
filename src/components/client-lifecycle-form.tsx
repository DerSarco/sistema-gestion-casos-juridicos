"use client";

import { useActionState } from "react";
import { changeClientStatusAction, type LifecycleState } from "@/app/clientes/actions";
import type { Client } from "@/modules/clients/domain/client";

export function ClientLifecycleForm({ client }: { client: Client }) {
  const [state, action, pending] = useActionState(changeClientStatusAction, { status: "idle" } satisfies LifecycleState);
  const active = client.status === "ACTIVE";

  return <section className="form-card lifecycle-panel" aria-labelledby="client-status-title">
    <header className="lifecycle-panel-header">
      <div>
        <p className="eyebrow">Administración</p>
        <h2 id="client-status-title">Estado del cliente</h2>
        <p>{active ? "Desactivar impide seleccionar esta ficha en casos nuevos, pero conserva todo su historial." : "Reactivar permite volver a utilizar esta ficha en casos nuevos sin perder su historial."}</p>
      </div>
      <span className={`status ${active ? "status-activo" : "status-cerrado"}`}>{active ? "Activo" : "Inactivo"}</span>
    </header>
    <form action={action} className="lifecycle-edit-form">
      <input type="hidden" name="clientId" value={client.id} />
      <input type="hidden" name="targetStatus" value={active ? "INACTIVE" : "ACTIVE"} />
      <label className="field" htmlFor="client-lifecycle-reason">
        <span>Motivo del cambio <b>*</b></span>
        <textarea id="client-lifecycle-reason" name="reason" rows={3} minLength={5} placeholder={active ? "Ej.: gestión finalizada" : "Ej.: nueva gestión solicitada"} required />
      </label>
      {state.message && <small className="field-error" role="alert">{state.message}</small>}
      <footer className="lifecycle-panel-actions">
        <span>Esta acción es reversible y quedará registrada.</span>
        <button className={`button ${active ? "button-danger" : "button-primary"}`} type="submit" disabled={pending}>{pending ? "Procesando…" : active ? "Desactivar cliente" : "Reactivar cliente"}</button>
      </footer>
    </form>
  </section>;
}
