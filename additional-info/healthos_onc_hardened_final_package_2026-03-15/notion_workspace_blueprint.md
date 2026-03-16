# HealthOS ONC Certification & Audit Management — Notion Workspace Blueprint

**Product:** HealthOS (Full Ambulatory EHR)  
**Developer:** MVS Cloud  
**Date:** 2026-03-15  
**Purpose:** Continuous ONC audit readiness, certification lifecycle management, and regulatory compliance tracking

---

## 1. Workspace Overview

This Notion workspace provides a single system of record for managing HealthOS's ONC Health IT Certification Program compliance across six interconnected databases, supported by dashboards, operational pages, and calendar views. It covers:

- **59 active certification criteria** across all current §170.315 categories (a)–(j)
- **25 compliance controls** spanning Information Blocking, Assurances, API, RWT, Attestations, Insights, HIPAA, and more
- **32 evidence artifacts** linked to controls and requirements
- **18 test records** with tool-specific validation results
- **15 ongoing obligations** with deadlines and enforcement discretion tracking
- **10 architectural/regulatory decisions** with full rationale

---

## 2. Page Hierarchy

```
🏠 HealthOS ONC Certification
├── 📊 Certification Dashboard                  ← Executive overview
│   ├── Status heatmap (criteria readiness)
│   ├── Upcoming deadlines (next 90 days)
│   ├── Risk summary (critical/high items)
│   └── Enforcement discretion tracker
│
├── 📋 Databases (6 core databases)
│   ├── 📄 Requirements                        ← All §170.315 criteria
│   ├── 🛡️ Controls                             ← Compliance controls & policies
│   ├── 📎 Evidence                             ← Artifacts & documentation
│   ├── 🧪 Tests                                ← Test procedures & results
│   ├── ⏰ Obligations                           ← Deadlines & filings
│   └── ⚖️ Decisions                             ← Decision log with rationale
│
├── 📅 Compliance Calendar                      ← Timeline view of all deadlines
│
├── 📖 Reference Library
│   ├── Regulatory Framework Overview
│   │   ├── 45 CFR Part 170 Structure
│   │   ├── Base EHR Definition (§170.102)
│   │   ├── CEHRT Definition (42 CFR §414.1305)
│   │   └── Rule History (2015 Edition → HTI-4)
│   ├── Enforcement Discretion Notices
│   │   ├── EDN2025.01 — USCDI v3/SOGI Elements
│   │   ├── EDN2025.02 — Insights Condition
│   │   ├── EDN2025.03 — Real World Testing
│   │   ├── EDN2025.04 — eCR Standards
│   │   ├── EDN2025.05 — Attestations (Expired)
│   │   └── EDN2025.06 — HTI-1 Compliance Dates
│   ├── HTI-5 Tracker (Proposed Rule)
│   ├── Key Contacts
│   │   ├── ONC-ACB (Drummond Group)
│   │   ├── ONC-ATL
│   │   └── ASTP/ONC Contacts
│   └── Glossary
│
├── 🔄 Operating Workflows
│   ├── Semiannual Attestation Playbook
│   ├── RWT Annual Cycle
│   ├── Non-Conformity Response Procedure
│   ├── Direct Review Response Plan
│   ├── Surveillance Preparation Guide
│   ├── Quarterly SED/UI Change Notification
│   └── Breach Notification Procedure
│
└── 📁 Archive
    ├── Completed Attestations
    ├── Historical RWT Plans & Results
    └── Closed Decisions
```

---

## 3. Database Schemas & Relationships

### 3.1 Requirements Database (`notion_db_requirements.csv`)

**Purpose:** Master registry of all ONC certification criteria HealthOS targets. Each row is one §170.315 criterion.

