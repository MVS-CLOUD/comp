# HealthOS Release Readiness Runbook

## Purpose
This runbook describes how to operate the current HealthOS release-readiness flow for one organization and one production service using the product and API surface that already exists in this repo.

It is intentionally grounded in the current implementation:
- install the seeded healthcare framework set
- connect the HealthOS integration providers
- create a release subject, definition, and run
- collect deterministic checks, manual attestations, and external validations
- evaluate the release gate

## Preconditions
- The target operator is an org `owner` or `admin`.
- At least one observer has `framework:read` access, such as an `auditor`.
- The target organization is already created.
- The HealthOS runtime, docs, repo, CI, cloud, and partner verification endpoints are reachable.
- The verification harness exists for repo, CI, cloud, and partner checks.

## Required Permissions
- `framework:read`: view the release-readiness route and current runs.
- `framework:create`: install healthcare frameworks, create subjects, definitions, runs, manual attestations, and external validations.
- `framework:update`: approve or reject attestations and validations, evaluate a release run.
- `integration:read`, `integration:create`, `integration:update`: connect and configure HealthOS providers and run checks.

## Current UI Entry Points
- `/{orgId}/release-readiness`
- `/{orgId}/integrations`
- `/{orgId}/frameworks`
- `/{orgId}/tasks`

## Native Healthcare Frameworks
Install the full healthcare framework set before modeling any release:
- `frk_hc_onc_2026_core`
- `frk_hc_onc_conditions`
- `frk_hc_hipaa_security`
- `frk_hc_smart_runtime`
- `frk_hc_dosespot`
- `frk_hc_internal_release`

## Current HealthOS Providers
- `healthos-runtime`
  - Required variables: `fhir_base_url`
  - Optional credentials: `auth_header`
  - Main checks: `smart_configuration`, `capability_statement`
- `healthos-documentation`
  - Required variables: `documentation_base_url`, `endpoint_directory_url`
  - Main checks: `public_documentation`, `endpoint_directory`
- `healthos-repo`
  - Required variables: `verification_base_url`
  - Optional variables: `repository`
  - Optional credentials: `auth_header`
  - Main checks: `repository_branch_protection`, `repository_code_scanning`
- `healthos-ci`
  - Required variables: `verification_base_url`
  - Optional variables: `release_identifier`
  - Optional credentials: `auth_header`
  - Main checks: `ci_required_workflows`, `ci_release_artifacts`
- `healthos-cloud`
  - Required variables: `verification_base_url`
  - Optional variables: `cloud_scope`
  - Optional credentials: `auth_header`
  - Main checks: `cloud_logging_retention`, `cloud_encryption_posture`
- `healthos-partner`
  - Required variables: `verification_base_url`
  - Optional credentials: `auth_header`
  - Main checks: `partner_webhook_replay`, `partner_status_mapping`

## Phase 1: Install Healthcare Frameworks
1. Open `/{orgId}/release-readiness`.
2. Click `Install healthcare frameworks`.
3. Confirm the framework count updates.
4. Optionally open `/{orgId}/frameworks` to verify org framework instances were created.

Equivalent API call:

```bash
curl -X POST \
  "$BASE_URL/v1/frameworks/healthcare/install" \
  -H "x-organization-id: $ORG_ID" \
  -H "Cookie: $SESSION_COOKIE"
```

Expected result:

```json
{
  "success": true,
  "frameworksAdded": 6
}
```

## Phase 2: Connect HealthOS Providers
Create and configure each provider through `/{orgId}/integrations`.

Recommended production-first connections:
- `healthos-runtime`
- `healthos-documentation`
- `healthos-repo`
- `healthos-ci`
- `healthos-cloud`
- `healthos-partner`

### Example variables
- `healthos-runtime`

```json
{
  "fhir_base_url": "https://developer.healthos.io/fhir"
}
```

- `healthos-documentation`

```json
{
  "documentation_base_url": "https://developer.healthos.io",
  "endpoint_directory_url": "https://fhir.healthos.io/.well-known/endpoints.json"
}
```

- `healthos-repo`

```json
{
  "verification_base_url": "https://repo-harness.internal",
  "repository": "your-org/healthos"
}
```

- `healthos-ci`

```json
{
  "verification_base_url": "https://ci-harness.internal",
  "release_identifier": "build-1234"
}
```

- `healthos-cloud`

```json
{
  "verification_base_url": "https://cloud-harness.internal",
  "cloud_scope": "production"
}
```

- `healthos-partner`

```json
{
  "verification_base_url": "https://partner-harness.internal"
}
```

## Phase 3: Run Deterministic Checks
Run every required HealthOS check at least once before the first dry run.

Recommended first-pass check set:
- `smart_configuration`
- `capability_statement`
- `public_documentation`
- `endpoint_directory`
- `repository_branch_protection`
- `repository_code_scanning`
- `ci_required_workflows`
- `ci_release_artifacts`
- `cloud_logging_retention`
- `cloud_encryption_posture`
- `partner_webhook_replay`
- `partner_status_mapping`

Example check execution:

```bash
curl -X POST \
  "$BASE_URL/v1/integrations/checks/connections/$CONNECTION_ID/run/smart_configuration" \
  -H "x-organization-id: $ORG_ID" \
  -H "Cookie: $SESSION_COOKIE"
```

Expected result shape:

