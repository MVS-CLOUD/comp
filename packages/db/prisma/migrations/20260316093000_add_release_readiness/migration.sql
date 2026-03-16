-- CreateEnum
CREATE TYPE "ReleaseSubjectType" AS ENUM ('application', 'api', 'service', 'integration', 'environment');

-- CreateEnum
CREATE TYPE "EvidenceClass" AS ENUM ('deterministic', 'ai_assisted', 'browser_collected', 'manual_attested', 'external_validated');

-- CreateEnum
CREATE TYPE "ReleaseRunStatus" AS ENUM ('draft', 'running', 'awaiting_approvals', 'completed', 'failed', 'cancelled');

-- CreateEnum
CREATE TYPE "ReleaseGateDecisionStatus" AS ENUM ('pass', 'fail', 'conditional');

-- CreateEnum
CREATE TYPE "ManualAttestationStatus" AS ENUM ('pending', 'approved', 'rejected', 'expired');

-- CreateEnum
CREATE TYPE "ExternalValidationType" AS ENUM ('onc_acb', 'onc_atl', 'partner', 'legal', 'compliance', 'security');

-- CreateEnum
CREATE TYPE "ExternalValidationStatus" AS ENUM ('pending', 'active', 'expired', 'rejected');

-- AlterEnum
ALTER TYPE "Frequency" ADD VALUE IF NOT EXISTS 'ongoing';
ALTER TYPE "Frequency" ADD VALUE IF NOT EXISTS 'one_time';
ALTER TYPE "Frequency" ADD VALUE IF NOT EXISTS 'semiannual';

-- AlterEnum
ALTER TYPE "TaskFrequency" ADD VALUE IF NOT EXISTS 'ongoing';
ALTER TYPE "TaskFrequency" ADD VALUE IF NOT EXISTS 'one_time';
ALTER TYPE "TaskFrequency" ADD VALUE IF NOT EXISTS 'semiannual';

