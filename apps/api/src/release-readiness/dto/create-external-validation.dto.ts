import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

const VALIDATION_TYPES = [
  'onc_acb',
  'onc_atl',
  'partner',
  'legal',
  'compliance',
  'security',
] as const;

export class CreateExternalValidationDto {
  @IsString()
  releaseRunId!: string;

  @IsString()
  validationKey!: string;

  @IsIn(VALIDATION_TYPES)
  type!: (typeof VALIDATION_TYPES)[number];

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  authority?: string;

  @IsOptional()
  @IsString()
  referenceId?: string;

  @IsOptional()
  @IsString()
  artifactUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  validFrom?: string;

  @IsOptional()
  @IsDateString()
  validTo?: string;
}
