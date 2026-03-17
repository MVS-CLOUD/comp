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
      aria-label="Release subject"
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

import { CreateReleaseDefinitionForm } from './CreateReleaseDefinitionForm';

describe('CreateReleaseDefinitionForm', () => {
  it('parses list fields into unique string arrays before submit', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <CreateReleaseDefinitionForm
        onSubmit={handleSubmit}
        subjects={[
          {
            id: 'subj_1',
            name: 'HealthOS API',
          },
        ]}
      />,
    );

    await user.selectOptions(screen.getByLabelText('Release subject'), 'subj_1');
    await user.type(screen.getByLabelText('Definition name'), 'healthos-production-gate');
    await user.type(screen.getByLabelText('Required framework IDs'), 'frk_one, frk_two\nfrk_one');
    await user.type(screen.getByLabelText('Required check IDs'), 'smart_configuration\ncapability_statement');
    await user.type(screen.getByLabelText('Required approval keys'), 'security_signoff, compliance_signoff');
    await user.type(
      screen.getByLabelText('Required external validation keys'),
      'onc_evidence_packet\npartner_validation_packet',
    );

    await user.click(screen.getByRole('button', { name: /create definition/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        releaseSubjectId: 'subj_1',
        name: 'healthos-production-gate',
        description: undefined,
        requiredFrameworkIds: ['frk_one', 'frk_two'],
        requiredCheckIds: ['smart_configuration', 'capability_statement'],
        requiredApprovalKeys: ['security_signoff', 'compliance_signoff'],
        requiredExternalValidationKeys: [
          'onc_evidence_packet',
          'partner_validation_packet',
        ],
      });
    });
  });
});
