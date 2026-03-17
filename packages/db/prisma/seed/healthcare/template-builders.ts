import type { CsvRow } from './csv';
import { buildTaskMetadata } from './provenance';

export function buildManualRequirements(
  frameworkId: string,
  prefix: string,
  items: readonly (readonly [string, string])[],
) {
  return items.map(([name, description], index) => ({
    id: requirementId(`${prefix}-${index + 1}`),
    frameworkId,
    name,
    identifier: `${prefix}-${index + 1}`,
    description,
    sourceMetadata: { sourceType: 'manual_overlay', overlay: prefix },
  }));
}

export function buildObligationTaskTemplate(
  row: CsvRow,
  mapFrequency: (value: string) => TaskFrequency,
  mapDepartment: (owner: string) => TaskDepartment,
  isManualCategory: (category: string) => boolean,
) {
  return {
    id: taskTemplateId(row['Obligation_ID']),
    name: row['Obligation_Name'],
    description: row['Description'],
    frequency: mapFrequency(row['Frequency']),
    department: mapDepartment(row['Owner']),
    automationStatus: isManualCategory(row['Category']) ? 'MANUAL' : 'AUTOMATED',
    sourceMetadata: buildTaskMetadata(row),
  };
}

type TaskFrequency =
  | 'ongoing'
  | 'one_time'
  | 'monthly'
  | 'quarterly'
  | 'semiannual'
  | 'yearly';
type TaskDepartment = 'admin' | 'gov' | 'hr' | 'it' | 'itsm' | 'qms';

function requirementId(code: string) {
  return `frk_rq_hc_${slug(code)}`;
}

function taskTemplateId(code: string) {
  return `frk_tt_hc_${slug(code)}`;
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}
