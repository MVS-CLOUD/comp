'use client';

import { apiClient } from '@/lib/api-client';
import useSWR from 'swr';
import type {
  ExternalValidation,
  ManualAttestation,
  ReleaseDefinition,
  ReleaseGateEvaluation,
  ReleaseRun,
  ReleaseSubject,
} from '../types';
import type { CreateReleaseDefinitionInput } from '../components/forms/CreateReleaseDefinitionForm';
import type { CreateExternalValidationInput as FormCreateExternalValidationInput } from '../components/forms/CreateExternalValidationForm';
import type { CreateManualAttestationInput as FormCreateManualAttestationInput } from '../components/forms/CreateManualAttestationForm';
import type { CreateReleaseRunInput } from '../components/forms/CreateReleaseRunForm';
import type { CreateReleaseSubjectInput } from '../components/forms/CreateReleaseSubjectForm';

type CreateManualAttestationInput = FormCreateManualAttestationInput & {
  releaseRunId: string;
};

type CreateExternalValidationInput = FormCreateExternalValidationInput & {
  releaseRunId: string;
};

type UpdateStatusInput = {
  status: 'approved' | 'rejected' | 'expired' | 'pending';
  notes?: string;
  expiresAt?: string;
  validFrom?: string;
  validTo?: string;
};

type UseReleaseReadinessOptions = {
  organizationId: string;
  initialSubjects: ReleaseSubject[];
  initialDefinitions: ReleaseDefinition[];
  initialRuns: ReleaseRun[];
  selectedRunId?: string | null;
};

async function fetchList<T>(endpoint: string, organizationId: string): Promise<T[]> {
  const response = await apiClient.get<{ data: T[] }>(endpoint, organizationId);
  if (response.error) {
    throw new Error(response.error);
  }
  return Array.isArray(response.data?.data) ? response.data.data : [];
}

function requireData<T>(data: T | undefined, error?: string): T {
  if (!data) {
    throw new Error(error ?? 'Missing response data');
  }
  return data;
}

export function useReleaseReadiness({
  organizationId,
  initialSubjects,
  initialDefinitions,
  initialRuns,
  selectedRunId,
}: UseReleaseReadinessOptions) {
  const subjectsKey = ['/v1/release-readiness/subjects', organizationId] as const;
  const definitionsKey = ['/v1/release-readiness/definitions', organizationId] as const;
  const runsKey = ['/v1/release-readiness/runs', organizationId] as const;
  const manualAttestationsKey = selectedRunId
    ? [`/v1/release-readiness/runs/${selectedRunId}/manual-attestations`, organizationId]
    : null;
  const externalValidationsKey = selectedRunId
    ? [`/v1/release-readiness/runs/${selectedRunId}/external-validations`, organizationId]
    : null;

  const subjects = useSWR(subjectsKey, ([endpoint, orgId]) => fetchList<ReleaseSubject>(endpoint, orgId), {
    fallbackData: initialSubjects,
  });
  const definitions = useSWR(
    definitionsKey,
    ([endpoint, orgId]) => fetchList<ReleaseDefinition>(endpoint, orgId),
    {
      fallbackData: initialDefinitions,
    },
  );
  const runs = useSWR(runsKey, ([endpoint, orgId]) => fetchList<ReleaseRun>(endpoint, orgId), {
    fallbackData: initialRuns,
  });
  const manualAttestations = useSWR(
    manualAttestationsKey,
    ([endpoint, orgId]) => fetchList<ManualAttestation>(endpoint, orgId),
  );
  const externalValidations = useSWR(
    externalValidationsKey,
    ([endpoint, orgId]) => fetchList<ExternalValidation>(endpoint, orgId),
  );

  const createSubject = async (input: CreateReleaseSubjectInput) => {
    const response = await apiClient.post<ReleaseSubject>(
      '/v1/release-readiness/subjects',
      input,
      organizationId,
    );
    const created = requireData(response.data, response.error);
    await subjects.mutate((current) => [created, ...(current ?? [])], false);
    return created;
  };

  const createDefinition = async (input: CreateReleaseDefinitionInput) => {
    const response = await apiClient.post<ReleaseDefinition>(
      '/v1/release-readiness/definitions',
      input,
      organizationId,
    );
    const created = requireData(response.data, response.error);
    await definitions.mutate((current) => [created, ...(current ?? [])], false);
    return created;
  };

  const createRun = async (input: CreateReleaseRunInput) => {
    const response = await apiClient.post<ReleaseRun>(
      '/v1/release-readiness/runs',
      input,
      organizationId,
    );
    const created = requireData(response.data, response.error);
    await runs.mutate((current) => [created, ...(current ?? [])], false);
    return created;
  };

  const createManualAttestation = async (
    input: CreateManualAttestationInput,
  ) => {
    const response = await apiClient.post<ManualAttestation>(
      '/v1/release-readiness/manual-attestations',
      input,
      organizationId,
    );
    const created = requireData(response.data, response.error);
    await manualAttestations.mutate((current) => [created, ...(current ?? [])], false);
    return created;
  };

  const updateManualAttestation = async (
    attestationId: string,
    input: UpdateStatusInput,
  ) => {
    const response = await apiClient.patch<ManualAttestation>(
      `/v1/release-readiness/manual-attestations/${attestationId}`,
      {
        status: input.status,
        notes: input.notes,
        expiresAt: input.expiresAt,
      },
      organizationId,
    );
    const updated = requireData(response.data, response.error);
    await manualAttestations.mutate(
      (current) =>
        (current ?? []).map((item) => (item.id === attestationId ? updated : item)),
      false,
    );
    return updated;
  };

  const createExternalValidation = async (
    input: CreateExternalValidationInput,
  ) => {
    const response = await apiClient.post<ExternalValidation>(
      '/v1/release-readiness/external-validations',
      input,
      organizationId,
    );
    const created = requireData(response.data, response.error);
    await externalValidations.mutate((current) => [created, ...(current ?? [])], false);
    return created;
  };

  const updateExternalValidation = async (
    validationId: string,
    input: UpdateStatusInput,
  ) => {
    const response = await apiClient.patch<ExternalValidation>(
      `/v1/release-readiness/external-validations/${validationId}`,
      {
        status: input.status,
        notes: input.notes,
        validFrom: input.validFrom,
        validTo: input.validTo,
      },
      organizationId,
    );
    const updated = requireData(response.data, response.error);
    await externalValidations.mutate(
      (current) =>
        (current ?? []).map((item) => (item.id === validationId ? updated : item)),
      false,
    );
    return updated;
  };

  const evaluateRun = async (runId: string) => {
    const response = await apiClient.post<ReleaseGateEvaluation>(
      `/v1/release-readiness/runs/${runId}/evaluate`,
      undefined,
      organizationId,
    );
    const evaluation = requireData(response.data, response.error);
    await runs.mutate();
    return evaluation;
  };

  return {
    subjects: subjects.data ?? [],
    definitions: definitions.data ?? [],
    runs: runs.data ?? [],
    manualAttestations: manualAttestations.data ?? [],
    externalValidations: externalValidations.data ?? [],
    isLoading:
      subjects.isLoading ||
      definitions.isLoading ||
      runs.isLoading ||
      manualAttestations.isLoading ||
      externalValidations.isLoading,
    createSubject,
    createDefinition,
    createRun,
    createManualAttestation,
    updateManualAttestation,
    createExternalValidation,
    updateExternalValidation,
    evaluateRun,
  };
}
