import {
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

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
}
