# HealthOS Internal Compliance Platform Foundation Plan

> **For Claude:** This is a research and design plan, not an implementation checklist. Use the repo evidence and `additional-info` package as the primary grounding for future execution.

**Goal:** Determine the safest, fastest, and most defensible way to use this Comp AI fork as the foundation for an internal AI-powered audit, compliance, certification-prep, and release-readiness platform for a healthcare product environment, while maximizing reuse of Comp AI's native AI and workflow surface area.

**Architecture:** Use Comp AI as the full internal operating system: control plane, evidence ledger, workflow engine, operator UI, AI assistant surface, policy generation surface, questionnaire/trust workflow surface, and automation substrate. Add a healthcare-specific deterministic check and release-gating layer inside that operating model, while keeping AI aggressive for generation/orchestration/review assistance and keeping release authority, certification, partner approval, and legal/compliance sign-off explicit and human-controlled.

**Tech Stack:** `apps/api` (NestJS), `apps/app` (Next.js), `apps/portal`, Prisma, Better Auth, Trigger.dev, Resend, Browserbase/Stagehand, Upstash Vector, Vercel AI SDK, `packages/integration-platform`, `packages/integrations`.

---

## 1. Direct Answer

### Is this feasible or not?

Yes, as a **foundation**.

No, as a near-zero-customization solution.

The repo already has strong reusable primitives for:

- multi-tenant compliance objects
- controls, policies, risks, tasks, findings, and evidence submissions
- recurring jobs and scheduled automations
- deterministic integration checks with structured evidence and remediation
- audit logging and role-based access control
- evidence export and packaging surfaces

It does **not** already provide a complete healthcare-ready release gate, ONC certification-prep engine, SMART on FHIR conformance harness, DoseSpot readiness engine, or a trustworthy deterministic source of release truth out of the box.

### What is the best high-level strategy?

Use Comp AI as:

- the **system of record** for requirements, controls, evidence, findings, tasks, and approvals
- the **primary internal operator UI** for readiness tracking, evidence review, remediation, approvals, trust workflows, and release operations
- the **workflow substrate** for recurring jobs, evidence collection, browser automations, and evidence packaging
- the **AI-native workspace** for drafting, proposal generation, review assistance, and operational copiloting

Build into it:

- a **healthcare-specific deterministic check layer**
- a **release-gating domain** with explicit gate rules and evidence snapshots
- **importers/mappings** for ONC, HIPAA, SMART, partner, and internal release requirements
- stronger evidence typing so AI-assisted artifacts, deterministic evidence, manual attestations, and external validations are clearly separated

Use AI aggressively for:

- drafting
- summarization
- proposal generation
- orchestration assistance
- review assistance
- low-trust evidence assistance

Do **not** let AI outputs autonomously green-light releases, compliance, partner readiness, or certification readiness.

### What is the expected level of customization?

**High**, but focused.

- **Low/Moderate customization** for adapting Comp AI's generic GRC primitives to healthcare requirements.
- **High customization** for deterministic release-gating, SMART/FHIR validation, ONC evidence packaging, partner readiness, and external-system integrations.
- **Mandatory human/external work** remains for certification testing, ONC-ACB/ATL processes, legal review, HIPAA risk analysis sign-off, and partner approval.

## 2. Repo-Based Findings

### Verified facts

#### Monorepo and platform shape

- Root `package.json` defines a Bun + Turbo monorepo with `apps/*` and `packages/*`.
- `apps/api` is a NestJS API with modules for `controls`, `policies`, `risks`, `tasks`, `findings`, `frameworks`, `questionnaire`, `knowledge-base`, `soa`, `integration-platform`, `cloud-security`, `browserbase`, `audit`, `evidence-forms`, and `assistant-chat`.
- `apps/app` is the main internal Next.js app.
- `apps/portal` is a secondary app for limited/self-service flows.
- `packages/db` contains split Prisma schema files combined into a generated shared schema.
- `packages/auth` is the RBAC source of truth.
- `packages/integration-platform` provides deterministic integration checks.
- `packages/integrations` appears to hold provider-specific integrations.

