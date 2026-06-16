# HIPAA Security Risk Analysis (SRA) — skeleton

> **STATUS: DRAFT SKELETON — NOT AN APPROVED SRA.** This is the NIST SP 800-30 structure
> seeded with known risks. Likelihood × Impact ratings are **proposed** and must be validated
> by the Security Officer. The SRA is not complete until **signed** by the Security Officer and
> Privacy Officer (§8). Catalog requirement **HIPAA-1** ("maintain a current HIPAA SRA,
> remediation register, owner assignment") remains NOT-STARTED until that signature.

- **Methodology:** NIST SP 800-30 Rev.1 (Guide for Conducting Risk Assessments), mapped to
  HIPAA §164.308(a)(1)(ii)(A) (risk analysis) and (B) (risk management).
- **Risk scale:** Likelihood and Impact use the Comp `Risk` model enums so rows load directly:
  - `Likelihood`: very_unlikely | unlikely | possible | likely | very_likely
  - `Impact`: insignificant | minor | moderate | major | severe
- **Date:** [PLACEHOLDER — assessment date]. **Next review:** annual (`reviewDate`) + on material change.

---

## 1. Scope & system characterization

Define the boundary, the ePHI inventory, and the data flows.

- **Systems in scope:** HealthOS application on `agenthub-prod` EKS; supporting data stores
  (Neon, CNPG); the self-hosted Comp AI compliance instance (holds compliance metadata, not PHI).
- **ePHI inventory & data flows:** source — `workstream-k-system-data-inventory.json`,
  `privacy-and-phi.md`, `EXTERNAL_PROVIDERS.md`. Known PHI flows:
  - **DoseSpot / Surescripts** — prescriptions, medication history, DEA/EPCS
  - **Stedi** — X12 270/271 (eligibility), 837 (claims), 835 (remittance)
  - **Medplum** — FHIR resources
  - **Corti** — ambient audio
  - **Metriport** — health information exchange (HIE)
- **Subservice organizations:** AWS, Neon, Vercel, Trigger.dev, Upstash (carve-outs in the
  SOC 2 system description; CUECs to be listed).

## 2. Threat identification

| Threat source | Threat events |
|---|---|
| **External / adversarial** | Credential theft, ransomware, supply-chain compromise, API abuse, subprocessor breach |
| **Internal / human** | Misuse of access, error/misconfiguration, lost/stolen device, accidental disclosure |
| **Environmental / structural** | Region/AZ outage, managed-service outage (Neon/AWS), key-material loss |

## 3. Vulnerability identification

Pulled directly from the HealthOS `GAP_MATRIX.md` (42 gaps, 18 P0). Each P0 is a candidate
finding. The high-impact set seeding this SRA:

| ID | Vulnerability | Source gap |
|---|---|---|
| V-01 | Encryption at rest unproven (CNPG `local-path`, MinIO SSE-KMS off, host LUKS unverified) | GAP_MATRIX #16 (P0) |
| V-02 | 7-year audit-log cold tier not implemented (Loki 30d; Wasabi 6y) | GAP_MATRIX #12/#34 (P0) |
| V-03 | Infisical BAA unknown / deadline passed (every prod secret) | BAA_GAPS §1 (P0, overdue) |
| V-04 | MFA optional / no tenant-wide mandatory gate | d13 package (P0 for NPRM) |
| V-05 | Runtime credential-encryption proof missing (ONC d12 no-go) | d12 package (P0) |
| V-06 | cosign image signing / Kyverno verifyImages not enabled | GAP_MATRIX #18 (P0) |
| V-07 | Trivy image scan not in pipeline | GAP_MATRIX #39 (P0) |
| V-08 | `evidence_manifests` append-only migration not applied | GAP_MATRIX #26 (P0) |
| V-09 | DoseSpot/Surescripts BAA dates null | VEN-008/009 (P0) |
| V-10 | Stedi missing from vendor registry; no BAA | BAA_GAPS (P0) |
| V-11 | CloudCasa BAA open (no HIPAA claim) — gates PHI-ns backup | GAP_MATRIX #17a (P0) |
| V-12 | NetworkPolicy / egress allowlist coverage gaps | GAP_MATRIX #14/#15 (P1) |
| V-13 | BFF RBAC enforcement incomplete | GAP_MATRIX #3 |
| V-14 | IR tabletop + kill-switch drill not run | GAP_MATRIX #36 (P1) |

## 4. Control analysis

Current safeguards are inventoried in the execution package §3 and the control crosswalk
(`../crosswalk/control-crosswalk.md`). Summary: CC6 (access/encryption), CC7 (operations/
logging), CC8 (change management) are ~70% implemented at the control level; dominant gaps are
legal (BAAs), proof/formalization (V-01/V-02/V-05), and recurring operating evidence.

## 5. Likelihood × Impact (proposed — VALIDATE)

See `risk-register-seed.csv` for the seedable rows. Each finding gets `likelihood`/`impact`
(inherent) and `residualLikelihood`/`residualImpact` after planned treatment. **These ratings
are proposed by AI and must be validated by the Security Officer.**

## 6. Risk determination + register

Load `risk-register-seed.csv` into the Comp `Risk` model. Each row carries `treatmentStrategy`
(accept/avoid/mitigate/transfer), an owner (`assigneeId`), and links to remediation `Task`s.

## 7. Remediation plan

Map each finding to its GAP_MATRIX PR/ETA and track as a Comp `Task`. Sequence:
1. Resolve Infisical BAA / OpenBao decision (V-03) — **overdue, top priority**.
2. d12/d13 runtime capture (V-04, V-05) — highest cross-regime leverage.
3. Encryption-at-rest proof (V-01); 7-yr retention (V-02); cosign (V-06); Trivy image scan (V-07).
4. Vendor BAAs (V-09, V-10, V-11).
5. Operating evidence: IR tabletop + DR drill inside the observation window (V-14).

## 8. Sign-off

> The SRA is incomplete and non-authoritative until both signatures below are recorded.

- **Security Officer:** [PLACEHOLDER — name, security@mvscloud.com] — date: __________
- **Privacy Officer:** [PLACEHOLDER — name] — date: __________
- **Review cadence:** annual + on material change (`reviewDate`).

---

*Sources: `workstream-k-risk-register.csv`, `workstream-k-system-data-inventory.json`,
`privacy-and-phi.md`, `GAP_MATRIX.md`, `BAA_GAPS.md`/`BAA_MATRIX.md`, ONC d12/d13 packages.*
