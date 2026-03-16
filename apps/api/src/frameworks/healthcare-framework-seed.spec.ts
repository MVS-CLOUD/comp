import path from 'node:path';
import { buildHealthcareFrameworkSeed } from '../../../../packages/db/prisma/seed/healthcare/build-seed';

describe('buildHealthcareFrameworkSeed', () => {
  const packageDirectory = path.resolve(
    __dirname,
    '../../../../packages/db/prisma/seed/healthcare/source',
  );

  it('builds the expected healthcare framework library', async () => {
    const seed = await buildHealthcareFrameworkSeed({ packageDirectory });

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
    const seed = await buildHealthcareFrameworkSeed({ packageDirectory });

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

  it('creates internal release and DoseSpot readiness requirements', async () => {
    const seed = await buildHealthcareFrameworkSeed({ packageDirectory });

    expect(
      seed.requirements.some(
        (requirement) =>
          requirement.frameworkId === 'frk_hc_internal_release' &&
          requirement.name.includes('Code security baseline'),
      ),
    ).toBe(true);

    expect(
      seed.requirements.some(
        (requirement) =>
          requirement.frameworkId === 'frk_hc_dosespot' &&
          requirement.name.includes('Webhook event coverage'),
      ),
    ).toBe(true);
  });
});
