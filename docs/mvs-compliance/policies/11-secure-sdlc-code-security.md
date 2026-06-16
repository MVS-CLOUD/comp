---
status: draft
frequency: yearly
department: eng
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Secure Software Development Lifecycle"
frameworks: [soc2, hipaa_security]
maps: { soc2: [CC8.1, CC7.1], hipaa: ["164.308(a)(8)", "164.308(a)(5)(ii)(B)"] }
---

# Secure SDLC / Code Security Policy

> DRAFT for human approval.

## 1. Purpose

Embed security throughout the software development lifecycle so vulnerabilities are prevented,
detected, and remediated before reaching production.

## 2. Scope

All MVS application code, IaC, container images, and dependencies.

## 3. Policy

1. **SAST & secret scanning (CC7.1):** CodeQL (JS/TS weekly), gitleaks, Aikido changed-file
   scan run on every change. *Open:* CodeQL Python NOT-STARTED (GAP_MATRIX #20).
2. **IaC & image scanning:** Trivy config-scan in `unified-deploy.yml`. *Open P0:* Trivy
   **image scan** NOT-STARTED (GAP_MATRIX #39).
3. **SBOM (§164.308(a)(8)):** `security:sbom` generates a CycloneDX SBOM in CI
   (`artifacts/security/repo-sbom.cyclonedx.json`); per-image SBOM IN-PROGRESS (GAP_MATRIX #19).
4. **Dependency management (§164.308(a)(5)(ii)(B)):** Dependabot + auto-merge; `.trivyignore`
   governed. *Open:* `pnpm audit` gate NOT-STARTED (GAP_MATRIX #38).
5. **Image signing:** cosign signing + Kyverno `verifyImages` is the target state
   (GAP_MATRIX #18 — NOT-STARTED P0).
6. **Code review & branch protection:** required reviews + passing checks before merge.

## 4. MVS tailoring

- The pipeline evidence streams into Comp via the `healthos-repo` integration provider
  (`code-scanning` check) once connected.

## 5. Evidence

CI run logs; SBOM artifact; scan results; Dependabot PR history; branch-protection config.
