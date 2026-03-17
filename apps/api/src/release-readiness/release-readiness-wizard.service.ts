import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { tasks } from '@trigger.dev/sdk';
import { FrameworksService } from '../frameworks/frameworks.service';
import { ReleaseReadinessService } from './release-readiness.service';
import { ReleaseReadinessRepository } from './release-readiness.repository';
import {
  HEALTHOS_DEFAULT_APPROVAL_KEYS,
  HEALTHOS_DEFAULT_DEFINITION_NAME,
  HEALTHOS_DEFAULT_EXTERNAL_VALIDATIONS,
  HEALTHOS_DEFAULT_FRAMEWORK_IDS,
  HEALTHOS_DEFAULT_SUBJECT,
  HEALTHOS_PROVIDER_GROUPS,
} from './healthos-wizard.constants';
import type { OrchestrateHealthOSWizardDto } from './dto/orchestrate-healthos-wizard.dto';
import type { orchestrateReleaseRunTask } from '../trigger/release-readiness/orchestrate-release-run';

@Injectable()
export class ReleaseReadinessWizardService {
  constructor(
    private readonly repository: ReleaseReadinessRepository,
    private readonly releaseReadinessService: ReleaseReadinessService,
    private readonly frameworksService: FrameworksService,
    private readonly triggerTasks: Pick<typeof tasks, 'trigger'> = tasks,
  ) {}

  async getDefaults(organizationId: string) {
    const frameworkLibrary = await this.repository.findHealthcareFrameworkLibrary(
      HEALTHOS_DEFAULT_FRAMEWORK_IDS,
    );
    const activeConnections =
      await this.repository.findActiveConnectionsByProviderSlugs(
        organizationId,
        HEALTHOS_PROVIDER_GROUPS.map((group) => group.providerSlug),
      );

    const firstConnectionByProvider = new Map(
      activeConnections.map((connection) => [connection.provider.slug, connection]),
    );
    const suggestedCheckBindings = HEALTHOS_PROVIDER_GROUPS.flatMap((group) => {
      const connection = firstConnectionByProvider.get(group.providerSlug);
      if (!connection) {
        return [];
      }
      return group.checkIds.map((checkId) => ({
        checkId,
        connectionId: connection.id,
      }));
    });
    const missingProviderSlugs = HEALTHOS_PROVIDER_GROUPS
      .filter((group) => !firstConnectionByProvider.has(group.providerSlug))
      .map((group) => group.providerSlug);

    return {
      subjectDefaults: HEALTHOS_DEFAULT_SUBJECT,
      frameworkLibrary,
      activeConnections: activeConnections.map((connection) => ({
        id: connection.id,
        providerSlug: connection.provider.slug,
        providerName: connection.provider.name,
        status: connection.status,
        variables: connection.variables,
        metadata: connection.metadata,
        lastSyncAt: connection.lastSyncAt,
      })),
      definitionDefaults: {
        name: HEALTHOS_DEFAULT_DEFINITION_NAME,
        requiredFrameworkIds: HEALTHOS_DEFAULT_FRAMEWORK_IDS,
        requiredCheckIds: HEALTHOS_PROVIDER_GROUPS.flatMap((group) => group.checkIds),
        requiredApprovalKeys: [...HEALTHOS_DEFAULT_APPROVAL_KEYS],
        requiredExternalValidationKeys: HEALTHOS_DEFAULT_EXTERNAL_VALIDATIONS.map(
          (validation) => validation.validationKey,
        ),
        suggestedCheckBindings,
      },
      readiness: {
        missingProviderSlugs,
        frameworkLibraryReady:
          frameworkLibrary.length === HEALTHOS_DEFAULT_FRAMEWORK_IDS.length,
      },
    };
  }

