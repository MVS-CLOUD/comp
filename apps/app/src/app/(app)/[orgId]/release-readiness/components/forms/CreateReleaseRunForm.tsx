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
} from '@trycompai/design-system';
import { Controller, type UseFormRegisterReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { normalizeOptionalString } from './form-helpers';

const releaseRunSchema = z.object({
  releaseDefinitionId: z.string().trim().min(1, 'Release definition is required'),
  version: z.string().trim().min(1, 'Version is required'),
  commitSha: z.string(),
  buildId: z.string(),
});

type ReleaseRunFormValues = z.infer<typeof releaseRunSchema>;

export type CreateReleaseRunInput = {
  releaseDefinitionId: string;
  version: string;
  commitSha?: string;
  buildId?: string;
};

type CreateReleaseRunFormProps = {
  definitions: Array<{ id: string; name: string }>;
  onSubmit: (input: CreateReleaseRunInput) => Promise<void>;
};

export function CreateReleaseRunForm({
  definitions,
  onSubmit,
}: CreateReleaseRunFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReleaseRunFormValues>({
    resolver: zodResolver(releaseRunSchema),
    defaultValues: {
      releaseDefinitionId: definitions[0]?.id ?? '',
      version: '',
      commitSha: '',
      buildId: '',
    },
  });

  const handleCreateRun = async (values: ReleaseRunFormValues) => {
    await onSubmit({
      releaseDefinitionId: values.releaseDefinitionId,
      version: values.version.trim(),
      commitSha: normalizeOptionalString(values.commitSha),
      buildId: normalizeOptionalString(values.buildId),
    });

    reset({
      ...values,
      version: '',
      commitSha: '',
      buildId: '',
    });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(handleCreateRun)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="release-definition-id">
          Release definition
        </label>
        <Controller
          name="releaseDefinitionId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="release-definition-id">
                <SelectValue placeholder="Select release definition" />
              </SelectTrigger>
              <SelectContent>
                {definitions.map((definition) => (
                  <SelectItem key={definition.id} value={definition.id}>
                    {definition.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.releaseDefinitionId ? (
          <p className="text-sm text-destructive">{errors.releaseDefinitionId.message}</p>
        ) : null}
      </div>

      <LabeledInput
        id="release-version"
        label="Version"
        register={register('version')}
        error={errors.version?.message}
      />
      <LabeledInput
        id="release-commit-sha"
        label="Commit SHA"
        register={register('commitSha')}
      />
      <LabeledInput
        id="release-build-id"
        label="Build ID"
        register={register('buildId')}
      />

      <div>
        <Button type="submit" loading={isSubmitting} disabled={definitions.length === 0}>
          Create run
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
