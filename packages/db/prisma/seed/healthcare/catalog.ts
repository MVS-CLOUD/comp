export const DATE_STRING = '2026-03-15T00:00:00.000Z';

export const FRAMEWORKS = [
  { id: 'frk_hc_onc_2026_core', name: 'ONC 2026 Core', slug: 'onc-2026-core', catalog: 'healthcare', description: 'Active ONC certification criteria library', version: '2026-03-15', visible: true, sourceVersion: '2026-03-15', sourceBundleHash: '' },
  { id: 'frk_hc_onc_conditions', name: 'ONC Conditions & Maintenance', slug: 'onc-conditions-maintenance', catalog: 'healthcare', description: 'Ongoing ONC obligations and filings', version: '2026-03-15', visible: true, sourceVersion: '2026-03-15', sourceBundleHash: '' },
  { id: 'frk_hc_hipaa_security', name: 'HIPAA Security Rule', slug: 'hipaa-security-rule', catalog: 'healthcare', description: 'HIPAA technical and operational readiness overlays', version: '2026-03-15', visible: true, sourceVersion: '2026-03-15', sourceBundleHash: '' },
  { id: 'frk_hc_smart_runtime', name: 'SMART on FHIR Runtime', slug: 'smart-on-fhir-runtime', catalog: 'healthcare', description: 'SMART and FHIR runtime validation requirements', version: '2026-03-15', visible: true, sourceVersion: '2026-03-15', sourceBundleHash: '' },
  { id: 'frk_hc_dosespot', name: 'DoseSpot Readiness', slug: 'dosespot-readiness', catalog: 'healthcare', description: 'Internal partner-readiness scaffolding for DoseSpot workflows', version: '2026-03-15', visible: true, sourceVersion: '2026-03-15', sourceBundleHash: '' },
  { id: 'frk_hc_internal_release', name: 'Internal Release Readiness', slug: 'internal-release-readiness', catalog: 'healthcare', description: 'Deterministic release and evidence gate requirements', version: '2026-03-15', visible: true, sourceVersion: '2026-03-15', sourceBundleHash: '' },
] as const;

export const MANUAL_REQUIREMENTS = {
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
