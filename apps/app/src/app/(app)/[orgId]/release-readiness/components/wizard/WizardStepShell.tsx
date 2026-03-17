'use client';

import { Button } from '@trycompai/design-system';

export function WizardStepShell({
  currentStep,
  totalSteps,
  title,
  description,
  children,
  onBack,
  onNext,
  backDisabled,
  nextDisabled,
}: {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  backDisabled?: boolean;
  nextDisabled?: boolean;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </div>
          <h2 className="mt-1 text-lg font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={backDisabled}
          >
            Back
          </Button>
          <Button type="button" onClick={onNext} disabled={nextDisabled}>
            Next
          </Button>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
