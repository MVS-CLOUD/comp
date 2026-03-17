-- CreateTable
CREATE TABLE "ReleaseDefinitionCheckBinding" (
    "id" TEXT NOT NULL DEFAULT generate_prefixed_cuid('rls_cb'::text),
    "releaseDefinitionId" TEXT NOT NULL,
    "connectionId" TEXT NOT NULL,
    "checkId" TEXT NOT NULL,
    "variableOverrides" JSONB,
    "freshnessHours" INTEGER NOT NULL DEFAULT 24,
    "blocking" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReleaseDefinitionCheckBinding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReleaseDefinitionCheckBinding_releaseDefinitionId_idx" ON "ReleaseDefinitionCheckBinding"("releaseDefinitionId");

-- CreateIndex
CREATE INDEX "ReleaseDefinitionCheckBinding_connectionId_idx" ON "ReleaseDefinitionCheckBinding"("connectionId");

-- CreateIndex
CREATE UNIQUE INDEX "ReleaseDefinitionCheckBinding_releaseDefinitionId_checkId_key" ON "ReleaseDefinitionCheckBinding"("releaseDefinitionId", "checkId");

-- AddForeignKey
ALTER TABLE "ReleaseDefinitionCheckBinding"
ADD CONSTRAINT "ReleaseDefinitionCheckBinding_releaseDefinitionId_fkey"
FOREIGN KEY ("releaseDefinitionId") REFERENCES "ReleaseDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseDefinitionCheckBinding"
ADD CONSTRAINT "ReleaseDefinitionCheckBinding_connectionId_fkey"
FOREIGN KEY ("connectionId") REFERENCES "IntegrationConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
