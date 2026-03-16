import { logger, schemaTask } from '@trigger.dev/sdk';
import { db } from '@trycompai/db';
import { z } from 'zod';

export const collectBrowserSupportingEvidenceTask = schemaTask({
  id: 'collect-browser-supporting-evidence',
  schema: z.object({
    organizationId: z.string(),
    releaseRunId: z.string(),
    automationIds: z.array(z.string()).default([]),
  }),
  run: async ({ organizationId, releaseRunId, automationIds }) => {
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
        title: 'Browser supporting evidence request',
        artifactType: 'browser_supporting_evidence',
        evidenceClass: 'browser_collected',
        gateEligible: false,
        metadata: {
          automationIds,
          collectedAt: new Date().toISOString(),
        },
      },
    });

    logger.info('Collecting browser supporting evidence', {
      organizationId,
      releaseRunId,
      automationIds,
    });

    return {
      organizationId,
      releaseRunId,
      automationCount: automationIds.length,
      artifactId: artifact.id,
      collectedAt: new Date().toISOString(),
    };
  },
});
