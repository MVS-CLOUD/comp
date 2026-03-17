'use client';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@trycompai/design-system';
import { useEffect, useState } from 'react';
import type { HealthOSWizardDefaults, ReleaseSubject } from '../../types';
import type { CreateReleaseDefinitionInput } from '../forms/CreateReleaseDefinitionForm';
import type { CreateReleaseSubjectInput } from '../forms/CreateReleaseSubjectForm';
import { CreateReleaseDefinitionForm } from '../forms/CreateReleaseDefinitionForm';
import { CreateReleaseSubjectForm } from '../forms/CreateReleaseSubjectForm';

type HealthOSPresetStepProps = {
  defaults?: HealthOSWizardDefaults;
  subjects: ReleaseSubject[];
  canCreate: boolean;
  onCreateDefaultSubject: (input: CreateReleaseSubjectInput) => Promise<void>;
  onCreateDefaultDefinition: (
    subjectId: string,
    input: CreateReleaseDefinitionInput,
  ) => Promise<void>;
  onCreateCustomSubject: (input: CreateReleaseSubjectInput) => Promise<void>;
  onCreateCustomDefinition: (input: CreateReleaseDefinitionInput) => Promise<void>;
};

export function HealthOSPresetStep({
  defaults,
  subjects,
  canCreate,
  onCreateDefaultSubject,
  onCreateDefaultDefinition,
  onCreateCustomSubject,
  onCreateCustomDefinition,
}: HealthOSPresetStepProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');

  useEffect(() => {
    if (!selectedSubjectId && subjects[0]?.id) {
      setSelectedSubjectId(subjects[0].id);
    }
  }, [selectedSubjectId, subjects]);

  if (!canCreate) {
    return (
      <p className="text-sm text-muted-foreground">
        You need `framework:create` permission to use the guided HealthOS setup.
      </p>
    );
  }

  const defaultDefinition = defaults?.definitionDefaults;
  const defaultSubject = defaults?.subjectDefaults;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-base font-semibold text-foreground">
          Standard HealthOS setup
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Use the guided defaults to create the standard HealthOS subject and
          release definition without typing framework IDs or check IDs manually.
        </p>

        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          <div className="rounded-md border border-border bg-background p-3">
            <div className="text-sm font-medium text-foreground">
              Recommended subject
            </div>
            {defaultSubject ? (
              <>
                <div className="mt-2 text-xs text-muted-foreground">
                  {defaultSubject.name} • {defaultSubject.type} •{' '}
                  {defaultSubject.environment ?? 'environment not set'}
                </div>
                <div className="mt-3">
                  <Button
                    type="button"
                    onClick={() => onCreateDefaultSubject(defaultSubject)}
                  >
                    Create recommended subject
                  </Button>
                </div>
              </>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                Wizard defaults are not available yet.
              </p>
            )}
          </div>

          <div className="rounded-md border border-border bg-background p-3">
            <div className="text-sm font-medium text-foreground">
              Recommended release definition
            </div>
            {defaultDefinition ? (
              <>
                <div className="mt-2 text-xs text-muted-foreground">
                  Frameworks: {defaultDefinition.requiredFrameworkIds.length}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Checks: {defaultDefinition.requiredCheckIds.length}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Approvals: {defaultDefinition.requiredApprovalKeys.length}
                </div>
                <div className="mt-3 space-y-2">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="preset-subject"
                  >
                    Attach to subject
                  </label>
                  <Select
                    value={selectedSubjectId}
                    onValueChange={(value) => setSelectedSubjectId(value ?? '')}
                  >
                    <SelectTrigger id="preset-subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-3">
                  <Button
                    type="button"
                    onClick={() =>
                      onCreateDefaultDefinition(selectedSubjectId, {
                        releaseSubjectId: selectedSubjectId,
                        name: defaultDefinition.name,
                        requiredFrameworkIds:
                          defaultDefinition.requiredFrameworkIds,
                        requiredCheckIds: defaultDefinition.requiredCheckIds,
                        requiredApprovalKeys:
                          defaultDefinition.requiredApprovalKeys,
                        requiredExternalValidationKeys:
                          defaultDefinition.requiredExternalValidationKeys,
                        checkBindings:
                          defaultDefinition.suggestedCheckBindings,
                      })
                    }
                    disabled={!selectedSubjectId}
                  >
                    Create standard definition
                  </Button>
                </div>
              </>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                Wizard defaults are not available yet.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Advanced configuration
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Use the raw forms only when the standard HealthOS defaults do not
              match your release model.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvanced((value) => !value)}
          >
            {showAdvanced ? 'Hide advanced' : 'Show advanced'}
          </Button>
        </div>

        {showAdvanced ? (
          <div className="mt-4 grid gap-6 xl:grid-cols-2">
            <div className="rounded-md border border-border bg-background p-3">
              <h4 className="text-sm font-semibold text-foreground">
                Custom subject
              </h4>
              <div className="mt-3">
                <CreateReleaseSubjectForm onSubmit={onCreateCustomSubject} />
              </div>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <h4 className="text-sm font-semibold text-foreground">
                Custom definition
              </h4>
              <div className="mt-3">
                <CreateReleaseDefinitionForm
                  subjects={subjects.map((subject) => ({
                    id: subject.id,
                    name: subject.name,
                  }))}
                  onSubmit={onCreateCustomDefinition}
                />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
