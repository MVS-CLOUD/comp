import fs from 'node:fs/promises';
import path from 'node:path';
import { parseCsv, splitRelationValues, type CsvRow } from './csv';
import { DATE_STRING, FRAMEWORKS, MANUAL_REQUIREMENTS } from './catalog';
import {
  buildControlMetadata,
  buildPolicyContent,
  buildPolicyMetadata,
  buildRequirementMetadata,
  buildSourceBundleHash,
  buildTaskMetadata,
  isNormativeEvidenceType,
} from './provenance';
import {
  buildManualRequirements,
  buildObligationTaskTemplate,
} from './template-builders';

type SeedFramework = {
  id: string;
  name: string;
  slug: string;
  catalog: string;
  description: string;
  version: string;
  visible: boolean;
  sourceVersion: string;
  sourceBundleHash: string;
};

type SeedRequirement = {
  id: string;
  frameworkId: string;
  name: string;
  identifier: string;
  description: string;
  sourceMetadata?: Record<string, unknown>;
};

type SeedControlTemplate = {
  id: string;
  name: string;
  description: string;
  sourceMetadata?: Record<string, unknown>;
};
type SeedPolicyTemplate = {
  id: string;
  name: string;
  description: string;
  frequency: 'yearly';
  department: 'gov' | 'it' | 'itsm' | 'admin' | 'qms' | 'hr';
  content: Array<Record<string, unknown>>;
  sourceMetadata?: Record<string, unknown>;
};
type SeedTaskTemplate = {
  id: string;
  name: string;
  description: string;
  frequency:
    | 'ongoing'
    | 'one_time'
    | 'monthly'
    | 'quarterly'
    | 'semiannual'
    | 'yearly';
  department: 'admin' | 'gov' | 'hr' | 'it' | 'itsm' | 'qms';
  automationStatus: 'AUTOMATED' | 'MANUAL';
  sourceMetadata?: Record<string, unknown>;
};

type BuildSeedOptions = { packageDirectory: string; supplementalDirectory?: string };

