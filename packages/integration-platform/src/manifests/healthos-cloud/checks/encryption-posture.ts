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

export const cloudEncryptionPostureCheck: IntegrationCheck = {
  id: 'cloud_encryption_posture',
  name: 'Cloud encryption posture',
  description:
    'Verify cloud encryption-at-rest and related posture expectations through a deterministic verification endpoint.',
  defaultSeverity: 'high',
  variables: [cloudVerificationBaseUrlVariable, cloudScopeVariable],
  run: async (ctx) => {
    const baseUrl = String(ctx.variables.verification_base_url || '').trim();
    const cloudScope = String(ctx.variables.cloud_scope || '').trim();
    const authHeader = String(ctx.credentials.auth_header || '').trim();

    const response = await ctx.fetch<VerificationResponse>(
      '/cloud/encryption-posture',
      {
        baseUrl,
        headers: authHeader ? { Authorization: authHeader } : undefined,
        params: cloudScope ? { cloudScope } : undefined,
      },
    );

    if (response.compliant) {
      ctx.pass({
        title: 'Cloud encryption posture is compliant',
        description:
          response.summary ||
          'The cloud verification endpoint reports compliant encryption posture.',
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
      title: 'Cloud encryption posture is not compliant',
      description:
        response.summary ||
        'The cloud verification endpoint reports an encryption posture gap.',
      resourceType: 'cloud_scope',
      resourceId: cloudScope || baseUrl,
      severity: 'high',
      remediation:
        'Enable or restore the required encryption posture for the targeted cloud scope.',
      evidence: {
        checkedAt: new Date().toISOString(),
        response,
      },
    });
  },
};
