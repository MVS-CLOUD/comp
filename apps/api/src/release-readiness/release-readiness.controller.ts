import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { HybridAuthGuard } from '../auth/hybrid-auth.guard';
import { PermissionGuard } from '../auth/permission.guard';
import { RequirePermission } from '../auth/require-permission.decorator';
import { OrganizationId } from '../auth/auth-context.decorator';
import { ReleaseReadinessService } from './release-readiness.service';
import { CreateReleaseSubjectDto } from './dto/create-release-subject.dto';
import { CreateReleaseDefinitionDto } from './dto/create-release-definition.dto';
import { CreateReleaseRunDto } from './dto/create-release-run.dto';
import { CreateManualAttestationDto } from './dto/create-manual-attestation.dto';
import { CreateExternalValidationDto } from './dto/create-external-validation.dto';
import { UpdateManualAttestationStatusDto } from './dto/update-manual-attestation-status.dto';
import { UpdateExternalValidationStatusDto } from './dto/update-external-validation-status.dto';

@ApiTags('Release Readiness')
@Controller({ path: 'release-readiness', version: '1' })
@UseGuards(HybridAuthGuard, PermissionGuard)
@ApiSecurity('apikey')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class ReleaseReadinessController {
  constructor(
    private readonly releaseReadinessService: ReleaseReadinessService,
  ) {}

  @Get('subjects')
  @RequirePermission('framework', 'read')
  async listSubjects(@OrganizationId() organizationId: string) {
    const data = await this.releaseReadinessService.listSubjects(organizationId);
    return { data, count: data.length };
  }

  @Post('subjects')
  @RequirePermission('framework', 'create')
  async createSubject(
    @OrganizationId() organizationId: string,
    @Body() dto: CreateReleaseSubjectDto,
  ) {
    return this.releaseReadinessService.createSubject(organizationId, dto);
  }

  @Get('definitions')
  @RequirePermission('framework', 'read')
  async listDefinitions(@OrganizationId() organizationId: string) {
    const data = await this.releaseReadinessService.listDefinitions(
      organizationId,
    );
    return { data, count: data.length };
  }

  @Post('definitions')
  @RequirePermission('framework', 'create')
  async createDefinition(
    @OrganizationId() organizationId: string,
    @Body() dto: CreateReleaseDefinitionDto,
  ) {
    return this.releaseReadinessService.createDefinition(organizationId, dto);
  }

  @Get('runs')
  @RequirePermission('framework', 'read')
  async listRuns(@OrganizationId() organizationId: string) {
    const data = await this.releaseReadinessService.listRuns(organizationId);
    return { data, count: data.length };
  }

  @Post('runs')
  @RequirePermission('framework', 'create')
  async createRun(
    @OrganizationId() organizationId: string,
    @Body() dto: CreateReleaseRunDto,
  ) {
    return this.releaseReadinessService.createRun(organizationId, dto);
  }

  @Get('runs/:id/manual-attestations')
  @RequirePermission('framework', 'read')
  async listManualAttestations(
    @OrganizationId() organizationId: string,
    @Param('id') releaseRunId: string,
  ) {
    const data = await this.releaseReadinessService.listManualAttestations(
      organizationId,
      releaseRunId,
    );
    return { data, count: data.length };
  }

  @Post('manual-attestations')
  @RequirePermission('framework', 'create')
  async createManualAttestation(
    @OrganizationId() organizationId: string,
    @Body() dto: CreateManualAttestationDto,
  ) {
    return this.releaseReadinessService.createManualAttestation(
      organizationId,
      dto,
    );
  }

  @Patch('manual-attestations/:id')
  @RequirePermission('framework', 'update')
  async updateManualAttestation(
    @OrganizationId() organizationId: string,
    @Param('id') manualAttestationId: string,
    @Body() dto: UpdateManualAttestationStatusDto,
  ) {
    return this.releaseReadinessService.updateManualAttestation(
      organizationId,
      manualAttestationId,
      dto,
    );
  }

  @Get('runs/:id/external-validations')
  @RequirePermission('framework', 'read')
  async listExternalValidations(
    @OrganizationId() organizationId: string,
    @Param('id') releaseRunId: string,
  ) {
    const data = await this.releaseReadinessService.listExternalValidations(
      organizationId,
      releaseRunId,
    );
    return { data, count: data.length };
  }

  @Post('external-validations')
  @RequirePermission('framework', 'create')
  async createExternalValidation(
    @OrganizationId() organizationId: string,
    @Body() dto: CreateExternalValidationDto,
  ) {
    return this.releaseReadinessService.createExternalValidation(
      organizationId,
      dto,
    );
  }

  @Patch('external-validations/:id')
  @RequirePermission('framework', 'update')
  async updateExternalValidation(
    @OrganizationId() organizationId: string,
    @Param('id') externalValidationId: string,
    @Body() dto: UpdateExternalValidationStatusDto,
  ) {
    return this.releaseReadinessService.updateExternalValidation(
      organizationId,
      externalValidationId,
      dto,
    );
  }

  @Post('runs/:id/evaluate')
  @RequirePermission('framework', 'update')
  async evaluateRun(
    @OrganizationId() organizationId: string,
    @Param('id') releaseRunId: string,
  ) {
    return this.releaseReadinessService.evaluateRun(
      organizationId,
      releaseRunId,
    );
  }
}
