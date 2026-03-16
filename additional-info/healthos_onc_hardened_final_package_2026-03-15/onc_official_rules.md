# ONC Health IT Certification Program: Official Rules and Criteria for Full Ambulatory EHR

**Prepared:** 2026-03-15  
**Scope:** Full ambulatory EHR certification under ONC Health IT Certification Program  
**Status as of report date:** All rules in force as of March 15, 2026, including enforcement discretion notices  

---

## 1. Governing Regulations and Rule History Currently in Force

The ONC Health IT Certification Program is authorized by Section 3001(c)(5) of the Public Health Service Act, as amended by the HITECH Act (2009) and the [21st Century Cures Act (2016)](https://www.congress.gov/bill/114th-congress/house-bill/34). The program is codified at [45 CFR Part 170](https://www.law.cornell.edu/cfr/text/45/part-170).

### 1.1 Layered Rule History (Currently Operative)

The current regulatory framework is the cumulative result of the following rulemaking, each of which amended 45 CFR Part 170. All are currently in force unless superseded by a later rule:

| Rule | Federal Register Citation | Effective Date | Key Contribution |
|------|--------------------------|----------------|------------------|
| **2015 Edition Final Rule** | [80 FR 62602](https://www.federalregister.gov/documents/2015/10/16/2015-25597/2015-edition-health-information-technology-health-it-certification-criteria-2015-edition-base) (Oct 16, 2015) | 2015–2016 (phased) | Established the 2015 Edition certification criteria at §170.315 and 2015 Edition Base EHR definition; created modular certification model |
| **Enhanced Oversight & Accountability (EOA) Final Rule** | [81 FR 72404](https://www.federalregister.gov/documents/2016/10/19/2016-24908/health-it-certification-program-enhanced-oversight-and-accountability) (Oct 19, 2016) | Dec 19, 2016 | Created direct review framework under §170.580; ONC surveillance; authorized testing labs |
| **ONC Cures Act Final Rule** (a.k.a. "2015 Edition Cures Update") | [85 FR 25642](https://www.federalregister.gov/documents/2020/05/01/2020-07419/21st-century-cures-act-interoperability-information-blocking-and-the-onc-health-it-certification) (May 1, 2020) | Jun 30, 2020 (phased through Dec 31, 2022) | Implemented Cures Act provisions; established Conditions and Maintenance of Certification (§170.401–407); created §170.315(g)(10) Standardized API; §170.315(b)(10) EHI Export; adopted USCDI v1; implemented information blocking rules (45 CFR Part 171); time-limited/removed several criteria; added §170.315(d)(12)–(13) |
| **HTI-1 Final Rule** | [89 FR 1192](https://www.federalregister.gov/documents/2024/01/09/2023-28857/health-data-technology-and-interoperability-certification-program-updates-algorithm-transparency-and) (Jan 9, 2024) | Mar 11, 2024 (phased through Jan 1, 2026+) | Discontinued edition naming; adopted USCDI v3 (effective Jan 1, 2026); created §170.315(b)(11) Decision Support Interventions; expired §170.315(a)(9) (Jan 1, 2025); established Insights Condition (§170.407); algorithm transparency for Predictive DSI; updated code sets and C-CDA to R4.1 |
| **HTI-2 Final Rule** | [89 FR 63500](https://www.federalregister.gov/documents/2024/08/05/2024-16734/health-data-technology-and-interoperability-trusted-exchange-framework-and-common-agreement-hti-2) (Aug 2024) | Oct 2024 | Amended information blocking regulations; corrections to HTI-1 provisions; added TEFCA exception to information blocking |
| **HTI-3 Final Rule** | (2025) | 2025 | Enhanced information blocking regulations; patient privacy protections |
| **HTI-4 Final Rule** | Published as part of [CMS-1833-F (FY2026 IPPS)](https://healthit.gov/resources/hti-4-final-rule-electronic-prescribing-real-time-prescription-benefit-and-electronic-prior-authorization/) (Jul 31, 2025) | Oct 1, 2025 (phased through Jan 1, 2028) | Updated §170.315(b)(3) Electronic Prescribing to NCPDP SCRIPT 2023011; established §170.315(b)(4) Real-Time Prescription Benefit; added §170.315(g)(31)–(33) and §170.315(j)(20)–(21) for electronic prior authorization; added (b)(3) and (b)(4) to Base EHR effective Jan 1, 2028 |

### 1.2 Pending / Proposed Rules (NOT YET IN FORCE)

| Rule | Status | Key Proposals |
|------|--------|---------------|
| **HTI-5 Proposed Rule** ("Deregulatory Actions to Unleash Prosperity") | NPRM published [90 FR 861](https://www.federalregister.gov/documents/2025/12/29/2025-23896/health-data-technology-and-interoperability-astponc-deregulatory-actions-to-unleash-prosperity) (Dec 29, 2025); comment period open (6,459 comments as of report date) | Proposes to **remove 34** and **revise 7** of approximately 60 current certification criteria; prioritizes FHIR; proposes removing all (d) privacy/security criteria, most (h) transport criteria, several (f) public health criteria, (g)(1)–(6), (a)(9), (a)(12), (a)(14), and others. **This is a proposal only and NOT law as of 2026-03-15.** |
| **HTI-2 NPRM Withdrawn Provisions** | [Withdrawn Dec 29, 2025](https://www.mwe.com/insights/astps-hti-5-relaxes-certification-criteria-while-tightening-information-blocking-exceptions/) | Originally proposed USCDI v4 adoption, birth reporting, PDMP; these proposals were formally withdrawn |

> **IMPORTANT UNCERTAINTY:** The HTI-5 proposed rule, if finalized, would dramatically reduce the number of certification criteria. However, as of 2026-03-15, it is still in notice-and-comment phase. All current criteria remain in force. Developers should build to current requirements while monitoring HTI-5 finalization closely.

### 1.3 Enforcement Discretion Notices in Effect

ASTP/ONC has issued several [enforcement discretion notices](https://healthit.gov/certification-health-it/enforcement-discretion-notices/) that affect compliance deadlines:

| EDN ID | Date Issued | Criteria Affected | Original Deadline | Extended To | Still in Effect? |
|--------|-------------|-------------------|-------------------|-------------|-----------------|
| EDN2025.06 | Nov 24, 2025 | §170.315(a)(5), (a)(12), (a)(15), (b)(1), (b)(2), (b)(9), (b)(11), (c)(4), (e)(1), (f)(1), (f)(3), (f)(4), (g)(6), (g)(9), (g)(10) | Jan 1, 2026 | Mar 1, 2026 | **Yes** — developers had through Feb 28, 2026 to complete HTI-1 required updates |
| EDN2025.05 | Nov 24, 2025 | Attestations under §170.401–405 via §170.406 | Oct 31, 2025 | Jan 1, 2026 | Expired |
| EDN2025.04 | Jul 31, 2025 | §170.315(f)(5) Electronic Case Reporting | N/A | Through Dec 31, 2026 | **Yes** — discretion for (f)(5) functional vs. standards-based conformance |
| EDN2025.03 | Jun 30, 2025 | Real World Testing (§170.405) for (b), (c)(1)–(3), (e)(1), (f), (g)(7)–(10), (h) | N/A | Through Dec 31, 2026 | **Yes** — discretion on RWT plan/results submissions for CY 2025–2026 |
| EDN2025.02 | Apr 29, 2025 | Insights Condition §170.407 | Jul 1, 2027 | Deferred pending deregulatory action | **Yes** — most Insights metrics deferred except "use of FHIR in apps" |
| EDN2025.01 | Mar 21, 2025 | USCDI v3 elements (SOGI data, Sex Parameter for Clinical Use) across all criteria referencing §170.213 | Jan 1, 2026 | 12 months from Mar 21, 2025 (~Mar 2026) or regulatory action per EO 14168 | **Yes** — allows omission of sexual orientation, gender identity, sex parameter for clinical use, name to use, pronouns |

---

## 2. Structure of 45 CFR Part 170

| Subpart | Topic | Key Sections |
|---------|-------|-------------|
| **A** — General Provisions | Definitions, basis | [§170.102](https://www.law.cornell.edu/cfr/text/45/170.102) (Definitions, including Base EHR) |
| **B** — Standards and Implementation Specifications | Referenced standards | §170.202–215 (transport, content, vocabulary, FHIR IGs) |
| **C** — Certification Criteria | The criteria themselves | [§170.315](https://www.law.cornell.edu/cfr/text/45/170.315) (all criteria (a)–(j)) |
| **D** — Conditions & Maintenance of Certification | Developer obligations | §170.401 (Info blocking), §170.402 (Assurances), §170.403 (Communications), [§170.404](https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/) (API), §170.405 (Real World Testing), §170.406 (Attestations), §170.407 (Insights) |
| **E** — ONC Health IT Certification Program | Program operations | §170.500–580 (accreditation, ONC-ACBs, direct review, suspension/termination) |

---

## 3. Base EHR Definition (§170.102)

The [Base EHR definition at 45 CFR 170.102](https://www.law.cornell.edu/cfr/text/45/170.102) defines the **minimum** certified capabilities required for an electronic record to be considered a "Base EHR." This is the floor that CMS uses for the Certified EHR Technology (CEHRT) definition.

### 3.1 Current Base EHR Definition (as of Jan 1, 2025)

Per [§170.102](https://www.law.cornell.edu/cfr/text/45/170.102), a **Base EHR** means an electronic record of health-related information on an individual that:

1. Includes patient demographic and clinical health information (medical history, problem lists);
2. Has the capacity to:
   - (i) Provide clinical decision support;
   - (ii) Support physician order entry;
   - (iii) Capture and query information relevant to healthcare quality;
   - (iv) Exchange EHI with and integrate from other sources;
3. Has been certified to:

| Base EHR Criterion | Section | Topic |
|-------------------|---------|-------|
| CPOE (one or more of) | §170.315(a)(1), (a)(2), or (a)(3) | Medications, Lab, or Diagnostic Imaging orders |
| Demographics | §170.315(a)(5) | Patient demographics and observations |
| Implantable Device List | §170.315(a)(14) | UDI recording and display |
| Transitions of Care | §170.315(b)(1) | Send/receive/validate C-CDA summaries |
| CQMs — Record & Export | §170.315(c)(1) | Record and export CQM data |
| API — Patient Selection | §170.315(g)(7) | API for patient identification |
| API — All Data Request | §170.315(g)(9) | API returning all patient data |
| Standardized API (FHIR) | §170.315(g)(10) | HL7 FHIR US Core, SMART on FHIR |
| Direct Project or equivalent | §170.315(h)(1) or (h)(2) | Secure health transport |
| **Decision Support Interventions** | **§170.315(b)(11)** | **Required on and after Jan 1, 2025** (replaced expired (a)(9)) |

**Historical note:** Prior to Jan 1, 2025, either §170.315(a)(9) (Clinical Decision Support) or §170.315(b)(11) satisfied the Base EHR CDS requirement. As of [Jan 1, 2025, (a)(9) expired](https://healthit.gov/wp-content/uploads/2025/03/Overview-and-Key-Dates-2024_508.pdf), and only (b)(11) fulfills this element.

### 3.2 Upcoming Base EHR Changes (HTI-4, effective Jan 1, 2028)

Per the [HTI-4 final rule](https://healthit.gov/resources/hti-4-final-rule-electronic-prescribing-real-time-prescription-benefit-and-electronic-prior-authorization/), beginning **January 1, 2028**:
- §170.315(b)(3) **Electronic Prescribing** (updated to NCPDP SCRIPT 2023011) will be added to the Base EHR definition
- §170.315(b)(4) **Real-Time Prescription Benefit** will be added to the Base EHR definition
- Any module certified to (b)(3) must also be certified to (b)(4)

---

## 4. Certified EHR Technology (CEHRT) for CMS Programs — Ambulatory

For ambulatory eligible clinicians participating in CMS programs (MIPS Promoting Interoperability), [CEHRT is defined at 42 CFR §414.1305](https://www.law.cornell.edu/cfr/text/42/414.1305). For **2019 and subsequent years**, CEHRT means technology certified to:

1. The **Base EHR definition** (as defined in 45 CFR 170.102); **PLUS**
2. [§170.315(a)(12)](https://www.law.cornell.edu/cfr/text/45/170.315) — Family Health History; **AND**
3. [§170.315(e)(3)](https://www.law.cornell.edu/cfr/text/45/170.315) — Patient Health Information Capture; **AND**
4. Certification criteria **necessary to report on applicable PI objectives and measures**, including:
   - §170.315(g)(1) or (g)(2) — Automated numerator recording / automated measure calculation (for percentage-based measures)
   - §170.315(c)(2) and (c)(3)(i)–(ii) — CQM import/calculate and CQM report (optionally (c)(4))

### 4.1 Additional Criteria Needed for MIPS PI Measures (2025–2026)

Beyond the CEHRT definition, the [MIPS Promoting Interoperability measures for 2025](https://qpp.cms.gov/mips/promoting-interoperability) require health IT functionality certified to specific criteria:

| PI Objective | Measure | Required Certification Criteria | Points |
|-------------|---------|-------------------------------|--------|
| Electronic Prescribing | e-Prescribing | §170.315(b)(3) | 10 |
| Electronic Prescribing | Query of PDMP | (No specific ONC criterion yet; functionality attestation) | 10 |
| Health Information Exchange (Option 1) | Send Health Info | §170.315(b)(1) | 15 |
| Health Information Exchange (Option 1) | Receive & Reconcile | §170.315(b)(1), (b)(2) | 15 |
| Health Information Exchange (Option 2) | HIE Bi-Directional | §170.315(b)(1), (b)(2), (g)(7), (g)(9), (g)(10) | 30 |
| Health Information Exchange (Option 3) | Enable Exchange under TEFCA | (Attestation-based) | 30 |
| Provider to Patient Exchange | Patient Electronic Access | §170.315(e)(1), (g)(7)/(g)(9)/(g)(10) | 25 |
| Public Health & Clinical Data Exchange | Electronic Case Reporting | §170.315(f)(5) | 25 (required) |
| Public Health & Clinical Data Exchange | Immunization Registry | §170.315(f)(1) | 25 (required) |
| Public Health & Clinical Data Exchange | Syndromic Surveillance | §170.315(f)(2) | 5 bonus (optional) |
| Public Health & Clinical Data Exchange | Public Health Registry | (Varies) | 5 bonus (optional) |
| Public Health & Clinical Data Exchange | Clinical Data Registry | (Varies) | 5 bonus (optional) |

*Source: [2025 QPP Requirements](https://blog.medisolv.com/articles/2025-qpp-requirements) and [CMS QPP PI page](https://qpp.cms.gov/mips/promoting-interoperability)*

---

## 5. What Changed Under the Cures Update and HTI-1

### 5.1 ONC Cures Act Final Rule (2015 Edition Cures Update) — [85 FR 25642](https://www.federalregister.gov/documents/2020/05/01/2020-07419/21st-century-cures-act-interoperability-information-blocking-and-the-onc-health-it-certification)

Key changes (deadline: Dec 31, 2022 for most provisions):

| Change Type | Details |
|------------|---------|
| **New criteria** | §170.315(g)(10) Standardized API (FHIR R4, US Core, SMART on FHIR) — replaced (g)(8); §170.315(b)(10) EHI Export — replaced (b)(6); §170.315(d)(12) Encrypt Authentication Credentials; §170.315(d)(13) Multi-Factor Authentication |
| **Removed/time-limited** | §170.315(g)(8) expired Dec 31, 2022; §170.315(b)(6) expired |
| **Data standard updates** | Adopted USCDI v1; updated C-CDA references |
| **Conditions of Certification** | Created Subpart D (§170.401–406): Information blocking (§170.401), Assurances (§170.402), Communications (§170.403), API conditions (§170.404), Real World Testing (§170.405), Attestations (§170.406) |
| **Information Blocking** | Established [45 CFR Part 171](https://www.law.cornell.edu/cfr/text/45/part-171) definitions and exceptions |
| **SVAP** | Standards Version Advancement Process — voluntary adoption of newer standards |

### 5.2 HTI-1 Final Rule — [89 FR 1192](https://www.federalregister.gov/documents/2024/01/09/2023-28857/health-data-technology-and-interoperability-certification-program-updates-algorithm-transparency-and)

Key changes (effective Mar 11, 2024, phased through Jan 1, 2026+):

| Change Type | Details |
|------------|---------|
| **Edition naming discontinued** | All criteria now simply "ONC Certification Criteria for Health IT" — no more "2015 Edition" or "Cures Update" labels (effective Mar 11, 2024) |
| **New criterion** | §170.315(b)(11) Decision Support Interventions — requires transparency for Predictive DSI (AI/ML models); must include source attributes, risk management practices; replaces (a)(9) for Base EHR |
| **Expired criterion** | §170.315(a)(9) Clinical Decision Support — expired Jan 1, 2025 |
| **USCDI v3 adopted** | [USCDI v3](https://www.healthit.gov/isa/united-states-core-data-interoperability-uscdi) becomes baseline Jan 1, 2026 (USCDI v1 expired); new data classes and elements including health insurance information, clinical tests, diagnostic imaging |
| **C-CDA updated** | C-CDA R4.1 (HL7 C-CDA 2.1, Companion Guide R4.1) required by Dec 31, 2025 |
| **US Core IG updated** | HL7 FHIR US Core STU 6.1.0 required for (g)(10) by Dec 31, 2025 |
| **SMART on FHIR updated** | HL7 SMART App Launch v2.0.0 required for (g)(10) by Dec 31, 2025 |
| **Demographics expanded** | §170.315(a)(5) revised to add sex parameter for clinical use, name to use, pronouns (by Jan 1, 2026); updated race/ethnicity to CDC v1.2; sex updated to SNOMED CT |
| **Code set updates** | Minimum code sets updated across (a)(5), (a)(12), (a)(15), (b)(1), (c)(4), (f)(1), (f)(3), (f)(4), (f)(5) — all by Dec 31, 2025 |
| **Insights Condition** | New §170.407 — developers must report metrics on EHI access, app usage, C-CDA reconciliation, immunization submissions; phased CY 2026 (Year 1) through CY 2028 (Year 3) |
| **API revocation** | §170.315(g)(10)(vi) — must revoke app access within 1 hour of request (effective Mar 11, 2024) |
| **Service Base URL publication** | §170.404(b)(2) — publish FHIR-format service base URLs by Dec 31, 2024 |
| **Real World Testing** | Added (b)(11) to eligible criteria for RWT |

### 5.3 HTI-4 Final Rule — [Published with CMS-1833-F](https://healthit.gov/resources/hti-4-final-rule-electronic-prescribing-real-time-prescription-benefit-and-electronic-prior-authorization/)

Key changes (effective Oct 1, 2025, phased through Jan 1, 2028):

| Change Type | Details |
|------------|---------|
| **Updated criterion** | §170.315(b)(3) Electronic Prescribing — updated to NCPDP SCRIPT 2023011; added ePA transactions; removed optional ePA transactions |
| **New criterion** | §170.315(b)(4) Real-Time Prescription Benefit |
| **New criteria** | §170.315(g)(31) Coverage Requirements Discovery; §170.315(g)(32) Documentation Templates & Rules; §170.315(g)(33) Prior Authorization Support — all FHIR-based (Da Vinci) |
| **New criteria** | §170.315(j)(20) Workflow Triggers for DSI — Clients; §170.315(j)(21) Workflow Triggers for DSI — Services |
| **Base EHR addition** | (b)(3) and (b)(4) added to Base EHR definition effective Jan 1, 2028 |

---

## 6. Complete Certification Criteria Inventory (§170.315)

### 6.1 Categories

All current ONC certification criteria reside in [§170.315](https://www.law.cornell.edu/cfr/text/45/170.315) and are organized into categories:

- **(a)** Clinical
- **(b)** Care Coordination
- **(c)** Clinical Quality Measures
- **(d)** Privacy and Security
- **(e)** Patient Engagement
- **(f)** Public Health
- **(g)** Design and Performance
- **(h)** Transport Methods and Other Protocols
- **(j)** New HTI-4 criteria (workflow triggers)

### 6.2 Mandatory vs. Optional — Framework

ONC certification is **modular**: a Health IT Module can be certified to **any individual criterion** or combination of criteria. There is no single "full EHR certification" required by ONC. However, practical mandatoriness arises from three sources:

1. **Base EHR Definition (§170.102):** The criteria in the Base EHR definition are functionally mandatory because they are required to generate a [CMS EHR Certification ID](https://healthit.gov/resources/cms-ehr-certification-id-quick-reference-for-health-it-developers-and-cms-program-participants/) through the [CHPL](https://chpl.healthit.gov/), which is required for CMS program participation.

2. **CEHRT Definition (42 CFR §414.1305):** CMS adds criteria beyond Base EHR — specifically (a)(12), (e)(3), (g)(1)/(g)(2), and (c)(2)/(c)(3) — making these functionally mandatory for any vendor whose customers participate in MIPS.

3. **CMS PI Measure Support:** Individual PI measures require specific criteria (e.g., (b)(3) for e-Prescribing, (f)(1) for immunization registry, (f)(5) for electronic case reporting). Without certification to these, providers cannot attest and will face payment adjustments.

4. **Market Expectations:** Even criteria not strictly required by regulation may be practically necessary for a competitive ambulatory EHR (e.g., (a)(4) drug interaction checks, (a)(15) social determinants, (b)(9) care plans).

---

## 7. Conditions and Maintenance of Certification (Subpart D)

All certified health IT developers must comply with the following [Conditions and Maintenance of Certification](https://www.law.cornell.edu/cfr/text/45/170.406):

| Condition | Section | Applies To | Key Requirements |
|-----------|---------|-----------|-----------------|
| **Information Blocking** | [§170.401](https://www.law.cornell.edu/cfr/text/45/170.401) | All certified developers | Must not engage in information blocking as defined in [45 CFR Part 171](https://www.law.cornell.edu/cfr/text/45/part-171) |
| **Assurances** | [§170.402](https://www.law.cornell.edu/cfr/text/45/170.402) | All certified developers | Must make certified capabilities available; provide updates per timelines; (a)(4) and (b)(2) apply to EHI-storing products — EHI Export (b)(10) required |
| **Communications** | [§170.403](https://www.law.cornell.edu/cfr/text/45/170.403) | All certified developers | Must not prohibit or restrict communications about usability, interoperability, security, user experience, business practices, or manner of use |
| **API** | [§170.404](https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/) | Developers certified to (g)(7)–(10), (g)(31)–(33) | Must publish APIs; allow access to all EHI; publish technical documentation; publish service base URLs in FHIR format; registration within 10 business days; no unreasonable fees |
| **Real World Testing** | [§170.405](https://www.law.cornell.edu/cfr/text/45/170.405) | Developers certified to (b), (c)(1)–(3), (e)(1), (f), (g)(7)–(10), (h) | Must develop/submit/execute annual RWT plans; submit results |
| **Attestations** | [§170.406](https://www.law.cornell.edu/cfr/text/45/170.406) | All certified developers | Semi-annual attestation of compliance with §170.401–405 |
| **Insights** | [§170.407](https://www.healthit.gov/sites/default/files/2026-01/Insights%20Condition%20Presentation%2012.18_FINAL.pdf) | Developers certified to criteria covered by Insights metrics | Annual reporting of usage/interoperability metrics; phased CY 2026+ (**largely deferred per EDN2025.02**) |

---

## 8. Structured Criteria Table

The following table lists every current ONC certification criterion with its status, relevance to Base EHR, relevance to CEHRT/MIPS, and practical market assessment for a full ambulatory EHR.

**Legend:**
- **Base EHR**: Criterion is part of the Base EHR definition at §170.102
- **CEHRT-MIPS**: Criterion is required under the CEHRT definition at 42 CFR §414.1305 or needed for specific PI measures
- **Market**: Practical assessment — "Essential" means virtually all competitive ambulatory EHRs include it; "Important" means most do; "Niche" means specialty-dependent; "Optional" means rarely needed for ambulatory

| # | Criterion | Citation | Topic | Base EHR | CEHRT-MIPS | Market Status | Notes |
|---|-----------|----------|-------|----------|------------|---------------|-------|
| 1 | CPOE — Medications | [§170.315(a)(1)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record/change/access medication orders | Yes (one of (a)(1-3)) | Yes | Essential | Most ambulatory EHRs certify to (a)(1) |
| 2 | CPOE — Laboratory | [§170.315(a)(2)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record/change/access lab orders | Yes (one of (a)(1-3)) | Yes | Essential | Typically certified alongside (a)(1) |
| 3 | CPOE — Diagnostic Imaging | [§170.315(a)(3)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record/change/access imaging orders | Yes (one of (a)(1-3)) | Yes | Essential | Typically certified alongside (a)(1) |
| 4 | Drug-Drug, Drug-Allergy Checks | [§170.315(a)(4)](https://www.law.cornell.edu/cfr/text/45/170.315) | Automatic CPOE interaction checks | No | No (direct) | Essential | Not in Base EHR but universally expected; safety-critical |
| 5 | Demographics & Observations | [§170.315(a)(5)](https://www.law.cornell.edu/cfr/text/45/170.315) | Race/ethnicity, language, sex, SOGI, SPCU, name-to-use, pronouns | Yes | Yes | Essential | Revised by HTI-1; SOGI elements subject to EDN2025.01 discretion; new elements by Jan 1, 2026 (extended to Mar 1, 2026 per EDN2025.06) |
| 6 | (a)(6)–(8) | Reserved | — | — | — | — | Not available for certification |
| 7 | Clinical Decision Support | [§170.315(a)(9)](https://www.law.cornell.edu/cfr/text/45/170.315) | CDS interventions, evidence-based, reference | **Expired Jan 1, 2025** | No | N/A | Replaced by (b)(11). Proposed for removal in HTI-5 |
| 8 | (a)(10)–(11) | Reserved | — | — | — | — | Not available |
| 9 | Family Health History | [§170.315(a)(12)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record/change/access family history per SNOMED CT | No | **Yes** (CEHRT def) | Essential | Required by CEHRT definition for MIPS. HTI-1 updated code sets. HTI-5 proposes removal effective Jan 1, 2027 |
| 10 | (a)(13) | Reserved | — | — | — | — | Not available |
| 11 | Implantable Device List | [§170.315(a)(14)](https://www.law.cornell.edu/cfr/text/45/170.315) | UDI parsing, recording, display | Yes | Yes | Essential | Required for Base EHR. HTI-5 proposes removal |
| 12 | Social, Psychological, Behavioral Data | [§170.315(a)(15)](https://www.law.cornell.edu/cfr/text/45/170.315) | SDOH screening data (financial strain, education, etc.) | No | No (direct) | Important | Increasingly expected for value-based care; HTI-1 updated code sets; compliance extended to Mar 1, 2026 per EDN2025.06 |
| 13 | Transitions of Care | [§170.315(b)(1)](https://www.law.cornell.edu/cfr/text/45/170.315) | Send/receive/validate C-CDA summaries | Yes | Yes (PI HIE measures) | Essential | Core interoperability criterion; C-CDA R4.1 and USCDI v3 by Jan 1, 2026 (extended to Mar 1, 2026) |
| 14 | Clinical Info Reconciliation | [§170.315(b)(2)](https://www.law.cornell.edu/cfr/text/45/170.315) | Reconcile meds/allergies/problems from TOC | No | Yes (PI HIE measures) | Essential | Required for PI "Receive & Reconcile" measure. HTI-5 proposes removal effective Jan 1, 2027 |
| 15 | Electronic Prescribing | [§170.315(b)(3)](https://www.law.cornell.edu/cfr/text/45/170.315) | NCPDP SCRIPT e-prescribing transactions | No (until Jan 1, 2028) | Yes (PI e-Prescribing) | Essential | HTI-4 updated to SCRIPT 2023011; added ePA; will join Base EHR Jan 1, 2028 |
| 16 | Real-Time Prescription Benefit | [§170.315(b)(4)](https://www.law.cornell.edu/cfr/text/45/170.315) | RTPB request/response | No (until Jan 1, 2028) | No (direct, until 2028) | Important | New in HTI-4; will join Base EHR Jan 1, 2028; must co-certify with (b)(3) |
| 17 | (b)(5)–(6) | Reserved | — | — | — | — | (b)(6) data export expired/replaced by (b)(10) |
| 18 | Security Tags — Send | [§170.315(b)(7)](https://www.law.cornell.edu/cfr/text/45/170.315) | Create privacy-tagged summaries | No | No | Niche | DS4P segmentation; HTI-5 proposes removal |
| 19 | Security Tags — Receive | [§170.315(b)(8)](https://www.law.cornell.edu/cfr/text/45/170.315) | Receive/preserve privacy markings | No | No | Niche | DS4P; HTI-5 proposes removal |
| 20 | Care Plan | [§170.315(b)(9)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record/access/create/receive care plans | No | No (direct) | Important | Useful for chronic care; C-CDA updated by HTI-1. HTI-5 proposes removal |
| 21 | EHI Export | [§170.315(b)(10)](https://www.law.cornell.edu/cfr/text/45/170.315) | Single patient and population export | No | Yes (via §170.402 Assurances) | Essential | Required by Assurances Condition for any product storing EHI; supports data portability |
| 22 | Decision Support Interventions | [§170.315(b)(11)](https://www.law.cornell.edu/cfr/text/45/170.315) | Evidence-based + Predictive DSI; AI transparency | Yes (from Jan 1, 2025) | Yes | Essential | Replaced (a)(9) in Base EHR; requires source attributes and risk management for Predictive DSI; compliance extended to Mar 1, 2026 per EDN2025.06 |
| 23 | CQM — Record & Export | [§170.315(c)(1)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record all CQM data; create export file | Yes | Yes | Essential | Base EHR criterion |
| 24 | CQM — Import & Calculate | [§170.315(c)(2)](https://www.law.cornell.edu/cfr/text/45/170.315) | Import and calculate CQMs | No | **Yes** (CEHRT def) | Essential | Required by CEHRT definition |
| 25 | CQM — Report | [§170.315(c)(3)](https://www.law.cornell.edu/cfr/text/45/170.315) | Create QRDA files for CMS submission | No | **Yes** (CEHRT def) | Essential | Required by CEHRT definition; QRDA Cat I/III |
| 26 | CQM — Filter | [§170.315(c)(4)](https://www.law.cornell.edu/cfr/text/45/170.315) | Filter CQM data by provider/patient attributes | No | Optional per CEHRT def | Important | Useful for quality reporting. HTI-1 updated code sets. HTI-5 proposes removal effective Jan 1, 2027 |
| 27 | Authentication, Access Control | [§170.315(d)(1)](https://www.law.cornell.edu/cfr/text/45/170.315) | Verify identity; role-based access | No | No (direct) | Essential | Universally expected for HIPAA. HTI-5 proposes removal (relying on HIPAA instead) |
| 28 | Auditable Events & Tamper-Resistance | [§170.315(d)(2)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record audit events; tamper detection | No | No (direct) | Essential | HTI-5 proposes removal |
| 29 | Audit Report(s) | [§170.315(d)(3)](https://www.law.cornell.edu/cfr/text/45/170.315) | Create/sort audit logs | No | No (direct) | Essential | HTI-5 proposes removal |
| 30 | Amendments | [§170.315(d)(4)](https://www.law.cornell.edu/cfr/text/45/170.315) | Accept/deny patient amendments | No | No (direct) | Important | HIPAA requirement. HTI-5 proposes removal |
| 31 | Automatic Access Time-out | [§170.315(d)(5)](https://www.law.cornell.edu/cfr/text/45/170.315) | Inactivity timeout | No | No (direct) | Essential | HTI-5 proposes removal |
| 32 | Emergency Access | [§170.315(d)(6)](https://www.law.cornell.edu/cfr/text/45/170.315) | Break-the-glass emergency access | No | No (direct) | Important | HTI-5 proposes removal |
| 33 | End-User Device Encryption | [§170.315(d)(7)](https://www.law.cornell.edu/cfr/text/45/170.315) | Encrypt local data or prevent local storage | No | No (direct) | Essential | HTI-5 proposes removal |
| 34 | Integrity | [§170.315(d)(8)](https://www.law.cornell.edu/cfr/text/45/170.315) | Hash/digest verification | No | No (direct) | Important | HTI-5 proposes removal |
| 35 | Trusted Connection | [§170.315(d)(9)](https://www.law.cornell.edu/cfr/text/45/170.315) | TLS/message encryption | No | No (direct) | Essential | HTI-5 proposes removal |
| 36 | Auditing Actions on Health Info | [§170.315(d)(10)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record actions on EHI; tamper-resistant | No | No (direct) | Important | HTI-5 proposes removal |
| 37 | Accounting of Disclosures | [§170.315(d)(11)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record TPO disclosures | No | No (direct) | Niche | HTI-5 proposes removal |
| 38 | Encrypt Authentication Credentials | [§170.315(d)(12)](https://www.law.cornell.edu/cfr/text/45/170.315) | Attest yes/no to encrypting credentials | No | No (direct) | Important | Attestation-only criterion (new in Cures Update). HTI-5 proposes removal |
| 39 | Multi-Factor Authentication | [§170.315(d)(13)](https://www.law.cornell.edu/cfr/text/45/170.315) | Attest yes/no to MFA with use cases | No | No (direct) | Important | Attestation-only (new in Cures Update). HTI-5 proposes removal |
| 40 | View, Download, Transmit to 3rd Party | [§170.315(e)(1)](https://www.law.cornell.edu/cfr/text/45/170.315) | Patient portal; VDT; activity log; internet-based restriction requests | No | Yes (PI Patient Exchange) | Essential | Required for PI "Provide Patients Electronic Access" measure; USCDI v3 and C-CDA R4.1 by Jan 1, 2026 (extended to Mar 1, 2026) |
| 41 | (e)(2) | Reserved | — | — | — | — | |
| 42 | Patient Health Info Capture | [§170.315(e)(3)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record patient-submitted data; link documents | No | **Yes** (CEHRT def) | Essential | Required by CEHRT definition for MIPS. HTI-5 proposes removal effective Jan 1, 2027 |
| 43 | Immunization Registries | [§170.315(f)(1)](https://www.law.cornell.edu/cfr/text/45/170.315) | Create/transmit immunization data; query history | No | Yes (PI measure) | Essential | Required PI measure. Code set updates by Jan 1, 2026 (extended to Mar 1, 2026) |
| 44 | Syndromic Surveillance | [§170.315(f)(2)](https://www.law.cornell.edu/cfr/text/45/170.315) | Create/transmit syndromic surveillance data | No | Optional (PI bonus) | Important | Bonus PI measure; valuable for public health reporting |
| 45 | Reportable Lab Tests | [§170.315(f)(3)](https://www.law.cornell.edu/cfr/text/45/170.315) | Lab results to PHAs | No | No (ambulatory direct) | Niche | More relevant to lab-intensive settings. Code set updates by Mar 1, 2026 |
| 46 | Cancer Registries | [§170.315(f)(4)](https://www.law.cornell.edu/cfr/text/45/170.315) | Transmit cancer case info | No | No (ambulatory direct) | Niche | Specialty-specific (oncology). HTI-5 proposes removal effective Jan 1, 2027 |
| 47 | Electronic Case Reporting | [§170.315(f)(5)](https://www.law.cornell.edu/cfr/text/45/170.315) | eCR; FHIR/CDA-based reporting | No | Yes (PI measure) | Essential | Required PI measure. Standards update by Dec 31, 2025; enforcement discretion through Dec 31, 2026 per EDN2025.04 |
| 48 | Antimicrobial Reporting | [§170.315(f)(6)](https://www.law.cornell.edu/cfr/text/45/170.315) | AU/AR reporting | No | No (ambulatory) | Niche | Primarily inpatient. HTI-5 proposes revision |
| 49 | Healthcare Surveys | [§170.315(f)(7)](https://www.law.cornell.edu/cfr/text/45/170.315) | Survey data transmission | No | No | Niche | Primarily inpatient (NHSN). HTI-5 proposes removal effective Jan 1, 2027 |
| 50 | Automated Numerator Recording | [§170.315(g)(1)](https://www.law.cornell.edu/cfr/text/45/170.315) | Record PI measure numerators | No | **Yes** (CEHRT def) | Essential | Required by CEHRT for percentage-based PI measures. HTI-5 proposes removal effective Jan 1, 2027 |
| 51 | Automated Measure Calculation | [§170.315(g)(2)](https://www.law.cornell.edu/cfr/text/45/170.315) | Calculate PI measure percentages | No | **Yes** (CEHRT def, alternative to (g)(1)) | Essential | Required by CEHRT. HTI-5 proposes removal effective Jan 1, 2027 |
| 52 | Safety-Enhanced Design | [§170.315(g)(3)](https://www.law.cornell.edu/cfr/text/45/170.315) | User-centered design; NISTIR 7742 reporting | No | No (direct) | Important | Required for any module certified to (a)(1)–(5), (a)(9), (a)(14), (b)(2)–(3), (b)(11). HTI-5 proposes removal |
| 53 | Quality Management System | [§170.315(g)(4)](https://www.law.cornell.edu/cfr/text/45/170.315) | Identify QMS for certified capabilities | No | No (direct) | Important | Required for any certification testing. HTI-5 proposes removal |
| 54 | Accessibility-Centered Design | [§170.315(g)(5)](https://www.law.cornell.edu/cfr/text/45/170.315) | Identify accessibility standards used | No | No (direct) | Important | Required for any certification testing. HTI-5 proposes removal |
| 55 | Consolidated CDA Creation Performance | [§170.315(g)(6)](https://www.law.cornell.edu/cfr/text/45/170.315) | C-CDA validation, vocabulary, completeness | No | No (direct) | Essential | Dependencies for (b)(1), (e)(1); C-CDA R4.1 by Mar 1, 2026. HTI-5 proposes removal |
| 56 | API — Patient Selection | [§170.315(g)(7)](https://www.law.cornell.edu/cfr/text/45/170.315) | API for patient ID/selection | Yes | Yes | Essential | Base EHR; API Condition applies. HTI-5 proposes removal effective Jan 1, 2027 |
| 57 | (g)(8) | Reserved (expired) | — | — | — | — | Replaced by (g)(10) |
| 58 | API — All Data Request | [§170.315(g)(9)](https://www.law.cornell.edu/cfr/text/45/170.315) | API for all patient data (C-CDA) | Yes | Yes | Essential | Base EHR; API Condition applies. USCDI v3 and C-CDA R4.1 by Mar 1, 2026. HTI-5 proposes removal effective Jan 1, 2027 |
| 59 | Standardized API (FHIR) | [§170.315(g)(10)](https://www.law.cornell.edu/cfr/text/45/170.315) | HL7 FHIR US Core; SMART on FHIR; Bulk Data | Yes | Yes | Essential | Base EHR; anchor criterion for patient/population access; US Core 6.1.0 and SMART 2.0 by Mar 1, 2026; API Condition applies |
| 60 | (g)(11)–(30) | Reserved | — | — | — | — | |
| 61 | Coverage Requirements Discovery | [§170.315(g)(31)](https://www.law.cornell.edu/cfr/text/45/170.315) | CRD Client; CDS Hooks; Da Vinci | No | No (yet) | Important | New in HTI-4; for electronic prior authorization workflows |
| 62 | Documentation Templates & Rules | [§170.315(g)(32)](https://www.law.cornell.edu/cfr/text/45/170.315) | DTR EHR; Da Vinci | No | No (yet) | Important | New in HTI-4 |
| 63 | Prior Authorization Support | [§170.315(g)(33)](https://www.law.cornell.edu/cfr/text/45/170.315) | PA submission; FHIR Subscriptions; Da Vinci | No | No (yet) | Important | New in HTI-4 |
| 64 | Direct Project | [§170.315(h)(1)](https://www.law.cornell.edu/cfr/text/45/170.315) | Secure Health Transport; Delivery Notification | Yes (one of (h)(1-2)) | Yes | Essential | Base EHR. HTI-5 proposes removal |
| 65 | Direct Project, Edge, XDR/XDM | [§170.315(h)(2)](https://www.law.cornell.edu/cfr/text/45/170.315) | Enhanced transport protocols | Yes (one of (h)(1-2)) | Yes | Important | Alternative to (h)(1) for Base EHR. HTI-5 proposes removal |
| 66 | Workflow Triggers for DSI — Clients | [§170.315(j)(20)](https://www.law.cornell.edu/cfr/text/45/170.315) | CDS Hooks client for PA workflows | No | No | Important | New in HTI-4; co-certified with (g)(31) |
| 67 | Workflow Triggers for DSI — Services | [§170.315(j)(21)](https://www.law.cornell.edu/cfr/text/45/170.315) | CDS Hooks services for PA | No | No | Niche | New in HTI-4 |

---

## 9. Minimum Criteria Set for a Competitive Full Ambulatory EHR

Based on the Base EHR definition, CEHRT requirements, CMS PI measure support, and market expectations, the following represents the **minimum practical certification footprint** for a commercially competitive full ambulatory EHR product as of 2026:

### 9.1 Tier 1: Formally Required (Base EHR + CEHRT + PI)

These criteria are either in the Base EHR definition, required by the CEHRT definition, or required to support mandatory MIPS PI measures:

| Criterion | Reason Required |
|-----------|----------------|
| (a)(1) CPOE — Medications | Base EHR |
| (a)(2) CPOE — Laboratory | Base EHR |
| (a)(3) CPOE — Diagnostic Imaging | Base EHR |
| (a)(5) Demographics & Observations | Base EHR |
| (a)(12) Family Health History | CEHRT definition |
| (a)(14) Implantable Device List | Base EHR |
| (b)(1) Transitions of Care | Base EHR + PI HIE measures |
| (b)(2) Clinical Info Reconciliation | PI HIE measure (Receive & Reconcile) |
| (b)(3) Electronic Prescribing | PI e-Prescribing measure |
| (b)(10) EHI Export | Assurances Condition (§170.402) |
| (b)(11) Decision Support Interventions | Base EHR (from Jan 1, 2025) |
| (c)(1) CQM — Record & Export | Base EHR |
| (c)(2) CQM — Import & Calculate | CEHRT definition |
| (c)(3) CQM — Report | CEHRT definition |
| (e)(1) View, Download, Transmit | PI Patient Exchange measure |
| (e)(3) Patient Health Info Capture | CEHRT definition |
| (f)(1) Immunization Registries | PI required measure |
| (f)(5) Electronic Case Reporting | PI required measure |
| (g)(1) or (g)(2) Automated Numerator/Measure Calc | CEHRT definition (for % measures) |
| (g)(7) API — Patient Selection | Base EHR |
| (g)(9) API — All Data Request | Base EHR |
| (g)(10) Standardized API (FHIR) | Base EHR |
| (h)(1) or (h)(2) Direct Project / Transport | Base EHR |

### 9.2 Tier 2: Strongly Recommended for Market Competitiveness

| Criterion | Reason |
|-----------|--------|
| (a)(4) Drug-Drug/Drug-Allergy Checks | Patient safety; universally expected |
| (a)(15) Social, Psychological, Behavioral Data | SDOH increasingly required for value-based care |
| (b)(4) Real-Time Prescription Benefit | New in HTI-4; will be Base EHR Jan 1, 2028 |
| (b)(9) Care Plan | Chronic care management; care coordination |
| (c)(4) CQM — Filter | Quality reporting flexibility |
| (d)(1)–(d)(13) Privacy & Security suite | All universally expected for HIPAA compliance even if HTI-5 proposes removing from certification |
| (f)(2) Syndromic Surveillance | PI bonus measure; public health value |
| (g)(3) Safety-Enhanced Design | Required dependency for testing (a)(1)–(5), (b)(2)–(3), (b)(11) |
| (g)(4) Quality Management System | Required for certification testing |
| (g)(5) Accessibility-Centered Design | Required for certification testing |
| (g)(6) Consolidated CDA Creation Performance | Required dependency for (b)(1), (e)(1) |
| (g)(31)–(g)(33) Prior Authorization APIs | Emerging market requirement; reduces admin burden |

### 9.3 Tier 3: Specialty/Niche (Formally Optional, Context-Dependent)

| Criterion | When Needed |
|-----------|-------------|
| (b)(7)–(b)(8) Security Tags | Behavioral health, substance use disorder |
| (f)(3) Reportable Lab Tests | Labs, public health labs |
| (f)(4) Cancer Registries | Oncology practices |
| (f)(6) Antimicrobial Reporting | Inpatient, infectious disease |
| (f)(7) Healthcare Surveys | Inpatient (NHSN) |
| (h)(2) Edge Protocol, XDR/XDM | Organizations needing extended transport |
| (j)(20)–(j)(21) Workflow Triggers | Prior authorization service providers |

---

## 10. Key Compliance Dates Summary

| Date | Event | Source |
|------|-------|--------|
| Mar 11, 2024 | HTI-1 effective; edition naming removed; (g)(10) 1-hour access revocation | [89 FR 1192](https://www.federalregister.gov/documents/2024/01/09/2023-28857/health-data-technology-and-interoperability-certification-program-updates-algorithm-transparency-and) |
| Dec 31, 2024 | (a)(9) CDS expires; (b)(11) DSI required for Base EHR; (g)(10) service base URLs published | [HTI-1 Key Dates](https://healthit.gov/wp-content/uploads/2025/03/Overview-and-Key-Dates-2024_508.pdf) |
| Oct 1, 2025 | HTI-4 effective; (b)(3) updated, (b)(4) and (g)(31)–(33) available | [HTI-4 Fact Sheet](https://healthit.gov/resources/hti-4-final-rule-electronic-prescribing-real-time-prescription-benefit-and-electronic-prior-authorization/) |
| Jan 1, 2026 (→ Mar 1, 2026 per EDN2025.06) | USCDI v3 baseline (v1 expired); C-CDA R4.1; US Core 6.1.0; SMART 2.0; (a)(5) new elements; all code set updates | [EDN2025.06](https://healthit.gov/certification-health-it/enforcement-discretion-notices/) |
| CY 2026 | Insights Condition Year 1 data collection begins (largely deferred per EDN2025.02 except FHIR app metrics) | [§170.407](https://www.healthit.gov/sites/default/files/2026-01/Insights%20Condition%20Presentation%2012.18_FINAL.pdf) |
| Jan 1, 2028 | (b)(3) e-Prescribing and (b)(4) RTPB added to Base EHR definition; (b)(3) must use SCRIPT 2023011 | [HTI-4](https://healthit.gov/resources/hti-4-final-rule-electronic-prescribing-real-time-prescription-benefit-and-electronic-prior-authorization/) |
| TBD (2026–2027?) | HTI-5 finalization (if any) — could remove 34 criteria | [90 FR 861 (proposed)](https://www.federalregister.gov/documents/2025/12/29/2025-23896/health-data-technology-and-interoperability-astponc-deregulatory-actions-to-unleash-prosperity) |

---

## 11. Uncertainties and Open Items

1. **HTI-5 Impact:** The proposed rule would remove the vast majority of privacy/security, transport, CDA-related, and several clinical criteria. If finalized as proposed, the certification footprint shrinks dramatically. However, the comment period is still open and the political/industry dynamics around deregulation are fluid. **No action should be taken to reduce certification scope based on HTI-5 until it is finalized.**

2. **SOGI / USCDI v3 Elements:** EDN2025.01 provides enforcement discretion for sexual orientation, gender identity, sex parameter for clinical use, name to use, and pronouns under (a)(5) and across USCDI-referencing criteria. This is in effect for ~12 months from March 21, 2025, or until regulatory action per [EO 14168](https://www.federalregister.gov/documents/2025/02/03/2025-02227/defending-women-from-gender-ideology-extremism-and-restoring-biological-truth-to-the-federal). It is uncertain whether these elements will remain required, be revised, or be removed.

3. **CMS CEHRT Definition for 2026+:** CMS has not yet published a 2026-specific CEHRT definition update. The [42 CFR §414.1305](https://www.law.cornell.edu/cfr/text/42/414.1305) definition references the Base EHR definition "or subsequent" — so the Jan 1, 2025 Base EHR changes (adding (b)(11)) flow through automatically. The 2026 PFS final rule may adjust PI measure requirements.

4. **Insights Condition Scope:** Most Insights metrics are deferred per EDN2025.02, but the "use of FHIR in apps through certified health IT" metric (§170.407(a)(3)(iv)) remains on track for July 2027 reporting. Uncertainty exists about whether the broader Insights Condition will survive HTI-5.

5. **PDMP Query:** CMS requires a PDMP query measure under PI, but there is no dedicated ONC certification criterion for PDMP (this was proposed in the withdrawn HTI-2 NPRM provisions). Providers must use available state/commercial systems.

6. **Real World Testing Relief:** EDN2025.03 provides broad RWT discretion through Dec 31, 2026. If HTI-5 finalizes removal of RWT (as proposed), these obligations may not resume.

7. **Dependency Criteria:** (g)(3), (g)(4), and (g)(5) are not standalone certifiable criteria but are **required dependencies** during testing of other criteria. Even if HTI-5 removes them from the certification program, the underlying design and quality practices they represent will remain expected.

---

## 12. Primary Source URLs

| Source | URL |
|--------|-----|
| 45 CFR Part 170 (full text via LII) | https://www.law.cornell.edu/cfr/text/45/part-170 |
| §170.102 Definitions (Base EHR) | https://www.law.cornell.edu/cfr/text/45/170.102 |
| §170.315 Certification Criteria | https://www.law.cornell.edu/cfr/text/45/170.315 |
| ONC Certification Program Regulations | https://healthit.gov/certification-health-it/certification-program-regulations/ |
| HTI-1 Final Rule (89 FR 1192) | https://www.federalregister.gov/documents/2024/01/09/2023-28857/health-data-technology-and-interoperability-certification-program-updates-algorithm-transparency-and |
| HTI-1 Key Dates Fact Sheet (PDF) | https://healthit.gov/wp-content/uploads/2025/03/Overview-and-Key-Dates-2024_508.pdf |
| HTI-4 Final Rule Overview | https://healthit.gov/resources/hti-4-final-rule-electronic-prescribing-real-time-prescription-benefit-and-electronic-prior-authorization/ |
| HTI-5 Proposed Rule (90 FR 861) | https://www.federalregister.gov/documents/2025/12/29/2025-23896/health-data-technology-and-interoperability-astponc-deregulatory-actions-to-unleash-prosperity |
| ONC Cures Act Final Rule (85 FR 25642) | https://www.federalregister.gov/documents/2020/05/01/2020-07419/21st-century-cures-act-interoperability-information-blocking-and-the-onc-health-it-certification |
| Enforcement Discretion Notices | https://healthit.gov/certification-health-it/enforcement-discretion-notices/ |
| CMS CEHRT Definition (42 CFR §414.1305) | https://www.law.cornell.edu/cfr/text/42/414.1305 |
| CMS EHR Certification ID Quick Reference | https://healthit.gov/resources/cms-ehr-certification-id-quick-reference-for-health-it-developers-and-cms-program-participants/ |
| CMS QPP Promoting Interoperability | https://qpp.cms.gov/mips/promoting-interoperability |
| CHPL (Certified Health IT Product List) | https://chpl.healthit.gov/ |
| §170.404 API Conditions Resource Guide | https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/ |
| §170.406 Attestations CCG | https://healthit.gov/certification-health-it/conditions-ccg/attestations/ |
| Cures Update Reference (PDF) | https://healthit.gov/wp-content/uploads/2020/11/Cures_Update_Quick_Reference_2020.pdf |
| Cures Update Fact Sheet (PDF) | https://healthit.gov/wp-content/uploads/2025/02/Cures-Update-Fact-Sheet.pdf |
| Insights Condition Presentation (PDF) | https://www.healthit.gov/sites/default/files/2026-01/Insights%20Condition%20Presentation%2012.18_FINAL.pdf |

---

*This report reflects the regulatory state as of March 15, 2026. It is based on primary federal sources and is intended as a reference for product development planning. It is not legal advice. All citations are to the sources as retrieved on or before the report date.*
