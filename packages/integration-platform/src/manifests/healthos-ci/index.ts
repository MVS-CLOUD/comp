import type { IntegrationManifest } from '../../types';
import {
  ciReleaseArtifactsCheck,
  ciRequiredWorkflowsCheck,
} from './checks';

export const healthosCiManifest: IntegrationManifest = {
  id: 'healthos-ci',
  name: 'HealthOS CI',
  description:
    'Deterministic CI verification checks for required workflows and release artifacts.',
  category: 'Monitoring',
  logoUrl: 'https://img.logo.dev/github.com',
  docsUrl: 'https://developer.healthos.io/fhir',
  auth: {
    type: 'custom',
    config: {
      description:
        'Optional authorization header plus a CI verification base URL.',
      credentialFields: [
        {
          id: 'auth_header',
          label: 'Authorization header value',
          type: 'password',
          required: false,
          helpText: 'Optional value such as Bearer <token>',
        },
      ],
    },
  },
  capabilities: ['checks'],
  checks: [ciRequiredWorkflowsCheck, ciReleaseArtifactsCheck],
  isActive: true,
};

export default healthosCiManifest;