#### Core reusable data model

Verified Prisma models and closely related objects include:

- `Control`
- `Policy`
- `PolicyVersion`
- `Risk`
- `Task`
- `Finding`
- `EvidenceSubmission`
- `FrameworkInstance`
- `RequirementMap`
- `IntegrationProvider`
- `IntegrationConnection`
- `IntegrationRun`
- `IntegrationCheckRun`
- `IntegrationCheckResult`
- `EvidenceAutomation`
- `EvidenceAutomationVersion`
- `EvidenceAutomationRun`
- `BrowserbaseContext`
- `BrowserAutomation`
- `BrowserAutomationRun`
- `Organization`
- `Member`
- `OrganizationRole`
- `AuditLog`

#### Auth, tenancy, and audit trail

- Better Auth is configured in `apps/api`.
- The organization plugin is enabled with dynamic access control for custom roles.
- Sessions store `activeOrganizationId`.
- The API uses a `HybridAuthGuard` with API key, service token, then session auth.
- The `AuditLogInterceptor` persists mutation audit events when permission metadata is present.
- Permissions are resource/action based and defined in `packages/auth/src/permissions.ts`.

#### Workflow and automation substrate

- `apps/api/trigger.config.ts` and `apps/app/trigger.config.ts` confirm Trigger.dev is a first-class execution layer.
- The repo contains recurring jobs for integrations, vector sync, browser automation, cloud security, vendor risk assessment, questionnaire work, policy regeneration, email, and onboarding.
- Browser automation is implemented through Browserbase + Stagehand and stores run metadata and screenshots.
- The deterministic integration check model is explicit: checks call `ctx.pass()` and `ctx.fail()`, attach evidence JSON, and can `taskMapping` into task auto-completion.

#### AI usage already in the repo

Verified AI-assisted surfaces include:

- assistant chat in the main app
- AI policy editing chat
- policy regeneration tasks
- questionnaire parsing
- questionnaire answer generation
- SOA answer generation
- evidence-form analysis
- auditor-content generation
- vendor risk normalization
- AI-assisted task/integration suggestions
- vector-store retrieval over policies, context, manual answers, and knowledge-base documents

#### Existing deterministic automation primitives

The strongest deterministic primitives already present are:

- integration manifests and check runners in `packages/integration-platform`
- structured check evidence and remediation
- persisted check runs/results
- task auto-completion mappings
- cloud security scan endpoints
- task evidence export endpoints

### What the current codebase already appears to support well

- Generic compliance program operations
- Internal evidence tracking
- Recurring operational tasks
- Audit/export workflows
- Multi-role, multi-organization access control
- Integration-based deterministic checks for external services
- Scheduled evidence jobs

### Key reusable modules

| Area | Reusable now | Why it matters |
|---|---|---|
| `packages/db` | Yes | Gives a mature GRC data backbone instead of rebuilding controls/tasks/evidence from scratch |
| `packages/auth` | Yes | Already models roles, permissions, and organization-scoped custom access |
| `packages/integration-platform` | Yes | Best existing foundation for deterministic release/readiness checks |
| `apps/api/src/audit` | Yes | Strong starting point for evidence/audit traceability |
| `apps/api/src/tasks/evidence-export` | Yes | Useful for audit packets and release evidence bundles |
| `apps/api/src/browserbase` | Partial | Good fallback collector, but not strong enough to be the primary gate mechanism |
| `apps/api/src/questionnaire`, `soa`, `knowledge-base` | Partial | Useful for trust workflows and document support, but not gate truth |

### Key extension points

| Extension point | Use |
|---|---|
| New Prisma schema fragment | Release-readiness, evidence packet, attestation, external validation models |
| New integration manifests | SMART/FHIR, CI, repo security, artifact validation, partner sandboxes |
| New Trigger.dev workflows | Release preparation, evidence assembly, gate evaluation, reminder/escalation |
| New app route | Internal release-readiness operator workflows |
| Framework/requirement import pipeline | Bring `additional-info` ONC/HIPAA/partner requirements into native data |

