import Link from "next/link";
import { generateClientAuthorizationAction, updateAuthorizationStatusAction } from "@/app/clientes/actions";
import type { AuthorizationDocumentItem } from "@/modules/authorizations/template";

const statusLabels: Record<AuthorizationDocumentItem["status"], string> = {
  PENDING_SIGNATURE: "Pendiente de firma",
  DELIVERED: "Entregado",
  SIGNED: "Firmado",
  REVOKED: "Revocado",
};

export function ClientAuthorizationSection({ clientId, documents }: { clientId: string; documents: AuthorizationDocumentItem[] }) {
  return <section className="form-card authorization-panel" aria-labelledby="authorization-title">
    <header className="authorization-header">
      <div>
        <p className="eyebrow">Privacidad y respaldo físico</p>
        <h2 id="authorization-title">Información y autorización de datos personales</h2>
        <p>Genere una copia para revisión y firma manuscrita. La plataforma conserva el folio y el estado, no el documento firmado.</p>
      </div>
      <form action={generateClientAuthorizationAction}>
        <input type="hidden" name="clientId" value={clientId} />
        <button className="button button-primary" type="submit">Generar nuevo documento</button>
      </form>
    </header>
    <aside className="notice authorization-warning"><strong>Pendiente de validación</strong><span>La plantilla debe ser aprobada por los socios antes de utilizar datos reales.</span></aside>
    {documents.length === 0 ? <p className="empty-inline">Todavía no existen documentos generados.</p> : <div className="authorization-list">
      {documents.map((document) => <article className="authorization-item" key={document.id}>
        <div>
          <strong>{document.folio}</strong>
          <span>Versión {document.templateVersion} · {new Date(document.createdAt).toLocaleString("es-CL")}</span>
          <span className="status status-activo">{statusLabels[document.status]}</span>
        </div>
        <Link className="table-link" href={`/clientes/${clientId}/autorizaciones/${document.id}`}>Ver e imprimir</Link>
        <form action={updateAuthorizationStatusAction} className="authorization-state-form">
          <input type="hidden" name="clientId" value={clientId} />
          <input type="hidden" name="documentId" value={document.id} />
          <label className="field"><span>Estado</span><select name="status" defaultValue={document.status}>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label className="field"><span>Referencia del respaldo físico</span><input name="archiveReference" defaultValue={document.archiveReference ?? ""} placeholder="Ej.: Archivador 2026, folio 14" maxLength={160} /></label>
          <button className="button button-secondary" type="submit">Actualizar registro</button>
        </form>
      </article>)}
    </div>}
  </section>;
}
