"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { PageHeading } from "./page-heading";
import { useSessionStore } from "./session-store";

type Errors = Partial<Record<"name" | "email" | "phone" | "duplicate", string>>;

export function ClientForm({ clientCode }: { clientCode?: string }) {
  const router = useRouter();
  const { clients, saveClient } = useSessionStore();
  const existing = clients.find((client) => client.code === clientCode);
  const [name, setName] = useState(existing?.name ?? "");
  const [email, setEmail] = useState(existing?.email ?? "");
  const [phone, setPhone] = useState(existing?.phone ?? "");
  const [contactChannel, setContactChannel] = useState(existing?.contactChannel ?? "Correo electrónico");
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [errors, setErrors] = useState<Errors>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Ingrese el nombre del cliente.";
    if (!email.trim()) next.email = "Ingrese el correo electrónico.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Ingrese un correo electrónico válido.";
    if (!phone.trim()) next.phone = "Ingrese el teléfono.";
    else if (!/^\+?[0-9\s()-]{8,20}$/.test(phone)) next.phone = "Ingrese un teléfono válido de 8 a 20 caracteres.";
    const duplicate = clients.find((client) => client.id !== existing?.id && (client.email.toLowerCase() === email.trim().toLowerCase() || client.phone.replace(/\D/g, "") === phone.replace(/\D/g, "")));
    if (duplicate && email && phone) next.duplicate = `Ya existe ${duplicate.code} con el mismo correo o teléfono.`;
    setErrors(next);
    if (Object.keys(next).length) return;
    saveClient({ name: name.trim(), email: email.trim(), phone: phone.trim(), contactChannel, notes: notes.trim() }, existing?.id);
    router.push("/clientes");
  }

  return <div className="form-page form-page-narrow">
    <PageHeading title={existing ? "Editar cliente" : "Registrar cliente"} subtitle="Los cambios se conservan durante esta sesión de demostración" />
    <aside className="notice"><strong>Aviso preventivo</strong><span>Verifique coincidencias por correo o teléfono antes de registrar.</span></aside>
    <form className="form-card" onSubmit={submit} noValidate>
      {Object.keys(errors).length > 0 && <div className="error-summary" role="alert" tabIndex={-1}><strong>Revise los campos indicados</strong><span>{Object.values(errors)[0]}</span></div>}
      <label className="field"><span>Nombre del cliente <b>*</b></span><input value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "client-name-error" : undefined} />{errors.name && <small id="client-name-error" className="field-error">{errors.name}</small>}</label>
      <div className="form-grid">
        <label className="field"><span>Correo electrónico <b>*</b></span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email || errors.duplicate)} aria-describedby={errors.email ? "client-email-error" : errors.duplicate ? "client-duplicate-error" : undefined} />{errors.email && <small id="client-email-error" className="field-error">{errors.email}</small>}</label>
        <label className="field"><span>Teléfono <b>*</b></span><input value={phone} onChange={(event) => setPhone(event.target.value)} aria-invalid={Boolean(errors.phone || errors.duplicate)} aria-describedby={errors.phone ? "client-phone-error" : errors.duplicate ? "client-duplicate-error" : undefined} />{errors.phone && <small id="client-phone-error" className="field-error">{errors.phone}</small>}</label>
      </div>
      {errors.duplicate && <p id="client-duplicate-error" className="field-error" role="alert">{errors.duplicate}</p>}
      <label className="field"><span>Canal de contacto preferido</span><select value={contactChannel} onChange={(event) => setContactChannel(event.target.value as "Correo electrónico" | "Teléfono")}><option>Correo electrónico</option><option>Teléfono</option></select></label>
      <label className="field"><span>Observación operativa <em>Opcional</em></span><textarea value={notes} onChange={(event) => setNotes(event.target.value)} /></label>
      <footer className="form-actions"><Link className="button button-secondary" href="/clientes">Cancelar</Link><button className="button button-primary" type="submit">Guardar cliente</button></footer>
    </form>
  </div>;
}
