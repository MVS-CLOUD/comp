import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

const ATTESTATION_STATUSES = ['approved', 'rejected', 'expired'] as const;

export class UpdateManualAttestationStatusDto {
  @IsIn(ATTESTATION_STATUSES)
  status!: (typeof ATTESTATION_STATUSES)[number];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
