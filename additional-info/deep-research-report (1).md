# Feasibility of Reworking Comp AI Into an Internal AI-Powered Audit and Continuous Compliance Platform

**1. Direct answer**

**Is this feasible or not?**  
Yes—**feasible as a foundation** for an internal “compliance system of record” (controls, evidence, policies, tasks, audit exports) **and** as a launchpad for continuous evidence collection. The Comp AI repository already demonstrates the core building blocks you need: a multi-app monorepo, a database package, workflow/job orchestration patterns, and an “evidence automation” intent. citeturn1view0turn3view1turn2view2turn8view2turn0search10

**What is the best high-level strategy?**  
Adopt Comp AI as the **GRC core + evidence ledger** (controls/frameworks → evidence objects → remediation tasks → exports) and build a **separate scanner/collector layer** (code, infra, API/runtime) that continuously writes structured evidence into Comp AI. Keep “certification artifacts” and “partner readiness proof” as first-class evidence packages, but treat external certification/testing and partner sign-off as non-automatable gates. citeturn0search0turn0search9turn31search1turn31search8

**Expected level of customization**  
**High.** Comp AI can accelerate the “compliance platform plumbing,” but:  
- **Healthcare-specific readiness (ONC/SMART)** and **DoseSpot readiness** require substantial custom controls, automated tests, and evidence packaging, plus human review. citeturn0search0turn0search2turn0search4turn31search8  
- Out-of-the-box “self-hosting” still expects third-party SaaS for workflows and email (Trigger.dev Cloud and Resend) and uses cloud-oriented components (e.g., Upstash), which you may need to replace depending on internal data-handling constraints. citeturn2view2turn3view1turn8view0turn12view2  
- If you ever expose this to external customers, the AGPL network-copyleft trigger becomes a major decision point. citeturn10view2turn6search0  

---

## Verified foundation

Before recommendations, here are the “verified facts vs assumptions vs unknowns” and the primary sources used.

### Verified facts

