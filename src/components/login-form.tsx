"use client";
import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/login-actions";
export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { status: "idle" } as LoginState);
  return <form className="stack-lg" action={action} noValidate>{state.message && <div className="error-summary" role="alert"><strong>No se pudo continuar</strong><span>{state.message}</span></div>}<label className="field"><span>Correo electrónico</span><input name="identifier" type="email" defaultValue={state.identifier ?? ""} autoComplete="username" /></label><label className="field"><span>Contraseña</span><input name="password" type="password" autoComplete="current-password" /></label><button className="button button-primary button-block" disabled={pending}>{pending ? "Ingresando…" : "Ingresar"}</button></form>;
}
