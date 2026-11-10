"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";

export function Modal({ title, subtitle, closeHref, children }: { title: string; subtitle: string; closeHref: string; children: ReactNode }) {
  const router = useRouter(); const dialog = useRef<HTMLElement>(null);
  useEffect(() => { const previous = document.activeElement as HTMLElement | null; dialog.current?.querySelector<HTMLElement>("input, select, textarea, button, a[href]")?.focus(); return () => previous?.focus(); }, []);
  function keyDown(event: KeyboardEvent<HTMLElement>) { if (event.key === "Escape") { event.preventDefault(); router.push(closeHref); return; } if (event.key !== "Tab") return; const focusable = [...(dialog.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])") ?? [])]; if (!focusable.length) return; const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }
  return <div className="modal-backdrop"><section ref={dialog} className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-subtitle" onKeyDown={keyDown}><header className="modal-header"><div><h2 id="modal-title">{title}</h2><p id="modal-subtitle">{subtitle}</p></div><Link className="icon-button" href={closeHref} aria-label="Cerrar">×</Link></header>{children}</section></div>;
}
