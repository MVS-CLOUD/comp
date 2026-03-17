import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@trycompai/design-system', () => ({
  Button: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

import { HealthOSReleaseWizard } from './HealthOSReleaseWizard';

describe('HealthOSReleaseWizard', () => {
  it('shows the first step and allows moving forward and backward', async () => {
    const user = userEvent.setup();

    render(
      <HealthOSReleaseWizard
        steps={[
          { id: 'overview', title: 'Overview', description: 'Start here', content: <div>Overview step</div> },
          { id: 'setup', title: 'Setup', description: 'Configure defaults', content: <div>Setup step</div> },
          { id: 'review', title: 'Review', description: 'Run and evaluate', content: <div>Review step</div> },
        ]}
      />,
    );

    expect(screen.getByText('Overview step')).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('Setup step')).toBeInTheDocument();
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /back/i }));
    expect(screen.getByText('Overview step')).toBeInTheDocument();
  });

  it('allows direct step selection from the progress list', async () => {
    const user = userEvent.setup();

    render(
      <HealthOSReleaseWizard
        steps={[
          { id: 'overview', title: 'Overview', description: 'Start here', content: <div>Overview step</div> },
          { id: 'setup', title: 'Setup', description: 'Configure defaults', content: <div>Setup step</div> },
        ]}
      />,
    );

    await user.click(screen.getByRole('button', { name: /setup/i }));
    expect(screen.getByText('Setup step')).toBeInTheDocument();
  });
});
