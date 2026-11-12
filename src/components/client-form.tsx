"use client";

import Link from "next/link";
import { useActionState } from "react";
import { initialClientFormState, saveClientAction } from "@/app/clientes/actions";
import type { Client } from "@/modules/clients/domain/client";
import { PageHeading } from "./page-heading";

export function ClientForm({ client }: { client?: Client }) {
  const [state, action, pending] = useActionState(saveClientAction, initialClientFormState);
  const values = state.values;
  return <div className="form-page form-page-narrow">
    <PageHeading title={client ? "Editar cliente" : "Registrar cliente"} subtitle="La ficha se almacena en PostgreSQL y conserva trazabilidad de sus cambios" />
    <aside className="notice"><strong>Aviso preventivo</strong><span>Una coincidencia de nombre y origen genera una advertencia, pero no fusiona fichas automáticamente.</span></aside>
    <form className="form-card" action={action} noValidate>
      <input type="hidden" name="clientId" value={client?.id ?? ""} />
      {state.status !== "idle" && <div className="error-summary" role="alert" tabIndex={-1}><strong>{state.status === "potential-match" ? "Posible coincidencia" : "Revise el formulario"}</strong><span>{state.message ?? Object.values(state.errors ?? {})[0]}</span></div>}
      <label className="field"><span>Nombre completo o razón social <b>*</b></span><input name="displayName" defaultValue={values?.displayName ?? client?.displayName ?? ""} aria-invalid={Boolean(state.errors?.displayName)} />{state.errors?.displayName && <small className="field-error">{state.errors.displayName}</small>}</label>
      <div className="form-grid">
        <label className="field"><span>RUT <b>*</b></span><input name="rut" defaultValue={values?.rut ?? client?.rutNormalized ?? ""} placeholder="12345678K" aria-invalid={Boolean(state.errors?.rut)} />{state.errors?.rut && <small className="field-error">{state.errors.rut}</small>}</label>
        <label className="field"><span>Teléfono <b>*</b></span><input name="phone" defaultValue={values?.phone ?? client?.phone ?? ""} aria-invalid={Boolean(state.errors?.phone)} />{state.errors?.phone && <small className="field-error">{state.errors.phone}</small>}</label>
      </div>
      <div className="form-grid">
        <label className="field"><span>Correo electrónico <em>Opcional</em></span><input name="email" type="email" defaultValue={values?.email ?? client?.email ?? ""} aria-invalid={Boolean(state.errors?.email)} />{state.errors?.email && <small className="field-error">{state.errors.email}</small>}</label>
        <label className="field"><span>Origen o materia <b>*</b></span><input name="originMatter" defaultValue={values?.originMatter ?? client?.originMatter ?? ""} aria-invalid={Boolean(state.errors?.originMatter)} />{state.errors?.originMatter && <small className="field-error">{state.errors.originMatter}</small>}</label>
      </div>
      <footer className="form-actions"><Link className="button button-secondary" href="/clientes">Cancelar</Link>{state.status === "potential-match" && <button className="button button-secondary" name="confirmPotentialMatch" value="true" disabled={pending}>Guardar de todas formas</button>}<button className="button button-primary" type="submit" disabled={pending}>{pending ? "Guardando…" : "Guardar cliente"}</button></footer>
    </form>
  </div>;
}