| Verified fact | Evidence |
|---|---|
| Comp AI positions itself as an open-source compliance automation platform (a entity["company","Vanta","compliance automation platform"] / entity["company","Drata","compliance automation platform"] alternative), with a public monorepo containing `apps/` and `packages/`. | citeturn1view0turn6search0 |
| The repo is a monorepo with `apps/app`, `apps/portal`, and `apps/api`. | citeturn2view0turn1view0 |
| Repo docs state it is built with Next.js, entity["company","Trigger.dev","workflow/job platform"], Prisma, Tailwind, Upstash, Vercel. | citeturn3view1 |
| Local/dev prerequisites include Node, Bun, and PostgreSQL; README instructs generating Prisma types for each app (`apps/app`, `apps/portal`, `apps/api`). | citeturn3view0 |
| Docker-based self-hosting is documented; it requires external PostgreSQL “14+ with SSL” and calls out needing accounts for entity["company","Resend","email delivery service"] and Trigger.dev Cloud “for workflows.” | citeturn2view2turn3view0 |
| `docker-compose.yml` defines `migrator`, `seeder`, `app`, and `portal` services; it expects env files under `packages/db/.env`, `apps/app/.env`, `apps/portal/.env`, and passes Better Auth URLs as build args. | citeturn8view2turn2view2 |
| `apps/api` is a NestJS app (dependencies include `@nestjs/*`) and includes AI-provider SDKs (`@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/groq`), browser automation/scraping tooling (`playwright-core`, Browserbase SDK/Stagehand, Firecrawl), and cloud security tooling (AWS clients including SecurityHub). | citeturn8view0 |
| The root repo uses Turbo and Bun; scripts include deploying Trigger.dev tasks (`npx trigger.dev@4.0.6 deploy`). | citeturn12view1turn12view2 |
| Trigger.dev config in `apps/app/trigger.config.ts` references Prisma instrumentation, puppeteer extension, sync Vercel env vars, and task directories `./src/jobs` and `./src/trigger`, implying scheduled/background evidence jobs are a first-class concept. | citeturn24view0 |
| `packages/` includes `integration-platform`, `integrations`, `db`, `auth`, `company`, `device-agent`, `kv`, `ui`, `utils`, etc. | citeturn2view1 |
| DB schema is modular: `packages/db/scripts/combine-schemas.js` concatenates a base `schema.prisma` with all `.prisma` fragments under `packages/db/prisma/schema/` and outputs `dist/schema.prisma` plus a Prisma client wrapper exported as `db`. | citeturn18view3turn18view0 |
| The schema fragment directory includes domain files named `framework.prisma`, `control.prisma`, `requirement.prisma`, `policy.prisma`, `risk.prisma`, `task.prisma`, `task-item.prisma`, `evidence-submission.prisma`, `finding.prisma`, and multiple “integration”/“automation” related schema files—indicating those objects exist in the data model (field-level details not verified). | citeturn19view0 |
| The repo license is GNU Affero GPL v3; the license text emphasizes network-server use and source availability expectations if a modified version is run for users over a network. | citeturn10view2 |
| Repo metadata describes an “Open Core” approach, where most of the repository is AGPL and a small “/ee enterprise edition” portion is commercially licensed. | citeturn6search0 |
| ONC standardized API criterion §170.315(g)(10) has a published ONC test method; as of the referenced key-dates page, some deadlines for “updating health IT modules” were extended to March 1, 2026 due to appropriations lapse. | citeturn0search0turn0search3 |
| ONC Conditions and Maintenance of Certification includes an “API Condition” at §170.404, including publishing service base URLs and related org details by Dec 31, 2024 for modules certified to §170.315(g)(10). | citeturn0search9turn0search2 |
| ONC’s API resource guide for §170.315(g)(10) includes clarifications tied to SMART App Launch and references optional PKCE usage. | citeturn0search4 |
| SMART App Launch defines discovery at `.well-known/smart-configuration` relative to a FHIR Server Base URL for authorization endpoint and capability discovery. | citeturn31search8turn31search11 |
| HIPAA Security Rule overview: it establishes standards for safeguarding electronic PHI and requires administrative, physical, and technical safeguards. | citeturn31search1 |
| HIPAA §164.312 technical safeguards include access control, audit controls, integrity, person/entity authentication, and transmission security. | citeturn31search0 |
| HIPAA §164.308 administrative safeguards include (among others) risk analysis, risk management, and information system activity review. | citeturn31search6 |
| HHS guidance emphasizes risk analysis as foundational and notes NIST guidance is commonly treated as an industry standard “good practice” for securing ePHI (even if not mandatory for non-federal orgs). | citeturn31search3 |
| Internal Linear tickets indicate DoseSpot readiness work includes (a) implementing 17 push-notification event handlers, (b) idempotent processing and duplicate-avoidance, and (c) FHIR mapping/status-map verification via RXT01–RXT16 test scenarios. | fileciteturn4file11L1-L1 fileciteturn4file17L1-L1 fileciteturn4file18L1-L1 |
| Internal Linear tickets describe an initiative for HIPAA-compliant secure messaging, including encryption at rest, audit trails, retention, secure delivery, and compliance reporting. | fileciteturn8file0L1-L1 |

### Assumptions

These are plausible but **not verified from the Comp AI repo content we could successfully fetch** or from primary partner/regulatory documentation in this session:

| Assumption | Why it matters |
|---|---|
| Your internal deployment must avoid sending any compliance evidence or metadata to external SaaS (workflow/email/vector DB). | Drives whether you keep Comp AI’s default Trigger.dev Cloud + Resend dependencies or replace them. citeturn2view2turn8view0 |
| Your target “internal audit tool” will need to evaluate both “product code” and “production runtime behavior,” not just documentation evidence. | Drives architecture: runtime probes, API conformance checks, infra posture scanning, and release gates. |
| Your fork of Comp AI is close enough to upstream mainline to accept upstream merges safely. | Drives fork strategy and long-term maintainability. |

### Unknowns

These are **material unknowns** that block fully defensible architecture decisions:

| Unknown | Impact |
|---|---|
| Whether your internal source repos and infrastructure are accessible from this environment (GitHub connector access failed due to SAML enforcement). | Prevented repo-level verification of your platform architecture and current controls-in-code posture. |
| Whether Comp AI’s `integration-platform` and existing integrations already cover any of your needed sources (e.g., GitHub orgs, cloud accounts, scanners). | Determines how much connector work is greenfield vs extension. citeturn2view1 |
| Field-level DB model details for controls/evidence/tasks (schema fragments could not be fetched directly; only file presence is verified). | Determines how cleanly ONC/HIPAA/DoseSpot requirements map into the native model. citeturn19view0turn18view3 |
| What data you intend to store in the compliance platform (e.g., could it contain ePHI, logs with identifiers, screenshots, etc.). | Changes threat model, access controls, retention, encryption, and audit logging requirements (and possibly HIPAA scope). citeturn31search0turn31search6 |
| DoseSpot partner documentation terms and certification evidence expectations (appears proprietary; only internal tickets available here). | Many checks are certification/partner-review dependent and must be validated against vendor requirements. fileciteturn4file11L1-L1 |

