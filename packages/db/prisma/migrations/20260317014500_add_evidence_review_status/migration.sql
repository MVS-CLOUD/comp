-- CreateEnum
CREATE TYPE "EvidenceReviewStatus" AS ENUM ('pending_review', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "EvidenceArtifact"
ADD COLUMN "reviewStatus" "EvidenceReviewStatus" NOT NULL DEFAULT 'pending_review',
ADD COLUMN "reviewedAt" TIMESTAMP(3),
ADD COLUMN "reviewedById" TEXT,
ADD COLUMN "aiProvider" TEXT,
ADD COLUMN "aiModel" TEXT,
ADD COLUMN "promptVersion" TEXT;

-- CreateIndex
CREATE INDEX "EvidenceArtifact_reviewStatus_idx" ON "EvidenceArtifact"("reviewStatus");
