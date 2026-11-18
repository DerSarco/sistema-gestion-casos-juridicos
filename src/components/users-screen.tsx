"use client";

import { useActionState } from "react";
import { createUserAction, changeUserStatusAction, type UserActionState } from "@/app/usuarios/actions";
import type { InternalRole, InternalUser } from "@/modules/users/domain/internal-user";
import { PageHeading } from "./page-heading";

const initial: UserActionState = { status: "idle" };

function StatusForm({ user }: { user: InternalUser }) {
  const [state, action, pending] = useActionState(changeUserStatusAction, initial);
  return <form action={action} className="inline-action"><input type="hidden" name="userId" value={user.id} /><input type="hidden" name="target" value={user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"} /><button className="button button-secondary" disabled={pending}>{user.status === "ACTIVE" ? "Desactivar" : "Reactivar"}</button>{state.message && <small className="field-error" role="alert">{state.message}</small>}</form>;
}

export function UsersScreen({ users, roles, actorId }: { users: InternalUser[]; roles: InternalRole[]; actorId: string }) {
  const [state, action, pending] = useActionState(createUserAction, initial);
  return <>
    <PageHeading title="Usuarios internos" subtitle="Accesos y perfiles del estudio" />
    <section className="form-card user-create-card">
      <h2>Crear usuario</h2>
      <p className="section-copy">El acceso queda asociado al estudio y utiliza la autenticación configurada para este entorno.</p>
      <form action={action} className="user-create-form">
        <label className="field"><span>Nombre</span><input name="displayName" required minLength={3} /></label>
        <label className="field"><span>Identificador de acceso</span><input name="accessIdentifier" type="email" required placeholder="usuario@ejemplo.cl" /></label>
        <label className="field"><span>Perfil</span><select name="roleId" required>{roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select></label>
        <button className="button button-primary" disabled={pending}>{pending ? "Creando…" : "Crear usuario"}</button>
      </form>
      {state.message && <div className={state.status === "error" ? "error-summary" : "success-summary"} role="status">{state.message}</div>}
    </section>
    <section className="table-card"><div className="table-scroll"><table><thead><tr><th>Nombre</th><th>Identificador</th><th>Perfil</th><th>Estado</th><th>Acción</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td><strong>{user.displayName}</strong></td><td>{user.accessIdentifier}</td><td>{user.role}</td><td><span className={`status ${user.status === "ACTIVE" ? "status-activo" : "status-cerrado"}`}>{user.status === "ACTIVE" ? "Activo" : "Inactivo"}</span></td><td>{user.id === actorId ? <span>Sesión actual</span> : <StatusForm user={user} />}</td></tr>)}</tbody></table></div></section>
  </>;
}