export async function buildHealthcareFrameworkSeed({ packageDirectory, supplementalDirectory }: BuildSeedOptions) {
  const supplementalPath = supplementalDirectory ?? packageDirectory;
  const requirementSource = await readFile(packageDirectory, 'notion_db_requirements.csv');
  const controlSource = await readFile(packageDirectory, 'notion_db_controls.csv');
  const obligationSource = await readFile(packageDirectory, 'notion_db_obligations.csv');
  const evidenceSource = await readFile(supplementalPath, 'notion_db_evidence.csv');
  const testSource = await readFile(supplementalPath, 'notion_db_tests.csv');
  const decisionSource = await readFile(supplementalPath, 'notion_db_decisions.csv');
  const sourceBundleHash = buildSourceBundleHash([
    requirementSource,
    controlSource,
    obligationSource,
    evidenceSource,
    testSource,
    decisionSource,
  ]);
  const requirements = parseCsv(requirementSource);
  const controls = parseCsv(controlSource);
  const obligations = parseCsv(obligationSource);
  const evidence = parseCsv(evidenceSource);
  const tests = parseCsv(testSource);
  const decisions = parseCsv(decisionSource);

  const oncRequirements = requirements.map((row) => ({
    id: requirementId(row['Req_ID']),
    frameworkId: 'frk_hc_onc_2026_core',
    name: row['Criterion_Name'],
    identifier: row['Req_ID'],
    description: `${row['Citation']} — ${row['Conformance_Method']}. ${row['Notes']}`.trim(),
    sourceMetadata: buildRequirementMetadata(
      row,
      tests.filter((test) => splitRelationValues(test['Requirement_IDs']).includes(row['Req_ID'])),
      decisions.filter((decision) => splitRelationValues(decision['Related_Requirements']).includes(row['Req_ID'])),
    ),
  }));

  const oncConditionRequirements = obligations
    .filter((row) => row['Category'] !== 'HIPAA')
    .map((row) => ({
      id: requirementId(row['Obligation_ID']),
      frameworkId: 'frk_hc_onc_conditions',
      name: row['Obligation_Name'],
      identifier: row['Obligation_ID'],
      description: `${row['Regulation']} — ${row['Description']}`.trim(),
      sourceMetadata: buildTaskMetadata(row),
    }));

  const manualRequirements = [
    ...buildManualRequirements('frk_hc_hipaa_security', 'HIPAA', MANUAL_REQUIREMENTS.hipaa),
    ...buildManualRequirements('frk_hc_smart_runtime', 'SMART', MANUAL_REQUIREMENTS.smart),
    ...buildManualRequirements('frk_hc_dosespot', 'DOSESPOT', MANUAL_REQUIREMENTS.dosespot),
    ...buildManualRequirements('frk_hc_internal_release', 'RELEASE', MANUAL_REQUIREMENTS.release),
  ];

  const controlTemplates = controls.map((row) => ({
    id: controlTemplateId(row['Control_ID']),
    name: row['Control_Name'],
    description: row['Description'] || row['Category'],
    sourceMetadata: buildControlMetadata(
      row,
      evidence.filter((item) => splitRelationValues(item['Control_IDs']).includes(row['Control_ID'])),
      tests.filter((item) => splitRelationValues(item['Evidence_IDs']).some((id) => splitRelationValues(row['Evidence_IDs']).includes(id))),
      decisions.filter((item) => splitRelationValues(item['Related_Controls']).includes(row['Control_ID'])),
    ),
  }));

  const manualControlTemplates = buildManualControlTemplates();
  const policyTemplates = evidence
    .filter((row) => isNormativeEvidenceType(row['Evidence_Type']))
    .map((row) => ({
      id: policyTemplateId(row['Evidence_ID']),
      name: row['Evidence_Name'],
      description: row['Description'] || row['Evidence_Name'],
      frequency: 'yearly' as const,
      department: mapDepartment(row['Owner']),
      content: buildPolicyContent(row),
      sourceMetadata: buildPolicyMetadata(row),
    }));
  const taskTemplates = obligations.map((row) =>
    buildObligationTaskTemplate(row, mapFrequency, mapDepartment, isManualCategory),
  );
  const manualTaskTemplates = buildManualTaskTemplates();

  const requirementIdByCode = new Map(
    [...oncRequirements, ...oncConditionRequirements, ...manualRequirements].map((requirement) => [
      requirement.identifier,
      requirement.id,
    ]),
  );

  const controlRequirementRelations = [
    ...controls.flatMap((row) =>
      splitRelationValues(row['Requirement_IDs']).flatMap((code) => {
        const requirementId = requirementIdByCode.get(code);
        return requirementId
          ? [{ A: controlTemplateId(row['Control_ID']), B: requirementId }]
          : [];
      }),
    ),
    ...obligations.flatMap((row) =>
      splitRelationValues(row['Control_IDs']).flatMap((controlCode) => {
        const requirementId = requirementIdByCode.get(row['Obligation_ID']);
        return requirementId
          ? [{ A: controlTemplateId(controlCode), B: requirementId }]
          : [];
      }),
    ),
    ...buildManualControlRequirementRelations(),
  ];

  const controlTaskRelations = [
    ...obligations.flatMap((row) =>
      splitRelationValues(row['Control_IDs']).map((controlId) => ({
        A: controlTemplateId(controlId),
        B: taskTemplateId(row['Obligation_ID']),
      })),
    ),
    ...buildManualControlTaskRelations(),
  ];
  const controlPolicyRelations = policyTemplates.flatMap((row) =>
    splitRelationValues(
      String(row.sourceMetadata?.relatedControlIds?.join(';') ?? ''),
    ).map((controlId) => ({ A: controlTemplateId(controlId), B: row.id })),
  );

  return {
    frameworks: FRAMEWORKS.map((framework) =>
      withDates({ ...framework, sourceBundleHash }),
    ),
    requirements: [...oncRequirements, ...oncConditionRequirements, ...manualRequirements].map(withDates),
    controlTemplates: [...controlTemplates, ...manualControlTemplates].map(withDates),
    policyTemplates: policyTemplates.map(withDates),
    taskTemplates: [...taskTemplates, ...manualTaskTemplates].map(withDates),
    controlRequirementRelations,
    controlPolicyRelations,
    controlTaskRelations,
  };
}

function buildManualControlTemplates(): SeedControlTemplate[] {
  return [
    ['CTRL-SMART-001', 'SMART/FHIR Conformance', 'Deterministic runtime validation for SMART discovery, auth, and FHIR conformance.'],
    ['CTRL-DOSESPOT-001', 'DoseSpot Certification Readiness', 'Partner scenario coverage, idempotency, and integration proof management.'],
    ['CTRL-REL-001', 'Release Gate Evidence', 'Deterministic release gate evidence and blocker handling.'],
  ].map(([id, name, description]) => ({
    id: controlTemplateId(id),
    name,
    description,
    sourceMetadata: { sourceType: 'manual_overlay', controlCode: id },
  }));
}

