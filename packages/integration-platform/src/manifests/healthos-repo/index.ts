import type { IntegrationManifest } from '../../types';
import {
  repositoryBranchProtectionCheck,
  repositoryCodeScanningCheck,
} from './checks';

export const healthosRepoManifest: IntegrationManifest = {
  id: 'healthos-repo',
  name: 'HealthOS Repository',
  description:
    'Deterministic repository verification checks for branch protection and code scanning baselines.',
  category: 'Development',
  logoUrl: 'https://img.logo.dev/github.com',
  docsUrl: 'https://developer.healthos.io/fhir',
  auth: {
    type: 'custom',
    config: {
      description:
        'Optional authorization header plus a deterministic repository verification base URL.',
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
  checks: [repositoryBranchProtectionCheck, repositoryCodeScanningCheck],
  isActive: true,
};

export default healthosRepoManifest;
