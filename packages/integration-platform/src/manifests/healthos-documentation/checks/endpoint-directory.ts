import { TASK_TEMPLATES } from '../../../task-mappings';
import type { IntegrationCheck } from '../../../types';
import { endpointDirectoryUrlVariable } from '../variables';

type EndpointDirectory = Record<string, unknown>;

export const endpointDirectoryCheck: IntegrationCheck = {
  id: 'endpoint_directory',
  name: 'Service base URL directory published',
  description:
    'Verify the published endpoint directory is reachable and returns structured content.',
  taskMapping: TASK_TEMPLATES.smartFhirRuntimeChecks,
  defaultSeverity: 'critical',
  variables: [endpointDirectoryUrlVariable],
  run: async (ctx) => {
    const directoryUrl = String(ctx.variables.endpoint_directory_url || '').trim();
    const response = await fetch(directoryUrl, { method: 'GET' });

    if (!response.ok) {
      ctx.fail({
        title: 'Endpoint directory is unreachable',
        description:
          'The configured endpoint directory URL did not return a successful response.',
        resourceType: 'documentation',
        resourceId: directoryUrl,
        severity: 'critical',
        remediation:
          'Publish the service base URL directory at a stable public URL and ensure it returns a 200 response.',
        evidence: {
          checkedAt: new Date().toISOString(),
          status: response.status,
          statusText: response.statusText,
        },
      });
      return;
    }

    const payload = (await response.json()) as EndpointDirectory;

    const hasContent = Object.keys(payload).length > 0;

    if (hasContent) {
      ctx.pass({
        title: 'Endpoint directory is published',
        description:
          'The configured endpoint directory URL returned structured content.',
        resourceType: 'documentation',
        resourceId: directoryUrl,
        evidence: {
          checkedAt: new Date().toISOString(),
          payload,
        },
      });
      return;
    }

    ctx.fail({
      title: 'Endpoint directory is empty',
      description:
        'The configured endpoint directory URL is reachable but does not contain structured data.',
      resourceType: 'documentation',
      resourceId: directoryUrl,
      severity: 'critical',
      remediation:
        'Publish the service base URL directory as a structured artifact and ensure it is publicly reachable.',
      evidence: {
        checkedAt: new Date().toISOString(),
        payload,
      },
    });
  },
};
