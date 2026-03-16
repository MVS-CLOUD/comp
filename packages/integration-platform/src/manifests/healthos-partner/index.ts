import type { IntegrationManifest } from '../../types';
import {
  partnerStatusMappingCheck,
  partnerWebhookReplayCheck,
} from './checks';

export const healthosPartnerManifest: IntegrationManifest = {
  id: 'healthos-partner',
  name: 'HealthOS Partner',
  description:
    'Partner-readiness checks for deterministic scenario and harness verification.',
  category: 'Monitoring',
  logoUrl: 'https://img.logo.dev/dosespot.com',
  docsUrl: 'https://www.dosespot.com',
  auth: {
    type: 'custom',
    config: {
      description:
        'Optional authorization header plus a partner verification base URL for internal harness endpoints.',
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
  checks: [partnerWebhookReplayCheck, partnerStatusMappingCheck],
  isActive: true,
};

export default healthosPartnerManifest;
