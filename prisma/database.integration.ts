import assert from "node:assert/strict";
import { after, test } from "node:test";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL es obligatoria para las pruebas PostgreSQL.");
}

const pool = new Pool({ connectionString });

after(async () => {
  await pool.end();
});

async function expectDatabaseError(sql: string, code: string) {
  try {
    await pool.query(sql);
    assert.fail(`La operación debía fallar con PostgreSQL ${code}.`);
  } catch (error) {
    assert.equal((error as { code?: string }).code, code);
  }
}

test("las migraciones y el seed idempotente crean solo datos ficticios", async () => {
  const counts = await pool.query<{
    studies: number;
    clients: number;
    cases: number;
    participations: number;
  }>(`
    SELECT
      (SELECT count(*)::int FROM studies) AS studies,
      (SELECT count(*)::int FROM clients) AS clients,
      (SELECT count(*)::int FROM legal_cases) AS cases,
      (SELECT count(*)::int FROM case_participations) AS participations
  `);

  assert.deepEqual(counts.rows[0], {
    studies: 2,
    clients: 2,
    cases: 1,
    participations: 1,
  });

  const clients = await pool.query<{
    display_name: string;
    rut_normalized: string;
    email: string;
  }>("SELECT display_name, rut_normalized, email FROM clients");

  for (const client of clients.rows) {
    assert.match(client.display_name, /Ficticio/);
    assert.match(client.rut_normalized, /^RUT-FICTICIO-/);
    assert.match(client.email, /@example\.test$/);
  }
});

test("las relaciones compuestas impiden cruzar estudios", async () => {
  await expectDatabaseError(
    `
      INSERT INTO legal_cases (
        id, study_id, client_id, matter_id, nature_id, status_id, stage_id,
        internal_code, title, lifecycle_status, created_at, updated_at
      )
      SELECT
        '30000000-0000-4000-8000-000000000001',
        '10000000-0000-4000-8000-000000000001',
        '20000000-0000-4000-8000-000000000301',
        (SELECT id FROM catalog_values WHERE study_id = '10000000-0000-4000-8000-000000000001' AND type = 'MATTER' LIMIT 1),
        (SELECT id FROM catalog_values WHERE study_id = '10000000-0000-4000-8000-000000000001' AND type = 'CASE_NATURE' LIMIT 1),
        (SELECT id FROM catalog_values WHERE study_id = '10000000-0000-4000-8000-000000000001' AND type = 'CASE_STATUS' LIMIT 1),
        (SELECT id FROM catalog_values WHERE study_id = '10000000-0000-4000-8000-000000000001' AND type = 'STAGE' LIMIT 1),
        'CRUCE-INVALIDO', 'Cruce inválido', 'ACTIVE', now(), now()
    `,
    "23503",
  );

  const result = await pool.query<{ count: number }>(
    "SELECT count(*)::int AS count FROM legal_cases",
  );
  assert.equal(result.rows[0]?.count, 1);
});

test("solo permite un responsable principal vigente por caso", async () => {
  await expectDatabaseError(
    `
      INSERT INTO case_participations (
        id, study_id, case_id, participant_id, role_id, assigned_by_id,
        started_at, "primary"
      )
      SELECT
        '30000000-0000-4000-8000-000000000002',
        '10000000-0000-4000-8000-000000000001',
        '10000000-0000-4000-8000-000000000401',
        '10000000-0000-4000-8000-000000000201',
        id,
        '10000000-0000-4000-8000-000000000201',
        now(), true
      FROM catalog_values
      WHERE study_id = '10000000-0000-4000-8000-000000000001'
        AND type = 'PARTICIPATION_ROLE'
        AND code = 'PRIMARY'
    `,
    "23505",
  );
});

test("valida montos y periodos laborales", async () => {
  await expectDatabaseError(
    "UPDATE labor_case_data SET amount = -1 WHERE id = '10000000-0000-4000-8000-000000000701'",
    "23514",
  );
  await expectDatabaseError(
    `
      UPDATE labor_case_data
      SET employment_start_date = DATE '2026-11-01', dismissal_date = DATE '2026-10-01'
      WHERE id = '10000000-0000-4000-8000-000000000701'
    `,
    "23514",
  );
});

test("exige metadatos completos para cambios de ciclo de vida", async () => {
  await expectDatabaseError(
    `
      UPDATE clients
      SET status = 'INACTIVE', status_changed_at = now()
      WHERE id = '10000000-0000-4000-8000-000000000301'
    `,
    "23514",
  );

  await pool.query(`
    UPDATE clients
    SET status = 'INACTIVE',
        status_changed_at = now(),
        status_changed_by_id = '10000000-0000-4000-8000-000000000201',
        status_reason = 'Desactivación ficticia de prueba'
    WHERE id = '10000000-0000-4000-8000-000000000301'
  `);
  await pool.query(`
    UPDATE clients
    SET status = 'ACTIVE',
        status_changed_at = now(),
        status_changed_by_id = '10000000-0000-4000-8000-000000000201',
        status_reason = 'Reactivación ficticia de prueba'
    WHERE id = '10000000-0000-4000-8000-000000000301'
  `);

  await pool.query(`
    UPDATE legal_cases
    SET lifecycle_status = 'ARCHIVED',
        lifecycle_changed_at = now(),
        lifecycle_changed_by_id = '10000000-0000-4000-8000-000000000201',
        lifecycle_reason = 'Archivo ficticio de prueba'
    WHERE id = '10000000-0000-4000-8000-000000000401'
  `);
  await pool.query(`
    UPDATE legal_cases
    SET lifecycle_status = 'ACTIVE',
        lifecycle_changed_at = now(),
        lifecycle_changed_by_id = '10000000-0000-4000-8000-000000000201',
        lifecycle_reason = 'Reapertura ficticia de prueba'
    WHERE id = '10000000-0000-4000-8000-000000000401'
  `);

  const lifecycle = await pool.query<{
    client_status: string;
    case_status: string;
  }>(`
    SELECT
      (SELECT status::text FROM clients WHERE id = '10000000-0000-4000-8000-000000000301') AS client_status,
      (SELECT lifecycle_status::text FROM legal_cases WHERE id = '10000000-0000-4000-8000-000000000401') AS case_status
  `);
  assert.deepEqual(lifecycle.rows[0], {
    client_status: "ACTIVE",
    case_status: "ACTIVE",
  });
});

test("conserva antecedentes judiciales opcionales y fechas manuales", async () => {
  const result = await pool.query<{
    court: string | null;
    rit: string | null;
    judicial_role: string | null;
    manual_dates: number;
  }>(`
    SELECT court, rit, judicial_role,
      (SELECT count(*)::int FROM relevant_dates WHERE case_id = legal_cases.id) AS manual_dates
    FROM legal_cases
    WHERE id = '10000000-0000-4000-8000-000000000401'
  `);

  assert.deepEqual(result.rows[0], {
    court: null,
    rit: null,
    judicial_role: null,
    manual_dates: 1,
  });
});

test("la integridad referencial evita eliminar un cliente con casos", async () => {
  await expectDatabaseError(
    "DELETE FROM clients WHERE id = '10000000-0000-4000-8000-000000000301'",
    "23503",
  );
});
