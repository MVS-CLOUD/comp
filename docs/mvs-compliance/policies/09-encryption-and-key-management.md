---
status: draft
frequency: yearly
department: it
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Encryption & Crypto Controls"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC6.1, CC6.7], hipaa: ["164.312(a)(2)(iv)", "164.312(e)(1)", "164.312(e)(2)(ii)"], onc: ["170.315(d)(12)", "170.315(d)(9)"] }
---

# Encryption & Key Management Policy

> DRAFT for human approval. Implements crosswalk controls MVS-CTL-01, MVS-CTL-06, MVS-CTL-08.

## 1. Purpose

Protect the confidentiality and integrity of MVS data with strong, well-managed cryptography
across all services and jurisdictions.

## 2. Scope

All systems, applications, databases, backups, and communications handling T0/T1 data.

## 3. Policy

1. **At rest (§164.312(a)(2)(iv)):** AES-256 via AWS KMS CMKs (`security/kms`,
   `kms-baseline-mgmt`). *Open P0 (GAP_MATRIX #16):* CNPG is on `local-path`, MinIO SSE-KMS is
   not enabled, host-disk LUKS is unverified — these must be remediated and proven.
2. **In transit (§164.312(e), ONC d(9)):** TLS 1.2+ externally; Linkerd mTLS internally; VPC
   endpoints; no plaintext PHI in transit.
3. **Credential encryption (ONC d(12)):** Better Auth scrypt password hashing; OAuth tokens
   encrypted (`encryptOAuthTokens`); SCIM tokens hashed; OIDC client secrets in Infisical
   (reference-only in DB); session JWE cookie cache; log redaction.
4. **Key management:** keys are generated, stored, rotated, and destroyed via KMS / Infisical;
   no static long-lived secrets in code or images; Pulumi ESC OIDC → STS for cloud access.
5. **Algorithms:** approved suites only (AES-256-GCM, TLS 1.2+); deprecated algorithms prohibited.

## 4. MVS tailoring

- Secrets management is Infisical EE self-hosted with external-secrets + K8s Auth (no stored
  secret), OpenBao fallback. **The Infisical BAA decision is overdue (2026-06-15)** — until
  resolved, this is the program's top key-management risk.
- Runtime proof of credential encryption (redacted DB query showing ciphertext) is required
  before ONC d(12) sign-off.

## 5. Evidence

KMS key policies; `d12-credential-encryption.md`; SSE-KMS config; Linkerd mTLS config;
encryption-posture check (`healthos-cloud`).
