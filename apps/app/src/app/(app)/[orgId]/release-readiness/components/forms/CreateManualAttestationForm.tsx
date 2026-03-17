'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@trycompai/design-system';
import { type UseFormRegisterReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { normalizeOptionalString } from './form-helpers';

const manualAttestationSchema = z.object({
  approvalKey: z.string().trim().min(1, 'Approval key is required'),
  title: z.string().trim().min(1, 'Title is required'),
  requirementId: z.string(),
  approverId: z.string(),
  notes: z.string(),
  expiresAt: z.string(),
});

type ManualAttestationFormValues = z.infer<typeof manualAttestationSchema>;

export type CreateManualAttestationInput = {
  approvalKey: string;
  title: string;
  requirementId?: string;
  approverId?: string;
  notes?: string;
  expiresAt?: string;
};

type CreateManualAttestationFormProps = {
  onSubmit: (input: CreateManualAttestationInput) => Promise<void>;
};

export function CreateManualAttestationForm({
  onSubmit,
}: CreateManualAttestationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ManualAttestationFormValues>({
    resolver: zodResolver(manualAttestationSchema),
    defaultValues: {
      approvalKey: '',
      title: '',
      requirementId: '',
      approverId: '',
      notes: '',
      expiresAt: '',
    },
  });

  const handleCreate = async (values: ManualAttestationFormValues) => {
    await onSubmit({
      approvalKey: values.approvalKey.trim(),
      title: values.title.trim(),
      requirementId: normalizeOptionalString(values.requirementId),
      approverId: normalizeOptionalString(values.approverId),
      notes: normalizeOptionalString(values.notes),
      expiresAt: normalizeOptionalString(values.expiresAt),
    });

    reset();
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(handleCreate)}>
      <LabeledInput
        id="manual-approval-key"
        label="Approval key"
        register={register('approvalKey')}
        error={errors.approvalKey?.message}
      />
      <LabeledInput
        id="manual-title"
        label="Title"
        register={register('title')}
        error={errors.title?.message}
      />
      <LabeledInput
        id="manual-requirement-id"
        label="Requirement ID"
        register={register('requirementId')}
      />
      <LabeledInput
        id="manual-approver-id"
        label="Approver ID"
        register={register('approverId')}
      />
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="manual-notes">
          Notes
        </label>
        <Textarea id="manual-notes" aria-label="Notes" {...register('notes')} />
      </div>
      <LabeledInput
        id="manual-expires-at"
        label="Expires at (ISO)"
        register={register('expiresAt')}
      />

      <div>
        <Button type="submit" loading={isSubmitting}>
          Create attestation
        </Button>
      </div>
    </form>
  );
}

function LabeledInput({
  id,
  label,
  register,
  error,
}: {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <Input id={id} aria-label={label} {...register} />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
