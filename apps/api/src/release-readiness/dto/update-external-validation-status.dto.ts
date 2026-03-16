import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

const VALIDATION_STATUSES = ['active', 'expired', 'rejected'] as const;

export class UpdateExternalValidationStatusDto {
  @IsIn(VALIDATION_STATUSES)
  status!: (typeof VALIDATION_STATUSES)[number];

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
