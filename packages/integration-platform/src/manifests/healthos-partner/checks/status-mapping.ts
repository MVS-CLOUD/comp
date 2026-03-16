import { TASK_TEMPLATES } from '../../../task-mappings';
import type { IntegrationCheck } from '../../../types';
import { verificationBaseUrlVariable } from '../variables';

type HarnessResponse = { healthy?: boolean; summary?: string; details?: Record<string, unknown> };

export const partnerStatusMappingCheck: IntegrationCheck = {
  id: 'partner_status_mapping',
  name: 'Partner status mapping verification',
  description:
    'Verify the partner status-mapping and idempotency harness is healthy and returning structured readiness data.',
  taskMapping: TASK_TEMPLATES.doseSpotScenarioVerification,
  defaultSeverity: 'high',
  variables: [verificationBaseUrlVariable],
  run: async (ctx) => {
    const baseUrl = String(ctx.variables.verification_base_url || '').trim();
    const authHeader = String(ctx.credentials.auth_header || '').trim();

    const response = await ctx.fetch<HarnessResponse>('/partner/status-mapping/health', {
      baseUrl,
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });

    if (response.healthy) {
      ctx.pass({
        title: 'Partner status-mapping harness is healthy',
        description:
          response.summary || 'Partner mapping and idempotency verification is available.',
        resourceType: 'partner_harness',
        resourceId: `${baseUrl}/partner/status-mapping/health`,
        evidence: {
          checkedAt: new Date().toISOString(),
          response,
        },
      });
      return;
    }

    ctx.fail({
      title: 'Partner status-mapping harness is unhealthy',
      description:
        response.summary ||
        'The partner mapping and idempotency verification endpoint did not report a healthy status.',
      resourceType: 'partner_harness',
      resourceId: `${baseUrl}/partner/status-mapping/health`,
      severity: 'high',
      remediation:
        'Restore the partner mapping harness and verify idempotency and status checks can execute.',
      evidence: {
        checkedAt: new Date().toISOString(),
        response,
      },
    });
  },
};