-- CreateTable
CREATE TABLE "ReleaseSubject" (
    "id" TEXT NOT NULL DEFAULT generate_prefixed_cuid('rls_sb'::text),
    "organizationId" TEXT NOT NULL,
    "type" "ReleaseSubjectType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "repositoryUrl" TEXT,
    "environment" TEXT,
    "serviceBaseUrl" TEXT,
    "fhirBaseUrl" TEXT,
    "partnerProfile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReleaseSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseDefinition" (
    "id" TEXT NOT NULL DEFAULT generate_prefixed_cuid('rls_df'::text),
    "organizationId" TEXT NOT NULL,
    "releaseSubjectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "requiredFrameworkIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "requiredCheckIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "requiredApprovalKeys" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "requiredExternalValidationKeys" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReleaseDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseRun" (
    "id" TEXT NOT NULL DEFAULT generate_prefixed_cuid('rls_rn'::text),
    "organizationId" TEXT NOT NULL,
    "releaseDefinitionId" TEXT NOT NULL,
    "releaseSubjectId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "commitSha" TEXT,
    "buildId" TEXT,
    "status" "ReleaseRunStatus" NOT NULL DEFAULT 'draft',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReleaseRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseGateDecision" (
    "id" TEXT NOT NULL DEFAULT generate_prefixed_cuid('rls_gd'::text),
    "releaseRunId" TEXT NOT NULL,
    "decision" "ReleaseGateDecisionStatus" NOT NULL,
    "blockingReasons" JSONB,
    "summary" TEXT,
    "evidenceHash" TEXT,
    "decidedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReleaseGateDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManualAttestation" (
    "id" TEXT NOT NULL DEFAULT generate_prefixed_cuid('rls_ma'::text),
    "organizationId" TEXT NOT NULL,
    "releaseRunId" TEXT NOT NULL,
    "requirementId" TEXT,
    "approvalKey" TEXT NOT NULL,
    "approverId" TEXT,
    "title" TEXT NOT NULL,
    "status" "ManualAttestationStatus" NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "expiresAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManualAttestation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalValidation" (
    "id" TEXT NOT NULL DEFAULT generate_prefixed_cuid('rls_ev'::text),
    "organizationId" TEXT NOT NULL,
    "releaseRunId" TEXT NOT NULL,
    "validationKey" TEXT NOT NULL,
    "type" "ExternalValidationType" NOT NULL,
    "status" "ExternalValidationStatus" NOT NULL DEFAULT 'pending',
    "title" TEXT NOT NULL,
    "authority" TEXT,
    "referenceId" TEXT,
    "artifactUrl" TEXT,
    "validFrom" TIMESTAMP(3),
    "validTo" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalValidation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceArtifact" (
    "id" TEXT NOT NULL DEFAULT generate_prefixed_cuid('rls_ea'::text),
    "organizationId" TEXT NOT NULL,
    "releaseSubjectId" TEXT,
    "releaseRunId" TEXT,
    "title" TEXT NOT NULL,
    "artifactType" TEXT NOT NULL,
    "evidenceClass" "EvidenceClass" NOT NULL,
    "storageUrl" TEXT,
    "sha256" TEXT,
    "gateEligible" BOOLEAN NOT NULL DEFAULT false,
    "collectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvidenceArtifact_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Task" ADD COLUMN "releaseRunId" TEXT;

-- AlterTable
ALTER TABLE "Finding" ADD COLUMN "releaseRunId" TEXT;

-- AlterTable
ALTER TABLE "EvidenceSubmission"
ADD COLUMN "artifactType" TEXT,
ADD COLUMN "evidenceClass" "EvidenceClass" DEFAULT 'manual_attested',
ADD COLUMN "gateEligible" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "expiresAt" TIMESTAMP(3),
ADD COLUMN "releaseRunId" TEXT;

-- AlterTable
ALTER TABLE "IntegrationCheckRun" ADD COLUMN "releaseRunId" TEXT;

-- AlterTable
ALTER TABLE "IntegrationCheckResult"
ADD COLUMN "gateEligible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "evidenceHash" TEXT,
ADD COLUMN "standardReference" TEXT,
ADD COLUMN "validatorName" TEXT;

-- AlterTable
ALTER TABLE "BrowserAutomationRun"
ADD COLUMN "evidenceClass" "EvidenceClass" DEFAULT 'browser_collected',
ADD COLUMN "gateEligible" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "ReleaseSubject_organizationId_type_idx" ON "ReleaseSubject"("organizationId", "type");

-- CreateIndex
CREATE INDEX "ReleaseDefinition_organizationId_releaseSubjectId_idx" ON "ReleaseDefinition"("organizationId", "releaseSubjectId");

-- CreateIndex
CREATE INDEX "ReleaseRun_organizationId_status_idx" ON "ReleaseRun"("organizationId", "status");

-- CreateIndex
CREATE INDEX "ReleaseRun_releaseDefinitionId_createdAt_idx" ON "ReleaseRun"("releaseDefinitionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ReleaseGateDecision_releaseRunId_key" ON "ReleaseGateDecision"("releaseRunId");

-- CreateIndex
CREATE INDEX "ManualAttestation_organizationId_status_idx" ON "ManualAttestation"("organizationId", "status");
CREATE INDEX "ManualAttestation_releaseRunId_idx" ON "ManualAttestation"("releaseRunId");
CREATE UNIQUE INDEX "ManualAttestation_releaseRunId_approvalKey_key" ON "ManualAttestation"("releaseRunId", "approvalKey");

-- CreateIndex
CREATE INDEX "ExternalValidation_organizationId_type_status_idx" ON "ExternalValidation"("organizationId", "type", "status");
CREATE INDEX "ExternalValidation_releaseRunId_idx" ON "ExternalValidation"("releaseRunId");
CREATE UNIQUE INDEX "ExternalValidation_releaseRunId_validationKey_key" ON "ExternalValidation"("releaseRunId", "validationKey");

-- CreateIndex
CREATE INDEX "EvidenceArtifact_organizationId_evidenceClass_idx" ON "EvidenceArtifact"("organizationId", "evidenceClass");
CREATE INDEX "EvidenceArtifact_releaseRunId_idx" ON "EvidenceArtifact"("releaseRunId");

-- AddForeignKey
ALTER TABLE "ReleaseSubject" ADD CONSTRAINT "ReleaseSubject_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReleaseDefinition" ADD CONSTRAINT "ReleaseDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReleaseDefinition" ADD CONSTRAINT "ReleaseDefinition_releaseSubjectId_fkey" FOREIGN KEY ("releaseSubjectId") REFERENCES "ReleaseSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReleaseRun" ADD CONSTRAINT "ReleaseRun_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReleaseRun" ADD CONSTRAINT "ReleaseRun_releaseDefinitionId_fkey" FOREIGN KEY ("releaseDefinitionId") REFERENCES "ReleaseDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReleaseRun" ADD CONSTRAINT "ReleaseRun_releaseSubjectId_fkey" FOREIGN KEY ("releaseSubjectId") REFERENCES "ReleaseSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReleaseGateDecision" ADD CONSTRAINT "ReleaseGateDecision_releaseRunId_fkey" FOREIGN KEY ("releaseRunId") REFERENCES "ReleaseRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ManualAttestation" ADD CONSTRAINT "ManualAttestation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ManualAttestation" ADD CONSTRAINT "ManualAttestation_releaseRunId_fkey" FOREIGN KEY ("releaseRunId") REFERENCES "ReleaseRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ManualAttestation" ADD CONSTRAINT "ManualAttestation_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "FrameworkEditorRequirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ManualAttestation" ADD CONSTRAINT "ManualAttestation_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ExternalValidation" ADD CONSTRAINT "ExternalValidation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ExternalValidation" ADD CONSTRAINT "ExternalValidation_releaseRunId_fkey" FOREIGN KEY ("releaseRunId") REFERENCES "ReleaseRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EvidenceArtifact" ADD CONSTRAINT "EvidenceArtifact_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EvidenceArtifact" ADD CONSTRAINT "EvidenceArtifact_releaseSubjectId_fkey" FOREIGN KEY ("releaseSubjectId") REFERENCES "ReleaseSubject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "EvidenceArtifact" ADD CONSTRAINT "EvidenceArtifact_releaseRunId_fkey" FOREIGN KEY ("releaseRunId") REFERENCES "ReleaseRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_releaseRunId_fkey" FOREIGN KEY ("releaseRunId") REFERENCES "ReleaseRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Finding" ADD CONSTRAINT "Finding_releaseRunId_fkey" FOREIGN KEY ("releaseRunId") REFERENCES "ReleaseRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "EvidenceSubmission" ADD CONSTRAINT "EvidenceSubmission_releaseRunId_fkey" FOREIGN KEY ("releaseRunId") REFERENCES "ReleaseRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "IntegrationCheckRun" ADD CONSTRAINT "IntegrationCheckRun_releaseRunId_fkey" FOREIGN KEY ("releaseRunId") REFERENCES "ReleaseRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;
