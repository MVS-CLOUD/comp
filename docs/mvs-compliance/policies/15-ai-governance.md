---
status: draft
frequency: yearly
department: eng
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "AI Policy Control Framework"
frameworks: [soc2, iso42001]
maps: { soc2: [CC8.1], iso42001: ["clause 8"], hipaa: ["164.308(a)(1)"] }
---

# AI Governance Policy

> DRAFT for human approval.

## 1. Purpose

Govern the development, deployment, and operation of AI/LLM features so they are transparent,
tested, change-managed, and aligned with the principle that **AI drafts and assists; humans
and external authorities hold release / certification / sign-off authority.**

## 2. Scope

All AI/LLM functionality across MVS (HealthOS agents, Comp's own AI policy/risk/vendor
drafting) and the models, prompts, and pipelines behind them.

## 3. Policy

1. **Gateway-only routing:** all LLM traffic routes through the **LiteLLM gateway** — no raw
   provider keys in production. Comp's `OPENAI_API_KEY`-style features route through LiteLLM or
   a scoped BAA-covered key.
2. **Change management (CC8.1):** model/prompt changes pass Promptfoo evals and the
   `rollout-gate.ts` baseline/canary gate before promotion. *Open:* Promptfoo cron suspended
   (GAP_MATRIX #27); manifest migration not applied (GAP_MATRIX #26 P0).
3. **Transparency & evidence:** AI activity is traced (Langfuse) and recorded append-only in
   `evidence_manifests`; `EvidenceArtifact` records carry `aiProvider`/`aiModel`/`promptVersion`.
4. **Human authority:** AI-generated content (policies, risks, SOA answers) is **draft** until a
   human approves. Note the documented SOA "default-to-yes on insufficient data" hazard — keep
   human review on every SOA/AI-generated answer.
5. **No PHI to ungoverned models:** PHI may only reach BAA-covered, gateway-routed models.

## 4. MVS tailoring

- This maps to the ISO 42001 framework Comp ships, and to ONC DSI transparency expectations.

## 5. Evidence

Promptfoo eval results; `rollout-gate` decisions; Langfuse traces; `evidence_manifests`;
LiteLLM routing config.
