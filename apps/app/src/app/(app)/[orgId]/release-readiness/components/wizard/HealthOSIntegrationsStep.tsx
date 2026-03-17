'use client';

import { ConnectIntegrationDialog } from '@/components/integrations/ConnectIntegrationDialog';
import { ManageIntegrationDialog } from '@/components/integrations/ManageIntegrationDialog';
import {
  useIntegrationConnections,
  useIntegrationProviders,
  type ConnectionListItem,
  type IntegrationProvider,
} from '@/hooks/use-integration-platform';
import { Button } from '@trycompai/design-system';
import { useState } from 'react';

const HEALTHOS_PROVIDER_ORDER = [
  'healthos-runtime',
  'healthos-documentation',
  'healthos-repo',
  'healthos-ci',
  'healthos-cloud',
  'healthos-partner',
] as const;

export function HealthOSIntegrationsStep() {
  const { providers, isLoading: providersLoading } = useIntegrationProviders(true);
  const {
    connections,
    isLoading: connectionsLoading,
    refresh: refreshConnections,
  } = useIntegrationConnections();
  const [selectedProvider, setSelectedProvider] = useState<IntegrationProvider | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<ConnectionListItem | null>(null);

  const providersById = new Map(providers.map((provider) => [provider.id, provider]));
  const connectionsBySlug = new Map(
    connections.map((connection) => [connection.providerSlug, connection]),
  );

  if (providersLoading || connectionsLoading) {
    return (
      <section className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Loading HealthOS integration readiness...
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="space-y-4">
        {HEALTHOS_PROVIDER_ORDER.map((providerSlug) => {
          const provider = providersById.get(providerSlug);
          const connection = connectionsBySlug.get(providerSlug);

          return (
            <HealthOSIntegrationCard
              key={providerSlug}
              providerSlug={providerSlug}
              provider={provider}
              connection={connection}
              onConnect={() => setSelectedProvider(provider ?? null)}
              onManage={() => setSelectedConnection(connection ?? null)}
            />
          );
        })}
      </section>

      {selectedProvider ? (
        <ConnectIntegrationDialog
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedProvider(null);
            }
          }}
          integrationId={selectedProvider.id}
          integrationName={selectedProvider.name}
          integrationLogoUrl={selectedProvider.logoUrl}
          onConnected={() => {
            refreshConnections();
            setSelectedProvider(null);
          }}
        />
      ) : null}

      {selectedConnection ? (
        <ManageIntegrationDialog
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedConnection(null);
            }
          }}
          connectionId={selectedConnection.id}
          integrationId={selectedConnection.providerSlug}
          integrationName={selectedConnection.providerName}
          integrationLogoUrl={providersById.get(selectedConnection.providerSlug)?.logoUrl ?? ''}
          onSaved={() => {
            refreshConnections();
            setSelectedConnection(null);
          }}
        />
      ) : null}
    </>
  );
}

function HealthOSIntegrationCard({
  providerSlug,
  provider,
  connection,
  onConnect,
  onManage,
}: {
  providerSlug: string;
  provider?: IntegrationProvider;
  connection?: ConnectionListItem;
  onConnect: () => void;
  onManage: () => void;
}) {
  const requiredVariables = provider?.requiredVariables ?? [];
  const variableRecord =
    connection?.variables && typeof connection.variables === 'object'
      ? (connection.variables as Record<string, unknown>)
      : {};
  const missingVariables = requiredVariables.filter((variableId) => !variableRecord[variableId]);
  const isConnected = connection?.status === 'active';
  const isConfigured = isConnected && missingVariables.length === 0;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">
            {provider?.name ?? providerSlug}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {provider?.description ?? 'Provider metadata unavailable.'}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {isConfigured
              ? 'Connected and configured'
              : isConnected
                ? `Connected, missing: ${missingVariables.join(', ')}`
                : 'Not connected'}
          </div>
        </div>

        <div className="flex gap-2">
          {!isConnected ? (
            <Button type="button" onClick={onConnect} disabled={!provider}>
              Connect
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={onManage}>
              Manage
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
