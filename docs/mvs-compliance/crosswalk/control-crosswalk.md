# Control Crosswalk — write once, satisfy four regimes

> **STATUS: DRAFT for review.** Model each control **once** in Comp AI and tag it (via
> `RequirementMap`) to the SOC 2, HIPAA Security Rule, and the two healthcare ONC frameworks
> (`frk_hc_onc_2026_core`, `frk_hc_hipaa_security`) so a single MFA-config check or access
> review counts as evidence across ONC §170.315(d), SOC 2 CC6/CC7, HIPAA §164.312, and the
> HIPAA NPRM proposed hard requirements.

## Why this exists

HealthOS's ONC readiness is gated today on **runtime d(12)/d(13) capture** (both currently
IN-PROGRESS / "no-go for signing"). The same authentication + encryption + audit controls
that close d(12)/d(13) *also* close the highest-value SOC 2 CC6 criteria and HIPAA §164.312
technical safeguards. So the d12/d13 runtime-evidence sprint is the single highest-leverage
compliance task across all three regimes. This crosswalk is the "write-once" mapping that
makes that leverage explicit.

Comp's data model is built for this multi-tag:
`FrameworkEditorRequirement` → `FrameworkEditorControlTemplate` instantiates per-org to
`Control`, and `RequirementMap` links one `Control` to requirements in many
`FrameworkInstance`s. The `frk_hc_*` frameworks additionally carry
`ExternalValidation (onc_acb | onc_atl)` types for the certification authority sign-off.

## How to read the State column

- **DONE** — control designed and operating; recurring evidence still required in the Type II window.
- **IN-PROGRESS** — partially implemented or design-complete but runtime proof missing.
- **NOT-STARTED** — control not yet built/connected.

The CSV sibling (`control-crosswalk.csv`) is the importable form: one row per `controlId`,
with pipe-delimited framework tags suitable for generating `RequirementMap` records.

---

## Crosswalk

### MVS-CTL-01 — Stored credential encryption

- **What it is:** Better Auth scrypt password hashing; OAuth tokens encrypted at rest
  (`encryptOAuthTokens: true`); SCIM tokens hashed; OIDC client secrets stored in Infisical
  (reference-only in the DB); session JWE cookie cache; log redaction in
  `packages/logs/lib/logger.ts`.
- **ONC:** §170.315(d)(12) — Encrypt authentication credentials
- **SOC 2:** CC6.1, CC6.7
- **HIPAA §164.312:** (a)(2)(iv) Encryption and decryption (addressable)
- **HIPAA NPRM:** Encryption at rest mandatory (addressable → required)
- **Source evidence:** `docs/compliance/onc-drummond/v1.0.0-evidence-package/d12-credential-encryption.md`;
  `packages/auth/central-auth.ts:1122,1094,963`; `packages/auth/lib/oidc-client-secret-storage.ts`
- **State:** IN-PROGRESS — runtime DB proof (redacted query showing ciphertext at rest) and
  OIDC client-secret backfill still required. "No-go for signing" until captured.
- **Comp modeling:** one `Control`; `EvidenceClass = deterministic`; recurring evidence via a
  `healthos-repo` / `healthos-cloud` check once written, manual-attested in cycle one.

### MVS-CTL-02 — Multi-factor authentication

- **What it is:** Better Auth `twoFactor()` TOTP + passkeys; enrollment UI (`TwoFactorBlock`);
  login challenge; Okta IdP enforcement option.
- **ONC:** §170.315(d)(13) — Multi-factor authentication support
- **SOC 2:** CC6.1
- **HIPAA §164.312:** (d) Person or entity authentication
- **HIPAA NPRM:** MFA mandatory for **all** access (not just remote)
- **Source evidence:** `docs/compliance/onc-drummond/v1.0.0-evidence-package/d13-multi-factor-authentication.md`;
  `packages/auth/central-auth.ts:977,539`
- **State:** IN-PROGRESS — source-supported, but MFA is currently **optional / self-service**.
  No tenant-wide *mandatory* gate was found. NPRM would require building that gate. Runtime
  enrollment capture required (disposable-user screenshots).
- **Comp modeling:** one `Control`; gap = "enforce tenant-wide MFA" tracked as a `Task`.

### MVS-CTL-03 — Audit-log generation + tamper detection

- **What it is:** Application audit events (`apps/web/lib/voice/audit-logger.ts`); CNPG
  `pgaudit` enabled (`cluster.yaml:32`); EKS control-plane logs; append-only
  `evidence_manifests` trigger (`001_agent_registry.sql:446`).
- **ONC:** §170.315(d)(2),(d)(3),(d)(7) — audit log series
- **SOC 2:** CC7.2
- **HIPAA §164.312:** (b) Audit controls; (c)(1) Integrity
- **HIPAA NPRM:** Audit log + integrity controls required
- **Source evidence:** `audit-logger.ts`; `001_agent_registry.sql:446`; mvs-infra
  `security-model.md` Audit section