| Property | Type | Description |
|---|---|---|
| `Req_ID` | Title (Primary Key) | Stable ID, e.g., `REQ-G10` |
| `Citation` | Text | CFR citation, e.g., `§170.315(g)(10)` |
| `Criterion_Name` | Text | Human-readable name |
| `Category` | Select | Clinical, Care Coordination, CQMs, Privacy & Security, Patient Engagement, Public Health, Design & Performance, Transport, Workflow Triggers |
| `Base_EHR` | Checkbox-like Select | Yes / No |
| `CEHRT_MIPS` | Text | Yes / No / Optional with context |
| `Market_Status` | Select | Essential, Important, Niche |
| `Tier` | Select | Tier 1 (Required), Tier 2 (Recommended), Tier 3 (Niche) |
| `Standards_Referenced` | Text | Specific standards and versions |
| `Conformance_Method` | Multi-select | Documentation, Visual Inspection, Test Tool, Attestation |
| `Test_Tool` | Text | ONC-approved test tool name |
| `CCG_URL` | URL | Link to Certification Companion Guide |
| `Status` | Select | Active, Expired, Proposed for Removal |
| `HTI5_Impact` | Select | Retained, HTI-5 proposes removal, Revised |
| `EDN_Discretion` | Text | Active enforcement discretion notices |
| `RWT_Applicable` | Checkbox-like Select | Yes / No |
| `Depends_On` | Relation → Requirements | Self-referencing relation for dependency criteria |
| `Notes` | Text | Additional context |

**Key relations FROM this database:**
- `Depends_On` → **Requirements** (self-relation for dependency tracking, e.g., (b)(1) depends on (g)(6))
- Reverse relation from **Controls** → `Requirement_IDs`
- Reverse relation from **Evidence** → `Requirement_IDs`
- Reverse relation from **Tests** → `Requirement_IDs`

**Views:**
1. **All Criteria** — Default table sorted by Req_ID
2. **By Category** — Board view grouped by `Category`
3. **Tier 1 Only** — Filtered to Tier 1 (must-certify)
4. **HTI-5 Impact** — Filtered to criteria HTI-5 proposes to remove
5. **RWT Scope** — Filtered to RWT_Applicable = Yes
6. **Active Enforcement Discretion** — Filtered where EDN_Discretion ≠ None

---

### 3.2 Controls Database (`notion_db_controls.csv`)

**Purpose:** Compliance controls, policies, and recurring activities that maintain certification.

| Property | Type | Description |
|---|---|---|
| `Control_ID` | Title (Primary Key) | e.g., `CTRL-IB-001` |
| `Control_Name` | Text | Descriptive name |
| `Category` | Select | Information Blocking, Assurances, Communications, API Condition, Real World Testing, Attestations, Insights Condition, CHPL Maintenance, HIPAA, Safety-Enhanced Design, Direct Review, SAFER Guides |
| `Regulation` | Text | Regulatory citation |
| `Requirement_IDs` | Relation → Requirements | Links to applicable criteria |
| `Description` | Text (Long) | What the control requires |
| `Owner` | Person / Text | Responsible role or team |
| `Frequency` | Select | Ongoing, Annual, Semiannual, Quarterly, Event-driven, One-time |
| `Status` | Select | Active, In Progress, Not Started, Complete, Deferred, Pending |
| `Evidence_IDs` | Relation → Evidence | Links to supporting evidence |
| `Last_Reviewed` | Date | Last review or audit date |
| `Next_Review` | Date | Next scheduled review |
| `Risk_Level` | Select | Critical, High, Medium, Low |
| `Notes` | Text | Additional context |

**Key relations:**
- `Requirement_IDs` → **Requirements** (which criteria this control supports)
- `Evidence_IDs` → **Evidence** (what artifacts demonstrate compliance)
- Reverse relation from **Obligations** → `Control_IDs`

**Views:**
1. **All Controls** — Default table sorted by Control_ID
2. **By Category** — Board view grouped by `Category`
3. **Risk Matrix** — Board grouped by `Risk_Level`
4. **Overdue Reviews** — Filtered where `Next_Review` < today
5. **By Owner** — Board grouped by `Owner`
6. **Critical & High Risk** — Filtered to Risk_Level = Critical or High

---

### 3.3 Evidence Database (`notion_db_evidence.csv`)

**Purpose:** Central artifact repository linking every piece of compliance documentation to its control and requirement.

