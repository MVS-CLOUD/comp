---
status: draft
frequency: yearly
department: it
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Logging, Monitoring & Audit"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC7.2, CC4.1], hipaa: ["164.312(b)", "164.312(c)(1)"], onc: ["170.315(d)(2)", "170.315(d)(3)", "170.315(d)(7)"] }
---

# Logging, Monitoring & Audit Policy

> DRAFT for human approval. Implements crosswalk controls MVS-CTL-03, MVS-CTL-09.

## 1. Purpose

Ensure security-relevant events — especially PHI-affecting actions — are logged, retained,
monitored, and protected from tampering.

## 2. Scope

Application, database, platform, and cloud control-plane logs across MVS.

## 3. Policy

1. **Audit controls (§164.312(b), ONC d(2/3/7)):** application audit events
   (`audit-logger.ts`), CNPG `pgaudit`, EKS control-plane logs (5 types) → CloudWatch (CMK) →
   Firehose → S3 + Datadog; org CloudTrail; GuardDuty EKS.
2. **Integrity (§164.312(c)(1)):** append-only `evidence_manifests` (trigger at
   `001_agent_registry.sql:446`). *Open:* the migration is not yet applied (GAP_MATRIX #26).
3. **Retention:** security/audit logs retained **7 years** for PHI-relevant systems. *Open P0
   (GAP_MATRIX #12/#34):* app-log 7-yr cold tier NOT-STARTED (Loki 30d only; Wasabi 6y ≠ 7y).
   Remediate before relying on this control.
4. **Monitoring (CC7.2):** alerts route to Datadog + PagerDuty; failing Comp integration checks
   are triaged.
5. **Log review:** security logs reviewed on a defined cadence (recurring Comp `Task`).

## 4. MVS tailoring

- Octopus retains a 7-yr audit log; Pulumi Cloud retains IaC change audit.
- LLM activity is traced via Langfuse; AI evidence is append-only via `evidence_manifests`.

## 5. Evidence

CloudWatch/Datadog config; pgaudit config; `evidence_manifests` trigger; retention-policy
proof; log-review `Task` completions.
