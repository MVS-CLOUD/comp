import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ReleaseReadinessService } from './release-readiness.service';
import { ReleaseReadinessRepository } from './release-readiness.repository';
import { BadRequestException } from '@nestjs/common';

jest.mock('@trycompai/db', () => ({
  db: {},
}), { virtual: true });

describe('ReleaseReadinessService', () => {
  const repository = {
    findSubjects: jest.fn(),
    createSubject: jest.fn(),
    findSubjectById: jest.fn(),
    findConnectionsByIds: jest.fn(),
    findDefinitions: jest.fn(),
    createDefinition: jest.fn(),
    findDefinitionById: jest.fn(),
    replaceDefinitionCheckBindings: jest.fn(),
    findRuns: jest.fn(),
    createRun: jest.fn(),
    findRunById: jest.fn(),
    updateRun: jest.fn(),
    countInstalledFrameworks: jest.fn(),
    getSuccessfulCheckIds: jest.fn(),
    getManualAttestationsByKeys: jest.fn(),
    getExternalValidationsByKeys: jest.fn(),
    countBlockingFindings: jest.fn(),
    createManualAttestation: jest.fn(),
    updateManualAttestation: jest.fn(),
    createExternalValidation: jest.fn(),
    updateExternalValidation: jest.fn(),
    upsertGateDecision: jest.fn(),
    findMemberById: jest.fn(),
  };

  let service: ReleaseReadinessService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ReleaseReadinessService,
        { provide: ReleaseReadinessRepository, useValue: repository },
      ],
    }).compile();

    service = moduleRef.get(ReleaseReadinessService);
    jest.clearAllMocks();
  });

  it('creates a release run from an existing definition', async () => {
    repository.findDefinitionById.mockResolvedValue({
      id: 'rls_df_1',
      releaseSubjectId: 'rls_sb_1',
    });
    repository.createRun.mockResolvedValue({ id: 'rls_rn_1' });

    const result = await service.createRun('org_1', {
      releaseDefinitionId: 'rls_df_1',
      version: '1.2.3',
      commitSha: 'abc123',
      buildId: 'build-1',
    });

    expect(repository.createRun).toHaveBeenCalledWith({
      organizationId: 'org_1',
      releaseDefinitionId: 'rls_df_1',
      releaseSubjectId: 'rls_sb_1',
      version: '1.2.3',
      commitSha: 'abc123',
      buildId: 'build-1',
      status: 'draft',
    });
    expect(result).toEqual({ id: 'rls_rn_1' });
  });

  it('requires the release subject to exist before creating a definition', async () => {
    repository.findSubjectById.mockResolvedValue(null);

    await expect(
      service.createDefinition('org_1', {
        releaseSubjectId: 'missing',
        name: 'Production API Gate',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('creates a definition and persists explicit check bindings', async () => {
    repository.findSubjectById.mockResolvedValue({ id: 'subj_1' });
    repository.findConnectionsByIds.mockResolvedValue([
      { id: 'conn_1', organizationId: 'org_1' },
    ]);
    repository.createDefinition.mockResolvedValue({ id: 'def_1' });
    repository.findDefinitionById.mockResolvedValue({
      id: 'def_1',
      name: 'prod gate',
      checkBindings: [
        {
          checkId: 'smart_configuration',
          connectionId: 'conn_1',
          freshnessHours: 12,
          blocking: true,
        },
      ],
    });

    const result = await service.createDefinition('org_1', {
      releaseSubjectId: 'subj_1',
      name: 'prod gate',
      requiredFrameworkIds: ['frk_hc_smart_runtime'],
      requiredCheckIds: ['smart_configuration'],
      requiredApprovalKeys: ['security_signoff'],
      requiredExternalValidationKeys: ['partner_validation_packet'],
      checkBindings: [
        {
          checkId: 'smart_configuration',
          connectionId: 'conn_1',
          freshnessHours: 12,
          blocking: true,
        },
      ],
    });

    expect(repository.replaceDefinitionCheckBindings).toHaveBeenCalledWith('def_1', [
      {
        releaseDefinitionId: 'def_1',
        checkId: 'smart_configuration',
        connectionId: 'conn_1',
        variableOverrides: null,
        freshnessHours: 12,
        blocking: true,
      },
    ]);
    expect(repository.findDefinitionById).toHaveBeenCalledWith('def_1', 'org_1');
    expect(result).toEqual({
      id: 'def_1',
      name: 'prod gate',
      checkBindings: [
        {
          checkId: 'smart_configuration',
          connectionId: 'conn_1',
          freshnessHours: 12,
          blocking: true,
        },
      ],
    });
  });

  it('rejects definitions that reference invalid connections', async () => {
    repository.findSubjectById.mockResolvedValue({ id: 'subj_1' });
    repository.findConnectionsByIds.mockResolvedValue([]);

    await expect(
      service.createDefinition('org_1', {
        releaseSubjectId: 'subj_1',
        name: 'prod gate',
        checkBindings: [
          {
            checkId: 'smart_configuration',
            connectionId: 'missing_conn',
          },
        ],
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws when creating a run from a missing definition', async () => {
    repository.findDefinitionById.mockResolvedValue(null);

    await expect(
      service.createRun('org_1', {
        releaseDefinitionId: 'missing',
        version: '1.2.3',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('evaluates a run and stores a failing gate decision when blockers exist', async () => {
    repository.findRunById.mockResolvedValue({
      id: 'rls_rn_1',
      releaseDefinitionId: 'rls_df_1',
    });
    repository.findDefinitionById.mockResolvedValue({
      id: 'rls_df_1',
      requiredFrameworkIds: ['frk_1'],
      requiredCheckIds: ['check-1'],
      requiredApprovalKeys: ['approve-1'],
      requiredExternalValidationKeys: ['ext-1'],
    });
    repository.countInstalledFrameworks.mockResolvedValue(0);
    repository.getSuccessfulCheckIds.mockResolvedValue([]);
    repository.getManualAttestationsByKeys.mockResolvedValue([]);
    repository.getExternalValidationsByKeys.mockResolvedValue([]);
    repository.upsertGateDecision.mockResolvedValue({
      id: 'rls_gd_1',
      decision: 'fail',
    });

    const result = await service.evaluateRun('org_1', 'rls_rn_1');

    expect(result.decision).toBe('fail');
    expect(result.blockingReasons).toEqual({
      missingFrameworkCount: 1,
      missingCheckIds: ['check-1'],
      missingApprovalKeys: ['approve-1'],
      blockingApprovalKeys: [],
      missingExternalValidationKeys: ['ext-1'],
      blockingExternalValidationKeys: [],
    });
    expect(repository.updateRun).toHaveBeenCalledWith('rls_rn_1', {
      status: 'failed',
      completedAt: expect.any(Date),
    });
  });

  it('marks a run as pass only when frameworks, checks, approvals, validations, and findings are satisfied', async () => {
    repository.findRunById.mockResolvedValue({
      id: 'rls_rn_2',
      releaseDefinitionId: 'rls_df_2',
    });
    repository.findDefinitionById.mockResolvedValue({
      id: 'rls_df_2',
      requiredFrameworkIds: ['frk_1'],
      requiredCheckIds: ['check-1'],
      requiredApprovalKeys: ['approve-1'],
      requiredExternalValidationKeys: ['ext-1'],
    });
    repository.countInstalledFrameworks.mockResolvedValue(1);
    repository.getSuccessfulCheckIds.mockResolvedValue(['check-1']);
    repository.getManualAttestationsByKeys.mockResolvedValue([
      { id: 'att_1', approvalKey: 'approve-1', status: 'approved' },
    ]);
    repository.getExternalValidationsByKeys.mockResolvedValue([
      { id: 'ext_1', validationKey: 'ext-1', status: 'active' },
    ]);

    const result = await service.evaluateRun('org_1', 'rls_rn_2');

    expect(result.decision).toBe('pass');
    expect(repository.updateRun).toHaveBeenCalledWith('rls_rn_2', {
      status: 'completed',
      completedAt: expect.any(Date),
    });
  });
});
