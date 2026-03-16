import { Test } from '@nestjs/testing';
import { HybridAuthGuard } from '../auth/hybrid-auth.guard';
import { PermissionGuard } from '../auth/permission.guard';
import { ReleaseReadinessController } from './release-readiness.controller';
import { ReleaseReadinessService } from './release-readiness.service';

jest.mock('../auth/hybrid-auth.guard', () => ({
  HybridAuthGuard: class HybridAuthGuard {},
}));

jest.mock('../auth/permission.guard', () => ({
  PermissionGuard: class PermissionGuard {},
}));

describe('ReleaseReadinessController', () => {
  const service = {
    listSubjects: jest.fn(),
    createSubject: jest.fn(),
    listDefinitions: jest.fn(),
    createDefinition: jest.fn(),
    listRuns: jest.fn(),
    createRun: jest.fn(),
    listManualAttestations: jest.fn(),
    createManualAttestation: jest.fn(),
    updateManualAttestation: jest.fn(),
    listExternalValidations: jest.fn(),
    createExternalValidation: jest.fn(),
    updateExternalValidation: jest.fn(),
    evaluateRun: jest.fn(),
  };

  let controller: ReleaseReadinessController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ReleaseReadinessController],
      providers: [{ provide: ReleaseReadinessService, useValue: service }],
    })
      .overrideGuard(HybridAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(PermissionGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = moduleRef.get(ReleaseReadinessController);
    jest.clearAllMocks();
  });

  it('returns subjects with a count', async () => {
    service.listSubjects.mockResolvedValue([{ id: 'rls_sb_1' }]);

    await expect(controller.listSubjects('org_1')).resolves.toEqual({
      data: [{ id: 'rls_sb_1' }],
      count: 1,
    });
  });

  it('delegates definition creation', async () => {
    service.createDefinition.mockResolvedValue({ id: 'rls_df_1' });

    const dto = {
      releaseSubjectId: 'rls_sb_1',
      name: 'Production API Gate',
    };

    await expect(controller.createDefinition('org_1', dto)).resolves.toEqual({
      id: 'rls_df_1',
    });
    expect(service.createDefinition).toHaveBeenCalledWith('org_1', dto);
  });

  it('delegates run evaluation', async () => {
    service.evaluateRun.mockResolvedValue({ decision: 'pass' });

    await expect(
      controller.evaluateRun('org_1', 'rls_rn_1'),
    ).resolves.toEqual({ decision: 'pass' });
    expect(service.evaluateRun).toHaveBeenCalledWith('org_1', 'rls_rn_1');
  });
});
