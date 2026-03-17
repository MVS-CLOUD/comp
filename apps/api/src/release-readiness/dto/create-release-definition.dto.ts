import {
  ArrayUnique,
  IsBoolean,
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ReleaseDefinitionCheckBindingDto {
  @IsString()
  checkId!: string;

  @IsString()
  connectionId!: string;

  @IsOptional()
  @IsObject()
  variableOverrides?: Record<string, unknown>;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  freshnessHours?: number;

  @IsOptional()
  @IsBoolean()
  blocking?: boolean;
}

export class CreateReleaseDefinitionDto {
  @IsString()
  releaseSubjectId!: string;

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
  @Type(() => ReleaseDefinitionCheckBindingDto)
  checkBindings?: ReleaseDefinitionCheckBindingDto[];
}
