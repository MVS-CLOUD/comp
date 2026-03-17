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
import { normalizeOptionalString, parseListField } from './form-helpers';

const releaseDefinitionSchema = z.object({
  releaseSubjectId: z.string().trim().min(1, 'Release subject is required'),
  name: z.string().trim().min(1, 'Definition name is required'),
  description: z.string(),
  requiredFrameworkIds: z.string(),
  requiredCheckIds: z.string(),
  requiredApprovalKeys: z.string(),
  requiredExternalValidationKeys: z.string(),
});

type ReleaseDefinitionFormValues = z.infer<typeof releaseDefinitionSchema>;

export type CreateReleaseDefinitionInput = {
  releaseSubjectId: string;
  name: string;
  description?: string;
  requiredFrameworkIds?: string[];
  requiredCheckIds?: string[];
  requiredApprovalKeys?: string[];
  requiredExternalValidationKeys?: string[];
  checkBindings?: Array<{
    checkId: string;
    connectionId: string;
    variableOverrides?: Record<string, unknown>;
  }>;
};

type CreateReleaseDefinitionFormProps = {
  subjects: Array<{ id: string; name: string }>;
  onSubmit: (input: CreateReleaseDefinitionInput) => Promise<void>;
};

export function CreateReleaseDefinitionForm({
  subjects,
  onSubmit,
}: CreateReleaseDefinitionFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReleaseDefinitionFormValues>({
    resolver: zodResolver(releaseDefinitionSchema),
    defaultValues: {
      releaseSubjectId: subjects[0]?.id ?? '',
      name: '',
      description: '',
      requiredFrameworkIds: '',
      requiredCheckIds: '',
      requiredApprovalKeys: '',
      requiredExternalValidationKeys: '',
    },
  });

  const handleCreateDefinition = async (
    values: ReleaseDefinitionFormValues,
  ) => {
    await onSubmit({
      releaseSubjectId: values.releaseSubjectId,
      name: values.name.trim(),
      description: normalizeOptionalString(values.description),
      requiredFrameworkIds: parseOptionalList(values.requiredFrameworkIds),
      requiredCheckIds: parseOptionalList(values.requiredCheckIds),
      requiredApprovalKeys: parseOptionalList(values.requiredApprovalKeys),
      requiredExternalValidationKeys: parseOptionalList(
        values.requiredExternalValidationKeys,
      ),
    });

    reset({
      ...values,
      name: '',
      description: '',
      requiredFrameworkIds: '',
      requiredCheckIds: '',
      requiredApprovalKeys: '',
      requiredExternalValidationKeys: '',
    });
  };

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit(handleCreateDefinition)}
    >
      <div className="space-y-2">
        <label
          className="text-sm font-medium text-foreground"
          htmlFor="release-subject-id"
        >
          Release subject
        </label>
        <Controller
          name="releaseSubjectId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="release-subject-id" aria-label="Release subject">
                <SelectValue placeholder="Select release subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.releaseSubjectId ? (
          <p className="text-sm text-destructive">
            {errors.releaseSubjectId.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-foreground"
          htmlFor="release-definition-name"
        >
          Definition name
        </label>
        <Input
          id="release-definition-name"
          aria-label="Definition name"
          {...register('name')}
        />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-foreground"
          htmlFor="release-definition-description"
        >
          Description
        </label>
        <Textarea
          id="release-definition-description"
          aria-label="Description"
          {...register('description')}
        />
      </div>

      <ListTextarea
        id="required-framework-ids"
        label="Required framework IDs"
        register={register('requiredFrameworkIds')}
      />
      <ListTextarea
        id="required-check-ids"
        label="Required check IDs"
        register={register('requiredCheckIds')}
      />
      <ListTextarea
        id="required-approval-keys"
        label="Required approval keys"
        register={register('requiredApprovalKeys')}
      />
      <ListTextarea
        id="required-external-validation-keys"
        label="Required external validation keys"
        register={register('requiredExternalValidationKeys')}
      />

      <div>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={subjects.length === 0}
        >
          Create definition
        </Button>
      </div>
    </form>
  );
}

function ListTextarea({
  id,
  label,
  register,
}: {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <Textarea
        id={id}
        aria-label={label}
        placeholder="Enter one per line or separate with commas"
        {...register}
      />
    </div>
  );
}

function parseOptionalList(value: string): string[] | undefined {
  const items = parseListField(value);
  return items.length > 0 ? items : undefined;
}
