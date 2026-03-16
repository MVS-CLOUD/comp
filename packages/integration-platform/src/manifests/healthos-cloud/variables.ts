import type { CheckVariable } from '../../types';

export const cloudVerificationBaseUrlVariable: CheckVariable = {
  id: 'verification_base_url',
  label: 'Cloud verification base URL',
  type: 'text',
  required: true,
  placeholder: 'https://cloud-harness.internal',
  helpText:
    'Base URL for deterministic cloud posture verification endpoints.',
};

export const cloudScopeVariable: CheckVariable = {
  id: 'cloud_scope',
  label: 'Cloud scope',
  type: 'text',
  required: false,
  placeholder: 'prod or account-id',
  helpText:
    'Optional cloud scope identifier forwarded to the verification harness.',
};
