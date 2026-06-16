---
status: draft
frequency: yearly
department: it
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Access Control & Least Privilege"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC6.1, CC6.2, CC6.3], hipaa: ["164.312(a)(1)", "164.312(a)(2)(i)", "164.312(a)(2)(ii)", "164.312(d)"], onc: ["170.315(d)(1)", "170.315(d)(13)"] }
---

# Access Control & Identity Policy

> DRAFT for human approval. Implements crosswalk controls MVS-CTL-02, MVS-CTL-04, MVS-CTL-05.

## 1. Purpose

Ensure only authorized, uniquely identified, multi-factor-authenticated individuals access
MVS systems and data, with least-privilege authorization and controlled emergency access.

## 2. Scope

All identities (human and service), all MVS systems on `agenthub-prod`, the Comp AI instance,
Neon, and all SaaS subprocessors fronted by SSO.

## 3. Policy

1. **Unique identity (§164.312(a)(2)(i)):** every user has a unique Okta identity. Shared
   accounts are prohibited.
2. **MFA (§164.312(d), ONC d(13), NPRM):** MFA is required for **all** access, not just
   remote. MVS designs to the NPRM "all access" baseline. *Gap:* HealthOS MFA is currently
   optional/self-service (Better Auth TOTP + passkeys); a tenant-wide mandatory MFA gate
   must be enforced (tracked as a Comp `Task`). Okta IdP enforcement is the enforcement point.
3. **Least privilege (CC6.3):** access is role-based (Comp `Role` enum: owner/admin/auditor/
   employee/contractor; `OrganizationRole` for custom roles) and granted on need-to-know.
4. **Emergency access (§164.312(a)(2)(ii)):** break-glass via the `breakglass-mvs` IAM role —
   YubiKey-gated, 90-day rotation, every use alerts PagerDuty + `#security-breakglass` and is
   reviewed monthly.
5. **Automatic logoff (§164.312(a)(2)(iii), ONC d(5)):** Better Auth session expiry; 24h max
   2FA-cookie age.
6. **Access reviews (CC6.2):** privileged and PHI access is reviewed **monthly**; all access
   **quarterly**. Reviews are recorded as recurring Comp `Task`s with evidence.
7. **Provisioning/deprovisioning:** joiner/mover/leaver flows run through Okta + JumpCloud;
   deprovisioning completes within [PLACEHOLDER — e.g. 24h] of separation.

## 4. MVS tailoring

- Comp's own `auditor` role is the scoped read-only login handed to the external CPA firm.
- BFF RBAC enforcement is IN-PROGRESS (HealthOS GAP_MATRIX #3) — track to closure before the
  Type II observation window opens.

## 5. Evidence

Okta MFA-enrollment export; monthly/quarterly access-review `Task` completions; break-glass
use logs; `d13-multi-factor-authentication.md` runtime capture.
