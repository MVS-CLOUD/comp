import fs from 'node:fs/promises';
import path from 'node:path';
import { parseCsv, splitRelationValues, type CsvRow } from './csv';

type SeedFramework = {
  id: string;
  name: string;
  description: string;
  version: string;
  visible: boolean;
};

type SeedRequirement = {
  id: string;
  frameworkId: string;
  name: string;
  identifier: string;
  description: string;
};

type SeedControlTemplate = { id: string; name: string; description: string };
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
};

type BuildSeedOptions = { packageDirectory: string };

const FRAMEWORKS: SeedFramework[] = [
  { id: 'frk_hc_onc_2026_core', name: 'ONC 2026 Core', description: 'Active ONC certification criteria library', version: '2026-03-15', visible: true },
  { id: 'frk_hc_onc_conditions', name: 'ONC Conditions & Maintenance', description: 'Ongoing ONC obligations and filings', version: '2026-03-15', visible: true },
  { id: 'frk_hc_hipaa_security', name: 'HIPAA Security Rule', description: 'HIPAA technical and operational readiness overlays', version: '2026-03-15', visible: true },
  { id: 'frk_hc_smart_runtime', name: 'SMART on FHIR Runtime', description: 'SMART and FHIR runtime validation requirements', version: '2026-03-15', visible: true },
  { id: 'frk_hc_dosespot', name: 'DoseSpot Readiness', description: 'Internal partner-readiness scaffolding for DoseSpot workflows', version: '2026-03-15', visible: true },
  { id: 'frk_hc_internal_release', name: 'Internal Release Readiness', description: 'Deterministic release and evidence gate requirements', version: '2026-03-15', visible: true },
];

const DATE_STRING = '2026-03-15 00:00:00.000';

const MANUAL_REQUIREMENTS = {
  hipaa: [
    ['Security Risk Analysis', 'Maintain a current HIPAA Security Risk Analysis, remediation register, and owner assignment.'],
    ['Audit Controls and Activity Review', 'Verify systems handling regulated data generate, retain, and review audit evidence.'],
    ['Access Control and Authentication', 'Verify unique identities, least privilege, MFA posture, and emergency access procedures.'],
    ['Transmission Security', 'Verify secure transport, integrity controls, and documented exceptions.'],
    ['Breach Notification Preparedness', 'Maintain breach response readiness, timelines, and supporting procedures.'],
  ],
  smart: [
    ['SMART discovery metadata', 'Verify `.well-known/smart-configuration` is published and internally consistent.'],
    ['SMART authorization metadata', 'Verify authorization, token, revocation, and supported capability metadata.'],
    ['FHIR capability statement coverage', 'Verify CapabilityStatement presence and expected resource/profile coverage.'],
    ['Granular SMART scopes', 'Verify SMART scopes and sub-resource scope behavior are supported and documented.'],
    ['Public developer documentation', 'Verify public FHIR/SMART documentation and endpoint references are available.'],
  ],
  dosespot: [
    ['Webhook event coverage', 'Track required DoseSpot push notification and event-handler coverage.'],
    ['Idempotent event processing', 'Verify duplicate-safe handling and replay-safe processing for partner events.'],
    ['FHIR and status mapping verification', 'Verify response mapping, status transitions, and certification scenarios.'],
    ['Certification artifact packaging', 'Assemble partner-facing evidence and test artifacts for review.'],
  ],
  release: [
    ['Code security baseline', 'Required code security checks, vulnerability posture, and repository protections pass.'],
    ['Runtime and API readiness', 'Required runtime checks for APIs, auth, and external behavior pass.'],
    ['Infrastructure and cloud posture', 'Critical infrastructure checks and logging/retention expectations pass.'],
    ['Evidence packet completeness', 'Required artifacts exist, are fresh, and are exportable.'],
    ['Human-required approvals', 'Required manual approvals are present and unexpired.'],
    ['Partner readiness blockers', 'Partner-specific blockers are resolved or explicitly waived.'],
  ],
} as const;

export async function buildHealthcareFrameworkSeed({ packageDirectory }: BuildSeedOptions) {
  const requirements = parseCsv(await readFile(packageDirectory, 'notion_db_requirements.csv'));
  const controls = parseCsv(await readFile(packageDirectory, 'notion_db_controls.csv'));
  const obligations = parseCsv(await readFile(packageDirectory, 'notion_db_obligations.csv'));

  const oncRequirements = requirements.map((row) => ({
    id: requirementId(row['Req_ID']),
    frameworkId: 'frk_hc_onc_2026_core',
    name: row['Criterion_Name'],
    identifier: row['Req_ID'],
    description: `${row['Citation']} — ${row['Conformance_Method']}. ${row['Notes']}`.trim(),
  }));

  const oncConditionRequirements = obligations
    .filter((row) => row['Category'] !== 'HIPAA')
    .map((row) => ({
      id: requirementId(row['Obligation_ID']),
      frameworkId: 'frk_hc_onc_conditions',
      name: row['Obligation_Name'],
      identifier: row['Obligation_ID'],
      description: `${row['Regulation']} — ${row['Description']}`.trim(),
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
  }));

  const manualControlTemplates = buildManualControlTemplates();
  const taskTemplates = obligations.map(buildObligationTaskTemplate);
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

  return {
    frameworks: FRAMEWORKS.map(withDates),
    requirements: [...oncRequirements, ...oncConditionRequirements, ...manualRequirements].map(withDates),
    controlTemplates: [...controlTemplates, ...manualControlTemplates].map(withDates),
    taskTemplates: [...taskTemplates, ...manualTaskTemplates].map(withDates),
    controlRequirementRelations,
    controlTaskRelations,
  };
}

function buildObligationTaskTemplate(row: CsvRow): SeedTaskTemplate {
  return {
    id: taskTemplateId(row['Obligation_ID']),
    name: row['Obligation_Name'],
    description: row['Description'],
    frequency: mapFrequency(row['Frequency']),
    department: mapDepartment(row['Owner']),
    automationStatus: isManualCategory(row['Category']) ? 'MANUAL' : 'AUTOMATED',
  };
}

function buildManualRequirements(frameworkId: string, prefix: string, items: readonly (readonly [string, string])[]) {
  return items.map(([name, description], index) => ({
    id: requirementId(`${prefix}-${index + 1}`),
    frameworkId,
    name,
    identifier: `${prefix}-${index + 1}`,
    description,
  }));
}

function buildManualControlTemplates(): SeedControlTemplate[] {
  return [
    ['CTRL-SMART-001', 'SMART/FHIR Conformance', 'Deterministic runtime validation for SMART discovery, auth, and FHIR conformance.'],
    ['CTRL-DOSESPOT-001', 'DoseSpot Certification Readiness', 'Partner scenario coverage, idempotency, and integration proof management.'],
    ['CTRL-REL-001', 'Release Gate Evidence', 'Deterministic release gate evidence and blocker handling.'],
  ].map(([id, name, description]) => ({ id: controlTemplateId(id), name, description }));
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
  return { id: taskTemplateId(code), name, description, frequency: 'yearly', department, automationStatus };
}

function withDates<T extends Record<string, unknown>>(value: T): T & { createdAt: string; updatedAt: string } {
  return { ...value, createdAt: DATE_STRING, updatedAt: DATE_STRING };
}

function requirementId(code: string) { return `frk_rq_hc_${slug(code)}`; }
function controlTemplateId(code: string) { return `frk_ct_hc_${slug(code)}`; }
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
