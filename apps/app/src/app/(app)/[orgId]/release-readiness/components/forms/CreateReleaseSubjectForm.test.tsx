import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@trycompai/design-system', () => ({
  Button: ({
    children,
    loading: _loading,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) => (
    <button {...props}>{children}</button>
  ),
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
  Select: ({
    children,
    value,
    onValueChange,
  }: {
    children: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
  }) => (
    <select
      aria-label="Subject type"
      value={value}
      onChange={(event) => onValueChange?.(event.target.value)}
    >
      {children}
    </select>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectItem: ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: string;
  }) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectValue: () => null,
  Textarea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} />
  ),
}));

import { CreateReleaseSubjectForm } from './CreateReleaseSubjectForm';

describe('CreateReleaseSubjectForm', () => {
  it('validates required fields before submit', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<CreateReleaseSubjectForm onSubmit={handleSubmit} />);

    await user.click(screen.getByRole('button', { name: /create subject/i }));

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
  });

  it('submits the normalized subject payload', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(<CreateReleaseSubjectForm onSubmit={handleSubmit} />);

    await user.selectOptions(screen.getByLabelText('Subject type'), 'service');
    await user.type(screen.getByLabelText('Subject name'), 'HealthOS API');
    await user.type(screen.getByLabelText('Description'), 'Primary production API');
    await user.type(screen.getByLabelText('Repository URL'), 'https://github.com/trycompai/healthos');
    await user.type(screen.getByLabelText('Environment'), 'production');
    await user.type(screen.getByLabelText('Service base URL'), 'https://api.healthos.io');
    await user.type(screen.getByLabelText('FHIR base URL'), 'https://developer.healthos.io/fhir');
    await user.type(screen.getByLabelText('Partner profile'), 'dosespot');

    await user.click(screen.getByRole('button', { name: /create subject/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        type: 'service',
        name: 'HealthOS API',
        description: 'Primary production API',
        repositoryUrl: 'https://github.com/trycompai/healthos',
        environment: 'production',
        serviceBaseUrl: 'https://api.healthos.io',
        fhirBaseUrl: 'https://developer.healthos.io/fhir',
        partnerProfile: 'dosespot',
      });
    });
  });
});
