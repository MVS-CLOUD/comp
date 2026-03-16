import { IsIn, IsOptional, IsString } from 'class-validator';

const SUBJECT_TYPES = [
  'application',
  'api',
  'service',
  'integration',
  'environment',
] as const;

export class CreateReleaseSubjectDto {
  @IsIn(SUBJECT_TYPES)
  type!: (typeof SUBJECT_TYPES)[number];

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  repositoryUrl?: string;

  @IsOptional()
  @IsString()
  environment?: string;

  @IsOptional()
  @IsString()
  serviceBaseUrl?: string;

  @IsOptional()
  @IsString()
  fhirBaseUrl?: string;

  @IsOptional()
  @IsString()
  partnerProfile?: string;
}
