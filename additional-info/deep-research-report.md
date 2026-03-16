# How Comp AI Uses AI and How to Turn Compliance Requirements Into Benchmarked, Automatable Gates

## Decisions you just locked in and what they imply

You’ve confirmed three architectural constraints that materially simplify the design space:

- The platform will be **strictly internal** (no interactive external customer/auditor access), so we can optimize for internal velocity and integration depth rather than multi-party data segregation UX. (User decision; no external-source citation.)
- **entity["company","Trigger.dev","workflow automation platform"] Cloud** and **entity["company","Resend","transactional email api"] are acceptable dependencies, so we can use Comp AI’s default job/workflow and notification posture rather than replatforming the scheduler/email stack. citeturn1search0turn2view1turn2view2turn2view0
- Your ONC objective is “**everything**” (readiness tracking + certification preparedness), and release readiness must be “**full working**,” meaning the system must produce **deterministic, reproducible pass/fail artifacts** and plug into CI/CD as a true release gate (not just a dashboard). citeturn6view0turn7search0turn9search6

Net implication: the safest and fastest implementation is to treat Comp AI as:
- the **system of record** for tasks, evidence, findings, and automation definitions, and
- the **execution substrate** for recurring checks and browser automations, and
- the API surface queried by CI/CD to **block or allow releases**.

This matches Comp AI’s documented primitives: tasks and recurring tasks, evidence automations, browser automations, findings, and “checks” that can map to tasks for auto-completion. citeturn7search0turn6view0turn3view0turn5search7turn5search3

## Verified AI surfaces in Comp AI today

Comp AI uses AI in **multiple distinct product surfaces**, and importantly, they’re not all “LLM does the compliance.” Some are “LLM helps author artifacts,” others are “LLM helps automate evidence collection,” and others are “LLM drafts answers that humans review.”

### AI feature map

| AI feature surface | What it does (verified) | Where the “truth” lives | Why it matters for your internal audit tool |
|---|---|---|---|
| Automated Evidence “chat agent” | From a task, you click “Create Automation,” enter a prompt, and the agent creates an automation to collect evidence; it requests any keys/tokens needed, you can test, then publish; it runs recurring and updates evidence. citeturn3view0turn5search0 | Automation definition + task evidence | This is the most direct path to “feed requirements → generate checks,” but it must be constrained to repeatable, auditable outputs. |
| Browser automations API (Browserbase) | CRUD and run browser automations tied to tasks (create, run, run history, live view). Inputs include a **natural language “instruction”** and a target URL, plus scheduling. citeturn9search11turn5search5turn5search12turn7search3 | Task + automation + outputs (incl screenshot URL) | Lets you automate evidence collection for SaaS/config UIs when no stable API exists—useful for partner portals and SOC2-style evidence, and potentially some operational workflow evidence. |
| AI Policy Editor | AI assists in creating/editing policies with natural language requests; it proposes a complete updated policy and provides a visual diff; workflow is review/approve (non-destructive). citeturn4search0turn4search12 | Policy content + audit trail of edits (implied by diff/review) | Great for bootstrapping healthcare/security policy docs, but it is **not** a “benchmark”; it’s an authoring accelerator that still requires human approval. |
| Security Questionnaire | Upload questionnaire files; AI extracts questions and generates answers based on published policies and organizational context; includes manual review and editing before export. citeturn4search4turn4search7 | Questionnaire artifacts + generated answers + human edits | Useful for enterprise trust workflows; not a release gate, but can become a downstream “trust deliverable” from the same evidence base. |
| “Checks” (deterministic compliance validations) | Checks are the core of integrations: fetch external data, analyze for compliance issues, and report failures/success; can map to task templates to auto-complete tasks when checks pass. citeturn6view0turn9search14 | Integration check code + run logs + findings + evidence JSON | This is your real “benchmark engine.” It’s where you put the deterministic, auditable logic needed for ONC/SMART readiness and “full working” release gates. |

### Key implementation takeaway

If you want Comp AI to “make its own benchmarks,” the defensible approach is:

- Use **AI** to **draft and accelerate** (e.g., propose check logic, create browser automation scripts/instructions, draft policy language, draft questionnaire answers).
- Use **Checks** to be the **benchmark truth**: deterministic results, structured evidence, remediation guidance, and reproducibility. citeturn6view0turn9search14

That division aligns with Comp AI’s own docs: checks validate compliance and report findings; automations can run recurrently and attach evidence to tasks. citeturn6view0turn3view0turn5search15

## What you connect it to for AI and automations

Comp AI is explicitly built to connect to multiple model providers (and multiple automation backends) via environment variables in each app/service, and to external systems via its integration platform.

### Model provider connectivity (verified env requirements)

Comp AI’s `.env.example` files show what keys it expects:

