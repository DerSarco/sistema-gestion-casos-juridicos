import Link from "next/link";
import type { ReactNode } from "react";
import { AppShell } from "./app-shell";
import { Icon } from "./icons";

export function CaseDetail({ modal }: { modal?: ReactNode }) {
  return (
    <AppShell active="cases">
      <section className="case-header card">
        <div><div className="case-title-row"><h1>CASO-001</h1><span className="status status-activo">Activo</span><span className="tag">Presentación</span></div><p>Demanda ordinaria de cumplimiento de contrato</p></div>
        <div className="button-row"><Link className="button button-secondary" href="/casos/CASO-001/estado">Cambiar estado / etapa</Link><Link className="button button-primary" href="/casos/nuevo?editar=CASO-001">Editar caso</Link></div>
      </section>
      <div className="detail-grid">
        <div className="detail-main">
          <section className="card detail-card"><header><h2>Datos generales del caso</h2><Link className="text-action" href="/casos/CASO-001/fechas/nueva">+ Registrar fecha</Link></header>
            <dl className="facts"><div><dt>Cliente vinculado</dt><dd>Cliente 01</dd></div><div><dt>Abogado responsable</dt><dd>Abogado A</dd></div><div><dt>Estado actual</dt><dd><span className="status status-activo">Activo</span></dd></div><div><dt>Etapa procesal</dt><dd>Presentación</dd></div></dl>
            <div className="date-highlight"><Icon name="calendar" /><strong>24 oct 2026 · 10:00</strong><span>Registrada manualmente</span></div>
          </section>
          <section className="card detail-card"><header><h2>Descripción breve</h2></header><p>Demanda ordinaria de cumplimiento de contrato por incumplimiento de cláusulas. Revisión de antecedentes y gestión de cobranza prejudicial.</p></section>
          <section className="card detail-card"><header><h2>Historial básico de cambios</h2></header><ol className="timeline"><li><time>14 oct 2026, 11:30</time><span><strong>Abogado A</strong> cambió la etapa a “Presentación”.</span></li><li><time>12 sep 2026, 09:15</time><span><strong>Abogado A</strong> registró el caso en estado “Activo”.</span></li></ol></section>
        </div>
        <aside className="detail-side"><section className="card detail-card"><header><h2>Antecedentes judiciales</h2></header><dl className="facts facts-single"><div><dt>Tribunal</dt><dd>1º Juzgado Civil de Santiago</dd></div><div><dt>RIT</dt><dd>C-4821-2026</dd></div><div><dt>ROL</dt><dd className="muted">No registrado</dd></div></dl><p className="notice compact">Registro manual interno, sin sincronización externa.</p></section><section className="notice"><strong>Protocolo de gestión</strong><span>Esta ficha utiliza únicamente antecedentes ficticios para demostración.</span></section></aside>
      </div>
      {modal}
    </AppShell>
  );
}
