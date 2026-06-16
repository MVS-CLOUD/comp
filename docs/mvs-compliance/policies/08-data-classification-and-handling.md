---
status: draft
frequency: yearly
department: gov
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Data Classification & Handling"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC3.2, CC6.1], hipaa: ["164.312(a)(2)(iv)", "164.308(a)(1)(ii)(A)"] }
---

# Data Classification & Handling Policy

> DRAFT for human approval.

## 1. Purpose

Define data classification tiers and the handling, storage, and transmission requirements for
each tier, so protection is proportional to sensitivity.

## 2. Scope

All MVS data in any form or location.

## 3. Classification tiers

| Tier | Definition | Examples | Handling |
|---|---|---|---|
| **T0 — PHI / Restricted** | Protected Health Information, credentials, keys | eRx, med history, FHIR records, secrets | Encryption at rest + in transit; access logged; BAA required for any vendor; least privilege |
| **T1 — Confidential** | Sensitive non-PHI business data | contracts, financials | Encryption; need-to-know |
| **T2 — Internal** | Internal-use data | internal docs, tickets | Authn required |
| **T3 — Public** | Approved for public release | marketing, trust portal | No restriction |

## 4. Policy

1. Data is labeled to a tier; T0 data carries the strictest controls (ties to GAP_MATRIX #13
   data labels).
2. **Encryption (§164.312(a)(2)(iv)):** T0/T1 encrypted at rest (KMS CMK) and in transit
   (TLS / Linkerd mTLS).
3. **Inventory (§164.308(a)(1)(ii)(A)):** a current ePHI inventory + data-flow map is
   maintained (`workstream-k-system-data-inventory.json`, `privacy-and-phi.md`).
4. **Transmission:** PHI is never sent over channels lacking a BAA (e.g. Resend carries no PHI).

## 5. MVS tailoring

- PHI flows: DoseSpot/Surescripts (eRx), Stedi (X12 270/271/837/835), Medplum (FHIR), Corti
  (ambient audio), Metriport (HIE). Each must map to a BAA-covered vendor.

## 6. Evidence

ePHI inventory; data-flow diagrams; encryption-posture evidence (MVS-CTL-08).
