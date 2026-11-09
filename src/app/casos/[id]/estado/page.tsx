import Link from "next/link";
import { CaseDetail } from "@/components/case-detail";
import { Modal } from "@/components/modal";

export default function ChangeStatusPage() {
  return <CaseDetail modal={<Modal title="Cambiar estado o etapa" subtitle="CASO-001 · Cliente 01" closeHref="/casos/CASO-001"><form className="modal-body"><div className="current-state"><span>Situación actual</span><span className="status status-activo">Activo</span><span className="tag">Presentación</span></div><div className="form-grid"><label className="field"><span>Nuevo estado</span><select defaultValue="Activo"><option>Activo</option><option>En revisión</option><option>Cerrado</option></select></label><label className="field"><span>Nueva etapa</span><select defaultValue="Presentación"><option>Ingreso</option><option>Presentación</option><option>Antecedentes</option></select></label></div><label className="field"><span>Observación <em>Opcional</em></span><textarea placeholder="Ingrese un breve motivo u observación del cambio..." /></label><p className="helper">El cambio quedará registrado en el historial.</p><footer className="form-actions"><Link className="button button-secondary" href="/casos/CASO-001">Cancelar</Link><Link className="button button-primary" href="/casos/CASO-001">Confirmar cambio</Link></footer></form></Modal>} />;
}
