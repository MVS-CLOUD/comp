# HealthOS ONC Package Verification Memo

Prepared: 2026-03-15
Purpose: Record the verification sweep performed after the initial package was created, including confirmed coverage, corrections made, and residual watch items.

## What was verified

The package was rechecked against current official sources for:
- Full active certification criterion inventory in 45 CFR §170.315
- Current Base EHR definition in 45 CFR §170.102
- Current Conditions and Maintenance of Certification
- Current Real World Testing scope and timing
- Current Attestations cadence and scope
- Active enforcement discretion notices
- Current ONC guide language relevant to sex and related USCDI-linked elements in the standardized API companion-guide page

## Official sources used in the verification sweep

- https://www.law.cornell.edu/cfr/text/45/170.315
- https://www.law.cornell.edu/cfr/text/45/170.102
- https://www.healthit.gov/certification-health-it/conditions-ccg/
- https://www.healthit.gov/certification-health-it/conditions-ccg/real-world-testing/
- https://www.healthit.gov/certification-health-it/conditions-ccg/attestations/
- https://www.healthit.gov/certification-health-it/enforcement-discretion-notices/
- https://www.healthit.gov/test-method/standardized-api-patient-and-population-services/
- https://www.healthit.gov/certification-health-it/onc-health-it-certification-program-test-method/
- https://www.healthit.gov/certification-health-it/certification-process/onc-conformance-test-tools/

## Corrections made

1. The Notion requirements database did not fully represent every active criterion in §170.315. It originally covered 46 criteria. A coverage diff against the official rule inventory identified 13 missing active criteria.
2. The missing active criteria were added to the Notion requirements database:
- §170.315(b)(7)
- §170.315(b)(8)
- §170.315(d)(4)
- §170.315(d)(6)
- §170.315(d)(8)
- §170.315(d)(10)
- §170.315(d)(11)
- §170.315(f)(3)
- §170.315(f)(4)
- §170.315(f)(6)
- §170.315(f)(7)
- §170.315(h)(2)
- §170.315(j)(21)
3. After patching, the Notion requirements database was revalidated and now covers all 59 active certification criteria currently listed in §170.315.
4. The Notion workspace blueprint was corrected to state 59 active certification criteria rather than 46.
5. The master audit matrix language around sex and related USCDI-linked elements was tightened to reflect the latest official guide/discretion posture rather than overstate the certainty of permanent regulatory removal.

## Current confidence statement

This hardened package now appears complete against the current active ONC certification criteria universe and the major current program obligations that were checked during this verification sweep.

## Remaining live-watch items

These are not omissions in the package, but moving targets that require continued monitoring:
- HTI-5 proposed deregulatory rule status
- Expiration or revision of active enforcement discretion notices
- Future changes to companion-guide language and ONC testing guidance
- CMS PI / CEHRT dependencies for future program years
- Future public availability or changes to specific ONC test tooling

## Practical conclusion

This package is now materially stronger than the original version because the criterion inventory was explicitly diffed against the current official source and corrected. The remaining risk is not a known missing current criterion but future regulatory movement or interpretive changes after the verification date.
