-- Esta migración reemplaza el esquema físico inicial antes de habilitar datos reales.
-- La base de preproducción debe estar vacía de registros operativos; cualquier
-- dato ficticio se recreará posteriormente mediante un seed versionado.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "clients")
    OR EXISTS (SELECT 1 FROM "catalog_values")
    OR EXISTS (SELECT 1 FROM "legal_cases")
    OR EXISTS (SELECT 1 FROM "assignments")
    OR EXISTS (SELECT 1 FROM "milestones")
    OR EXISTS (SELECT 1 FROM "audit_events") THEN
    RAISE EXCEPTION 'data_model_v2 requires an empty preproduction database; export and reset fictitious data before migrating';
  END IF;
END $$;

-- Stable technical enums. Variable business decisions remain in catalog_values.
CREATE TYPE "ClientType" AS ENUM ('PERSON', 'ORGANIZATION');
CREATE TYPE "CaseLifecycleStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

ALTER TYPE "CatalogType" RENAME TO "CatalogType_initial";
CREATE TYPE "CatalogType" AS ENUM (
  'MATTER',
  'CASE_NATURE',
  'CASE_STATUS',
  'STAGE',
  'PROCEDURE',
  'DATE_TYPE',
  'PARTICIPATION_ROLE',
  'DISMISSAL_GROUND'
);
ALTER TABLE "catalog_values"
  ALTER COLUMN "type" TYPE "CatalogType"
  USING ("type"::text::"CatalogType");
DROP TYPE "CatalogType_initial";

-- Remove initial structures that have no persisted operational data.
DROP TABLE "assignments";
DROP TABLE "milestones";

-- Composite identities support database-level isolation by study.
CREATE UNIQUE INDEX "roles_id_study_id_key" ON "roles"("id", "study_id");
CREATE UNIQUE INDEX "users_id_study_id_key" ON "users"("id", "study_id");
CREATE UNIQUE INDEX "clients_id_study_id_key" ON "clients"("id", "study_id");
CREATE UNIQUE INDEX "catalog_values_id_study_id_key" ON "catalog_values"("id", "study_id");

-- Users can only reference a role from the same study.
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";
ALTER TABLE "users"
  ADD CONSTRAINT "users_role_id_study_id_fkey"
  FOREIGN KEY ("role_id", "study_id")
  REFERENCES "roles"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- Client identification and reversible lifecycle metadata.
ALTER TABLE "clients"
  ADD COLUMN "type" "ClientType" NOT NULL DEFAULT 'PERSON',
  ADD COLUMN "rut_normalized" TEXT NOT NULL,
  ADD COLUMN "origin_matter" TEXT NOT NULL,
  ADD COLUMN "status_changed_at" TIMESTAMPTZ(3),
  ADD COLUMN "status_changed_by_id" UUID,
  ADD COLUMN "status_reason" TEXT,
  ALTER COLUMN "phone" SET NOT NULL;

CREATE INDEX "clients_study_id_rut_normalized_idx"
  ON "clients"("study_id", "rut_normalized");
CREATE INDEX "clients_study_id_status_idx"
  ON "clients"("study_id", "status");

ALTER TABLE "clients"
  ADD CONSTRAINT "clients_status_actor_study_fkey"
  FOREIGN KEY ("status_changed_by_id", "study_id")
  REFERENCES "users"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "clients"
  ADD CONSTRAINT "clients_lifecycle_metadata_complete"
  CHECK (
    ("status_changed_at" IS NULL AND "status_changed_by_id" IS NULL AND "status_reason" IS NULL)
    OR
    ("status_changed_at" IS NOT NULL AND "status_changed_by_id" IS NOT NULL AND length(trim("status_reason")) > 0)
  );

-- General labor case with configurable matter, nature, business status and stage.
ALTER TABLE "legal_cases" DROP CONSTRAINT "legal_cases_client_id_fkey";
ALTER TABLE "legal_cases" DROP CONSTRAINT "legal_cases_matter_id_fkey";
ALTER TABLE "legal_cases" DROP CONSTRAINT "legal_cases_stage_id_fkey";
DROP INDEX "legal_cases_study_id_status_stage_id_idx";
DROP INDEX "legal_cases_client_id_idx";

ALTER TABLE "legal_cases" DROP COLUMN "status";
ALTER TABLE "legal_cases" RENAME COLUMN "rit_rol" TO "judicial_role";