| Property | Type | Description |
|---|---|---|
| `Evidence_ID` | Title (Primary Key) | e.g., `EVD-TEST-G10` |
| `Evidence_Name` | Text | Descriptive name |
| `Category` | Select | Information Blocking, Assurances, Communications, API Condition, Real World Testing, Attestations, Insights Condition, CHPL Maintenance, HIPAA, Safety-Enhanced Design, Direct Review, SAFER Guides, Certification Testing |
| `Evidence_Type` | Select | Policy Document, Test Tool Output, Test Evidence, Technical Documentation, Training Record, Analysis Document, Audit Report, Legal Document, Technical Artifact, Tracker, Results Report, Plan Document, Attestation Record, Assessment Report, Risk Register, Procedure Document, Screenshot, Process Document, Test Report, Customer Resource, Release Documentation |
| `Requirement_IDs` | Relation → Requirements | Linked criteria |
| `Control_IDs` | Relation → Controls | Linked controls |
| `File_Location` | Text/URL | Path to artifact or public URL |
| `Description` | Text | What this evidence demonstrates |
| `Owner` | Person / Text | Who maintains this artifact |
| `Status` | Select | Current, Draft, In Progress, Active, Submitted, Archived |
| `Date_Created` | Date | When created |
| `Date_Updated` | Date | Last update |
| `Retention_Expiry` | Date | When retention obligation expires (10 years for certification evidence) |
| `Notes` | Text | |

**Key relations:**
- `Requirement_IDs` → **Requirements**
- `Control_IDs` → **Controls**
- Reverse relation from **Tests** → `Evidence_IDs`

**Views:**
1. **All Evidence** — Default table
2. **By Category** — Board grouped by `Category`
3. **Retention Calendar** — Calendar view on `Retention_Expiry`
4. **Stale Evidence** — Filtered where `Date_Updated` < 6 months ago
5. **By Type** — Board grouped by `Evidence_Type`
6. **Certification Test Artifacts** — Filtered to Category = "Certification Testing"

---

### 3.4 Tests Database (`notion_db_tests.csv`)

**Purpose:** Track all certification tests, ONC test tool runs, RWT execution, and usability testing.

| Property | Type | Description |
|---|---|---|
| `Test_ID` | Title (Primary Key) | e.g., `TST-G10-001` |
| `Test_Name` | Text | Descriptive name |
| `Requirement_IDs` | Relation → Requirements | Criteria being tested |
| `Test_Type` | Select | Automated Test Tool, Manual + Automated, Test Tool Validation, Visual Inspection, Conformance Method, Documentation Review, Real World Testing, Usability Testing, Test Procedure + Visual Inspection, Automated Test Suite |
| `Test_Tool` | Text | Tool name |
| `Test_Tool_Version` | Text | Version number |
| `Standards_Tested` | Text | Standards and IGs validated |
| `Test_Data_Required` | Text | Input data or test scenarios needed |
| `Assigned_To` | Person / Text | Responsible team |
| `Status` | Select | Planned, In Progress, Pass, Fail, Blocked, Submitted, Complete |
| `Date_Planned` | Date | Scheduled test date |
| `Date_Executed` | Date | Actual execution date |
| `Result` | Text | Outcome description |
| `Evidence_IDs` | Relation → Evidence | Test output artifacts |
| `Issues_Found` | Text | Any problems discovered |
| `Remediation_Status` | Select | N/A, Open, In Progress, Resolved |
| `Notes` | Text | |

**Key relations:**
- `Requirement_IDs` → **Requirements**
- `Evidence_IDs` → **Evidence**

**Views:**
1. **All Tests** — Default table sorted by Test_ID
2. **By Status** — Board grouped by `Status`
3. **Failed / Blocked** — Filtered to Status = Fail or Blocked
4. **By Criterion** — Grouped by first Requirement_ID
5. **Test Timeline** — Calendar view on `Date_Executed`
6. **RWT Tests** — Filtered to Test_Type = "Real World Testing"

---

### 3.5 Obligations Database (`notion_db_obligations.csv`)

**Purpose:** Track every regulatory deadline, filing, and recurring obligation.

| Property | Type | Description |
|---|---|---|
| `Obligation_ID` | Title (Primary Key) | e.g., `OBL-ATT-APR26` |
| `Obligation_Name` | Text | Descriptive name |
| `Category` | Select | Attestations, Real World Testing, Insights Condition, CHPL Maintenance, Communications, Information Blocking, API Condition, Assurances, HIPAA, SAFER Guides |
| `Regulation` | Text | Regulatory citation |
| `Obligation_Type` | Select | Regulatory Filing, Data Reporting, Ongoing Compliance, Customer Notification, Security Assessment, Product Update, Customer Enablement |
| `Frequency` | Select | Semiannual, Annual, One-time, Ongoing, Event-driven |
| `Deadline` | Date / Text | Specific date or "Ongoing" |
| `Owner` | Person / Text | Responsible role |
| `Status` | Select | Pending, In Progress, Submitted, Complete, Active, TBD, Preparing, Planning |
| `Control_IDs` | Relation → Controls | Linked compliance controls |
| `EDN_Discretion` | Text | Active enforcement discretion |
| `Penalty_Risk` | Text | Consequence of non-compliance |
| `Description` | Text | Full description of obligation |
| `Notes` | Text | |

