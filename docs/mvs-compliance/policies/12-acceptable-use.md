---
status: draft
frequency: yearly
department: hr
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Acceptable Use & Workstation Security"
frameworks: [soc2]
maps: { soc2: [CC1.1, CC2.2, CC5.3] }
---

# Acceptable Use Policy

> DRAFT for human approval.

## 1. Purpose

Define acceptable use of MVS information systems, devices, networks, and data by all workforce
members.

## 2. Scope

All employees and contractors and any device used to access MVS systems or data.

## 3. Policy

1. MVS systems and data are used only for authorized business purposes.
2. **Workstation security:** managed, encrypted, screen-locked devices; only managed devices
   (JumpCloud-enrolled) may access T0/T1 data or production.
3. Credentials are never shared; MFA is never bypassed; secrets are never committed to code.
4. PHI is accessed strictly on need-to-know and never exfiltrated to unmanaged channels.
5. Prohibited: installing unauthorized software, disabling security controls, using
   unsanctioned AI tools with company/PHI data (use the LiteLLM gateway).
6. Suspected incidents are reported per the Incident Response Policy.

## 4. MVS tailoring

- AI-tool use is governed by the AI Governance Policy: only the LiteLLM gateway, never raw
  provider keys with sensitive data.

## 5. Evidence

`signedBy[]` acknowledgments; JumpCloud device-posture results.
