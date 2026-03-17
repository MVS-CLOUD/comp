import { TASK_TEMPLATES } from '../../../task-mappings';
import type { IntegrationCheck } from '../../../types';
import { fhirBaseUrlVariable } from '../variables';

type SmartConfiguration = {
  authorization_endpoint?: string;
  token_endpoint?: string;
  capabilities?: string[];
  scopes_supported?: string[];
};

export const smartConfigurationCheck: IntegrationCheck = {
  id: 'smart_configuration',
  name: 'SMART configuration published',
  description:
    'Verify the SMART discovery document is reachable and includes the required authorization metadata.',
  standardReference: '§170.315(g)(10); SMART App Launch',
  validatorName: 'HealthOS Runtime Harness',
  taskMapping: TASK_TEMPLATES.smartFhirRuntimeChecks,
  defaultSeverity: 'critical',
  variables: [fhirBaseUrlVariable],
  run: async (ctx) => {
    const fhirBaseUrl = String(ctx.variables.fhir_base_url || '').trim();
    const authHeader = String(ctx.credentials.auth_header || '').trim();

    const metadata = await ctx.fetch<SmartConfiguration>(
      '/.well-known/smart-configuration',
      {
        baseUrl: fhirBaseUrl,
        headers: authHeader ? { Authorization: authHeader } : undefined,
      },
    );

    const hasAuthEndpoint = Boolean(metadata.authorization_endpoint);
    const hasTokenEndpoint = Boolean(metadata.token_endpoint);
    const hasScopes = Array.isArray(metadata.scopes_supported);

    if (hasAuthEndpoint && hasTokenEndpoint && hasScopes) {
      ctx.pass({
        title: 'SMART configuration is published',
        description:
          'SMART discovery metadata includes authorization, token, and scopes information.',
        resourceType: 'fhir_api',
        resourceId: fhirBaseUrl,
        evidence: {
          checkedAt: new Date().toISOString(),
          metadata,
        },
      });
      return;
    }

    ctx.fail({
      title: 'SMART configuration is incomplete',
      description:
        'SMART discovery metadata is missing one or more required authorization fields.',
      resourceType: 'fhir_api',
      resourceId: fhirBaseUrl,
      severity: 'critical',
      remediation:
        'Publish a valid `/.well-known/smart-configuration` response with authorization, token, and scopes metadata.',
      evidence: {
        checkedAt: new Date().toISOString(),
        metadata,
      },
    });
  },
};
