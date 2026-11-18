export const INTERNAL_ROLES = ["Socio", "Abogado", "Asistente", "Procurador"] as const;

export type InternalRole = (typeof INTERNAL_ROLES)[number];

export const CAPABILITIES = [
  "client:read",
  "client:write",
  "client:lifecycle",
  "case:read",
  "case:write",
  "case:stage",
  "case:date",
  "case:assign",
  "case:lifecycle",
  "history:read",
  "report:read",
  "report:export",
  "user:manage",
] as const;

export type Capability = (typeof CAPABILITIES)[number];

const COMMON_CAPABILITIES: readonly Capability[] = [
  "client:read",
  "client:write",
  "case:read",
  "case:write",
  "case:stage",
  "case:date",
  "history:read",
  "report:read",
];

const ROLE_CAPABILITIES: Record<InternalRole, ReadonlySet<Capability>> = {
  Socio: new Set([
    ...COMMON_CAPABILITIES,
    "client:lifecycle",
    "case:assign",
    "case:lifecycle",
    "report:export",
    "user:manage",
  ]),
  Abogado: new Set(COMMON_CAPABILITIES),
  Asistente: new Set(COMMON_CAPABILITIES),
  Procurador: new Set(COMMON_CAPABILITIES),
};

export class AuthorizationError extends Error {
  readonly code = "FORBIDDEN";

  constructor(readonly capability: Capability) {
    super("No tienes permisos para realizar esta acción.");
    this.name = "AuthorizationError";
  }
}

export function isInternalRole(role: string): role is InternalRole {
  return INTERNAL_ROLES.includes(role as InternalRole);
}

export function can(role: string, capability: Capability): boolean {
  return isInternalRole(role) && ROLE_CAPABILITIES[role].has(capability);
}

export function authorize(role: string, capability: Capability): void {
  if (!can(role, capability)) throw new AuthorizationError(capability);
}