| Component | Required / supported AI keys | Notes |
|---|---|---|
| `apps/app` | `OPENAI_API_KEY` (marked “Required for app to work”), plus optional `GROQ_API_KEY` (“for the AI chat, on dashboard”) and `ANTHROPIC_API_KEY` (optional). citeturn2view1 | The product assumes an LLM is always available at runtime (at least OpenAI). |
| `apps/api` | `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GROQ_API_KEY`; also has `UPSTASH_VECTOR_*` variables, implying vector/embedding-backed features exist. citeturn2view0 | The API service is also where evidence ingestion, automations, and AI endpoints commonly live (validated by API docs site). citeturn4search10turn4search12 |
| Vendor research / enrichment | `FIRECRAWL_API_KEY` is labeled “To research vendors, Required” in `apps/app/.env.example`. citeturn2view1 | This indicates a vendor research automation path is expected. |

So, concretely, “what do I connect it to?” is: you set the provider keys, and Comp AI uses them in its AI surfaces (policy editing, chat, automations, questionnaires). citeturn2view1turn2view0turn4search12turn3view0turn4search4

### Systems connectivity for evidence checks (integration platform)

Comp AI’s integration platform explicitly supports multiple auth strategies (OAuth2, API key, basic auth, custom) and provides a standard “check” runtime with HTTP methods, pagination helpers, GraphQL support, state storage, and a structured pass/fail + evidence reporting API (`ctx.fail`, `ctx.pass`). citeturn4search5turn6view0

This matters for your goal because it means:
- internal platform APIs (FHIR server, auth server, admin/config APIs) can be integrated via **API key** or **custom auth**, and checked with deterministic logic. citeturn4search5turn6view0
- external services (cloud providers, source control, ticketing) can be integrated via OAuth2 and checked similarly. citeturn4search5turn9search14

## How to “feed compliance requirements” and get real benchmarks

You *can* feed compliance requirements into Comp AI, but “benchmarks” should mean **repeatable checks with explicit acceptance criteria**, not open-ended LLM judgment.

Comp AI gives you three complementary mechanisms that together implement a full compliance benchmark system:

### Requirement-to-benchmark mapping primitives

| Primitive | Best for | How it becomes a “benchmark” | Verified API/docs hooks |
|---|---|---|---|
| Tasks (recurring units of compliance work) | “This must be true” obligations: evidence, review, attestation, testing | A task is “passing” when auto-completed by checks or completed with attached evidence and/or approvals | Create/read/update/complete tasks are documented via `/v1/tasks` endpoints. citeturn7search0turn9search3turn9search6 |
| Deterministic checks (integration platform) | Anything that can be evaluated by querying an API, config store, CI artifact, or structured data feed | This is the canonical benchmark: code fetches data, analyzes, then emits `fail()` or (optionally) `pass()` with structured evidence | “Writing Checks Reference” documents check structure, `ctx.fail`/`ctx.pass`, evidence JSON, remediation, and task mapping. citeturn6view0turn9search14 |
| Evidence automations (per task) | Recurrent evidence capture when a check is not feasible (screenshots, UI verification, brittle portals), or when you want a fast bootstrap | Agent-generated automation that runs on a schedule and updates task evidence | Automated Evidence workflow docs + `/v1/tasks/{taskId}/automations` endpoints + version history endpoints. citeturn3view0turn5search15turn7search4 |
| Browser automations (Browserbase) | UI-driven evidence; “go here, click this, capture screenshot, extract a value” | The “benchmark” is: automation run output + screenshot URL + extracted structured results (if supported) tied to a task | Create/run browser automations endpoints are documented under `/v1/browserbase/automations`. citeturn9search11turn5search5turn7search3 |
| Findings | Formalized “why this failed” on a task (auditor-like posture) | Findings turn benchmark failures into actionable remediation items with traceability | Create finding endpoint exists and ties to tasks. citeturn7search9 |

### Where AI fits into benchmark creation (and where it should not)

Comp AI’s documentation explicitly positions the automation agent as prompt-driven and token-aware, and the policy editor as AI-assisted with diff review. citeturn3view0turn4search0turn4search12  
Your most defensible “AI makes benchmarks” approach is:

1. **Ingest requirements as structured items first**  
   - Create tasks representing requirements (or task templates where available) and attach plain-English acceptance criteria in the task description. citeturn7search0turn9search3  
   - If you need a “knowledge base” for the AI features, use Comp AI’s **Context** store to record key Q/A and tags about how your platform implements requirements (e.g., “How do we implement SMART token lifetimes?”). citeturn7search15turn7search6  

2. **Have AI draft initial benchmark proposals**  
   - For tasks that can be checked deterministically, AI can draft a candidate check definition (what API to call, what fields to validate, what evidence JSON to store, what remediation text to emit). The checks framework explicitly expects those components. citeturn6view0turn9search14  
   - For tasks that cannot be checked deterministically, AI can draft a browser automation “instruction” + target URL and schedule, which is a documented first-class behavior. citeturn9search11turn3view0turn7search3  

3. **Human review + deterministic execution becomes the benchmark**  
   - The benchmark is not “AI says compliant.” The benchmark is “check executed; it either produced findings with evidence and remediation, or it passed.” The checks reference is explicit that checks report compliance issues and can map to tasks for auto-completion. citeturn6view0turn9search14  

If you want “full working” release readiness, **Checks + task mapping** must be the backbone, because they produce stable pass/fail semantics, run logs, and structured evidence. citeturn6view0turn7search18

