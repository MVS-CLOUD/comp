# ONC Health IT Certification: Testing Evidence & Developer Demonstration Guide

**Prepared for:** MVS Cloud / HealthOS  
**Date:** 2026-03-15  
**Scope:** Full ambulatory EHR certification under the ONC Health IT Certification Program  
**Regulatory basis:** 45 CFR Part 170, as updated by the [HTI-1 Final Rule (89 FR 1192)](https://healthit.gov/regulations/hti-rules/hti-1-final-rule/)

---

## Table of Contents

1. [How the ONC Certification Testing Framework Works](#1-how-the-onc-certification-testing-framework-works)
2. [§ 170.315(a) — Clinical Functionality Criteria](#2--170315a--clinical-functionality-criteria)
3. [§ 170.315(b) — Care Coordination Criteria](#3--170315b--care-coordination-criteria)
4. [§ 170.315(c) — Clinical Quality Measures (CQMs)](#4--170315c--clinical-quality-measures-cqms)
5. [§ 170.315(d) — Privacy & Security Criteria](#5--170315d--privacy--security-criteria)
6. [§ 170.315(e) — Patient Engagement Criteria](#6--170315e--patient-engagement-criteria)
7. [§ 170.315(f) — Public Health Criteria](#7--170315f--public-health-criteria)
8. [§ 170.315(g) — Design, Performance & API Criteria](#8--170315g--design-performance--api-criteria)
9. [§ 170.315(h) — Transport Criteria](#9--170315h--transport-criteria)
10. [§ 170.315(j) — New Modular API Criteria (HTI-2)](#10--170315j--new-modular-api-criteria)
11. [Conditions & Maintenance of Certification](#11-conditions--maintenance-of-certification)
12. [Real World Testing](#12-real-world-testing)
13. [ONC-Approved Test Tools & Validators](#13-onc-approved-test-tools--validators)
14. [Internal Audit Tool Recommendations](#14-internal-audit-tool-recommendations)
15. [Key Timelines & Enforcement Discretion](#15-key-timelines--enforcement-discretion)

---

## 1. How the ONC Certification Testing Framework Works

### Overview

The ONC Health IT Certification Program evaluates Health IT Modules against certification criteria defined in [45 CFR § 170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315). Developers demonstrate conformance through a combination of conformance methods approved by the National Coordinator ([HealthIT.gov — Conformance Methods](https://healthit.gov/certification-health-it/certification-process/conformance-methods/)).

### Conformance Methods

Each criterion uses one or more of the following demonstration methods, as documented in the [ONC Certification Program Test Method](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/):

| Method | Description |
|---|---|
| **Documentation** | Developer provides documents (design specs, attestation letters, third-party reports) that demonstrate compliance with the criterion. |
| **Visual Inspection** | Live demonstration of functionality to an ONC-ATL tester; the tester observes the system performing the required capability. |
| **Test Tool(s)** | ONC-approved automated test tools validate output artifacts (e.g., C-CDA documents, FHIR responses, HL7 v2 messages). |
| **Test Data** | ONC-supplied or tool-required data sets must be used as input during testing. |
| **SVAP** | The Standards Version Advancement Process allows voluntary upgrade to newer approved standards ([SVAP page](https://healthit.gov/certification-health-it/standards-version-advancement-process-svap/)). |

### Key Actors

- **ONC-Authorized Testing Laboratories (ONC-ATLs):** Conduct pre-certification testing using approved test methods. Accredited via NVLAP ([HealthIT.gov — Certification Process](https://healthit.gov/certification-health-it/)).
- **ONC-Authorized Certification Bodies (ONC-ACBs):** Issue certifications, manage surveillance, review attestations. Examples: Drummond Group, SLI Compliance, ICSA Labs.
- **CHPL (Certified Health IT Product List):** Public registry of all certified modules, their criteria, surveillance results, and Real World Testing data ([CHPL](https://chpl.healthit.gov)).

### Certification Companion Guides (CCGs)

ONC publishes a CCG for each criterion that provides development guidance, regulatory clarifications, and interpretive notes. The CCG is not a substitute for regulation but is binding in the sense that "Health IT certified under the Certification Program must conform to the **full scope** of the product's required capabilities, including regulatory/conformance expectation clarifications and interpretations set forth in the applicable CCGs" ([ONC Test Method page](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)).

### Attestation-Only Criteria

Several criteria do not require ATL testing and instead require the developer to attest to the ONC-ACB that requirements are met. These include (d)(1) Authentication, (d)(5) Automatic access time-out, (d)(6) Emergency access, (d)(7) End-user device encryption, (d)(12) Encrypt authentication credentials, (d)(13) Multi-factor authentication, and (g)(4) Quality management system, among others ([ONC Test Method page](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)).

### Gap Certification and Inherited Certified Status (ICS)

- **Gap Certification:** For existing certified products needing updates for new regulatory requirements, developers may attest to updates rather than re-testing where ONC allows it ([Conformance Methods](https://healthit.gov/certification-health-it/certification-process/conformance-methods/)).
- **ICS:** When developers increment product versions for non-certification reasons, they may maintain certification for newer versions without full re-testing ([Conformance Methods](https://healthit.gov/certification-health-it/certification-process/conformance-methods/)).

---

## 2. § 170.315(a) — Clinical Functionality Criteria

These criteria cover core clinical EHR capabilities. For ambulatory EHR certification to the Base EHR definition, at least one CPOE criterion is required ([45 CFR § 170.315](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315)).

### (a)(1) CPOE — Medications

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(a)(1)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Enable a user to record, change, and access medication orders electronically. |
| **Standards required** | No specific standard required for this criterion ([CCG — CPOE Medications](https://healthit.gov/test-method/computerized-provider-order-entry-cpoe-medications/)). |
| **Test method** | Conformance Method (documentation + visual inspection). No ONC test tool required. |
| **Evidence artifacts** | Live demonstration of order entry workflow; screenshots/recordings of medication ordering; documentation of order lifecycle (create, modify, access). |
| **Internal audit capture** | Record test scenarios executed, tester observations, screenshots showing order creation/modification, pass/fail per test step. |

### (a)(2) CPOE — Laboratory

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(a)(2)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Enable a user to record, change, and access laboratory orders electronically. |
| **Standards required** | No specific standard required. |
| **Test method** | Conformance Method (documentation + visual inspection). |
| **Evidence artifacts** | Same pattern as (a)(1) but for laboratory orders. |

### (a)(3) CPOE — Diagnostic Imaging

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(a)(3)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Enable a user to record, change, and access diagnostic imaging orders electronically. |
| **Standards required** | No specific standard required. |
| **Test method** | Conformance Method (documentation + visual inspection). |

### (a)(4) Drug-Drug, Drug-Allergy Interaction Checks for CPOE

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(a)(4)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Automatically and electronically check drug-drug and drug-allergy interactions when CPOE is used; enable severity level adjustment restricted to identified users or system admin. |
| **Standards required** | No specific standard required (drug interaction database is developer's choice). |
| **Test method** | Conformance Method (visual inspection + documentation). |
| **Evidence artifacts** | Demonstration of interaction alerts triggering during CPOE; documentation of severity adjustment controls; evidence of user-restriction for severity changes. |
| **Internal audit capture** | Test cases for known drug interactions, alert display evidence, severity adjustment audit trail. |

### (a)(5) Patient Demographics and Observations

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(a)(5)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Record patient demographics per USCDI including race (CDC Race & Ethnicity Code Set), ethnicity, preferred language, sex, date of birth, sexual orientation (see EO 14168 note below), gender identity (see note), and as of Jan 1, 2026: Sex Parameter for Clinical Use and Name to Use ([§ 170.315(a)(5)(i)(F)-(G)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315)). |
| **Standards referenced** | § 170.207(f)(1)-(3) race/ethnicity standards; § 170.207(n)(3) for Sex Parameter for Clinical Use; SNOMED CT. |
| **Test method** | Conformance Method (visual inspection + documentation). |
| **EO 14168 Note** | Consistent with Executive Order 14168, Health IT Modules are **only required** to support Male and Female (SNOMED CT 248153007, 248152002) for the sex data element. Sexual orientation, gender identity, sex parameter for clinical use, name to use, and pronouns are **no longer required** for certification purposes ([g(10) CCG](https://healthit.gov/test-method/standardized-api-patient-and-population-services/)). |
| **Internal audit capture** | Screenshots of demographic entry forms; evidence of coded value sets; compliance with EO 14168 adjustments. |

### (a)(12) Family Health History

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(a)(12)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Record, change, and access family health history per HL7 Pedigree standard. |
| **Test method** | Conformance Method. |

### (a)(14) Implantable Device List

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(a)(14)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Record UDIs, parse UDI elements per FDA GUDID, access device descriptions from the FDA AccessGUDID database. |
| **Standards referenced** | FDA UDI standard, AccessGUDID. |
| **Test method** | Conformance Method (visual inspection + documentation). |

### (a)(15) Social, Psychological, and Behavioral Data

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(a)(15)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Record social, psychological, and behavioral data per USCDI data elements (e.g., SDOH assessments). |
| **Test method** | Conformance Method. |

---

## 3. § 170.315(b) — Care Coordination Criteria

### (b)(1) Transitions of Care

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(b)(1)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Create, send, receive, and display transition of care/referral summaries as C-CDA documents. Includes: Continuity of Care Document (CCD), Referral Note templates. Must include USCDI data elements (problems, medications, allergies, demographics, labs, vitals, procedures, implantable devices, goals, health concerns, UDIs). |
| **Standards referenced** | HL7 C-CDA R2.1 ([§ 170.205(a)(4)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-B)); C-CDA R2.1 Companion Guide Release 4.1 (as of Jan 1, 2026); USCDI v3 ([§ 170.213](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-B/section-170.213)). |
| **Test method** | Test Procedure with test tools + visual inspection + ONC test data ([Test Procedure, updated 2025-03-21](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | C-CDA validators on [SITE](https://site.healthit.gov): C-CDA USCDI v1 Validator, C-CDA USCDI v3 Validator ([SITE C-CDA USCDI v3 Validator](https://site.healthit.gov/c-cda/uscdi-v3)). Validates document structure, template conformance, vocabulary bindings, and USCDI data element presence. |
| **Evidence artifacts** | C-CDA documents generated by the system validated error-free by SITE validators; screenshots of sending/receiving workflows; test tool validation reports; visual inspection of displayed received documents. |
| **CCG** | [Transitions of Care CCG](https://healthit.gov/test-method/transitions-care/) (updated 2025-08-29). Includes errata and US Core Patch Process corrections. |
| **Internal audit capture** | Validation reports from SITE C-CDA validator; sample C-CDA documents (send/receive); screenshots of reconciliation workflow; USCDI data element coverage matrix. |

### (b)(2) Clinical Information Reconciliation and Incorporation

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(b)(2)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Reconcile and incorporate problems, medications, and allergies from received C-CDA documents; generate a new C-CDA from reconciled data (system verification). |
| **Standards referenced** | C-CDA R2.1, CCD template. |
| **Test method** | Test Procedure with test tools + visual inspection ([updated 2025-03-21](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | SITE C-CDA validators for system verification output. |
| **Evidence artifacts** | Demonstration of reconciliation workflow; C-CDA output validated by SITE; before/after reconciliation comparison. |

### (b)(3) Electronic Prescribing

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(b)(3)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Create new prescriptions, refills, change requests, cancel, fill status notifications, and electronic prior authorization transactions. Must use NCPDP SCRIPT standard for message formatting. Medication selection using RxNorm. |
| **Standards referenced** | NCPDP SCRIPT Implementation Guide v2017071 (expires Jan 1, 2028); NCPDP SCRIPT v2023011; RxNorm; NDC ([ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/)). |
| **Test method** | Test Procedure with test tools + test data ([updated 2025-09-30](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | eRx Testing Suite ([ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/)). |
| **Evidence artifacts** | eRx test suite validation reports; sample NCPDP SCRIPT messages; demonstration of all transaction types (NewRx, Refill, CancelRx, etc.); evidence of RxNorm-coded medication selection. |
| **CCG** | [Electronic Prescribing CCG](https://healthit.gov/test-method/electronic-prescribing/) (updated 2025-09-30). |
| **Internal audit capture** | eRx test suite pass/fail results; NCPDP SCRIPT message samples; RxNorm mapping evidence; transaction type coverage checklist. |

### (b)(4) Real-Time Prescription Benefit

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(b)(4)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Process and display real-time prescription benefit information during prescribing; present patient-specific formulary, coverage, and cost data. |
| **Standards referenced** | NCPDP Real-Time Prescription Benefit Standard Implementation Guide v13; RxNorm; NDC ([ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/)). |
| **Test method** | Test Procedure with test tools ([updated 2025-09-30](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (b)(7) Security Tags — Summary of Care — Send

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(b)(7)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Apply security labels/tags to C-CDA documents when sending, based on HL7 DS4P (Data Segmentation for Privacy). |
| **Standards referenced** | HL7 DS4P IG, C-CDA R2.1. |
| **Test method** | Test Procedure with test tools ([updated 2025-03-21](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (b)(8) Security Tags — Summary of Care — Receive

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(b)(8)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Receive and process security-tagged C-CDA documents, enforcing access restrictions based on tags. |
| **Test method** | Test Procedure with test tools ([updated 2025-03-21](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (b)(9) Care Plan

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(b)(9)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Record, change, access, create, and receive care plan information using the C-CDA Care Plan document template (Health Status Evaluations and Outcomes Section, Interventions Section) ([Care Plan CCG](https://healthit.gov/test-method/care-plan/)). |
| **Standards referenced** | C-CDA R2.1 Care Plan template; C-CDA R2 Companion Guide Release 4.1 (as of Jan 1, 2026). |
| **Test method** | Test Procedure with test tools ([updated 2025-03-21](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (b)(10) Electronic Health Information (EHI) Export

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(b)(10)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Single-patient and patient-population export of **all EHI** that can be stored by the product at time of certification. Export must be electronic, computable format. User must be able to execute export without developer assistance. Limit export ability to identified users. Include publicly accessible hyperlink to export format. ([EHI Export CCG](https://healthit.gov/test-method/electronic-health-information-export/)). |
| **Standards referenced** | No predefined standard or data set — varies by product. EHI defined as ePHI in a designated record set per [45 CFR 160.103 and 164.501](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315). |
| **Test method** | Conformance Method (documentation + visual inspection) ([updated 2024-03-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Evidence artifacts** | Documentation of all data types stored and exported; demonstration of single-patient and population export; sample export files; evidence of access controls; publicly posted format documentation URL. |
| **Internal audit capture** | Data type inventory; export file samples; access control evidence; URL to format documentation. |

### (b)(11) Decision Support Interventions (DSI)

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(b)(11)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | **Evidence-based DSI:** Enable selection/activation of CDS interventions based on problem list, medications, allergies, demographics, lab tests, and vital signs (individually and in combination). Enable user feedback on interventions. **Predictive DSI:** Source attributes (31 fields for predictive, 13 for evidence-based) including description, purpose, cautioned uses, development details, fairness assessment, external validation, quantitative performance measures, ongoing monitoring, update schedule. Intervention risk management for predictive DSI. ([DSI CCG](https://healthit.gov/test-method/decision-support-interventions/), updated 2025-08-29). |
| **Standards referenced** | No specific interoperability standard; USCDI data elements as input triggers. |
| **Test method** | Conformance Method (documentation + visual inspection) ([updated 2024-03-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Evidence artifacts** | Documentation of all evidence-based interventions and their data triggers; source attribute documentation (13 fields for evidence-based, 31 for predictive); demonstration of intervention activation, user feedback capture, and export of feedback data; risk management documentation for predictive DSI. |
| **Key HTI-1 notes** | This criterion replaces (a)(9) CDS effective January 1, 2025. Developers must assess UCD gaps between (a)(9) and (b)(11) for safety-enhanced design testing ([SED CCG](https://healthit.gov/test-method/safety-enhanced-design/)). The DSI Resource Guide is available as a [PDF from HealthIT.gov](https://healthit.gov/certification-health-it/). |
| **Internal audit capture** | Inventory of all DSI supplied; source attribute completeness tracker per intervention; risk analysis documentation for predictive DSI; user feedback export samples; UCD process documentation. |

---

## 4. § 170.315(c) — Clinical Quality Measures (CQMs)

### (c)(1) CQMs — Record and Export

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(c)(1)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Record all data necessary to calculate each CQM presented for certification. Export data files formatted per QRDA standards. Data for exclusions/exceptions must be codified entries. ([CQM Record & Export CCG](https://healthit.gov/test-method/clinical-quality-measures-cqms-record-and-export/)). |
| **Standards referenced** | HL7 QRDA Category I (inpatient) per [§ 170.205(h)(3)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-B); QRDA Category III (ambulatory) per [§ 170.205(k)(3)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-B). CMS Implementation Guides for QRDA. |
| **Test method** | Test Procedure with test tools + test data ([updated 2024-03-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | **Cypress** — the official ONC eCQM testing tool ([cypress.healthit.gov](https://cypress.healthit.gov/cypress/)). Cypress validates CQM calculations, QRDA document conformance, and data completeness. Requires UMLS account ([Cypress Validator](https://cypressvalidator.healthit.gov)). |
| **Evidence artifacts** | Cypress test reports for all presented CQMs; QRDA export files validated by Cypress; demonstration of data recording for CQM denominators, numerators, exclusions, exceptions. |
| **Developer discretion** | The specific version, number, and type of CQMs presented for certification are at the developer's discretion. ONC recommends consulting CMS requirements for Promoting Interoperability programs ([CQM Record & Export CCG](https://healthit.gov/test-method/clinical-quality-measures-cqms-record-and-export/)). |
| **Internal audit capture** | List of CQMs certified to; Cypress test results per CQM; QRDA sample files; CMS measure version alignment documentation. |

### (c)(2) CQMs — Import and Calculate

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(c)(2)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Import QRDA data from external sources; calculate CQMs accurately. |
| **Test tools** | Cypress ([cypress.healthit.gov](https://cypress.healthit.gov/cypress/)). |
| **Test method** | Test Procedure with Cypress test data. |
| **Evidence** | Cypress import/calculate test reports; evidence of accurate numerator/denominator calculation. |

### (c)(3) CQMs — Report

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(c)(3)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Create electronic data files for CQM reporting per QRDA Category I (inpatient) and/or QRDA Category III (ambulatory) IGs. Ambulatory-only modules test only QRDA Cat III ([CQM Report CCG](https://healthit.gov/test-method/clinical-quality-measures-cqms-report/)). |
| **Test tools** | Cypress and Cypress Validation Utility ([Cypress](https://cypress.healthit.gov/cypress/)). |
| **Test method** | Test Procedure ([updated 2024-12-17](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (c)(4) CQMs — Filter

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(c)(4)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Filter CQM results/data by patient demographics, provider, and other relevant attributes. |
| **Test method** | Test Procedure ([updated 2025-09-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

---

## 5. § 170.315(d) — Privacy & Security Criteria

All (d) criteria are required as dependencies for other certified criteria. They are listed as "design and performance" criteria and must be certified alongside any functional criterion ([EHI Export CCG](https://healthit.gov/test-method/electronic-health-information-export/)).

### (d)(1) Authentication, Access Control, and Authorization

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(1)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Verify user identity against unique identifier(s); establish access permissions based on user identity. At minimum, one-factor authentication satisfies this criterion ([Authentication CCG](https://healthit.gov/test-method/authentication-access-control-authorization/)). |
| **Standards required** | No specific standard required ([Authentication CCG](https://healthit.gov/test-method/authentication-access-control-authorization/)). |
| **Test method** | Conformance Method — attestation to ONC-ACB ([Test Method table](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Evidence artifacts** | Documentation of authentication mechanism; access control matrix; role-based access configuration evidence. |
| **Internal audit capture** | Authentication mechanism description; role/permission matrix; screenshots of access control configuration. |

### (d)(2) Auditable Events and Tamper-Resistance

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(2)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Record actions on EHI per § 170.210(e)(1); record audit log status (enabled/disabled); default to audit-enabled; restrict ability to disable audit log; ensure audit log entries cannot be changed, overwritten, or deleted; detect audit log alteration. |
| **Standards referenced** | [§ 170.210(e)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-B/section-170.210) — specifies audit event data elements. |
| **Test method** | Conformance Method (documentation + visual inspection). |
| **Evidence artifacts** | Demonstration of audit log recording; evidence of tamper-resistance (hash/checksum mechanism); evidence that log entries are immutable; documentation of log fields captured per § 170.210(e). |
| **Internal audit capture** | Audit log sample exports; tamper-detection mechanism documentation; evidence of default-enabled state; restricted disable controls. |

### (d)(3) Audit Report(s)

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(3)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Create audit reports for specific time periods; sort entries by data elements in § 170.210(e). |
| **Test method** | Conformance Method. |

### (d)(4) Amendments

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(4)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Enable a patient to request an amendment to their EHI; mark amended data; provide amendment audit trail. |
| **Test method** | Conformance Method. |

### (d)(5) Automatic Access Time-Out

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(5)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Automatically stop user session after configurable period of inactivity; require re-authentication. |
| **Test method** | Conformance Method — attestation. |

### (d)(6) Emergency Access

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(6)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Permit an identified set of users to access EHI during an emergency. |
| **Test method** | Conformance Method — attestation. |

### (d)(7) End-User Device Encryption

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(7)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Encrypt EHI stored on end-user devices, OR demonstrate that no EHI is stored on end-user devices. |
| **Test method** | Conformance Method — attestation. |

### (d)(8) Integrity

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(8)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Verify that EHI has not been altered in transit using hashing or digital signature. |
| **Test method** | Conformance Method. |

### (d)(9) Trusted Connection

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(9)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Establish trusted connections using TLS or equivalent for EHI exchange. |
| **Test method** | Conformance Method. |

### (d)(10) Auditing Actions on Health Information

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(10)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Record actions on health information; audit log entries immutable; detect alteration. |
| **Test method** | Conformance Method. |
| **CCG** | [Auditing Actions CCG](https://healthit.gov/test-method/auditing-actions-health-information/) (updated 2024-05-28). |

### (d)(11) Accounting of Disclosures

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(11)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Record disclosures made for treatment, payment, and health care operations per § 170.210(d). |
| **Test method** | Conformance Method. |

### (d)(12) Encrypt Authentication Credentials

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(12)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Encrypt authentication credentials stored locally or transmitted. |
| **Test method** | Conformance Method — attestation. |

### (d)(13) Multi-Factor Authentication

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(d)(13)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Attest whether MFA is supported using industry-recognized standards. If "yes," describe supported use cases. If "no," describe why not and plans to support it. ([§ 170.315(d)(13)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315)). |
| **Test method** | Attestation only. |
| **Evidence** | Written attestation with use case descriptions; documentation of MFA implementation or roadmap. |

---

## 6. § 170.315(e) — Patient Engagement Criteria

### (e)(1) View, Download, and Transmit to 3rd Party

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(e)(1)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Patients must be able to: **View** their health information online; **Download** in human-readable and C-CDA format; **Transmit** to a third party via Direct messaging or download. Must include USCDI data elements. |
| **Standards referenced** | C-CDA R2.1; Direct Project transport; USCDI v3 data elements. |
| **Test method** | Test Procedure with test tools + visual inspection ([updated 2025-04-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | SITE C-CDA validators for downloaded documents; Edge Testing Tool (ETT) for Direct transport testing. |
| **Evidence artifacts** | Patient portal demonstration; C-CDA download validated by SITE; Direct message transmission evidence; screenshots of view functionality. |
| **CCG** | [VDT CCG](https://healthit.gov/test-method/view-download-and-transmit-3rd-party/) (updated 2025-08-29). |
| **Internal audit capture** | Portal screenshots (view, download, transmit); C-CDA validation reports; Direct transport logs; USCDI data element coverage. |

### (e)(3) Patient Health Information Capture

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(e)(3)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Enable a patient or authorized representative to transmit health information to the EHR using structured standards. |
| **Test method** | Conformance Method. |

---

## 7. § 170.315(f) — Public Health Criteria

Public health criteria are **conditionally required** — a provider certifies to only those criteria needed for the CMS Promoting Interoperability measures they intend to report ([Immunization Registries CCG](https://healthit.gov/test-method/transmission-immunization-registries/)).

### (f)(1) Transmission to Immunization Registries

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(f)(1)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Generate HL7 v2.5.1 Z22 VXU immunization messages; consume Z23 ACK messages; generate Z44 QBP query messages for immunization history; receive and display Z42 RSP or Z33 RSP response messages. Vaccine codes using CVX and NDC. |
| **Standards referenced** | HL7 v2.5.1 Implementation Guide for Immunization Messaging, Release 1.5 ([§ 170.205(e)(4)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-B)); CVX vaccine codes ([§ 170.207(e)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-B)); NDC. |
| **Test method** | Test Procedure with test tools + ONC test data + visual inspection ([updated 2026-02-23](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | NIST HL7 v2 Immunization Test Suite (Context-Based Validation tab, ONC Certification Test Plan); alternative: HIMSS Immunization Integration Test Suite ([ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/)). |
| **Evidence artifacts** | NIST Immunization Test Suite validation reports (error-free for all test cases); VXU messages generated per test data; visual inspection of immunization history display; Z44 query and Z42/Z33 response processing evidence. ([Test Procedure PDF](https://healthit.gov/wp-content/uploads/2025/05/Transmission-to-immunization-registries.pdf)). |
| **Internal audit capture** | NIST test suite validation reports; sample HL7 v2 messages; test case checklist; CVX/NDC code mapping evidence. |

### (f)(2) Transmission to Public Health Agencies — Syndromic Surveillance

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(f)(2)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Generate and transmit HL7 v2.5.1 ADT messages to public health agencies for syndromic surveillance. |
| **Standards referenced** | HL7 v2.5.1; PHIN Messaging Guide for Syndromic Surveillance. |
| **Test method** | Test Procedure with test tools ([updated 2026-02-23](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | Public Health Testing Suites on [SITE](https://site.healthit.gov). |

### (f)(3) Transmission — Reportable Laboratory Tests and Values/Results

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(f)(3)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Generate and transmit electronic laboratory reports (ELR) to public health agencies using HL7 v2.5.1. |
| **Standards referenced** | HL7 v2.5.1 ELR IG; LOINC; SNOMED CT. |
| **Test method** | Test Procedure with test tools ([updated 2024-03-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (f)(4) Transmission to Cancer Registries

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(f)(4)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Generate and transmit cancer case information to cancer registries using HL7 CDA. |
| **Test method** | Test Procedure with test tools ([updated 2024-05-16](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (f)(5) Transmission — Electronic Case Reporting (eCR)

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(f)(5)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Generate and transmit electronic initial case reports (eICRs) and receive reportability responses using HL7 CDA eCR standards. |
| **Standards referenced** | HL7 CDA R2 IG for eCR; RCTC (Reportable Conditions Trigger Codes). |
| **Test method** | Conformance Method ([updated 2024-03-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **CCG** | [eCR CCG](https://healthit.gov/test-method/transmission-public-health-agencies-electronic-case-reporting/) (updated 2025-09-11). |

### (f)(6) Transmission — Antimicrobial Use and Resistance Reporting

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(f)(6)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Test method** | Test Procedure ([updated 2024-03-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (f)(7) Transmission — Health Care Surveys

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(f)(7)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **Test method** | Test Procedure ([updated 2024-11-26](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

---

## 8. § 170.315(g) — Design, Performance & API Criteria

### (g)(1) Automated Numerator Recording

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(g)(1)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Automatically record numerator data for CMS Promoting Interoperability measures. |
| **Test method** | Test Procedure ([updated 2024-06-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (g)(2) Automated Measure Calculation

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(g)(2)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Automatically calculate PI program measures (numerator/denominator). |
| **Test method** | Test Procedure ([updated 2024-06-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (g)(3) Safety-Enhanced Design (SED)

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(g)(3)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Apply user-centered design (UCD) processes during development for specified criteria; conduct summative usability testing; document results using NISTIR 7742 format. Applies to: (a)(1)-(a)(5), (a)(14), (b)(2), (b)(3), (b)(11) ([SED CCG](https://healthit.gov/test-method/safety-enhanced-design/)). |
| **Standards referenced** | NISTIR 7741 (UCD process guide); NISTIR 7742 (Customized CIF Template for EHR Usability Testing). |
| **Test method** | Test Procedure — documentation review ([updated 2024-03-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Evidence artifacts** | UCD process documentation for each applicable criterion; summative usability test report formatted per NISTIR 7742; task completion rates, error rates, satisfaction scores per criterion. Documentation becomes publicly available as part of certification results ([SED CCG](https://healthit.gov/test-method/safety-enhanced-design/)). |
| **Key notes** | ONC-ACBs must be notified when UI changes affect capabilities under this criterion on a quarterly basis. Retrospective UCD analysis is permitted for first-time certification. When moving from (a)(9) to (b)(11) DSI, developers must assess UCD gaps for new functionality such as source attribute modification and user feedback ([SED CCG](https://healthit.gov/test-method/safety-enhanced-design/)). |
| **Internal audit capture** | UCD process logs per criterion; usability test reports (NISTIR 7742); participant demographics; task performance data; quarterly UI change notifications to ONC-ACB. |

### (g)(4) Quality Management System (QMS)

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(g)(4)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Use a Quality Management System for each capability certified. All Health IT Modules must certify to this criterion. Identify QMS standard used (e.g., ISO 9001, ISO 13485, or equivalent) or describe proprietary process. ([QMS CCG](https://healthit.gov/test-method/quality-management-system/)). |
| **Standards required** | No specific QMS standard mandated ([QMS CCG](https://healthit.gov/test-method/quality-management-system/)). |
| **Test method** | Attestation + documentation review ([updated 2024-03-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Evidence artifacts** | QMS documentation; identification of QMS standard(s) used; process descriptions for development, testing, release. |

### (g)(5) Accessibility-Centered Design

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(g)(5)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Demonstrate that accessibility was considered in design. Identify applicable accessibility standard (e.g., Section 508, WCAG 2.0). |
| **Test method** | Attestation + documentation ([updated 2024-03-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (g)(6) Consolidated CDA Creation Performance

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(g)(6)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Create C-CDA documents conformant to referenced standard for all criteria requiring C-CDA generation. |
| **Standards referenced** | C-CDA R2.1; C-CDA R2 Companion Guide Release 4.1. |
| **Test method** | Test Procedure with C-CDA validators ([updated 2025-03-21](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | SITE C-CDA validators. |
| **CCG** | [C-CDA Creation Performance CCG](https://healthit.gov/test-method/consolidated-cda-creation-performance/) (updated 2025-08-05). |

### (g)(7) Application Access — Patient Selection

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(g)(7)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | API-enabled patient selection capability. |
| **Test method** | Conformance Method ([updated 2024-03-11](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Subject to Real World Testing** | Yes ([RWT Resource Guide](https://healthit.gov/wp-content/uploads/2025/10/Real_World_Testing_Resource_Guide_508.pdf)). |

### (g)(9) Application Access — All Data Request

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(g)(9)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | API-enabled access to all patient data. |
| **Test method** | Test Procedure ([updated 2025-03-21](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

### (g)(10) Standardized API for Patient and Population Services

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(g)(10)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | FHIR R4 API supporting: (i) data response for single patient; (ii) data response for multiple patients (Bulk Data); (iii) application registration; (iv) authorization/authentication (SMART on FHIR); (v) patient authorization (granular scopes); (vi) token revocation; (vii) documentation; (viii) service base URL publication. Must support all USCDI data elements via US Core profiles. |
| **Standards referenced** | **HL7 FHIR R4**; **US Core IG** (current regulatory floor: US Core 3.1.1/USCDI v1, with SVAP options for US Core 6.1/USCDI v3 and US Core 7.0/USCDI v4); **SMART App Launch** (v2.0.0, SMART 1.0.0 expired per [Inferno March 2026 update](https://inferno.healthit.gov)); **FHIR Bulk Data Access (Flat FHIR)** v1.0.1 STU 1. ([g(10) CCG](https://healthit.gov/test-method/standardized-api-patient-and-population-services/), updated 2025-08-29). |
| **Test method** | Test Procedure with Inferno test tool + visual inspection + documentation ([updated 2024-11-26](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | **Inferno ONC Certification (g)(10) Standardized API Test Kit** — the ONC-approved automated testing tool. Publicly hosted at [inferno.healthit.gov](https://inferno.healthit.gov). Version 8.0.0 (March 2026) removes support for expired IG versions (US Core 3.1.1, US Core 4.0.0, SMART App Launch 1.0.0). Source code on [GitHub](https://github.com/onc-healthit/onc-certification-g10-test-kit). |
| **Evidence artifacts** | Inferno test kit full pass report (all tests green); FHIR capability statement; US Core profile conformance; SMART on FHIR authorization flow evidence; Bulk Data export evidence; documentation of supported US Core Choices and References (must be publicly documented per § 170.404(a)(2)); Provenance resource support. |
| **Key policy notes** | Clinical note text must be "plain text" (not converted to PDF). name.suffix required. Must support at least one Choice or Reference per must-support element. Legacy data from outside systems not required to be mapped to USCDI terminologies. Sub-resource scopes required per HTI-1 ([g(10) CCG](https://healthit.gov/test-method/standardized-api-patient-and-population-services/); [g(10) Inquiry Portal](https://onc-healthit.github.io/api-resource-guide/inquiry-portal/g10-inquiries/)). |
| **Internal audit capture** | Inferno test results (full JSON/HTML export); FHIR CapabilityStatement; list of US Core profiles supported and Choices/References; SMART configuration JSON; Bulk Data export samples; API documentation URL; sub-resource scope support evidence. |

### (g)(31)–(g)(33) Provider Prior Authorization APIs

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(g)(31)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315), (g)(32), (g)(33) |
| **What must exist** | (g)(31) Coverage Requirements Discovery; (g)(32) Documentation Templates and Rules; (g)(33) Prior Authorization Support. Must enable providers to check PA requirements, retrieve documentation templates, and submit prior authorization requests. |
| **Standards referenced** | HL7 Da Vinci Prior Authorization Support (PAS) IG; Da Vinci Coverage Requirements Discovery (CRD) IG; Da Vinci Documentation Templates and Rules (DTR) IG — all FHIR-based ([g(31) CCG](https://healthit.gov/test-method/provider-prior-authorization-api-coverage-requirements-discovery/); [g(33) CCG](https://healthit.gov/test-method/provider-prior-authorization-api-prior-authorization-support/)). |
| **Test method** | Test Procedures ([updated 2025-09-30](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Evidence artifacts** | FHIR-based PA workflow demonstration; Da Vinci IG conformance evidence; test tool outputs. |

---

## 9. § 170.315(h) — Transport Criteria

### (h)(1) Direct Project

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(h)(1)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Send and receive health information using Direct Project messaging (encrypted, signed S/MIME over SMTP). Required for Base EHR definition (either (h)(1) or (h)(2)). |
| **Standards referenced** | Applicability Statement for Secure Health Transport v1.2; Direct Project specifications. |
| **Test method** | Test Procedure with ETT ([updated 2025-03-21](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | Edge Testing Tool (ETT) on [SITE](https://site.healthit.gov). Training videos on [GitHub](https://github.com/siteadmin). |

### (h)(2) Direct Project, Edge Protocol, and XDR/XDM

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(h)(2)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Direct messaging plus Edge protocols (SMTP, XDR) and XDM processing. IMAP and POP3 optional. Required to handle invalid test cases for error handling. Must produce delivery notification messages when requested. ([h(2) CCG](https://healthit.gov/test-method/direct-project-edge-protocol-and-xdr-xdm/)). |
| **Standards referenced** | Applicability Statement for Secure Health Transport v1.2; IHE XDR/XDM profiles; Direct IG for Delivery Notification. |
| **Test method** | Test Procedure with ETT + SITE payloads ([updated 2025-03-21](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **Test tools** | Edge Testing Tool (ETT); ASTP/ONC-supplied C-CDA USCDI Certification Test Data payloads for download from SITE ([h(2) CCG](https://healthit.gov/test-method/direct-project-edge-protocol-and-xdr-xdm/)). |
| **Evidence artifacts** | ETT test results; Direct message exchange logs; XDR/XDM processing evidence; delivery notification evidence; error handling for invalid test cases. |

---

## 10. § 170.315(j) — New Modular API Criteria

These are new criteria introduced via the HTI-2 rulemaking process.

### (j)(20) Workflow Triggers for Decision Support Interventions — Clients

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(j)(20)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Client-side support for CDS Hooks workflow triggers for decision support interventions. |
| **Test method** | Test Procedure ([updated 2025-10-01](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |
| **CCG** | Updated 2025-09-30. |

### (j)(21) Subscriptions — Client

| Aspect | Details |
|---|---|
| **Regulation** | [§ 170.315(j)(21)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315) |
| **What must exist** | Client-side support for FHIR Subscriptions. |
| **Test method** | Test Procedure ([updated 2025-09-30](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/)). |

---

## 11. Conditions & Maintenance of Certification

Beyond passing initial testing, certified developers face ongoing obligations under [45 CFR Part 170 Subpart D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D).

### § 170.401 — Information Blocking

- **Requirement:** A certified health IT developer must not take any action that constitutes information blocking as defined in [42 U.S.C. § 300jj-52](https://www.law.cornell.edu/uscode/text/42/300jj-52) and [45 CFR § 171.103](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-171/subpart-A/section-171.103), on or after April 5, 2021 ([§ 170.401](https://www.law.cornell.edu/cfr/text/45/170.401)).
- **Scope:** Applies to ALL health IT and related actions by the developer — not just certified modules ([Information Blocking CCG](https://healthit.gov/certification-health-it/conditions-ccg/information-blocking/)).
- **Evidence for audit tool:** Policy documentation; training records; exception analysis per [45 CFR Part 171 Subparts B, C, D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-171); attestation records.

### § 170.402 — Assurances

- **Requirement:** Developer must not prohibit or restrict communication about usability, interoperability, security, user experiences, or business practices. Must provide EHI Export capability per (b)(10) and provide it to customers.
- **Key obligation:** Developers with certified modules that store EHI must certify to (b)(10) and deploy it to customers per the Maintenance of Certification requirement at § 170.402(b)(2) ([Attestations CCG](https://healthit.gov/certification-health-it/conditions-ccg/attestations/)).

### § 170.403 — Communications

- **Requirement:** Must not prohibit or restrict communications about a product's usability, interoperability, security, user experiences, business practices, or any related lawful communication.

### § 170.404 — Application Programming Interfaces (API Conditions)

- **Requirement:** Certified API Developers must publish API documentation (including service base URLs, supported scopes, US Core Choices/References), register apps within 5 business days, not charge fees that impede access, and grant API Information Sources independent ability to permit API Users ([§ 170.404](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D); [g(10) Inquiry Portal](https://onc-healthit.github.io/api-resource-guide/inquiry-portal/g10-inquiries/)).
- **Evidence for audit tool:** Published API documentation URL; app registration SLA tracking; fee schedule (if any); service base URL publication evidence.

### § 170.405 — Real World Testing

- See [Section 12](#12-real-world-testing) below.

### § 170.406 — Attestations

- **Requirement:** Semiannual attestations covering compliance with §§ 170.401-170.405 ([§ 170.406](https://www.law.cornell.edu/cfr/text/45/170.406); [Attestations CCG](https://healthit.gov/certification-health-it/conditions-ccg/attestations/)).
- **Windows:** April (covers Oct–Mar) and October (covers Apr–Sep). October window extends through October 31.
- **Submission:** Via ONC-provided web form to ONC-ACB. Attestation status published on CHPL.
- **Non-compliance disclosure:** Developers must indicate noncompliance if they were noncompliant at any point during the attestation period, regardless of corrective action status ([Attestations CCG](https://healthit.gov/certification-health-it/conditions-ccg/attestations/)).
- **Evidence for audit tool:** Attestation submission records; compliance status per condition; noncompliance explanations; corrective action plan references.

### Insights Condition (New in HTI-1)

- Beginning annually in January 2026, developers must report certain interoperability-focused metrics as part of the new Insights Condition and Maintenance of Certification ([HTI-1 Final Rule](https://healthit.gov/regulations/hti-rules/hti-1-final-rule/); [HTI-1 Key Dates PDF](https://healthit.gov/wp-content/uploads/2025/03/Overview-and-Key-Dates-2024_508.pdf)).

---

## 12. Real World Testing

### Requirement

Under [45 CFR § 170.405](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D), all certified health IT developers must conduct annual Real World Testing (RWT) demonstrating interoperability and functionality in production environments ([RWT page](https://healthit.gov/certification-health-it/real-world-testing/)).

### Criteria Subject to RWT

Per the [Real World Testing Resource Guide (October 2025)](https://healthit.gov/wp-content/uploads/2025/10/Real_World_Testing_Resource_Guide_508.pdf):

| Family | Criteria |
|---|---|
| **Care Coordination** | (b)(1), (b)(2), (b)(3), (b)(4), (b)(7), (b)(8), (b)(9), (b)(10), (b)(11) |
| **CQMs** | (c)(1), (c)(2), (c)(3) |
| **Patient Engagement** | (e)(1) |
| **Public Health** | (f)(1)-(f)(7) |
| **APIs** | (g)(7), (g)(9), (g)(10), (g)(31), (g)(32), (g)(33) |
| **Transport** | (h)(1), (h)(2) |
| **Modular API** | (j)(20), (j)(21) |

### RWT Plan Required Elements (45 CFR 170.405(b)(1))

1. Testing method(s)/methodology(ies) for demonstrating real-world interoperability
2. Care setting(s) tested with justification
3. How all requirements of each criterion will be tested (all standards versions)
4. Schedule of key milestones
5. Expected outcomes description
6. At least one measurement/metric per plan (with denominators, sample sizes)
7. Justification for approach
8. SVAP update details (if applicable)

### RWT Results Report Required Elements (45 CFR 170.405(b)(2))

1. Changes from plan (with reasons and outcome impact)
2. Testing methods used
3. Care settings tested
4. SVAP updates (if applicable)
5. Key milestones achieved
6. Outcomes description including challenges
7. Measurement/metric data with context
8. Non-conformities must be reported to ONC-ACB within 30 days

### Timelines

- **Plans:** Public on CHPL by **December 15** (based on certifications as of August 31)
- **Results:** Public on CHPL by **March 15** following measurement year
- Submit to ONC-ACB in advance of CHPL publication dates

### Current Enforcement Discretion (per EO 14192, June 30, 2025)

- **CY 2025:** No annual RWT plan submission required for 2026 testing year ([RWT page](https://healthit.gov/certification-health-it/real-world-testing/)).
- **CY 2026:** Only developers with modules certified to **(g)(7)–(g)(10)** as of August 31, 2024, must submit CY 2025 results by March 2026.
- Enforcement discretion effective immediately through **December 31, 2026**, or HHS deregulatory action completion.
- Does **not** impact SVAP requirements ([RWT Resource Guide](https://healthit.gov/wp-content/uploads/2025/10/Real_World_Testing_Resource_Guide_508.pdf)).

### Evidence for Internal Audit Tool

- RWT plan document (per year)
- RWT results report (per year)
- CHPL URLs for plan and results
- Metric data (denominator, sample size, success/failure rates, trends)
- Non-conformity log and 30-day reporting evidence
- ONC-ACB submission receipts

---

## 13. ONC-Approved Test Tools & Validators

| Tool | Purpose | Criteria Served | URL |
|---|---|---|---|
| **Inferno (g)(10) Standardized API Test Kit** | Automated FHIR API testing: US Core conformance, SMART on FHIR auth, Bulk Data, patient/population services | § 170.315(g)(10) | [inferno.healthit.gov](https://inferno.healthit.gov) |
| **SITE C-CDA Validators** (USCDI v1, v3) | Validate C-CDA R2.1 documents for structure, template conformance, vocabulary, USCDI data elements | (b)(1), (b)(2), (b)(9), (e)(1), (g)(6) | [site.healthit.gov/c-cda/uscdi-v1](https://site.healthit.gov/c-cda/uscdi-v1), [site.healthit.gov/c-cda/uscdi-v3](https://site.healthit.gov/c-cda/uscdi-v3) |
| **Edge Testing Tool (ETT)** | Direct messaging, XDR/XDM transport testing | (h)(1), (h)(2), (e)(1) transport | [site.healthit.gov](https://site.healthit.gov) |
| **Cypress** | eCQM testing: record, export, import, calculate, report, filter; QRDA validation | (c)(1), (c)(2), (c)(3), (c)(4) | [cypress.healthit.gov](https://cypress.healthit.gov/cypress/), [cypressvalidator.healthit.gov](https://cypressvalidator.healthit.gov) |
| **eRx Testing Suite** | NCPDP SCRIPT message validation, electronic prescribing transactions | (b)(3) | [ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/) |
| **RTPB Testing Tool** | Real-Time Prescription Benefit standard testing | (b)(4) | [ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/) |
| **NIST HL7 v2 Immunization Test Suite** | HL7 v2.5.1 immunization message validation (VXU, QBP, RSP) | (f)(1) | [ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/) |
| **HIMSS Immunization Integration Test Suite** | Alternative immunization testing | (f)(1) | [ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/) |
| **Public Health Testing Suites** | Syndromic surveillance, ELR, cancer registry, eCR, AUR testing | (f)(2)–(f)(7) | [ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/) |
| **CPOE Evaluation Tool** | CPOE workflow evaluation | (a)(1)–(a)(3) | [ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/) |
| **FHIR Resource Validator (Inferno)** | Validate individual FHIR resources against profiles | General FHIR conformance | [inferno.healthit.gov](https://inferno.healthit.gov) |

**Source code** for ASTP/ONC projects and tools: [github.com/siteadmin](https://github.com/siteadmin) and [github.com/onc-healthit](https://github.com/onc-healthit).

---

## 14. Internal Audit Tool Recommendations

Based on the evidence and demonstration requirements above, an internal audit/compliance tracking tool for HealthOS should capture the following per certification criterion:

### Per-Criterion Tracking Fields

| Field | Description |
|---|---|
| **Criterion ID** | e.g., § 170.315(g)(10) |
| **Criterion Name** | e.g., Standardized API for Patient and Population Services |
| **Conformance Method** | Testing / Attestation / Documentation / Visual Inspection |
| **Referenced Standards** | List of standards with version numbers and regulatory citations |
| **SVAP Elections** | Whether SVAP was used and which standard version |
| **CCG Version** | Date of the CCG version reviewed/applied |
| **Test Procedure Version** | Date of the test procedure used |
| **Test Tool(s) Used** | e.g., Inferno v8.0.0 |
| **Test Results** | Pass/Fail; link to full test report artifact |
| **Evidence Artifacts** | Links to screenshots, documents, validation reports, sample files |
| **ONC-ATL** | Testing lab used |
| **Test Date** | Date testing was conducted |
| **Issues/Findings** | Any issues discovered during testing |
| **Remediation Status** | Open / In Progress / Resolved |
| **CHPL Listing ID** | CHPL Product Number once certified |

### Ongoing Compliance Tracking

| Field | Description |
|---|---|
| **Semiannual Attestation Status** | Compliant / Noncompliant per condition (§§ 170.401–405) |
| **Attestation Submission Date** | April and October window dates |
| **RWT Plan Status** | Draft / Submitted / Published on CHPL |
| **RWT Plan CHPL URL** | Public link |
| **RWT Results Status** | Draft / Submitted / Published on CHPL |
| **RWT Results CHPL URL** | Public link |
| **RWT Metrics** | Measure name, denominator, result, trend |
| **Non-Conformity Log** | Description, date discovered, ONC-ACB notification date, resolution |
| **Surveillance Events** | ONC-ACB surveillance history, findings, CAPs |
| **Information Blocking Review** | Date of last internal review; exception analyses |
| **API Condition Compliance** | Documentation URL, app registration SLA compliance, fee schedule |
| **Insights Condition Reports** | Annual metric submissions |
| **UI Change Log** | Quarterly notifications to ONC-ACB for SED-relevant changes |
| **SVAP Update Notices** | ONC-ACB notification date, customer notification date, conformance method |

### Artifact Repository Structure

```
/certification/
  /{criterion-id}/
    /ccg/                    # CCG documents and versions
    /test-procedures/        # Test procedure versions
    /test-results/           # Test tool outputs, validation reports
    /evidence/               # Screenshots, demo recordings, sample files
    /documentation/          # Developer documentation submitted
  /conditions/
    /information-blocking/   # Policy docs, training records
    /assurances/             # Communication policy evidence
    /api-conditions/         # API docs, registration logs
    /attestations/           # Semiannual attestation records
  /rwt/
    /{year}/
      /plan/                 # RWT plan document
      /results/              # RWT results report
      /metrics/              # Raw metric data
  /surveillance/
    /events/                 # Surveillance logs, CAPs
  /sed/
    /ucd-processes/          # UCD documentation per criterion
    /usability-reports/      # NISTIR 7742 reports
    /ui-change-log/          # Quarterly change notifications
```

---

## 15. Key Timelines & Enforcement Discretion

| Date | Event | Source |
|---|---|---|
| **March 11, 2024** | HTI-1 Final Rule effective; editions removed; single "ONC Certification Criteria for Health IT" | [HTI-1 Final Rule](https://healthit.gov/regulations/hti-rules/hti-1-final-rule/) |
| **January 1, 2025** | (a)(9) CDS expires; (b)(11) DSI in effect | [HTI-1 Key Dates](https://healthit.gov/wp-content/uploads/2025/03/Overview-and-Key-Dates-2024_508.pdf) |
| **December 31, 2025** | Multiple HTI-1 criterion updates originally required (extended to March 1, 2026 via enforcement discretion) | [ONC Test Method page](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/) |
| **January 1, 2026** | USCDI v3 required for certification criteria referencing § 170.213; Sex Parameter for Clinical Use and Name to Use required in (a)(5) (subject to EO 14168 modifications) | [HTI-1 Key Dates](https://healthit.gov/wp-content/uploads/2025/03/Overview-and-Key-Dates-2024_508.pdf) |
| **March 1, 2026** | Extended deadline for HTI-1 updates under enforcement discretion | [ONC Test Method page](https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/) |
| **March 2026** | Inferno v8.0.0 deployed; US Core 3.1.1, US Core 4.0.0, SMART 1.0.0 removed from testing | [Inferno](https://inferno.healthit.gov) |
| **January 1, 2028** | NCPDP SCRIPT v2017071 adoption expires for (b)(3) | [ONC Conformance Test Tools](https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/) |
| **Through Dec 31, 2026** | RWT enforcement discretion per EO 14192 | [RWT page](https://healthit.gov/certification-health-it/real-world-testing/) |

### USCDI Version Timeline

| Version | Status | Source |
|---|---|---|
| **USCDI v1** | Regulatory floor (Cures Act Final Rule) | [USCDI page](https://isp.healthit.gov/united-states-core-data-interoperability-uscdi) |
| **USCDI v3** | Required baseline as of Jan 1, 2026 (HTI-1) | [HTI-1 Final Rule](https://healthit.gov/regulations/hti-rules/hti-1-final-rule/) |
| **USCDI v3.1** | SVAP-approved as of 2025 | [ONC Standards Bulletin 2025-2](https://healthit.gov/standards-and-technology/onc-standards-bulletin/onc-standards-bulletin-2025-2/) |
| **USCDI v4** | Available for adoption | [USCDI page](https://isp.healthit.gov/united-states-core-data-interoperability-uscdi) |
| **USCDI v5** | SVAP-approved as of Aug 29, 2025 | [ONC Standards Bulletin 2025-2](https://healthit.gov/standards-and-technology/onc-standards-bulletin/onc-standards-bulletin-2025-2/) |
| **Draft USCDI v7** | Released Jan 29, 2026 | [ONC Standards Bulletin 2026-1](https://healthit.gov/standards-and-technology/onc-standards-bulletin/onc-standards-bulletin-2026-1/) |

---

## Appendix: Key Reference URLs

| Resource | URL |
|---|---|
| 45 CFR § 170.315 (Certification Criteria) | https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-C/section-170.315 |
| 45 CFR Part 170 Subpart D (Conditions & Maintenance) | https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D |
| ONC Certification Program Test Method | https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/ |
| ONC Conformance Test Tools | https://healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/ |
| Certification Companion Guides (all) | https://healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/ |
| Inferno (g)(10) Test Kit | https://inferno.healthit.gov |
| SITE Testing Hub | https://site.healthit.gov |
| Cypress eCQM Testing | https://cypress.healthit.gov/cypress/ |
| CHPL | https://chpl.healthit.gov |
| Real World Testing | https://healthit.gov/certification-health-it/real-world-testing/ |
| RWT Resource Guide (PDF) | https://healthit.gov/wp-content/uploads/2025/10/Real_World_Testing_Resource_Guide_508.pdf |
| SVAP | https://healthit.gov/certification-health-it/standards-version-advancement-process-svap/ |
| USCDI | https://isp.healthit.gov/united-states-core-data-interoperability-uscdi |
| HTI-1 Final Rule | https://healthit.gov/regulations/hti-rules/hti-1-final-rule/ |
| Conformance Methods | https://healthit.gov/certification-health-it/certification-process/conformance-methods/ |
| Information Blocking CCG | https://healthit.gov/certification-health-it/conditions-ccg/information-blocking/ |
| Attestations CCG | https://healthit.gov/certification-health-it/conditions-ccg/attestations/ |
| g(10) Inquiry Portal | https://onc-healthit.github.io/api-resource-guide/inquiry-portal/g10-inquiries/ |
| ONC GitHub (source code) | https://github.com/siteadmin |
