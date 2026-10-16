import styles from "./page.module.css";
import Link from "next/link";

const modules = [
  {
    title: "Clientes",
    description: "Registro y consulta de fichas ficticias vinculadas con sus casos.",
    status: "Disponible",
    href: "/clientes",
  },
  {
    title: "Casos",
    description: "Seguimiento de estado, etapa, responsable e historial operativo.",
    status: "Disponible",
    href: "/casos",
  },
  {
    title: "Fechas e hitos",
    description: "Control interno sin cálculo automático de plazos judiciales.",
    status: "Planificado",
    href: null,
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.notice} role="status">
        Entorno de desarrollo · Solo datos ficticios · No apto para uso productivo
      </div>

      <header className={styles.header}>
        <p className={styles.eyebrow}>Estudio Jurídico X</p>
        <h1>Gestión clara desde el primer registro</h1>
        <p className={styles.lead}>
          Base técnica de la plataforma interna para centralizar clientes, casos,
          responsables e hitos con trazabilidad.
        </p>
      </header>

      <section aria-labelledby="modules-title" className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Versión 0.2</p>
            <h2 id="modules-title">Primer incremento</h2>
          </div>
          <span className={styles.badge}>Sin autenticación todavía</span>
        </div>

        <div className={styles.grid}>
          {modules.map((module) => (
            module.href ? (
              <Link className={styles.cardLink} href={module.href} key={module.title}>
                <article className={styles.card}>
                  <span>{module.status}</span>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </article>
              </Link>
            ) : (
              <article className={styles.card} key={module.title}>
                <span>{module.status}</span>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </article>
            )
          ))}
        </div>
      </section>

      <aside className={styles.boundary}>
        <strong>Límite operativo</strong>
        <p>
          La Oficina Judicial Virtual se utiliza manualmente fuera de este
          sistema. No existe conexión, consulta, envío ni sincronización técnica.
        </p>
      </aside>
    </main>
  );
}
