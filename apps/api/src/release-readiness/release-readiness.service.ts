import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createHash } from 'node:crypto';
import { ReleaseReadinessRepository } from './release-readiness.repository';
import { CreateReleaseSubjectDto } from './dto/create-release-subject.dto';
import { CreateReleaseDefinitionDto } from './dto/create-release-definition.dto';
import { CreateReleaseRunDto } from './dto/create-release-run.dto';
import { CreateManualAttestationDto } from './dto/create-manual-attestation.dto';
import { CreateExternalValidationDto } from './dto/create-external-validation.dto';
import { UpdateManualAttestationStatusDto } from './dto/update-manual-attestation-status.dto';
import { UpdateExternalValidationStatusDto } from './dto/update-external-validation-status.dto';

@Injectable()
export class ReleaseReadinessService {
  constructor(
    private readonly repository: ReleaseReadinessRepository,
  ) {}

  listSubjects(organizationId: string) {
    return this.repository.findSubjects(organizationId);
  }

  createSubject(
    organizationId: string,
    dto: CreateReleaseSubjectDto,
  ) {
    return this.repository.createSubject({
      organizationId,
      ...dto,
    });
  }

  listDefinitions(organizationId: string) {
    return this.repository.findDefinitions(organizationId);
  }

  async createDefinition(
    organizationId: string,
    dto: CreateReleaseDefinitionDto,
  ) {
    const subject = await this.repository.findSubjectById(
      dto.releaseSubjectId,
      organizationId,
    );

    if (!subject) {
      throw new NotFoundException('Release subject not found');
    }

    const checkBindings = dto.checkBindings ?? [];
    if (checkBindings.length > 0) {
      const connectionIds = [...new Set(checkBindings.map((binding) => binding.connectionId))];
      const connections = await this.repository.findConnectionsByIds(
        connectionIds,
        organizationId,
      );

      if (connections.length !== connectionIds.length) {
        throw new BadRequestException(
          'One or more release definition check bindings reference invalid connections.',
        );
      }
    }

    const definition = await this.repository.createDefinition({
      organizationId,
      releaseSubjectId: dto.releaseSubjectId,
      name: dto.name,
      description: dto.description ?? null,
      requiredFrameworkIds: dto.requiredFrameworkIds ?? [],
      requiredCheckIds: dto.requiredCheckIds ?? [],
      requiredApprovalKeys: dto.requiredApprovalKeys ?? [],
      requiredExternalValidationKeys: dto.requiredExternalValidationKeys ?? [],
    });

    await this.repository.replaceDefinitionCheckBindings(
      definition.id,
      checkBindings.map((binding) => ({
        releaseDefinitionId: definition.id,
        checkId: binding.checkId,
        connectionId: binding.connectionId,
        variableOverrides: binding.variableOverrides ?? null,
        freshnessHours: binding.freshnessHours ?? 24,
        blocking: binding.blocking ?? true,
      })),
    );

    return this.repository.findDefinitionById(definition.id, organizationId);
  }

  listRuns(organizationId: string) {
    return this.repository.findRuns(organizationId);
  }

  listManualAttestations(organizationId: string, releaseRunId: string) {
    return this.repository.findManualAttestations(organizationId, releaseRunId);
  }

  createManualAttestation(
    organizationId: string,
    dto: CreateManualAttestationDto,
  ) {
    return this.ensureRunExists(organizationId, dto.releaseRunId).then(async () => {
      if (dto.approverId) {
        const approver = await this.repository.findMemberById(
          dto.approverId,
          organizationId,
        );

        if (!approver) {
          throw new NotFoundException('Approver not found');
        }
      }

      return this.repository.createManualAttestation({
        organizationId,
        releaseRunId: dto.releaseRunId,
        approvalKey: dto.approvalKey,
        title: dto.title,
        requirementId: dto.requirementId ?? null,
        approverId: dto.approverId ?? null,
        status: 'pending',
        notes: dto.notes ?? null,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      });
    });
  }

  async updateManualAttestation(
    organizationId: string,
    manualAttestationId: string,
    dto: UpdateManualAttestationStatusDto,
  ) {
    const attestation = await this.repository.findManualAttestationById(
      manualAttestationId,
      organizationId,
    );

    if (!attestation) {
      throw new NotFoundException('Manual attestation not found');
    }

    return this.repository.updateManualAttestation(manualAttestationId, {
      status: dto.status,
      notes: dto.notes ?? null,
      ...(dto.status === 'approved' ? { approvedAt: new Date() } : {}),
      ...(dto.expiresAt ? { expiresAt: new Date(dto.expiresAt) } : {}),
    });
  }

  listExternalValidations(organizationId: string, releaseRunId: string) {
    return this.repository.findExternalValidations(organizationId, releaseRunId);
  }

  createExternalValidation(
    organizationId: string,
    dto: CreateExternalValidationDto,
  ) {
    return this.ensureRunExists(organizationId, dto.releaseRunId).then(() =>
      this.repository.createExternalValidation({
      organizationId,
      releaseRunId: dto.releaseRunId,
      validationKey: dto.validationKey,
      type: dto.type,
      title: dto.title,
      authority: dto.authority ?? null,
      status: 'pending',
      referenceId: dto.referenceId ?? null,
      artifactUrl: dto.artifactUrl ?? null,
      notes: dto.notes ?? null,
      validFrom: dto.validFrom ? new Date(dto.validFrom) : null,
      validTo: dto.validTo ? new Date(dto.validTo) : null,
      }),
    );
  }

