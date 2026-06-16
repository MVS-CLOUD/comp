---
status: draft
frequency: yearly
department: it
approverId: "[PLACEHOLDER — Org Owner / Ryan Abazid]"
isRequiredToSign: true
reviewDate: "[PLACEHOLDER — set on publish; default +1y]"
sourceTemplate: "Physical Security & Environmental"
frameworks: [hipaa_security]
maps: { hipaa: ["164.310(a)", "164.310(b)", "164.310(c)", "164.310(d)"] }
---

# Physical & Environmental / Workstation & Device Policy

> DRAFT for human approval.

## 1. Purpose

Address physical safeguards for facilities, workstations, and devices. MVS is cloud-native, so
most physical controls are **inherited from subservice organizations** and documented as
carve-outs; the residual scope is workforce devices and remote-work hygiene.

## 2. Scope

MVS workforce devices, remote-work environments, and the documented subservice carve-outs.

## 3. Policy

1. **Facility access (§164.310(a)):** data-center physical security is **inherited from AWS**
   (SOC 2 / ISO certified) and from **Neon's** cloud provider. MVS holds no production data
   center. Carve-outs are documented in the SOC 2 system description.
2. **Workstation use & security (§164.310(b),(c)):** managed, encrypted, auto-locking devices;
   privacy from shoulder-surfing in public; no PHI on unmanaged devices.
3. **Device & media controls (§164.310(d)):** device inventory via JumpCloud; secure disposal /
   re-use per the Data Retention & Disposal Policy; full-disk encryption required.

## 4. MVS tailoring

- Subservice organizations to carve out: **AWS** (compute/storage/data-center), **Neon**
  (managed Postgres), **Vercel** (if used), **Trigger.dev**, **Upstash**. List complementary
  user-entity controls (CUECs) in the system description.

## 5. Evidence

AWS/Neon SOC 2 reports (subservice); JumpCloud device inventory; disk-encryption posture.
