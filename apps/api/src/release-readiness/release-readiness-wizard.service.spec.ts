import { BadRequestException } from '@nestjs/common';
import { ReleaseReadinessWizardService } from './release-readiness-wizard.service';

jest.mock('../frameworks/frameworks.service', () => ({
  FrameworksService: class FrameworksService {},
}));

jest.mock('@trycompai/db', () => ({
  db: {},
}), { virtual: true });

jest.mock('@trigger.dev/sdk', () => ({
  tasks: {
    trigger: jest.fn(),
  },
}));

describe('ReleaseReadinessWizardService', () => {
  const releaseReadinessService = {
    createSubject: jest.fn(),
    createDefinition: jest.fn(),
    createRun: jest.fn(),
  };
  const repository = {
    findHealthcareFrameworkLibrary: jest.fn(),
    findActiveConnectionsByProviderSlugs: jest.fn(),
    findSubjectById: jest.fn(),
    findDefinitionById: jest.fn(),
    findExternalValidations: jest.fn(),
    createExternalValidation: jest.fn(),
  };
  const frameworksService = {
    installHealthcareFrameworks: jest.fn(),
  };
  const triggerTasks = {
    trigger: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds defaults with suggested check bindings from active HealthOS connections', async () => {
    repository.findHealthcareFrameworkLibrary.mockResolvedValue([
      { id: 'frk_hc_smart_runtime', name: 'SMART on FHIR Runtime' },
    ]);
    repository.findActiveConnectionsByProviderSlugs.mockResolvedValue([
      {
        id: 'conn_runtime',
        status: 'active',
        variables: { fhir_base_url: 'https://developer.healthos.io/fhir' },
        metadata: null,
        lastSyncAt: null,
        provider: {
          slug: 'healthos-runtime',
          name: 'HealthOS Runtime',
        },
      },
    ]);

    const service = new ReleaseReadinessWizardService(
      repository as never,
      releaseReadinessService as never,
      frameworksService as never,
      triggerTasks as never,
    );

    const result = await service.getDefaults('org_1');

    expect(result.definitionDefaults.requiredFrameworkIds).toContain(
      'frk_hc_smart_runtime',
    );
    expect(result.definitionDefaults.suggestedCheckBindings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          checkId: 'smart_configuration',
          connectionId: 'conn_runtime',
        }),
      ]),
    );
  });

  it('creates missing subject and definition, then triggers orchestration', async () => {
    repository.findHealthcareFrameworkLibrary.mockResolvedValue([]);
    repository.findActiveConnectionsByProviderSlugs.mockResolvedValue([]);
    repository.findExternalValidations.mockResolvedValue([]);
    releaseReadinessService.createSubject.mockResolvedValue({ id: 'subj_1' });
    releaseReadinessService.createDefinition.mockResolvedValue({ id: 'def_1' });
    releaseReadinessService.createRun.mockResolvedValue({ id: 'run_1' });
    triggerTasks.trigger.mockResolvedValue({ id: 'task_run_1' });

    const service = new ReleaseReadinessWizardService(
      repository as never,
      releaseReadinessService as never,
      frameworksService as never,
      triggerTasks as never,
    );

    const result = await service.orchestrate('org_1', {
      installHealthcareFrameworks: true,
      subject: {
        type: 'service',
        name: 'HealthOS API',
      },
      definition: {
        name: 'default gate',
        requiredFrameworkIds: ['frk_hc_smart_runtime'],
        requiredCheckIds: ['smart_configuration'],
        requiredApprovalKeys: ['security_signoff'],
        requiredExternalValidationKeys: ['partner_validation_packet'],
      },
      run: {
        version: '1.0.0',
      },
    });

    expect(frameworksService.installHealthcareFrameworks).toHaveBeenCalledWith(
      'org_1',
    );
    expect(releaseReadinessService.createRun).toHaveBeenCalledWith('org_1', {
      releaseDefinitionId: 'def_1',
      version: '1.0.0',
    });
    expect(triggerTasks.trigger).toHaveBeenCalledWith('orchestrate-release-run', {
      organizationId: 'org_1',
      releaseRunId: 'run_1',
      approvalKeys: [],
      checkIds: [],
      validatorArtifacts: [],
      automationIds: [],
      notify: true,
    });
    expect(result).toEqual({
      releaseSubjectId: 'subj_1',
      releaseDefinitionId: 'def_1',
      releaseRunId: 'run_1',
      taskRunId: 'task_run_1',
    });
  });

  it('rejects orchestration when neither an existing definition nor a definition payload is provided', async () => {
    repository.findSubjectById.mockResolvedValue({ id: 'subj_1' });

    const service = new ReleaseReadinessWizardService(
      repository as never,
      releaseReadinessService as never,
      frameworksService as never,
      triggerTasks as never,
    );

    await expect(
      service.orchestrate('org_1', {
        releaseSubjectId: 'subj_1',
        run: { version: '1.0.0' },
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