ALTER TABLE "legal_cases"
  ADD COLUMN "nature_id" UUID NOT NULL,
  ADD COLUMN "status_id" UUID NOT NULL,
  ADD COLUMN "procedure_id" UUID,
  ADD COLUMN "lifecycle_status" "CaseLifecycleStatus" NOT NULL DEFAULT 'DRAFT',
  ADD COLUMN "rit" TEXT,
  ADD COLUMN "lifecycle_changed_at" TIMESTAMPTZ(3),
  ADD COLUMN "lifecycle_changed_by_id" UUID,
  ADD COLUMN "lifecycle_reason" TEXT;

DROP TYPE "CaseStatus";

CREATE UNIQUE INDEX "legal_cases_id_study_id_key"
  ON "legal_cases"("id", "study_id");
CREATE INDEX "legal_cases_study_id_lifecycle_status_stage_id_idx"
  ON "legal_cases"("study_id", "lifecycle_status", "stage_id");
CREATE INDEX "legal_cases_study_id_status_id_stage_id_idx"
  ON "legal_cases"("study_id", "status_id", "stage_id");
CREATE INDEX "legal_cases_client_id_study_id_idx"
  ON "legal_cases"("client_id", "study_id");

ALTER TABLE "legal_cases"
  ADD CONSTRAINT "legal_cases_client_id_study_id_fkey"
  FOREIGN KEY ("client_id", "study_id")
  REFERENCES "clients"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "legal_cases_matter_id_study_id_fkey"
  FOREIGN KEY ("matter_id", "study_id")
  REFERENCES "catalog_values"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "legal_cases_nature_id_study_id_fkey"
  FOREIGN KEY ("nature_id", "study_id")
  REFERENCES "catalog_values"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "legal_cases_status_id_study_id_fkey"
  FOREIGN KEY ("status_id", "study_id")
  REFERENCES "catalog_values"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "legal_cases_stage_id_study_id_fkey"
  FOREIGN KEY ("stage_id", "study_id")
  REFERENCES "catalog_values"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "legal_cases_procedure_id_study_id_fkey"
  FOREIGN KEY ("procedure_id", "study_id")
  REFERENCES "catalog_values"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "legal_cases_lifecycle_actor_study_fkey"
  FOREIGN KEY ("lifecycle_changed_by_id", "study_id")
  REFERENCES "users"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "legal_cases"
  ADD CONSTRAINT "legal_cases_lifecycle_metadata_complete"
  CHECK (
    ("lifecycle_changed_at" IS NULL AND "lifecycle_changed_by_id" IS NULL AND "lifecycle_reason" IS NULL)
    OR
    ("lifecycle_changed_at" IS NOT NULL AND "lifecycle_changed_by_id" IS NOT NULL AND length(trim("lifecycle_reason")) > 0)
  );

-- Conditional labor data belong to the case, never to the client.
CREATE TABLE "labor_case_data" (
  "id" UUID NOT NULL,
  "study_id" UUID NOT NULL,
  "case_id" UUID NOT NULL,
  "employer_or_counterparty" TEXT,
  "employment_start_date" DATE,
  "dismissal_date" DATE,
  "dismissal_ground_id" UUID,
  "collective_organization" TEXT,
  "collective_action_type" TEXT,
  "store_or_branch" TEXT,
  "severance_details" TEXT,
  "amount" DECIMAL(14,2),
  "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(3) NOT NULL,

  CONSTRAINT "labor_case_data_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "labor_case_data_amount_nonnegative" CHECK ("amount" IS NULL OR "amount" >= 0),
  CONSTRAINT "labor_case_data_valid_employment_period" CHECK (
    "employment_start_date" IS NULL
    OR "dismissal_date" IS NULL
    OR "dismissal_date" >= "employment_start_date"
  )
);

CREATE UNIQUE INDEX "labor_case_data_id_study_id_key"
  ON "labor_case_data"("id", "study_id");
CREATE UNIQUE INDEX "labor_case_data_case_id_study_id_key"
  ON "labor_case_data"("case_id", "study_id");
CREATE INDEX "labor_case_data_study_id_dismissal_date_idx"
  ON "labor_case_data"("study_id", "dismissal_date");

ALTER TABLE "labor_case_data"
  ADD CONSTRAINT "labor_case_data_study_id_fkey"
  FOREIGN KEY ("study_id") REFERENCES "studies"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "labor_case_data_case_id_study_id_fkey"
  FOREIGN KEY ("case_id", "study_id") REFERENCES "legal_cases"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "labor_case_data_dismissal_ground_study_fkey"
  FOREIGN KEY ("dismissal_ground_id", "study_id") REFERENCES "catalog_values"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- Current and historical responsibility or support participation.
