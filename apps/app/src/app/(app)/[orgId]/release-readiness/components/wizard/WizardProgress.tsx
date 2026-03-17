'use client';

type WizardStepSummary = {
  id: string;
  title: string;
  description: string;
};

export function WizardProgress({
  steps,
  currentStep,
  onStepSelect,
}: {
  steps: WizardStepSummary[];
  currentStep: number;
  onStepSelect: (stepIndex: number) => void;
}) {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <button
            key={step.id}
            className={`w-full rounded-md border p-3 text-left ${
              isActive
                ? 'border-foreground bg-background'
                : isComplete
                  ? 'border-border bg-muted/30'
                  : 'border-border bg-card'
            }`}
            onClick={() => onStepSelect(index)}
            type="button"
          >
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Step {index + 1}
            </div>
            <div className="mt-1 text-sm font-semibold text-foreground">
              {step.title}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {step.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}
