import Link from "next/link";
import type { ReactNode } from "react";

export function Modal({ title, subtitle, closeHref, children }: { title: string; subtitle: string; closeHref: string; children: ReactNode }) {
  return (
    <div className="modal-backdrop">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal-header"><div><h2 id="modal-title">{title}</h2><p>{subtitle}</p></div><Link className="icon-button" href={closeHref} aria-label="Cerrar">×</Link></header>
        {children}
      </section>
    </div>
  );
}
