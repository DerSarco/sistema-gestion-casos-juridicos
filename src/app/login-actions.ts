"use server";
import { redirect } from "next/navigation";
import { loginWithInternalAccount } from "@/infrastructure/auth/server-actor";
export type LoginState = { status: "idle" | "error"; message?: string; identifier?: string };
export async function loginAction(_previous: LoginState, data: FormData): Promise<LoginState> {
  const identifier = String(data.get("identifier") ?? "").trim().toLocaleLowerCase("es-CL"); const password = String(data.get("password") ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) return { status: "error", message: "Ingrese un correo electrónico válido.", identifier };
  if (!password) return { status: "error", message: "Ingrese la contraseña.", identifier };
  if (!(await loginWithInternalAccount(identifier, password))) return { status: "error", message: "Las credenciales no son válidas o la cuenta está inactiva.", identifier };
  redirect("/casos");
}
