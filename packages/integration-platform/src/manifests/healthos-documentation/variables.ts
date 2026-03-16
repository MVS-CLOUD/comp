import type { CheckVariable } from '../../types';

export const documentationBaseUrlVariable: CheckVariable = {
  id: 'documentation_base_url',
  label: 'Documentation base URL',
  type: 'text',
  required: true,
  helpText: 'Base site URL that hosts public API or product documentation',
  placeholder: 'https://developer.example.com',
};

export const endpointDirectoryUrlVariable: CheckVariable = {
  id: 'endpoint_directory_url',
  label: 'Endpoint directory URL',
  type: 'text',
  required: true,
  helpText: 'URL to the published service base URL directory artifact',
  placeholder: 'https://fhir.example.com/.well-known/endpoints.json',
};
