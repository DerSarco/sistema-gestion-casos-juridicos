export type ClientStatus = "ACTIVE" | "INACTIVE";

export type Client = {
  id: string;
  displayName: string;
  email: string | null;
  phone: string | null;
  status: ClientStatus;
  createdAt: string;
};

export type ClientInput = {
  displayName: string;
  email?: string;
  phone?: string;
};

export type ClientValidationErrors = Partial<
  Record<"displayName" | "email" | "phone" | "contact", string>
>;

export function normalizeClientInput(input: ClientInput): ClientInput {
  return {
    displayName: input.displayName.trim().replace(/\s+/g, " "),
    email: input.email?.trim().toLocaleLowerCase("es-CL") ?? "",
    phone: input.phone?.trim().replace(/[\s()-]/g, "") ?? "",
  };
}

export function validateClientInput(input: ClientInput): ClientValidationErrors {
  const errors: ClientValidationErrors = {};

  if (input.displayName.length < 3 || input.displayName.length > 120) {
    errors.displayName = "Ingresa un nombre de entre 3 y 120 caracteres.";
  }

  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = "Ingresa un correo con formato válido.";
  }

  if (input.phone && !/^\+?[0-9]{8,15}$/.test(input.phone)) {
    errors.phone = "Ingresa entre 8 y 15 dígitos; el prefijo + es opcional.";
  }

  if (!input.email && !input.phone) {
    errors.contact =
      "Para este prototipo ingresa al menos un correo o teléfono ficticio.";
  }

  return errors;
}

export function findPotentialMatches(
  clients: Client[],
  input: ClientInput,
): Client[] {
  const normalizedName = input.displayName.toLocaleLowerCase("es-CL");

  return clients.filter((client) => {
    const sameName =
      client.displayName.toLocaleLowerCase("es-CL") === normalizedName;
    const sameEmail = Boolean(
      input.email && client.email && client.email === input.email,
    );
    const samePhone = Boolean(
      input.phone && client.phone && client.phone === input.phone,
    );

    return sameName || sameEmail || samePhone;
  });
}
