# ONC Master Audit Matrix

**Prepared for:** MVS Cloud / HealthOS  
**Date:** March 15, 2026  
**Total Auditable Requirements:** 94  
**Scope:** Full ambulatory EHR certification under the ONC Health IT Certification Program  
**Regulatory basis:** [45 CFR Part 170](https://www.law.cornell.edu/cfr/text/45/part-170), as updated through HTI-4; [Conditions & Maintenance of Certification](https://healthit.gov/certification-health-it/conditions-ccg/); CMS/HIPAA dependencies  

---

## How to Use This Matrix

Each row represents **one auditable requirement or obligation** — not just one row per certification criterion. A single criterion may have multiple rows if it carries distinct auditable requirements (e.g., initial certification testing vs. ongoing maintenance obligations). Requirements are organized into sections:

1. **CERT-** — Certification criteria testing requirements (§170.315)
2. **COC-** — Conditions and Maintenance of Certification (§170.401–407, §170.580)
3. **CMS-** — CMS/provider-use dependencies (indirect but critical)
4. **HIPAA-** / **MARKET-** — Non-ONC regulatory and market obligations
5. **EDN-** — Active enforcement discretion notices

---

## Certification Criteria — (a) Clinical

### CERT-A1 — CPOE — Medications

| Field | Value |
|---|---|
| **Requirement ID** | CERT-A1 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(a)(1) |
| **Title** | CPOE — Medications |
| **Exact Requirement Summary** | Enable a user to record, change, and access medication orders electronically. |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Live demonstration of order entry workflow; screenshots/recordings of medication ordering; documentation of order lifecycle (create, modify, access). |
| **Test Method** | Conformance Method: documentation + visual inspection. No ONC test tool required. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can users create, modify, and view medication orders? Is the workflow documented? |
| **Pass Conditions** | ATL tester confirms all CPOE actions for medications during visual inspection; documentation complete. |
| **Failure Risks** | Certification failure; loss of Base EHR status; inability to generate CMS EHR Certification ID. |
| **Frequency** | Initial certification + post-update re-test |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification; re-test upon material changes |
| **Notes** | Base EHR criterion. Dependency: must also certify to (g)(3) SED. |

### CERT-A2 — CPOE — Laboratory

| Field | Value |
|---|---|
| **Requirement ID** | CERT-A2 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(a)(2) |
| **Title** | CPOE — Laboratory |
| **Exact Requirement Summary** | Enable a user to record, change, and access laboratory orders electronically. |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Live demonstration of lab order workflow; screenshots/recordings; documentation of order lifecycle. |
| **Test Method** | Conformance Method: documentation + visual inspection. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can users create, modify, and view laboratory orders? Is the workflow documented? |
| **Pass Conditions** | ATL tester confirms all CPOE actions for lab orders during visual inspection. |
| **Failure Risks** | Certification failure; loss of Base EHR status. |
| **Frequency** | Initial certification + post-update re-test |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Base EHR criterion. Dependency: (g)(3) SED. |

### CERT-A3 — CPOE — Diagnostic Imaging

| Field | Value |
|---|---|
| **Requirement ID** | CERT-A3 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(a)(3) |
| **Title** | CPOE — Diagnostic Imaging |
| **Exact Requirement Summary** | Enable a user to record, change, and access diagnostic imaging orders electronically. |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Live demonstration of imaging order workflow; screenshots/recordings. |
| **Test Method** | Conformance Method: documentation + visual inspection. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can users create, modify, and view diagnostic imaging orders? |
| **Pass Conditions** | ATL tester confirms all CPOE actions for imaging orders. |
| **Failure Risks** | Certification failure; loss of Base EHR status. |
| **Frequency** | Initial certification + post-update re-test |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Base EHR criterion. Dependency: (g)(3) SED. |

### CERT-A4 — Drug-Drug, Drug-Allergy Interaction Checks

| Field | Value |
|---|---|
| **Requirement ID** | CERT-A4 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(a)(4) |
| **Title** | Drug-Drug, Drug-Allergy Interaction Checks |
| **Exact Requirement Summary** | Automatically and electronically check drug-drug and drug-allergy interactions when CPOE is used; enable severity level adjustment restricted to identified users or system admin. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Demonstration of interaction alerts triggering during CPOE; documentation of severity adjustment controls; evidence of user restriction for severity changes. |
| **Test Method** | Conformance Method: visual inspection + documentation. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Do interaction checks fire automatically during CPOE? Can only authorized users adjust severity levels? |
| **Pass Conditions** | Alerts demonstrated for known interactions; severity controls restricted to authorized users. |
| **Failure Risks** | Patient safety risk; market disqualification; competitive disadvantage. |
| **Frequency** | Initial certification + post-update re-test |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Not in Base EHR but universally expected. Dependency: (g)(3) SED. |

### CERT-A5 — Demographics & Observations

| Field | Value |
|---|---|
| **Requirement ID** | CERT-A5 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(a)(5) |
| **Title** | Demographics & Observations |
| **Exact Requirement Summary** | Record patient demographics per the current ONC certification posture: race, ethnicity, preferred language, sex, and date of birth, with cross-referenced USCDI handling updated by current ONC guidance and active discretion notices. Current official guide language for USCDI-cross-referenced criteria requires demonstration of the sex data element using SNOMED CT Male/Female codes and states certain sex/gender-related elements are not currently required for certification purposes. |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Screenshots of demographic entry forms; evidence of coded value sets; documentation of current ONC guide/discretion handling for sex and related USCDI-linked elements. |
| **Test Method** | Conformance Method: visual inspection + documentation. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Does the system record all currently required demographic elements with correct code sets? Is the implementation aligned to the latest ONC guide language and active discretion posture for sex and related USCDI-linked elements? |
| **Pass Conditions** | All currently required data elements are present with correct terminologies, and the product's treatment of sex and related USCDI-linked elements matches the latest official ONC certification guidance in force at time of testing. |
| **Failure Risks** | Certification failure; loss of Base EHR status; USCDI non-conformance. |
| **Frequency** | Initial certification + update per HTI-1 by Mar 1, 2026 |
| **Effective Date** | 2015; revised by HTI-1 (Mar 11, 2024) |
| **Due Date/Trigger** | Mar 1, 2026 (extended from Jan 1, 2026 per EDN2025.06) |
| **Notes** | SOGI elements under EDN2025.01 discretion (~12 months from Mar 21, 2025). Dependency: (g)(3) SED. |

### CERT-A12 — Family Health History

| Field | Value |
|---|---|
| **Requirement ID** | CERT-A12 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(a)(12) |
| **Title** | Family Health History |
| **Exact Requirement Summary** | Record, change, and access family health history per HL7 Pedigree standard and SNOMED CT. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Live demonstration of family history recording; coded entry evidence. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can users record, change, and view family health history? Are entries coded to SNOMED CT? |
| **Pass Conditions** | Family health history recorded with correct coding; all CRUD operations demonstrated. |
| **Failure Risks** | Loss of CEHRT status; customers cannot participate in MIPS PI. |
| **Frequency** | Initial certification + post-update re-test |
| **Effective Date** | 2015; HTI-1 updated code sets |
| **Due Date/Trigger** | Prior to initial certification; code set update by Mar 1, 2026 |
| **Notes** | Required by CEHRT definition (42 CFR §414.1305). HTI-5 proposes removal eff. Jan 1, 2027. |

### CERT-A14 — Implantable Device List

| Field | Value |
|---|---|
| **Requirement ID** | CERT-A14 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(a)(14) |
| **Title** | Implantable Device List |
| **Exact Requirement Summary** | Record UDIs; parse UDI elements per FDA GUDID; access device descriptions from FDA AccessGUDID database. |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | UDI recording demonstration; GUDID lookup evidence; parsed UDI display. |
| **Test Method** | Conformance Method: visual inspection + documentation. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can UDIs be recorded and parsed? Does the system query AccessGUDID? |
| **Pass Conditions** | UDIs recorded; parsed elements displayed; GUDID integration functional. |
| **Failure Risks** | Certification failure; loss of Base EHR status. |
| **Frequency** | Initial certification + post-update re-test |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Base EHR. Dependency: (g)(3) SED. HTI-5 proposes removal. |

### CERT-A15 — Social, Psychological, and Behavioral Data

| Field | Value |
|---|---|
| **Requirement ID** | CERT-A15 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(a)(15) |
| **Title** | Social, Psychological, and Behavioral Data |
| **Exact Requirement Summary** | Record social, psychological, and behavioral data per USCDI data elements (SDOH assessments). |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | SDOH screening data recording demonstration; coded value evidence. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can the system record SDOH assessment data per USCDI elements? |
| **Pass Conditions** | SDOH data elements recorded with correct coding. |
| **Failure Risks** | Competitive disadvantage; value-based care readiness gap. |
| **Frequency** | Initial certification + update per HTI-1 |
| **Effective Date** | 2015; HTI-1 updated code sets |
| **Due Date/Trigger** | Mar 1, 2026 (extended per EDN2025.06) |
| **Notes** | Increasingly expected for value-based care. |

## Certification Criteria — (b) Care Coordination

### CERT-B1 — Transitions of Care

| Field | Value |
|---|---|
| **Requirement ID** | CERT-B1 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(b)(1) |
| **Title** | Transitions of Care |
| **Exact Requirement Summary** | Create, send, receive, and display transition of care/referral summaries as C-CDA documents (CCD, Referral Note). Must include all USCDI data elements. |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | C-CDA documents validated error-free by SITE C-CDA USCDI v3 Validator; send/receive workflow screenshots; USCDI data element coverage matrix. |
| **Test Method** | Test Procedure: test tools (SITE C-CDA Validators) + visual inspection + ONC test data. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can the system create, send, receive, and display valid C-CDA documents? Do documents include all USCDI v3 elements? |
| **Pass Conditions** | C-CDA validation reports error-free; USCDI v3 data element coverage complete; send/receive demonstrated. |
| **Failure Risks** | Certification failure; loss of Base EHR status; inability to support PI HIE measures. |
| **Frequency** | Initial certification + update for C-CDA R4.1 / USCDI v3 |
| **Effective Date** | 2015; updated by HTI-1 (C-CDA R4.1, USCDI v3) |
| **Due Date/Trigger** | Mar 1, 2026 (C-CDA R4.1 + USCDI v3, extended per EDN2025.06) |
| **Notes** | Core interoperability criterion. Dependencies: (g)(6) C-CDA performance. |

### CERT-B2 — Clinical Information Reconciliation

| Field | Value |
|---|---|
| **Requirement ID** | CERT-B2 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(b)(2) |
| **Title** | Clinical Information Reconciliation |
| **Exact Requirement Summary** | Reconcile and incorporate problems, medications, and allergies from received C-CDA documents; generate a new C-CDA from reconciled data. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Demonstration of reconciliation workflow; C-CDA output validated by SITE; before/after comparison. |
| **Test Method** | Test Procedure: test tools (SITE C-CDA Validators) + visual inspection. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can the system reconcile problems, meds, and allergies from incoming C-CDAs? Does it produce valid C-CDA output? |
| **Pass Conditions** | Reconciliation workflow demonstrated; output C-CDA validated. |
| **Failure Risks** | Loss of CEHRT status; PI HIE 'Receive & Reconcile' measure unsupported. |
| **Frequency** | Initial certification + post-update re-test |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required for PI HIE measure. Dependency: (g)(3) SED. HTI-5 proposes removal eff. Jan 1, 2027. |

### CERT-B3 — Electronic Prescribing

| Field | Value |
|---|---|
| **Requirement ID** | CERT-B3 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(b)(3) |
| **Title** | Electronic Prescribing |
| **Exact Requirement Summary** | Create new prescriptions, refills, change requests, cancel, fill status notifications, and ePA transactions. Use NCPDP SCRIPT standard; medication selection via RxNorm. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | eRx Testing Suite validation reports; NCPDP SCRIPT message samples; RxNorm mapping evidence; all transaction types demonstrated. |
| **Test Method** | Test Procedure: eRx Testing Suite + test data. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can the system generate all required NCPDP SCRIPT transaction types? Are medications coded to RxNorm? |
| **Pass Conditions** | eRx test suite passes; all transaction types validated; RxNorm coded. |
| **Failure Risks** | PI e-Prescribing measure unsupported; certification failure. |
| **Frequency** | Initial certification + update for SCRIPT 2023011 |
| **Effective Date** | 2015; HTI-4 updated to SCRIPT 2023011 |
| **Due Date/Trigger** | Oct 1, 2025 (HTI-4 effective); SCRIPT v2017071 expires Jan 1, 2028 |
| **Notes** | Will join Base EHR Jan 1, 2028. Dependency: (g)(3) SED. |

### CERT-B4 — Real-Time Prescription Benefit

| Field | Value |
|---|---|
| **Requirement ID** | CERT-B4 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(b)(4) |
| **Title** | Real-Time Prescription Benefit |
| **Exact Requirement Summary** | Process and display real-time prescription benefit information during prescribing; present patient-specific formulary, coverage, and cost data. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | RTPB Testing Tool validation; demonstration of benefit display during prescribing workflow. |
| **Test Method** | Test Procedure: RTPB Testing Tool. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Does the system query and display RTPB data during prescribing? Is NCPDP RTPB v13 standard used? |
| **Pass Conditions** | RTPB data displayed during prescribing; test tool validates messages. |
| **Failure Risks** | Competitive disadvantage; will become Base EHR requirement in 2028. |
| **Frequency** | Initial certification |
| **Effective Date** | Oct 1, 2025 (HTI-4) |
| **Due Date/Trigger** | Must co-certify with (b)(3); joins Base EHR Jan 1, 2028 |
| **Notes** | New in HTI-4. Must co-certify with (b)(3). |

### CERT-B7 — Security Tags — Summary of Care — Send

| Field | Value |
|---|---|
| **Requirement ID** | CERT-B7 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(b)(7) |
| **Title** | Security Tags — Summary of Care — Send |
| **Exact Requirement Summary** | Apply security labels/tags to C-CDA documents when sending, based on HL7 DS4P. |
| **Applicability** | Optional |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | DS4P-tagged C-CDA documents; test tool validation. |
| **Test Method** | Test Procedure: test tools. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can the system apply DS4P security tags to outgoing C-CDA documents? |
| **Pass Conditions** | Security-tagged C-CDA documents validated. |
| **Failure Risks** | Niche: relevant for behavioral health/SUD settings only. |
| **Frequency** | Initial certification if elected |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | If certified, ongoing compliance required |
| **Notes** | HTI-5 proposes removal. |

### CERT-B8 — Security Tags — Summary of Care — Receive

| Field | Value |
|---|---|
| **Requirement ID** | CERT-B8 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(b)(8) |
| **Title** | Security Tags — Summary of Care — Receive |
| **Exact Requirement Summary** | Receive and process security-tagged C-CDA documents, enforcing access restrictions based on tags. |
| **Applicability** | Optional |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Demonstration of receiving and enforcing DS4P-tagged documents. |
| **Test Method** | Test Procedure: test tools. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can the system receive and enforce DS4P security tags on incoming C-CDAs? |
| **Pass Conditions** | DS4P tags correctly enforced on received documents. |
| **Failure Risks** | Niche: behavioral health/SUD only. |
| **Frequency** | Initial certification if elected |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | If certified, ongoing compliance required |
| **Notes** | HTI-5 proposes removal. |

### CERT-B9 — Care Plan

| Field | Value |
|---|---|
| **Requirement ID** | CERT-B9 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(b)(9) |
| **Title** | Care Plan |
| **Exact Requirement Summary** | Record, change, access, create, and receive care plan information using C-CDA Care Plan document template. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | C-CDA Care Plan document validated; workflow demonstration. |
| **Test Method** | Test Procedure: test tools (SITE C-CDA Validators). |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can users record, modify, create, and receive care plans? Are C-CDA Care Plan documents valid? |
| **Pass Conditions** | C-CDA Care Plan validated; CRUD operations demonstrated. |
| **Failure Risks** | Competitive disadvantage for chronic care management. |
| **Frequency** | Initial certification + C-CDA R4.1 update |
| **Effective Date** | 2015; updated by HTI-1 (C-CDA R4.1) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Useful for chronic care. HTI-5 proposes removal. |

### CERT-B10 — EHI Export

| Field | Value |
|---|---|
| **Requirement ID** | CERT-B10 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(b)(10) |
| **Title** | EHI Export |
| **Exact Requirement Summary** | Single-patient and patient-population export of ALL EHI stored by the product. Export must be electronic, computable format. User must execute without developer assistance. Publicly accessible format documentation. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Data type inventory; single-patient and population export demonstration; sample export files; access control evidence; publicly posted format documentation URL. |
| **Test Method** | Conformance Method: documentation + visual inspection. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can all EHI be exported without developer assistance? Is format documentation publicly posted? Are access controls in place? |
| **Pass Conditions** | All EHI exportable; format documented publicly; access controls demonstrated. |
| **Failure Risks** | Assurances Condition violation (§170.402); Direct Review risk; information blocking exposure. |
| **Frequency** | Initial certification; ongoing Assurances obligation |
| **Effective Date** | Jun 30, 2020 (Cures Act); due Dec 31, 2023 |
| **Due Date/Trigger** | Must have been certified by Dec 31, 2023 per §170.402 |
| **Notes** | Required by Assurances Condition for any product storing EHI. |

### CERT-B11 — Decision Support Interventions (DSI)

| Field | Value |
|---|---|
| **Requirement ID** | CERT-B11 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(b)(11) |
| **Title** | Decision Support Interventions (DSI) |
| **Exact Requirement Summary** | Evidence-based DSI: enable selection/activation of CDS interventions based on problem list, medications, allergies, demographics, labs, vitals. Predictive DSI: 31 source attribute fields, intervention risk management, user feedback. Replaces (a)(9) in Base EHR. |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Inventory of all DSI; source attribute documentation (13 fields evidence-based, 31 predictive); risk management docs for Predictive DSI; user feedback export samples; UCD process documentation. |
| **Test Method** | Conformance Method: documentation + visual inspection. |
| **Owner Function** | Product / Engineering; Clinical Informatics |
| **Audit Questions** | Are all evidence-based DSI documented with source attributes? Are Predictive DSI risk-managed? Can users provide feedback? |
| **Pass Conditions** | All source attributes complete; risk management documented for predictive DSI; feedback mechanism functional. |
| **Failure Risks** | Certification failure; loss of Base EHR status; AI transparency non-compliance. |
| **Frequency** | Initial certification + ongoing maintenance per §170.402 |
| **Effective Date** | Jan 1, 2025 (replaces (a)(9)) |
| **Due Date/Trigger** | Mar 1, 2026 (extended per EDN2025.06) |
| **Notes** | Dependency: (g)(3) SED with UCD gap analysis from (a)(9) to (b)(11). Ongoing: review source attributes per §170.402 Assurances starting Jan 1, 2025. |

## Certification Criteria — (c) Clinical Quality Measures

### CERT-C1 — CQM — Record and Export

| Field | Value |
|---|---|
| **Requirement ID** | CERT-C1 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(c)(1) |
| **Title** | CQM — Record and Export |
| **Exact Requirement Summary** | Record all data necessary to calculate each CQM presented for certification. Export QRDA-formatted data files. |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Cypress test reports for all presented CQMs; QRDA export files validated by Cypress; demonstration of data recording. |
| **Test Method** | Test Procedure: Cypress test tool + ONC test data. |
| **Owner Function** | Product / Engineering; Quality Reporting |
| **Audit Questions** | Can the system record all CQM data elements? Do QRDA exports validate in Cypress? |
| **Pass Conditions** | Cypress tests pass for all presented CQMs; QRDA files valid. |
| **Failure Risks** | Certification failure; loss of Base EHR status; eCQM reporting failure. |
| **Frequency** | Initial certification + annual CQM measure updates |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Base EHR criterion. Developer selects CQMs to certify. |

### CERT-C2 — CQM — Import and Calculate

| Field | Value |
|---|---|
| **Requirement ID** | CERT-C2 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(c)(2) |
| **Title** | CQM — Import and Calculate |
| **Exact Requirement Summary** | Import QRDA data from external sources; calculate CQMs accurately. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Cypress import/calculate test reports; evidence of accurate numerator/denominator calculation. |
| **Test Method** | Test Procedure: Cypress tool with test data. |
| **Owner Function** | Product / Engineering; Quality Reporting |
| **Audit Questions** | Can the system import QRDA data and calculate CQMs accurately? |
| **Pass Conditions** | Cypress import/calculate tests pass. |
| **Failure Risks** | Loss of CEHRT status; MIPS quality reporting failure. |
| **Frequency** | Initial certification + annual CQM updates |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required by CEHRT definition. |

### CERT-C3 — CQM — Report

| Field | Value |
|---|---|
| **Requirement ID** | CERT-C3 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(c)(3) |
| **Title** | CQM — Report |
| **Exact Requirement Summary** | Create QRDA Category I (inpatient) and/or Category III (ambulatory) files for CMS submission. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Cypress QRDA validation reports; sample QRDA files. |
| **Test Method** | Test Procedure: Cypress + Cypress Validation Utility. |
| **Owner Function** | Product / Engineering; Quality Reporting |
| **Audit Questions** | Does the system generate valid QRDA Cat III files for ambulatory reporting? |
| **Pass Conditions** | Cypress validates QRDA output. |
| **Failure Risks** | Loss of CEHRT status; CMS quality reporting failure. |
| **Frequency** | Initial certification + annual updates |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required by CEHRT definition. Ambulatory: QRDA Cat III. |

### CERT-C4 — CQM — Filter

| Field | Value |
|---|---|
| **Requirement ID** | CERT-C4 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(c)(4) |
| **Title** | CQM — Filter |
| **Exact Requirement Summary** | Filter CQM results/data by patient demographics, provider, and other attributes. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Filtering demonstration; test procedure results. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering; Quality Reporting |
| **Audit Questions** | Can CQM data be filtered by demographics, provider, and other attributes? |
| **Pass Conditions** | Filtering demonstrated for all required dimensions. |
| **Failure Risks** | Reduced quality reporting flexibility. |
| **Frequency** | Initial certification if elected |
| **Effective Date** | 2015; HTI-1 updated code sets |
| **Due Date/Trigger** | Mar 1, 2026 (code set update per EDN2025.06) |
| **Notes** | Optional per CEHRT def. HTI-5 proposes removal eff. Jan 1, 2027. |

## Certification Criteria — (d) Privacy & Security

### CERT-D1 — Authentication, Access Control, Authorization

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D1 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(1) |
| **Title** | Authentication, Access Control, Authorization |
| **Exact Requirement Summary** | Verify user identity; establish role-based access permissions. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Documentation of authentication mechanism; access control matrix; role-based access configuration evidence. |
| **Test Method** | Conformance Method: attestation to ONC-ACB. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Authentication, Access Control, Authorization requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Authentication, Access Control, Authorization demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D2 — Auditable Events and Tamper-Resistance

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D2 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(2) |
| **Title** | Auditable Events and Tamper-Resistance |
| **Exact Requirement Summary** | Record audit events per §170.210(e); tamper-resistant audit logs; default to audit-enabled; restrict disable ability. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Audit log samples; tamper-resistance mechanism documentation; default-enabled evidence; restricted disable controls. |
| **Test Method** | Conformance Method: documentation + visual inspection. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Auditable Events and Tamper-Resistance requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Auditable Events and Tamper-Resistance demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D3 — Audit Report(s)

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D3 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(3) |
| **Title** | Audit Report(s) |
| **Exact Requirement Summary** | Create audit reports for specific time periods; sort entries by data elements in §170.210(e). |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Sample audit reports; sorting/filtering demonstration. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Audit Report(s) requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Audit Report(s) demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D4 — Amendments

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D4 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(4) |
| **Title** | Amendments |
| **Exact Requirement Summary** | Enable patient to request amendment to EHI; mark amended data; provide amendment audit trail. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Amendment workflow demonstration; audit trail evidence. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Amendments requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Amendments demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D5 — Automatic Access Time-Out

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D5 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(5) |
| **Title** | Automatic Access Time-Out |
| **Exact Requirement Summary** | Automatically stop user session after configurable inactivity period; require re-authentication. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Timeout configuration evidence; re-authentication demonstration. |
| **Test Method** | Conformance Method: attestation. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Automatic Access Time-Out requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Automatic Access Time-Out demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D6 — Emergency Access

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D6 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(6) |
| **Title** | Emergency Access |
| **Exact Requirement Summary** | Permit identified set of users to access EHI during an emergency (break-the-glass). |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Emergency access workflow demonstration; authorization configuration. |
| **Test Method** | Conformance Method: attestation. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Emergency Access requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Emergency Access demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D7 — End-User Device Encryption

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D7 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(7) |
| **Title** | End-User Device Encryption |
| **Exact Requirement Summary** | Encrypt EHI stored on end-user devices, OR demonstrate no EHI stored locally. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Encryption evidence or documentation that no local EHI storage occurs. |
| **Test Method** | Conformance Method: attestation. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy End-User Device Encryption requirements? Is documentation/attestation complete? |
| **Pass Conditions** | End-User Device Encryption demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D8 — Integrity

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D8 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(8) |
| **Title** | Integrity |
| **Exact Requirement Summary** | Verify EHI has not been altered in transit using hashing or digital signature. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Hash/digital signature implementation evidence. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Integrity requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Integrity demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D9 — Trusted Connection

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D9 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(9) |
| **Title** | Trusted Connection |
| **Exact Requirement Summary** | Establish trusted connections using TLS or equivalent for EHI exchange. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | TLS configuration evidence; certificate management documentation. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Trusted Connection requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Trusted Connection demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D10 — Auditing Actions on Health Information

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D10 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(10) |
| **Title** | Auditing Actions on Health Information |
| **Exact Requirement Summary** | Record actions on health information; audit log entries immutable; detect alteration. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Action audit log samples; immutability/tamper-detection evidence. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Auditing Actions on Health Information requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Auditing Actions on Health Information demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D11 — Accounting of Disclosures

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D11 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(11) |
| **Title** | Accounting of Disclosures |
| **Exact Requirement Summary** | Record disclosures made for treatment, payment, and health care operations per §170.210(d). |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Disclosure log samples; TPO disclosure tracking evidence. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Accounting of Disclosures requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Accounting of Disclosures demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D12 — Encrypt Authentication Credentials

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D12 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(12) |
| **Title** | Encrypt Authentication Credentials |
| **Exact Requirement Summary** | Encrypt authentication credentials stored locally or transmitted. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Written attestation; credential encryption implementation evidence. |
| **Test Method** | Conformance Method: attestation. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Encrypt Authentication Credentials requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Encrypt Authentication Credentials demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

### CERT-D13 — Multi-Factor Authentication

| Field | Value |
|---|---|
| **Requirement ID** | CERT-D13 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(d)(13) |
| **Title** | Multi-Factor Authentication |
| **Exact Requirement Summary** | Attest whether MFA is supported with industry-recognized standards. Describe supported use cases or explain roadmap. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Written attestation with use case descriptions; MFA implementation documentation or roadmap. |
| **Test Method** | Attestation only. |
| **Owner Function** | Product / Engineering; Security |
| **Audit Questions** | Does the system satisfy Multi-Factor Authentication requirements? Is documentation/attestation complete? |
| **Pass Conditions** | Multi-Factor Authentication demonstrated or attested; documentation on file. |
| **Failure Risks** | Certification dependency failure; HIPAA alignment gap; HTI-5 proposes removal but current requirement remains. |
| **Frequency** | Initial certification + ongoing (dependency for other criteria) |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required as dependency for other certified criteria. All (d) criteria proposed for removal in HTI-5 — but still in force as of Mar 2026. |

## Certification Criteria — (e) Patient Engagement

### CERT-E1 — View, Download, Transmit to 3rd Party

| Field | Value |
|---|---|
| **Requirement ID** | CERT-E1 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(e)(1) |
| **Title** | View, Download, Transmit to 3rd Party |
| **Exact Requirement Summary** | Patients must view health information online, download in human-readable and C-CDA format, and transmit to a third party. Must include USCDI data elements. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Patient portal demonstration; C-CDA download validated by SITE; Direct message transmission evidence; USCDI data element coverage. |
| **Test Method** | Test Procedure: test tools (SITE C-CDA Validators, ETT) + visual inspection. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can patients view, download (C-CDA), and transmit their health information? Does the portal support all USCDI elements? |
| **Pass Conditions** | Portal demonstrated; C-CDA validated; Direct transport functional; USCDI v3 coverage confirmed. |
| **Failure Risks** | PI Patient Exchange measure unsupported; certification failure. |
| **Frequency** | Initial certification + USCDI v3/C-CDA R4.1 update |
| **Effective Date** | 2015; updated by HTI-1 |
| **Due Date/Trigger** | Mar 1, 2026 (USCDI v3 + C-CDA R4.1 per EDN2025.06) |
| **Notes** | Required for PI 'Provide Patients Electronic Access' measure. |

### CERT-E3 — Patient Health Information Capture

| Field | Value |
|---|---|
| **Requirement ID** | CERT-E3 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(e)(3) |
| **Title** | Patient Health Information Capture |
| **Exact Requirement Summary** | Enable a patient or authorized representative to transmit health information to the EHR using structured standards. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Patient health information submission demonstration; structured data receipt evidence. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can patients submit structured health information that integrates into the EHR? |
| **Pass Conditions** | Patient-submitted data received and incorporated. |
| **Failure Risks** | Loss of CEHRT status; HTI-5 proposes removal eff. Jan 1, 2027. |
| **Frequency** | Initial certification |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required by CEHRT definition. |

## Certification Criteria — (f) Public Health

### CERT-F1 — Transmission to Immunization Registries

| Field | Value |
|---|---|
| **Requirement ID** | CERT-F1 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(f)(1) |
| **Title** | Transmission to Immunization Registries |
| **Exact Requirement Summary** | Generate HL7 v2.5.1 VXU immunization messages; consume ACK; generate QBP queries; receive/display RSP responses. CVX and NDC vaccine codes. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | NIST Immunization Test Suite validation reports; VXU/QBP/RSP message samples; CVX/NDC code mapping evidence. |
| **Test Method** | Test Procedure: NIST HL7 v2 Immunization Test Suite + ONC test data + visual inspection. |
| **Owner Function** | Product / Engineering; Interoperability |
| **Audit Questions** | Can the system generate valid immunization messages and process registry responses? Are CVX codes correct? |
| **Pass Conditions** | NIST test suite passes all test cases; immunization history display demonstrated. |
| **Failure Risks** | PI Immunization Registry measure unsupported; certification failure. |
| **Frequency** | Initial certification + code set updates |
| **Effective Date** | 2015; HTI-1 updated code sets |
| **Due Date/Trigger** | Mar 1, 2026 (code set update per EDN2025.06) |
| **Notes** | Required PI measure. |

### CERT-F2 — Syndromic Surveillance

| Field | Value |
|---|---|
| **Requirement ID** | CERT-F2 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(f)(2) |
| **Title** | Syndromic Surveillance |
| **Exact Requirement Summary** | Generate and transmit HL7 v2.5.1 ADT messages to public health agencies for syndromic surveillance. |
| **Applicability** | Optional |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Public Health Testing Suite validation; HL7 v2 ADT message samples. |
| **Test Method** | Test Procedure: Public Health Testing Suites on SITE. |
| **Owner Function** | Product / Engineering; Interoperability |
| **Audit Questions** | Can the system generate and transmit valid syndromic surveillance messages? |
| **Pass Conditions** | Test suite passes; messages conformant to PHIN Messaging Guide. |
| **Failure Risks** | Loss of PI bonus measure opportunity. |
| **Frequency** | Initial certification if elected |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | If certified, ongoing compliance required |
| **Notes** | PI bonus measure (5 points). |

### CERT-F3 — Reportable Laboratory Tests and Values/Results

| Field | Value |
|---|---|
| **Requirement ID** | CERT-F3 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(f)(3) |
| **Title** | Reportable Laboratory Tests and Values/Results |
| **Exact Requirement Summary** | Generate and transmit ELR to public health agencies using HL7 v2.5.1. |
| **Applicability** | Optional |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | ELR message validation; LOINC/SNOMED CT coding evidence. |
| **Test Method** | Test Procedure: test tools. |
| **Owner Function** | Product / Engineering; Interoperability |
| **Audit Questions** | Can the system generate valid ELR messages with correct coding? |
| **Pass Conditions** | ELR test suite passes; coding validated. |
| **Failure Risks** | Niche: relevant to lab-intensive settings only. |
| **Frequency** | Initial certification if elected |
| **Effective Date** | 2015; HTI-1 updated code sets |
| **Due Date/Trigger** | Mar 1, 2026 (code set update) |
| **Notes** | Niche criterion. |

### CERT-F4 — Transmission to Cancer Registries

| Field | Value |
|---|---|
| **Requirement ID** | CERT-F4 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(f)(4) |
| **Title** | Transmission to Cancer Registries |
| **Exact Requirement Summary** | Generate and transmit cancer case information to cancer registries using HL7 CDA. |
| **Applicability** | Optional |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Cancer registry CDA validation; test tool output. |
| **Test Method** | Test Procedure: test tools. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can the system transmit cancer case data in valid CDA format? |
| **Pass Conditions** | CDA validation passes. |
| **Failure Risks** | Niche: oncology practices only. HTI-5 proposes removal eff. Jan 1, 2027. |
| **Frequency** | Initial certification if elected |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | If certified, ongoing compliance required |
| **Notes** | Specialty-specific. |

### CERT-F5 — Electronic Case Reporting (eCR)

| Field | Value |
|---|---|
| **Requirement ID** | CERT-F5 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(f)(5) |
| **Title** | Electronic Case Reporting (eCR) |
| **Exact Requirement Summary** | Generate and transmit eICRs; receive reportability responses using HL7 CDA eCR standards and RCTC trigger codes. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | eCR workflow demonstration; eICR document samples; RCTC trigger code integration evidence. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering; Interoperability |
| **Audit Questions** | Can the system generate eICRs and receive reportability responses? Are RCTC trigger codes integrated? |
| **Pass Conditions** | eCR workflow demonstrated; eICR documents conformant. |
| **Failure Risks** | PI eCR measure unsupported; certification failure. |
| **Frequency** | Initial certification + standards update |
| **Effective Date** | 2015; updated by HTI-1 |
| **Due Date/Trigger** | Dec 31, 2026 (enforcement discretion per EDN2025.04 for standards compliance) |
| **Notes** | Required PI measure. Enforcement discretion relaxes standards requirements through Dec 31, 2026. |

### CERT-F6 — Antimicrobial Use and Resistance Reporting

| Field | Value |
|---|---|
| **Requirement ID** | CERT-F6 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(f)(6) |
| **Title** | Antimicrobial Use and Resistance Reporting |
| **Exact Requirement Summary** | AU/AR reporting to NHSN. |
| **Applicability** | Optional |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Test procedure results; message validation. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can the system transmit AU/AR data? |
| **Pass Conditions** | Test procedure passes. |
| **Failure Risks** | Niche: primarily inpatient. HTI-5 proposes revision. |
| **Frequency** | Initial certification if elected |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | If certified, ongoing compliance required |
| **Notes** | Primarily inpatient. |

### CERT-F7 — Healthcare Surveys

| Field | Value |
|---|---|
| **Requirement ID** | CERT-F7 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(f)(7) |
| **Title** | Healthcare Surveys |
| **Exact Requirement Summary** | Survey data transmission to NHSN. |
| **Applicability** | Optional |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Test procedure results. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Can the system transmit healthcare survey data? |
| **Pass Conditions** | Test procedure passes. |
| **Failure Risks** | Niche: primarily inpatient. HTI-5 proposes removal eff. Jan 1, 2027. |
| **Frequency** | Initial certification if elected |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | If certified, ongoing compliance required |
| **Notes** | Primarily inpatient. |

## Certification Criteria — (g) Design, Performance & API

### CERT-G1 — Automated Numerator Recording

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G1 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(1) |
| **Title** | Automated Numerator Recording |
| **Exact Requirement Summary** | Automatically record numerator data for CMS Promoting Interoperability measures. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Test procedure results; PI measure numerator recording evidence. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Does the system automatically record PI measure numerators? |
| **Pass Conditions** | Test procedure passes for all applicable measures. |
| **Failure Risks** | Loss of CEHRT status; PI percentage measures unsupported. HTI-5 proposes removal eff. Jan 1, 2027. |
| **Frequency** | Initial certification |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required by CEHRT definition (alternative to (g)(2)). |

### CERT-G2 — Automated Measure Calculation

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G2 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(2) |
| **Title** | Automated Measure Calculation |
| **Exact Requirement Summary** | Automatically calculate PI program measures (numerator/denominator). |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Test procedure results; calculation verification evidence. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Does the system automatically calculate PI measure percentages? |
| **Pass Conditions** | Test procedure passes; calculations verified. |
| **Failure Risks** | Loss of CEHRT status. HTI-5 proposes removal eff. Jan 1, 2027. |
| **Frequency** | Initial certification |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required by CEHRT definition (alternative to (g)(1)). |

### CERT-G3 — Safety-Enhanced Design (SED)

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G3 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(3) |
| **Title** | Safety-Enhanced Design (SED) |
| **Exact Requirement Summary** | Apply user-centered design processes; conduct summative usability testing; document per NISTIR 7742. Applies to (a)(1)-(a)(5), (a)(14), (b)(2), (b)(3), (b)(11). |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | UCD process documentation; summative usability test report (NISTIR 7742); task completion rates, error rates, satisfaction scores; quarterly UI change notifications to ONC-ACB. |
| **Test Method** | Test Procedure: documentation review. |
| **Owner Function** | Product / Engineering; UX Research |
| **Audit Questions** | Has UCD been applied to all applicable criteria? Is the usability report per NISTIR 7742? Are quarterly UI change notifications current? |
| **Pass Conditions** | NISTIR 7742 report complete; UCD processes documented; ONC-ACB notified of UI changes. |
| **Failure Risks** | Certification failure for dependent criteria; public usability data gap. |
| **Frequency** | Initial certification + quarterly UI change notifications |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification; ongoing quarterly notifications |
| **Notes** | Required dependency for testing (a)(1)–(5), (a)(14), (b)(2), (b)(3), (b)(11). HTI-5 proposes removal. |

### CERT-G4 — Quality Management System (QMS)

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G4 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(4) |
| **Title** | Quality Management System (QMS) |
| **Exact Requirement Summary** | Use a QMS for each certified capability. Identify QMS standard used (ISO 9001, ISO 13485, or equivalent). |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | QMS documentation; identification of QMS standard(s); development/testing/release process descriptions. |
| **Test Method** | Attestation + documentation review. |
| **Owner Function** | Quality Assurance; Engineering |
| **Audit Questions** | Is a QMS in place and documented for all certified capabilities? Which standard is used? |
| **Pass Conditions** | QMS documentation on file; standard identified; processes described. |
| **Failure Risks** | Certification failure. HTI-5 proposes removal. |
| **Frequency** | Initial certification + ongoing maintenance |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required for all certification testing. |

### CERT-G5 — Accessibility-Centered Design

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G5 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(5) |
| **Title** | Accessibility-Centered Design |
| **Exact Requirement Summary** | Demonstrate accessibility was considered in design. Identify applicable standard (Section 508, WCAG 2.0). |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Accessibility standard identification; design documentation showing accessibility considerations. |
| **Test Method** | Attestation + documentation. |
| **Owner Function** | Product / Engineering; UX |
| **Audit Questions** | Has accessibility been considered? Which standard is referenced? |
| **Pass Conditions** | Accessibility standard identified; design documentation on file. |
| **Failure Risks** | Certification failure. HTI-5 proposes removal. |
| **Frequency** | Initial certification + ongoing maintenance |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Required for all certification testing. |

### CERT-G6 — Consolidated CDA Creation Performance

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G6 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(6) |
| **Title** | Consolidated CDA Creation Performance |
| **Exact Requirement Summary** | Create C-CDA documents conformant to referenced standard for all criteria requiring C-CDA generation. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | SITE C-CDA validator reports; C-CDA document samples. |
| **Test Method** | Test Procedure: SITE C-CDA validators. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Are all generated C-CDA documents conformant to C-CDA R4.1? |
| **Pass Conditions** | SITE validator reports error-free for all C-CDA outputs. |
| **Failure Risks** | Dependency failure for (b)(1), (e)(1), other C-CDA criteria. HTI-5 proposes removal. |
| **Frequency** | Initial certification + C-CDA R4.1 update |
| **Effective Date** | 2015; updated by HTI-1 (C-CDA R4.1) |
| **Due Date/Trigger** | Mar 1, 2026 (C-CDA R4.1 per EDN2025.06) |
| **Notes** | Dependency for all C-CDA-producing criteria. |

### CERT-G7 — Application Access — Patient Selection

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G7 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(7) |
| **Title** | Application Access — Patient Selection |
| **Exact Requirement Summary** | API-enabled patient selection capability. |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | API documentation; patient selection API demonstration. |
| **Test Method** | Conformance Method. |
| **Owner Function** | Product / Engineering; API Team |
| **Audit Questions** | Does the API support patient selection? Is it documented and available? |
| **Pass Conditions** | Patient selection API functional and documented. |
| **Failure Risks** | Certification failure; loss of Base EHR status. HTI-5 proposes removal eff. Jan 1, 2027. |
| **Frequency** | Initial certification; RWT annually |
| **Effective Date** | 2015 (Cures Act Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Base EHR criterion. API Condition (§170.404) applies. Subject to RWT. |

### CERT-G9 — Application Access — All Data Request

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G9 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(9) |
| **Title** | Application Access — All Data Request |
| **Exact Requirement Summary** | API-enabled access to all patient data (C-CDA format). |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | API documentation; all-data request demonstration; C-CDA output validated. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering; API Team |
| **Audit Questions** | Does the API return all patient data? Is output valid C-CDA with USCDI v3? |
| **Pass Conditions** | API returns all data; C-CDA validated. |
| **Failure Risks** | Certification failure; loss of Base EHR status. HTI-5 proposes removal eff. Jan 1, 2027. |
| **Frequency** | Initial certification + USCDI v3/C-CDA R4.1 update; RWT annually |
| **Effective Date** | 2015; updated by HTI-1 |
| **Due Date/Trigger** | Mar 1, 2026 (USCDI v3 + C-CDA R4.1 per EDN2025.06) |
| **Notes** | Base EHR criterion. API Condition applies. Subject to RWT. |

### CERT-G10 — Standardized API for Patient and Population Services (FHIR)

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G10 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(10) |
| **Title** | Standardized API for Patient and Population Services (FHIR) |
| **Exact Requirement Summary** | FHIR R4 API: single-patient data, Bulk Data, app registration, SMART on FHIR auth (v2.0.0), granular scopes, token revocation within 1 hour, documentation, service base URL publication. Must support all USCDI data elements via US Core 6.1.0 profiles. |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | Inferno (g)(10) Test Kit full pass report; FHIR CapabilityStatement; US Core profile conformance; SMART authorization evidence; Bulk Data export samples; documentation URL; sub-resource scope support evidence. |
| **Test Method** | Test Procedure: Inferno ONC (g)(10) Test Kit v8.0.0 + visual inspection + documentation. |
| **Owner Function** | Product / Engineering; API Team |
| **Audit Questions** | Does Inferno pass completely? Is SMART v2.0.0 supported? Are all US Core 6.1.0 profiles conformant? Is token revocation within 1 hour? |
| **Pass Conditions** | Inferno full pass (all tests green); SMART 2.0 functional; US Core 6.1.0 profiles valid; 1-hour token revocation verified. |
| **Failure Risks** | Certification failure; loss of Base EHR status; API Condition violation; patient access failure. |
| **Frequency** | Initial certification + US Core 6.1.0/SMART 2.0 update; RWT annually; Insights reporting |
| **Effective Date** | Jun 30, 2020 (Cures); US Core 6.1.0/SMART 2.0 by Mar 1, 2026 |
| **Due Date/Trigger** | Mar 1, 2026 (US Core 6.1.0 + SMART 2.0 per EDN2025.06); Inferno v8.0.0 removes legacy IGs |
| **Notes** | Anchor criterion for patient/population access. API Condition (§170.404) applies. Subject to RWT. Insights Condition FHIR app metric. |

### CERT-G31 — Coverage Requirements Discovery (CRD)

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G31 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(31) |
| **Title** | Coverage Requirements Discovery (CRD) |
| **Exact Requirement Summary** | CRD Client using CDS Hooks; Da Vinci CRD IG. Check PA requirements from payers. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | FHIR-based CRD workflow demonstration; Da Vinci IG conformance evidence. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering; API Team |
| **Audit Questions** | Does the CRD client correctly invoke CDS Hooks and process payer responses? |
| **Pass Conditions** | CRD workflow demonstrated; IG conformance verified. |
| **Failure Risks** | Competitive gap in prior authorization automation. |
| **Frequency** | Initial certification |
| **Effective Date** | Oct 1, 2025 (HTI-4) |
| **Due Date/Trigger** | Upon certification; API Condition applies |
| **Notes** | New in HTI-4. API Condition (§170.404) applies. |

### CERT-G32 — Documentation Templates and Rules (DTR)

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G32 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(32) |
| **Title** | Documentation Templates and Rules (DTR) |
| **Exact Requirement Summary** | DTR EHR Client; Da Vinci DTR IG. Retrieve and complete payer documentation templates. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | DTR workflow demonstration; Da Vinci IG conformance evidence. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering; API Team |
| **Audit Questions** | Can the system retrieve and complete payer documentation templates via FHIR? |
| **Pass Conditions** | DTR workflow demonstrated; IG conformance verified. |
| **Failure Risks** | Competitive gap in prior authorization automation. |
| **Frequency** | Initial certification |
| **Effective Date** | Oct 1, 2025 (HTI-4) |
| **Due Date/Trigger** | Upon certification; API Condition applies |
| **Notes** | New in HTI-4. API Condition applies. |

### CERT-G33 — Prior Authorization Support (PAS)

| Field | Value |
|---|---|
| **Requirement ID** | CERT-G33 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(g)(33) |
| **Title** | Prior Authorization Support (PAS) |
| **Exact Requirement Summary** | PA submission using FHIR Subscriptions; Da Vinci PAS IG. Submit and track prior authorization requests. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | PA workflow demonstration; Da Vinci PAS IG conformance evidence. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering; API Team |
| **Audit Questions** | Can the system submit and track PA requests via FHIR? |
| **Pass Conditions** | PA workflow demonstrated; IG conformance verified. |
| **Failure Risks** | Competitive gap in prior authorization automation. |
| **Frequency** | Initial certification |
| **Effective Date** | Oct 1, 2025 (HTI-4) |
| **Due Date/Trigger** | Upon certification; API Condition applies |
| **Notes** | New in HTI-4. API Condition applies. |

## Certification Criteria — (h) Transport

### CERT-H1 — Direct Project

| Field | Value |
|---|---|
| **Requirement ID** | CERT-H1 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(h)(1) |
| **Title** | Direct Project |
| **Exact Requirement Summary** | Send and receive health information using Direct Project messaging (encrypted, signed S/MIME over SMTP). |
| **Applicability** | Base EHR |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | ETT test results; Direct message exchange logs. |
| **Test Method** | Test Procedure: Edge Testing Tool (ETT) on SITE. |
| **Owner Function** | Product / Engineering; Interoperability |
| **Audit Questions** | Can the system send and receive Direct messages? Does ETT testing pass? |
| **Pass Conditions** | ETT tests pass; Direct messaging functional. |
| **Failure Risks** | Certification failure; loss of Base EHR status. HTI-5 proposes removal. |
| **Frequency** | Initial certification; RWT annually |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Prior to initial certification |
| **Notes** | Base EHR (either (h)(1) or (h)(2)). Subject to RWT. |

### CERT-H2 — Direct Project, Edge Protocol, and XDR/XDM

| Field | Value |
|---|---|
| **Requirement ID** | CERT-H2 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(h)(2) |
| **Title** | Direct Project, Edge Protocol, and XDR/XDM |
| **Exact Requirement Summary** | Direct messaging plus Edge protocols (SMTP, XDR) and XDM processing. Delivery notification. Error handling for invalid test cases. |
| **Applicability** | Optional |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | ETT test results; XDR/XDM processing evidence; delivery notification evidence; error handling evidence. |
| **Test Method** | Test Procedure: ETT + SITE payloads. |
| **Owner Function** | Product / Engineering; Interoperability |
| **Audit Questions** | Does the system support Edge protocols and XDR/XDM? Is delivery notification implemented? |
| **Pass Conditions** | ETT passes; XDR/XDM demonstrated; delivery notifications functional. |
| **Failure Risks** | Transport interoperability limitation. HTI-5 proposes removal. |
| **Frequency** | Initial certification if elected; RWT annually if certified |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | If certified, ongoing compliance required |
| **Notes** | Alternative to (h)(1) for Base EHR. |

## Certification Criteria — (j) Modular API (HTI-4)

### CERT-J20 — Workflow Triggers for DSI — Clients

| Field | Value |
|---|---|
| **Requirement ID** | CERT-J20 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(j)(20) |
| **Title** | Workflow Triggers for DSI — Clients |
| **Exact Requirement Summary** | Client-side support for CDS Hooks workflow triggers for decision support interventions in PA workflows. |
| **Applicability** | Market-critical |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | CDS Hooks client demonstration; test procedure results. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Does the client correctly invoke CDS Hooks for PA workflow triggers? |
| **Pass Conditions** | Test procedure passes; CDS Hooks client functional. |
| **Failure Risks** | Gap in PA automation capability. |
| **Frequency** | Initial certification if elected |
| **Effective Date** | Oct 1, 2025 (HTI-4) |
| **Due Date/Trigger** | Upon certification |
| **Notes** | New in HTI-4. Co-certified with (g)(31). |

### CERT-J21 — Workflow Triggers for DSI — Services

| Field | Value |
|---|---|
| **Requirement ID** | CERT-J21 |
| **Requirement Type** | Certification Criterion |
| **Criterion/Authority** | §170.315(j)(21) |
| **Title** | Workflow Triggers for DSI — Services |
| **Exact Requirement Summary** | Service-side support for FHIR Subscriptions for DSI. |
| **Applicability** | Optional |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Evidence Expected** | FHIR Subscriptions service demonstration; test procedure results. |
| **Test Method** | Test Procedure. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Does the service correctly support FHIR Subscriptions for DSI? |
| **Pass Conditions** | Test procedure passes. |
| **Failure Risks** | Niche: PA service providers only. |
| **Frequency** | Initial certification if elected |
| **Effective Date** | Oct 1, 2025 (HTI-4) |
| **Due Date/Trigger** | Upon certification |
| **Notes** | New in HTI-4. |

## Conditions & Maintenance of Certification

### COC-IB-01 — Information Blocking — Prohibition

| Field | Value |
|---|---|
| **Requirement ID** | COC-IB-01 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.401 |
| **Title** | Information Blocking — Prohibition |
| **Exact Requirement Summary** | A certified health IT developer must not take any action that constitutes information blocking as defined in 45 CFR 171.103. Applies to ALL health IT and business practices — not just certified modules. 'Knows or should know' standard applies. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Policy documentation; training records; exception analysis per 45 CFR Part 171; attestation records; internal review documentation. |
| **Test Method** | Ongoing compliance monitoring; semiannual attestation via §170.406. |
| **Owner Function** | Legal / Compliance; Product |
| **Audit Questions** | Has the developer documented all practices that could interfere with EHI access/exchange/use? Is each mapped to an applicable exception? |
| **Pass Conditions** | All potentially blocking practices identified and documented; each mapped to valid exception with contemporaneous documentation. |
| **Failure Risks** | OIG CMPs up to $1M per violation; certification suspension/termination; developer ban; OIG referrals to DOJ/FTC/CMS. |
| **Frequency** | Ongoing (continuous); semiannual attestation |
| **Effective Date** | Apr 5, 2021 |
| **Due Date/Trigger** | Ongoing — enforcement active since Sep 1, 2023 for developers |
| **Notes** | ASTP issuing investigation notices as of Mar 2026. Eight exceptions: Preventing Harm, Privacy, Security, Infeasibility, Health IT Performance, Content and Manner, Fees, Licensing. |

### COC-IB-02 — Information Blocking — Fee Structure Review

| Field | Value |
|---|---|
| **Requirement ID** | COC-IB-02 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.401 / 45 CFR Part 171 |
| **Title** | Information Blocking — Fee Structure Review |
| **Exact Requirement Summary** | Review fee structures, contractual terms, and technical restrictions against the Fees, Licensing, and Content and Manner exceptions under 45 CFR Part 171. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-171](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-171) |
| **Evidence Expected** | Fee schedule documentation; contractual term audit results; exception analysis documentation. |
| **Test Method** | Internal legal/compliance review. |
| **Owner Function** | Legal / Compliance; Finance |
| **Audit Questions** | Have all API fees and contractual restrictions been reviewed against IB exceptions? Are fee structures documented per the Fees exception requirements? |
| **Pass Conditions** | Fee structures conform to permitted categories; no contractual terms constitute information blocking. |
| **Failure Risks** | OIG enforcement; $1M per violation; reputational damage. |
| **Frequency** | Annual review + event-driven (new contracts/fee changes) |
| **Effective Date** | Apr 5, 2021 |
| **Due Date/Trigger** | Ongoing |
| **Notes** | Review at each contract renewal or fee change. |

### COC-IB-03 — Information Blocking — Complaint Response Process

| Field | Value |
|---|---|
| **Requirement ID** | COC-IB-03 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.401 |
| **Title** | Information Blocking — Complaint Response Process |
| **Exact Requirement Summary** | Establish a process for responding to information blocking claims filed through the ASTP/ONC portal. |
| **Applicability** | Ongoing |
| **Source URL** | [https://healthit.gov/information-blocking/](https://healthit.gov/information-blocking/) |
| **Evidence Expected** | Written response process documentation; designated responsible party; response timeline tracking. |
| **Test Method** | Process documentation review. |
| **Owner Function** | Legal / Compliance |
| **Audit Questions** | Is there a documented process for responding to IB complaints? Who is the designated responder? |
| **Pass Conditions** | Process documented; responsible party designated; response timelines defined. |
| **Failure Risks** | Delayed or inadequate response to OIG/ASTP inquiries; escalated enforcement. |
| **Frequency** | Ongoing (process in place); triggered by complaints |
| **Effective Date** | Apr 5, 2021 |
| **Due Date/Trigger** | Ongoing |
| **Notes** |  |

### COC-ASSUR-01 — Assurances — No Information Blocking / Unrestricted Implementation

| Field | Value |
|---|---|
| **Requirement ID** | COC-ASSUR-01 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.402 |
| **Title** | Assurances — No Information Blocking / Unrestricted Implementation |
| **Exact Requirement Summary** | Provide assurances that the developer will not take actions constituting information blocking or inhibiting EHI exchange. Ensure full, unrestricted implementation of certified capabilities. Not interfere with user access to certified capabilities. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Contractual review documentation; customer deployment records; support ticket analysis for access restrictions. |
| **Test Method** | Ongoing compliance monitoring; semiannual attestation. |
| **Owner Function** | Legal / Compliance; Customer Success |
| **Audit Questions** | Are customers able to fully use all certified capabilities without contractual or technical restrictions? |
| **Pass Conditions** | No contractual/technical barriers to certified capabilities; customer access unrestricted. |
| **Failure Risks** | Direct Review; certification suspension; customer loss of CEHRT eligibility. |
| **Frequency** | Ongoing; semiannual attestation |
| **Effective Date** | Jun 30, 2020 (Cures Act Final Rule) |
| **Due Date/Trigger** | Ongoing |
| **Notes** |  |

### COC-ASSUR-02 — Assurances — 10-Year Record Retention

| Field | Value |
|---|---|
| **Requirement ID** | COC-ASSUR-02 |
| **Requirement Type** | Maintenance of Certification |
| **Criterion/Authority** | §170.402(b)(1) |
| **Title** | Assurances — 10-Year Record Retention |
| **Exact Requirement Summary** | Retain all records demonstrating initial and ongoing compliance with Conditions for 10 years from the date of certification. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Records retention policy; retention schedule; evidence of policy implementation. |
| **Test Method** | Policy documentation review. |
| **Owner Function** | Legal / Compliance; IT Operations |
| **Audit Questions** | Is there a 10-year retention policy tied to certification dates? Are records actually being retained? |
| **Pass Conditions** | Retention policy documented and implemented; records accessible for full 10-year period. |
| **Failure Risks** | Inability to demonstrate compliance during Direct Review; adverse inference. |
| **Frequency** | Ongoing (policy in place; records maintained continuously) |
| **Effective Date** | Jun 30, 2020 (Cures Act Final Rule) |
| **Due Date/Trigger** | Ongoing — 10 years from each certification date |
| **Notes** |  |

### COC-ASSUR-03 — Assurances — EHI Export Deployment

| Field | Value |
|---|---|
| **Requirement ID** | COC-ASSUR-03 |
| **Requirement Type** | Maintenance of Certification |
| **Criterion/Authority** | §170.402(b)(2) |
| **Title** | Assurances — EHI Export Deployment |
| **Exact Requirement Summary** | Certify to §170.315(b)(10) EHI Export and deploy to customers for any product that electronically stores EHI. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Certification evidence for (b)(10); customer deployment records; format documentation URL. |
| **Test Method** | Certification + deployment verification. |
| **Owner Function** | Product / Engineering; Customer Success |
| **Audit Questions** | Is (b)(10) certified and deployed to all customers? Is format documentation publicly posted? |
| **Pass Conditions** | (b)(10) certified; deployed to all customers; format documentation public. |
| **Failure Risks** | Assurances Condition violation; Direct Review; information blocking exposure. |
| **Frequency** | Ongoing — must be certified and deployed |
| **Effective Date** | Dec 31, 2023 (deadline for (b)(10) certification) |
| **Due Date/Trigger** | Ongoing |
| **Notes** |  |

### COC-ASSUR-04 — Assurances — Update Obligation

| Field | Value |
|---|---|
| **Requirement ID** | COC-ASSUR-04 |
| **Requirement Type** | Maintenance of Certification |
| **Criterion/Authority** | §170.402(b)(3)-(4) |
| **Title** | Assurances — Update Obligation |
| **Exact Requirement Summary** | Update certified Health IT Modules to all applicable revised certification criteria (most recently adopted capabilities and standards). Provide updated modules to customers in a timely manner. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Release pipeline documentation; customer update deployment records; HTI-1 compliance evidence. |
| **Test Method** | Release management review; customer notification records. |
| **Owner Function** | Product / Engineering; Customer Success |
| **Audit Questions** | Are all modules updated to current criteria? Have updates been deployed to customers? |
| **Pass Conditions** | All modules updated per current timelines; customers notified and updated. |
| **Failure Risks** | Certification non-conformity; Direct Review; customer CEHRT eligibility loss. |
| **Frequency** | Ongoing; triggered by new rule compliance dates |
| **Effective Date** | Jun 30, 2020 (Cures Act Final Rule) |
| **Due Date/Trigger** | HTI-1 updates by Mar 1, 2026 (extended); HTI-4 updates by Jan 1, 2028 |
| **Notes** | Track all compliance deadlines from new rulemaking. |

### COC-ASSUR-05 — Assurances — DSI Source Attribute Review

| Field | Value |
|---|---|
| **Requirement ID** | COC-ASSUR-05 |
| **Requirement Type** | Maintenance of Certification |
| **Criterion/Authority** | §170.402 / §170.315(b)(11) |
| **Title** | Assurances — DSI Source Attribute Review |
| **Exact Requirement Summary** | Starting January 1, 2025 and ongoing, review and update source attribute information, intervention risk management practices, and summary information for modules certified to (b)(11). |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Source attribute review documentation; update records; risk management review logs. |
| **Test Method** | Periodic documentation review. |
| **Owner Function** | Product / Engineering; Clinical Informatics |
| **Audit Questions** | Are source attributes reviewed and current? Are risk management practices updated? |
| **Pass Conditions** | Source attributes current; risk management documentation reflects current state. |
| **Failure Risks** | Assurances Condition violation; AI transparency non-compliance. |
| **Frequency** | Ongoing (at least annually) |
| **Effective Date** | Jan 1, 2025 |
| **Due Date/Trigger** | Ongoing |
| **Notes** | Applies only if certified to (b)(11). |

### COC-COMM-01 — Communications — No Gag Clauses

| Field | Value |
|---|---|
| **Requirement ID** | COC-COMM-01 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.403 |
| **Title** | Communications — No Gag Clauses |
| **Exact Requirement Summary** | Developer must not prohibit or restrict communications about usability, interoperability, security, user experiences, business practices, or manner of use of certified health IT. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Customer contract audit results; template contract review; evidence that no restrictive provisions exist. |
| **Test Method** | Contract audit; semiannual attestation. |
| **Owner Function** | Legal / Compliance |
| **Audit Questions** | Do any customer contracts contain gag clauses? Have all legacy provisions been identified? |
| **Pass Conditions** | No gag clauses in any current contracts; legacy provisions identified and scheduled for removal. |
| **Failure Risks** | Direct Review; certification suspension; reputational damage. |
| **Frequency** | Ongoing; annual customer notification until legacy provisions removed |
| **Effective Date** | Jun 30, 2020 (Cures Act Final Rule) |
| **Due Date/Trigger** | Ongoing |
| **Notes** |  |

### COC-COMM-02 — Communications — Annual Customer Notification

| Field | Value |
|---|---|
| **Requirement ID** | COC-COMM-02 |
| **Requirement Type** | Maintenance of Certification |
| **Criterion/Authority** | §170.403 |
| **Title** | Communications — Annual Customer Notification |
| **Exact Requirement Summary** | Starting CY 2021, annually notify all customers that contravening communication provisions will not be enforced, until the developer amends the contract to remove them. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Annual notification records (dates, recipients, content); delivery confirmation. |
| **Test Method** | Records review. |
| **Owner Function** | Legal / Compliance; Customer Success |
| **Audit Questions** | Has the annual notification been sent to all customers? Are delivery records maintained? |
| **Pass Conditions** | Notifications sent annually; delivery records on file. |
| **Failure Risks** | Maintenance of Certification violation; Direct Review risk. |
| **Frequency** | Annual (each CY) |
| **Effective Date** | CY 2021 |
| **Due Date/Trigger** | Annually until all legacy provisions removed from all contracts |
| **Notes** | Not needed if no legacy gag clauses exist. |

### COC-COMM-03 — Communications — Contract Amendment

| Field | Value |
|---|---|
| **Requirement ID** | COC-COMM-03 |
| **Requirement Type** | Maintenance of Certification |
| **Criterion/Authority** | §170.403 |
| **Title** | Communications — Contract Amendment |
| **Exact Requirement Summary** | Must not establish, renew, or enforce any contravening contract provision as of June 30, 2020. Must amend legacy provisions at next contract modification or renewal. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Contract amendment tracking log; evidence of legacy provision removal. |
| **Test Method** | Contract review. |
| **Owner Function** | Legal / Compliance |
| **Audit Questions** | Are all new/renewed contracts free of gag clauses? Is there a tracking log for legacy amendments? |
| **Pass Conditions** | All contracts compliant; legacy amendment log current. |
| **Failure Risks** | Maintenance of Certification violation; Direct Review. |
| **Frequency** | Ongoing; triggered by each contract renewal |
| **Effective Date** | Jun 30, 2020 |
| **Due Date/Trigger** | At each contract modification or renewal |
| **Notes** |  |

### COC-API-01 — API Condition — Publish Documentation & Terms

| Field | Value |
|---|---|
| **Requirement ID** | COC-API-01 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.404 |
| **Title** | API Condition — Publish Documentation & Terms |
| **Exact Requirement Summary** | Publish complete business and technical API documentation via publicly accessible hyperlink. Publish terms and conditions including any fees. |
| **Applicability** | Ongoing |
| **Source URL** | [https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/](https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/) |
| **Evidence Expected** | Published API documentation URL; terms and conditions URL; fee schedule. |
| **Test Method** | URL verification; documentation completeness review. |
| **Owner Function** | Product / Engineering; API Team |
| **Audit Questions** | Is API documentation publicly accessible? Are terms and fees published? |
| **Pass Conditions** | Documentation URL live and complete; terms published; fee schedule available. |
| **Failure Risks** | API Condition violation; Direct Review; information blocking exposure. |
| **Frequency** | Ongoing; update when APIs change |
| **Effective Date** | Jun 30, 2020 (Cures Act Final Rule) |
| **Due Date/Trigger** | Ongoing |
| **Notes** | Applies to modules certified to (g)(7)–(10), (g)(31)–(33). |

### COC-API-02 — API Condition — Service Base URL Publication

| Field | Value |
|---|---|
| **Requirement ID** | COC-API-02 |
| **Requirement Type** | Maintenance of Certification |
| **Criterion/Authority** | §170.404 |
| **Title** | API Condition — Service Base URL Publication |
| **Exact Requirement Summary** | Publish organization-level FHIR endpoint directory (service base URLs) in FHIR format. |
| **Applicability** | Ongoing |
| **Source URL** | [https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/](https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/) |
| **Evidence Expected** | Service Base URL endpoint list; FHIR format verification; public accessibility evidence. |
| **Test Method** | URL verification; FHIR format validation. |
| **Owner Function** | Product / Engineering; API Team |
| **Audit Questions** | Is the Service Base URL list published in FHIR format? Is it publicly accessible? |
| **Pass Conditions** | Service Base URL published; FHIR format validated; publicly accessible. |
| **Failure Risks** | API Condition violation; Direct Review. |
| **Frequency** | Ongoing; update as endpoints change |
| **Effective Date** | Dec 31, 2024 (per HTI-1) |
| **Due Date/Trigger** | Due Dec 31, 2024; ongoing maintenance |
| **Notes** |  |

### COC-API-03 — API Condition — App Registration

| Field | Value |
|---|---|
| **Requirement ID** | COC-API-03 |
| **Requirement Type** | Maintenance of Certification |
| **Criterion/Authority** | §170.404 |
| **Title** | API Condition — App Registration |
| **Exact Requirement Summary** | Register third-party applications for production use. Authenticity verification. Registration within timeframes. |
| **Applicability** | Ongoing |
| **Source URL** | [https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/](https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/) |
| **Evidence Expected** | App registration SLA tracking; registration process documentation; turnaround time records. |
| **Test Method** | Registration log review; SLA compliance check. |
| **Owner Function** | Product / Engineering; API Team |
| **Audit Questions** | Is the app registration process operational? What are actual turnaround times? Are any apps being denied? |
| **Pass Conditions** | Registration process documented; turnaround times within SLA; no unreasonable denials. |
| **Failure Risks** | API Condition violation; information blocking risk. |
| **Frequency** | Ongoing; triggered by app registration requests |
| **Effective Date** | Jun 30, 2020 (Cures Act Final Rule) |
| **Due Date/Trigger** | Ongoing |
| **Notes** | Registration within 5 business days per API Resource Guide. |

### COC-API-04 — API Condition — No Unreasonable Fees / Pro-Competitive

| Field | Value |
|---|---|
| **Requirement ID** | COC-API-04 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.404 |
| **Title** | API Condition — No Unreasonable Fees / Pro-Competitive |
| **Exact Requirement Summary** | Comply with permitted and prohibited fee requirements. Abide by openness and pro-competitive conditions. Retain fee records. |
| **Applicability** | Ongoing |
| **Source URL** | [https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/](https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/) |
| **Evidence Expected** | Fee schedule with justification per permitted categories; pro-competitive practices documentation; fee records. |
| **Test Method** | Fee structure review; competitive practices assessment. |
| **Owner Function** | Legal / Compliance; Finance; API Team |
| **Audit Questions** | Are all API fees within permitted categories? Are there any anti-competitive restrictions? |
| **Pass Conditions** | Fees within permitted categories; no anti-competitive practices. |
| **Failure Risks** | API Condition violation; information blocking; Direct Review. |
| **Frequency** | Ongoing; review upon fee changes |
| **Effective Date** | Jun 30, 2020 (Cures Act Final Rule) |
| **Due Date/Trigger** | Ongoing |
| **Notes** |  |

### COC-RWT-01 — Real World Testing — Annual Plan

| Field | Value |
|---|---|
| **Requirement ID** | COC-RWT-01 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.405 |
| **Title** | Real World Testing — Annual Plan |
| **Exact Requirement Summary** | Develop and submit annual RWT plan demonstrating real-world interoperability. Plan due to ONC-ACB; published on CHPL by December 15. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | RWT plan document; CHPL publication URL; ONC-ACB submission receipt. |
| **Test Method** | Plan document review; CHPL verification. |
| **Owner Function** | Product / Engineering; Quality Assurance |
| **Audit Questions** | Is the RWT plan submitted on time? Does it cover all required criteria? Is it on CHPL? |
| **Pass Conditions** | Plan submitted to ONC-ACB and published on CHPL by Dec 15; covers all required criteria with methods, settings, metrics. |
| **Failure Risks** | RWT Condition violation; Direct Review; certification risk. |
| **Frequency** | Annual (by December 15) |
| **Effective Date** | CY 2021 |
| **Due Date/Trigger** | December 15 annually (2026 plan NOT required per EDN2025.03) |
| **Notes** | EDN2025.03: No 2026 RWT plan required. Monitor for changes. |

### COC-RWT-02 — Real World Testing — Annual Results Report

| Field | Value |
|---|---|
| **Requirement ID** | COC-RWT-02 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.405 |
| **Title** | Real World Testing — Annual Results Report |
| **Exact Requirement Summary** | Submit RWT results report to ONC-ACB; publish on CHPL by March 15. Must report non-conformities to ONC-ACB within 30 days of discovery. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | RWT results report; CHPL publication URL; metric data; non-conformity log; ONC-ACB submission receipt. |
| **Test Method** | Results report review; CHPL verification; non-conformity log review. |
| **Owner Function** | Product / Engineering; Quality Assurance |
| **Audit Questions** | Are RWT results submitted and published on time? Are non-conformities reported within 30 days? |
| **Pass Conditions** | Results published on CHPL by Mar 15; metrics complete; non-conformities timely reported. |
| **Failure Risks** | RWT Condition violation; Direct Review; certification risk. |
| **Frequency** | Annual (by March 15) |
| **Effective Date** | CY 2021 |
| **Due Date/Trigger** | March 15 annually (2025 results for (g)(7)-(10) only per EDN2025.03) |
| **Notes** | EDN2025.03: Only (g)(7)-(10) results required for CY 2025. All other criteria exempt. |

### COC-RWT-03 — Real World Testing — Non-Conformity Reporting

| Field | Value |
|---|---|
| **Requirement ID** | COC-RWT-03 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.405 |
| **Title** | Real World Testing — Non-Conformity Reporting |
| **Exact Requirement Summary** | If developer discovers non-conformity during RWT, report to ONC-ACB within 30 days. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Non-conformity log; ONC-ACB notification records; corrective action documentation. |
| **Test Method** | Non-conformity log review; notification timeline verification. |
| **Owner Function** | Quality Assurance; Compliance |
| **Audit Questions** | Are non-conformities tracked? Were any reported within 30 days? |
| **Pass Conditions** | Non-conformity log maintained; all discoveries reported within 30 days. |
| **Failure Risks** | Escalated enforcement; certification risk. |
| **Frequency** | Event-driven (within 30 days of discovery) |
| **Effective Date** | CY 2021 |
| **Due Date/Trigger** | Within 30 days of each non-conformity discovery |
| **Notes** |  |

### COC-ATTEST-01 — Attestations — Semiannual Compliance Attestation

| Field | Value |
|---|---|
| **Requirement ID** | COC-ATTEST-01 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.406 |
| **Title** | Attestations — Semiannual Compliance Attestation |
| **Exact Requirement Summary** | Semiannual attestation of compliance with §170.401-405. Must indicate compliance, noncompliance, or inapplicability for each Condition. April window (Oct-Mar) by Apr 30; October window (Apr-Sep) by Oct 31. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Attestation submission records; compliance status per condition; noncompliance explanations; corrective action references. |
| **Test Method** | Attestation submission verification; compliance basis documentation review. |
| **Owner Function** | Legal / Compliance; Executive |
| **Audit Questions** | Were attestations submitted on time? Is there documented basis for each compliance assertion? Was noncompliance properly disclosed? |
| **Pass Conditions** | Attestations submitted within windows; compliance basis documented; noncompliance disclosed if applicable. |
| **Failure Risks** | Attestation Condition violation; public visibility of missing/late attestation on CHPL; Direct Review. |
| **Frequency** | Semiannual (April 30 and October 31) |
| **Effective Date** | Apr 1, 2022 |
| **Due Date/Trigger** | April 30 and October 31 each year |
| **Notes** | Noncompliance attestation does not auto-trigger Direct Review if corrective action underway. Authorized representative must legally bind the developer. |

### COC-INSIGHTS-01 — Insights Condition — FHIR App Usage Reporting

| Field | Value |
|---|---|
| **Requirement ID** | COC-INSIGHTS-01 |
| **Requirement Type** | Condition of Certification |
| **Criterion/Authority** | §170.407 |
| **Title** | Insights Condition — FHIR App Usage Reporting |
| **Exact Requirement Summary** | Report 'use of FHIR in apps through certified health IT' measure (§170.407(a)(3)(iv)). Only enforced Insights measure per EDN2025.02. All other measures deferred. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | FHIR API usage instrumentation data; reporting submission; publicly accessible hyperlink to Insights data. |
| **Test Method** | Data collection verification; reporting submission review. |
| **Owner Function** | Product / Engineering; API Team; Compliance |
| **Audit Questions** | Is FHIR API usage data being collected? Is the system ready to report by July 2027? |
| **Pass Conditions** | FHIR app usage data instrumented; data collection operational; ready for Phase 1 reporting. |
| **Failure Risks** | Insights Condition violation; Direct Review risk (post-July 2027). |
| **Frequency** | Annual (starting July 2027 for Phase 1) |
| **Effective Date** | HTI-1 (Jan 9, 2024) |
| **Due Date/Trigger** | Phase 1: July 2027. Eligibility: ≥50 hospitals OR ≥500 clinicians using (g)(10) products. |
| **Notes** | EDN2025.02: All other Insights measures suspended. Only FHIR app measure enforced. Phases 2 (Jul 2028) and 3 (Jul 2029) pending. |

### COC-SVAP-01 — SVAP — Standards Version Advancement

| Field | Value |
|---|---|
| **Requirement ID** | COC-SVAP-01 |
| **Requirement Type** | Maintenance of Certification |
| **Criterion/Authority** | §170.405(b)(8)-(9) |
| **Title** | SVAP — Standards Version Advancement |
| **Exact Requirement Summary** | Developers are permitted (not required) to update to newer SVAP-approved standard versions. If adopting SVAP versions, must be addressed in RWT plans and results. |
| **Applicability** | Optional |
| **Source URL** | [https://healthit.gov/certification-health-it/standards-version-advancement-process-svap/](https://healthit.gov/certification-health-it/standards-version-advancement-process-svap/) |
| **Evidence Expected** | SVAP adoption records; RWT plan/results entries for SVAP versions; ONC-ACB coordination records. |
| **Test Method** | SVAP adoption review; RWT alignment check. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Has the developer adopted any SVAP versions? Are they reflected in RWT plans? |
| **Pass Conditions** | SVAP versions, if adopted, documented and included in RWT. |
| **Failure Risks** | Non-conformity if SVAP version used but not properly documented/tested. |
| **Frequency** | Ongoing; triggered by SVAP adoption decisions |
| **Effective Date** | Jun 30, 2020 (Cures Act Final Rule) |
| **Due Date/Trigger** | Ongoing; RWT alignment required |
| **Notes** | Track SVAP-approved standards list on healthit.gov. |

### COC-DR-01 — Direct Review Readiness

| Field | Value |
|---|---|
| **Requirement ID** | COC-DR-01 |
| **Requirement Type** | Program Obligation |
| **Criterion/Authority** | §170.580 |
| **Title** | Direct Review Readiness |
| **Exact Requirement Summary** | Maintain readiness to respond to ONC Direct Review. If non-conformity suspected, ONC sends Notice of Non-Conformity; developer has 30 days to respond. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) |
| **Evidence Expected** | Incident response plan for Direct Review; designated responder; document repository for compliance evidence; 30-day response capability. |
| **Test Method** | Readiness assessment; tabletop exercise. |
| **Owner Function** | Legal / Compliance; Executive |
| **Audit Questions** | Is there a Direct Review response plan? Who is the designated responder? Can the team respond within 30 days? |
| **Pass Conditions** | Response plan documented; designated responder identified; compliance evidence readily accessible. |
| **Failure Risks** | Certification suspension/termination; developer ban; loss of customer CEHRT eligibility; CMS coordination for affected users. |
| **Frequency** | Ongoing (readiness); event-driven (30-day response) |
| **Effective Date** | Dec 19, 2016 (EOA Rule) |
| **Due Date/Trigger** | 30 days from receipt of Notice of Non-Conformity |
| **Notes** | Triggers: public health/safety risk, ONC-ACB practical challenges, CoC/MoC non-compliance. |

### COC-CHPL-01 — CHPL Listing Maintenance

| Field | Value |
|---|---|
| **Requirement ID** | COC-CHPL-01 |
| **Requirement Type** | Program Obligation |
| **Criterion/Authority** | §170.523 / CHPL |
| **Title** | CHPL Listing Maintenance |
| **Exact Requirement Summary** | Monitor and maintain accuracy of CHPL listing(s). Coordinate with ONC-ACB for timely submission of RWT plans/results, attestations, and other required publications. |
| **Applicability** | Ongoing |
| **Source URL** | [https://chpl.healthit.gov/](https://chpl.healthit.gov/) |
| **Evidence Expected** | CHPL listing screenshots/records; listing accuracy verification; coordination records with ONC-ACB. |
| **Test Method** | CHPL listing review; accuracy verification. |
| **Owner Function** | Compliance; Product Management |
| **Audit Questions** | Is the CHPL listing current and accurate? Does it reflect current certification status, edition, and criteria? |
| **Pass Conditions** | CHPL listing accurate; all required publications current (RWT, attestations, surveillance). |
| **Failure Risks** | Customer confusion; CMS EHR Certification ID issues; reputational damage. |
| **Frequency** | Ongoing; triggered by certification changes |
| **Effective Date** | 2015 (2015 Edition Final Rule) |
| **Due Date/Trigger** | Ongoing |
| **Notes** | CMS EHR Certification ID generated from CHPL — accuracy critical for provider PI participation. |

## CMS / Provider-Use Dependencies

### CMS-CEHRT-01 — CEHRT Definition Maintenance

| Field | Value |
|---|---|
| **Requirement ID** | CMS-CEHRT-01 |
| **Requirement Type** | Indirect Obligation |
| **Criterion/Authority** | 42 CFR §414.1305 |
| **Title** | CEHRT Definition Maintenance |
| **Exact Requirement Summary** | Product must meet CEHRT definition: Base EHR + (a)(12), (e)(3), (g)(1)/(g)(2), (c)(2)/(c)(3), plus criteria for applicable PI measures. CEHRT functionality must be in place by first day of EHR reporting period; certified by last day. |
| **Applicability** | CEHRT |
| **Source URL** | [https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs/certified-ehr-technology](https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs/certified-ehr-technology) |
| **Evidence Expected** | CEHRT criteria coverage matrix; CMS EHR Certification ID; customer reporting period alignment. |
| **Test Method** | CEHRT coverage review; CMS Certification ID verification. |
| **Owner Function** | Product Management; Compliance |
| **Audit Questions** | Does the product meet the full CEHRT definition? Can customers generate a valid CMS EHR Certification ID? |
| **Pass Conditions** | All CEHRT criteria certified; CMS EHR Certification ID generatable via CHPL. |
| **Failure Risks** | Customers lose PI eligibility; payment penalties (up to -9% MIPS, hospital APU reduction). |
| **Frequency** | Ongoing; triggered by certification changes or lapses |
| **Effective Date** | 2015 (Cures Act) |
| **Due Date/Trigger** | Ongoing — any certification lapse immediately impacts customers |
| **Notes** | Any lapse in certification disqualifies customers from CMS programs. |

### CMS-PI-01 — PI Measure Support — All Required Measures

| Field | Value |
|---|---|
| **Requirement ID** | CMS-PI-01 |
| **Requirement Type** | Indirect Obligation |
| **Criterion/Authority** | MIPS PI / Medicare PI |
| **Title** | PI Measure Support — All Required Measures |
| **Exact Requirement Summary** | Product must support all required MIPS PI measures: e-Prescribing, HIE (Send/Receive/Reconcile or Bi-Directional or TEFCA), Patient Exchange, eCR, Immunization Registry, Security Risk Analysis attestation, SAFER Guide attestation. |
| **Applicability** | CEHRT |
| **Source URL** | [https://qpp.cms.gov/mips/promoting-interoperability](https://qpp.cms.gov/mips/promoting-interoperability) |
| **Evidence Expected** | PI measure coverage matrix; measure calculation evidence; dashboard functionality demonstration. |
| **Test Method** | PI measure functional testing; customer attestation support review. |
| **Owner Function** | Product / Engineering; Customer Success |
| **Audit Questions** | Can the product support all required PI measures? Are measure calculations accurate? |
| **Pass Conditions** | All PI measures supported; calculations verified; attestation workflows available. |
| **Failure Risks** | Customer payment penalties; competitive disqualification. |
| **Frequency** | Ongoing; annual PI program updates |
| **Effective Date** | 2015 (MACRA) |
| **Due Date/Trigger** | Ongoing; align with annual CMS PI program changes |
| **Notes** | PI worth 25% of MIPS Final Score for 2025. |

### CMS-SRA-01 — HIPAA Security Risk Analysis — Vendor Component

| Field | Value |
|---|---|
| **Requirement ID** | CMS-SRA-01 |
| **Requirement Type** | Indirect Obligation |
| **Criterion/Authority** | 45 CFR §164.308(a)(1)(ii)(A) |
| **Title** | HIPAA Security Risk Analysis — Vendor Component |
| **Exact Requirement Summary** | As a cloud EHR vendor/business associate, conduct own SRA. Support customer SRA efforts by providing security control documentation (SOC 2, etc.). |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html](https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html) |
| **Evidence Expected** | SRA documentation; risk register; remediation roadmap; SOC 2 Type II report; customer-facing security documentation. |
| **Test Method** | SRA document review; risk register review; SOC 2 report verification. |
| **Owner Function** | Security / IT Operations; Compliance |
| **Audit Questions** | Is the vendor SRA current? Is the risk register maintained? Is SOC 2 current? Can customer SRA documentation be provided? |
| **Pass Conditions** | SRA completed and current; risk register with owners and timelines; SOC 2 Type II report current; customer documentation available. |
| **Failure Risks** | HIPAA violation; OCR enforcement; customer PI attestation failure (SRA is required Yes/No measure). |
| **Frequency** | At least annual; continuous (update for environmental changes) |
| **Effective Date** | HIPAA Security Rule (2003) |
| **Due Date/Trigger** | Ongoing; retain documentation for 6 years per HIPAA |
| **Notes** | CMS PI requires provider SRA attestation — providers rely on vendor security documentation. |

### CMS-SAFER-01 — SAFER Guides — Product Support

| Field | Value |
|---|---|
| **Requirement ID** | CMS-SAFER-01 |
| **Requirement Type** | Indirect Obligation |
| **Criterion/Authority** | CMS PI Program / MIPS PI |
| **Title** | SAFER Guides — Product Support |
| **Exact Requirement Summary** | Support customer completion of SAFER Guide self-assessments. Product should enable practices recommended in all eight 2025 SAFER Guides. Hospitals must attest to reviewing all guides; MIPS clinicians attest to High Priority Practices guide. |
| **Applicability** | Market-critical |
| **Source URL** | [https://healthit.gov/clinical-quality-and-safety/safer-guides/](https://healthit.gov/clinical-quality-and-safety/safer-guides/) |
| **Evidence Expected** | SAFER Guide coverage analysis; customer-facing documentation; product feature mapping to SAFER recommendations. |
| **Test Method** | SAFER Guide alignment review. |
| **Owner Function** | Product / Engineering; Customer Success; Clinical Informatics |
| **Audit Questions** | Has the product been reviewed against all eight 2025 SAFER Guides? Can customers complete self-assessments using the product? |
| **Pass Conditions** | Product features mapped to SAFER recommendations; customer documentation available; AI safety recommendations addressed if applicable. |
| **Failure Risks** | Customer attestation difficulty; market differentiation loss. |
| **Frequency** | Annual (align with SAFER Guide updates) |
| **Effective Date** | 2022 (CMS PI requirement) |
| **Due Date/Trigger** | 2025 SAFER Guides released for 2026 MIPS attestation cycle |
| **Notes** | 2025 revision includes AI-related guidance in Organizational Responsibilities guide. |

## Non-ONC Regulatory & Market Obligations

### HIPAA-PRIV-01 — HIPAA Privacy Rule — Business Associate Obligations

| Field | Value |
|---|---|
| **Requirement ID** | HIPAA-PRIV-01 |
| **Requirement Type** | Regulatory Obligation |
| **Criterion/Authority** | 45 CFR Parts 160, 164 Subparts A, E |
| **Title** | HIPAA Privacy Rule — Business Associate Obligations |
| **Exact Requirement Summary** | As a business associate, enter into BAAs with covered entity customers. Comply with HIPAA Privacy Rule requirements applicable to BAs. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.hhs.gov/hipaa/for-professionals/privacy/index.html](https://www.hhs.gov/hipaa/for-professionals/privacy/index.html) |
| **Evidence Expected** | BAA template; executed BAAs; Privacy Rule compliance documentation. |
| **Test Method** | BAA review; privacy compliance assessment. |
| **Owner Function** | Legal / Compliance |
| **Audit Questions** | Are BAAs in place with all covered entity customers? Does the BAA template meet current requirements? |
| **Pass Conditions** | BAAs executed with all customers; template current; privacy practices documented. |
| **Failure Risks** | HIPAA violation; OCR enforcement; customer relationship risk. |
| **Frequency** | Ongoing; triggered by new customer onboarding |
| **Effective Date** | HIPAA (1996/2013) |
| **Due Date/Trigger** | Ongoing |
| **Notes** | EHI definition (§170.102) aligns with HIPAA designated record set. |

### HIPAA-BREACH-01 — Breach Notification — Business Associate Obligation

| Field | Value |
|---|---|
| **Requirement ID** | HIPAA-BREACH-01 |
| **Requirement Type** | Regulatory Obligation |
| **Criterion/Authority** | HITECH Act; 45 CFR 164 Subpart D |
| **Title** | Breach Notification — Business Associate Obligation |
| **Exact Requirement Summary** | Notify covered entity customers of breaches of unsecured PHI without unreasonable delay and no later than 60 days after discovery. |
| **Applicability** | Ongoing |
| **Source URL** | [https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html) |
| **Evidence Expected** | Breach response plan; notification timeline documentation; breach log. |
| **Test Method** | Breach response plan review; tabletop exercise. |
| **Owner Function** | Security / IT Operations; Legal / Compliance |
| **Audit Questions** | Is there a breach notification plan? Can the team notify within 60 days? Is the breach log current? |
| **Pass Conditions** | Breach plan documented; notification timeline demonstrated; log maintained. |
| **Failure Risks** | HIPAA violation; OCR enforcement; state AG enforcement; reputational damage. |
| **Frequency** | Event-driven (within 60 days of discovery); plan reviewed annually |
| **Effective Date** | HITECH Act (2009) |
| **Due Date/Trigger** | Within 60 days of breach discovery |
| **Notes** | Interacts with SRA — current SRA helps demonstrate reasonable security measures. |

### MARKET-SOC2-01 — SOC 2 Type II Certification

| Field | Value |
|---|---|
| **Requirement ID** | MARKET-SOC2-01 |
| **Requirement Type** | Market Expectation |
| **Criterion/Authority** | N/A (voluntary) |
| **Title** | SOC 2 Type II Certification |
| **Exact Requirement Summary** | Obtain and maintain SOC 2 Type II report covering Trust Services Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy). |
| **Applicability** | Market-critical |
| **Source URL** | N/A |
| **Evidence Expected** | SOC 2 Type II report; remediation evidence for any exceptions; auditor letter. |
| **Test Method** | Annual SOC 2 audit; exception remediation tracking. |
| **Owner Function** | Security / IT Operations; Compliance |
| **Audit Questions** | Is the SOC 2 Type II report current? Are there any exceptions? Have exceptions been remediated? |
| **Pass Conditions** | SOC 2 Type II report current (within 12 months); no material exceptions or all remediated. |
| **Failure Risks** | Customer trust loss; competitive disadvantage; unable to provide SRA support documentation. |
| **Frequency** | Annual |
| **Effective Date** | N/A (market expectation) |
| **Due Date/Trigger** | Annually |
| **Notes** | Supports customer HIPAA SRA attestation requirements. |

## Active Enforcement Discretion Notices

### EDN-2025-01 — USCDI v3 SOGI Data Elements

| Field | Value |
|---|---|
| **Requirement ID** | EDN-2025-01 |
| **Requirement Type** | Enforcement Discretion |
| **Criterion/Authority** | EDN2025.01 |
| **Title** | USCDI v3 SOGI Data Elements |
| **Exact Requirement Summary** | Current ONC discretion and companion-guide posture allows certified products referencing USCDI cross-links to limit required demonstration for the sex data element to Male/Female SNOMED CT codes and states that specified sex/gender-related elements are not currently required for certification purposes. |
| **Applicability** | Base EHR / CEHRT |
| **Source URL** | [https://healthit.gov/certification-health-it/enforcement-discretion-notices/](https://healthit.gov/certification-health-it/enforcement-discretion-notices/) |
| **Evidence Expected** | Documentation of which related elements are supported, omitted, or deferred and the official ONC source relied on for that posture. |
| **Test Method** | Configuration review. |
| **Owner Function** | Product / Engineering; Compliance |
| **Audit Questions** | Which SOGI elements are implemented? Is the discretion expiration tracked? |
| **Pass Conditions** | SOGI posture documented; expiration monitoring in place. |
| **Failure Risks** | If discretion expires without regulatory action, omission becomes non-conformity. |
| **Frequency** | Monitor until expiration or regulatory action |
| **Effective Date** | Mar 21, 2025 |
| **Due Date/Trigger** | Monitor continuously against the latest active discretion notice and companion-guide language |
| **Notes** | Affects all criteria referencing §170.213 (USCDI). |

### EDN-2025-02 — Insights Condition — Measure Deferral

| Field | Value |
|---|---|
| **Requirement ID** | EDN-2025-02 |
| **Requirement Type** | Enforcement Discretion |
| **Criterion/Authority** | EDN2025.02 |
| **Title** | Insights Condition — Measure Deferral |
| **Exact Requirement Summary** | Only 'use of FHIR in apps' measure required; all other Insights measures suspended until deregulatory revision or removal. |
| **Applicability** | Ongoing |
| **Source URL** | [https://healthit.gov/certification-health-it/enforcement-discretion-notices/](https://healthit.gov/certification-health-it/enforcement-discretion-notices/) |
| **Evidence Expected** | Documentation of which Insights measures are being tracked; FHIR app usage data collection status. |
| **Test Method** | Data collection readiness review. |
| **Owner Function** | Product / Engineering; Compliance |
| **Audit Questions** | Is FHIR app usage data being collected? Are other measures being tracked even under discretion? |
| **Pass Conditions** | FHIR app data collection operational; awareness of deferred measures maintained. |
| **Failure Risks** | If discretion changes, may need rapid compliance on additional measures. |
| **Frequency** | Monitor until deregulatory action |
| **Effective Date** | Apr 29, 2025 |
| **Due Date/Trigger** | July 2027 (Phase 1 FHIR app measure); other measures TBD |
| **Notes** | Temporary; underlying regulatory obligations remain. |

### EDN-2025-03 — Real World Testing — Plan/Results Relief

| Field | Value |
|---|---|
| **Requirement ID** | EDN-2025-03 |
| **Requirement Type** | Enforcement Discretion |
| **Criterion/Authority** | EDN2025.03 |
| **Title** | Real World Testing — Plan/Results Relief |
| **Exact Requirement Summary** | No 2026 RWT plan required. 2025 results only for (g)(7)-(10) certified modules as of Aug 31, 2024. |
| **Applicability** | Ongoing |
| **Source URL** | [https://healthit.gov/certification-health-it/enforcement-discretion-notices/](https://healthit.gov/certification-health-it/enforcement-discretion-notices/) |
| **Evidence Expected** | RWT process documentation (maintained even under discretion); (g)(7)-(10) results for CY 2025 if applicable. |
| **Test Method** | RWT readiness review; (g)(7)-(10) results verification. |
| **Owner Function** | Quality Assurance; Product / Engineering |
| **Audit Questions** | Are (g)(7)-(10) RWT results ready for March 2026? Are internal RWT processes maintained? |
| **Pass Conditions** | (g)(7)-(10) results submitted if applicable; internal processes maintained. |
| **Failure Risks** | Non-compliance if discretion expires and processes not in place. |
| **Frequency** | Through Dec 31, 2026 |
| **Effective Date** | Jun 30, 2025 |
| **Due Date/Trigger** | Effective through Dec 31, 2026 |
| **Notes** | HTI-5 may remove RWT permanently. Maintain readiness regardless. |

### EDN-2025-04 — Electronic Case Reporting (f)(5) Standards

| Field | Value |
|---|---|
| **Requirement ID** | EDN-2025-04 |
| **Requirement Type** | Enforcement Discretion |
| **Criterion/Authority** | EDN2025.04 |
| **Title** | Electronic Case Reporting (f)(5) Standards |
| **Exact Requirement Summary** | Relaxed eCR standards requirements; functional vs. standards-based conformance accepted. |
| **Applicability** | CEHRT |
| **Source URL** | [https://healthit.gov/certification-health-it/enforcement-discretion-notices/](https://healthit.gov/certification-health-it/enforcement-discretion-notices/) |
| **Evidence Expected** | eCR implementation status; functional conformance evidence. |
| **Test Method** | eCR functional testing. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Is eCR functional even if not fully standards-conformant? Is the Dec 31, 2026 expiration tracked? |
| **Pass Conditions** | eCR functional; standards work in progress; expiration monitored. |
| **Failure Risks** | Non-conformity if discretion expires without full standards compliance. |
| **Frequency** | Through Dec 31, 2026 |
| **Effective Date** | Jul 31, 2025 |
| **Due Date/Trigger** | Effective through Dec 31, 2026 |
| **Notes** |  |

### EDN-2025-06 — HTI-1 Criteria Update Deadline Extension

| Field | Value |
|---|---|
| **Requirement ID** | EDN-2025-06 |
| **Requirement Type** | Enforcement Discretion |
| **Criterion/Authority** | EDN2025.06 |
| **Title** | HTI-1 Criteria Update Deadline Extension |
| **Exact Requirement Summary** | Extended HTI-1 update/provision deadlines from Jan 1, 2026 to Feb 28, 2026 for revised criteria: (a)(5), (a)(12), (a)(15), (b)(1), (b)(2), (b)(9), (b)(11), (c)(4), (e)(1), (f)(1), (f)(3), (f)(4), (g)(6), (g)(9), (g)(10). |
| **Applicability** | Base EHR / CEHRT |
| **Source URL** | [https://healthit.gov/certification-health-it/enforcement-discretion-notices/](https://healthit.gov/certification-health-it/enforcement-discretion-notices/) |
| **Evidence Expected** | Update completion records for each affected criterion; deployment to customers evidence. |
| **Test Method** | Update completion verification per criterion. |
| **Owner Function** | Product / Engineering |
| **Audit Questions** | Have all HTI-1 required updates been completed and deployed by Mar 1, 2026? |
| **Pass Conditions** | All affected criteria updated; updates deployed to customers. |
| **Failure Risks** | Certification non-conformity; Assurances Condition violation. |
| **Frequency** | One-time (deadline passed Feb 28, 2026) |
| **Effective Date** | Nov 24, 2025 |
| **Due Date/Trigger** | Feb 28, 2026 (now past) |
| **Notes** | Deadline has passed. Verify all updates complete. |

---

## Summary Statistics

| Category | Count |
|---|---|
| Certification Criterion | 59 |
| Condition of Certification | 12 |
| Enforcement Discretion | 5 |
| Indirect Obligation | 4 |
| Maintenance of Certification | 9 |
| Market Expectation | 1 |
| Program Obligation | 2 |
| Regulatory Obligation | 2 |
| **Total** | **94** |


| Applicability | Count |
|---|---|
| Base EHR | 12 |
| Base EHR / CEHRT | 2 |
| CEHRT | 15 |
| Market-critical | 28 |
| Ongoing | 27 |
| Optional | 10 |

---

## Key Sources

| Source | URL |
|---|---|
| 45 CFR Part 170 | [law.cornell.edu](https://www.law.cornell.edu/cfr/text/45/part-170) |
| §170.315 Certification Criteria | [ecfr.gov](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| Conditions & Maintenance CCGs | [healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/) |
| ONC Test Method | [healthit.gov](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/) |
| Enforcement Discretion Notices | [healthit.gov](https://healthit.gov/certification-health-it/enforcement-discretion-notices/) |
| CMS CEHRT Definition | [cms.gov](https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs/certified-ehr-technology) |
| MIPS Promoting Interoperability | [qpp.cms.gov](https://qpp.cms.gov/mips/promoting-interoperability) |
| CHPL | [chpl.healthit.gov](https://chpl.healthit.gov/) |
| Inferno (g)(10) Test Kit | [inferno.healthit.gov](https://inferno.healthit.gov) |
| Cypress eCQM Tool | [cypress.healthit.gov](https://cypress.healthit.gov/cypress/) |
| SITE Testing Hub | [site.healthit.gov](https://site.healthit.gov) |
| API Resource Guide | [onc-healthit.github.io](https://onc-healthit.github.io/api-resource-guide/404-conditions-maintenance/) |
| HIPAA Security Rule Guidance | [hhs.gov](https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html) |
| SAFER Guides | [healthit.gov](https://healthit.gov/clinical-quality-and-safety/safer-guides/) |

---

*This matrix reflects the regulatory state as of March 15, 2026. It is based on primary federal sources and source documents prepared for MVS Cloud / HealthOS. It is not legal advice.*
