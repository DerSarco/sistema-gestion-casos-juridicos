import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getPrismaClient } from "@/infrastructure/prisma/prisma-client";

const COOKIE_NAME = "sgcj_session";
const SESSION_SECONDS = 60 * 60 * 8;
const DEMO_IDENTIFIERS = {
  Socio: "socio-a@example.test",
  Abogado: "abogado-a@example.test",
  Asistente: "asistente-a@example.test",
  Procurador: "procurador-a@example.test",
} as const;
export type DemoRole = keyof typeof DEMO_IDENTIFIERS;
export type ServerActor = { id: string; studyId: string; role: string; displayName: string };

export function isDemoProfileSwitcherEnabled(value = process.env.DEMO_PROFILE_SWITCHER_ENABLED): boolean {
  return value === "true";
}

export function demoIdentifierForRole(role: string): string | null {
  return role in DEMO_IDENTIFIERS ? DEMO_IDENTIFIERS[role as DemoRole] : null;
}

function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET debe configurarse fuera del repositorio y contener al menos 32 caracteres.");
  return value;
}
function signature(payload: string): string { return createHmac("sha256", secret()).update(payload).digest("base64url"); }
export function createSessionValue(userId: string, studyId: string, now = Date.now()): string {
  const payload = Buffer.from(JSON.stringify({ userId, studyId, expiresAt: now + SESSION_SECONDS * 1000 })).toString("base64url");
  return `${payload}.${signature(payload)}`;
}
export function verifySessionValue(value: string, now = Date.now()): { userId: string; studyId: string } | null {
  const [payload, supplied] = value.split(".");
  if (!payload || !supplied) return null;
  const expected = signature(payload); const left = Buffer.from(supplied); const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as { userId: string; studyId: string; expiresAt: number };
    return parsed.expiresAt > now && parsed.userId && parsed.studyId ? parsed : null;
  } catch { return null; }
}
export async function startSession(userId: string, studyId: string): Promise<void> {
  (await cookies()).set(COOKIE_NAME, createSessionValue(userId, studyId), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_SECONDS });
}
export async function endSession(): Promise<void> { (await cookies()).delete(COOKIE_NAME); }
export async function getOptionalServerActor(): Promise<ServerActor | null> {
  await connection();
  const raw = (await cookies()).get(COOKIE_NAME)?.value; if (!raw) return null;
  const session = verifySessionValue(raw); if (!session) return null;
  const user = await getPrismaClient().user.findFirst({ where: { id: session.userId, studyId: session.studyId, status: "ACTIVE", study: { active: true }, role: { active: true } }, select: { id: true, studyId: true, displayName: true, role: { select: { name: true } } } });
  return user ? { id: user.id, studyId: user.studyId, displayName: user.displayName, role: user.role.name } : null;
}
export async function getServerActor(): Promise<ServerActor> { const actor = await getOptionalServerActor(); if (!actor) redirect("/"); return actor; }
export function requirePartner(actor: ServerActor): void { if (actor.role !== "Socio") throw new Error("Esta acción requiere el perfil Socio."); }
export function requireSelfAssignment(actor: ServerActor, responsibleId: string, participantIds: string[]): void {
  if (actor.role !== "Socio" && (responsibleId !== actor.id || participantIds.length > 0)) throw new Error("Solo un Socio puede distribuir el caso a otras personas.");
}
export async function loginWithInternalAccount(identifier: string, password: string): Promise<ServerActor | null> {
  const expectedPassword = process.env.DEMO_LOGIN_PASSWORD; if (!expectedPassword) throw new Error("DEMO_LOGIN_PASSWORD debe configurarse fuera del repositorio.");
  const left = Buffer.from(password); const right = Buffer.from(expectedPassword);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  const user = await getPrismaClient().user.findFirst({ where: { accessIdentifier: identifier.toLocaleLowerCase("es-CL"), status: "ACTIVE", study: { active: true }, role: { active: true } }, select: { id: true, studyId: true, displayName: true, role: { select: { name: true } } } });
  if (!user) return null; await startSession(user.id, user.studyId);
  return { id: user.id, studyId: user.studyId, displayName: user.displayName, role: user.role.name };
}
export async function logoutAction(): Promise<void> { "use server"; await endSession(); redirect("/"); }
export async function switchDemoProfileAction(data: FormData): Promise<void> {
  "use server";
  if (!isDemoProfileSwitcherEnabled()) throw new Error("El cambio rápido de perfil no está habilitado.");
  const actor = await getServerActor();
  const identifier = demoIdentifierForRole(String(data.get("role") ?? ""));
  if (!identifier) throw new Error("El perfil de demostración no está autorizado.");
  const target = await getPrismaClient().user.findFirst({
    where: {
      accessIdentifier: identifier,
      studyId: actor.studyId,
      status: "ACTIVE",
      study: { active: true },
      role: { active: true },
    },
    select: { id: true, studyId: true },
  });
  if (!target) throw new Error("La cuenta ficticia seleccionada no está disponible para este estudio.");
  await startSession(target.id, target.studyId);
  const requestedPath = String(data.get("returnTo") ?? "");
  const returnTo = /^\/(casos|clientes|reportes)(\/|$)/.test(requestedPath) ? requestedPath : "/casos";
  redirect(returnTo);
}