  async orchestrate(
    organizationId: string,
    dto: OrchestrateHealthOSWizardDto,
  ) {
    if (dto.installHealthcareFrameworks) {
      await this.frameworksService.installHealthcareFrameworks(organizationId);
    }

    const releaseSubjectId = await this.resolveSubjectId(organizationId, dto);
    const definition = await this.resolveDefinition(organizationId, releaseSubjectId, dto);
    if (!definition) {
      throw new BadRequestException('Unable to resolve a release definition.');
    }
    const run = await this.releaseReadinessService.createRun(organizationId, {
      releaseDefinitionId: definition.id,
      version: dto.run.version,
      commitSha: dto.run.commitSha,
      buildId: dto.run.buildId,
    });

    await this.ensureValidationPlaceholders(organizationId, run.id, definition);

    const handle = await this.triggerTasks.trigger<typeof orchestrateReleaseRunTask>(
      'orchestrate-release-run',
      {
        organizationId,
        releaseRunId: run.id,
        approvalKeys: dto.approvalKeys ?? [],
        checkIds: dto.checkIds ?? [],
        validatorArtifacts: dto.validatorArtifacts ?? [],
        automationIds: dto.automationIds ?? [],
        notify: dto.notify ?? true,
      },
    );

    return {
      releaseSubjectId,
      releaseDefinitionId: definition.id,
      releaseRunId: run.id,
      taskRunId: handle.id,
    };
  }

  private async resolveSubjectId(
    organizationId: string,
    dto: OrchestrateHealthOSWizardDto,
  ) {
    if (dto.releaseSubjectId) {
      const subject = await this.repository.findSubjectById(
        dto.releaseSubjectId,
        organizationId,
      );
      if (!subject) {
        throw new NotFoundException('Release subject not found');
      }
      return subject.id;
    }

    const subjectInput = dto.subject ?? HEALTHOS_DEFAULT_SUBJECT;
    const subject = await this.releaseReadinessService.createSubject(organizationId, {
      ...subjectInput,
    });
    return subject.id;
  }

  private async resolveDefinition(
    organizationId: string,
    releaseSubjectId: string,
    dto: OrchestrateHealthOSWizardDto,
  ) {
    if (dto.releaseDefinitionId) {
      const definition = await this.repository.findDefinitionById(
        dto.releaseDefinitionId,
        organizationId,
      );
      if (!definition) {
        throw new NotFoundException('Release definition not found');
      }
      return definition;
    }

    if (!dto.definition) {
      throw new BadRequestException(
        'A release definition payload is required when no existing releaseDefinitionId is provided.',
      );
    }

    return this.releaseReadinessService.createDefinition(organizationId, {
      releaseSubjectId,
      name: dto.definition.name,
      description: dto.definition.description,
      requiredFrameworkIds:
        dto.definition.requiredFrameworkIds ?? [...HEALTHOS_DEFAULT_FRAMEWORK_IDS],
      requiredCheckIds:
        dto.definition.requiredCheckIds ??
        HEALTHOS_PROVIDER_GROUPS.flatMap((group) => group.checkIds),
      requiredApprovalKeys:
        dto.definition.requiredApprovalKeys ?? [...HEALTHOS_DEFAULT_APPROVAL_KEYS],
      requiredExternalValidationKeys:
        dto.definition.requiredExternalValidationKeys ??
        HEALTHOS_DEFAULT_EXTERNAL_VALIDATIONS.map(
          (validation) => validation.validationKey,
        ),
      checkBindings: dto.definition.checkBindings,
    });
  }

  private async ensureValidationPlaceholders(
    organizationId: string,
    releaseRunId: string,
    definition: {
      requiredExternalValidationKeys?: string[];
    },
  ) {
    const targetKeys = definition.requiredExternalValidationKeys ?? [];
    if (targetKeys.length === 0) {
      return;
    }

    const existing = await this.repository.findExternalValidations(
      organizationId,
      releaseRunId,
    );
    const existingKeys = new Set(
      existing.map((validation) => validation.validationKey).filter(Boolean),
    );

    for (const validation of HEALTHOS_DEFAULT_EXTERNAL_VALIDATIONS) {
      if (!targetKeys.includes(validation.validationKey)) {
        continue;
      }
      if (existingKeys.has(validation.validationKey)) {
        continue;
      }

      await this.releaseReadinessService.createExternalValidation(organizationId, {
        releaseRunId,
        validationKey: validation.validationKey,
        type: validation.type,
        title: validation.title,
      });
    }
  }
}