### Verified AI-related components

| Feature | Deterministic? | Reviewable? | Safe as release gate? | Notes |
|---|---|---|---|---|
| Assistant chat | No | Session-level only | No | Helpful support feature only |
| Policy editor AI | No | Yes, diff/apply flow | No | Safe for drafting, not autonomous truth |
| Policy regeneration | No | Weak historical auditability | No | Rewrites canonical content |
| Questionnaire parsing/answering | No | Partial | No | Good for trust workflows, not release truth |
| SOA auto-fill | No | Partial | No | Has unsafe default-to-yes behavior on insufficient data |
| Evidence-form analysis | No | Advisory only | No | Soft gate by design |
| Auditor-content generation | No | Weak | No | Narrative assistance only |
| Vendor risk normalization | No | Human verify task exists | No | Keep as assistive |

### Key deterministic check / automation primitives

| Primitive | Confidence | Why |
|---|---|---|
| `ctx.pass` / `ctx.fail` checks | High | Structured evidence + remediation + task mapping is exactly what a gate needs |
| `IntegrationCheckRun` / `IntegrationCheckResult` | High | Gives persisted pass/fail evidence with metadata |
| Trigger.dev schedules/tasks | High | Good recurring execution model for evidence jobs |
| Cloud security scan trigger/poll pattern | Medium | Shows long-running scan orchestration pattern |
| Browser automation runs | Medium | Good supporting evidence capture, but less reliable |

### Suspected weak spots or missing capabilities

- No first-class `Release`, `Gate`, or `Evidence Snapshot` domain exists yet.
- No verified healthcare-native requirement library is present in code.
- No verified SMART/FHIR or Inferno runner exists in the repo.
- No verified CI/CD gate API currently returns a definitive machine-readable release verdict.
- Current AI flows are not sufficiently versioned, immutable, or conservative to serve as autonomous gate logic.
- The workspace does **not** include HealthOS application code, so internal platform fit is only partially assessable from this repo alone.

### Notes on maintainability and fork strategy

- Keep generic GRC primitives close to upstream.
- Add healthcare and release-readiness features as a bounded extension, but let them live inside Comp AI's native feature set rather than outside it.
- Avoid a deep semantic rewrite of generic compliance areas unless healthcare becomes the dominant product direction.

## 3A. Framework Loading Strategy

This repo already has a real native framework-loading path. We should use that rather than inventing a parallel framework system.

### How Comp AI already models frameworks

Comp AI has a global framework library made of:

- `FrameworkEditorFramework`
- `FrameworkEditorRequirement`
- `FrameworkEditorControlTemplate`
- `FrameworkEditorPolicyTemplate`
- `FrameworkEditorTaskTemplate`

Then it instantiates those into an org through:

- `FrameworkInstance`
- `Control`
- `Policy`
- `Task`
- `RequirementMap`

This is the key existing flow:

1. Seed the global framework-editor library.
2. Expose selected frameworks as `visible`.
3. Let onboarding or admin flows call `POST /v1/frameworks`.
4. `FrameworksService.addFrameworks()` calls `upsertOrgFrameworkStructure()`.
5. That function creates framework instances plus org-specific controls, policies, tasks, and requirement mappings.

### Best way to load ONC / HIPAA / SMART / partner frameworks

Use a two-stage model:

#### Stage 1: Load a global healthcare framework library

Create new framework-editor data for:

- `onc-2026-core`
- `onc-conditions-maintenance`
- `hipaa-security-rule`
- `smart-on-fhir`
- `dosespot-readiness`
- `internal-release-readiness`

Each framework should contain:

- requirement rows
- control templates
- task templates
- policy templates only where policy documents are genuinely needed

Do **not** try to load every obligation as only a policy or only a task. Use the native structure:

- requirements = authoritative obligation or criterion
- control templates = what must be true operationally
- task templates = recurring/manual/approval work
- policy templates = normative documents when needed

#### Stage 2: Instantiate selected frameworks into the internal org

Once the framework library exists, add selected frameworks to the target org using the existing framework instance flow. This will generate:

