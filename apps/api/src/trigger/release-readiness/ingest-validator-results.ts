import { logger, schemaTask } from '@trigger.dev/sdk';
import { db } from '@trycompai/db';
import { z } from 'zod';

export const ingestValidatorResultsTask = schemaTask({
  id: 'ingest-validator-results',
  schema: z.object({
    organizationId: z.string(),
    releaseRunId: z.string(),
    artifactType: z.string(),
    artifactUrl: z.string(),
    validationKey: z.string().optional(),
    authority: z.string().optional(),
    title: z.string().optional(),
    validTo: z.string().optional(),
  }),
  run: async ({
    organizationId,
    releaseRunId,
    artifactType,
    artifactUrl,
    validationKey,
    authority,
    title,
    validTo,
  }) => {
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
        title: `${artifactType} validator result`,
        artifactType,
        evidenceClass: 'deterministic',
        gateEligible: true,
        storageUrl: artifactUrl,
      },
    });

    if (validationKey) {
      const existingValidation = await db.externalValidation.findFirst({
        where: {
          organizationId,
          releaseRunId,
          validationKey,
        },
        select: { id: true },
      });

      if (existingValidation) {
        await db.externalValidation.update({
          where: { id: existingValidation.id },
          data: {
            title: title || `${artifactType} validation`,
            authority: authority || null,
            artifactUrl,
            validTo: validTo ? new Date(validTo) : null,
            status: 'active',
          },
        });
      } else {
        await db.externalValidation.create({
          data: {
            organizationId,
            releaseRunId,
            validationKey,
            type: 'compliance',
            title: title || `${artifactType} validation`,
            authority: authority || null,
            artifactUrl,
            validTo: validTo ? new Date(validTo) : null,
            status: 'active',
          },
        });
      }
    }

    logger.info('Ingesting validator results', {
      organizationId,
      releaseRunId,
      artifactType,
      artifactUrl,
      validationKey,
    });

    return {
      organizationId,
      releaseRunId,
      artifactType,
      artifactUrl,
      artifactId: artifact.id,
      ingestedAt: new Date().toISOString(),
    };
  },
});
