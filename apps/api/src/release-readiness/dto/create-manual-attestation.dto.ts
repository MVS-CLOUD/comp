import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateManualAttestationDto {
  @IsString()
  releaseRunId!: string;

  @IsString()
  approvalKey!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  requirementId?: string;

  @IsOptional()
  @IsString()
  approverId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
