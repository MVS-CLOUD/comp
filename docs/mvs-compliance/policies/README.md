# MVS Priority Policy Set (drafts)

> **STATUS: DRAFTS — NOT APPROVED, NOT SIGNED.** Each policy below is `status: draft`.
> A human `approverId` (Org Owner) must review and publish it as a `PolicyVersion`, and every
> `employee` / `contractor` must record `signedBy[]` acknowledgment before it is effective.

These 16 policies are **instantiated from Comp AI's 37 shipped `FrameworkEditorPolicyTemplate`s**
(see `packages/db/prisma/seed/primitives/FrameworkEditorPolicyTemplate.json`) and tailored to the
verified MVS stack: Next.js on EKS (`agenthub-prod`), Neon Postgres, Infisical (secrets),
Okta (SSO/IdP), LiteLLM (LLM gateway), Temporal (workflows), Datadog (observability),
CloudCasa + Velero (backup/DR), Linkerd (mTLS mesh), Kyverno (admission), Trigger.dev.

We did **not** author from scratch — Comp already ships the policy bodies with `{{TOKEN}}`
placeholders (`{{COMPANY}}`, `{{DATA}}`, `{{CRITICAL}}`, `{{GEO}}`, `{{DEVICES}}`,
`{{LOCATION}}`) and `{{#if soc2}}…` conditionals. The right operational path is:

1. Install the SOC 2 + HIPAA (+ 6 healthcare) frameworks in the running Comp instance — this
   instantiates the templates as editable `Policy` records.
2. Fill the org variables (Comp's onboarding does this) so the `{{TOKEN}}`s resolve.
3. Apply the **MVS-specific tailoring** captured in each file here (the "MVS tailoring" section)
   on top of the instantiated body.
4. Route through `Policy.approverId` → publish `PolicyVersion` → collect `signedBy[]`.

So these markdown files are the **tailoring + mapping layer**, not a replacement for the
Comp template bodies. Each file's frontmatter mirrors the Comp `Policy` model fields.

## Template → MVS policy map

| # | MVS policy file | Comp template name (source) | Frameworks |
|---|---|---|---|
| 01 | `01-information-security-governance.md` | Information Security & Privacy Governance | SOC2 CC1; HIPAA §164.308(a)(1) |
| 02 | `02-access-control-identity.md` | Access Control & Least Privilege | SOC2 CC6; HIPAA §164.312(a),(d) |
| 03 | `03-change-and-release-management.md` | Change & Release Management | SOC2 CC8; HIPAA §164.308(a)(1) |
| 04 | `04-risk-management.md` | Risk Management | SOC2 CC3/CC9; HIPAA §164.308(a)(1)(ii)(B) |
| 05 | `05-incident-response-and-breach-notification.md` | Incident Response & Breach Notification | SOC2 CC7; HIPAA §164.308(a)(6), §164.400-414 |
| 06 | `06-business-continuity-disaster-recovery.md` | Backup, Business Continuity & Disaster Recovery | SOC2 A1; HIPAA §164.308(a)(7) |
| 07 | `07-vendor-third-party-baa-management.md` | Vendor & Third-Party Risk | SOC2 CC9.2; HIPAA §164.308(b) |
| 08 | `08-data-classification-and-handling.md` | Data Classification & Handling | SOC2 CC3; HIPAA §164.312(a)(2)(iv) |
| 09 | `09-encryption-and-key-management.md` | Encryption & Crypto Controls | SOC2 CC6; HIPAA §164.312(a)(2)(iv),(e) |
| 10 | `10-logging-monitoring-audit.md` | Logging, Monitoring & Audit | SOC2 CC7; HIPAA §164.312(b) |
| 11 | `11-secure-sdlc-code-security.md` | Secure Software Development Lifecycle | SOC2 CC8; HIPAA §164.308(a)(8) |
| 12 | `12-acceptable-use.md` | Acceptable Use & Workstation Security | SOC2 CC1/CC2 |
| 13 | `13-workforce-security-and-training.md` | Background Screening & On/Off-boarding; Awareness Training | SOC2 CC1; HIPAA §164.308(a)(3),(5) |
| 14 | `14-physical-environmental-workstation.md` | Physical Security & Environmental | HIPAA §164.310 |
| 15 | `15-ai-governance.md` | AI Policy Control Framework | SOC2 CC8; ISO 42001 |
| 16 | `16-data-retention-and-disposal.md` | Retention & Secure Disposal | HIPAA §164.310(d)(2) |

## Frontmatter contract (maps to Comp `Policy`)

```yaml
status: draft            # PolicyStatus enum: draft | published | needs_review
frequency: yearly        # Frequency enum: ongoing|one_time|monthly|quarterly|semiannual|yearly
department: it           # Departments enum
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true   # collect signedBy[] from employees/contractors
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "<Comp FrameworkEditorPolicyTemplate name>"
frameworks: [soc2, hipaa_security]
```