**Key relations:**
- `Control_IDs` → **Controls**

**Views:**
1. **All Obligations** — Default table sorted by Deadline
2. **Upcoming Deadlines** — Filtered to Deadline within next 90 days, sorted ascending
3. **By Category** — Board grouped by `Category`
4. **Overdue** — Filtered where Deadline < today AND Status ≠ Complete/Submitted
5. **Calendar** — Calendar view on `Deadline`
6. **Under Enforcement Discretion** — Filtered where EDN_Discretion ≠ "None"

---

### 3.6 Decisions Database (`notion_db_decisions.csv`)

**Purpose:** Architectural, regulatory, and strategic decision log with full context and rationale.

| Property | Type | Description |
|---|---|---|
| `Decision_ID` | Title (Primary Key) | e.g., `DEC-001` |
| `Decision_Title` | Text | Short title |
| `Category` | Select | Standards, Regulatory Strategy, Product, Certification, Compliance, Technical, Process, Clinical Safety |
| `Date_Raised` | Date | When the question was raised |
| `Date_Decided` | Date | When decision was made |
| `Decision_Owner` | Person / Text | Who made the final call |
| `Stakeholders` | Text | Teams/roles consulted |
| `Context` | Text (Long) | Background and trigger for the decision |
| `Options_Considered` | Text (Long) | All options evaluated |
| `Decision_Made` | Text | The chosen option |
| `Rationale` | Text (Long) | Why this option was selected |
| `Related_Requirements` | Relation → Requirements | Affected criteria |
| `Related_Controls` | Relation → Controls | Affected controls |
| `Impact` | Text | Downstream consequences |
| `Status` | Select | Open, Decided, Revisiting, Superseded |
| `Review_Date` | Date | When to revisit the decision |

**Key relations:**
- `Related_Requirements` → **Requirements**
- `Related_Controls` → **Controls**

**Views:**
1. **All Decisions** — Default table sorted by Date_Decided descending
2. **Open Decisions** — Filtered to Status = Open
3. **By Category** — Board grouped by `Category`
4. **Due for Review** — Filtered where `Review_Date` ≤ today + 30 days
5. **Timeline** — Timeline view from Date_Raised to Date_Decided

---

## 4. Database Relationship Map

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│ Requirements │◄──────│   Controls  │──────►│  Evidence   │
│  (46 rows)   │       │  (25 rows)  │       │  (32 rows)  │
│              │       │             │       │             │
│ Req_ID (PK)  │       │ Control_ID  │       │ Evidence_ID │
│ Depends_On──►│self   │ Req_IDs ───►│       │ Req_IDs ───►│
│              │       │ Evd_IDs ───►│───────│             │
└──────┬───────┘       └──────┬──────┘       └─────────────┘
       │                      │                     ▲
       │                      │                     │
       ▼                      ▼                     │
┌─────────────┐       ┌─────────────┐              │
│    Tests     │       │ Obligations │              │
│  (18 rows)   │       │  (15 rows)  │              │
│              │       │             │              │
│ Req_IDs ────►│       │ Ctrl_IDs ──►│              │
│ Evd_IDs ─────┼───────┼─────────────┼──────────────┘
└──────────────┘       └─────────────┘