### Primary sources used

- Comp AI repository (structure, README, self-hosting doc, docker-compose, package manifests, license). citeturn1view0turn3view0turn3view1turn2view2turn8view2turn8view0turn10view2turn12view1turn12view2turn19view0turn18view3  
- Trigger.dev customer story describing Comp AI’s evidence-collection approach. citeturn0search10  
- entity["organization","Office of the National Coordinator for Health Information Technology","us health it regulator"] / HealthIT.gov primary materials: §170.315(g)(10) test method; API Conditions & maintenance pages; enforcement discretion notices; API resource guide. citeturn0search0turn0search2turn0search3turn0search4turn0search9turn0search1  
- SMART App Launch specification (HL7). citeturn31search8turn31search11  
- HIPAA Security Rule primary/authoritative references (HHS overview and CFR text). citeturn31search1turn31search6turn31search0turn31search4turn31search3  
- Internal Linear issues for DoseSpot integration readiness and secure messaging requirements. fileciteturn4file11L1-L1 fileciteturn4file18L1-L1 fileciteturn8file0L1-L1  

---

## Repo-based findings and feasibility posture

**2. Repo-based findings**

### What the current codebase appears to already support

Comp AI’s structure strongly indicates it is designed as a compliance platform with:  
- **A web app and portal UI** (two Next.js apps) plus an **API backend** (`apps/api`) that uses NestJS. citeturn2view0turn8view0turn4view1turn8view2  
- **A packaged database layer** (`packages/db`) with modular schema composition and a shared Prisma client export. citeturn16view0turn18view3  
- **Workflow/job orchestration** via Trigger.dev (explicit “deploy task” scripts and a `trigger.config.ts` pointing at `src/jobs` and `src/trigger`). citeturn12view1turn24view0turn3view0  
- **Automation evidence collection tooling** consistent with “agents” and browser/API automation: Browserbase/Stagehand, playwright-core, Firecrawl, plus AI-provider SDKs. citeturn8view0turn0search10  
- **Cloud posture/evidence integration potential** (AWS SDK clients including SecurityHub). citeturn8view0  

### Key reusable modules

| Module area | Why it looks reusable | Evidence |
|---|---|---|
| Data model for controls/frameworks/tasks/evidence | Presence of multiple schema fragments named for core GRC objects (framework, control, requirement, policy, risk, task, evidence submission, finding). | citeturn19view0turn18view3 |
| Workflow engine hooks | Trigger.dev configuration and deployment scripts indicate durable scheduled jobs and retry semantics. | citeturn24view0turn12view1 |
| Backend “automation” intent | NestJS API includes AI SDKs and automation dependencies; this aligns with an agentic evidence-collection posture. | citeturn8view0turn0search10 |
| Multi-org / org lifecycle support | “organization” schema fragment exists; self-hosting doc describes organization approval behavior in “self-hosted mode.” | citeturn19view0turn2view2 |
| Reporting/export surface area | API deps include `exceljs`, `xlsx`, `jspdf`, `pdf-lib`, `archiver`, suggesting built-in evidence packaging/export capabilities. | citeturn8view0 |

### Key extension points

| Extension point | What it enables | Evidence / notes |
|---|---|---|
| `packages/integration-platform` + `packages/integrations` (names verified) | Custom connectors for code, cloud, ticketing, runtime probes | Only package presence is verified; internal APIs need inspection. citeturn2view1 |
| `apps/app/src/jobs` + `apps/app/src/trigger` | Recurring evidence jobs, scheduled scans, CI-callback-driven ingestion | Verified via Trigger.dev config pointing at these dirs. citeturn24view0 |
| NestJS API (`apps/api`) | A stable ingestion plane for scanners/tests to submit evidence | Inferred from NestJS framework presence; endpoints not verified. citeturn8view0 |

### Suspected weak spots or missing capabilities

