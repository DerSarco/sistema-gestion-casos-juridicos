import Link from "next/link";
import { fictionalCases } from "@/fixtures/cases";
import { fictionalClients } from "@/fixtures/clients";
import { CaseWorkbench } from "./case-workbench";
import styles from "./cases.module.css";

export default function CasesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.notice} role="status">
        Datos ficticios · Memoria temporal · Se borran al recargar el proceso
      </div>

      <nav aria-label="Navegación principal" className={styles.nav}>
        <Link href="/">Resumen</Link>
        <Link href="/clientes">Clientes</Link>
        <strong>Casos</strong>
      </nav>

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>RF-008 a RF-011</p>
          <h1>Casos</h1>
        </div>
        <p>
          Registra y consulta casos ficticios vinculados con un cliente. Los
          antecedentes judiciales permanecen vacíos hasta que una persona los
          obtenga y registre manualmente fuera del sistema.
        </p>
      </header>

      <CaseWorkbench initialCases={fictionalCases} clients={fictionalClients} />
    </main>
  );
}
