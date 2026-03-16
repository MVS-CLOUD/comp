import { logger, schemaTask } from '@trigger.dev/sdk';
import { z } from 'zod';

export const importHealthcareFrameworksTask = schemaTask({
  id: 'import-healthcare-frameworks',
  schema: z.object({
    organizationId: z.string(),
  }),
  run: async ({ organizationId }) => {
    const apiUrl = process.env.BASE_URL || 'http://localhost:3333';

    const response = await fetch(
      `${apiUrl}/v1/frameworks/healthcare/install`,
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
      logger.error('Failed to install healthcare frameworks', {
        organizationId,
        error,
      });
      throw new Error(error || 'Failed to install healthcare frameworks');
    }

    const result = (await response.json()) as {
      success: boolean;
      frameworksAdded: number;
    };

    logger.info('Installed healthcare frameworks', result);
    return result;
  },
});
