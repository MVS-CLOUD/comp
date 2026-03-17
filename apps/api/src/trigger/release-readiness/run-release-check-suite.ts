import { logger, schemaTask } from '@trigger.dev/sdk';
import { db } from '@trycompai/db';
import { getAllManifests } from '@comp/integration-platform';
import { z } from 'zod';

export const runReleaseCheckSuiteTask = schemaTask({
  id: 'run-release-check-suite',
  schema: z.object({
    organizationId: z.string(),
    releaseRunId: z.string(),
    checkIds: z.array(z.string()).default([]),
  }),
  run: async ({ organizationId, releaseRunId, checkIds }) => {
    const releaseRun = await db.releaseRun.findUnique({
      where: { id: releaseRunId },
      include: {
        releaseDefinition: {
          select: {
            requiredCheckIds: true,
            checkBindings: {
              select: {
                checkId: true,
                connectionId: true,
                variableOverrides: true,
              },
            },
          },
        },
      },
    });

    if (!releaseRun || releaseRun.organizationId !== organizationId) {
      throw new Error('Release run not found');
    }

    const targetCheckIds =
      checkIds.length > 0 ? checkIds : releaseRun.releaseDefinition.requiredCheckIds;

    const availableChecks = new Set(
      getAllManifests().flatMap((manifest) =>
        (manifest.checks || []).map((check) => check.id),
      ),
    );
    const checkManifestMap = new Map(
      getAllManifests().flatMap((manifest) =>
        (manifest.checks || []).map((check) => [check.id, manifest.id] as const),
      ),
    );

    const unknownCheckIds = targetCheckIds.filter(
      (checkId) => !availableChecks.has(checkId),
    );

    if (unknownCheckIds.length > 0) {
      throw new Error(
        `Unknown release check IDs: ${unknownCheckIds.join(', ')}`,
      );
    }

    const apiUrl = process.env.BASE_URL || 'http://localhost:3333';
    const executedCheckRuns: string[] = [];
    const checkBindings = new Map(
      releaseRun.releaseDefinition.checkBindings.map((binding) => [
        binding.checkId,
        {
          connectionId: binding.connectionId,
          variableOverrides: binding.variableOverrides,
        },
      ]),
    );

    for (const checkId of targetCheckIds) {
      const binding = checkBindings.get(checkId);
      const boundConnectionId = binding?.connectionId;
      const manifestId = checkManifestMap.get(checkId);
      const connection = boundConnectionId
        ? await db.integrationConnection.findFirst({
            where: {
              id: boundConnectionId,
              organizationId,
              status: 'active',
            },
            select: { id: true },
          })
        : manifestId
          ? await db.integrationConnection.findFirst({
              where: {
                organizationId,
                status: 'active',
                provider: {
                  slug: manifestId,
                },
              },
              select: { id: true },
            })
          : null;

      if (!connection) {
        logger.warn('No active connection found for release check', {
          organizationId,
          releaseRunId,
          checkId,
          manifestId,
          boundConnectionId,
        });
        continue;
      }

      const response = await fetch(
        `${apiUrl}/v1/integrations/checks/connections/${connection.id}/run/${checkId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-service-token': process.env.SERVICE_TOKEN_TRIGGER || '',
            'x-organization-id': organizationId,
          },
          body: JSON.stringify({
            variableOverrides: binding?.variableOverrides ?? undefined,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(
          `Failed to run release check ${checkId}: ${error || response.statusText}`,
        );
      }

      const result = (await response.json()) as { checkRunId?: string };

      if (result.checkRunId) {
        executedCheckRuns.push(result.checkRunId);
        await db.integrationCheckRun.update({
          where: { id: result.checkRunId },
          data: { releaseRunId },
        });
      }
    }

    await db.evidenceArtifact.create({
      data: {
        organizationId,
        releaseRunId,
        releaseSubjectId: releaseRun.releaseSubjectId,
        title: 'Release check suite requested',
        artifactType: 'check_suite_request',
        evidenceClass: 'deterministic',
        gateEligible: false,
        reviewStatus: 'approved',
        metadata: {
          checkIds: targetCheckIds,
          executedCheckRuns,
          requestedAt: new Date().toISOString(),
        },
      },
    });

    logger.info('Running release check suite', {
      organizationId,
      releaseRunId,
      checkIds: targetCheckIds,
    });

    return {
      organizationId,
      releaseRunId,
      checksRequested: targetCheckIds.length,
      executedCheckRuns,
      triggeredAt: new Date().toISOString(),
    };
  },
});
