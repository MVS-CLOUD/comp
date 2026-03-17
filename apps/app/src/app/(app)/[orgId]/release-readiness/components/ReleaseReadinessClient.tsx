'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useHealthOSWizardDefaults } from '../hooks/useHealthOSWizardDefaults';
import { useReleaseReadiness } from '../hooks/useReleaseReadiness';
import type {
  HealthcareFramework,
  HealthOSActiveConnection,
  ReleaseDefinition,
  ReleaseGateEvaluation,
  ReleaseRun,
  ReleaseSubject,
} from '../types';
import { CreateReleaseDefinitionForm } from './forms/CreateReleaseDefinitionForm';
import { CreateReleaseRunForm } from './forms/CreateReleaseRunForm';
import { CreateReleaseSubjectForm } from './forms/CreateReleaseSubjectForm';
import { InstallHealthcareFrameworksButton } from './InstallHealthcareFrameworksButton';
import { ReleaseReadinessOverview } from './ReleaseReadinessOverview';
import { ReleaseRunPanel } from './ReleaseRunPanel';
import { HealthOSReleaseWizard } from './wizard/HealthOSReleaseWizard';
import { HealthOSIntegrationsStep } from './wizard/HealthOSIntegrationsStep';
import { HealthOSPresetStep } from './wizard/HealthOSPresetStep';

type ReleaseReadinessClientProps = {
  organizationId: string;
  frameworkLibrary: HealthcareFramework[];
  initialSubjects: ReleaseSubject[];
  initialDefinitions: ReleaseDefinition[];
  initialRuns: ReleaseRun[];
  canCreate: boolean;
  canUpdate: boolean;
  canInstallHealthcareFrameworks: boolean;
};