## How to implement “full working” release readiness gates with Comp AI

A “full working” gate should be: **a deterministic CI decision** that can be traced back to **concrete evidence objects** inside Comp AI.

Comp AI already provides the mechanical parts you need:

- Tasks have statuses, can be completed via API, and can hold attachments/evidence. citeturn7search0turn9search6turn7search1  
- Evidence automations and browser automations can run for tasks and be versioned. citeturn5search15turn7search4turn9search11  
- Checks can map to task templates to auto-complete tasks when validations pass (reducing manual work and keeping tasks in sync with real state). citeturn6view0turn9search14  

### Minimal “release gate contract” (practical and CI-friendly)

| Gate category | What “pass” must mean | Where implemented in Comp AI | How CI evaluates |
|---|---|---|---|
| Code security baseline | No critical/high vulnerabilities in SAST/SCA/secret scanning; required branch protections enabled | Deterministic checks that call tool APIs or ingest CI artifacts; emit `fail()` findings with evidence JSON and remediation | CI queries Comp AI tasks/check results; fails pipeline if any required task is not “done” or has open critical/high findings. citeturn6view0turn7search0turn5search3 |
| Runtime/API readiness | Required endpoints/configs validate (e.g., SMART discovery, well-known config, auth flows) | Deterministic checks calling your internal/public endpoints using integration platform auth patterns | Same as above; tasks mapped to these checks. citeturn6view0turn4search5 |
| Evidence packaging | Evidence artifacts exist and are downloadable (attachments, run outputs, screenshots) | Task attachments + browser automation run outputs (screenshotUrl) | CI can require presence of key attachments or a “packet ready” task marked complete | Attachments + download URLs exist in API. citeturn7search1turn5search5 |
| Human-required approvals | Explicit sign-off tasks completed (only where truly required) | Tasks marked complete via API after review | CI fails if approval tasks not complete | Task completion endpoint exists. citeturn9search6 |

### Concrete Comp AI API mechanics you’d use in CI

- **List tasks** → determine which gate tasks apply to a release (e.g., by naming/tag convention you enforce internally). Comp AI supports retrieving all tasks via API key auth. citeturn7search0  
- **Inspect task artifacts** → attachments endpoints provide signed download URLs, supporting traceability and archival. citeturn7search1turn7search11  
- **Check automation history / versions** → automation version endpoints exist, which you can use to ensure the benchmark definition didn’t drift unreviewed. citeturn7search4  
- **Trigger or run automations** (optional) → browser automations can be run via API, returning success flags and screenshot URL; this can support “run gate checks on-demand” in CI. citeturn5search5turn5search12  

## What you can do immediately to make AI-generated benchmarks safe and useful

Because you want “everything” (including ONC readiness and partner readiness), there will be many requirements that start as text. The risk is letting AI turn text into “green checkmarks” without enforceable criteria.

Comp AI’s own primitives encourage a safer workflow:

1. **Write checks to emit evidence + remediation, not just booleans**  
   The checks spec explicitly supports structured evidence JSON (e.g., current vs expected values, checkedAt timestamps) and specific remediation steps. citeturn6view0turn9search14  

2. **Use task mapping for auto-completion only when the check directly validates the task**  
   The docs explicitly encourage mapping checks to task templates when the check validates what the task requires, enabling automatic completion and reducing manual work. citeturn6view0turn9search14  

3. **Prefer deterministic checks; use browser automations as a last-mile collector**  
   Browser automations are prompt-like (instruction + URL) and can be watched with live view; that’s powerful but more brittle than API checks. citeturn9search11turn5search12turn5search5  

4. **Version and review automation scripts like code**  
   Comp AI exposes version history for automations, which can be your enforcement handle: “no gate benchmark runs in prod unless the latest automation version is approved.” citeturn7search4  

5. **Use Context entries as “ground truth notes” for AI features**  
   Since policy chat and security questionnaires use organizational context/policies, storing high-quality internal Q/A (tagged) can reduce hallucination and keep generated outputs consistent. citeturn7search15turn4search4  

---

### Direct answers to your last questions

- **Does it use AI? How?**  
  Yes: AI is used for policy drafting/editing with diff review, prompt-driven evidence automation creation per task, AI-driven questionnaire parsing/answering, and (in practice) for automating evidence via browser automation instructions tied to tasks. citeturn4search0turn3view0turn4search4turn9search11

- **What do you connect it to?**  
  You connect it to model providers by setting `OPENAI_API_KEY` (required in `apps/app`), and optionally `ANTHROPIC_API_KEY` / `GROQ_API_KEY`. You also connect it to systems via the integration platform (OAuth2 / API key / basic / custom auth). citeturn2view1turn2view0turn4search5turn6view0

- **Can you feed it requirements so it makes benchmarks?**  
  Yes—but the defensible implementation is: requirements → tasks (and templates) → deterministic checks (benchmarks) + scheduled automations (evidence collectors). AI can accelerate drafting those, but the benchmark truth is the executed check results and evidence objects. citeturn7search0turn6view0turn3view0turn5search15