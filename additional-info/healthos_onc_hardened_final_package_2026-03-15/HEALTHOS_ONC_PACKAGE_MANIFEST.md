# HealthOS ONC Certification Package Manifest

Prepared: 2026-03-15
Scope: Full ambulatory EHR / broad ONC-ready HealthOS platform

## Included files

### Core handoff
- healthos_onc_handoff_summary.md
- HEALTHOS_ONC_PACKAGE_MANIFEST.md

### Master audit system
- onc_master_audit_matrix.md
- onc_master_audit_matrix.csv

### Notion workspace package
- notion_workspace_blueprint.md
- notion_db_requirements.csv
- notion_db_controls.csv
- notion_db_evidence.csv
- notion_db_tests.csv
- notion_db_obligations.csv
- notion_db_decisions.csv

### Verification hardening
- healthos_onc_verification_memo.md

### Source research base
- onc_official_rules.md
- onc_testing_evidence.md
- onc_ongoing_obligations.md

## Intended use

1. Read the handoff summary first.
2. Review the master audit matrix.
3. Import the Notion CSV files and build relations per the Notion workspace blueprint.
4. Use the research base as the citation and detail layer behind each requirement.

## Important notes

- Scope was optimized for a full ambulatory EHR rather than a narrow module-only certification strategy.
- The package reflects rules and guidance researched as of 2026-03-15.
- Proposed deregulatory changes such as HTI-5 should be tracked separately until finalized.
- Direct Notion publishing was deferred because connector discovery was unstable during this session; the import package is complete and ready for use.
- A post-build verification sweep corrected the Notion requirements database to cover all 59 active current certification criteria in §170.315.