These are not criticisms—just the likely deltas between “generic GRC automation” and “healthcare certification readiness.”

| Suspected gap | Why it matters for your mission | Current evidence status |
|---|---|---|
| ONC/SMART readiness frameworks are not verified as “built-in” | You need a structured, auditable mapping to §170.315 criteria and §170.404–407 operational obligations, not only generic security frameworks. citeturn0search0turn0search9turn31search8 | Not verified in repo content we could pull; plan should treat as custom. |
| Release gating primitives are not verified | You want CI/CD “release readiness” gates driven by control/evidence state. | Not verified; requires custom pipeline integrations. |
| Removal/replace of SaaS dependencies | Self-host guide still expects Trigger.dev Cloud + Resend accounts. That may conflict with internal security/compliance posture (depending on what evidence is stored). citeturn2view2turn8view0 | Verified dependency expectation; replacement effort likely high. |
| Field-level audit trail semantics | HIPAA requires audit controls (§164.312(b)) and system activity review (§164.308(a)(1)(ii)(D)). You need strong immutability/versioning and traceability of evidence updates. citeturn31search0turn31search6 | Object presence (comment, finding, evidence submission) is verified; semantics are not. citeturn19view0 |

### Notes on maintainability and fork strategy

Comp AI is under AGPLv3. citeturn10view2 If your internal tool remains **strictly internal** and not exposed to external customers, AGPL risk is typically lower; if you expose it externally (customer portal, auditors outside your org accessing it, etc.), AGPL’s network-use provisions become operationally significant (source-availability obligations to those users). citeturn10view2 The repo also describes an “Open Core” `/ee` slice under a commercial license; plan on either (a) avoiding `/ee` entirely or (b) negotiating licensing if you need enterprise-only features. citeturn6search0  

---

## Feasibility and mapping tables

**3. Feasibility matrix**

| capability | current support in repo | extension difficulty (low/medium/high) | confidence level | notes/evidence needed |
|---|---|---:|---|---|
| controls and frameworks | **Likely yes** (framework/control/requirement schema fragments exist) | Medium | Medium | Need field-level schema + UI flows validated. citeturn19view0turn18view3 |
| evidence collection | **Yes (platform intent)** (evidence-submission + automation* schema names, Trigger.dev jobs) | Medium–High | Medium | Verify evidence lifecycle, artifact storage, provenance/immutability. citeturn19view0turn24view0turn0search10 |
| policy management | **Likely yes** (`policy.prisma` exists) | Medium | Medium | Confirm policy versioning/attestation and access model. citeturn19view0 |
| risk register | **Likely yes** (`risk.prisma` exists) | Medium | Medium | Confirm risk scoring, acceptance, linkage to controls/evidence. citeturn19view0 |
| tasks/workflows | **Likely yes** (`task.prisma`, `task-item.prisma`) | Low–Medium | Medium | Confirm assignment, SLA, escalation. citeturn19view0 |
| integrations/connectors | **Presence verified** (`integration-platform`, `integrations`, integration-related schema files) | Medium–High | Medium–Low | Need to inspect existing connector abstractions + auth patterns. citeturn2view1turn19view0 |
| AI assistant | **Yes (components exist)** (AI SDKs in API; automation tooling) | Medium | Medium | Need to validate how/where AI is used; ensure auditability and non-repudiation. citeturn8view0turn0search10 |
| source code scanning | Not verified | Medium–High | Low | Likely integrate Semgrep/CodeQL/Trivy outputs as evidence; confirm ingestion APIs. |
| API/platform scanning | Not verified | High | Low | Requires custom runtime probes + Inferno/SMART validation harness and result ingestion. citeturn31search8turn0search0turn0search4 |
| infra scanning | **Partial signal** (AWS SecurityHub client dependency) | Medium | Medium | Need to confirm actual collectors; expand beyond AWS (K8s, containers, IaC). citeturn8view0 |
| healthcare-specific controls | Not present by default (not verified) | High | Low | Must create control library that maps to HIPAA + ONC + partner constraints. citeturn31search0turn0search0 |
| ONC readiness | Not present by default (not verified) | High | Medium | ONC requires both criteria (§170.315) and ongoing conditions (§170.404–407). citeturn0search0turn0search9turn0search2 |
| DoseSpot readiness | Not present by default (not verified) | High | Medium | Internal work indicates certification test scenarios + webhook/event handlers + idempotency. fileciteturn4file11L1-L1 |
| release gating | Not verified | Medium–High | Low | Likely implement “release gate control set” + CI check that queries control status. |
| reporting/export | **Likely yes** (PDF/Excel/zip tooling in API deps) | Medium | Medium | Need to validate templates, repeatability, tamper-evidence. citeturn8view0 |
| audit trails | Partially indicated (comment/finding/evidence-submission schema names) | Medium–High | Medium–Low | HIPAA audit controls demand stronger semantics than generic comment threads. citeturn19view0turn31search0 |
| multi-tenant or multi-team support | **Likely yes** (organization schema; self-hosting org auto-approval) | Medium | Medium | Confirm scoping model: org→team→system and RBAC. citeturn19view0turn2view2 |

