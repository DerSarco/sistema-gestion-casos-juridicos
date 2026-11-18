import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./icons";
import { getServerActor, isDemoProfileSwitcherEnabled, logoutAction, switchDemoProfileAction } from "@/infrastructure/auth/server-actor";

export async function AppShell({ active, children }: { active: "cases" | "clients" | "reports"; children: ReactNode }) {
  const actor = await getServerActor();
  const returnTo = active === "clients" ? "/clientes" : active === "reports" ? "/reportes" : "/casos";
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
          <Link className={`nav-item ${active === "reports" ? "nav-item-active" : ""}`} href="/reportes"><Icon name="chart" /> Reportes</Link>
        </nav>
        <form action={logoutAction}><button className="logout" type="submit"><Icon name="logout" /> Cerrar sesión</button></form>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <span>Gestión de Casos</span>
          <div className="topbar-actions">
            {isDemoProfileSwitcherEnabled() && (
              <form className="demo-profile-switcher" action={switchDemoProfileAction}>
                <input type="hidden" name="returnTo" value={returnTo} />
                <label htmlFor="demo-role">Perfil demo</label>
                <select id="demo-role" name="role" defaultValue={actor.role} aria-describedby="demo-profile-note">
                  <option>Socio</option>
                  <option>Abogado</option>
                  <option>Asistente</option>
                  <option>Procurador</option>
                </select>
                <button type="submit">Cambiar</button>
                <span id="demo-profile-note" className="sr-only">Función exclusiva del entorno de demostración</span>
              </form>
            )}
            <span className="user"><span className="avatar">{actor.displayName.split(/\s+/).map((part) => part[0]).slice(0, 2).join("")}</span><strong>{actor.displayName} · {actor.role}</strong></span>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
