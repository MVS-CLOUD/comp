import { logger, schemaTask } from '@trigger.dev/sdk';
import { z } from 'zod';
import { assembleEvidencePacketTask } from './assemble-evidence-packet';
import { collectBrowserSupportingEvidenceTask } from './collect-browser-supporting-evidence';
import { finalizeGateDecisionTask } from './finalize-gate-decision';
import { ingestValidatorResultsTask } from './ingest-validator-results';
import { notifyBlockersAndApproversTask } from './notify-blockers-and-approvers';
import { prepareReleaseRunTask } from './prepare-release-run';
import { requestManualAttestationsTask } from './request-manual-attestations';
import { runReleaseCheckSuiteTask } from './run-release-check-suite';

const validatorArtifactSchema = z.object({
  artifactType: z.string(),
  artifactUrl: z.string(),
  validationKey: z.string().optional(),
  authority: z.string().optional(),
  title: z.string().optional(),
  validTo: z.string().optional(),
});

export const orchestrateReleaseRunTask = schemaTask({
  id: 'orchestrate-release-run',
  schema: z.object({
    organizationId: z.string(),
    releaseRunId: z.string(),
    approvalKeys: z.array(z.string()).default([]),
    checkIds: z.array(z.string()).default([]),
    validatorArtifacts: z.array(validatorArtifactSchema).default([]),
    automationIds: z.array(z.string()).default([]),
    notify: z.boolean().default(true),
  }),
  run: async ({
    organizationId,
    releaseRunId,
    approvalKeys,
    checkIds,
    validatorArtifacts,
    automationIds,
    notify,
  }) => {
    logger.info('Starting release orchestration', {
      organizationId,
      releaseRunId,
      approvalKeys,
      checkIds,
      validatorArtifactCount: validatorArtifacts.length,
      automationIds,
      notify,
    });

    const prepared = await prepareReleaseRunTask
      .triggerAndWait({
        organizationId,
        releaseRunId,
      })
      .unwrap();

    const requestedApprovals = await requestManualAttestationsTask
      .triggerAndWait({
        organizationId,
        releaseRunId,
        approvalKeys,
      })
      .unwrap();

    const checkSuite = await runReleaseCheckSuiteTask
      .triggerAndWait({
        organizationId,
        releaseRunId,
        checkIds,
      })
      .unwrap();

    const ingestedArtifacts: Array<{
      artifactType: string;
      artifactId: string;
      validationKey?: string;
    }> = [];

    for (const artifact of validatorArtifacts) {
      const ingested = await ingestValidatorResultsTask
        .triggerAndWait({
          organizationId,
          releaseRunId,
          artifactType: artifact.artifactType,
          artifactUrl: artifact.artifactUrl,
          validationKey: artifact.validationKey,
          authority: artifact.authority,
          title: artifact.title,
          validTo: artifact.validTo,
        })
        .unwrap();

      ingestedArtifacts.push({
        artifactType: ingested.artifactType,
        artifactId: ingested.artifactId,
        validationKey: artifact.validationKey,
      });
    }

    const browserEvidence =
      automationIds.length > 0
        ? await collectBrowserSupportingEvidenceTask
            .triggerAndWait({
              organizationId,
              releaseRunId,
              automationIds,
            })
            .unwrap()
        : null;

    const gateDecision = await finalizeGateDecisionTask
      .triggerAndWait({
        organizationId,
        releaseRunId,
      })
      .unwrap();

    const evidencePacket = await assembleEvidencePacketTask
      .triggerAndWait({
        organizationId,
        releaseRunId,
      })
      .unwrap();

    const notification = notify
      ? await notifyBlockersAndApproversTask
          .triggerAndWait({
            organizationId,
            releaseRunId,
            decision: gateDecision.decision,
            summary: gateDecision.summary,
          })
          .unwrap()
      : null;

    logger.info('Completed release orchestration', {
      organizationId,
      releaseRunId,
      decision: gateDecision.decision,
      executedCheckRuns: checkSuite.executedCheckRuns,
      ingestedArtifacts,
      browserEvidenceArtifactId: browserEvidence?.artifactId,
      evidencePacketArtifactId: evidencePacket.artifactId,
      notified: notification?.recipients ?? 0,
    });

    return {
      prepared,
      requestedApprovals,
      checkSuite,
      ingestedArtifacts,
      browserEvidence,
      gateDecision,
      evidencePacket,
      notification,
      completedAt: new Date().toISOString(),
    };
  },
});
