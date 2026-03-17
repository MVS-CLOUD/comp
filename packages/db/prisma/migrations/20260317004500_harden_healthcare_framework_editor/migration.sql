-- AlterTable
ALTER TABLE "FrameworkEditorFramework"
ADD COLUMN "slug" TEXT,
ADD COLUMN "catalog" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN "sourceVersion" TEXT,
ADD COLUMN "sourceBundleHash" TEXT;

-- AlterTable
ALTER TABLE "FrameworkEditorRequirement"
ADD COLUMN "sourceMetadata" JSONB;

-- AlterTable
ALTER TABLE "FrameworkEditorPolicyTemplate"
ADD COLUMN "sourceMetadata" JSONB;

-- AlterTable
ALTER TABLE "FrameworkEditorTaskTemplate"
ADD COLUMN "sourceMetadata" JSONB;

-- AlterTable
ALTER TABLE "FrameworkEditorControlTemplate"
ADD COLUMN "sourceMetadata" JSONB;

-- Backfill
UPDATE "FrameworkEditorFramework"
SET "slug" = lower(regexp_replace(coalesce("name", 'framework'), '[^a-zA-Z0-9]+', '-', 'g')) || '-' || right("id", 6)
WHERE "slug" IS NULL;

-- AlterTable
ALTER TABLE "FrameworkEditorFramework"
ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FrameworkEditorFramework_slug_key" ON "FrameworkEditorFramework"("slug");

-- CreateIndex
CREATE INDEX "FrameworkEditorFramework_catalog_idx" ON "FrameworkEditorFramework"("catalog");
