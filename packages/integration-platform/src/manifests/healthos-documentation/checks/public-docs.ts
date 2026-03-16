import { TASK_TEMPLATES } from '../../../task-mappings';
import type { IntegrationCheck } from '../../../types';
import { documentationBaseUrlVariable } from '../variables';

export const publicDocumentationCheck: IntegrationCheck = {
  id: 'public_documentation',
  name: 'Public developer documentation available',
  description:
    'Verify the public developer documentation URL is reachable and returns content.',
  taskMapping: TASK_TEMPLATES.smartFhirRuntimeChecks,
  defaultSeverity: 'high',
  variables: [documentationBaseUrlVariable],
  run: async (ctx) => {
    const baseUrl = String(ctx.variables.documentation_base_url || '').trim();
    const response = await fetch(baseUrl, { method: 'GET' });

    if (!response.ok) {
      ctx.fail({
        title: 'Public documentation is unreachable',
        description:
          'The configured developer documentation URL did not return a successful response.',
        resourceType: 'documentation',
        resourceId: baseUrl,
        severity: 'high',
        remediation:
          'Publish the developer documentation at a stable public URL and ensure it returns a 200 response.',
        evidence: {
          checkedAt: new Date().toISOString(),
          status: response.status,
          statusText: response.statusText,
        },
      });
      return;
    }

    const body = await response.text();

    ctx.pass({
      title: 'Public documentation is reachable',
      description:
        'The configured developer documentation endpoint returned a successful response.',
      resourceType: 'documentation',
      resourceId: baseUrl,
      evidence: {
        checkedAt: new Date().toISOString(),
        status: response.status,
        responsePreview: body.slice(0, 200),
      },
    });
  },
};
