import { createHash } from 'node:crypto';
import { splitRelationValues, type CsvRow } from './csv';

export function buildSourceBundleHash(files: string[]): string {
  const hash = createHash('sha256');
  for (const file of files) {
    hash.update(file);
  }
  return hash.digest('hex');
}

export function buildRequirementMetadata(
  row: CsvRow,
  relatedTests: CsvRow[],
  relatedDecisions: CsvRow[],
) {
  return {
    sourceType: 'healthcare_requirement',
    citation: row['Citation'],
    category: row['Category'],
    standardsReferenced: splitRelationValues(row['Standards_Referenced']),
    conformanceMethod: row['Conformance_Method'],
    testTool: row['Test_Tool'],
    ccgUrl: row['CCG_URL'],
    status: row['Status'],
    hti5Impact: row['HTI5_Impact'],
    ednDiscretion: row['EDN_Discretion'],
    dependsOn: splitRelationValues(row['Depends_On']),
    relatedTestIds: relatedTests.map((test) => test['Test_ID']),
    relatedDecisionIds: relatedDecisions.map((decision) => decision['Decision_ID']),
  };
}

export function buildControlMetadata(
  row: CsvRow,
  relatedEvidence: CsvRow[],
  relatedTests: CsvRow[],
  relatedDecisions: CsvRow[],
) {
  return {
    sourceType: 'healthcare_control',
    category: row['Category'],
    regulation: row['Regulation'],
    owner: row['Owner'],
    frequency: row['Frequency'],
    riskLevel: row['Risk_Level'],
    evidenceIds: splitRelationValues(row['Evidence_IDs']),
    relatedEvidenceIds: relatedEvidence.map((evidence) => evidence['Evidence_ID']),
    relatedTestIds: relatedTests.map((test) => test['Test_ID']),
    relatedDecisionIds: relatedDecisions.map((decision) => decision['Decision_ID']),
    notes: row['Notes'],
  };
}

export function buildTaskMetadata(row: CsvRow) {
  return {
    sourceType: 'healthcare_obligation',
    category: row['Category'],
    regulation: row['Regulation'],
    obligationType: row['Obligation_Type'],
    deadline: row['Deadline'],
    owner: row['Owner'],
    status: row['Status'],
    penaltyRisk: row['Penalty_Risk'],
    ednDiscretion: row['EDN_Discretion'],
    notes: row['Notes'],
  };
}

export function isNormativeEvidenceType(value: string): boolean {
  return /policy document|procedure|plan/i.test(value);
}

export function buildPolicyMetadata(row: CsvRow) {
  return {
    sourceType: 'healthcare_evidence',
    category: row['Category'],
    evidenceType: row['Evidence_Type'],
    fileLocation: row['File_Location'],
    owner: row['Owner'],
    status: row['Status'],
    retentionExpiry: row['Retention_Expiry'],
    relatedRequirementIds: splitRelationValues(row['Requirement_IDs']),
    relatedControlIds: splitRelationValues(row['Control_IDs']),
    notes: row['Notes'],
  };
}

export function buildPolicyContent(row: CsvRow) {
  return [
    heading('Source Evidence'),
    paragraph(row['Evidence_Name']),
    heading('Purpose'),
    paragraph(row['Description'] || row['Evidence_Name']),
    heading('Storage'),
    paragraph(row['File_Location'] || 'Path not specified'),
    heading('Owner'),
    paragraph(row['Owner'] || 'Owner not specified'),
    heading('Retention'),
    paragraph(row['Retention_Expiry'] || 'Retention not specified'),
    heading('Notes'),
    paragraph(row['Notes'] || 'No additional notes provided.'),
  ];
}

function heading(text: string) {
  return {
    type: 'heading',
    attrs: { level: 2, textAlign: null },
    content: [{ type: 'text', text }],
  };
}

function paragraph(text: string) {
  return {
    type: 'paragraph',
    attrs: { textAlign: null },
    content: [{ type: 'text', text }],
  };
}
