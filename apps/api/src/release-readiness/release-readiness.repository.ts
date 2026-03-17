import { Injectable } from '@nestjs/common';
import { db } from '@trycompai/db';

type JsonValue = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

type ReleaseSubjectRecord = {
  id: string;
  organizationId: string;
  type: string;
  name: string;
  description: string | null;
  repositoryUrl: string | null;
  environment: string | null;
  serviceBaseUrl: string | null;
  fhirBaseUrl: string | null;
  partnerProfile: string | null;
};

type ReleaseDefinitionRecord = {
  id: string;
  organizationId: string;
  releaseSubjectId: string;
  name: string;
  description: string | null;
  requiredFrameworkIds: string[];
  requiredCheckIds: string[];
  requiredApprovalKeys: string[];
  requiredExternalValidationKeys: string[];
  checkBindings?: Array<{
    id: string;
    checkId: string;
    connectionId: string;
    freshnessHours: number;
    blocking: boolean;
    variableOverrides: JsonValue;
  }>;
};

type ReleaseRunRecord = {
  id: string;
  organizationId: string;
  releaseDefinitionId: string;
  releaseSubjectId: string;
  version: string;
  commitSha: string | null;
  buildId: string | null;
  status: string;
};

type ManualAttestationRecord = {
  id: string;
  approvalKey?: string;
  status?: string;
  expiresAt?: Date | null;
};
type ExternalValidationRecord = {
  id: string;
  validationKey?: string;
  status?: string;
  validTo?: Date | null;
};
type IntegrationCheckRunRecord = { checkId: string };

type ReleaseDb = typeof db & {
  releaseSubject: {
    findMany(args: Record<string, unknown>): Promise<ReleaseSubjectRecord[]>;
    create(args: Record<string, unknown>): Promise<ReleaseSubjectRecord>;
    findFirst(args: Record<string, unknown>): Promise<ReleaseSubjectRecord | null>;
  };
  releaseDefinition: {
    findMany(args: Record<string, unknown>): Promise<ReleaseDefinitionRecord[]>;
    create(args: Record<string, unknown>): Promise<ReleaseDefinitionRecord>;
    findFirst(args: Record<string, unknown>): Promise<ReleaseDefinitionRecord | null>;
  };
  releaseDefinitionCheckBinding: {
    createMany(args: Record<string, unknown>): Promise<unknown>;
    deleteMany(args: Record<string, unknown>): Promise<unknown>;
  };
  releaseRun: {
    findMany(args: Record<string, unknown>): Promise<ReleaseRunRecord[]>;
    create(args: Record<string, unknown>): Promise<ReleaseRunRecord>;
    findFirst(args: Record<string, unknown>): Promise<ReleaseRunRecord | null>;
    update(args: Record<string, unknown>): Promise<ReleaseRunRecord>;
  };
  frameworkInstance: {
    count(args: Record<string, unknown>): Promise<number>;
  };
  manualAttestation: {
    count(args: Record<string, unknown>): Promise<number>;
    findMany(args: Record<string, unknown>): Promise<ManualAttestationRecord[]>;
    create(args: Record<string, unknown>): Promise<ManualAttestationRecord>;
    update(args: Record<string, unknown>): Promise<ManualAttestationRecord>;
    findFirst(args: Record<string, unknown>): Promise<(ManualAttestationRecord & { organizationId?: string }) | null>;
  };
  externalValidation: {
    count(args: Record<string, unknown>): Promise<number>;
    findMany(args: Record<string, unknown>): Promise<ExternalValidationRecord[]>;
    create(args: Record<string, unknown>): Promise<ExternalValidationRecord>;
    update(args: Record<string, unknown>): Promise<ExternalValidationRecord>;
    findFirst(args: Record<string, unknown>): Promise<(ExternalValidationRecord & { organizationId?: string }) | null>;
  };
  member: {
    findFirst(args: Record<string, unknown>): Promise<{ id: string } | null>;
  };
  integrationCheckRun: {
    findMany(args: Record<string, unknown>): Promise<IntegrationCheckRunRecord[]>;
    createMany(args: Record<string, unknown>): Promise<unknown>;
  };
  integrationConnection: {
    findMany(args: Record<string, unknown>): Promise<Array<{ id: string; organizationId: string }>>;
  };
  evidenceArtifact: {
    create(args: Record<string, unknown>): Promise<{ id: string }>;
  };
  finding: {
    count(args: Record<string, unknown>): Promise<number>;
  };
  releaseGateDecision: {
    upsert(args: Record<string, unknown>): Promise<{ id: string; decision: string }>;
  };
};

@Injectable()
export class ReleaseReadinessRepository {
  private readonly releaseDb = db as unknown as ReleaseDb;

  findSubjects(organizationId: string) {
    return this.releaseDb.releaseSubject.findMany({
      where: { organizationId },
      orderBy: { name: 'asc' },
    });
  }

  createSubject(data: Record<string, unknown>) {
    return this.releaseDb.releaseSubject.create({ data });
  }

  findSubjectById(id: string, organizationId: string) {
    return this.releaseDb.releaseSubject.findFirst({
      where: { id, organizationId },
    });
  }

