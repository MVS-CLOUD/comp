# Comp AI self-host deploy (config only — DRAFT)

> **STATUS: DRAFT CONFIG. No real secrets. NEEDS-HUMAN to apply against live infra + DNS.**
> Two viable paths are provided per the execution package §2:
> 1. **EKS Helm chart** on `agenthub-prod` (platform-consistent, inherits CC6/CC7 controls) — `helm/`
> 2. **ECS Fargate task def** (matches the in-repo `deploy.sh`) — `ecs/comp-task-def.json`
>
> **Open question for Ryan (execution package §8.1):** EKS vs ECS. Decide before applying.

## Components

Comp ships three Docker targets (`docker-compose.yml`): `migrator`, `seeder`, `app` (port 3000),
`portal` (port 3002, container port 3000). The compliance DB is a **dedicated Neon project**
(`mvs-compliance-comp`) — never share a data store with the systems Comp audits.

## Caveat (from memory `paperclip-deploy`)

`agenthub-prod` has **no EBS CSI driver yet** (Paperclip ran on `emptyDir`). Comp is a
stateless app + external Postgres (Neon), so the app/portal pods are fine. **Do not** put
Postgres in-cluster on `emptyDir`.

## Secrets

All secrets come from **Infisical** via External Secrets Operator (ESO). See `eso/`.
No secret values are committed — only references. Generate `AUTH_SECRET`/`SECRET_KEY`/
`REVALIDATION_SECRET` with `openssl rand -base64 32` and store them in Infisical.

## Env

`env/*.env.template` mirror the three Docker env files. `NEXT_PUBLIC_SELF_HOSTED=true`,
the Neon `DATABASE_URL` placeholder, and Okta forward-auth wiring are set there. Real values
live in Infisical, not in these templates.

## Apply order (NEEDS-HUMAN)

1. Provision Neon project `mvs-compliance-comp` (HIPAA Scale plan); create app RW role + read-only `auditor` role.
2. Create Infisical project `comp-ai`; populate secrets (see `eso/secretstore.yaml` keys).
3. Build + push images to ECR with `BETTER_AUTH_URL` / `BETTER_AUTH_URL_PORTAL` build args.
4. **EKS:** `helm upgrade --install comp ./helm/comp -n comp -f helm/comp/values.yaml` (after ESO is reconciling). Run the `migrate-seed` Job first. **OR ECS:** register `ecs/comp-task-def.json` and roll the service via `deploy.sh`.
5. Front both hostnames with Okta (Traefik forward-auth on EKS, or ALB OIDC / oauth2-proxy on ECS).
6. Deploy Trigger.dev tasks from a workstation: `cd apps/app && bunx trigger.dev@latest deploy`.
7. Smoke: `GET /api/health`; create the MVS org; confirm `NEXT_PUBLIC_SELF_HOSTED` auto-approved it.
