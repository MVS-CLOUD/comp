import type { CheckVariable } from '../../types';

export const ciVerificationBaseUrlVariable: CheckVariable = {
  id: 'verification_base_url',
  label: 'CI verification base URL',
  type: 'text',
  required: true,
  placeholder: 'https://ci-harness.internal',
  helpText:
    'Base URL for deterministic CI and build verification endpoints.',
};

export const releaseIdentifierVariable: CheckVariable = {
  id: 'release_identifier',
  label: 'Release identifier',
  type: 'text',
  required: false,
  placeholder: 'build-1234 or sha',
  helpText:
    'Optional release/build identifier forwarded to the CI verification endpoints.',
};
