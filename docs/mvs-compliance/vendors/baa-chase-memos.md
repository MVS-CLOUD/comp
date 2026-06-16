# BAA-chase memos (drafts) — missing / open PHI-path vendors

> **STATUS: DRAFTS.** Modeled on the proven `infisical-baa-chase.md` / `cloudcasa-baa-chase.md`
> style. Every outreach + signature is **NEEDS-HUMAN/VENDOR**. These memos are starting text.

## Template

> **Vendor:** <name> · **Registry ID:** <id> · **Owner:** [PLACEHOLDER] · **Priority:** <Px>
> **PHI touchpoint:** <what data>
> **Current status:** <baaStatus>
> **Ask:** Executed BAA (45 CFR 164.308(b)(1), 164.502(e)) with effective + expiration dates.
> **Fallback if no BAA:** <stop data flow / migrate / scope out PHI>
> **Next step:** <contact / portal / legal>

---

## Stedi (VEN-010-NEW) — P0

- **PHI touchpoint:** X12 270/271 (eligibility), 837 (claims), 835 (remittance) — all PHI.
  Live in `apps/payer-gateway`. **Missing entirely from the vendor registry.**
- **Ask:** Add the registry row (done in `vendor-baa-registry.csv` / `vendor-import.json`) and
  execute a signed BAA **before DC01 production traffic**.
- **Fallback:** Do not route PHI through Stedi until the BAA is signed.
- **Owner:** [PLACEHOLDER — S-SEC + Compliance].

## DoseSpot (VEN-008) + Surescripts (VEN-009) — P0

- **PHI touchpoint:** prescriptions, medication history, DEA/EPCS.
- **Current status:** `required` with **null BAA dates**.
- **Ask:** Compliance supplies the signed BAA + effective/expiration dates. (DoseSpot owns the
  EPCS audit per the confirmed decision; MVS still needs the BAA for the PHI relationship.)
- **Gate:** ONC v1.0.0 sign-off.
- **Owner:** [PLACEHOLDER — Clinical Product Lead + Compliance].

## CloudCasa (VEN-011-NEW) — P0

- **PHI touchpoint:** backup of cluster namespaces (PHI namespace gated).
- **Current status:** Catalogic publishes SOC 2 Type I only; **no HIPAA claim**.
- **Ask:** Confirm a HIPAA BAA or scope CloudCasa away from PHI namespaces. Gates PHI-namespace
  backup onboarding (GAP_MATRIX #17a).
- **Owner:** [PLACEHOLDER — S-SEC].

## Neon (VEN-012-NEW) — P1

- **PHI touchpoint:** managed Postgres (HealthOS PHI; the Comp compliance DB holds metadata, not PHI).
- **Ask:** Execute the Scale-plan HIPAA BAA. Even though the Comp DB is metadata-only, sign for
  defensibility and because HealthOS Neon projects carry PHI.
- **Owner:** [PLACEHOLDER — S-SEC].

## Metriport (VEN-016-NEW), Corti (VEN-015-NEW), CardScan.ai (VEN-017-NEW), Wasabi (VEN-022-NEW) — P1

- **PHI touchpoint:** HIE (Metriport), ambient audio (Corti), card OCR (CardScan), cold-tier
  object storage (Wasabi).
- **Current status:** public/unknown BAA.
- **Ask:** Confirm or execute a BAA; for Wasabi confirm SSE-KMS + HIPAA terms.
- **Owner:** [PLACEHOLDER — S-SEC + Compliance].

---

## Infisical (VEN-005) — P0, OVERDUE

- **PHI touchpoint:** holds **every** prod secret (DB URLs, vendor keys, signing keys).
- **Current status:** BAA `unknown`; no public HIPAA SKU; **2026-06-15 deadline passed**.
- **Decision required now:** confirmed BAA *or* execute the OpenBao migration (ESO is already
  OpenBao-compatible per `infisical-baa-chase.md`). This is the program's top P0.
- **Owner:** [PLACEHOLDER — S-SEC].
- *(If the decision goes to fallback, draft the OpenBao migration runbook delta separately —
  execution package §9.7.)*
