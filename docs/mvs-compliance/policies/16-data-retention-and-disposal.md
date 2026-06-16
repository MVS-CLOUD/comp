---
status: draft
frequency: yearly
department: gov
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Retention & Secure Disposal"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC6.5], hipaa: ["164.310(d)(2)", "164.316(b)(2)"] }
---

# Data Retention & Disposal Policy

> DRAFT for human approval.

## 1. Purpose

Define how long MVS retains data and records, and how data and media are securely disposed of
at end of life.

## 2. Scope

All MVS data, backups, logs, and media, plus HIPAA documentation.

## 3. Policy

1. **Retention schedule:** [PLACEHOLDER — define per data type]. Baseline:
   - HIPAA documentation (§164.316(b)(2)): **6 years** from creation or last-effective date.
   - Security/audit logs: **7 years** for PHI-relevant systems (see Logging Policy; the 7-yr
     cold tier is an open P0, GAP_MATRIX #12/#34).
   - PHI: per clinical/legal requirement and customer BAA terms.
2. **Disposal (§164.310(d)(2)):** media re-use requires cryptographic erasure or sanitization;
   key destruction (crypto-shredding) is acceptable for encrypted-at-rest data.
3. **Backups:** retained per the BCDR Policy schedule; expired backups are securely destroyed.
4. **Deletion requests:** handled per the Privacy & Data-Subject Rights procedure.

## 4. MVS tailoring

- Crypto-shredding via KMS key destruction is the primary disposal mechanism given KMS-managed
  at-rest encryption (when MVS-CTL-08 remediation is complete).
- Comp `EvidenceArtifact`/`EvidenceSubmission` carry `expiresAt` — stale evidence is reviewed
  and re-collected, not silently retained.

## 5. Evidence

Retention schedule; disposal/erasure records; key-destruction logs; backup-expiry logs.
