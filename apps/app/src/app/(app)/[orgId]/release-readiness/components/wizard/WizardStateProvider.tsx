'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type WizardStateContextValue = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const WizardStateContext = createContext<WizardStateContextValue | null>(null);

export function WizardStateProvider({
  children,
  initialStep = 0,
}: {
  children: ReactNode;
  initialStep?: number;
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const value = useMemo(
    () => ({
      currentStep,
      setCurrentStep,
    }),
    [currentStep],
  );

  return (
    <WizardStateContext.Provider value={value}>
      {children}
    </WizardStateContext.Provider>
  );
}

export function useWizardState() {
  const context = useContext(WizardStateContext);
  if (!context) {
    throw new Error('useWizardState must be used within WizardStateProvider');
  }
  return context;
}