- org-specific controls
- org-specific policies
- org-specific tasks
- requirement mappings

That gives you native Comp AI behavior immediately:

- framework dashboards
- control views
- task workflows
- policy workflows
- requirement-to-control visibility

### The actual loading mechanism I recommend

There are three viable loading methods. I recommend the first.

| Method | Use | Recommendation |
|---|---|---|
| Seed framework-editor primitives + relations | Best for authoritative healthcare frameworks that should be part of the product's native framework library | Recommended |
| Admin import API into framework-editor tables | Good later if you want editable in-product import flows | Phase 2 |
| Direct org-level creation of tasks/controls without framework-editor seeding | Fast but loses the framework-library abstraction and reusability | Do not use as primary method |

### Concretely, how to implement loading

#### Option 1: Seed-native library, then instantiate

This is the best fit for the repo.

1. Add new JSON seed files under the framework-editor seed area for:
   - `FrameworkEditorFramework`
   - `FrameworkEditorRequirement`
   - `FrameworkEditorControlTemplate`
   - `FrameworkEditorTaskTemplate`
   - `FrameworkEditorPolicyTemplate`
2. Add relation seed files connecting:
   - requirements to control templates
   - control templates to task templates
   - control templates to policy templates
3. Run the existing seed flow in `packages/db/prisma/seed/seed.ts`.
4. Mark the frameworks `visible: true` if they should appear in selection UIs.
5. Add them to the internal org through the existing `frameworks` API or onboarding flow.

#### Option 2: Build an importer from `additional-info`

Because `additional-info` is already structured, we should not manually rewrite everything forever.

Best import path:

- `notion_db_requirements.csv` -> `FrameworkEditorRequirement`
- `notion_db_controls.csv` -> `FrameworkEditorControlTemplate`
- `notion_db_obligations.csv` -> task templates and manual-attestation templates
- `notion_db_evidence.csv` -> evidence expectations metadata, not direct evidence rows
- `notion_db_tests.csv` -> deterministic check catalog and validator mapping metadata

In practice, I would build a one-time importer that transforms the CSV package into the framework-editor seed JSON format. That keeps the final source of truth aligned with Comp AI's native framework system.

### How I would map the healthcare package into Comp AI

| `additional-info` source | Native Comp AI destination |
|---|---|
| requirements CSV | framework requirements |
| controls CSV | control templates |
| tests CSV | check catalog metadata + task/check mapping |
| obligations CSV | recurring/manual task templates + obligation tracking seeds |
| evidence CSV | expected evidence metadata attached to controls/tasks/checks |
| decisions CSV | supporting documentation, not framework primitives |

### Important modeling rule

Do not create one giant "ONC" framework only.

Split it into operationally useful framework layers:

- certification criteria
- conditions and maintenance obligations
- HIPAA overlays
- SMART/FHIR runtime readiness
- partner readiness
- release gate requirements

That makes it easier to:

- turn frameworks on/off
- scope releases
- assign owners
- keep deterministic vs manual vs external work separate

### Where AI should help in framework loading

AI should help us:

- transform requirement text into draft control templates
- propose task templates
- draft policy templates
- suggest deterministic check mappings
- summarize regulatory language into operator-facing descriptions

But humans should approve:

- final requirement decomposition
- control wording
- which items are gate-blocking
- which items are manual vs deterministic vs external-validation

## 3. Feasibility Matrix