**4. Compliance-to-platform mapping**

This table separates (a) **requirement area** and (b) the **internal control objective** we’d encode. It also labels what is realistically automatable.

| requirement area | internal control objective | automatable? | proposed evidence type | proposed scan/test/job | manual review needed? | notes |
|---|---|---|---|---|---|---|
| HIPAA Security Rule — risk analysis (§164.308(a)(1)(ii)(A)) | Maintain current risk analysis with documented mitigations and residual risk acceptance | Partial | Risk analysis doc + risk register links | Quarterly “risk register completeness” check; annual risk analysis workflow | Yes | HHS describes risk analysis as foundational; format is org-specific. citeturn31search3turn31search6 |
| HIPAA — audit controls (§164.312(b)) | Systems containing/using ePHI produce and retain audit logs and support review | Partial | Logging architecture + samples + retention config + alerting evidence | Continuous log coverage checks; “audit log review” attestations | Yes | HIPAA explicitly requires mechanisms to record/examine activity. citeturn31search0turn31search6 |
| HIPAA — access control (§164.312(a)) | Unique user IDs, emergency access procedure, session controls, encryption decisions documented | Partial | IAM policy + SSO config + break-glass procedure + encryption posture | Periodic IAM scan; SSO config snapshot; tabletop drill record | Yes | Required vs addressable specs must be documented. citeturn31search0turn31search4 |
| HIPAA — transmission security (§164.312(e)) | All ePHI transmissions protected (TLS, integrity controls), with documented risk-based encryption decisions | High (technical) + manual (exceptions) | TLS reports + config + pen test findings | Automated endpoint TLS checks + mTLS where required | Sometimes | Technical requirements are clear; exception handling is not fully automatable. citeturn31search0 |
| ONC §170.315(g)(10) standardized FHIR API | FHIR R4.0.1 + adopted implementation specs + SMART behavior; pass conformance tests; preserve evidence | Partial–High | Test kit output + conformance logs + configuration snapshots | Scheduled conformance test runs; publish pass/fail evidence package | Yes | ONC has a test method and companion guidance; certification still requires ONC-ACB process. citeturn0search0turn0search4 |
| ONC API Condition (§170.404) — base URL publication | Publish and validate service base URLs; monitor drift and availability | High | Published endpoint directory + monitoring logs | Daily publish/availability verification job | Some | ONC guide clarifies publication requirement and timing. citeturn0search9turn0search2 |
| ONC API Condition — documentation & terms | Developer docs/terms hyperlink exist and are current; fees comply; app registration SLAs tracked | Partial | Public docs URL + terms + fee schedule + SLA reports | Weekly documentation reachability + diff monitoring | Yes | Fee permissibility and “no special effort” interpretations often need human/legal review. citeturn0search2turn0search9 |
| SMART App Launch | `.well-known/smart-configuration` is correct; auth endpoints and supported capabilities are consistent | High | Well-known response + auth metadata + regression test logs | Hourly/daily `.well-known` + token endpoint regression tests | Sometimes | SMART discovery is explicitly defined. citeturn31search8turn31search11 |
| DoseSpot readiness | Event handlers implemented correctly; idempotency; mapping and status/verifications match required scenarios | Partial–High (tests) | Certification test run outputs + webhook replay logs | Nightly integration test suite + webhook replay harness | Yes | Internal tickets indicate concrete scenario/test IDs and webhook scope; partner documentation must be validated. fileciteturn4file11L1-L1 |
| Internal release readiness | Security + compliance gates satisfied before deploy | High | CI artifacts + vulnerability reports + “required controls pass” record | CI gate calls compliance API; blocks/alerts | Sometimes | Must ensure gate criteria tied to explicitly approved control set. citeturn31search0turn0search0 |
| Customer / enterprise trust | Produce repeatable “evidence packages” and defensible narratives for audits | Partial | Export bundles (PDF/Excel/zip) + immutable evidence IDs | Automated “audit packet build” job | Yes | Evidence packaging can be automated; interpretation and auditor dialogue cannot. citeturn8view0turn31search1 |

