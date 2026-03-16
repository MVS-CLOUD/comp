import type { CheckVariable } from '../../types';

export const verificationBaseUrlVariable: CheckVariable = {
  id: 'verification_base_url',
  label: 'Partner verification base URL',
  type: 'text',
  required: true,
  helpText:
    'Base URL for internal partner verification endpoints or harnesses that expose deterministic readiness results',
  placeholder: 'https://partner-harness.internal',
};
