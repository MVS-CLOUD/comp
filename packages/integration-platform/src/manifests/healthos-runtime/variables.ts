import type { CheckVariable } from '../../types';

export const fhirBaseUrlVariable: CheckVariable = {
  id: 'fhir_base_url',
  label: 'FHIR base URL',
  type: 'text',
  required: true,
  helpText: 'Base URL for the target FHIR API, for example https://fhir.example.com/fhir',
  placeholder: 'https://fhir.example.com/fhir',
};