CREATE TABLE "case_participations" (
  "id" UUID NOT NULL,
  "study_id" UUID NOT NULL,
  "case_id" UUID NOT NULL,
  "participant_id" UUID NOT NULL,
  "role_id" UUID NOT NULL,
  "assigned_by_id" UUID NOT NULL,
  "started_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ended_at" TIMESTAMPTZ(3),
  "primary" BOOLEAN NOT NULL DEFAULT false,
  "reason" TEXT,

  CONSTRAINT "case_participations_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "case_participations_valid_period" CHECK (
    "ended_at" IS NULL OR "ended_at" > "started_at"
  )
);

CREATE UNIQUE INDEX "case_participations_id_study_id_key"
  ON "case_participations"("id", "study_id");
CREATE UNIQUE INDEX "case_participations_one_current_primary_per_case"
  ON "case_participations"("case_id", "study_id")
  WHERE "primary" = true AND "ended_at" IS NULL;
CREATE INDEX "case_participations_case_id_study_id_ended_at_idx"
  ON "case_participations"("case_id", "study_id", "ended_at");
CREATE INDEX "case_participations_participant_id_study_id_ended_at_idx"
  ON "case_participations"("participant_id", "study_id", "ended_at");

ALTER TABLE "case_participations"
  ADD CONSTRAINT "case_participations_study_id_fkey"
  FOREIGN KEY ("study_id") REFERENCES "studies"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "case_participations_case_id_study_id_fkey"
  FOREIGN KEY ("case_id", "study_id") REFERENCES "legal_cases"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "case_participations_participant_study_fkey"
  FOREIGN KEY ("participant_id", "study_id") REFERENCES "users"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "case_participations_role_study_fkey"
  FOREIGN KEY ("role_id", "study_id") REFERENCES "catalog_values"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "case_participations_actor_study_fkey"
  FOREIGN KEY ("assigned_by_id", "study_id") REFERENCES "users"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- Manual dates and references; no legal deadline calculation is stored.
CREATE TABLE "relevant_dates" (
  "id" UUID NOT NULL,
  "study_id" UUID NOT NULL,
  "case_id" UUID NOT NULL,
  "type_id" UUID NOT NULL,
  "responsible_id" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "occurs_at" TIMESTAMPTZ(3) NOT NULL,
  "timezone" TEXT NOT NULL DEFAULT 'America/Santiago',
  "source" TEXT,
  "notes" TEXT,
  "verified_at" TIMESTAMPTZ(3),
  "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(3) NOT NULL,

  CONSTRAINT "relevant_dates_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "relevant_dates_id_study_id_key"
  ON "relevant_dates"("id", "study_id");
CREATE INDEX "relevant_dates_case_id_study_id_occurs_at_idx"
  ON "relevant_dates"("case_id", "study_id", "occurs_at");
CREATE INDEX "relevant_dates_responsible_id_study_id_occurs_at_idx"
  ON "relevant_dates"("responsible_id", "study_id", "occurs_at");

ALTER TABLE "relevant_dates"
  ADD CONSTRAINT "relevant_dates_study_id_fkey"
  FOREIGN KEY ("study_id") REFERENCES "studies"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "relevant_dates_case_id_study_id_fkey"
  FOREIGN KEY ("case_id", "study_id") REFERENCES "legal_cases"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "relevant_dates_type_study_fkey"
  FOREIGN KEY ("type_id", "study_id") REFERENCES "catalog_values"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "relevant_dates_responsible_study_fkey"
  FOREIGN KEY ("responsible_id", "study_id") REFERENCES "users"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- Audit relations also enforce study isolation.
ALTER TABLE "audit_events" DROP CONSTRAINT "audit_events_case_id_fkey";
ALTER TABLE "audit_events" DROP CONSTRAINT "audit_events_actor_id_fkey";
DROP INDEX "audit_events_case_id_occurred_at_idx";

ALTER TABLE "audit_events" ADD COLUMN "reason" TEXT;
CREATE INDEX "audit_events_case_id_study_id_occurred_at_idx"
  ON "audit_events"("case_id", "study_id", "occurred_at");

ALTER TABLE "audit_events"
  ADD CONSTRAINT "audit_events_case_id_study_id_fkey"
  FOREIGN KEY ("case_id", "study_id") REFERENCES "legal_cases"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "audit_events_actor_id_study_id_fkey"
  FOREIGN KEY ("actor_id", "study_id") REFERENCES "users"("id", "study_id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
