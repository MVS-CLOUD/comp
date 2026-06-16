---
status: draft
frequency: yearly
department: it
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Incident Response & Breach Notification"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC7.3, CC7.4, CC7.5], hipaa: ["164.308(a)(6)", "164.400-414"] }
---

# Incident Response & Breach Notification Policy

> DRAFT for human approval. Implements crosswalk-adjacent operations (CC7.3–7.5).

## 1. Purpose

Define how MVS detects, responds to, contains, and recovers from security incidents, and how
it determines and notifies HIPAA breaches.

## 2. Scope

All security events affecting MVS systems or data, including suspected or confirmed
unauthorized access to ePHI.

## 3. Policy

1. **Detection (CC7.2/7.3):** monitoring via Datadog, GuardDuty (EKS), CloudTrail, and Comp
   integration-check failures. Anomalies are triaged by severity.
2. **Response (§164.308(a)(6)(ii)):** documented in `docs/operations/incident-response.md`;
   includes the agent **kill-switch** runbook (`docs/runbooks/agent-control-plane-operations.md`).
3. **Severity & roles:** incident commander, scribe, comms lead; on-call via PagerDuty.
4. **Breach determination (§164.402):** the Privacy Officer performs the 4-factor risk
   assessment; if breach, notify affected individuals (≤60 days), HHS, and (if ≥500) media,
   per §164.400-414.
5. **Post-incident:** root-cause analysis; corrective actions tracked as Comp `Task`s; risk
   register updated.
6. **Testing:** an IR tabletop and a kill-switch drill are run at least annually — both are
   currently NOT-STARTED (GAP_MATRIX #36) and must occur **inside** the Type II observation window.

## 4. MVS tailoring

- Resend (email) carries only compliance/IR notifications — **no PHI** — consistent with the
  HealthOS no-PHI-in-Resend posture (VEN-004).
- Vendor-side incidents (e.g. a subprocessor breach) trigger the Vendor/BAA Management Policy.

## 5. Evidence

IR runbooks; tabletop + kill-switch drill evidence; PagerDuty incident timeline; breach-
assessment records.