function buildManualTaskTemplates(): SeedTaskTemplate[] {
  return [
    task('TSK-SMART-001', 'SMART/FHIR Runtime Checks', 'Run SMART discovery, auth metadata, and FHIR capability validation.', 'itsm', 'AUTOMATED'),
    task('TSK-DOSESPOT-001', 'DoseSpot Scenario Verification', 'Run partner scenario suite and collect readiness artifacts.', 'gov', 'MANUAL'),
    task('TSK-REL-001', 'Release Approval Review', 'Review deterministic blockers, manual attestations, and external validations before release.', 'gov', 'MANUAL'),
  ];
}

function buildManualControlRequirementRelations() {
  return [
    ...manualLinks('CTRL-HIPAA-001', ['HIPAA-1', 'HIPAA-2', 'HIPAA-3']),
    ...manualLinks('CTRL-HIPAA-002', ['HIPAA-4', 'HIPAA-5']),
    ...manualLinks('CTRL-SMART-001', ['SMART-1', 'SMART-2', 'SMART-3', 'SMART-4', 'SMART-5', 'REQ-G10']),
    ...manualLinks('CTRL-DOSESPOT-001', ['DOSESPOT-1', 'DOSESPOT-2', 'DOSESPOT-3', 'DOSESPOT-4']),
    ...manualLinks('CTRL-REL-001', ['RELEASE-1', 'RELEASE-2', 'RELEASE-3', 'RELEASE-4', 'RELEASE-5', 'RELEASE-6']),
  ];
}

function buildManualControlTaskRelations() {
  return [
    { A: controlTemplateId('CTRL-SMART-001'), B: taskTemplateId('TSK-SMART-001') },
    { A: controlTemplateId('CTRL-DOSESPOT-001'), B: taskTemplateId('TSK-DOSESPOT-001') },
    { A: controlTemplateId('CTRL-REL-001'), B: taskTemplateId('TSK-REL-001') },
  ];
}

function manualLinks(controlCode: string, requirementCodes: string[]) {
  return requirementCodes.map((code) => ({ A: controlTemplateId(controlCode), B: requirementId(code) }));
}

function task(code: string, name: string, description: string, department: SeedTaskTemplate['department'], automationStatus: SeedTaskTemplate['automationStatus']): SeedTaskTemplate {
  return { id: taskTemplateId(code), name, description, frequency: 'yearly', department, automationStatus, sourceMetadata: { sourceType: 'manual_overlay', taskCode: code } };
}

function withDates<T extends Record<string, unknown>>(value: T): T & { createdAt: string; updatedAt: string } {
  return { ...value, createdAt: DATE_STRING, updatedAt: DATE_STRING };
}

function requirementId(code: string) { return `frk_rq_hc_${slug(code)}`; }
function controlTemplateId(code: string) { return `frk_ct_hc_${slug(code)}`; }
function policyTemplateId(code: string) { return `frk_pt_hc_${slug(code)}`; }
function taskTemplateId(code: string) { return `frk_tt_hc_${slug(code)}`; }
function slug(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }

function mapFrequency(value: string): SeedTaskTemplate['frequency'] {
  const normalized = value.toLowerCase();
  if (normalized.includes('ongoing')) return 'ongoing';
  if (normalized.includes('one-time') || normalized.includes('one time')) {
    return 'one_time';
  }
  if (normalized.includes('semiannual')) return 'semiannual';
  if (normalized.includes('quarter')) return 'quarterly';
  if (normalized.includes('month')) return 'monthly';
  return 'yearly';
}

function mapDepartment(owner: string): SeedTaskTemplate['department'] {
  const normalized = owner.toLowerCase();
  if (normalized.includes('hr')) return 'hr';
  if (normalized.includes('engineer') || normalized.includes('security')) return 'itsm';
  if (normalized.includes('product')) return 'it';
  return 'gov';
}

function isManualCategory(category: string) {
  return ['Attestations', 'Communications', 'CHPL Maintenance', 'HIPAA'].includes(category);
}

async function readFile(directory: string, fileName: string) {
  return fs.readFile(path.join(directory, fileName), 'utf8');
}
