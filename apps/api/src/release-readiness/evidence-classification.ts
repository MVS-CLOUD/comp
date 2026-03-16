export const GATE_ELIGIBLE_EVIDENCE_CLASSES = [
  'deterministic',
  'manual_attested',
  'external_validated',
] as const;

export const NON_GATING_EVIDENCE_CLASSES = [
  'ai_assisted',
  'browser_collected',
] as const;

export type GateEligibleEvidenceClass =
  (typeof GATE_ELIGIBLE_EVIDENCE_CLASSES)[number];

export type NonGatingEvidenceClass =
  (typeof NON_GATING_EVIDENCE_CLASSES)[number];

export function isGateEligibleEvidenceClass(
  value: string | null | undefined,
): value is GateEligibleEvidenceClass {
  return GATE_ELIGIBLE_EVIDENCE_CLASSES.includes(
    value as GateEligibleEvidenceClass,
  );
}

export function isNonGatingEvidenceClass(
  value: string | null | undefined,
): value is NonGatingEvidenceClass {
  return NON_GATING_EVIDENCE_CLASSES.includes(
    value as NonGatingEvidenceClass,
  );
}
