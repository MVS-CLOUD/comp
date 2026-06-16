---
status: draft
frequency: yearly
department: it
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Backup, Business Continuity & Disaster Recovery"
frameworks: [soc2, hipaa_security]
maps: { soc2: [A1.1, A1.2, A1.3], hipaa: ["164.308(a)(7)(ii)(A)", "164.308(a)(7)(ii)(B)", "164.308(a)(7)(ii)(D)"] }
---

# Business Continuity & Disaster Recovery Policy

> DRAFT for human approval. Implements crosswalk-adjacent availability controls (A1.2/A1.3).

## 1. Purpose

Ensure MVS can continue operations and recover data and systems after a disruption, and that
backups are taken, protected, and proven restorable.

## 2. Scope

All production data stores (Neon, CNPG, object storage), the `agenthub-prod` platform, and
critical SaaS dependencies.

## 3. Policy

1. **Data backup plan (§164.308(a)(7)(ii)(A)):** backups via CloudCasa + Velero; Neon point-in-
   time recovery for managed Postgres. Backup cadence and retention: [PLACEHOLDER].
2. **Disaster recovery plan (§164.308(a)(7)(ii)(B)):** documented in `RUNBOOK_DR.md`, with
   defined RTO/RPO targets [PLACEHOLDER].
3. **Testing & revision (§164.308(a)(7)(ii)(D)):** restore drills run at least annually. A
   non-PHI restore drill was proven 2026-05-10 (RTO <1 min round-trip;
   `ai-orch/migration/evidence/{cloudcasa-drill,velero-drill,bsl-unblock}-20260510.md`). A
   drill must run **inside** the Type II observation window.
4. **PHI-namespace backup is gated** on the CloudCasa + Infisical BAA decisions (GAP_MATRIX
   #17a P0) — see Vendor/BAA Management Policy.

## 4. MVS tailoring

- **Critical caveat:** the EKS platform has **no EBS CSI driver yet**. Stateful Postgres must
  **not** run in-cluster on `emptyDir`. The Comp self-host uses managed **Neon** (stateless app
  + external DB), so this is fine for the Comp app/portal pods.
- CloudCasa publishes SOC 2 Type I only (no HIPAA claim) — its BAA is an open P0
  (`cloudcasa-baa-chase.md`).

## 5. Evidence

Backup job logs; dated restore-drill evidence; `RUNBOOK_DR.md`; RTO/RPO test results.
