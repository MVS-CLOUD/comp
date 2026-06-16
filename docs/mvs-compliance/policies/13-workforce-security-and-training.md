---
status: draft
frequency: yearly
department: hr
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Background Screening & On/Off-boarding + Security & Privacy Awareness Training"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC1.4, CC1.5], hipaa: ["164.308(a)(3)", "164.308(a)(5)"] }
---

# Workforce Security & Training Policy

> DRAFT for human approval.

## 1. Purpose

Ensure workforce members are appropriately screened, granted least-privilege access, trained
on security and privacy, and promptly deprovisioned on separation.

## 2. Scope

All employees and contractors.

## 3. Policy

1. **Authorization & supervision (§164.308(a)(3)(ii)(A)):** access is role-appropriate and
   approved before grant.
2. **Screening (§164.308(a)(3)(ii)(B)):** background checks per role/risk before access to T0
   data, where lawful.
3. **Termination (§164.308(a)(3)(ii)(C)):** access revoked within [PLACEHOLDER — e.g. 24h] of
   separation via Okta/JumpCloud joiner-mover-leaver flows.
4. **Awareness training (§164.308(a)(5)):** security + HIPAA privacy training at onboarding and
   at least annually; tracked via Comp `EmployeeTrainingVideoCompletion`.
5. **Sanctions (§164.308(a)(1)(ii)(C)):** policy violations are subject to the Sanctions &
   Disciplinary procedure.
6. **Acknowledgment:** every workforce member signs all required policies (`signedBy[]`).

## 4. MVS tailoring

- The Comp `portal` (employee self-service, port 3002) is the workforce surface for policy
  acknowledgment and training completion.

## 5. Evidence

Training-completion records; signed acknowledgments; deprovisioning logs; screening records.