| capability | current support in repo | extension difficulty | confidence level | notes/evidence needed |
|---|---|---|---|---|
| controls and frameworks | Strong partial support | Low-Medium | High | Existing framework/control/requirement mapping is reusable |
| evidence collection | Strong partial support | Medium | High | Strong models exist, but evidence typing/gate-eligibility needs work |
| policy management | Strong support | Low | High | Policy and version models already exist |
| risk register | Strong support | Low | High | Risk model exists, but healthcare-specific scoring/mapping is custom |
| tasks/workflows | Strong support | Low | High | Existing task engine is reusable |
| integrations/connectors | Strong partial support | Medium | High | Existing integration manifests/check framework is the best substrate |
| AI assistant | Strong support | Low | High | Already present, but must stay non-authoritative |
| benchmark generation | Partial | Medium-High | Medium | AI can draft, deterministic checks must be the truth |
| source code scanning | Partial | Medium | Medium | Existing Aikido/GitHub checks show the pattern |
| API/platform scanning | Weak partial | High | Medium | Requires custom SMART/FHIR/runtime checks |
| infra scanning | Partial | Medium | Medium | Cloud scan primitives exist, but coverage must expand |
| healthcare-specific controls | Minimal native support | High | High | `additional-info` gives content, repo lacks built-in healthcare catalog |
| ONC readiness | Minimal native support | High | High | Must import requirement library and build validator orchestration |
| SMART on FHIR readiness | Minimal native support | High | High | Must add well-known/auth/capability/inferno checks |
| DoseSpot readiness | No verified native support | High | Medium | Requires partner specs and likely custom harnesses |
| release gating | No first-class support | High | High | Must add release models and deterministic decision engine |
| reporting/export | Strong partial support | Medium | High | Existing export flows help, but evidence packet semantics need work |
| audit trails | Strong partial support | Medium | High | Good foundation, but evidence immutability/snapshotting still needed |
| multi-team support | Partial | Medium | Medium | Organizations/roles exist, but release scoping likely needs system/component dimension |

## 4. Compliance-to-Platform Mapping

| requirement area | internal control objective | automatable? | proposed evidence type | proposed scan/test/job | manual review needed? | notes |
|---|---|---|---|---|---|---|
| HIPAA Security Rule risk analysis | Maintain an up-to-date SRA, risk register, owners, and remediation | Partial | SRA report, risk register, remediation tasks | Annual SRA workflow + quarterly stale-risk checks | Yes | Human judgment and scope analysis remain mandatory |
| HIPAA audit controls | Prove systems handling ePHI generate reviewable audit logs and preserve them | Partial-High | Logging config, retention config, sample exports, review attestation | Continuous config validation + periodic review task | Yes | Deterministic config checks help, but review still matters |
| HIPAA access control | Prove unique IDs, role access, session controls, emergency access, MFA posture | Partial | IAM/RBAC snapshots, auth config, procedure docs | Auth config checks + periodic access review | Yes | Addressable safeguards and break-glass still need human process |
| HIPAA transmission security | Prove secure transport and integrity controls | High | TLS reports, endpoint configs, test results | Endpoint TLS/mTLS regression checks | Sometimes | Exceptions and risk decisions are manual |
| ONC §170.315(g)(10) | Prove FHIR/SMART/Bulk Data conformance and preserve pass artifacts | High for automation, not for certification | Inferno output, capability statement, SMART config, samples | Scheduled Inferno and metadata validation jobs | Yes | ONC-ATL/ACB process remains external |
| ONC API Condition | Prove docs, terms, base URLs, registration process, fee compliance | Partial-High | Public URLs, SLA logs, legal artifacts | Reachability and drift checks + SLA tracking | Yes | Fee and contractual compliance need legal review |
| SMART App Launch | Prove `.well-known/smart-configuration` and auth metadata stay correct | High | Metadata snapshots, regression logs | Hourly/daily discovery and auth regression jobs | Sometimes | Runtime behavior is highly automatable |
| ONC RWT / Attestations / Insights | Track recurring filings and ongoing obligations | Partial | Filing artifacts, CHPL links, metrics, attestations | Obligation reminder/workflow jobs | Yes | Filing and sign-off remain human/external |
| DoseSpot readiness | Prove scenario coverage, idempotency, mapping correctness, event handling | Partial-High | Test outputs, webhook replay logs, mapping evidence | Partner harness + nightly scenario suite | Yes | Authoritative partner checklist is required |
| Internal release readiness | Block release on required deterministic failures or missing mandatory approvals | High | CI artifacts, check results, gate decision snapshot | CI-driven gate evaluation | Sometimes | Manual approvals should be explicit, not implicit |
| Customer / enterprise trust | Produce repeatable evidence packages and traceable narratives | Partial | Export bundles, signed references, curated narratives | Evidence packet builder | Yes | Interpretation and external communication remain human |

