export const AUTHORIZATION_TEMPLATE_VERSION = "1.0";

export const AUTHORIZATION_TEMPLATE = {
  title: "Información y autorización para el tratamiento de datos personales",
  necessaryPurposes: [
    "registrar y mantener la ficha de contacto del cliente",
    "evaluar, gestionar y dar seguimiento al encargo jurídico solicitado",
    "comunicar información operativa relacionada con la atención y el caso",
    "cumplir obligaciones legales, contractuales, de archivo y defensa de derechos",
  ],
  optionalPurposes: [
    "enviar información general del estudio no vinculada con el encargo vigente",
    "utilizar antecedentes anonimizados para estadísticas internas y mejora del servicio",
  ],
  categories: "identificación, contacto, antecedentes laborales, contractuales, judiciales y demás información estrictamente necesaria para la gestión encomendada",
  recipients: "personal interno autorizado, tribunales, organismos públicos, contrapartes, proveedores sujetos a deberes de confidencialidad y otros destinatarios necesarios para la gestión jurídica o exigidos por ley",
  retention: "durante la relación profesional y por los plazos legales, contractuales o de defensa de derechos aplicables; posteriormente deberán eliminarse, anonimizarse o conservarse solo cuando exista fundamento jurídico",
  rights: "El titular puede solicitar acceso, rectificación, supresión, oposición, portabilidad o bloqueo cuando corresponda, y revocar las autorizaciones basadas en consentimiento sin efecto retroactivo.",
  reviewNotice: "PLANTILLA BASE PENDIENTE DE APROBACIÓN JURÍDICA Y ORGANIZACIONAL POR LOS SOCIOS. NO HABILITA POR SÍ SOLA EL USO DE DATOS REALES.",
} as const;

export type AuthorizationSnapshot = {
  client: { displayName: string; rutNormalized: string; phone: string; email: string | null };
  studyName: string;
  template: typeof AUTHORIZATION_TEMPLATE;
  generatedAt: string;
};

export type AuthorizationDocumentItem = {
  id: string;
  clientId: string;
  folio: string;
  templateVersion: string;
  status: "PENDING_SIGNATURE" | "DELIVERED" | "SIGNED" | "REVOKED";
  deliveredAt: string | null;
  signedAt: string | null;
  revokedAt: string | null;
  archiveReference: string | null;
  createdAt: string;
};
