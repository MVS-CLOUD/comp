'use client';

import { Button } from '@trycompai/design-system';
import type { CreateExternalValidationInput as ReleaseValidationFormInput } from './forms/CreateExternalValidationForm';
import { CreateExternalValidationForm } from './forms/CreateExternalValidationForm';
import type { CreateManualAttestationInput as ReleaseAttestationFormInput } from './forms/CreateManualAttestationForm';
import { CreateManualAttestationForm } from './forms/CreateManualAttestationForm';
import type {
  ExternalValidation,
  ManualAttestation,
  ReleaseGateEvaluation,
  ReleaseRun,
} from '../types';

type ReleaseRunPanelProps = {
  run: ReleaseRun | null;
  manualAttestations: ManualAttestation[];
  externalValidations: ExternalValidation[];
  canCreate: boolean;
  canUpdate: boolean;
  onCreateManualAttestation: (
    input: ReleaseAttestationFormInput & { releaseRunId: string },
  ) => Promise<void>;
  onCreateExternalValidation: (
    input: ReleaseValidationFormInput & { releaseRunId: string },
  ) => Promise<void>;
  onUpdateManualAttestation: (
    attestationId: string,
    status: 'approved' | 'rejected',
  ) => Promise<void>;
  onUpdateExternalValidation: (
    validationId: string,
    status: 'approved' | 'rejected',
  ) => Promise<void>;
  onEvaluate: (runId: string) => Promise<ReleaseGateEvaluation>;
  evaluation: ReleaseGateEvaluation | null;
  isEvaluating: boolean;
};

export function ReleaseRunPanel({
  run,
  manualAttestations,
  externalValidations,
  canCreate,
  canUpdate,
  onCreateManualAttestation,
  onCreateExternalValidation,
  onUpdateManualAttestation,
  onUpdateExternalValidation,
  onEvaluate,
  evaluation,
  isEvaluating,
}: ReleaseRunPanelProps) {
  if (!run) {
    return (
      <section className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-base font-semibold text-foreground">Selected release run</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Create or select a release run to manage attestations, validations, and gate evaluation.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">{run.version}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Status: {run.status}
            {run.commitSha ? ` • ${run.commitSha}` : ''}
            {run.buildId ? ` • ${run.buildId}` : ''}
          </p>
        </div>
        {canUpdate ? (
          <div>
            <Button loading={isEvaluating} onClick={() => onEvaluate(run.id)}>
              Evaluate run
            </Button>
          </div>
        ) : null}
      </div>

      {evaluation ? <EvaluationSummary evaluation={evaluation} /> : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <SectionHeader title="Manual attestations" />
          {canCreate ? (
            <CreateManualAttestationForm
              onSubmit={(input) => onCreateManualAttestation({ ...input, releaseRunId: run.id })}
            />
          ) : null}
          <StatusList
            emptyLabel="No manual attestations have been created yet."
            items={manualAttestations.map((attestation) => ({
              id: attestation.id,
              title: attestation.title,
              subtitle: `${attestation.approvalKey}${attestation.status ? ` • ${attestation.status}` : ''}`,
              notes: attestation.notes,
            }))}
            canUpdate={canUpdate}
            onApprove={(id) => onUpdateManualAttestation(id, 'approved')}
            onReject={(id) => onUpdateManualAttestation(id, 'rejected')}
          />
        </div>

        <div className="space-y-4">
          <SectionHeader title="External validations" />
          {canCreate ? (
            <CreateExternalValidationForm
              onSubmit={(input) =>
                onCreateExternalValidation({ ...input, releaseRunId: run.id })
              }
            />
          ) : null}
          <StatusList
            emptyLabel="No external validations have been created yet."
            items={externalValidations.map((validation) => ({
              id: validation.id,
              title: validation.title,
              subtitle: `${validation.validationKey}${validation.status ? ` • ${validation.status}` : ''}`,
              notes: validation.notes,
            }))}
            canUpdate={canUpdate}
            onApprove={(id) => onUpdateExternalValidation(id, 'approved')}
            onReject={(id) => onUpdateExternalValidation(id, 'rejected')}
          />
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <h3 className="text-sm font-semibold text-foreground">{title}</h3>;
}

function StatusList({
  items,
  emptyLabel,
  canUpdate,
  onApprove,
  onReject,
}: {
  items: Array<{ id: string; title: string; subtitle: string; notes: string | null }>;
  emptyLabel: string;
  canUpdate: boolean;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-md border border-border bg-background p-3">
          <div className="text-sm font-medium text-foreground">{item.title}</div>
          <div className="mt-1 text-xs text-muted-foreground">{item.subtitle}</div>
          {item.notes ? (
            <p className="mt-2 text-sm text-muted-foreground">{item.notes}</p>
          ) : null}
          {canUpdate ? (
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={() => onApprove(item.id)}>
                Approve
              </Button>
              <Button variant="outline" size="sm" onClick={() => onReject(item.id)}>
                Reject
              </Button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function EvaluationSummary({
  evaluation,
}: {
  evaluation: ReleaseGateEvaluation;
}) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <div className="text-sm font-semibold text-foreground">
        Gate decision: {evaluation.decision}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{evaluation.summary}</p>
      <div className="mt-3 text-xs text-muted-foreground">
        Missing frameworks: {evaluation.blockingReasons.missingFrameworkCount}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        Missing checks: {evaluation.blockingReasons.missingCheckIds.join(', ') || 'None'}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        Blocking approvals: {evaluation.blockingReasons.blockingApprovalKeys.join(', ') || 'None'}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        Blocking validations:{' '}
        {evaluation.blockingReasons.blockingExternalValidationKeys.join(', ') || 'None'}
      </div>
    </div>
  );
}
