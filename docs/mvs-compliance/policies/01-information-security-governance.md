---
status: draft
frequency: yearly
department: gov
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Information Security & Privacy Governance"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC1.1, CC1.2, CC1.3, CC2.1, CC5.1], hipaa: ["164.308(a)(1)", "164.308(a)(2)"] }
---

# Information Security & Privacy Governance Policy (master)

> DRAFT for human approval. Tailored from the Comp template "Information Security & Privacy
> Governance" for the MVS Cloud / HealthOS stack.

## 1. Purpose

Establish the overarching information security and privacy program for MVS Cloud, including
HealthOS, and define how the program is governed, resourced, and continuously improved. This
is the master policy that all other policies in this set derive from.

## 2. Scope

All MVS Cloud information systems, the `agenthub-prod` EKS platform, the Neon Postgres data
stores, all SaaS subprocessors, all workforce members (employees and contractors), and all
data classified T0 (PHI) through T3 (public).

## 3. Roles & responsibilities

- **Security Officer** — [PLACEHOLDER — security@mvscloud.com]. HIPAA §164.308(a)(2) named
  official accountable for the program; owns the SRA and the risk register.
- **Privacy Officer** — [PLACEHOLDER]. Owns privacy, breach determination, and PHI handling.
- **Org Owner** — [PLACEHOLDER — Ryan Abazid]. Final policy-approval authority (`approverId`).
- **Compliance Lead** — [PLACEHOLDER — compliance@mvscloud.com]. Day-to-day program operation.
- **All workforce** — read, acknowledge (`signedBy[]`), and comply with all policies.

## 4. Policy

1. MVS maintains a documented information security program aligned to SOC 2 Trust Services
   Criteria (Security, Confidentiality, Availability) and the HIPAA Security Rule
   (Administrative §164.308 / Physical §164.310 / Technical §164.312), designed to the
   stricter "required" baseline anticipated by the HIPAA NPRM.
2. Every policy is reviewed at least **annually** (`reviewDate`) and on material change, and
   re-approved by the Org Owner via Comp's `Policy.approverId` workflow.
3. Management reviews program effectiveness at least annually, including SRA results, open
   GAP_MATRIX P0s, audit findings, and incident trends.
4. Policy exceptions follow the Policy Management & Exception Handling procedure (documented,
   time-boxed, risk-accepted by the Security Officer).

## 5. MVS tailoring

- The program is operated inside a **self-hosted Comp AI** instance on `agenthub-prod`,
  isolated from the systems it audits (dedicated Neon DB) for auditor independence.
- Control evidence accrues continuously via Comp `IntegrationCheckRun` crons against AWS,
  GitHub, Okta/JumpCloud, Google Workspace, and Vercel; residual MVS-stack evidence
  (Infisical, CloudCasa, Neon, Datadog, Linkerd) is `manual_attested` until custom checks exist.

## 6. Evidence

Approved `PolicyVersion` records; annual management-review minutes; this policy set's
`signedBy[]` acknowledgments.
