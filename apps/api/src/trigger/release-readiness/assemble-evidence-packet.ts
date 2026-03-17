import { logger, schemaTask } from '@trigger.dev/sdk';
import { db } from '@trycompai/db';
import { z } from 'zod';

export const assembleEvidencePacketTask = schemaTask({
  id: 'assemble-evidence-packet',
  schema: z.object({
    organizationId: z.string(),
    releaseRunId: z.string(),
  }),
  run: async ({ organizationId, releaseRunId }) => {
    const releaseRun = await db.releaseRun.findUnique({
      where: { id: releaseRunId },
      select: { organizationId: true, releaseSubjectId: true },
    });

    if (!releaseRun || releaseRun.organizationId !== organizationId) {
      throw new Error('Release run not found');
    }

    const artifact = await db.evidenceArtifact.create({
      data: {
        organizationId,
        releaseRunId,
        releaseSubjectId: releaseRun.releaseSubjectId,
        title: 'Release evidence packet',
        artifactType: 'release_evidence_packet',
        evidenceClass: 'manual_attested',
        gateEligible: false,
        reviewStatus: 'approved',
        metadata: {
          assembledAt: new Date().toISOString(),
        },
      },
    });

    logger.info('Assembling evidence packet', {
      organizationId,
      releaseRunId,
    });

    return {
      organizationId,
      releaseRunId,
      packetStatus: 'assembled',
      artifactId: artifact.id,
      assembledAt: new Date().toISOString(),
    };
  },
});
