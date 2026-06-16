---
status: draft
frequency: yearly
department: gov
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Risk Management"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC3.1, CC3.2, CC3.4, CC9.1], hipaa: ["164.308(a)(1)(ii)(A)", "164.308(a)(1)(ii)(B)"] }
---

# Risk Management Policy

> DRAFT for human approval. Links to the HIPAA SRA cadence (`sra/hipaa-security-risk-analysis.md`).

## 1. Purpose

Define how MVS identifies, assesses, treats, and monitors information security and privacy
risk, and how the HIPAA Security Risk Analysis (SRA) is maintained.

## 2. Scope

All risks to the confidentiality, integrity, and availability of MVS data and systems,
including ePHI.

## 3. Policy

1. **Risk analysis (§164.308(a)(1)(ii)(A)):** a formal HIPAA SRA (NIST SP 800-30 structure)
   is maintained, reviewed at least annually and on material change.
2. **Risk register:** all risks are recorded in the Comp `Risk` model with `likelihood`,
   `impact`, `residualLikelihood`, `residualImpact`, `treatmentStrategy` (accept/avoid/
   mitigate/transfer), owner (`assigneeId`), and linked remediation `Task`s.
3. **Risk management (§164.308(a)(1)(ii)(B)):** risks are reduced to a reasonable and
   appropriate level; residual risk above threshold requires Security Officer acceptance.
4. **Sources of risk input:** the SRA, the HealthOS GAP_MATRIX (42 gaps, 18 P0), vendor
   assessments, incident post-mortems, audit findings, and integration-check failures.
5. **Cadence:** the register is reviewed monthly; the full SRA at least annually.

## 4. MVS tailoring

- Seed the Comp `Risk` model from `workstream-k-risk-register.csv` and the GAP_MATRIX P0s
  (see `sra/risk-register-seed.csv`).
- Top current risks include the **Infisical BAA / OpenBao decision (overdue)**, encryption-
  at-rest proof (GAP_MATRIX #16), and 7-year log retention (GAP_MATRIX #12/#34).

## 5. Evidence

Signed SRA; Comp `Risk` register; monthly review `Task` completions; risk-acceptance records.