┌─────────────┐
│  Decisions   │
│  (10 rows)   │
│              │
│ Rel_Reqs ───►Requirements
│ Rel_Ctrls ──►Controls
└──────────────┘
```

### Relation Summary

| From DB | Property | To DB | Cardinality | Purpose |
|---|---|---|---|---|
| Requirements | `Depends_On` | Requirements | Many-to-Many | Criterion dependency (e.g., (b)(1) depends on (g)(6)) |
| Controls | `Requirement_IDs` | Requirements | Many-to-Many | Which criteria a control supports |
| Controls | `Evidence_IDs` | Evidence | Many-to-Many | What artifacts prove compliance |
| Evidence | `Requirement_IDs` | Requirements | Many-to-Many | Which criteria evidence satisfies |
| Evidence | `Control_IDs` | Controls | Many-to-Many | Which controls evidence supports |
| Tests | `Requirement_IDs` | Requirements | Many-to-Many | Which criteria are being tested |
| Tests | `Evidence_IDs` | Evidence | Many-to-Many | Test output artifacts |
| Obligations | `Control_IDs` | Controls | Many-to-Many | Which controls satisfy obligations |
| Decisions | `Related_Requirements` | Requirements | Many-to-Many | Affected criteria |
| Decisions | `Related_Controls` | Controls | Many-to-Many | Affected controls |

**Notion import note:** Relations use semicolon-delimited ID strings in the CSV (e.g., `REQ-G10;REQ-G07`). After importing all 6 CSVs as databases, create Notion Relations by matching on the ID columns. The stable `*_ID` primary keys enable reliable cross-referencing.

---

## 5. Dashboard Design

### 5.1 Certification Dashboard (Main Page)

The executive dashboard is a Notion page with embedded linked database views:

**Row 1: Status Overview**
- **Certification Readiness Gauge**: Count of Requirements by Status (Active / In Progress / Blocked)
- **Test Pass Rate**: Count of Tests where Result = Pass vs. total
- **Control Health**: Count by Risk_Level (Critical / High / Medium / Low)

**Row 2: Deadlines**
- **Next 90 Days**: Linked view of Obligations filtered to Deadline ≤ today + 90 days, sorted by Deadline
- **Overdue Items**: Linked view of Obligations + Controls filtered where deadline/review date has passed

**Row 3: Enforcement Discretion**
- **Active EDN Tracker**: Table of current enforcement discretion notices with expiry dates and affected criteria
- Format:

| EDN | Topic | Expires | Criteria Affected | Action Required |
|---|---|---|---|---|
| EDN2025.01 | SOGI/USCDI v3 | ~Mar 2026 | (a)(5) and USCDI-referencing | Monitor for extension/removal |
| EDN2025.02 | Insights | Until deregulatory action | §170.407 | Instrument FHIR app metrics only |
| EDN2025.03 | RWT | Dec 31, 2026 | All RWT criteria | Submit (g)(7)-(10) results only |
| EDN2025.04 | eCR | Dec 31, 2026 | (f)(5) | Relaxed standards conformance |
| EDN2025.06 | HTI-1 Dates | Mar 1, 2026 | 15 criteria | Completed |

**Row 4: Risk Spotlight**
- Critical controls with upcoming review dates
- Open non-conformity or remediation items from Tests

### 5.2 HTI-5 Impact Tracker

Dedicated page showing:
- Requirements filtered to `HTI5_Impact` = "HTI-5 proposes removal"
- Decision DEC-002 embedded for strategy context
- Running count: 14 criteria proposed for removal from HealthOS scope
- Status of comment period and finalization timeline

---

## 6. Operating Workflows

### 6.1 Semiannual Attestation Cycle (April & October)

**Trigger:** 60 days before attestation deadline  
**Owner:** Compliance Officer  
**Steps:**

1. **T-60 days**: Review all Controls in each Condition category (§170.401-405)
2. **T-45 days**: Collect updated Evidence for each control; verify `Status` = Active/Current
3. **T-30 days**: Draft attestation responses (Compliant / Noncompliant / N/A per Condition)
4. **T-14 days**: Legal review of attestation; ensure any noncompliance is documented with corrective action plan
5. **T-7 days**: Compliance Officer signs attestation
6. **Deadline**: Submit to ONC-ACB via web form
7. **T+7 days**: Verify attestation status appears on CHPL; update `OBL-ATT-*` status and create evidence record

**Notion automation:** Create recurring tasks in Obligations with semiannual deadlines. Use Obligation calendar view to track.

### 6.2 Real World Testing Annual Cycle

| Phase | Timeline | Notion Action |
|---|---|---|
| Data collection | Jan 1 – Dec 31 | Monitor production metrics for RWT-eligible criteria |
| Results compilation | Jan 1 – Feb 28 | Create Test records (TST-RWT-*) with production metrics |
| ONC-ACB submission | By ONC-ACB deadline (typically Feb) | Update Obligation status; attach Evidence |
| CHPL publication | By March 15 | Verify CHPL link; update Evidence with CHPL URL |
| Plan development | Aug – Nov | Create draft plan in Obligations; link to Requirements |
| ONC-ACB plan submission | By ONC-ACB deadline (typically Nov) | Update Obligation status |
| CHPL plan publication | By December 15 | Verify CHPL link |

**2026 Exception:** Under EDN2025.03, no 2026 RWT plan is required. Only (g)(7)-(g)(10) CY 2025 results are due March 15, 2026.

### 6.3 Non-Conformity Response (30-Day Clock)

1. **Discovery**: Any team member identifies potential non-conformity
2. **Day 0**: Log in Tests database with `Status = Fail` and `Issues_Found` populated
3. **Day 0-1**: Notify Quality Director and Regulatory Affairs
4. **Day 1-5**: Root cause analysis; determine scope and severity
5. **Day 5-10**: Develop corrective action plan
6. **Day 10-25**: Implement corrective action; re-test
7. **Day 25-30**: Submit notification to ONC-ACB with description, timeline, and corrective action
8. **Post-30**: Track remediation to completion; update Test and Evidence records

### 6.4 Quarterly SED/UI Change Notification

1. **End of each quarter**: UX team reviews all UI changes to certified capabilities
2. Compile change list referencing affected Requirements (SED-applicable criteria)
3. Submit notification to ONC-ACB (Drummond Group)
4. Update Evidence record `EVD-SED-001` with quarterly change log

### 6.5 Information Blocking Review Cycle

1. **Quarterly**: Product and Legal review new features, pricing changes, contractual updates
2. Map any potentially blocking practice to Part 171 exceptions
3. Update Exception Analysis Log (`EVD-IB-003`)
4. **Semiannually**: Full review in preparation for attestation
5. Retain all documentation for 10 years

---

## 7. Import Instructions

### Step 1: Create databases in order

Import CSVs into Notion in this sequence to establish databases before creating relations:

1. `notion_db_requirements.csv` → Create as "Requirements" database
2. `notion_db_controls.csv` → Create as "Controls" database
3. `notion_db_evidence.csv` → Create as "Evidence" database
4. `notion_db_tests.csv` → Create as "Tests" database
5. `notion_db_obligations.csv` → Create as "Obligations" database
6. `notion_db_decisions.csv` → Create as "Decisions" database

### Step 2: Set column types

After import, manually set these column types in each database:

**Requirements:**
- `Category`, `Tier`, `Market_Status`, `Status`, `HTI5_Impact` → **Select**
- `Base_EHR`, `RWT_Applicable` → **Select** (Yes/No)
- `CCG_URL` → **URL**
- Convert `Depends_On` to **Relation → Requirements** (match on `Req_ID`)

**Controls:**
- `Category`, `Frequency`, `Status`, `Risk_Level` → **Select**
- `Last_Reviewed`, `Next_Review` → **Date**
- Convert `Requirement_IDs` to **Relation → Requirements** (split on `;`)
- Convert `Evidence_IDs` to **Relation → Evidence** (split on `;`)

**Evidence:**
- `Category`, `Evidence_Type`, `Status` → **Select**
- `Date_Created`, `Date_Updated`, `Retention_Expiry` → **Date**
- `File_Location` → **URL** (for external URLs) or **Text** (for file paths)
- Convert `Requirement_IDs` to **Relation → Requirements**
- Convert `Control_IDs` to **Relation → Controls**

**Tests:**
- `Test_Type`, `Status`, `Remediation_Status` → **Select**
- `Date_Planned`, `Date_Executed` → **Date**
- Convert `Requirement_IDs` to **Relation → Requirements**
- Convert `Evidence_IDs` to **Relation → Evidence**

**Obligations:**
- `Category`, `Obligation_Type`, `Frequency`, `Status` → **Select**
- `Deadline` → **Date** (leave "Ongoing" as text, or use a far-future date)
- Convert `Control_IDs` to **Relation → Controls**

**Decisions:**
- `Category`, `Status` → **Select**
- `Date_Raised`, `Date_Decided`, `Review_Date` → **Date**
- Convert `Related_Requirements` to **Relation → Requirements**
- Convert `Related_Controls` to **Relation → Controls**

### Step 3: Create views

For each database, create the views described in Section 3 above. At minimum, create:
- Board views grouped by Category or Status
- Calendar views on deadline/date columns
- Filtered views for risk and overdue items

### Step 4: Build Dashboard

Create the main "Certification Dashboard" page with linked database views as described in Section 5.

### Step 5: Create workflow pages

Build the Operating Workflow pages described in Section 6 with checklists and linked database filters.

---

## 8. ID Convention

All IDs follow a stable, human-readable pattern for reliable cross-referencing:

| Database | Pattern | Example |
|---|---|---|
| Requirements | `REQ-{section}{number}` | `REQ-G10`, `REQ-B01`, `REQ-A05` |
| Controls | `CTRL-{category}-{seq}` | `CTRL-IB-001`, `CTRL-API-002` |
| Evidence | `EVD-{category}-{seq}` or `EVD-TEST-{criterion}` | `EVD-IB-001`, `EVD-TEST-G10` |
| Tests | `TST-{criterion}-{seq}` | `TST-G10-001`, `TST-B03-001` |
| Obligations | `OBL-{category}-{context}` | `OBL-ATT-APR26`, `OBL-RWT-RES25` |
| Decisions | `DEC-{seq}` | `DEC-001`, `DEC-007` |

---

## 9. Key Metrics & Formulas

### Certification Readiness Score
```
Readiness = (Tests with Result=Pass) / (Total Tests) × 100
Target: 100% before ONC-ATL engagement
```

### Control Health Score
```
Health = (Controls with Status=Active or Complete) / (Total Controls) × 100
Target: ≥ 90%
```

### Evidence Freshness
```
Stale = Count where Date_Updated < (Today - 180 days) AND Status = Current
Target: 0 stale artifacts
```

### Obligation Compliance
```
On Track = (Obligations with Status=Complete or Submitted or Active) / (Total with Deadline ≤ Today) × 100
Target: 100%
```

---

## 10. Regulatory Coverage Summary

### By Condition of Certification

| Condition | §Citation | Controls | Evidence | Obligations |
|---|---|---|---|---|
| Information Blocking | §170.401 | CTRL-IB-001, 002, 003 | EVD-IB-001, 002, 003 | OBL-IB-COMPLY |
| Assurances | §170.402 | CTRL-AS-001, 002, 003, 004 | EVD-AS-001–005 | OBL-AS-COMPLY, OBL-HTI1-UPDATE |
| Communications | §170.403 | CTRL-CM-001, 002 | EVD-CM-001 | OBL-CM-NOTICE26 |
| API | §170.404 | CTRL-API-001, 002, 003, 004 | EVD-API-001–004 | OBL-API-COMPLY |
| Real World Testing | §170.405 | CTRL-RWT-001, 002, 003 | EVD-RWT-001, 002, 003 | OBL-RWT-RES25, OBL-RWT-PLAN27 |
| Attestations | §170.406 | CTRL-ATT-001, 002 | EVD-ATT-001 | OBL-ATT-APR26, OBL-ATT-OCT26 |
| Insights | §170.407 | CTRL-INS-001 | EVD-INS-001 | OBL-INS-FHIR27 |

### By Tier

| Tier | Criteria Count | Description |
|---|---|---|
| Tier 1 | 24 | Base EHR + CEHRT + mandatory PI measures |
| Tier 2 | 22 | Market competitiveness + HIPAA dependencies |
| Tier 3 | Not targeted | Specialty/niche (tracked for future) |

---

## 11. Maintenance & Governance

### Weekly
- Review Tests database for any Fail or Blocked items
- Check Obligations calendar for items due within 14 days

### Monthly
- Review Controls with Next_Review within 30 days
- Update Evidence for any recently changed artifacts
- Review Decisions for any approaching Review_Date

### Quarterly
- SED/UI change notification to ONC-ACB
- Information blocking exception analysis review
- Evidence freshness audit (flag items >6 months stale)
- HTI-5/regulatory landscape check

### Semiannually
- Full attestation cycle (see Workflow 6.1)
- Fee structure review (CTRL-IB-003, CTRL-API-004)

### Annually
- RWT plan and results cycle (see Workflow 6.2)
- HIPAA Security Risk Analysis
- SAFER Guides customer toolkit update
- Communications annual customer notice
- Full workspace audit: verify all relations, archive completed obligations

---

*This blueprint is designed for direct implementation in Notion. All six CSV files can be imported immediately. Relations should be created after all databases are imported using the stable ID conventions documented above.*
