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

const releaseSubjectSchema = z.object({
  type: z.enum(['application', 'api', 'service', 'integration', 'environment']),
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string(),
  repositoryUrl: z.string(),
  environment: z.string(),
  serviceBaseUrl: z.string(),
  fhirBaseUrl: z.string(),
  partnerProfile: z.string(),
});

type ReleaseSubjectFormValues = z.infer<typeof releaseSubjectSchema>;

export type CreateReleaseSubjectInput = {
  type: ReleaseSubjectFormValues['type'];
  name: string;
  description?: string;
  repositoryUrl?: string;
  environment?: string;
  serviceBaseUrl?: string;
  fhirBaseUrl?: string;
  partnerProfile?: string;
};

type CreateReleaseSubjectFormProps = {
  onSubmit: (input: CreateReleaseSubjectInput) => Promise<void>;
};

export function CreateReleaseSubjectForm({
  onSubmit,
}: CreateReleaseSubjectFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReleaseSubjectFormValues>({
    resolver: zodResolver(releaseSubjectSchema),
    defaultValues: {
      type: 'service',
      name: '',
      description: '',
      repositoryUrl: '',
      environment: '',
      serviceBaseUrl: '',
      fhirBaseUrl: '',
      partnerProfile: '',
    },
  });

  const handleCreateSubject = async (values: ReleaseSubjectFormValues) => {
    await onSubmit({
      type: values.type,
      name: values.name.trim(),
      description: normalizeOptionalString(values.description),
      repositoryUrl: normalizeOptionalString(values.repositoryUrl),
      environment: normalizeOptionalString(values.environment),
      serviceBaseUrl: normalizeOptionalString(values.serviceBaseUrl),
      fhirBaseUrl: normalizeOptionalString(values.fhirBaseUrl),
      partnerProfile: normalizeOptionalString(values.partnerProfile),
    });

    reset({
      ...values,
      name: '',
      description: '',
      repositoryUrl: '',
      environment: '',
      serviceBaseUrl: '',
      fhirBaseUrl: '',
      partnerProfile: '',
    });
  };

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit(handleCreateSubject)}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="subject-type">
          Subject type
        </label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="subject-type" aria-label="Subject type">
                <SelectValue placeholder="Select subject type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="application">Application</SelectItem>
                <SelectItem value="integration">Integration</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="subject-name">
          Subject name
        </label>
        <Input id="subject-name" aria-label="Subject name" {...register('name')} />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="subject-description">
          Description
        </label>
        <Textarea
          id="subject-description"
          aria-label="Description"
          {...register('description')}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <LabeledInput
          id="subject-repository-url"
          label="Repository URL"
          ariaLabel="Repository URL"
          register={register('repositoryUrl')}
        />
        <LabeledInput
          id="subject-environment"
          label="Environment"
          ariaLabel="Environment"
          register={register('environment')}
        />
        <LabeledInput
          id="subject-service-base-url"
          label="Service base URL"
          ariaLabel="Service base URL"
          register={register('serviceBaseUrl')}
        />
        <LabeledInput
          id="subject-fhir-base-url"
          label="FHIR base URL"
          ariaLabel="FHIR base URL"
          register={register('fhirBaseUrl')}
        />
        <LabeledInput
          id="subject-partner-profile"
          label="Partner profile"
          ariaLabel="Partner profile"
          register={register('partnerProfile')}
        />
      </div>

      <div>
        <Button type="submit" loading={isSubmitting}>
          Create subject
        </Button>
      </div>
    </form>
  );
}

function LabeledInput({
  id,
  label,
  ariaLabel,
  register,
}: {
  id: string;
  label: string;
  ariaLabel: string;
  register: UseFormRegisterReturn;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <Input id={id} aria-label={ariaLabel} {...register} />
    </div>
  );
}
