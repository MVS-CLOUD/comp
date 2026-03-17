export type HealthcareFramework = {
  id: string;
  name: string;
  requirements?: Array<{ id: string }>;
};

export type ReleaseSubject = {
  id: string;
  name: string;
  type: string;
  description: string | null;
  environment: string | null;
  repositoryUrl: string | null;
  serviceBaseUrl: string | null;
  fhirBaseUrl: string | null;
  partnerProfile: string | null;
};

export type ReleaseDefinition = {
  id: string;
  releaseSubjectId: string;
  name: string;
  description: string | null;
  requiredFrameworkIds: string[];
  requiredCheckIds: string[];
  requiredApprovalKeys: string[];
  requiredExternalValidationKeys: string[];
  checkBindings?: Array<{
    id: string;
    checkId: string;
    connectionId: string;
    freshnessHours: number;
    blocking: boolean;
    variableOverrides: Record<string, unknown> | null;
  }>;
};

export type ReleaseRun = {
  id: string;
  releaseDefinitionId: string;
  releaseSubjectId: string;
  version: string;
  status: string;
  commitSha: string | null;
  buildId: string | null;
  completedAt: string | null;
};

export type ManualAttestation = {
  id: string;
  releaseRunId: string;
  approvalKey: string;
  title: string;
  requirementId: string | null;
  approverId: string | null;
  status: string | null;
  notes: string | null;
  expiresAt: string | null;
};

export type ExternalValidation = {
  id: string;
  releaseRunId: string;
  validationKey: string;
  type: string;
  title: string;
  authority: string | null;
  status: string | null;
  referenceId: string | null;
  artifactUrl: string | null;
  notes: string | null;
  validFrom: string | null;
  validTo: string | null;
};

export type ReleaseGateEvaluation = {
  releaseRunId: string;
  decision: 'pass' | 'fail';
  summary: string;
  blockingReasons: {
    missingFrameworkCount: number;
    missingCheckIds: string[];
    missingApprovalKeys: string[];
    blockingApprovalKeys: string[];
    missingExternalValidationKeys: string[];
    blockingExternalValidationKeys: string[];
  };
  evidenceHash: string;
};

export type HealthOSActiveConnection = {
  id: string;
  providerSlug: string;
  providerName: string;
  status: string;
  variables: Record<string, unknown> | null;
  metadata: Record<string, unknown> | null;
  lastSyncAt: string | null;
};

export type HealthOSWizardDefaults = {
  subjectDefaults: {
    type: 'application' | 'api' | 'service' | 'integration' | 'environment';
    name: string;
    description?: string;
    repositoryUrl?: string;
    environment?: string;
    serviceBaseUrl?: string;
    fhirBaseUrl?: string;
    partnerProfile?: string;
  };
  frameworkLibrary: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    version: string;
    visible: boolean;
  }>;
  activeConnections: HealthOSActiveConnection[];
  definitionDefaults: {
    name: string;
    requiredFrameworkIds: string[];
    requiredCheckIds: string[];
    requiredApprovalKeys: string[];
    requiredExternalValidationKeys: string[];
    suggestedCheckBindings: Array<{
      checkId: string;
      connectionId: string;
    }>;
  };
  readiness: {
    missingProviderSlugs: string[];
    frameworkLibraryReady: boolean;
  };
};
