import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeading } from "@/components/page-heading";

export default function NewCasePage() {
  return <AppShell active="cases"><div className="form-page"><PageHeading title="Registrar caso" subtitle="Formulario reutilizable para registrar y editar casos en el sistema interno" />
    <form className="form-card">
      <label className="field"><span>Cliente <b>*</b></span><select defaultValue=""><option value="" disabled>Seleccionar cliente...</option><option>Cliente 01</option><option>Cliente 02</option></select></label>
      <label className="field"><span>Título o materia <b>*</b></span><input placeholder="Ej. Demanda ordinaria de cumplimiento de contrato" /></label>
      <label className="field"><span>Descripción breve</span><textarea placeholder="Revisión de antecedentes y gestión interna..." /></label>
      <label className="field"><span>Abogado responsable <b>*</b></span><select defaultValue=""><option value="" disabled>Seleccionar abogado responsable...</option><option>Abogado A</option><option>Abogado B</option></select></label>
      <div className="form-grid"><label className="field"><span>Estado <b>*</b></span><select defaultValue="Activo"><option>Activo</option><option>En revisión</option></select></label><label className="field"><span>Etapa <b>*</b></span><select defaultValue="Ingreso"><option>Ingreso</option><option>Presentación</option></select></label></div>
      <aside className="notice"><strong>Registro manual interno</strong><span>Los antecedentes judiciales no se sincronizan con plataformas externas.</span></aside>
      <div className="form-grid"><label className="field"><span>Tribunal <em>Opcional</em></span><input placeholder="Ej. 1º Juzgado Civil" /></label><label className="field"><span>RIT o ROL <em>Opcional</em></span><input placeholder="Ej. C-1234-2026" /></label></div>
      <footer className="form-actions"><Link className="button button-secondary" href="/casos">Cancelar</Link><Link className="button button-primary" href="/casos/CASO-001">Guardar caso</Link></footer>
    </form></div></AppShell>;
}
