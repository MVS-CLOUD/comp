import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class WizardSubjectDto {
  @IsIn(['application', 'api', 'service', 'integration', 'environment'])
  type!: 'application' | 'api' | 'service' | 'integration' | 'environment';

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

class WizardCheckBindingDto {
  @IsString()
  checkId!: string;

  @IsString()
  connectionId!: string;

  @IsOptional()
  @IsObject()
  variableOverrides?: Record<string, unknown>;
}

class WizardDefinitionDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  requiredFrameworkIds?: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  requiredCheckIds?: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  requiredApprovalKeys?: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  requiredExternalValidationKeys?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WizardCheckBindingDto)
  checkBindings?: WizardCheckBindingDto[];
}

class WizardRunDto {
  @IsString()
  version!: string;

  @IsOptional()
  @IsString()
  commitSha?: string;

  @IsOptional()
  @IsString()
  buildId?: string;
}

class WizardValidatorArtifactDto {
  @IsString()
  artifactType!: string;

  @IsString()
  artifactUrl!: string;

  @IsOptional()
  @IsString()
  validationKey?: string;

  @IsOptional()
  @IsString()
  authority?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  validTo?: string;
}

export class OrchestrateHealthOSWizardDto {
  @IsOptional()
  @IsBoolean()
  installHealthcareFrameworks?: boolean;

  @IsOptional()
  @IsString()
  releaseSubjectId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => WizardSubjectDto)
  subject?: WizardSubjectDto;

  @IsOptional()
  @IsString()
  releaseDefinitionId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => WizardDefinitionDto)
  definition?: WizardDefinitionDto;

  @ValidateNested()
  @Type(() => WizardRunDto)
  run!: WizardRunDto;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  approvalKeys?: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  checkIds?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WizardValidatorArtifactDto)
  validatorArtifacts?: WizardValidatorArtifactDto[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  automationIds?: string[];

  @IsOptional()
  @IsBoolean()
  notify?: boolean;
}
