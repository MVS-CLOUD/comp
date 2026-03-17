import { HEALTHCARE_FRAMEWORK_IDS } from '../frameworks/healthcare-framework.constants';

export const HEALTHOS_PROVIDER_GROUPS = [
  {
    providerSlug: 'healthos-runtime',
    providerName: 'HealthOS Runtime',
    checkIds: ['smart_configuration', 'capability_statement'],
  },
  {
    providerSlug: 'healthos-documentation',
    providerName: 'HealthOS Documentation',
    checkIds: ['public_documentation', 'endpoint_directory'],
  },
  {
    providerSlug: 'healthos-repo',
    providerName: 'HealthOS Repository',
    checkIds: ['repository_branch_protection', 'repository_code_scanning'],
  },
  {
    providerSlug: 'healthos-ci',
    providerName: 'HealthOS CI',
    checkIds: ['ci_required_workflows', 'ci_release_artifacts'],
  },
  {
    providerSlug: 'healthos-cloud',
    providerName: 'HealthOS Cloud',
    checkIds: ['cloud_logging_retention', 'cloud_encryption_posture'],
  },
  {
    providerSlug: 'healthos-partner',
    providerName: 'HealthOS Partner',
    checkIds: ['partner_webhook_replay', 'partner_status_mapping'],
  },
] as const;

export const HEALTHOS_DEFAULT_APPROVAL_KEYS = [
  'eng_release_owner',
  'security_signoff',
  'compliance_signoff',
] as const;

export const HEALTHOS_DEFAULT_EXTERNAL_VALIDATIONS = [
  {
    validationKey: 'onc_evidence_packet',
    type: 'onc_atl',
    title: 'ONC evidence packet',
  },
  {
    validationKey: 'partner_validation_packet',
    type: 'partner',
    title: 'Partner validation packet',
  },
] as const;

export const HEALTHOS_DEFAULT_SUBJECT = {
  type: 'service',
  name: 'HealthOS Production API',
  description: 'Primary production API surface for HealthOS release approval.',
  environment: 'production',
  partnerProfile: 'dosespot',
} as const;

export const HEALTHOS_DEFAULT_DEFINITION_NAME = 'healthos-production-gate';

export const HEALTHOS_DEFAULT_FRAMEWORK_IDS = [...HEALTHCARE_FRAMEWORK_IDS];

export const HEALTHOS_DEFAULT_CHECK_IDS = HEALTHOS_PROVIDER_GROUPS.flatMap(
  (group) => group.checkIds,
);