---

## Build recommendation and roadmap

**5. Build recommendation**

### Use as-is
| Area | Why |
|---|---|
| “Compliance spine” objects (controls/requirements/policies/risks/tasks/evidence) | Schema fragment presence strongly suggests Comp AI already models these core objects; this is the hardest “platform plumbing” to build from scratch. citeturn19view0turn18view3 |
| Evidence-job backbone (scheduling + retries) | Trigger.dev config and scripts show a production-ready background execution pattern. citeturn24view0turn12view1 |
| Evidence export primitives | PDF/Excel/zip libraries in API deps indicate intent/support for report-style exports. citeturn8view0 |

### Extend with moderate effort
| Area | What to do |
|---|---|
| Internal control frameworks (HIPAA + ONC readiness + release readiness) | Add new “framework” definitions + control libraries; use the existing DB model for mapping. For HIPAA, anchor controls to §164.308 and §164.312. citeturn31search6turn31search0turn31search4 |
| Internal SSO/auth hardening | Replace/extend Better Auth config to your IdP + enforce RBAC, break-glass, audit logging for admin actions. (Better Auth variables are present in self-hosting and docker-compose). citeturn2view2turn8view2turn8view0 |
| Scanner ingestion plane | Standardize “EvidenceResult” submissions from CI, infra scanners, runtime probes into the API. (NestJS API suggests a good place to formalize this). citeturn8view0 |

### Major custom build
| Area | Why it’s major |
|---|---|
| ONC/SMART conformance automation and evidence packaging | ONC certification readiness includes conformance testing, documentation, and ongoing obligations (API Condition, RWT, attestations, etc.). Tooling can accelerate prep but does not replace ONC-ACB certification. citeturn0search0turn0search9turn0search2turn31search8 |
| DoseSpot certification harness | Internal tickets show scenario-based validation with webhook/event requirements; partner sign-off and non-public requirements drive complexity. fileciteturn4file11L1-L1 |
| Runtime behavior scanning (platform behavior, infra, ops workflows) | Requires deploying probes safely, building fixtures, and retaining defensible, immutable evidence that’s meaningful to auditors and partners. citeturn31search0turn31search6turn0search9 |
| Replacing SaaS workflow/email dependencies | Current self-hosting guidance still expects Trigger.dev Cloud + Resend. If unacceptable, replacing scheduling + email reliably is non-trivial. citeturn2view2turn12view1 |

### Do not rely on for this purpose
| Area | Why |
|---|---|
| Fully automated “we are compliant” determinations | HIPAA and ONC both include requirements that require policy decisions, documentation, and/or external validation. Automations produce evidence; they do not replace compliance judgment or certification. citeturn31search1turn0search0turn31search3 |
| AI-generated findings without auditability controls | AI can assist, but evidence must remain traceable, reproducible, and reviewable—especially when tied to HIPAA audit controls and ONC certification narratives. citeturn31search0turn0search10 |

**6. MVP plan**

The MVP should **create immediate internal value** by making release readiness and ONC API readiness measurable, repeatable, and queryable—without trying to solve “all compliance.”

### Scope
- **One internal instance** of Comp AI as a compliance/evidence system for engineering + compliance leadership. citeturn2view2turn8view2  
- Three initial frameworks:
  - HIPAA Security Rule baseline (focus on technical safeguards + risk analysis tracking). citeturn31search0turn31search6turn31search4  
  - ONC API readiness subset around §170.315(g)(10) and §170.404 obligations (documentation, base URLs, app registration SLA tracking). citeturn0search0turn0search9turn0search4  
  - “Release readiness” framework (security + partner readiness gates) tied to CI/CD.  

