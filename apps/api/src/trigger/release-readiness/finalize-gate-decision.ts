import { logger, schemaTask } from '@trigger.dev/sdk';
import { z } from 'zod';

export const finalizeGateDecisionTask = schemaTask({
  id: 'finalize-gate-decision',
  schema: z.object({
    organizationId: z.string(),
    releaseRunId: z.string(),
  }),
  run: async ({ organizationId, releaseRunId }) => {
    const apiUrl = process.env.BASE_URL || 'http://localhost:3333';

    const response = await fetch(
      `${apiUrl}/v1/release-readiness/runs/${releaseRunId}/evaluate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-service-token': process.env.SERVICE_TOKEN_TRIGGER || '',
          'x-organization-id': organizationId,
        },
      },
    );

    if (!response.ok) {
      const error = await response.text();
      logger.error('Failed to finalize gate decision', {
        organizationId,
        releaseRunId,
        error,
      });
      throw new Error(error || 'Failed to finalize gate decision');
    }

    const result = (await response.json()) as {
      releaseRunId: string;
      decision: 'pass' | 'fail' | 'conditional';
      summary: string;
    };

    logger.info('Finalized gate decision', result);
    return result;
  },
});
