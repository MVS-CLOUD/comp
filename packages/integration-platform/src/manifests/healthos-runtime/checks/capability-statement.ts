import { TASK_TEMPLATES } from '../../../task-mappings';
import type { IntegrationCheck } from '../../../types';
import { fhirBaseUrlVariable } from '../variables';

type CapabilityStatement = {
  resourceType?: string;
  rest?: Array<{
    resource?: Array<{ type?: string; profile?: string; supportedProfile?: string[] }>;
  }>;
};

const REQUIRED_RESOURCE_TYPES = ['Patient', 'Observation', 'Condition', 'MedicationRequest'];

export const capabilityStatementCheck: IntegrationCheck = {
  id: 'capability_statement',
  name: 'FHIR capability statement coverage',
  description:
    'Verify the FHIR CapabilityStatement is reachable and exposes a minimum expected resource set.',
  taskMapping: TASK_TEMPLATES.smartFhirRuntimeChecks,
  defaultSeverity: 'high',
  variables: [fhirBaseUrlVariable],
  run: async (ctx) => {
    const fhirBaseUrl = String(ctx.variables.fhir_base_url || '').trim();
    const authHeader = String(ctx.credentials.auth_header || '').trim();

    const capabilityStatement = await ctx.fetch<CapabilityStatement>(
      '/metadata',
      {
        baseUrl: fhirBaseUrl,
        headers: authHeader ? { Authorization: authHeader } : undefined,
        params: { _format: 'json' },
      },
    );

    const supportedResources = new Set(
      capabilityStatement.rest?.flatMap((entry) =>
        entry.resource?.map((resource) => resource.type || '') || [],
      ) || [],
    );

    const missingResources = REQUIRED_RESOURCE_TYPES.filter(
      (resourceType) => !supportedResources.has(resourceType),
    );

    if (
      capabilityStatement.resourceType === 'CapabilityStatement' &&
      missingResources.length === 0
    ) {
      ctx.pass({
        title: 'CapabilityStatement exposes expected resource coverage',
        description:
          'The FHIR metadata endpoint is available and includes the required baseline resources.',
        resourceType: 'fhir_api',
        resourceId: fhirBaseUrl,
        evidence: {
          checkedAt: new Date().toISOString(),
          requiredResources: REQUIRED_RESOURCE_TYPES,
          supportedResources: [...supportedResources],
        },
      });
      return;
    }

    ctx.fail({
      title: 'CapabilityStatement is missing expected resources',
      description:
        'The FHIR metadata endpoint is missing one or more baseline resources used for readiness validation.',
      resourceType: 'fhir_api',
      resourceId: fhirBaseUrl,
      severity: 'high',
      remediation:
        'Expose a valid CapabilityStatement and ensure the expected baseline FHIR resources are declared.',
      evidence: {
        checkedAt: new Date().toISOString(),
        missingResources,
        supportedResources: [...supportedResources],
      },
    });
  },
};