### Architecture approach
- **Core platform:** Comp AI `apps/app` + `apps/api` + (optional) `apps/portal`. citeturn2view0turn8view0turn8view2  
- **Collector layer:** independent “scanner runners” (CI jobs, cron jobs, or Trigger.dev tasks) that emit normalized evidence into `apps/api`. citeturn24view0turn8view0  
- **Evidence storage:** store only what you must; avoid ingesting ePHI into the compliance platform. HIPAA imposes strong audit and transmission protections for systems that contain/use ePHI. citeturn31search0turn31search6  

### Essential data model changes (likely)
Because field-level schema wasn’t verified, these are expressed as “likely deltas”:
- Add a first-class **“System / Component / Environment”** dimension (e.g., API-prod, API-staging, infra-prod, DoseSpot integration service) to scope control applicability and evidence.  
- Add a first-class **“Release / Build / Deployment”** object (or minimally a release identifier on evidence) to support release gating and backtesting.  
- Add structured “automated check result” evidence type (status, timestamp, tool version, inputs, outputs, reproducibility pointer).

### Essential integrations
- CI ingestion (GitHub Actions or your CI tool): push SAST/SCA/container scan outputs as “Evidence” tied to release gating controls.  
- Runtime probe: scheduled check of SMART discovery endpoint and key API metadata endpoints (environment scoped). citeturn31search8turn31search11  
- Ticketing linkage: at minimum, generate tasks inside Comp AI; optionally sync to your existing workflow tool later.

### Essential jobs/scanners
- **SMART discovery & auth config check**: GET `.well-known/smart-configuration` + basic correctness checks. citeturn31search8  
- **ONC API Condition checks**: documentation URL reachability + service base URL publication checks. citeturn0search9turn0search2  
- **Security controls evidence jobs**: TLS config snapshots, audit log retention configuration snapshots, and periodic “audit log review” attestations. citeturn31search0turn31search6  

### Essential UI/workflows
- Control dashboard with “release gate control set” view.  
- Evidence review queue for compliance lead sign-off on automated evidence.  
- “Exception/waiver” workflow (risk acceptance) to prevent false binary gating.

### Expected outputs/evidence
- Release readiness report per release (pass/fail + links to supporting evidence artifacts).  
- ONC API readiness report (g(10) conformance jobs results + API Condition artifacts). citeturn0search0turn0search9  
- HIPAA technical safeguards evidence bundle for internal audit readiness. citeturn31search0turn31search4  

**7. Phase 2 plan**

Phase 2 extends from “MVP gating + baseline evidence” into “continuous certification readiness + partner readiness automation.”

### Richer automation
- Add deeper ONC readiness: incorporate additional §170.315 criteria beyond g(10), plus ongoing obligations: §170.405 Real World Testing, §170.406 Attestations, §170.407 Insights. citeturn0search2turn0search9turn0search3  
- Implement automated drift detection:
  - detect changes to auth server config, scopes, token lifetimes, and FHIR capability statements;
  - detect documentation and fee/terms changes.

### Smarter AI review
Use AI only where outputs can be reviewed, reproduced, and tied to hard artifacts:
- “diff-to-controls” summarization on PRs (flag likely control breaches, generate suggested evidence gaps).  
- “evidence gap analysis” on controls with missing/expiring evidence, generating prioritized tasks.  
Back this with strict auditability (prompt/version tracking, reviewer sign-off). citeturn8view0turn0search10  

### Broader framework mapping
- Expand HIPAA mapping from technical safeguards to administrative and physical safeguards tracking (training, sanctions, IR plan, contingency planning). citeturn31search6turn31search4  
- Add an explicit “Information Blocking readiness” workflow tied to the ONC conditions structure (documentation, exception rationale capture, periodic review). citeturn0search2turn0search9  

### Better dashboards/reporting
- Auditor-style “packet builder” that produces: scope statement, control narrative, evidence index, and immutable evidence artifact bundle. citeturn8view0  

### Release gating
- Separate “hard blocks” (e.g., critical vulnerability unresolved, missing logging evidence) from “soft blocks” (manual review pending) to avoid engineering deadlocks.

### Customer/auditor-facing evidence packaging
Only if you decide to publish externally—and then the AGPL posture and data exposure model must be revisited. citeturn10view2  

---

## Information required, risks, blockers, and open questions

**8. Information required from us**