export function ReleaseReadinessClient({
  organizationId,
  frameworkLibrary,
  initialSubjects,
  initialDefinitions,
  initialRuns,
  canCreate,
  canUpdate,
  canInstallHealthcareFrameworks,
}: ReleaseReadinessClientProps) {
  const [selectedRunId, setSelectedRunId] = useState<string | null>(
    initialRuns[0]?.id ?? null,
  );
  const [evaluation, setEvaluation] = useState<ReleaseGateEvaluation | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const {
    subjects,
    definitions,
    runs,
    manualAttestations,
    externalValidations,
    createSubject,
    createDefinition,
    createRun,
    createManualAttestation,
    updateManualAttestation,
    createExternalValidation,
    updateExternalValidation,
    evaluateRun,
  } = useReleaseReadiness({
    organizationId,
    initialSubjects,
    initialDefinitions,
    initialRuns,
    selectedRunId,
  });
  const {
    defaults,
    error: defaultsError,
    isLoading: defaultsLoading,
  } = useHealthOSWizardDefaults(organizationId);

  useEffect(() => {
    if (!selectedRunId && runs[0]?.id) {
      setSelectedRunId(runs[0].id);
      return;
    }

    if (selectedRunId && !runs.some((run) => run.id === selectedRunId)) {
      setSelectedRunId(runs[0]?.id ?? null);
    }
  }, [runs, selectedRunId]);

  const selectedRun = useMemo(
    () => runs.find((run) => run.id === selectedRunId) ?? null,
    [runs, selectedRunId],
  );

  const handleAsyncAction = async (
    action: () => Promise<void>,
    successMessage: string,
  ) => {
    try {
      await action();
      toast.success(successMessage);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Request failed');
    }
  };

  return (
    <HealthOSReleaseWizard
      steps={[
        {
          id: 'overview',
          title: 'Overview',
          description:
            'Install the healthcare pack and confirm the HealthOS defaults and connection readiness.',
          content: (
            <div className="space-y-6">
              <section className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-base font-semibold text-foreground">
                  Native healthcare framework library
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  These frameworks are seeded into the framework editor path and
                  can be instantiated into the current organization.
                </p>
                {canInstallHealthcareFrameworks ? (
                  <div className="mt-4">
                    <InstallHealthcareFrameworksButton organizationId={organizationId} />
                  </div>
                ) : null}
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {frameworkLibrary.map((framework) => (
                    <div
                      key={framework.id}
                      className="rounded-md border border-border bg-background p-3"
                    >
                      <div className="text-sm font-medium text-foreground">
                        {framework.name}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {framework.requirements?.length ?? 0} requirements
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <ReleaseReadinessOverview
                frameworkLibrary={frameworkLibrary}
                subjects={subjects}
                definitions={definitions}
                runs={runs}
              />

              <WizardDefaultsSummary
                defaults={defaults}
                defaultsError={defaultsError}
                defaultsLoading={defaultsLoading}
              />
            </div>
          ),
        },
        {
          id: 'connections',
          title: 'Connections',
          description:
            'Connect and configure the HealthOS provider groups required for the standard release gate.',
          content: <HealthOSIntegrationsStep />,
        },
        {
          id: 'setup',
          title: 'Setup',
          description:
            'Create or update the release subject, definition, and release run.',
          content: canCreate ? (
            <div className="space-y-6">
              <HealthOSPresetStep
                defaults={defaults}
                subjects={subjects}
                canCreate={canCreate}
                onCreateDefaultSubject={(input) =>
                  handleAsyncAction(
                    () => createSubject(input).then(() => undefined),
                    'Recommended subject created.',
                  )
                }
                onCreateDefaultDefinition={(subjectId, input) =>
                  handleAsyncAction(
                    () =>
                      createDefinition({
                        ...input,
                        releaseSubjectId: subjectId,
                      }).then(() => undefined),
                    'Standard definition created.',
                  )
                }
                onCreateCustomSubject={(input) =>
                  handleAsyncAction(
                    () => createSubject(input).then(() => undefined),
                    'Release subject created.',
                  )
                }
                onCreateCustomDefinition={(input) =>
                  handleAsyncAction(
                    () => createDefinition(input).then(() => undefined),
                    'Release definition created.',
                  )
                }
              />

              <FormSection title="Create run">
                <CreateReleaseRunForm
                  definitions={definitions.map((definition) => ({
                    id: definition.id,
                    name: definition.name,
                  }))}
                  onSubmit={(input) =>
                    handleAsyncAction(async () => {
                      const run = await createRun(input);
                      setSelectedRunId(run.id);
                    }, 'Release run created.')
                  }
                />
              </FormSection>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              You need `framework:create` permission to create release setup
              objects.
            </p>
          ),
        },
        {
          id: 'review',
          title: 'Review and evaluate',
          description:
            'Select a run, manage approvals and validations, and evaluate the release gate.',
          content: (
            <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">
                    Runs
                  </h3>
                </div>
                <div className="mt-4 space-y-3">
                  {runs.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No release runs have been created yet.
                    </p>
                  ) : (
                    runs.map((run) => (
                      <button
                        key={run.id}
                        className={`w-full rounded-md border p-3 text-left ${
                          run.id === selectedRunId
                            ? 'border-foreground bg-background'
                            : 'border-border bg-background'
                        }`}
                        onClick={() => setSelectedRunId(run.id)}
                        type="button"
                      >
                        <div className="text-sm font-medium text-foreground">
                          {run.version}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {run.status}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              <ReleaseRunPanel
                run={selectedRun}
                manualAttestations={manualAttestations}
                externalValidations={externalValidations}
                canCreate={canCreate}
                canUpdate={canUpdate}
                onCreateManualAttestation={(input) =>
                  handleAsyncAction(
                    () => createManualAttestation(input).then(() => undefined),
                    'Manual attestation created.',
                  )
                }
                onCreateExternalValidation={(input) =>
                  handleAsyncAction(
                    () => createExternalValidation(input).then(() => undefined),
                    'External validation created.',
                  )
                }
                onUpdateManualAttestation={(attestationId, status) =>
                  handleAsyncAction(
                    () =>
                      updateManualAttestation(attestationId, { status }).then(
                        () => undefined,
                      ),
                    `Manual attestation ${status}.`,
                  )
                }
                onUpdateExternalValidation={(validationId, status) =>
                  handleAsyncAction(
                    () =>
                      updateExternalValidation(validationId, { status }).then(
                        () => undefined,
                      ),
                    `External validation ${status}.`,
                  )
                }
                onEvaluate={async (runId) => {
                  setIsEvaluating(true);
                  try {
                    const result = await evaluateRun(runId);
                    setEvaluation(result);
                    toast.success(`Release gate ${result.decision}.`);
                    return result;
                  } catch (error) {
                    toast.error(
                      error instanceof Error ? error.message : 'Evaluation failed',
                    );
                    throw error;
                  } finally {
                    setIsEvaluating(false);
                  }
                }}
                evaluation={evaluation}
                isEvaluating={isEvaluating}
              />
            </section>
          ),
        },
      ]}
    />
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function WizardDefaultsSummary({
  defaults,
  defaultsError,
  defaultsLoading,
}: {
  defaults: ReturnType<typeof useHealthOSWizardDefaults>['defaults'];
  defaultsError?: string;
  defaultsLoading: boolean;
}) {
  if (defaultsLoading) {
    return (
      <section className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-base font-semibold text-foreground">
          HealthOS defaults
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Loading guided defaults...
        </p>
      </section>
    );
  }

  if (defaultsError || !defaults) {
    return (
      <section className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
        <h3 className="text-base font-semibold text-foreground">
          HealthOS defaults unavailable
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {defaultsError ?? 'Unable to load wizard defaults.'}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-base font-semibold text-foreground">
        HealthOS defaults
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        These are the current backend-guided defaults that the full wizard will
        build on.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-border bg-background p-3">
          <div className="text-sm font-medium text-foreground">
            Default release definition
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Frameworks: {defaults.definitionDefaults.requiredFrameworkIds.length}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Checks: {defaults.definitionDefaults.requiredCheckIds.length}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Approvals: {defaults.definitionDefaults.requiredApprovalKeys.join(', ')}
          </div>
        </div>
        <div className="rounded-md border border-border bg-background p-3">
          <div className="text-sm font-medium text-foreground">
            Active HealthOS connections
          </div>
          {defaults.activeConnections.length === 0 ? (
            <p className="mt-2 text-xs text-muted-foreground">
              No active HealthOS provider connections found yet.
            </p>
          ) : (
            <div className="mt-2 space-y-2">
              {defaults.activeConnections.map((connection) => (
                <ConnectionSummary key={connection.id} connection={connection} />
              ))}
            </div>
          )}
          {defaults.readiness.missingProviderSlugs.length > 0 ? (
            <p className="mt-3 text-xs text-destructive">
              Missing providers: {defaults.readiness.missingProviderSlugs.join(', ')}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ConnectionSummary({
  connection,
}: {
  connection: HealthOSActiveConnection;
}) {
  return (
    <div className="rounded border border-border px-2 py-2 text-xs text-muted-foreground">
      <div className="font-medium text-foreground">{connection.providerName}</div>
      <div className="mt-1">{connection.providerSlug}</div>
    </div>
  );
}