## 5. Build Recommendation

### Use as-is

- `Control`, `Risk`, `Task`, `Policy`, `Finding`, `EvidenceSubmission`
- organization and RBAC foundations
- Trigger.dev orchestration pattern
- deterministic integration check framework
- evidence export mechanisms
- internal operator app shell

### Extend with moderate effort

- requirement importers for ONC/HIPAA/SMART/partner/internal release controls
- healthcare-specific frameworks and task templates
- deterministic checks for source repos, CI artifacts, and cloud posture
- evidence typing and lifecycle rules
- dashboards for release-readiness and evidence review

### Major custom build

- release-gating domain and decision engine
- SMART/FHIR validator orchestration
- ONC certification-prep evidence packaging and filing workflow
- partner-specific certification harnesses such as DoseSpot
- immutable gate snapshots and evidence packet assembly
- system/component/environment scoping model

### Do not rely on for this purpose

- AI-generated decisions as release truth
- browser automation as the primary gate mechanism
- questionnaire/policy/AI narratives as hard compliance evidence
- any self-asserted "certified/compliant" status without external or human validation

## 6. MVP Plan

### Scope

Deliver the smallest viable internal system that creates immediate value for engineering, compliance, and leadership:

- one internal program/org
- imported ONC/HIPAA/SMART/internal-release requirement sets
- deterministic release gate for a narrow initial surface
- evidence packet generation for that surface
- explicit manual approval handling where required

Recommended MVP release scope:

- one deployed environment
- one FHIR/API surface
- one CI pipeline
- one source repository group
- one cloud environment

### Architecture approach

1. Use Comp AI as the requirement/control/task/evidence system of record.
2. Add a new `release-readiness` bounded context in `apps/api` and `apps/app`.
3. Add a healthcare/internal integration manifest package for deterministic checks.
4. Run checks on schedule and on demand from CI.
5. Materialize gate results into existing tasks/findings plus new release-specific decision records.

### Essential data model changes

Add new models:

- `ReleaseSubject`
- `ReleaseDefinition`
- `ReleaseRun`
- `ReleaseGateDecision`
- `ManualAttestation`
- `ExternalValidation`
- `EvidenceArtifact`

Extend existing models:

- `Task` with release linkage
- `EvidenceSubmission` with expiration, evidence class, gate eligibility
- `IntegrationCheckResult` with stronger evidence metadata
- `Finding` with source category

### Essential integrations

- CI/CD system for build/release metadata
- source code security scanners
- deployed SMART/FHIR endpoints
- cloud/infrastructure posture sources
- artifact storage for validator outputs and evidence bundles

### Essential jobs/scanners

- SMART discovery metadata check
- FHIR `CapabilityStatement` check
- Inferno result ingestion or execution wrapper
- C-CDA/eRx/Cypress validator result ingestion
- CI status and artifact presence checks
- audit-log/retention configuration checks
- documentation/base URL reachability checks

### Essential AI usage

Allowed in MVP:

- requirement summarization
- draft control text generation
- policy draft assistance
- evidence summarization for humans
- gap triage recommendations

Not allowed in MVP:

- automatic gate pass/fail
- automatic certification readiness claims
- unsupervised compliance scoring

### Essential deterministic checks

The first deterministic checks should be:

1. SMART `.well-known/smart-configuration` correctness
2. FHIR `CapabilityStatement` presence and expected resource/profile coverage
3. token revocation timing evidence ingestion
4. build artifact and release metadata presence
5. required CI security jobs completion
6. audit-log configuration/retention coverage
7. published docs, terms, and service base URL availability
8. validator output presence and freshness

### Essential UI/workflows

- release dashboard
- gate breakdown by deterministic/manual/external items
- evidence review queue
- manual attestation form
- evidence packet page
- open blocker/finding view

### Expected outputs/evidence

- per-release machine-readable gate verdict
- human-readable release readiness report
- ONC API readiness evidence packet
- internal HIPAA/security evidence bundle
- explicit list of unresolved blockers and manual approvals

