import { logger, schemaTask } from '@trigger.dev/sdk';
import { db } from '@trycompai/db';
import { z } from 'zod';

export const prepareReleaseRunTask = schemaTask({
  id: 'prepare-release-run',
  schema: z.object({
    organizationId: z.string(),
    releaseRunId: z.string(),
  }),
  run: async ({ organizationId, releaseRunId }) => {
    const releaseRun = await db.releaseRun.findUnique({
      where: { id: releaseRunId },
      select: { organizationId: true },
    });

    if (!releaseRun || releaseRun.organizationId !== organizationId) {
      throw new Error('Release run not found');
    }

    await db.releaseRun.update({
      where: { id: releaseRunId },
      data: {
        status: 'running',
        startedAt: new Date(),
      },
    });

    logger.info('Preparing release run', {
      organizationId,
      releaseRunId,
    });

    return {
      organizationId,
      releaseRunId,
      preparedAt: new Date().toISOString(),
    };
  },
});
