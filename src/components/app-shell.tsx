import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./icons";

export function AppShell({ active, children }: { active: "cases" | "clients"; children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="sidebar-brand" href="/casos">
          <span className="brand-mark brand-mark-small" aria-hidden="true">§</span>
          <span><strong>Estudio Jurídico</strong><small>Gestión Legal</small></span>
        </Link>
        <nav aria-label="Navegación principal">
          <Link className={`nav-item ${active === "cases" ? "nav-item-active" : ""}`} href="/casos"><Icon name="folder" /> Casos</Link>
          <Link className={`nav-item ${active === "clients" ? "nav-item-active" : ""}`} href="/clientes"><Icon name="clients" /> Clientes</Link>
        </nav>
        <Link className="logout" href="/"><Icon name="logout" /> Cerrar sesión</Link>
      </aside>
      <div className="workspace">
        <header className="topbar"><span>Gestión de Casos</span><span className="user"><span className="avatar">AA</span><strong>Abogado A</strong></span></header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
