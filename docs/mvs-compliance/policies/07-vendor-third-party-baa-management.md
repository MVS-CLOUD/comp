---
status: draft
frequency: yearly
department: gov
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Vendor & Third-Party Risk"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC9.2], hipaa: ["164.308(b)(1)", "164.502(e)"] }
---

# Vendor / Third-Party & BAA Management Policy

> DRAFT for human approval. Drives the vendor dataset in `vendors/vendor-baa-registry.csv`.

## 1. Purpose

Ensure third parties that create, receive, maintain, or transmit MVS data — especially PHI —
are assessed, contractually bound (BAA where PHI flows), and monitored.

## 2. Scope

All vendors and subprocessors, including PHI-path vendors (DoseSpot, Surescripts, Stedi,
Medplum, Corti, Metriport) and platform subprocessors (AWS, Neon, Vercel, Okta, Datadog,
Infisical, Trigger.dev, Upstash, Wasabi, CloudCasa).

## 3. Policy

1. **BAA requirement (§164.308(b)(1), §164.502(e)):** no PHI may flow to a vendor without a
   signed BAA with non-null effective/expiration dates. No exceptions for PHI-path vendors.
2. **Inventory:** every vendor has a Comp `Vendor` record (`category`, `status`,
   `isSubProcessor`, `complianceBadges`) and a registry row.
3. **Assessment:** vendors are risk-assessed before onboarding and at least annually
   (`inherent`/`residual` Probability/Impact in the `Vendor` model).
4. **Hard blockers (current):**
   - **Infisical** — holds every prod secret; BAA `unknown`, deadline 2026-06-15 **passed**.
     Decision required now: confirmed BAA *or* execute the OpenBao migration.
   - **DoseSpot + Surescripts** — eRx/PHI; `required` with null BAA dates (VEN-008/009).
   - **Stedi** — 270/271/837/835 (all PHI); **missing from the registry**; live in
     `apps/payer-gateway`. Add a row + execute the BAA before DC01 prod traffic.
5. **Soft blockers:** Vercel, Neon, Render, Railway, Metriport, Corti, CardScan.ai, Sentry,
   Langfuse, Okta, Upstash, Wasabi, Intercom, Paubox — PHI flowing with public-only/unknown BAA.

## 4. MVS tailoring

- Comp's own dependencies needing BAAs: **Neon** (compliance metadata, not PHI — still execute
  the Scale-plan BAA for defensibility) and **CloudCasa** (if it ever backs up the Comp ns).
- "Good" = every PHI-path vendor `baaStatus: required-active` with non-null dates;
  `pnpm check:compliance:vendors` passes; the Infisical/OpenBao decision executed.

## 5. Evidence

Comp `Vendor` records; signed BAAs; `BAA_MATRIX.md`; per-vendor BAA-chase memos.
