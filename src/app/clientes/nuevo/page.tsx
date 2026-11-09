import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeading } from "@/components/page-heading";

export default function NewClientPage() {
  return <AppShell active="clients"><div className="form-page form-page-narrow"><PageHeading title="Registrar cliente" subtitle="Formulario reutilizable para registrar y editar información de clientes" />
    <aside className="notice"><strong>Aviso preventivo</strong><span>Verifique coincidencias por nombre, correo o teléfono antes de registrar.</span></aside>
    <form className="form-card">
      <label className="field"><span>Nombre del cliente <b>*</b></span><input placeholder="Ej. Cliente 01" /></label>
      <div className="form-grid"><label className="field"><span>Correo electrónico <b>*</b></span><input type="email" placeholder="cliente01@ejemplo.cl" /></label><label className="field"><span>Teléfono <b>*</b></span><input placeholder="+56 9 1234 5678" /></label></div>
      <label className="field"><span>Canal de contacto preferido</span><select><option>Correo electrónico</option><option>Teléfono</option></select></label>
      <label className="field"><span>Observación operativa <em>Opcional</em></span><textarea placeholder="Notas internas del estudio sobre el cliente o atención..." /></label>
      <footer className="form-actions"><Link className="button button-secondary" href="/clientes">Cancelar</Link><Link className="button button-primary" href="/clientes">Guardar cliente</Link></footer>
    </form></div></AppShell>;
}
