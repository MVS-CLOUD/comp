import type { IntegrationCheck } from '../../../types';
import {
  ciVerificationBaseUrlVariable,
  releaseIdentifierVariable,
} from '../variables';

type VerificationResponse = {
  compliant?: boolean;
  summary?: string;
  details?: Record<string, unknown>;
};

export const ciRequiredWorkflowsCheck: IntegrationCheck = {
  id: 'ci_required_workflows',
  name: 'Required CI workflows complete',
  description:
    'Verify the required CI workflows completed successfully for the targeted release.',
  defaultSeverity: 'critical',
  variables: [ciVerificationBaseUrlVariable, releaseIdentifierVariable],
  run: async (ctx) => {
    const baseUrl = String(ctx.variables.verification_base_url || '').trim();
    const releaseIdentifier = String(
      ctx.variables.release_identifier || '',
    ).trim();
    const authHeader = String(ctx.credentials.auth_header || '').trim();

    const response = await ctx.fetch<VerificationResponse>(
      '/ci/required-workflows',
      {
        baseUrl,
        headers: authHeader ? { Authorization: authHeader } : undefined,
        params: releaseIdentifier
          ? { releaseIdentifier }
          : undefined,
      },
    );

    if (response.compliant) {
      ctx.pass({
        title: 'Required CI workflows completed successfully',
        description:
          response.summary ||
          'The CI verification endpoint reports all required workflows passing.',
        resourceType: 'ci_pipeline',
        resourceId: releaseIdentifier || baseUrl,
        evidence: {
          checkedAt: new Date().toISOString(),
          response,
        },
      });
      return;
    }

    ctx.fail({
      title: 'Required CI workflows are incomplete or failing',
      description:
        response.summary ||
        'The CI verification endpoint reports missing or failing required workflows.',
      resourceType: 'ci_pipeline',
      resourceId: releaseIdentifier || baseUrl,
      severity: 'critical',
      remediation:
        'Re-run or fix the required CI workflows before attempting release approval.',
      evidence: {
        checkedAt: new Date().toISOString(),
        response,
      },
    });
  },
};