  findDefinitions(organizationId: string) {
    return this.releaseDb.releaseDefinition.findMany({
      where: { organizationId },
      include: {
        checkBindings: {
          orderBy: { checkId: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  createDefinition(data: Record<string, unknown>) {
    return this.releaseDb.releaseDefinition.create({ data });
  }

  findDefinitionById(id: string, organizationId: string) {
    return this.releaseDb.releaseDefinition.findFirst({
      where: { id, organizationId },
      include: {
        checkBindings: {
          orderBy: { checkId: 'asc' },
        },
      },
    });
  }

  findConnectionsByIds(connectionIds: string[], organizationId: string) {
    return this.releaseDb.integrationConnection.findMany({
      where: {
        id: { in: connectionIds },
        organizationId,
      },
      select: { id: true, organizationId: true },
    });
  }

  async replaceDefinitionCheckBindings(
    releaseDefinitionId: string,
    bindings: Array<Record<string, unknown>>,
  ) {
    await this.releaseDb.releaseDefinitionCheckBinding.deleteMany({
      where: { releaseDefinitionId },
    });

    if (bindings.length === 0) {
      return;
    }

    await this.releaseDb.releaseDefinitionCheckBinding.createMany({
      data: bindings,
    });
  }

  findRuns(organizationId: string) {
    return this.releaseDb.releaseRun.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findMemberById(id: string, organizationId: string) {
    return this.releaseDb.member.findFirst({
      where: { id, organizationId, deactivated: false },
      select: { id: true },
    });
  }

  createRun(data: Record<string, unknown>) {
    return this.releaseDb.releaseRun.create({ data });
  }

  countInstalledFrameworks(organizationId: string, frameworkIds: string[]) {
    return this.releaseDb.frameworkInstance.count({
      where: {
        organizationId,
        frameworkId: { in: frameworkIds },
      },
    });
  }

  findManualAttestations(organizationId: string, releaseRunId: string) {
    return this.releaseDb.manualAttestation.findMany({
      where: { organizationId, releaseRunId },
      orderBy: { createdAt: 'desc' },
    });
  }

  createManualAttestation(data: Record<string, unknown>) {
    return this.releaseDb.manualAttestation.create({ data });
  }

  findManualAttestationById(id: string, organizationId: string) {
    return this.releaseDb.manualAttestation.findFirst({
      where: { id, organizationId },
    });
  }

  updateManualAttestation(id: string, data: Record<string, unknown>) {
    return this.releaseDb.manualAttestation.update({
      where: { id },
      data,
    });
  }

  findExternalValidations(organizationId: string, releaseRunId: string) {
    return this.releaseDb.externalValidation.findMany({
      where: { organizationId, releaseRunId },
      orderBy: { createdAt: 'desc' },
    });
  }

  createExternalValidation(data: Record<string, unknown>) {
    return this.releaseDb.externalValidation.create({ data });
  }

  findExternalValidationById(id: string, organizationId: string) {
    return this.releaseDb.externalValidation.findFirst({
      where: { id, organizationId },
    });
  }

  updateExternalValidation(id: string, data: Record<string, unknown>) {
    return this.releaseDb.externalValidation.update({
      where: { id },
      data,
    });
  }

  findRunById(id: string, organizationId: string) {
    return this.releaseDb.releaseRun.findFirst({
      where: { id, organizationId },
    });
  }

  updateRun(id: string, data: Record<string, unknown>) {
    return this.releaseDb.releaseRun.update({ where: { id }, data });
  }

  countBlockingFindings(organizationId: string, releaseRunId: string) {
    return this.releaseDb.finding.count({
      where: {
        organizationId,
        releaseRunId,
        status: { not: 'closed' },
      },
    });
  }

  async getManualAttestationsByKeys(
    organizationId: string,
    releaseRunId: string,
    approvalKeys: string[],
  ) {
    return this.releaseDb.manualAttestation.findMany({
      where: {
        organizationId,
        releaseRunId,
        approvalKey: { in: approvalKeys },
      },
    });
  }

  async getExternalValidationsByKeys(
    organizationId: string,
    releaseRunId: string,
    validationKeys: string[],
  ) {
    return this.releaseDb.externalValidation.findMany({
      where: {
        organizationId,
        releaseRunId,
        validationKey: { in: validationKeys },
      },
    });
  }

  async getSuccessfulCheckIds(releaseRunId: string, checkIds: string[]) {
    const runs = await this.releaseDb.integrationCheckRun.findMany({
      where: {
        releaseRunId,
        checkId: { in: checkIds },
        status: 'success',
      },
      select: { checkId: true },
    });

    return [...new Set(runs.map((run) => run.checkId))];
  }

  createEvidenceArtifact(data: Record<string, unknown>) {
    return this.releaseDb.evidenceArtifact.create({ data });
  }

  upsertGateDecision({
    releaseRunId,
    decision,
    blockingReasons,
    summary,
    evidenceHash,
  }: {
    releaseRunId: string;
    decision: 'pass' | 'fail' | 'conditional';
    blockingReasons: JsonValue;
    summary: string;
    evidenceHash: string;
  }) {
    return this.releaseDb.releaseGateDecision.upsert({
      where: { releaseRunId },
      create: {
        releaseRunId,
        decision,
        blockingReasons,
        summary,
        evidenceHash,
      },
      update: {
        decision,
        blockingReasons,
        summary,
        evidenceHash,
      },
    });
  }
}
