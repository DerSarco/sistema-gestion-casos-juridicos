import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { PrintButton } from "@/components/print-button";
import { getServerActor } from "@/infrastructure/auth/server-actor";
import { createPrismaAuthorizationRepository } from "@/infrastructure/prisma/prisma-authorization-repository";

export const instant = false;

export default async function AuthorizationDocumentPage({ params }: { params: Promise<{ id: string; documentId: string }> }) {
  await connection();
  const { id, documentId } = await params;
  const actor = await getServerActor();
  const result = await createPrismaAuthorizationRepository(actor.studyId).findPrintable(documentId);
  if (!result || result.document.clientId !== id) notFound();
  const { document, snapshot } = result;
  return <main className="authorization-document-page">
    <nav className="authorization-toolbar no-print"><Link className="button button-secondary" href={`/clientes/nuevo?cliente=${id}`}>Volver a editar</Link><PrintButton /></nav>
    <article className="authorization-document">
      <header>
        <p className="document-brand">{snapshot.studyName}</p>
        <h1>{snapshot.template.title}</h1>
        <dl className="document-meta"><div><dt>Folio</dt><dd>{document.folio}</dd></div><div><dt>Versión</dt><dd>{document.templateVersion}</dd></div><div><dt>Emisión</dt><dd>{new Date(snapshot.generatedAt).toLocaleString("es-CL")}</dd></div></dl>
      </header>
      <p className="document-warning">{snapshot.template.reviewNotice}</p>
      <section><h2>1. Identificación del titular</h2><p><strong>Nombre o razón social:</strong> {snapshot.client.displayName}</p><p><strong>RUT:</strong> {snapshot.client.rutNormalized}</p><p><strong>Contacto:</strong> {snapshot.client.phone}{snapshot.client.email ? ` · ${snapshot.client.email}` : ""}</p></section>
      <section><h2>2. Responsable y finalidad</h2><p><strong>{snapshot.studyName}</strong> tratará los datos personales estrictamente necesarios para prestar y administrar los servicios jurídicos solicitados.</p><ul>{snapshot.template.necessaryPurposes.map((purpose) => <li key={purpose}>{purpose}</li>)}</ul><p>Estos tratamientos podrán sustentarse en la relación contractual o precontractual, obligaciones legales, defensa de derechos u otra base jurídica aplicable. La firma de este documento no convierte el consentimiento en la única base de licitud.</p></section>
      <section><h2>3. Datos, destinatarios y conservación</h2><p><strong>Categorías:</strong> {snapshot.template.categories}.</p><p><strong>Destinatarios:</strong> {snapshot.template.recipients}.</p><p><strong>Conservación:</strong> {snapshot.template.retention}.</p></section>
      <section><h2>4. Derechos del titular</h2><p>{snapshot.template.rights}</p><p>Las solicitudes deberán dirigirse al canal de contacto que el estudio informe y mantener disponible. La revocación no afectará tratamientos anteriores ni aquellos sustentados en otra base jurídica.</p></section>
      <section><h2>5. Autorizaciones opcionales</h2><p>Marque únicamente si acepta cada finalidad opcional. La negativa no condiciona la prestación jurídica principal.</p>{snapshot.template.optionalPurposes.map((purpose) => <p className="document-choice" key={purpose}>☐ Autorizo &nbsp;&nbsp; ☐ No autorizo — {purpose}.</p>)}</section>
      <section><h2>6. Declaración</h2><p>Declaro haber recibido información clara sobre las finalidades, categorías de datos, destinatarios, conservación y derechos. La presente copia se firma fuera de la plataforma y su respaldo se archiva conforme al procedimiento aprobado por el estudio.</p></section>
      <footer className="signature-grid"><div><span>Firma del titular o representante</span><small>Nombre, RUT y calidad en que comparece</small></div><div><span>Firma del representante del estudio</span><small>Nombre y cargo</small></div><div><span>Fecha</span><small>____ / ____ / ______</small></div></footer>
      <p className="document-source">Plantilla operativa basada en las leyes N.º 19.628 y N.º 21.719. Debe revisarse y aprobarse antes de utilizarse con datos reales.</p>
    </article>
  </main>;
}
