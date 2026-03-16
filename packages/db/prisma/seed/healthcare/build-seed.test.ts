import { describe, expect, it } from 'bun:test';
import path from 'node:path';
import { buildHealthcareFrameworkSeed } from './build-seed';

const additionalInfoDir = path.resolve(
  __dirname,
  './source',
);

describe('buildHealthcareFrameworkSeed', () => {
  it('builds the expected healthcare framework library', async () => {
    const seed = await buildHealthcareFrameworkSeed({
      packageDirectory: additionalInfoDir,
    });

    expect(seed.frameworks.map((framework) => framework.name)).toEqual([
      'ONC 2026 Core',
      'ONC Conditions & Maintenance',
      'HIPAA Security Rule',
      'SMART on FHIR Runtime',
      'DoseSpot Readiness',
      'Internal Release Readiness',
    ]);

    expect(seed.frameworks.every((framework) => framework.visible)).toBe(true);
    expect(seed.requirements.length).toBeGreaterThanOrEqual(80);
    expect(seed.controlTemplates.length).toBeGreaterThanOrEqual(25);
    expect(seed.taskTemplates.length).toBeGreaterThanOrEqual(18);
    expect(seed.controlRequirementRelations.length).toBeGreaterThan(0);
    expect(seed.controlTaskRelations.length).toBeGreaterThan(0);
  });

  it('loads all ONC criteria and preserves the API anchor requirement', async () => {
    const seed = await buildHealthcareFrameworkSeed({
      packageDirectory: additionalInfoDir,
    });

    const oncFramework = seed.frameworks.find(
      (framework) => framework.id === 'frk_hc_onc_2026_core',
    );
    expect(oncFramework).toBeDefined();

    const oncRequirements = seed.requirements.filter(
      (requirement) => requirement.frameworkId === 'frk_hc_onc_2026_core',
    );
    expect(oncRequirements).toHaveLength(59);

    const g10Requirement = oncRequirements.find(
      (requirement) => requirement.identifier === 'REQ-G10',
    );

    expect(g10Requirement).toBeDefined();
    expect(g10Requirement?.name).toContain('Standardized API');
    expect(g10Requirement?.description).toContain('§170.315(g)(10)');
  });

  it('creates release and partner readiness requirements from internal strategy inputs', async () => {
    const seed = await buildHealthcareFrameworkSeed({
      packageDirectory: additionalInfoDir,
    });

    const releaseRequirements = seed.requirements.filter(
      (requirement) => requirement.frameworkId === 'frk_hc_internal_release',
    );
    const doseSpotRequirements = seed.requirements.filter(
      (requirement) => requirement.frameworkId === 'frk_hc_dosespot',
    );

    expect(
      releaseRequirements.some((requirement) =>
        requirement.name.includes('Code security baseline'),
      ),
    ).toBe(true);
    expect(
      doseSpotRequirements.some((requirement) =>
        requirement.name.includes('Webhook event coverage'),
      ),
    ).toBe(true);
  });

  it('connects obligation-backed controls and preserves semiannual cadence', async () => {
    const seed = await buildHealthcareFrameworkSeed({
      packageDirectory: additionalInfoDir,
    });

    expect(
      seed.controlRequirementRelations.some(
        (relation) =>
          relation.A === 'frk_ct_hc_ctrl_att_001' &&
          relation.B === 'frk_rq_hc_obl_att_apr26',
      ),
    ).toBe(true);
    expect(
      seed.controlRequirementRelations.some(
        (relation) =>
          relation.A === 'frk_ct_hc_ctrl_hipaa_001' &&
          relation.B === 'frk_rq_hc_hipaa_1',
      ),
    ).toBe(true);

    const attestationTask = seed.taskTemplates.find(
      (task) => task.id === 'frk_tt_hc_obl_att_apr26',
    );
    expect(attestationTask?.frequency).toBe('semiannual');
  });
});
