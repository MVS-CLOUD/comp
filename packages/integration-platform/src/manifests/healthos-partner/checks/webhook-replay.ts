import { TASK_TEMPLATES } from '../../../task-mappings';
import type { IntegrationCheck } from '../../../types';
import { verificationBaseUrlVariable } from '../variables';

type HarnessResponse = { healthy?: boolean; summary?: string; details?: Record<string, unknown> };

export const partnerWebhookReplayCheck: IntegrationCheck = {
  id: 'partner_webhook_replay',
  name: 'Partner webhook replay harness',
  description:
    'Verify the partner webhook replay harness is healthy and ready to validate partner scenarios.',
  standardReference: 'Partner readiness; webhook replay validation',
  validatorName: 'HealthOS Partner Harness',
  taskMapping: TASK_TEMPLATES.doseSpotScenarioVerification,
  defaultSeverity: 'high',
  variables: [verificationBaseUrlVariable],
  run: async (ctx) => {
    const baseUrl = String(ctx.variables.verification_base_url || '').trim();
    const authHeader = String(ctx.credentials.auth_header || '').trim();

    const response = await ctx.fetch<HarnessResponse>('/partner/webhook-replay/health', {
      baseUrl,
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });

    if (response.healthy) {
      ctx.pass({
        title: 'Partner webhook replay harness is healthy',
        description: response.summary || 'Partner webhook replay checks are available.',
        resourceType: 'partner_harness',
        resourceId: `${baseUrl}/partner/webhook-replay/health`,
        evidence: {
          checkedAt: new Date().toISOString(),
          response,
        },
      });
      return;
    }

    ctx.fail({
      title: 'Partner webhook replay harness is unhealthy',
      description:
        response.summary ||
        'The partner webhook replay harness did not report a healthy status.',
      resourceType: 'partner_harness',
      resourceId: `${baseUrl}/partner/webhook-replay/health`,
      severity: 'high',
      remediation:
        'Restore the partner webhook replay harness and verify scenario endpoints are reachable.',
      evidence: {
        checkedAt: new Date().toISOString(),
        response,
      },
    });
  },
};
