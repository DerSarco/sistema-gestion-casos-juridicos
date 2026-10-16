"use client";

import { useMemo, useState, type FormEvent } from "react";
import { InMemoryClientRepository } from "@/infrastructure/memory/in-memory-client-repository";
import { RegisterClient } from "@/modules/clients/application/register-client";
import type {
  Client,
  ClientValidationErrors,
} from "@/modules/clients/domain/client";
import styles from "./clients.module.css";

type Feedback =
  | { kind: "success"; message: string }
  | { kind: "warning"; message: string }
  | null;

export function ClientWorkbench({ initialClients }: { initialClients: Client[] }) {
  const [repository] = useState(
    () => new InMemoryClientRepository(initialClients),
  );
  const [registerClient] = useState(
    () =>
    new RegisterClient(
      repository,
      () => crypto.randomUUID(),
      () => new Date().toISOString(),
    ),
  );
  const [clients, setClients] = useState(() => repository.list());
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState<ClientValidationErrors>({});
  const [feedback, setFeedback] = useState<Feedback>(null);

  const filteredClients = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es-CL");
    if (!normalizedQuery) return clients;

    return clients.filter((client) =>
      [client.displayName, client.email ?? "", client.phone ?? ""].some((value) =>
        value.toLocaleLowerCase("es-CL").includes(normalizedQuery),
      ),
    );
  }, [clients, query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = registerClient.execute(
      {
        displayName: String(formData.get("displayName") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
      },
      { confirmPotentialMatch: formData.get("confirmPotentialMatch") === "on" },
    );

    if (result.status === "invalid") {
      setErrors(result.errors);
      setFeedback(null);
      return;
    }

    if (result.status === "potential-match") {
      setErrors({});
      setFeedback({
        kind: "warning",
        message: `Se encontraron ${result.matches.length} coincidencia(s): ${result.matches
          .map((match) => match.displayName)
          .join(", ")}. Revisa antes de confirmar una ficha separada.`,
      });
      return;
    }

    setClients(repository.list());
    setErrors({});
    setFeedback({
      kind: "success",
      message: `${result.client.displayName} se agregó a la memoria temporal.`,
    });
    form.reset();
  }

  return (
    <div className={styles.workspace}>
      <section aria-labelledby="client-list-title" className={styles.listPanel}>
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.kicker}>Directorio temporal</p>
            <h2 id="client-list-title">{clients.length} clientes ficticios</h2>
          </div>
          <label className={styles.search}>
            <span>Buscar</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nombre, correo o teléfono"
            />
          </label>
        </div>

        <div className={styles.clientList}>
          {filteredClients.length === 0 ? (
            <p className={styles.empty}>No hay resultados para esta búsqueda.</p>
          ) : (
            filteredClients.map((client) => (
              <article className={styles.clientCard} key={client.id}>
                <div className={styles.avatar} aria-hidden="true">
                  {client.displayName.slice(-2)}
                </div>
                <div>
                  <h3>{client.displayName}</h3>
                  <p>{client.email ?? "Sin correo"}</p>
                </div>
                <div className={styles.clientMeta}>
                  <span>{client.phone ?? "Sin teléfono"}</span>
                  <span className={styles.active}>Activo</span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section aria-labelledby="new-client-title" className={styles.formPanel}>
        <p className={styles.kicker}>Nueva ficha</p>
        <h2 id="new-client-title">Registrar cliente</h2>
        <p className={styles.assumption}>
          Supuesto reversible del prototipo: se solicita nombre y al menos un
          medio de contacto ficticio. Los campos definitivos requieren validación.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label>
            Nombre o denominación
            <input name="displayName" autoComplete="off" required />
            {errors.displayName && <small role="alert">{errors.displayName}</small>}
          </label>

          <label>
            Correo ficticio
            <input
              name="email"
              type="email"
              autoComplete="off"
              placeholder="cliente03@example.test"
            />
            {errors.email && <small role="alert">{errors.email}</small>}
          </label>

          <label>
            Teléfono ficticio
            <input
              name="phone"
              type="tel"
              autoComplete="off"
              placeholder="+56933333333"
            />
            {errors.phone && <small role="alert">{errors.phone}</small>}
          </label>

          {errors.contact && <p className={styles.error} role="alert">{errors.contact}</p>}

          <label className={styles.confirmation}>
            <input name="confirmPotentialMatch" type="checkbox" />
            Confirmo que revisé coincidencias y esta ficha debe permanecer separada.
          </label>

          {feedback && (
            <p
              className={feedback.kind === "success" ? styles.success : styles.warning}
              role={feedback.kind === "warning" ? "alert" : "status"}
            >
              {feedback.message}
            </p>
          )}

          <button type="submit">Registrar en memoria temporal</button>
        </form>
      </section>
    </div>
  );
}
