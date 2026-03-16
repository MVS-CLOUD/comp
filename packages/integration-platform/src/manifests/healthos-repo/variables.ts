import type { CheckVariable } from '../../types';

export const repositoryVerificationBaseUrlVariable: CheckVariable = {
  id: 'verification_base_url',
  label: 'Repository verification base URL',
  type: 'text',
  required: true,
  placeholder: 'https://repo-harness.internal',
  helpText:
    'Base URL for deterministic repository verification endpoints.',
};

export const repositoryIdentifierVariable: CheckVariable = {
  id: 'repository',
  label: 'Repository identifier',
  type: 'text',
  required: false,
  placeholder: 'org/repo',
  helpText:
    'Optional repository identifier forwarded to the verification harness.',
};
