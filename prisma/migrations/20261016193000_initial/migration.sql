-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('DRAFT', 'ACTIVE', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CatalogType" AS ENUM ('MATTER', 'STAGE', 'PRIORITY', 'MILESTONE_TYPE');

-- CreateTable
CREATE TABLE "studies" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "study_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "study_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "display_name" TEXT NOT NULL,
    "access_identifier" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL,
    "study_id" UUID NOT NULL,
    "display_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "status" "ClientStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog_values" (
    "id" UUID NOT NULL,
    "study_id" UUID NOT NULL,
    "type" "CatalogType" NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "catalog_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_cases" (
    "id" UUID NOT NULL,
    "study_id" UUID NOT NULL,
    "client_id" UUID NOT NULL,
    "matter_id" UUID NOT NULL,
    "stage_id" UUID NOT NULL,
    "internal_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "CaseStatus" NOT NULL DEFAULT 'DRAFT',
    "court" TEXT,
    "rit_rol" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "legal_cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" UUID NOT NULL,
    "case_id" UUID NOT NULL,
    "responsible_id" UUID NOT NULL,
    "assigned_by_id" UUID NOT NULL,
    "started_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMPTZ(3),
    "primary" BOOLEAN NOT NULL DEFAULT true,
    "reason" TEXT,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milestones" (
    "id" UUID NOT NULL,
    "case_id" UUID NOT NULL,
    "type_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "occurs_at" TIMESTAMPTZ(3) NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'America/Santiago',
    "completed_at" TIMESTAMPTZ(3),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_events" (
    "id" UUID NOT NULL,
    "study_id" UUID NOT NULL,
    "case_id" UUID,
    "actor_id" UUID,
    "entity_type" TEXT NOT NULL,
    "entity_id" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "protected_value" JSONB,
    "occurred_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "roles_study_id_active_idx" ON "roles"("study_id", "active");

-- CreateIndex
CREATE UNIQUE INDEX "roles_study_id_name_key" ON "roles"("study_id", "name");

-- CreateIndex
CREATE INDEX "users_study_id_status_idx" ON "users"("study_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "users_study_id_access_identifier_key" ON "users"("study_id", "access_identifier");

-- CreateIndex
CREATE INDEX "clients_study_id_display_name_idx" ON "clients"("study_id", "display_name");

-- CreateIndex
CREATE INDEX "clients_study_id_email_idx" ON "clients"("study_id", "email");

-- CreateIndex
CREATE INDEX "catalog_values_study_id_type_active_idx" ON "catalog_values"("study_id", "type", "active");

-- CreateIndex
CREATE UNIQUE INDEX "catalog_values_study_id_type_code_key" ON "catalog_values"("study_id", "type", "code");

-- CreateIndex
CREATE INDEX "legal_cases_study_id_status_stage_id_idx" ON "legal_cases"("study_id", "status", "stage_id");

-- CreateIndex
CREATE INDEX "legal_cases_client_id_idx" ON "legal_cases"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "legal_cases_study_id_internal_code_key" ON "legal_cases"("study_id", "internal_code");

-- CreateIndex
CREATE INDEX "assignments_case_id_ended_at_idx" ON "assignments"("case_id", "ended_at");

-- CreateIndex
CREATE INDEX "assignments_responsible_id_ended_at_idx" ON "assignments"("responsible_id", "ended_at");

-- CreateIndex
CREATE INDEX "milestones_case_id_occurs_at_idx" ON "milestones"("case_id", "occurs_at");

-- CreateIndex
CREATE INDEX "audit_events_study_id_occurred_at_idx" ON "audit_events"("study_id", "occurred_at");

-- CreateIndex
CREATE INDEX "audit_events_case_id_occurred_at_idx" ON "audit_events"("case_id", "occurred_at");

-- CreateIndex
CREATE INDEX "audit_events_entity_type_entity_id_occurred_at_idx" ON "audit_events"("entity_type", "entity_id", "occurred_at");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog_values" ADD CONSTRAINT "catalog_values_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_cases" ADD CONSTRAINT "legal_cases_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_cases" ADD CONSTRAINT "legal_cases_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_cases" ADD CONSTRAINT "legal_cases_matter_id_fkey" FOREIGN KEY ("matter_id") REFERENCES "catalog_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_cases" ADD CONSTRAINT "legal_cases_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "catalog_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "legal_cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_assigned_by_id_fkey" FOREIGN KEY ("assigned_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "legal_cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "catalog_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "legal_cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Reglas que Prisma no expresa como índices parciales o restricciones CHECK.
CREATE UNIQUE INDEX "assignments_one_current_primary_per_case"
ON "assignments"("case_id")
WHERE "primary" = true AND "ended_at" IS NULL;

ALTER TABLE "assignments"
ADD CONSTRAINT "assignments_valid_period"
CHECK ("ended_at" IS NULL OR "ended_at" > "started_at");
