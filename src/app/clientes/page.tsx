import Link from "next/link";
import { fictionalClients } from "@/fixtures/clients";
import { ClientWorkbench } from "./client-workbench";
import styles from "./clients.module.css";

export default function ClientsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.notice} role="status">
        Datos ficticios · Memoria temporal · Se borran al recargar el proceso
      </div>

      <nav aria-label="Navegación principal" className={styles.nav}>
        <Link href="/">Resumen</Link>
        <strong>Clientes</strong>
        <Link href="/casos">Casos</Link>
      </nav>

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>RF-002 y RF-003</p>
          <h1>Clientes</h1>
        </div>
        <p>
          Registra y consulta fichas de prueba. Las coincidencias se advierten,
          pero nunca se fusionan automáticamente.
        </p>
      </header>

      <ClientWorkbench initialClients={fictionalClients} />
    </main>
  );
}
