import { logger, schemaTask } from '@trigger.dev/sdk';
import { db } from '@trycompai/db';
import { z } from 'zod';

export const syncReleaseDefinitionsTask = schemaTask({
  id: 'sync-release-definitions',
  schema: z.object({
    organizationId: z.string(),
  }),
  run: async ({ organizationId }) => {
    const definitions = await db.releaseDefinition.findMany({
      where: { organizationId },
      select: { id: true, name: true },
    });

    logger.info('Synced release definitions snapshot', {
      organizationId,
      definitionCount: definitions.length,
    });

    return {
      organizationId,
      definitionCount: definitions.length,
      syncedAt: new Date().toISOString(),
    };
  },
});
