CREATE TYPE "AuthorizationDocumentStatus" AS ENUM ('PENDING_SIGNATURE', 'DELIVERED', 'SIGNED', 'REVOKED');

CREATE TABLE "authorization_documents" (
    "id" UUID NOT NULL,
    "study_id" UUID NOT NULL,
    "client_id" UUID NOT NULL,
    "generated_by_id" UUID NOT NULL,
    "updated_by_id" UUID,
    "folio" TEXT NOT NULL,
    "template_version" TEXT NOT NULL,
    "status" "AuthorizationDocumentStatus" NOT NULL DEFAULT 'PENDING_SIGNATURE',
    "snapshot" JSONB NOT NULL,
    "delivered_at" TIMESTAMPTZ(3),
    "signed_at" TIMESTAMPTZ(3),
    "revoked_at" TIMESTAMPTZ(3),
    "archive_reference" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    CONSTRAINT "authorization_documents_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "authorization_documents_study_id_folio_key" ON "authorization_documents"("study_id", "folio");
CREATE UNIQUE INDEX "authorization_documents_id_study_id_key" ON "authorization_documents"("id", "study_id");
CREATE INDEX "authorization_documents_client_id_study_id_created_at_idx" ON "authorization_documents"("client_id", "study_id", "created_at");
CREATE INDEX "authorization_documents_study_id_status_idx" ON "authorization_documents"("study_id", "status");

ALTER TABLE "authorization_documents" ADD CONSTRAINT "authorization_documents_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "authorization_documents" ADD CONSTRAINT "authorization_documents_client_id_study_id_fkey" FOREIGN KEY ("client_id", "study_id") REFERENCES "clients"("id", "study_id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "authorization_documents" ADD CONSTRAINT "authorization_documents_generated_by_id_study_id_fkey" FOREIGN KEY ("generated_by_id", "study_id") REFERENCES "users"("id", "study_id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "authorization_documents" ADD CONSTRAINT "authorization_documents_updated_by_id_study_id_fkey" FOREIGN KEY ("updated_by_id", "study_id") REFERENCES "users"("id", "study_id") ON DELETE RESTRICT ON UPDATE CASCADE;
