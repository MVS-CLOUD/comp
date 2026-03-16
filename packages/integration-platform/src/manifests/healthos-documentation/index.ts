import type { IntegrationManifest } from '../../types';
import {
  endpointDirectoryCheck,
  publicDocumentationCheck,
} from './checks';

export const healthosDocumentationManifest: IntegrationManifest = {
  id: 'healthos-documentation',
  name: 'HealthOS Documentation',
  description:
    'Documentation and service-base-URL publication checks for healthcare readiness.',
  category: 'Monitoring',
  logoUrl: 'https://img.logo.dev/healthit.gov',
  docsUrl: 'https://developer.healthos.io/fhir',
  auth: {
    type: 'custom',
    config: {
      description:
        'No credentials required. Configure the public documentation and endpoint directory URLs as variables.',
    },
  },
  capabilities: ['checks'],
  checks: [publicDocumentationCheck, endpointDirectoryCheck],
  isActive: true,
};

export default healthosDocumentationManifest;
