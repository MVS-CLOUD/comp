# ONC Ongoing Obligations: Non-Criterion Requirements for Certified Health IT Developers

**Prepared for:** MVS Cloud / HealthOS  
**Date:** March 15, 2026  
**Scope:** Ambulatory EHR — post-certification obligations, maintenance requirements, and related federal dependencies  

---

## Table of Contents

1. [Part I — ONC Certification Program Obligations](#part-i--onc-certification-program-obligations)
   - [1.1 Conditions and Maintenance of Certification Overview](#11-conditions-and-maintenance-of-certification-overview)
   - [1.2 Information Blocking Condition](#12-information-blocking-condition-170401)
   - [1.3 Assurances Condition](#13-assurances-condition-170402)
   - [1.4 Communications Condition](#14-communications-condition-170403)
   - [1.5 API Condition](#15-api-condition-170404)
   - [1.6 Real World Testing Condition](#16-real-world-testing-condition-170405)
   - [1.7 Attestations Condition](#17-attestations-condition-170406)
   - [1.8 Insights Condition](#18-insights-condition-170407)
   - [1.9 Standards Version Advancement Process (SVAP)](#19-standards-version-advancement-process-svap)
   - [1.10 Direct Review and Enforcement](#110-direct-review-and-enforcement)
   - [1.11 CHPL Listing and Maintenance](#111-chpl-listing-and-maintenance)
   - [1.12 Active Enforcement Discretion Notices](#112-active-enforcement-discretion-notices)
2. [Part II — CMS/Provider-Use Dependencies](#part-ii--cmsprovider-use-dependencies)
   - [2.1 Medicare Promoting Interoperability Program (Hospitals)](#21-medicare-promoting-interoperability-program-hospitals)
   - [2.2 MIPS Promoting Interoperability (Clinicians)](#22-mips-promoting-interoperability-clinicians)
   - [2.3 CEHRT Definition and Its Impact on Developers](#23-cehrt-definition-and-its-impact-on-developers)
   - [2.4 Information Blocking Provider Disincentives](#24-information-blocking-provider-disincentives)
3. [Part III — Non-ONC but Essential Readiness Items](#part-iii--non-onc-but-essential-readiness-items)
   - [3.1 HIPAA Security Rule and Risk Analysis](#31-hipaa-security-rule-and-risk-analysis)
   - [3.2 SAFER Guides](#32-safer-guides)
   - [3.3 HIPAA Privacy Rule Considerations](#33-hipaa-privacy-rule-considerations)
   - [3.4 HITECH Act and Breach Notification](#34-hitech-act-and-breach-notification)

---

## Part I — ONC Certification Program Obligations

### 1.1 Conditions and Maintenance of Certification Overview

The 21st Century Cures Act (Section 4002) requires HHS to establish Conditions and Maintenance of Certification (CoC/MoC) requirements for the ONC Health IT Certification Program. These are codified in [45 CFR Part 170, Subpart D](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D). There are **seven Conditions of Certification**, each with accompanying Maintenance of Certification requirements that impose ongoing obligations on Certified Health IT Developers beyond initial certification testing ([healthit.gov — Conditions & Maintenance of Certification](https://healthit.gov/certification-health-it/conditions-ccg/)).

Key structural points:

- All Conditions except Information Blocking and Assurances apply only to actions related to certified health IT and the health IT itself ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)).
- The **Information Blocking** and **Assurances** Conditions are broader: they require the developer to ensure that *all* of its health IT and related actions (not just certified modules) do not constitute information blocking or inhibit access, exchange, and use of EHI ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)).
- Non-compliance with any Condition or Maintenance requirement can trigger **Direct Review** by ONC under [45 CFR 170.580](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D), potentially leading to corrective action, certification suspension/termination, or a developer ban ([healthit.gov — ONC Direct Review](https://healthit.gov/certification-health-it/onc-direct-review/)).

---

### 1.2 Information Blocking Condition (§170.401)

**Regulatory citation:** [45 CFR 170.401](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D); Section 3022(a) of the Public Health Service Act; [45 CFR Part 171](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-171)

**Condition of Certification:** A health IT developer may not take any action that constitutes information blocking as defined in [45 CFR 171.103](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-171), effective April 5, 2021 ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)).

**Maintenance of Certification:** No additional maintenance requirements beyond ongoing compliance with the Condition itself ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)).

**Scope warning:** This Condition applies to **all** of the developer's health IT and business practices — not just certified modules. A developer "knows or should know" standard applies (stricter than the provider standard) ([healthit.gov — Information Blocking](https://healthit.gov/information-blocking/)).

**Penalties and enforcement:**
- OIG can impose civil monetary penalties of **up to $1 million per violation** against health IT developers of certified health IT ([OIG — Information Blocking](https://oig.hhs.gov/reports/featured/information-blocking/)).
- Enforcement has been active since September 1, 2023 for developers, HIEs, and HINs ([Ropes & Gray](https://www.ropesgray.com/en/insights/alerts/2023/07/information-blockers-beware-oig-announces-penalties-of-up-to-1-million-per-information-blocking)).
- In March 2026, ASTP announced it is issuing notices of investigation of potential nonconformity to health IT developers ([Healthcare Dive](https://www.healthcaredive.com/news/astp-it-developers-lose-certification-information-blocking-thomas-keane/814445/); [Holland & Knight](https://www.hklaw.com/en/insights/publications/2026/02/the-wait-is-over-information-blocking-enforcement-is-officially-here)).
- Developers found guilty of information blocking could have certification pulled, forfeiting CMS incentive payment eligibility for their customers ([Healthcare Dive](https://www.healthcaredive.com/news/astp-it-developers-lose-certification-information-blocking-thomas-keane/814445/)).
- OIG may refer matters to ONC (for certification actions), OCR (for HIPAA violations), FTC, CMS, or DOJ (for False Claims Act liability) ([Ropes & Gray](https://www.ropesgray.com/en/insights/alerts/2023/07/information-blockers-beware-oig-announces-penalties-of-up-to-1-million-per-information-blocking)).

**Eight exceptions under 45 CFR Part 171:**
Practices meeting an exception will not be considered information blocking. Exceptions include: Preventing Harm, Privacy, Security, Infeasibility, Health IT Performance, Content and Manner, Fees, and Licensing ([healthit.gov — Information Blocking](https://healthit.gov/information-blocking/); [45 CFR Part 171](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-171)).

**Developer action items:**
- Document all practices that could interfere with EHI access/exchange/use
- Map each such practice to an applicable exception with contemporaneous documentation
- Review fee structures, contractual terms, and technical restrictions against the Fees, Licensing, and Content and Manner exceptions
- Establish a process for responding to information blocking claims filed through the ASTP/ONC portal

---

### 1.3 Assurances Condition (§170.402)

**Regulatory citation:** [45 CFR 170.402](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D)

**Condition of Certification** — A health IT developer must ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)):
1. Provide assurances it will not take any action that constitutes information blocking or inhibits appropriate EHI exchange, access, and use.
2. Ensure full compliance and unrestricted implementation of certification criteria capabilities.
3. Not take any action to interfere with a user's ability to access or use certified capabilities.
4. Certify a health IT product that electronically stores EHI to the [§170.315(b)(10) EHI Export criterion](https://healthit.gov/test-method/electronic-health-information-export/).
5. Not inhibit its customer's timely access to interoperable certified health IT.

**Maintenance of Certification** ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)):
1. **Record retention:** Retain all records demonstrating initial and ongoing compliance for **10 years** from the date of certification.
2. **EHI Export:** Certify to §170.315(b)(10) by December 31, 2023 if the product stores EHI.
3. **Update obligation:** Update certified Health IT Modules to all applicable revised certification criteria, including the most recently adopted capabilities and standards.
4. **Provide updates:** Provide updated modules to customers in a timely manner.
5. **Decision support transparency (b)(11)):** Starting January 1, 2025 and ongoing, review and update source attribute information, intervention risk management practices, and summary information for modules certified to §170.315(b)(11).

**Developer action items:**
- Implement a 10-year records retention policy tied to certification dates
- Ensure customers can fully use all certified capabilities without contractual or technical restrictions
- Establish an update/release pipeline that meets ONC timelines for adopting revised criteria
- Track HTI-1 compliance deadlines for criteria updates (extended to March 1, 2026 under enforcement discretion)

---

### 1.4 Communications Condition (§170.403)

**Regulatory citation:** [45 CFR 170.403](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D)

**Condition of Certification:** A developer may not prohibit or restrict any communication regarding ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)):
1. Usability of certified health IT
2. Interoperability of certified health IT
3. Security of certified health IT
4. User experiences with the technology
5. Developer's business practices related to EHI exchange
6. The manner in which a user uses certified health IT

**Maintenance of Certification** ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)):
1. **Annual customer notification:** Starting CY 2021, annually notify all customers that contravening communication provisions will not be enforced, until the developer amends the contract to remove them.
2. **Contract amendment:** As of June 30, 2020, not establish, renew, or enforce any contravening contract provision. Must amend such provisions at the next contract modification or renewal.

**Developer action items:**
- Audit all customer contracts and licensing agreements for gag clauses
- Ensure template contracts contain no restrictions on customer communications about usability, interoperability, security, or user experience
- Deliver annual written notice to customers if legacy provisions have not yet been removed
- Retain records of all notifications sent

---

### 1.5 API Condition (§170.404)

**Regulatory citation:** [45 CFR 170.404](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D)

**Applies to:** Modules certified to [§170.315(g)(7) through (g)(10)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D) and [(g)(31) through (g)(33)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D)

**Condition of Certification** — A developer must ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)):
1. Publish APIs enabling access, exchange, and use of EHI without special effort.
2. Publish complete business and technical documentation via a publicly accessible hyperlink.
3. Publish terms and conditions, including any fees.
4. Comply with permitted and prohibited fee requirements; retain fee records.
5. Abide by openness and pro-competitive conditions.

**Maintenance of Certification** ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)):
1. **Authenticity verification and registration** for production use.
2. **Service Base URL publication** (organization-level FHIR endpoint directory) — due by **December 31, 2024**.
3. **Rollout of (g)(10)-certified APIs** — due by **December 31, 2022**.
4. **Existing API compliance** — due by **April 5, 2021**.

**Developer action items:**
- Maintain a publicly accessible developer portal with complete FHIR API documentation
- Publish and maintain a Service Base URL endpoint list
- Ensure registration and authenticity verification processes are operational
- Document all API-related fees; ensure fee structures conform to permitted categories
- Avoid imposing contractual or technical barriers that could be construed as anti-competitive

---

### 1.6 Real World Testing Condition (§170.405)

**Regulatory citation:** [45 CFR 170.405](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D)

**Applies to:** Modules certified to §170.315(b), (c)(1)–(3), (e)(1), (f), (g)(7)–(10), (g)(31)–(33), (h), and (j)(20)–(21) ([healthit.gov — RWT CCG](https://healthit.gov/certification-health-it/conditions-ccg/real-world-testing/)).

**Condition of Certification:** Successfully test real-world use of certified technology for interoperability in the type of setting in which it would be marketed ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)).

**Maintenance of Certification — Annual cycle** ([healthit.gov — RWT CCG](https://healthit.gov/certification-health-it/conditions-ccg/real-world-testing/)):

| Deliverable | Deadline | Publication |
|---|---|---|
| RWT Plan submission to ONC-ACB | Date set by ONC-ACB | CHPL by **December 15** annually |
| RWT Results Report to ONC-ACB | Date set by ONC-ACB | CHPL by **March 15** annually |

**Plan required elements** ([RWT Resource Guide PDF](https://healthit.gov/wp-content/uploads/2025/10/Real_World_Testing_Resource_Guide_508.pdf)):
- Testing methods/methodology
- Care setting(s) with justification
- For each criterion, description of how real-world interoperability will be demonstrated
- If using SVAP versions, description of testing against all certified standard versions
- Results must address each plan element per Health IT Module

**Non-conformity reporting:** If a developer discovers a non-conformity during RWT, it must report to its ONC-ACB within **30 days** ([RWT Fact Sheet PDF](https://healthit.gov/wp-content/uploads/2025/09/Real-World-Testing-Fact-Sheet.pdf)).

**Current enforcement discretion (EDN2025.03):**
- For CY 2025: Developers are not expected to submit a 2026 RWT plan ([healthit.gov — Enforcement Discretion](https://healthit.gov/certification-health-it/enforcement-discretion-notices/)).
- For CY 2026: Only developers with modules certified to **(g)(7) through (g)(10)** as of August 31, 2024, must submit CY 2025 results by March 2026. All other criteria are exempt from results submission under enforcement discretion ([healthit.gov — Enforcement Discretion](https://healthit.gov/certification-health-it/enforcement-discretion-notices/)).

**Developer action items:**
- Even under enforcement discretion, maintain internal RWT processes and data collection
- Plan to have (g)(7)–(g)(10) results ready — this is the only active RWT results obligation in 2026
- Watch for changes: enforcement discretion is temporary and subject to revision

---

### 1.7 Attestations Condition (§170.406)

**Regulatory citation:** [45 CFR 170.406](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D)

**Condition of Certification:** A developer (or authorized representative) must attest to compliance with these Conditions and Maintenance requirements ([healthit.gov — Attestations CCG](https://healthit.gov/certification-health-it/conditions-ccg/attestations/)):
- §170.401 (Information Blocking)
- §170.402 (Assurances)
- §170.403 (Communications)
- §170.404 (APIs)
- §170.405 (Real World Testing)

**Maintenance of Certification — Semiannual cycle** ([Attestations Fact Sheet PDF](https://healthit.gov/wp-content/uploads/2025/08/Attestations_Fact-Sheet.pdf)):

| Attestation Window | Period Covered | Deadline |
|---|---|---|
| April | October – March | April 30 |
| October | April – September | October 31 |

- Attestations began April 1, 2022 ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/attestations/)).
- Developers must attest for any Health IT Modules with active certification during the prior six months ([Attestations Resource Guide PDF](https://healthit.gov/wp-content/uploads/2022/08/Attestations-Condition-Resource-Guide.pdf)).
- Must indicate **compliance**, **noncompliance**, or **inapplicability** for each Condition ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/attestations/)).
- Must select "Noncompliant" if non-compliant at any point during the period, regardless of corrective action status ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/attestations/)).
- Attestation submission status (but not content) is publicly visible on CHPL ([Attestations Resource Guide PDF](https://healthit.gov/wp-content/uploads/2022/08/Attestations-Condition-Resource-Guide.pdf)).

**Developer action items:**
- Establish a semiannual compliance review process to prepare attestations
- Designate an authorized representative capable of legally binding the developer
- Document the basis for each compliance assertion
- Noncompliance attestation itself does not automatically trigger Direct Review if corrective action is underway ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/attestations/))

---

### 1.8 Insights Condition (§170.407)

**Regulatory citation:** [45 CFR 170.407](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D)

**Background:** The Insights Condition implements the EHR Reporting Program mandated by the Cures Act. It was finalized in the [HTI-1 Final Rule](https://healthit.gov/certification-health-it/insights-condition/) and provides standardized, transparent reporting on certified health IT usage ([healthit.gov — Insights Condition](https://healthit.gov/certification-health-it/insights-condition/)).

**Condition of Certification:** Submit annual responses for specified measures and/or attest to not meeting eligibility thresholds ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)).

**Maintenance of Certification — Phased timeline** ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)):

| Measures Phase | Start Date |
|---|---|
| Phase 1: §170.407(a)(3)(i), (iii), (iv)(A)/(B), (vi) | July 2027 |
| Phase 2: §170.407(a)(3)(ii)(A)–(C), (iv)(C), (v), (vi)(A)/(B), (vii) | July 2028 |
| Phase 3: §170.407(a)(3)(ii)(D), (vii)(A) | July 2029 |

**Eligibility thresholds** ([Insights Condition Presentation PDF](https://www.healthit.gov/sites/default/files/2026-01/Insights%20Condition%20Presentation%2012.18_FINAL.pdf)):
- Developer must have products certified to §170.315(g)(10)
- Must meet a user threshold across all products: ≥50 hospitals OR ≥500 clinicians
- For each (g)(10) certified product, the functionality must have at least one user

**Current enforcement discretion (EDN2025.02):** ONC will only enforce reporting for the **"use of FHIR in apps through certified health IT"** measure (§170.407(a)(3)(iv)). All other Insights measures are under enforcement discretion until deregulatory revision or removal ([healthit.gov — Enforcement Discretion](https://healthit.gov/certification-health-it/enforcement-discretion-notices/)).

**Developer action items:**
- Begin instrumenting FHIR API usage data now — this is the only enforced Insights measure
- Prepare to publicly report Insights data via a publicly accessible hyperlink
- Monitor for changes to enforcement discretion that may expand or eliminate obligations

---

### 1.9 Standards Version Advancement Process (SVAP)

**Regulatory citation:** [45 CFR 170.405(b)(8)–(9)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D)

**Applies to:** Modules certified to §170.315(b), (c)(1)–(3), (e)(1), (f), (g)(7)–(10), and (h)

**Key provisions** ([healthit.gov](https://healthit.gov/certification-health-it/conditions-ccg/)):
- Developers are **permitted** (not required) to update to newer standards versions approved by the National Coordinator.
- A developer may certify directly to an approved newer version without first certifying to the version incorporated by reference in §170.299.
- If adopting SVAP versions, they must be addressed in RWT plans and results.

**Developer action items:**
- Track the SVAP-approved standards list on [healthit.gov](https://healthit.gov/certification-health-it/)
- When adopting newer standard versions, include them in RWT planning
- Coordinate with ONC-ACB on any SVAP-related testing

---

### 1.10 Direct Review and Enforcement

**Regulatory citation:** [45 CFR 170.580](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D); established in the Enhanced Oversight and Accountability Final Rule and expanded in the Cures Act Final Rule ([healthit.gov — ONC Direct Review](https://healthit.gov/certification-health-it/onc-direct-review/)).

**Three trigger circumstances** ([healthit.gov](https://healthit.gov/certification-health-it/onc-direct-review/)):
1. **Public health/safety risk:** Reasonable belief that certified modules may present a serious risk to public health or safety.
2. **Practical challenges for ONC-ACBs:** Review presents difficulties for certification bodies.
3. **Condition/Maintenance non-compliance:** Reasonable belief the developer has not complied with a CoC/MoC requirement.

**Process:**
- ONC receives information from ONC-ACB surveillance, ONC-ATL reports, direct submissions, or referrals from other agencies.
- If non-conformity is suspected: ONC sends a **Notice of Non-Conformity**; developer has **30 days to respond** (adjustable) ([healthit.gov](https://healthit.gov/certification-health-it/onc-direct-review/)).
- ONC may elect not to initiate or to cease review at any time.

**Enforcement powers** ([healthit.gov](https://healthit.gov/certification-health-it/onc-direct-review/)):
- Require **corrective action**
- **Suspend** a certification
- **Terminate** a certification
- **Ban** a developer from future certification
- For terminations: coordinate with HHS programs (e.g., CMS) for remedies to affected users

**Appeals:** Developers may appeal determinations to suspend or terminate certifications ([healthit.gov](https://healthit.gov/certification-health-it/onc-direct-review/)).

---

### 1.11 CHPL Listing and Maintenance

**Primary reference:** [Certified Health IT Product List (CHPL)](https://chpl.healthit.gov); [CHPL Public User Guide PDF](https://healthit.gov/wp-content/uploads/2024/03/chpl_public_user_guide.pdf)

**CHPL is the authoritative public record** of all ONC-certified health IT. It is critical for:
- Provider verification of CEHRT eligibility for CMS programs ([CMS — CEHRT](https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs/certified-ehr-technology))
- Public visibility of RWT plans, RWT results, attestation status, surveillance results, and Direct Review activity

**Developer obligations related to CHPL:**
- **RWT plans** must be published on CHPL by December 15 annually ([healthit.gov — RWT CCG](https://healthit.gov/certification-health-it/conditions-ccg/real-world-testing/))
- **RWT results** must be published on CHPL by March 15 annually ([healthit.gov — RWT CCG](https://healthit.gov/certification-health-it/conditions-ccg/real-world-testing/))
- **Attestation status** is displayed on the developer's CHPL page after each semiannual submission ([Attestations Resource Guide PDF](https://healthit.gov/wp-content/uploads/2022/08/Attestations-Condition-Resource-Guide.pdf))
- **Surveillance results** from ONC-ACBs are posted at least quarterly ([CHPL User Guide PDF](https://healthit.gov/wp-content/uploads/2024/03/chpl_public_user_guide.pdf))
- **Non-conformity findings** must be updated by ONC-ACBs no less than weekly ([CHPL User Guide PDF](https://healthit.gov/wp-content/uploads/2024/03/chpl_public_user_guide.pdf))
- **Direct Review** information is displayed on affected product listings ([CHPL User Guide PDF](https://healthit.gov/wp-content/uploads/2024/03/chpl_public_user_guide.pdf))

**Certification statuses on CHPL include:**
- Active
- Suspended by ONC
- Suspended by ONC-ACB
- Terminated by ONC
- Withdrawn by developer
- Withdrawn by ONC-ACB
- Retired (no longer subject to certification ban)

**CMS EHR Certification ID:** Providers must obtain a CMS EHR Certification ID from the CHPL to submit data to CMS Promoting Interoperability programs ([CMS PI Requirements PDF](https://www.qualityreportingcenter.com/globalassets/2025/01/iqr/pi_infographic_cy-2025-requirements_jan2025_vfinal_508.pdf)).

**Developer action items:**
- Monitor your CHPL listing(s) for accuracy
- Coordinate with ONC-ACB on timely submission of RWT plans, results, and attestations
- Ensure your listing reflects current certification status, edition, and criteria

---

### 1.12 Active Enforcement Discretion Notices

As of March 2026, ONC/ASTP has issued several enforcement discretion notices that temporarily modify obligations ([healthit.gov — Enforcement Discretion Notices](https://healthit.gov/certification-health-it/enforcement-discretion-notices/)):

| ID | Topic | Effective Period | Effect |
|---|---|---|---|
| EDN2025.01 | USCDI v3 Data Elements | March 21, 2025 for 12 months | No enforcement for omitting specified sex/gender/pronoun USCDI v3 elements per EO 14168 |
| EDN2025.02 | Insights Condition | July 1, 2027 until deregulatory revision | Only "use of FHIR in apps" measure required; all other Insights measures suspended |
| EDN2025.03 | Real World Testing | Through December 31, 2026 | No 2026 RWT plan required; 2025 results only required for (g)(7)–(10) certified modules |
| EDN2025.04 | Electronic Case Reporting (f)(5) | Through December 31, 2026 | Relaxed eCR standards requirements |
| EDN2025.05 | Attestations | Through January 1, 2026 | Extended October 2025 attestation deadline to December 31, 2025 |
| EDN2025.06 | HTI-1 Criteria Compliance Dates | January 1, 2026 to March 1, 2026 | Extended update/provision deadlines to February 28, 2026 for HTI-1 revised criteria |

**Important:** These are temporary measures issued under EO 14192 ("Unleashing Prosperity Through Deregulation"). They may be rescinded, and the underlying regulatory obligations remain in effect. Developers should continue building toward full compliance ([healthit.gov — Enforcement Discretion](https://healthit.gov/certification-health-it/enforcement-discretion-notices/)).

---

## Part II — CMS/Provider-Use Dependencies

These are not direct ONC developer obligations, but they are critical to understand because they define why providers buy and use certified EHR technology — and they create indirect requirements on what the product must do.

### 2.1 Medicare Promoting Interoperability Program (Hospitals)

**Regulatory authority:** HITECH Act; [CMS Promoting Interoperability Programs](https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs)

**Who must participate:** Eligible hospitals (subsection (d) hospitals) and Critical Access Hospitals (CAHs) under Medicare ([CMS](https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs)).

**Program requirements** — To be considered a "meaningful user" and avoid payment penalties, providers must ([CY 2025 PI Program Guide PDF](https://www.qualityreportingcenter.com/globalassets/2025/12/iqr/pi_cy-2025-medicare-pi-program-guide_vfinal_508.pdf)):
1. Use ONC-certified health IT meeting the CEHRT definition
2. Submit measure data on five objectives: Electronic Prescribing, Health Information Exchange, Provider to Patient Exchange, Public Health and Clinical Data Exchange, Protecting Patient Health Information
3. Submit electronic clinical quality measure (eCQM) data
4. Complete attestations
5. Earn a **minimum total score of 70 points**

**Payment adjustment consequences:**
- Eligible hospitals that fail: three-quarter percentage reduction of the Annual Payment Update (IPPS). For example, failing in CY 2025 results in reduced payments starting October 1, 2026 (FY 2027) ([CY 2025 PI Program Guide PDF](https://www.qualityreportingcenter.com/globalassets/2025/12/iqr/pi_cy-2025-medicare-pi-program-guide_vfinal_508.pdf)).
- CAHs that fail: Reimbursement reduced from 101% to 100% of reasonable costs ([CY 2025 PI Program Guide PDF](https://www.qualityreportingcenter.com/globalassets/2025/12/iqr/pi_cy-2025-medicare-pi-program-guide_vfinal_508.pdf)).

**Key attestation statements within the program:**
- Actions to Limit/Restrict Compatibility or Interoperability of CEHRT
- Security Risk Analysis completion
- SAFER Guides self-assessment completion

**Why this matters to the developer:** Customers choose certified products to participate in this program and avoid penalties. If your certification is suspended or terminated, your customers lose CEHRT eligibility and face payment reductions.

---

### 2.2 MIPS Promoting Interoperability (Clinicians)

**Regulatory authority:** MACRA (Medicare Access and CHIP Reauthorization Act); [QPP — Promoting Interoperability](https://qpp.cms.gov/mips/promoting-interoperability)

**Who must participate:** MIPS-eligible clinicians (physicians, nurse practitioners, etc.) unless excluded or reweighted ([QPP](https://qpp.cms.gov/mips/promoting-interoperability)).

**PI is worth 25% of the MIPS Final Score** for 2025 ([MDinteractive](https://mdinteractive.com/2025-mips-promoting-interoperability-measures)).

**Requirements for clinicians** ([QPP](https://qpp.cms.gov/mips/promoting-interoperability)):
- Collect data in CEHRT for a minimum of **180 continuous days**
- Report measures in five objectives: Electronic Prescribing, Health Information Exchange, Provider to Patient Exchange, Public Health and Clinical Data Exchange, Protect Patient Health Information
- Submit CMS EHR Certification ID from CHPL
- Complete all required measures or claim applicable exclusions (failure = zero points for category)

**Required attestation statements** ([QPP](https://qpp.cms.gov/mips/promoting-interoperability)):
- Actions to Limit/Restrict Compatibility or Interoperability of CEHRT
- ONC Direct Review Attestation
- **Security Risk Analysis Measure** (Yes/No)
- **High Priority Practices SAFER Guide Measure** (Yes/No)

**Payment adjustment consequences:**
- Poor PI score can drag overall MIPS score below 75, leading to up to **-9% Medicare Part B payment adjustment** ([KPi-Tech](https://kpitechservices.com/blogs/promoting-interoperability-compliance)).

**Why this matters to the developer:** Ambulatory clinicians are your primary customers. They need your product to support all PI measures and attestations, and they need active ONC certification through the CHPL to participate.

---

### 2.3 CEHRT Definition and Its Impact on Developers

**Regulatory reference:** [CMS — Certified EHR Technology](https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs/certified-ehr-technology)

The Certified Electronic Health Record Technology (CEHRT) definition determines what products providers may use for CMS programs:
- CEHRT functionality must be in place by the **first day** of the EHR reporting period ([CMS](https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs/certified-ehr-technology)).
- The product must be certified by ONC by the **last day** of the reporting period ([CMS](https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs/certified-ehr-technology)).
- Provider must use the certified functionality for the **full reporting period** ([CMS](https://www.cms.gov/medicare/regulations-guidance/promoting-interoperability-programs/certified-ehr-technology)).

**Developer implication:** Any lapse in certification status (suspension, termination, or withdrawal) could immediately disqualify your customers from CMS programs, creating financial exposure for both the developer and its customers.

---

### 2.4 Information Blocking Provider Disincentives

**Regulatory authority:** Section 4004 of the Cures Act; [42 CFR Parts 414, 425, and 495](https://healthit.gov/information-blocking/); [healthit.gov — Information Blocking](https://healthit.gov/information-blocking/)

**Effective:** July 1, 2024 for providers ([Holland & Knight](https://www.hklaw.com/en/insights/publications/2026/02/the-wait-is-over-information-blocking-enforcement-is-officially-here)).

**Relevance to developers:** If OIG finds a provider committed information blocking, that provider faces disincentives under Medicare. Providers will hold their EHR vendor accountable for ensuring the technology does not create information blocking exposure — particularly around patient access APIs, data export, and interoperability features. This creates a market expectation that developers proactively prevent information blocking through technology design.

---

## Part III — Non-ONC but Essential Readiness Items

These items are not part of the ONC Certification Program but directly affect audit readiness, customer requirements, and market credibility for an ambulatory EHR vendor.

### 3.1 HIPAA Security Rule and Risk Analysis

**Regulatory authority:** [45 CFR §164.308(a)(1)(ii)(A)](https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html); [HHS Guidance on Risk Analysis](https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html)

**Why it matters for EHR developers:**
- **CMS PI requires it:** Both the Medicare PI Program and MIPS PI require providers to attest to having completed a Security Risk Analysis (SRA) ([QPP](https://qpp.cms.gov/mips/promoting-interoperability)). Providers will look to their EHR vendor as a critical component of their SRA.
- **Business associate obligations:** As a cloud EHR vendor, HealthOS will be a business associate under HIPAA and must conduct its own risk analysis.
- **ONC certification context:** While ONC does not directly audit HIPAA compliance, the privacy and security certification criteria (§170.315(d)) require technical safeguards that align with the Security Rule.

**Required elements of a risk analysis** ([HHS](https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html)):
1. **Scope:** All e-PHI across all electronic media (created, received, maintained, or transmitted)
2. **Data collection:** Identify where e-PHI is stored, received, maintained, or transmitted
3. **Threat and vulnerability identification:** Reasonably anticipated threats; vulnerabilities that could lead to compromise
4. **Current security measures assessment:** Evaluate existing safeguards
5. **Likelihood determination:** Probability of each threat occurrence
6. **Impact determination:** Magnitude of harm from each threat-vulnerability pair
7. **Risk level determination:** Combined risk scoring; list corrective actions
8. **Documentation:** Written methodology, asset inventory, data flow diagrams, risk register, remediation roadmap

**Ongoing obligation:** Risk analysis is continuous — must be reviewed and updated in response to environmental or operational changes ([HHS](https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html)).

**Tools:** ONC and OCR jointly developed the [HIPAA Security Risk Assessment (SRA) Tool](https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html) for small and medium practices.

**Developer action items:**
- Conduct and document a comprehensive SRA for your organization
- Maintain a risk register with assigned owners and remediation timelines
- Support your customers' SRA efforts by providing documentation of your security controls (SOC 2 Type II, etc.)
- Retain all documentation for a minimum of 6 years per HIPAA requirements

---

### 3.2 SAFER Guides

**Primary reference:** [ASTP/ONC SAFER Guides](https://healthit.gov/clinical-quality-and-safety/safer-guides/); [JAMIA — Revisions to the SAFER Guides](https://pmc.ncbi.nlm.nih.gov/articles/PMC12005625/)

**What they are:** The Safety Assurance Factors for EHR Resilience (SAFER) Guides are self-assessment tools for healthcare organizations to evaluate their EHR safety practices, identify risks, and take action to mitigate those risks. Originally released in 2014, last updated in 2016, and most recently revised in **2025** ([healthit.gov](https://healthit.gov/clinical-quality-and-safety/safer-guides/); [JAMIA](https://pmc.ncbi.nlm.nih.gov/articles/PMC12005625/)).

**The 2025 SAFER Guides** consist of eight guides in three groups ([healthit.gov](https://healthit.gov/clinical-quality-and-safety/safer-guides/)):

| Group | Guide | Focus |
|---|---|---|
| **Foundational** | High Priority Practices | 16 key recommendations for clinicians |
| **Foundational** | Organizational Responsibilities | Individual/organizational duties; includes AI-enabled systems |
| **Infrastructure** | Contingency Planning | Planned/unplanned EHR unavailability |
| **Infrastructure** | System Management | Configuration, validation, maintenance of hardware/software/APIs |
| **Clinical Process** | Patient Identification | Reliable patient identification in EHR |
| **Clinical Process** | CPOE with Decision Support | Order design, alerts, CDS monitoring |
| **Clinical Process** | Test Results Reporting & Follow-Up | Test result communication and management |
| **Clinical Process** | Clinician Communication | Messaging, care transitions, patient portals |

**CMS program requirement:**
- Since 2022, CMS requires all hospitals participating in the Medicare Promoting Interoperability Program to **attest annually** to having reviewed all SAFER Guides ([CMS SAFER Guides Infographic PDF](https://www.cms.gov/files/document/cms-safer-guides-infographic-2023.pdf); [JAMIA](https://pmc.ncbi.nlm.nih.gov/articles/PMC12005625/)).
- Under MIPS, the **High Priority Practices SAFER Guide Measure** is a required Yes/No attestation ([QPP](https://qpp.cms.gov/mips/promoting-interoperability)).
- The 2025 SAFER Guides were released for use in the **2026 MIPS attestation cycle** ([JAMIA](https://pmc.ncbi.nlm.nih.gov/articles/PMC12005625/)).

**Why this matters to the developer:**
- While SAFER Guides are directed at healthcare organizations (not developers), providers will expect their EHR vendor to support the recommended practices.
- The 2025 revision includes new AI-related guidance in the Organizational Responsibilities guide ([healthit.gov](https://healthit.gov/clinical-quality-and-safety/safer-guides/)).
- System Management guide recommendations directly address EHR configuration, validation, and API maintenance — all of which the vendor influences.
- Supporting SAFER Guides compliance can be a market differentiator for ambulatory EHR products.

**Developer action items:**
- Review all eight 2025 SAFER Guides for recommendations that depend on vendor-provided functionality
- Provide customers with documentation and tools to complete SAFER self-assessments
- Ensure your product supports contingency planning features (offline access, data backup/restore)
- Address AI safety recommendations if incorporating clinical decision support or AI features

---

### 3.3 HIPAA Privacy Rule Considerations

**Regulatory authority:** [45 CFR Parts 160 and 164, Subparts A and E](https://www.hhs.gov/hipaa/for-professionals/privacy/index.html)

**Relevance to a certified EHR developer:**
- The EHI definition used in ONC certification (§170.102) is aligned with HIPAA's concept of the designated record set — EHI means ePHI as defined in 45 CFR 160.103 to the extent it would be included in a designated record set ([healthit.gov — b(10) CCG](https://healthit.gov/test-method/electronic-health-information-export/)).
- Patient access rights under HIPAA (45 CFR 164.524) overlap with the information blocking prohibition — a patient's HIPAA right of access is separate from but reinforced by the Cures Act.
- As a business associate, the developer must enter into Business Associate Agreements (BAAs) with covered entity customers.

---

### 3.4 HITECH Act and Breach Notification

**Regulatory authority:** [HITECH Act](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html); [45 CFR Parts 160 and 164, Subpart D](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html)

**Relevance:**
- Business associates (including EHR vendors) must notify covered entities of breaches of unsecured PHI **without unreasonable delay** and no later than **60 days** after discovery.
- Covered entities must then notify affected individuals (without unreasonable delay, within 60 days), HHS, and potentially media.
- Breach notification obligations interact with the Security Rule risk analysis — a current, accurate SRA helps demonstrate reasonable security measures.

---

## Summary: Obligation Categories at a Glance

### ONC Certification Program (Direct Developer Obligations)

| Obligation | Frequency | Key Citation |
|---|---|---|
| Information Blocking compliance | Ongoing | §170.401; 45 CFR Part 171 |
| Assurances (EHI Export, record retention, updates) | Ongoing | §170.402 |
| Communications (no gag clauses) | Ongoing + annual notice | §170.403 |
| API (documentation, fees, service base URL) | Ongoing | §170.404 |
| Real World Testing (plan + results) | Annual | §170.405 |
| Attestations | Semiannual (April + October) | §170.406 |
| Insights reporting | Annual (starting July 2027) | §170.407 |
| CHPL listing maintenance | Ongoing | §170.523 |
| Direct Review readiness | Ongoing | §170.580 |

### CMS/Provider-Use Dependencies (Indirect Developer Obligations)

| Obligation | Relevance |
|---|---|
| CEHRT definition maintenance | Customers lose PI eligibility if certification lapses |
| PI measure support | Product must enable all required measures/attestations |
| Security Risk Analysis support | Customers must attest; vendor is part of their assessment |
| SAFER Guides support | Customers must attest to annual self-assessment |
| Information blocking interoperability | Customers face disincentives; look to vendor for compliance |

### Non-ONC Essential Readiness

| Item | Frequency | Key Citation |
|---|---|---|
| HIPAA Security Rule risk analysis | Ongoing (at least annual) | §164.308(a)(1)(ii)(A) |
| HIPAA Privacy Rule compliance (BAAs) | Ongoing | 45 CFR Parts 160, 164 |
| Breach notification preparedness | Event-driven | HITECH Act; 45 CFR 164 Subpart D |
| SAFER Guides self-assessment support | Annual (customer obligation) | CMS PI Program; MIPS |
| SOC 2 / security certification | Annual (market expectation) | N/A (voluntary but expected) |

---

## Key Upcoming Dates (2026–2029)

| Date | Obligation |
|---|---|
| March 15, 2026 | RWT results due for (g)(7)–(10) modules (CY 2025 data) |
| March 1, 2026 | HTI-1 criteria update deadline (extended from Jan 1) |
| April 30, 2026 | Semiannual attestation window (covering Oct 2025–Mar 2026) |
| October 31, 2026 | Semiannual attestation window (covering Apr–Sep 2026) |
| December 31, 2026 | RWT and eCR enforcement discretion currently expires |
| July 2027 | Insights Condition Phase 1 measures begin (FHIR app measure only under enforcement discretion) |
| July 2028 | Insights Condition Phase 2 measures begin |
| July 2029 | Insights Condition Phase 3 measures begin |

---

*This report uses official primary sources from healthit.gov, CMS.gov, HHS.gov, eCFR.gov, OIG.hhs.gov, and QPP.cms.gov. Secondary sources are cited only for enforcement developments and analysis. All URLs verified as of March 15, 2026.*
