'use client';

import { apiClient } from '@/lib/api-client';
import useSWR from 'swr';
import type { HealthOSWizardDefaults } from '../types';

async function fetchWizardDefaults(
  endpoint: string,
  organizationId: string,
): Promise<HealthOSWizardDefaults> {
  const response = await apiClient.get<HealthOSWizardDefaults>(
    endpoint,
    organizationId,
  );

  if (response.error || !response.data) {
    throw new Error(response.error ?? 'Failed to load wizard defaults');
  }

  return response.data;
}

export function useHealthOSWizardDefaults(organizationId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ['/v1/release-readiness/wizard/defaults', organizationId] as const,
    ([endpoint, orgId]) => fetchWizardDefaults(endpoint, orgId),
  );

  return {
    defaults: data,
    error: error instanceof Error ? error.message : undefined,
    isLoading,
    refresh: mutate,
  };
}
