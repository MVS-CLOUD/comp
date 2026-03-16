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

export const ciReleaseArtifactsCheck: IntegrationCheck = {
  id: 'ci_release_artifacts',
  name: 'Release artifacts available',
  description:
    'Verify the required release artifacts and provenance metadata are available for the targeted release.',
  defaultSeverity: 'high',
  variables: [ciVerificationBaseUrlVariable, releaseIdentifierVariable],
  run: async (ctx) => {
    const baseUrl = String(ctx.variables.verification_base_url || '').trim();
    const releaseIdentifier = String(
      ctx.variables.release_identifier || '',
    ).trim();
    const authHeader = String(ctx.credentials.auth_header || '').trim();

    const response = await ctx.fetch<VerificationResponse>(
      '/ci/release-artifacts',
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
        title: 'Required release artifacts are available',
        description:
          response.summary ||
          'The CI verification endpoint reports the required release artifacts are present.',
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
      title: 'Required release artifacts are missing',
      description:
        response.summary ||
        'The CI verification endpoint reports missing or incomplete release artifacts.',
      resourceType: 'ci_pipeline',
      resourceId: releaseIdentifier || baseUrl,
      severity: 'high',
      remediation:
        'Publish the required release artifacts and provenance metadata before release approval.',
      evidence: {
        checkedAt: new Date().toISOString(),
        response,
      },
    });
  },
};
