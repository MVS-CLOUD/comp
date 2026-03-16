import { TASK_TEMPLATES } from '../../../task-mappings';
import type { IntegrationCheck } from '../../../types';
import {
  cloudScopeVariable,
  cloudVerificationBaseUrlVariable,
} from '../variables';

type VerificationResponse = {
  compliant?: boolean;
  summary?: string;
  details?: Record<string, unknown>;
};

export const cloudLoggingRetentionCheck: IntegrationCheck = {
  id: 'cloud_logging_retention',
  name: 'Cloud logging and retention',
  description:
    'Verify critical cloud logging and retention expectations through a deterministic verification endpoint.',
  taskMapping: TASK_TEMPLATES.monitoringAlerting,
  defaultSeverity: 'high',
  variables: [cloudVerificationBaseUrlVariable, cloudScopeVariable],
  run: async (ctx) => {
    const baseUrl = String(ctx.variables.verification_base_url || '').trim();
    const cloudScope = String(ctx.variables.cloud_scope || '').trim();
    const authHeader = String(ctx.credentials.auth_header || '').trim();

    const response = await ctx.fetch<VerificationResponse>(
      '/cloud/logging-retention',
      {
        baseUrl,
        headers: authHeader ? { Authorization: authHeader } : undefined,
        params: cloudScope ? { cloudScope } : undefined,
      },
    );

    if (response.compliant) {
      ctx.pass({
        title: 'Cloud logging and retention baseline is compliant',
        description:
          response.summary ||
          'The cloud verification endpoint reports compliant logging and retention coverage.',
        resourceType: 'cloud_scope',
        resourceId: cloudScope || baseUrl,
        evidence: {
          checkedAt: new Date().toISOString(),
          response,
        },
      });
      return;
    }

    ctx.fail({
      title: 'Cloud logging and retention baseline is not compliant',
      description:
        response.summary ||
        'The cloud verification endpoint reports a logging or retention gap.',
      resourceType: 'cloud_scope',
      resourceId: cloudScope || baseUrl,
      severity: 'high',
      remediation:
        'Enable required logging and retention policies for the targeted cloud scope.',
      evidence: {
        checkedAt: new Date().toISOString(),
        response,
      },
    });
  },
};
