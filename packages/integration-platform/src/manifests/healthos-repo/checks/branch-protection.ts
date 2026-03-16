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

export const repositoryBranchProtectionCheck: IntegrationCheck = {
  id: 'repository_branch_protection',
  name: 'Repository branch protection',
  description:
    'Verify the repository branch protection baseline through a deterministic verification endpoint.',
  taskMapping: TASK_TEMPLATES.codeChanges,
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
      '/repo/branch-protection',
      {
        baseUrl,
        headers: authHeader ? { Authorization: authHeader } : undefined,
        params: repository ? { repository } : undefined,
      },
    );

    if (response.compliant) {
      ctx.pass({
        title: 'Repository branch protection baseline is compliant',
        description:
          response.summary ||
          'The repository verification endpoint reports branch protection compliance.',
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
      title: 'Repository branch protection baseline is not compliant',
      description:
        response.summary ||
        'The repository verification endpoint reports a branch protection gap.',
      resourceType: 'repository',
      resourceId: repository || baseUrl,
      severity: 'high',
      remediation:
        'Enable or restore the required branch protection rules for the target repository.',
      evidence: {
        checkedAt: new Date().toISOString(),
        response,
      },
    });
  },
};
