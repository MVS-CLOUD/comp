# HealthOS ONC Certification Research and Audit Workspace Handoff

Prepared: 2026-03-15
Scope: Full ambulatory EHR, broad ONC-ready platform

## What is included

This package was built to support a continuous internal audit and certification-readiness program for HealthOS. It includes:

- A validated research base covering current ONC Health IT Certification Program requirements, testing expectations, and ongoing developer obligations.
- A master audit matrix with auditable requirements, evidence expectations, owners, dates, and failure risks.
- A Notion workspace blueprint with six import-ready databases populated with starter records.
- A verification memo documenting the formal post-build coverage diff, corrections made, and remaining live-watch items.

## Core files

Research base:
- /home/user/workspace/onc_official_rules.md
- /home/user/workspace/onc_testing_evidence.md
- /home/user/workspace/onc_ongoing_obligations.md

Audit system:
- /home/user/workspace/onc_master_audit_matrix.md
- /home/user/workspace/onc_master_audit_matrix.csv

Notion package:
- /home/user/workspace/notion_workspace_blueprint.md
- /home/user/workspace/notion_db_requirements.csv
- /home/user/workspace/notion_db_controls.csv
- /home/user/workspace/notion_db_evidence.csv
- /home/user/workspace/notion_db_tests.csv
- /home/user/workspace/notion_db_obligations.csv
- /home/user/workspace/notion_db_decisions.csv
- /home/user/workspace/healthos_onc_verification_memo.md

## Key findings

A post-build verification sweep was completed after the initial package. That sweep diffed the Notion requirements database against the current official §170.315 inventory and corrected missing active criteria so the requirements database now covers all 59 active current certification criteria.

1. ONC certification remains modular, but for a practical ambulatory EHR offering HealthOS should plan against the full Base EHR set, the additional CEHRT requirements relevant to MIPS, and several market-critical criteria not strictly required by Base EHR alone.
2. The most important current moving targets are HTI-1 update adoption, active enforcement discretion notices, the HTI-4 ePrescribing / RTPB path toward Jan 1 2028 Base EHR changes, and the still-proposed HTI-5 deregulatory rule.
3. Conditions and Maintenance of Certification are as important as the criterion tests. The audit system must track attestation, real world testing, API condition compliance, communications restrictions, assurances, information blocking risk, and CHPL maintenance continuously.
4. Some obligations are not strictly ONC certification criteria but are necessary for product readiness and customer adoption, especially HIPAA security risk analysis support, SAFER alignment, breach readiness, and provider-use dependencies for CMS programs.

## Priority actions for HealthOS

Immediate:
- Review the Requirements and Controls import files and align each item to an internal owner.
- Stand up the Notion workspace and import the six CSV databases.
- Confirm current HealthOS scope against each Tier 1 requirement.
- Create evidence placeholders for every active Tier 1 criterion and each ongoing obligation.

Next:
- Build a release-gated certification evidence process for FHIR APIs, C-CDA outputs, ePrescribing, CQMs, audit logging, and DSI transparency artifacts.
- Establish semiannual attestation and annual real-world-testing workflows in Notion.
- Create an information blocking review process with exception documentation and fee/contract review.
- Track the HTI-5 proposed rule separately so you can adapt if it is finalized without prematurely de-scoping current obligations.

## Important assumptions

- Scope was optimized for a full ambulatory EHR rather than a narrow module-only certification path.
- This package prioritizes official primary sources and current rules in force as of 2026-03-15.
- Some future items remain uncertain and should be tracked rather than treated as current law, especially HTI-5.

## Known limitation

Direct creation of the Notion workspace could not be completed because the Notion integration lookup repeatedly timed out during this session. The import-ready package is complete and can be loaded manually into Notion immediately, or I can try direct publishing again later if the integration is responsive.
