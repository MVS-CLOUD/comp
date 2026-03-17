import { PrismaClient } from '@prisma/client';
import path from 'node:path';
import { buildHealthcareFrameworkSeed } from './build-seed';

type PrismaLike = Pick<
  PrismaClient,
  | 'frameworkEditorFramework'
  | 'frameworkEditorRequirement'
  | 'frameworkEditorControlTemplate'
  | 'frameworkEditorPolicyTemplate'
  | 'frameworkEditorTaskTemplate'
>;

type SeedRelation = { A: string; B: string };

export async function seedHealthcareFrameworks(prisma: PrismaLike) {
  const packageDirectory = path.resolve(
    __dirname,
    './source',
  );
  const supplementalDirectory = path.resolve(
    __dirname,
    '../../../../../../additional-info/healthos_onc_hardened_final_package_2026-03-15',
  );

  const seed = await buildHealthcareFrameworkSeed({
    packageDirectory,
    supplementalDirectory,
  });

  await upsertMany(prisma.frameworkEditorFramework, seed.frameworks);
  await upsertMany(prisma.frameworkEditorRequirement, seed.requirements);
  await upsertMany(prisma.frameworkEditorControlTemplate, seed.controlTemplates);
  await upsertMany(prisma.frameworkEditorPolicyTemplate, seed.policyTemplates);
  await upsertMany(prisma.frameworkEditorTaskTemplate, seed.taskTemplates);

  await connectRelations(
    prisma.frameworkEditorControlTemplate,
    'requirements',
    seed.controlRequirementRelations,
  );
  await connectRelations(
    prisma.frameworkEditorControlTemplate,
    'policyTemplates',
    seed.controlPolicyRelations,
  );
  await connectRelations(
    prisma.frameworkEditorControlTemplate,
    'taskTemplates',
    seed.controlTaskRelations,
  );

  return seed;
}

async function upsertMany(
  model: {
    upsert: (args: {
      where: { id: string };
      create: Record<string, unknown>;
      update: Record<string, unknown>;
    }) => Promise<unknown>;
  },
  records: Array<Record<string, unknown>>,
) {
  for (const record of records) {
    await model.upsert({
      where: { id: String(record.id) },
      create: record,
      update: record,
    });
  }
}

async function connectRelations(
  model: {
    update: (args: {
      where: { id: string };
      data: Record<string, unknown>;
    }) => Promise<unknown>;
  },
  relationField: 'requirements' | 'policyTemplates' | 'taskTemplates',
  relations: SeedRelation[],
) {
  for (const relation of relations) {
    await model.update({
      where: { id: relation.A },
      data: {
        [relationField]: {
          connect: { id: relation.B },
        },
      },
    });
  }
}