- **State:** IN-PROGRESS — `evidence_manifests` migration not yet applied (GAP_MATRIX #26).
- **Comp modeling:** one `Control`; `EvidenceClass = deterministic`.

### MVS-CTL-04 — Unique user ID + access control + emergency access

- **What it is:** Okta unique identities for everything; break-glass IAM role
  `breakglass-mvs` (YubiKey, 90-day rotation, monthly access review, PagerDuty +
  `#security-breakglass` alarming); RBAC.
- **ONC:** §170.315(d)(1) — Authentication, access control, authorization
- **SOC 2:** CC6.1, CC6.2, CC6.3
- **HIPAA §164.312:** (a)(1) Access control; (a)(2)(i) Unique user identification;
  (a)(2)(ii) Emergency access procedure
- **HIPAA NPRM:** All addressable → required
- **Source evidence:** mvs-infra `security-model.md` Identity section; HealthOS GAP_MATRIX #3
  (BFF RBAC enforcement)
- **State:** DONE (design + operating); BFF RBAC enforcement IN-PROGRESS (GAP_MATRIX #3).
  Access-review evidence must recur monthly through the observation window.
- **Comp modeling:** one `Control`; recurring monthly access-review `Task`.

### MVS-CTL-05 — Automatic logoff / session expiry

- **What it is:** Better Auth session expiry; 24h 2FA cookie max-age.
- **ONC:** §170.315(d)(5) — Automatic access time-out
- **SOC 2:** CC6.1
- **HIPAA §164.312:** (a)(2)(iii) Automatic logoff (addressable)
- **HIPAA NPRM:** Required
- **Source evidence:** `packages/auth/central-auth.ts` session config
- **State:** IN-PROGRESS — runtime proof required.
- **Comp modeling:** one `Control`; `EvidenceClass = deterministic`.

### MVS-CTL-06 — Transmission security

- **What it is:** TLS everywhere; Linkerd mTLS service mesh; VPC endpoints; locked egress SGs.
- **ONC:** §170.315(d)(9) — Trusted connection
- **SOC 2:** CC6.6, CC6.7
- **HIPAA §164.312:** (e)(1) Transmission security; (e)(2)(ii) Encryption (addressable)
- **HIPAA NPRM:** Encryption in transit mandatory
- **Source evidence:** mvs-infra `security-model.md` Network section; HealthOS GAP_MATRIX #15
  (egress allowlists)
- **State:** DONE (design); NetworkPolicy / egress coverage proof recurring (GAP_MATRIX #14/#15).
- **Comp modeling:** one `Control`; `healthos-cloud` check + manual attest.

### MVS-CTL-07 — End-user device / endpoint posture

- **What it is:** JumpCloud `Device` posture in Comp (`device.prisma`,
  `fleet-policy-result.prisma`); HealthOS clinician-device posture.
- **ONC:** (operational — supports d-series)
- **SOC 2:** CC6.7
- **HIPAA §164.312:** (a)(2)(iv); §164.310(d) device & media controls
- **HIPAA NPRM:** Asset inventory required
- **Source evidence:** Comp `device.prisma`, `fleet-policy-result.prisma`; JumpCloud integration manifest
- **State:** NOT-STARTED — connect JumpCloud integration.
- **Comp modeling:** one `Control`; `jumpcloud` integration check.

### MVS-CTL-08 — Encryption at rest (storage / backups)

- **What it is:** KMS CMKs (`security/kms`, `pulumi/projects/kms-baseline-mgmt`); AES-256-GCM
  messaging; intended SSE-KMS on object storage; intended LUKS on host disks.
- **ONC:** supports §170.315(d)(12) and (d) series
- **SOC 2:** CC6.1
- **HIPAA §164.312:** (a)(2)(iv) Encryption/decryption; (e)(2)(ii) Encryption in transit
- **HIPAA NPRM:** Encryption at rest mandatory
- **Source evidence:** mvs-infra Encryption section; HealthOS GAP_MATRIX #16
- **State:** IN-PROGRESS — **P0 open**: CNPG currently on `local-path`, MinIO SSE-KMS not
  enabled, host-disk LUKS unverified. This is a top remediation target.
- **Comp modeling:** one `Control`; `healthos-cloud` `encryption-posture` check delegates to harness.

### MVS-CTL-09 — Centralized, retained audit trail (7-year)

- **What it is:** 5 EKS control-plane log types → CloudWatch (CMK) → Firehose → S3 + Datadog;
  org CloudTrail; GuardDuty EKS; Octopus 7-yr audit log; Pulumi Cloud audit.
- **ONC:** §170.315(d) audit series
- **SOC 2:** CC7.2, CC4.1
- **HIPAA §164.312:** (b) Audit controls
- **HIPAA NPRM:** Required
- **Source evidence:** mvs-infra Audit section; HealthOS GAP_MATRIX #12/#34
- **State:** DONE (control plane); app-log **7-yr cold tier NOT-STARTED** (Loki 30d only,
  Wasabi 6y ≠ 7y) — GAP_MATRIX #12/#34 P0.
- **Comp modeling:** one `Control`; `healthos-cloud` `logging-retention` check.

### MVS-CTL-10 — Admission control + change integrity

- **What it is:** Kyverno on all clusters (PSS-restricted, image-signature verify intended);
  Pulumi ESC OIDC → STS (no static cloud keys).
- **ONC:** supports d-series change integrity
- **SOC 2:** CC6.8, CC8.1
- **HIPAA §164.312:** (c)(1) Integrity
- **HIPAA NPRM:** Required
- **Source evidence:** mvs-infra Admission section; HealthOS GAP_MATRIX #18
- **State:** DONE (Audit mode); cosign image signing **NOT-STARTED** (GAP_MATRIX #18 P0);
  `verifyImages` pending.
- **Comp modeling:** one `Control`; `healthos-cloud` / `healthos-repo` check.

---

## Sequencing note

Because d(12)/d(13) runtime capture (MVS-CTL-01, MVS-CTL-02) simultaneously closes ONC
sign-off, SOC 2 CC6.1/CC6.7, and HIPAA §164.312(a)(2)(iv)/(d), it is the **first sprint**.

**AI-EXECUTABLE:** draft the Comp `Control` records, the `RequirementMap` tags, and the
evidence-capture checklists from the d12/d13 packages. **NEEDS-HUMAN:** the actual runtime
capture (disposable-user enrollment screenshots, redacted DB queries) and the Security-owner
sign-off named in each ONC package's "Sign only when…" section.
