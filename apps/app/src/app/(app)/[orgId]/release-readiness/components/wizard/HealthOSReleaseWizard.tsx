'use client';

import { WizardProgress } from './WizardProgress';
import { WizardStateProvider, useWizardState } from './WizardStateProvider';
import { WizardStepShell } from './WizardStepShell';

export type WizardStep = {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
};

export function HealthOSReleaseWizard({
  steps,
}: {
  steps: WizardStep[];
}) {
  return (
    <WizardStateProvider>
      <HealthOSReleaseWizardContent steps={steps} />
    </WizardStateProvider>
  );
}

function HealthOSReleaseWizardContent({
  steps,
}: {
  steps: WizardStep[];
}) {
  const { currentStep, setCurrentStep } = useWizardState();
  const step = steps[currentStep];

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-base font-semibold text-foreground">HealthOS release wizard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Guided setup for recurring HealthOS release readiness.
        </p>
        <div className="mt-4">
          <WizardProgress
            steps={steps}
            currentStep={currentStep}
            onStepSelect={setCurrentStep}
          />
        </div>
      </aside>

      <WizardStepShell
        currentStep={currentStep}
        totalSteps={steps.length}
        title={step.title}
        description={step.description}
        onBack={() => setCurrentStep(Math.max(0, currentStep - 1))}
        onNext={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
        backDisabled={currentStep === 0}
        nextDisabled={currentStep === steps.length - 1}
      >
        {step.content}
      </WizardStepShell>
    </div>
  );
}