## 7. Phase 2 Plan

### Richer automation

- run validator/test suites directly or through controlled wrappers
- add broader ONC criterion coverage beyond the API anchor path
- add partner sandbox and webhook replay frameworks
- add environment drift detection and regression alerting

### Smarter AI review

- AI-assisted evidence summarization with artifact links
- AI-assisted requirement-to-control draft generation
- AI-assisted finding clustering and remediation suggestions
- AI-generated trust package drafts for human review

### Broader framework mapping

- deeper HIPAA administrative/physical safeguards tracking
- SAFER support workflows
- information-blocking review workflows
- DSI transparency and AI governance workflows

### Benchmark generation pipeline

- import authoritative requirement text
- produce draft internal control objectives
- human review/approve control mappings
- generate candidate deterministic checks or manual evidence templates
- publish approved requirement/control/check bundles

### Release gating maturity

- tiered gates: hard block, conditional block, advisory
- per-service gate profiles
- time-bound waivers and compensating controls
- immutable gate snapshots and historical comparisons

### Better dashboards/reporting

- trend views for recurring failures
- stale evidence and expiring approval dashboards
- control health by system/environment
- partner readiness scorecards

### Auditor/customer evidence packaging

- structured internal audit packets
- repeatable customer trust bundles
- partner-specific submission bundles where permitted

## 8. Information Required From Us

### Product/platform

- authoritative system inventory
- service boundaries
- environments in scope
- data flows
- where ePHI exists
- FHIR/API surface inventory
- SMART/OAuth implementation details

### Engineering/repo

- actual HealthOS/internal product repositories
- CI/CD topology
- current release workflow
- current validator/test harnesses
- existing scanner inventory

### Infrastructure/devops

- cloud accounts and posture tooling
- deployment topology
- logging/retention stack
- artifact storage strategy
- secrets and key-management model

### Compliance/legal

- internal interpretation of "release ready"
- approval chain for HIPAA/ONC assertions
- information-blocking/legal review process
- data-handling constraints for evidence storage

### Partner/vendor

- authoritative DoseSpot requirements and test plans
- any other partner certification or onboarding requirements
- sandbox/API access details

### Timelines/business goals

- target MVP date
- target first release gate date
- ONC timeline and whether certification is active or prep-only
- which requirement areas must be operational first

## 9. Risks and Blockers

### Technical risks

- No HealthOS code is present in this workspace.
- Browser automation is brittle relative to deterministic checks.
- Gate logic can become noisy without explicit scope discipline.
- Evidence can become mutable and unauditable if snapshots are not added.

### AI reliability risks

- Current AI flows are useful but not conservative enough for gate truth.
- Model outputs can be persuasive while still being wrong or incomplete.
- Some existing AI flows write directly into important state.

### Compliance interpretation risks

- ONC obligations extend beyond criterion pass/fail.
- HIPAA controls often require policy and operational interpretation.
- Proposed regulatory changes like HTI-5 must not drive premature de-scoping.

### Data quality / evidence risks

- Screenshots and narratives are weaker than validator outputs and config proofs.
- External artifacts referenced in `additional-info` are not present in this repo.
- Partner requirements remain incomplete without authoritative vendor materials.

### Operational risks

- Overly broad gates will slow releases and reduce trust.
- Under-scoped gates create a false sense of readiness.
- Manual obligations can stall unless ownership and reminders are explicit.

### False sense of automation risk

- "Green dashboard" is not certification.
- "No findings" is not equivalent to legal or partner approval.
- AI assistance can accelerate work but must never silently redefine truth.

## 10. Open Questions

1. Which actual HealthOS/internal repositories, services, and environments are the first release-gated target?
2. Do you want the MVP gate to evaluate only deployed API/runtime behavior plus CI artifacts, or source repositories as well?
3. What is the authoritative DoseSpot certification/readiness artifact set?
4. Which manual approvals are non-negotiable release blockers in your operating model?
5. Are validator tools run inside CI, outside CI, or manually today?
6. Should the first gate be product-wide or scoped to one service/domain such as the FHIR/API surface?

