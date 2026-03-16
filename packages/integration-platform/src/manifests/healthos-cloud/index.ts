import type { IntegrationManifest } from '../../types';
import {
  cloudEncryptionPostureCheck,
  cloudLoggingRetentionCheck,
} from './checks';

export const healthosCloudManifest: IntegrationManifest = {
  id: 'healthos-cloud',
  name: 'HealthOS Cloud',
  description:
    'Deterministic cloud posture verification checks for logging, retention, and encryption coverage.',
  category: 'Infrastructure',
  logoUrl: 'https://img.logo.dev/aws.amazon.com',
  docsUrl: 'https://developer.healthos.io/fhir',
  auth: {
    type: 'custom',
    config: {
      description:
        'Optional authorization header plus a cloud verification base URL.',
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
  checks: [cloudLoggingRetentionCheck, cloudEncryptionPostureCheck],
  isActive: true,
};

export default healthosCloudManifest;
