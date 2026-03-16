import { IsOptional, IsString } from 'class-validator';

export class CreateReleaseRunDto {
  @IsString()
  releaseDefinitionId!: string;

  @IsString()
  version!: string;

  @IsOptional()
  @IsString()
  commitSha?: string;

  @IsOptional()
  @IsString()
  buildId?: string;
}