### Product/platform
- System inventory: services, environments, data flows, where ePHI exists, and which components are in certification scope. citeturn31search1  
- FHIR/SMART scope: FHIR base URLs, auth server(s), supported launch types, token policies, and current `.well-known/smart-configuration` output. citeturn31search8turn0search4  
- ONC certification strategy: “full ambulatory EHR” vs narrower module strategy; timeline relative to known ONC dates and enforcement discretion windows. citeturn0search0turn0search3turn0search1  

### Engineering/repo
- Repo topology and CI/CD: where scans run today; how releases are created; what constitutes “release readiness.”  
- Current security tooling: SAST/SCA, container scanning, IaC scanning, secret scanning, and how outputs are stored.

### Infrastructure/devops
- Cloud inventory (AWS/Azure/GCP/K8s/OpenStack): what APIs are available for evidence collection and whether SecurityHub (or equivalent) is in use. citeturn8view0  
- Logging/monitoring stack (SIEM, retention policies, alerting); required evidence for HIPAA audit controls and activity review. citeturn31search0turn31search6  

### Compliance/legal
- HIPAA role clarity: Covered Entity vs Business Associate obligations, BAA posture, and what “in scope” means for this internal tool. citeturn31search1turn31search6  
- Decisions on storing artifacts that may contain sensitive data (screenshots, logs with identifiers).  
- AGPL posture decision: internal-only vs external access; if external, do you accept AGPL obligations or need alternative licensing. citeturn10view2  

### Partner/vendor
- DoseSpot partner documentation and certification checklist (the authoritative source for what is required). Internal understanding suggests webhook/event + scenario-based validation, but needs confirmation. fileciteturn4file11L1-L1  
- Any other partner contractual requirements that must become control objectives.

### Timelines/business goals
- Target go-to-market date and which compliance claims must be supportable by that date.  
- Whether “ONC readiness” is prep-for-certification vs active certification pursuit (changes evidence standards significantly). citeturn0search0  

**9. Risks and blockers**

| category | risk | why it matters | mitigation |
|---|---|---|---|
| Technical | Evidence collectors become brittle (runtime probes, browser automations) | False negatives/positives erode trust and create operational load | Prefer API-level evidence; use browser automation only as fallback; add retries and “human review required” states. citeturn0search10turn24view0 |
| Technical | SaaS dependencies in “self-hosted” deployment | Data residency/security posture may not allow 3rd-party workflow/email | Decide early: accept Trigger.dev Cloud + Resend or replace with internal equivalents. citeturn2view2 |
| Legal/licensing | AGPL network copyleft if exposed externally | If customers/auditors outside your org interact with the modified platform over a network, you may need to provide source to those users | Keep internal-only, or plan licensing strategy. citeturn10view2 |
| Compliance interpretation | Mistaking “automation evidence” for “certification compliance” | ONC certification requires ONC-ACB testing/attestation; HIPAA requires documented decisions for addressable specs and operational controls | Encode “manual/certification-required” gates explicitly; never auto-claim compliance. citeturn0search0turn31search0turn31search3 |
| Data quality | Evidence without provenance/immutability | Auditors and partners need defensible, reproducible evidence | Make evidence immutable (append-only), versioned, and reviewer-signed. Tie to HIPAA audit needs. citeturn31search0turn31search6 |
| Operational | Compliance tool becomes a bottleneck for releases | Overly strict gates can stall engineering | Separate “hard blocks” vs “soft blocks,” add waiver workflows, and ensure control set is explicitly approved. |
| False sense of automation | “Dashboard green” masks missing scope | If scope is wrong, “passing” posture is meaningless | Require explicit scope declarations per framework + regular scope review. citeturn31search3turn0search9 |

**10. Open questions**

1. Will this system be **strictly internal**, or will any external parties (customers, auditors, partners) have interactive access? (This drives the AGPL decision and data exposure model.) citeturn10view2  
2. Are Trigger.dev Cloud and Resend acceptable dependencies for your internal compliance posture, or must all workflows/email remain in-house? citeturn2view2  
3. What is your ONC goal: “readiness tracking” or pursuing certification for specific modules (e.g., §170.315(g)(10)) on a defined timeline? citeturn0search0turn0search3  
4. What are the *authoritative* DoseSpot partner requirements and certification steps you must pass (beyond the internal scenario/test references)? fileciteturn4file11L1-L1  
5. What is the minimum “release readiness” gate that leadership will accept as valuable (e.g., SAST clean + SMART discovery checks + audit log retention proof), and what gates must remain manual? citeturn31search0turn31search8