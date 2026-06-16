---
status: draft
frequency: yearly
department: eng
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Change & Release Management"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC8.1], hipaa: ["164.308(a)(1)", "164.312(c)(1)"] }
---

# Change & Release Management Policy

> DRAFT for human approval. Implements crosswalk control MVS-CTL-10.

## 1. Purpose

Ensure changes to MVS production systems are authorized, tested, reviewed, and traceable,
including the release-readiness gate and AI-governance gates for HealthOS.

## 2. Scope

All changes to application code, infrastructure-as-code (Pulumi), Kubernetes manifests,
database schema (Neon migrations), and AI model/prompt configuration.

## 3. Policy

1. **Authorization & review:** every change is peer-reviewed via pull request; branch
   protection requires review + passing checks before merge (close GAP_MATRIX #22 evidence).
2. **Testing & gates:** CI runs CodeQL, gitleaks, Trivy config-scan, dependency checks; the
   HealthOS **release-readiness gate** (`ReleaseDefinition` → `ReleaseRun` →
   `ReleaseGateDecision`) blocks release on missing required checks/approvals/external validations.
3. **Change integrity (§164.312(c)(1)):** Kyverno admission control enforces PSS-restricted;
   cosign image-signature verification is the target state (GAP_MATRIX #18 — NOT-STARTED P0).
4. **IaC:** Pulumi ESC OIDC → STS (no static cloud credentials); changes are versioned with a
   Pulumi Cloud audit trail.
5. **Emergency changes:** documented after the fact within [PLACEHOLDER — 24h], risk-reviewed.
6. **Separation of duties:** the author of a change is not its sole approver.

## 4. MVS tailoring

- AI changes additionally pass through the AI Governance Policy gates (Promptfoo evals,
  `rollout-gate.ts` baseline/canary, LiteLLM-only routing, append-only `evidence_manifests`).
- The Comp instance's own deploys (ECS via `deploy.sh` or Helm on `agenthub-prod`) are
  in-scope changes and follow this policy.

## 5. Evidence

PR review records; CI check results; `ReleaseGateDecision` records; Pulumi Cloud audit log;
Kyverno policy reports.