  async updateExternalValidation(
    organizationId: string,
    externalValidationId: string,
    dto: UpdateExternalValidationStatusDto,
  ) {
    const validation = await this.repository.findExternalValidationById(
      externalValidationId,
      organizationId,
    );

    if (!validation) {
      throw new NotFoundException('External validation not found');
    }

    return this.repository.updateExternalValidation(externalValidationId, {
      status: dto.status,
      notes: dto.notes ?? null,
      ...(dto.validFrom ? { validFrom: new Date(dto.validFrom) } : {}),
      ...(dto.validTo ? { validTo: new Date(dto.validTo) } : {}),
    });
  }

  async createRun(
    organizationId: string,
    dto: CreateReleaseRunDto,
  ) {
    const definition = await this.repository.findDefinitionById(
      dto.releaseDefinitionId,
      organizationId,
    );

    if (!definition) {
      throw new NotFoundException('Release definition not found');
    }

    return this.repository.createRun({
      organizationId,
      releaseDefinitionId: definition.id,
      releaseSubjectId: definition.releaseSubjectId,
      version: dto.version,
      commitSha: dto.commitSha ?? null,
      buildId: dto.buildId ?? null,
      status: 'draft',
    });
  }

  async evaluateRun(
    organizationId: string,
    releaseRunId: string,
  ) {
    const run = await this.repository.findRunById(releaseRunId, organizationId);

    if (!run) {
      throw new NotFoundException('Release run not found');
    }

    const definition = await this.repository.findDefinitionById(
      run.releaseDefinitionId,
      organizationId,
    );

    if (!definition) {
      throw new NotFoundException('Release definition not found');
    }

    const [
      installedFrameworkCount,
      successfulCheckIds,
      manualAttestations,
      externalValidations,
    ] = await Promise.all([
      this.repository.countInstalledFrameworks(
        organizationId,
        definition.requiredFrameworkIds,
      ),
      this.repository.getSuccessfulCheckIds(
        releaseRunId,
        definition.requiredCheckIds,
      ),
      this.repository.getManualAttestationsByKeys(
        organizationId,
        releaseRunId,
        definition.requiredApprovalKeys,
      ),
      this.repository.getExternalValidationsByKeys(
        organizationId,
        releaseRunId,
        definition.requiredExternalValidationKeys,
      ),
    ]);

    const missingFrameworkCount =
      definition.requiredFrameworkIds.length - installedFrameworkCount;
    const missingCheckIds = definition.requiredCheckIds.filter(
      (checkId) => !successfulCheckIds.includes(checkId),
    );
    const missingApprovalKeys = definition.requiredApprovalKeys.filter(
      (approvalKey) =>
        !manualAttestations.some(
          (attestation) => attestation.approvalKey === approvalKey,
        ),
    );
    const blockingApprovalKeys = manualAttestations
      .filter((attestation) =>
        ['pending', 'rejected', 'expired'].includes(attestation.status || '') ||
        (attestation.expiresAt instanceof Date &&
          attestation.expiresAt.getTime() <= Date.now()),
      )
      .map((attestation) => attestation.approvalKey || '');
    const missingExternalValidationKeys =
      definition.requiredExternalValidationKeys.filter(
        (validationKey) =>
          !externalValidations.some(
            (validation) => validation.validationKey === validationKey,
          ),
      );
    const blockingExternalValidationKeys = externalValidations
      .filter((validation) =>
        ['pending', 'rejected', 'expired'].includes(validation.status || '') ||
        (validation.validTo instanceof Date &&
          validation.validTo.getTime() <= Date.now()),
      )
      .map((validation) => validation.validationKey || '');

    const blockingReasons = {
      missingFrameworkCount,
      missingCheckIds,
      missingApprovalKeys,
      blockingApprovalKeys,
      missingExternalValidationKeys,
      blockingExternalValidationKeys,
    };

    const decision =
      missingFrameworkCount > 0 ||
      missingCheckIds.length > 0 ||
      missingApprovalKeys.length > 0 ||
      blockingApprovalKeys.length > 0 ||
      missingExternalValidationKeys.length > 0 ||
      blockingExternalValidationKeys.length > 0
        ? 'fail'
        : 'pass';

    const summary =
      decision === 'pass'
        ? 'All blocking checks and approvals are satisfied.'
        : 'Release has unresolved blockers or missing approvals.';

    const evidenceHash = createHash('sha256')
      .update(JSON.stringify({ releaseRunId, blockingReasons }))
      .digest('hex');

    await this.repository.upsertGateDecision({
      releaseRunId,
      decision,
      blockingReasons,
      summary,
      evidenceHash,
    });

    await this.repository.updateRun(releaseRunId, {
      status: decision === 'pass' ? 'completed' : 'failed',
      completedAt: new Date(),
    });

    return {
      releaseRunId,
      decision,
      summary,
      blockingReasons,
      evidenceHash,
    };
  }

  private async ensureRunExists(
    organizationId: string,
    releaseRunId: string,
  ): Promise<void> {
    const run = await this.repository.findRunById(releaseRunId, organizationId);
    if (!run) {
      throw new NotFoundException('Release run not found');
    }
  }
}
