import { TASK_TEMPLATES } from '../../../task-mappings';
import type { IntegrationCheck } from '../../../types';
import {
  repositoryIdentifierVariable,
  repositoryVerificationBaseUrlVariable,
} from '../variables';

type VerificationResponse = {
  compliant?: boolean;
  summary?: string;
  details?: Record<string, unknown>;
};

export const repositoryCodeScanningCheck: IntegrationCheck = {
  id: 'repository_code_scanning',
  name: 'Repository code scanning active',
  description:
    'Verify the repository security scanning baseline through a deterministic verification endpoint.',
  standardReference: 'Internal release baseline; code scanning',
  validatorName: 'HealthOS Repository Harness',
  taskMapping: TASK_TEMPLATES.secureCode,
  defaultSeverity: 'high',
  variables: [
    repositoryVerificationBaseUrlVariable,
    repositoryIdentifierVariable,
  ],
  run: async (ctx) => {
    const baseUrl = String(ctx.variables.verification_base_url || '').trim();
    const repository = String(ctx.variables.repository || '').trim();
    const authHeader = String(ctx.credentials.auth_header || '').trim();

    const response = await ctx.fetch<VerificationResponse>(
      '/repo/code-scanning',
      {
        baseUrl,
        headers: authHeader ? { Authorization: authHeader } : undefined,
        params: repository ? { repository } : undefined,
      },
    );

    if (response.compliant) {
      ctx.pass({
        title: 'Repository code scanning baseline is compliant',
        description:
          response.summary ||
          'The repository verification endpoint reports active code scanning coverage.',
        resourceType: 'repository',
        resourceId: repository || baseUrl,
        evidence: {
          checkedAt: new Date().toISOString(),
          response,
        },
      });
      return;
    }

    ctx.fail({
      title: 'Repository code scanning baseline is not compliant',
      description:
        response.summary ||
        'The repository verification endpoint reports a code scanning gap.',
      resourceType: 'repository',
      resourceId: repository || baseUrl,
      severity: 'high',
      remediation:
        'Enable the required repository code scanning and resolve any missing baseline coverage.',
      evidence: {
        checkedAt: new Date().toISOString(),
        response,
      },
    });
  },
};
