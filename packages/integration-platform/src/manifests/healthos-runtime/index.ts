import type { IntegrationManifest } from '../../types';
import {
  capabilityStatementCheck,
  smartConfigurationCheck,
} from './checks';

export const healthosRuntimeManifest: IntegrationManifest = {
  id: 'healthos-runtime',
  name: 'HealthOS Runtime',
  description:
    'Runtime checks for SMART on FHIR and baseline FHIR API readiness.',
  category: 'Monitoring',
  logoUrl: 'https://img.logo.dev/healthit.gov',
  docsUrl: 'https://developer.healthos.io/fhir',
  auth: {
    type: 'custom',
    config: {
      description:
        'Optional authorization header for protected runtime endpoints. Use variables for the target FHIR base URL.',
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
  checks: [smartConfigurationCheck, capabilityStatementCheck],
  isActive: true,
};

export default healthosRuntimeManifest;
