import { logger, schemaTask } from '@trigger.dev/sdk';
import { db } from '@trycompai/db';
import { z } from 'zod';

export const requestManualAttestationsTask = schemaTask({
  id: 'request-manual-attestations',
  schema: z.object({
    organizationId: z.string(),
    releaseRunId: z.string(),
    approvalKeys: z.array(z.string()).default([]),
  }),
  run: async ({ organizationId, releaseRunId, approvalKeys }) => {
    const releaseRun = await db.releaseRun.findUnique({
      where: { id: releaseRunId },
      include: {
        releaseDefinition: {
          select: { requiredApprovalKeys: true },
        },
      },
    });

    if (!releaseRun || releaseRun.organizationId !== organizationId) {
      throw new Error('Release run not found');
    }

    const targetApprovalKeys =
      approvalKeys.length > 0
        ? approvalKeys
        : releaseRun.releaseDefinition.requiredApprovalKeys;

    const existingAttestations = await db.manualAttestation.findMany({
      where: {
        organizationId,
        releaseRunId,
        approvalKey: { in: targetApprovalKeys },
      },
      select: { approvalKey: true },
    });

    const existingKeys = new Set(
      existingAttestations.map((attestation) => attestation.approvalKey),
    );
    const missingKeys = targetApprovalKeys.filter((key) => !existingKeys.has(key));

    if (missingKeys.length > 0) {
      await db.manualAttestation.createMany({
        data: missingKeys.map((approvalKey) => ({
          organizationId,
          releaseRunId,
          approvalKey,
          title: approvalKey
            .split(/[_-]/g)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' '),
          status: 'pending',
        })),
      });
    }

    logger.info('Requesting manual attestations', {
      organizationId,
      releaseRunId,
      approvalKeys: targetApprovalKeys,
    });

    return {
      organizationId,
      releaseRunId,
      requestedApprovals: targetApprovalKeys.length,
      createdApprovals: missingKeys.length,
      requestedAt: new Date().toISOString(),
    };
  },
});