```json
{
  "connectionId": "int_conn_...",
  "providerSlug": "healthos-runtime",
  "checkRunId": "int_run_...",
  "results": [],
  "totalFindings": 0,
  "totalPassing": 1,
  "durationMs": 123
}
```

## Phase 4: Create The Release Subject
Create one release subject per service or API surface you want to gate.

Recommended first subject payload:

```json
{
  "type": "service",
  "name": "HealthOS Production API",
  "description": "Primary production API surface for healthcare release approval.",
  "repositoryUrl": "https://github.com/your-org/healthos",
  "environment": "production",
  "serviceBaseUrl": "https://api.healthos.io",
  "fhirBaseUrl": "https://developer.healthos.io/fhir",
  "partnerProfile": "dosespot"
}
```

Example API call:

```bash
curl -X POST \
  "$BASE_URL/v1/release-readiness/subjects" \
  -H "Content-Type: application/json" \
  -H "x-organization-id: $ORG_ID" \
  -H "Cookie: $SESSION_COOKIE" \
  -d @subject.json
```

## Phase 5: Create The Release Definition
Use fixed keys for approvals and external validations. Do not invent new keys per release.

Recommended first definition:

```json
{
  "releaseSubjectId": "rrs_...",
  "name": "healthos-production-gate",
  "description": "Deterministic release gate for the first production HealthOS service.",
  "requiredFrameworkIds": [
    "frk_hc_onc_2026_core",
    "frk_hc_onc_conditions",
    "frk_hc_hipaa_security",
    "frk_hc_smart_runtime",
    "frk_hc_dosespot",
    "frk_hc_internal_release"
  ],
  "requiredCheckIds": [
    "smart_configuration",
    "capability_statement",
    "public_documentation",
    "endpoint_directory",
    "repository_branch_protection",
    "repository_code_scanning",
    "ci_required_workflows",
    "ci_release_artifacts",
    "cloud_logging_retention",
    "cloud_encryption_posture",
    "partner_webhook_replay",
    "partner_status_mapping"
  ],
  "requiredApprovalKeys": [
    "eng_release_owner",
    "security_signoff",
    "compliance_signoff"
  ],
  "requiredExternalValidationKeys": [
    "onc_evidence_packet",
    "partner_validation_packet"
  ]
}
```

## Phase 6: Create The Release Run
Create a release run for each candidate release.

Recommended payload:

```json
{
  "releaseDefinitionId": "rrd_...",
  "version": "2026.03.17.1",
  "commitSha": "abc123def456",
  "buildId": "build-1234"
}
```

## Phase 7: Record Manual Attestations
Create all required manual attestations before evaluating the gate.

Example payload:

```json
{
  "releaseRunId": "rrn_...",
  "approvalKey": "security_signoff",
  "title": "Security review completed",
  "approverId": "mem_...",
  "notes": "Reviewed current findings and approved release candidate.",
  "expiresAt": "2026-03-31T23:59:59.000Z"
}
```

Then approve it:

```json
{
  "status": "approved",
  "notes": "Approved for this release window."
}
```

## Phase 8: Record External Validations
Create required external validations with real artifact URLs or reference IDs.

Example payload:

```json
{
  "releaseRunId": "rrn_...",
  "validationKey": "partner_validation_packet",
  "type": "partner",
  "title": "DoseSpot partner validation complete",
  "authority": "DoseSpot",
  "referenceId": "DSP-2026-0317",
  "artifactUrl": "https://artifacts.example.com/partner/dosespot-2026-0317.zip",
  "validFrom": "2026-03-17T00:00:00.000Z",
  "validTo": "2026-04-17T00:00:00.000Z"
}
```

Then approve it:

```json
{
  "status": "approved",
  "notes": "Validated by partner review."
}
```

## Phase 9: Evaluate The Release Gate
Evaluate only after frameworks, checks, attestations, and validations are all in place.

```bash
curl -X POST \
  "$BASE_URL/v1/release-readiness/runs/$RUN_ID/evaluate" \
  -H "x-organization-id: $ORG_ID" \
  -H "Cookie: $SESSION_COOKIE"
```

Expected pass result:

```json
{
  "releaseRunId": "rrn_...",
  "decision": "pass",
  "summary": "All blocking checks and approvals are satisfied.",
  "blockingReasons": {
    "missingFrameworkCount": 0,
    "missingCheckIds": [],
    "missingApprovalKeys": [],
    "blockingApprovalKeys": [],
    "missingExternalValidationKeys": [],
    "blockingExternalValidationKeys": []
  },
  "evidenceHash": "..."
}
```

## Failure Triage
If evaluation fails, use `blockingReasons` as the only authoritative remediation list.

Most common failure categories:
- missing healthcare framework install
- missing or failing check IDs
- missing manual attestation keys
- pending, rejected, or expired attestations
- missing external validation keys
- pending, rejected, or expired external validations

## Current Limitations
- The current release-readiness page is not a full authoring workflow yet.
- Operators must still create subjects, definitions, runs, attestations, and validations through the API.
- The repo does not contain the HealthOS app code itself.
- Repo, CI, cloud, and partner verification depend on external harness endpoints.
- AI-assisted evidence is not gate-eligible and should not be treated as release truth.

## Validation Checklist
- All six healthcare frameworks are installed in the org.
- All required HealthOS connections are active.
- All required variables are populated.
- Each required check has at least one successful run for the release candidate.
- Every required manual attestation exists and is approved.
- Every required external validation exists and is approved.
- Gate evaluation returns `decision: "pass"`.
