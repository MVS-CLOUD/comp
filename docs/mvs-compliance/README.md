# MVS Compliance Artifacts (Comp AI self-host)

> **STATUS: DRAFTS FOR HUMAN APPROVAL / SIGNATURE.** Nothing in this directory is an
> approved control, a signed policy, an attested risk analysis, or a deployed manifest.
> Every artifact here is a *starting point* generated from the verified MVS stack and the
> Stream C execution package. It must be reviewed, edited, and formally signed/approved by
> the named human owners before it carries any compliance weight.

These files are **additive documentation only**. They do not modify the upstream Comp AI
application code (`apps/`, `packages/`). They live under `docs/` so they can be reviewed,
versioned, and eventually loaded into a running Comp AI instance.

Source of truth: `MVS-AI-DELIVERABLES/execution/C-compai-soc2-hipaa-execution-package.md`.

## What's here

| Path | Artifact | Owner to approve |
|---|---|---|
| `crosswalk/control-crosswalk.md` | Write-once control crosswalk: ONC d(12)/d(13) ↔ SOC 2 CC6/CC7 ↔ HIPAA §164.312 ↔ HIPAA NPRM | Security Lead + Compliance Lead |
| `crosswalk/control-crosswalk.csv` | Machine-readable crosswalk (one row per control, importable as Comp `Control` + `RequirementMap`) | — |
| `policies/` | 16 priority policies tailored to the MVS stack (instantiated from Comp policy templates) | Policy `approverId` (Owner) + workforce `signedBy[]` |
| `sra/hipaa-security-risk-analysis.md` | HIPAA SRA skeleton (NIST SP 800-30 structure) seeded with known risks | Security Officer + Privacy Officer |
| `sra/risk-register-seed.csv` | Seedable `Risk` rows (from `workstream-k-risk-register.csv` + GAP_MATRIX P0s) | Security Officer |
| `deploy/` | Self-host deploy config: EKS Helm chart + ECS task def + ESO/Infisical secret manifests + env templates | Platform/Security Lead |
| `vendors/vendor-baa-registry.csv` | Vendor / BAA dataset draft incl. the missing rows (DoseSpot, Surescripts, Stedi) | Compliance Lead + Security Lead |
| `vendors/vendor-import.json` | Same dataset shaped for Comp `Vendor` import | — |

## Placeholders

Wherever a real human, account, hostname, or secret belongs, the artifacts use an explicit
`[PLACEHOLDER — ...]` token or a clearly-fake value (e.g. `__SET_IN_INFISICAL__`). **No real
secrets are committed.** Search for `PLACEHOLDER` and `__SET_` before any production use.

## The governing principle (from the HealthOS/Comp foundation plan)

> **AI drafts and assists; humans and external authorities hold release / certification /
> sign-off authority.**

Accordingly:
- Policies are `status: draft` until a human `approverId` publishes them.
- SRA likelihood/impact and sign-off are **NEEDS-HUMAN** (Security + Privacy Officer).
- BAA rows are drafts; every signature is **NEEDS-HUMAN/VENDOR**.
- Deploy manifests are **config only**; applying them against live infra is **NEEDS-HUMAN**.