## Verified Facts, Assumptions, Unknowns, Primary Sources

### Verified facts

- Comp AI is a Bun + Turbo monorepo with `apps/api`, `apps/app`, and `apps/portal`.
- The repo has real GRC objects and workflows, not just docs.
- Deterministic integration checks already exist and persist evidence JSON and remediation.
- Trigger.dev is already used for recurring jobs.
- Browser automation is already implemented with persistent Browserbase contexts.
- The `additional-info` package is a healthcare/readiness requirements package, not product code.
- The workspace does not contain HealthOS application code.

### Assumptions

- Internal-only scope remains the operating model for the near term.
- Trigger.dev Cloud and Resend remain acceptable dependencies.
- The first business value should come from deterministic release gating, not from a broad policy portal rollout.

### Unknowns

- Actual HealthOS codebase architecture
- actual SMART/FHIR implementation details
- current CI artifact availability
- partner certification contracts and checklists
- whether some referenced evidence artifacts already exist elsewhere

### Primary sources used

Repo/code:

- `README.md`
- `package.json`
- `apps/api/package.json`
- `apps/app/package.json`
- `apps/api/src/app.module.ts`
- `apps/api/src/auth/hybrid-auth.guard.ts`
- `apps/api/src/auth/auth.server.ts`
- `apps/api/src/audit/audit-log.interceptor.ts`
- `packages/auth/src/permissions.ts`
- `packages/db/prisma/schema/*.prisma`
- `packages/integration-platform/src/types.ts`
- `packages/integration-platform/src/manifests/github/checks/branch-protection.ts`
- `packages/integration-platform/src/manifests/aikido/checks/code-repository-scanning.ts`
- `apps/api/src/integration-platform/controllers/checks.controller.ts`
- `apps/api/src/trigger/integration-platform/run-task-integration-checks.ts`
- `apps/api/src/browserbase/browserbase.service.ts`
- `apps/api/src/trigger/browser-automation/run-browser-automation.ts`
- `apps/api/src/tasks/evidence-export/evidence-export.controller.ts`
- `apps/api/src/cloud-security/cloud-security.controller.ts`
- `apps/app/src/app/(app)/[orgId]/cloud-tests/actions/run-platform-scan.ts`
- `apps/api/src/assistant-chat/assistant-chat.controller.ts`
- `apps/app/src/app/api/policies/[policyId]/chat/route.ts`
- `apps/api/src/questionnaire/utils/content-extractor.ts`
- `apps/api/src/questionnaire/utils/questionnaire-storage.ts`
- `apps/api/src/soa/utils/soa-answer-parser.ts`
- `apps/api/src/trigger/policies/update-policy-helpers.ts`
- `apps/app/src/app/api/evidence-forms/analyze/route.ts`
- `apps/app/src/trigger/tasks/auditor/generate-auditor-content.ts`
- `apps/api/src/trigger/vendor/vendor-risk-assessment-task.ts`
- `.github/workflows/release.yml`
- `.github/workflows/check-types.yml`
- `.github/workflows/auto-pr-to-main.yml`
- `.github/workflows/auto-pr-to-release.yml`
- `apps/app/.env.example`
- `apps/api/.env.example`

Healthcare/readiness docs:

- `additional-info/deep-research-report.md`
- `additional-info/deep-research-report (1).md`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/healthos_onc_verification_memo.md`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/healthos_onc_handoff_summary.md`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/onc_official_rules.md`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/onc_ongoing_obligations.md`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/onc_testing_evidence.md`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/onc_master_audit_matrix.md`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/notion_workspace_blueprint.md`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/notion_db_requirements.csv`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/notion_db_controls.csv`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/notion_db_evidence.csv`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/notion_db_tests.csv`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/notion_db_obligations.csv`
- `additional-info/healthos_onc_hardened_final_package_2026-03-15/notion_db_decisions.csv`

Current library docs via Context7:

- Trigger.dev
- Better Auth organization/access control
- Browserbase Stagehand
