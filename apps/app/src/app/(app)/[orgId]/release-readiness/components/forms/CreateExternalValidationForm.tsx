'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@trycompai/design-system';
import { Controller, type UseFormRegisterReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { normalizeOptionalString } from './form-helpers';

const externalValidationSchema = z.object({
  validationKey: z.string().trim().min(1, 'Validation key is required'),
  type: z.enum(['onc_acb', 'onc_atl', 'partner', 'legal', 'compliance', 'security']),
  title: z.string().trim().min(1, 'Title is required'),
  authority: z.string(),
  referenceId: z.string(),
  artifactUrl: z.string(),
  notes: z.string(),
  validFrom: z.string(),
  validTo: z.string(),
});

type ExternalValidationFormValues = z.infer<typeof externalValidationSchema>;

export type CreateExternalValidationInput = {
  validationKey: string;
  type: ExternalValidationFormValues['type'];
  title: string;
  authority?: string;
  referenceId?: string;
  artifactUrl?: string;
  notes?: string;
  validFrom?: string;
  validTo?: string;
};

type CreateExternalValidationFormProps = {
  onSubmit: (input: CreateExternalValidationInput) => Promise<void>;
};

export function CreateExternalValidationForm({
  onSubmit,
}: CreateExternalValidationFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExternalValidationFormValues>({
    resolver: zodResolver(externalValidationSchema),
    defaultValues: {
      validationKey: '',
      type: 'partner',
      title: '',
      authority: '',
      referenceId: '',
      artifactUrl: '',
      notes: '',
      validFrom: '',
      validTo: '',
    },
  });

  const handleCreate = async (values: ExternalValidationFormValues) => {
    await onSubmit({
      validationKey: values.validationKey.trim(),
      type: values.type,
      title: values.title.trim(),
      authority: normalizeOptionalString(values.authority),
      referenceId: normalizeOptionalString(values.referenceId),
      artifactUrl: normalizeOptionalString(values.artifactUrl),
      notes: normalizeOptionalString(values.notes),
      validFrom: normalizeOptionalString(values.validFrom),
      validTo: normalizeOptionalString(values.validTo),
    });

    reset({
      ...values,
      validationKey: '',
      title: '',
      authority: '',
      referenceId: '',
      artifactUrl: '',
      notes: '',
      validFrom: '',
      validTo: '',
    });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(handleCreate)}>
      <LabeledInput
        id="external-validation-key"
        label="Validation key"
        register={register('validationKey')}
        error={errors.validationKey?.message}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="external-type">
          Validation type
        </label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="external-type">
                <SelectValue placeholder="Select validation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="onc_atl">ONC ATL</SelectItem>
                <SelectItem value="onc_acb">ONC ACB</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <LabeledInput
        id="external-title"
        label="Title"
        register={register('title')}
        error={errors.title?.message}
      />
      <LabeledInput
        id="external-authority"
        label="Authority"
        register={register('authority')}
      />
      <LabeledInput
        id="external-reference-id"
        label="Reference ID"
        register={register('referenceId')}
      />
      <LabeledInput
        id="external-artifact-url"
        label="Artifact URL"
        register={register('artifactUrl')}
      />
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="external-notes">
          Notes
        </label>
        <Textarea id="external-notes" aria-label="Notes" {...register('notes')} />
      </div>
      <LabeledInput
        id="external-valid-from"
        label="Valid from (ISO)"
        register={register('validFrom')}
      />
      <LabeledInput
        id="external-valid-to"
        label="Valid to (ISO)"
        register={register('validTo')}
      />

      <div>
        <Button type="submit" loading={isSubmitting}>
          Create validation
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
