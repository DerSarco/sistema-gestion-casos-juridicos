export type ClientStatus = "ACTIVE" | "INACTIVE";

export type Client = {
  id: string;
  displayName: string;
  rutNormalized: string;
  phone: string;
  email: string | null;
  originMatter: string;
  status: ClientStatus;
  statusChangedAt: string | null;
  statusReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ClientInput = {
  displayName: string;
  rut: string;
  phone: string;
  email?: string;
  originMatter: string;
};

export type ClientValidationErrors = Partial<
  Record<"displayName" | "rut" | "email" | "phone" | "originMatter", string>
>;

export function normalizeRut(value: string): string {
  return value.trim().toUpperCase().replace(/[^0-9K]/g, "");
}

export function normalizeClientInput(input: ClientInput): ClientInput {
  return {
    displayName: input.displayName.trim().replace(/\s+/g, " "),
    rut: normalizeRut(input.rut),
    email: input.email?.trim().toLocaleLowerCase("es-CL") ?? "",
    phone: input.phone.trim().replace(/[\s()-]/g, ""),
    originMatter: input.originMatter.trim().replace(/\s+/g, " "),
  };
}

export function validateClientInput(input: ClientInput): ClientValidationErrors {
  const errors: ClientValidationErrors = {};
  if (input.displayName.length < 3 || input.displayName.length > 120) {
    errors.displayName = "Ingresa un nombre de entre 3 y 120 caracteres.";
  }
  if (!/^[0-9]{7,8}[0-9K]$/.test(input.rut)) {
    errors.rut = "Ingresa un RUT válido sin puntos ni guion.";
  }
  if (!/^\+?[0-9]{8,15}$/.test(input.phone)) {
    errors.phone = "Ingresa entre 8 y 15 dígitos; el prefijo + es opcional.";
  }
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = "Ingresa un correo con formato válido.";
  }
  if (input.originMatter.length < 3 || input.originMatter.length > 120) {
    errors.originMatter = "Ingresa un origen o materia de entre 3 y 120 caracteres.";
  }
  return errors;
}

export function findPotentialMatches(clients: Client[], input: ClientInput): Client[] {
  const name = input.displayName.toLocaleLowerCase("es-CL");
  const origin = input.originMatter.toLocaleLowerCase("es-CL");
  return clients.filter(
    (client) =>
      client.displayName.toLocaleLowerCase("es-CL") === name &&
      client.originMatter.toLocaleLowerCase("es-CL") === origin,
  );
}
