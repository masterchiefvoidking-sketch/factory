# Factory Ecosystem — Canonical Map

**Document role:** Governing blueprint for all future repairs, features, and certification  
**Created:** 2026-07-05  
**Author role:** Factory Systems Architect  
**Evidence source:** `docs/audits/ACTUAL_STATE_AUDIT.md` in each audited repository only  
**Rules applied:** No redesign. No invented capabilities. Unknowns marked **UNKNOWN**.

---

## How to Read This Document

This map describes the **verified** Factory ecosystem as of the independent forensic audits dated 2026-07-05. It does not describe aspirational architecture from README marketing copy unless the audit confirmed implementation.

**Audited repositories:** 3  
**Repositories referenced but not audited:** Several tenant applications (see Part 1)  
**Confidence:** High for the three audited repos; Low–Medium for cross-repo integration that audits mark as unimplemented.

### Audit provenance

| GitHub repository | Audit branch | Audit overall score |
|-------------------|--------------|---------------------|
| `masterchiefvoidking-sketch/factory` | `cursor/project-titan-building-architecture-1a9f` @ `7cf31d0` | **52/100** |
| `masterchiefvoidking-sketch/code-factory` | `cursor/factory-standards-validate-core-9173` | **74/100** |
| `masterchiefvoidking-sketch/standards-for-factory` | `cursor/factory-standards-init-eb83` @ `6f03ef9` | **83/100** |

> **Note:** `factory` `main` may lag audited feature branches. `code-factory` `main` was a placeholder README at audit time. `standards-for-factory` `main` may lag `cursor/factory-standards-init-eb83`. Treat audited branches as evidence, not necessarily default branch HEAD.

---

## PART 1 — Ecosystem Inventory

### Verified repositories (audited)

#### 1. `factory` — Factory HQ (spatial headquarters shell)

| Field | Value (audit evidence) |
|-------|------------------------|
| **Purpose** | Spatial UI metaphor for Titan Campus; four in-app layers (Buildings, Nexus, Operations, Departments); integration façade sketches for future tenants |
| **Current maturity** | Prototype / demo v0.1.0 — polished experience shell, no production data path |
| **Primary responsibility** | Campus navigation, atmosphere, clearance gating, read-only operational dashboards, in-memory simulators |
| **Secondary responsibilities** | `FactoryNexus` singleton (object registry, events, search); `FactoryOperations` singleton (missions, conveyor, mail); department/org registry; executive visibility surfaces |
| **Technologies** | Next.js 15.5.20, React 19, TypeScript 5 (strict), Tailwind CSS 4, Framer Motion 12, Geist fonts |
| **Approximate size** | 56 TS/TSX files, ~7,156 LOC in `src/`, ~428 KB `src/` |
| **Current health** | `npm install` ✅ · `npm run build` ✅ · `npm run lint` ✅ · `npm test` ❌ missing script (audit) · `npm run typecheck` ❌ missing script (audit) · No CI · No API · No persistence |
| **Overall audit score** | **52/100** |

---

#### 2. `code-factory` — `@factory/core` (shared SDK)

| Field | Value (audit evidence) |
|-------|------------------------|
| **Purpose** | TypeScript library: Factory domain types, JSON validators, certification package create/read/validate/score, thin SDK helpers (events, objects, health, reports, Citadel archives) |
| **Current maturity** | Early foundation v0.1 — functional core, self-certified at readiness 100/100 |
| **Primary responsibility** | Shared SDK consumed by tenant repos (`@factory/core`) |
| **Secondary responsibilities** | CLI (`create:package`, `validate:package`); self-certification package (`factory-certification/`); **nested** `factory-standards/` validator subpackage (audit flags as architectural tension) |
| **Technologies** | TypeScript, tsup (ESM + `.d.ts`), Vitest 3.2.6, ESLint 9, tsx CLI, Node ES2022 — **zero production npm dependencies** |
| **Approximate size** | ~55 tracked files, ~2,041 TS LOC, `dist/index.js` ~32 KB |
| **Current health** | `npm install` ✅ · `npm test` ✅ (16 tests) · `npm run build` ✅ · `npm run lint` ✅ · `npm run typecheck` ✅ · Self-cert validation 100/100 · No CI · Not published to npm registry |
| **Overall audit score** | **74/100** |

**Naming tension (audit-confirmed):** Git repo `code-factory`, npm `@factory/core`, docs say `factory-core`.

---

#### 3. `standards-for-factory` — `factory-standards` (The Law)

| Field | Value (audit evidence) |
|-------|------------------------|
| **Purpose** | Certification standards: JSON schemas, constitutional docs, package validator CLI, scoring 0–100, tenant certification kit, `imports/` archive for submitted packages |
| **Current maturity** | Coherent foundation platform v1 — young git history (8 commits), reference-data debt |
| **Primary responsibility** | Define and enforce Factory certification law; validate tenant certification packages offline |
| **Secondary responsibilities** | Compatibility matrix; governance/roadmap docs; tenant bootstrap CLI; curated pass/fail fixtures |
| **Technologies** | TypeScript (ESM), `tsc` build, Vitest, ESLint, Ajv + ajv-formats, adm-zip, tsx |
| **Approximate size** | ~154 files, ~13,462 lines total; `src/` 7 files ~1,581 LOC; docs ~2,695 lines |
| **Current health** | `npm install` ✅ · `npm test` ✅ (20 tests) · `npm run build` ✅ · `npm run lint` ✅ · `npm run typecheck` ❌ missing script · `validate:examples` ✅ · No CI workflow file found |
| **Overall audit score** | **83/100** |

**Stored certification packages (audit-verified, not live apps):**

| Import path | Subject | Audit validation result |
|-------------|---------|-------------------------|
| `imports/factory/` | Factory HQ | PASS **95/100** |
| `imports/factory-core/` | SDK | PASS **97/100** |
| `imports/examples/citadel-valid/` | Positive fixture | PASS **98/100** |
| `imports/examples/horizon-invalid/` | Negative fixture | FAIL **75/100** (intentional) |
| `imports/{citadel,bosslady,forgina,horizon}/` | Tenant placeholders | `.zip` + `.gitkeep` only — **not validated in CI** |

---

### Referenced repositories — **UNKNOWN** (no audit available)

The audits reference these as **future or external** tenant applications. No `ACTUAL_STATE_AUDIT.md` was found. Do not assume implementation.

| Name | Referenced in | Audit evidence only |
|------|---------------|---------------------|
| **Citadel** | `standards-for-factory` imports placeholder zip; `code-factory` Citadel archive SDK types; `factory` frozen tenant + building | Placeholder zip in standards; SDK helpers exist; no separate repo audited |
| **BossLady** | Standards imports placeholder; `factory` frozen tenant + building | Placeholder zip only |
| **Forgina** | Standards imports placeholder | Placeholder zip only |
| **Horizon** | Standards negative test fixture `horizon-invalid` | Fixture only — not a live app audit |
| **Prime, Toolbelt, Forge, Flippy, FIP, Observatory, Sentinel** | `factory` frozen tenant registry + campus buildings | Metadata/UI shells inside `factory` only — **not separate repos** per factory audit |

**Ecosystem count:** 3 audited repositories + **UNKNOWN** number of unaudited tenant repositories.

---

## PART 2 — Responsibility Matrix

### `factory` (Factory HQ)

| | |
|--|--|
| **OWNS** | Spatial campus UI; client-side location state; travel/atmosphere/clearance UX; in-memory `FactoryNexus` and `FactoryOperations` simulators; building/department narrative registries; Tower/Commons/Operations **presentation** of company state |
| **MUST NOT own** | Tenant application business logic (frozen by design); persistent storage; authentication provider; canonical standards/schemas; certification validation authority; npm SDK implementation |
| **Consumes** | **UNKNOWN** live consumption of `@factory/core` or `factory-standards` — factory audit found no `fetch`, no API routes, no npm dependency on SDK |
| **Provides** | Human-facing headquarters experience; future import/orchestration surface (documented intent, **not implemented**) |

---

### `code-factory` (`@factory/core`)

| | |
|--|--|
| **OWNS** | Factory domain TypeScript types; hand-coded JSON validators; certification package filesystem workflow; SDK helpers (events, objects, health, reports, Citadel archive); factory-core self-certification package |
| **MUST NOT own** | Long-term canonical law (audit assigns to separate `factory-standards` repo); tenant product UIs; Factory HQ spatial shell; live Factory import UI |
| **Consumes** | Standards rules **mirrored** in `src/standards/constants.ts` (audit: may drift from authoritative standards repo) |
| **Provides** | `@factory/core` library + CLI for tenants to create/validate certification packages; validated import package at `factory-standards/imports/factory-core` when nested copy used |

---

### `standards-for-factory` (`factory-standards`)

| | |
|--|--|
| **OWNS** | JSON schemas; constitutional/protocol documentation; certification validator engine; scoring model; compatibility matrix; tenant certification kit; `imports/` certification archive; bootstrap scaffolding |
| **MUST NOT own** | TypeScript SDK implementation (audit: `factory-core` / `code-factory`); HQ UI; tenant product runtime; executing tenant test suites |
| **Consumes** | Certification packages submitted as directories/zips (manual drop into `imports/`) |
| **Provides** | Validation reports (`validation-report.json/md`); pass/fail + 0–100 scores; governance docs; kit for tenant self-certification |

---

### Cross-repo responsibility conflicts (audit-identified, not resolved)

| Conflict | Repos involved | Evidence |
|----------|----------------|----------|
| **Two `factory-standards` locations** | `standards-for-factory` vs `code-factory/factory-standards/` | Both audits describe standards tooling; code-factory nests a copy; standards audit is standalone "Law" |
| **Two validation CLIs** | `@factory/core` root CLI vs standards validator | Standards adds foundation review layer on top of core validation |
| **Constants duplication** | `code-factory` `src/standards/` vs `standards-for-factory` `schemas/` | Audits flag drift risk |
| **Three worker registries** | Inside `factory` only | `EMPLOYEES`, `TENANTS`, `DEPARTMENTS.workers` |
| **Two permission models** | Inside `factory` only | `ClearanceLevel` vs `NexusPermission` |

---

## PART 3 — Ecosystem Layers

Layers ordered bottom-up. Placement uses **audit evidence**, not marketing names alone.

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 7 — Archived / Experimental                          │
│  (placeholder tenant zips, dead UI, unwired APIs)           │
├─────────────────────────────────────────────────────────────┤
│  Layer 6 — Applications (tenant products)                   │
│  UNKNOWN repos: Citadel, BossLady, Forgina, Horizon, …      │
│  factory: frozen tenant METADATA + building shells only     │
├─────────────────────────────────────────────────────────────┤
│  Layer 5 — Operating System / HQ                            │
│  factory — spatial HQ, operations/nexus simulators (UI)     │
├─────────────────────────────────────────────────────────────┤
│  Layer 4 — Shared SDK                                       │
│  code-factory (@factory/core)                               │
├─────────────────────────────────────────────────────────────┤
│  Layer 3 — Standards / Law                                  │
│  standards-for-factory (factory-standards)                  │
│  ⚠ DUPLICATE: code-factory/factory-standards/ (nested)      │
├─────────────────────────────────────────────────────────────┤
│  Layer 2 — Certification artifacts                          │
│  imports/* packages, factory-certification/, templates      │
├─────────────────────────────────────────────────────────────┤
│  Layer 1 — Governance documentation                         │
│  Audits, constitution, protocols, canonical map (this doc)  │
└─────────────────────────────────────────────────────────────┘
```

### Layer 1 — Governance & evidence

| Component | Repository | Status |
|-----------|------------|--------|
| Forensic audits | Each repo `docs/audits/` | 3 exist |
| Constitution, protocols, roadmap | `standards-for-factory/docs/` | Audit: extensive |
| SDK docs | `code-factory/docs/` | Audit: good for v0.1 |
| Canonical ecosystem map | `factory/docs/` (this file) | New |

### Layer 2 — Certification artifacts (data, not code)

| Artifact | Owner | Verified |
|----------|-------|----------|
| `factory-manifest.json`, audit, health, qualification, compatibility, report | Tenant repos produce; standards validates | Schema in standards repo |
| `imports/factory/` HQ package | standards-for-factory | PASS 95/100 |
| `imports/factory-core/` SDK package | standards-for-factory | PASS 97/100 |
| `factory-certification/` self-cert | code-factory | PASS 100/100 (core validator) |

### Layer 3 — Standards (The Law)

**Canonical owner (per both foundation audits):** `standards-for-factory`  
**Duplicate/nested copy:** `code-factory/factory-standards/` — audit tension, split-repo vs monorepo **UNKNOWN**

### Layer 4 — Shared SDK

**Owner:** `code-factory` (`@factory/core`)  
Zero runtime dependencies; hand-coded validators; not published to npm.

### Layer 5 — Operating System / HQ

**Owner:** `factory`  
Single-page Next.js app; four provider layers; in-memory singletons; no backend.

### Layer 6 — Applications (tenants)

**Intended:** Separate repos per tenant (Citadel, BossLady, etc.)  
**Verified today:** Only certification placeholders and `factory` UI metaphors — **no audited tenant application repositories**.

### Layer 7 — Archived / experimental / dead paths

| Item | Location | Audit status |
|------|----------|--------------|
| `OperationsCenterInterior` | factory | Dead code, never routed |
| Unwired APIs (`submitRequest`, `copyToClipboard`, `registerObject`) | factory singletons | API only |
| Stale `examples/` tree | standards-for-factory | Audit: legacy vs `imports/examples/` |
| Placeholder tenant zips | standards `imports/` | Not CI-validated |
| `main` branch placeholder README | code-factory | Superseded on feature branch |

---

## PART 4 — Maturity

Scale: **0 Idea · 1 Scaffold · 2 Prototype · 3 Beta · 4 Daily Driver · 5 Foundation**

| Repository | Level | Why (audit evidence) |
|------------|-------|----------------------|
| **standards-for-factory** | **3 — Beta** | Validator pipeline works; 20 passing tests; strong docs; stores two approved foundation packages. Not Level 4: no CI, stale examples/zips, missing `typecheck` script, no self-cert entry in `imports/factory-standards/`, CLI-only |
| **code-factory** | **2 — Prototype** | Self-cert 100/100 and 16 tests prove core loop. Not Level 3: repo identity confusion, nested standards duplicate, not npm-published, self-audit only, monorepo vs documented split **UNKNOWN**, 3 git commits |
| **factory** | **2 — Prototype** | Polished navigable UI and coherent four-layer metaphor. Not Level 3: no persistence, no real tenants, no SDK integration, missing test/typecheck scripts at audit, factory readiness **38/100**, overall **52/100** |
| **Citadel, BossLady, Forgina, Horizon** | **UNKNOWN** | Referenced; only placeholder zips or fixtures — no repository audit |
| **Tenant apps inside factory registry** | **1 — Scaffold** (metaphor only) | Frozen metadata + building interior shells; explicitly not running apps |

### Ecosystem-wide maturity (synthesis)

The ecosystem has a **functional certification foundation** (standards + SDK) and a **demonstration HQ shell** that are **not yet wired together**. Level **2–3** overall; not Level 4 (Daily Driver) or Level 5 (Foundation) for the full stack.

---

## PART 5 — Integration Map

### Who talks to whom (verified vs intended)

```
                    ┌──────────────────────┐
                    │ standards-for-factory │
                    │  (validate packages)  │
                    └──────────┬───────────┘
                               │ reads certification dirs/zips
                               ▼
┌──────────────┐    ┌──────────────────────┐    ┌─────────────────┐
│ Tenant repos │───▶│ imports/{tenant}/    │◀───│ code-factory    │
│  UNKNOWN     │    │ (standards archive)  │    │ produces packages│
└──────────────┘    └──────────────────────┘    └────────┬────────┘
       │                                                    │
       │ intended: npm install @factory/core                  │ self-cert
       ▼                                                    ▼
┌──────────────┐                              ┌──────────────────────────┐
│ @factory/core│                              │ factory-certification/   │
│  library     │                              │ imports/factory-core/    │
└──────────────┘                              └──────────────────────────┘

                               ┌──────────────────────┐
                               │ factory (HQ UI)      │
                               │ NO verified wire to  │
                               │ SDK or standards yet │
                               └──────────────────────┘
```

### Required interfaces (audit-evidenced)

| Interface | Producer | Consumer | Status |
|-----------|----------|----------|--------|
| Certification package layout (5+ files) | Tenant / SDK CLI | standards validator, core validator | **Working** offline |
| `factory-manifest.json` + linked docs | Tenant | Validator cross-file rules | **Working** |
| `@factory/core` npm package | code-factory | Tenant repos (intended) | **Not published** — vendor/`file:` only |
| Validation report JSON/MD | standards validator | Human / future Factory import | **Working** locally |
| Factory object/event model | factory `FactoryNexus` | Tenants (intended) | **In-memory mock only** in HQ |
| Skybridges / Nexus contract | factory UI data | Tenant apps (intended) | **Data only, no runtime bridge** |
| Factory HQ import UI | factory (intended) | Reads `imports/` packages | **UNKNOWN / not implemented** per factory audit |

### Required certification (audit-evidenced workflow)

1. Tenant copies `tenant-certification-kit/` (from standards) or uses `@factory/core` CLI (from code-factory).
2. Tenant fills manifest, audit, health, qualification, compatibility, report.
3. Tenant runs `npm run validate:package` (core) locally.
4. Package dropped into `standards-for-factory/imports/{tenant}/` (manual).
5. Maintainer runs `npm run validate:package` (standards) — scores 0–100, pass/fail.
6. **Future (documented, not verified):** Factory HQ imports approved packages.

**Verified certified (standards imports):** `factory` 95/100, `factory-core` 97/100.

### Required imports (npm / code)

| Consumer | Expected import | Verified |
|----------|-----------------|----------|
| Tenant repo | `@factory/core` | Documented in code-factory; **no tenant repo audited** |
| standards scripts | `@factory/core` via `file:` in nested code-factory copy | Works in code-factory monorepo audit |
| standards-for-factory standalone | **UNKNOWN** if it depends on `@factory/core` — standalone audit describes own validator in `src/` |
| factory HQ | `@factory/core` | **Not present** in factory audit dependencies |

### Required outputs

| Producer | Output | Consumer |
|----------|--------|----------|
| Tenant certification | Directory or zip package | standards `imports/` |
| standards validator | `validation-report.json`, `.md` | Humans; future HQ |
| code-factory validator | stdout + exit code; readiness score | Tenant CI (intended) |
| factory HQ | Spatial UI state (session-only) | End user browser |

### Unknown integrations

| Integration | Status |
|-------------|--------|
| Factory HQ reads standards `imports/` at runtime | **UNKNOWN** — factory audit: no API, no fetch |
| Live event bus across repos | **UNKNOWN** — in-memory in HQ only |
| Tenant iframe/micro-frontend mount in HQ buildings | **UNKNOWN** — factory audit: no embed |
| npm registry publish for `@factory/core` | **UNKNOWN** |
| Git repo split: code-factory vs standards-for-factory | **UNKNOWN** — audits document tension |
| CI pipelines per repo | **UNKNOWN** — no `.github/workflows` in any audit |
| Citadel archive live pipeline | SDK types exist; **no live integration** |

---

## PART 6 — Duplication Analysis

Identification only — no redesign proposed.

### Duplicate concepts

| Concept | Locations | Risk |
|---------|-----------|------|
| **factory-standards** | `standards-for-factory` repo AND `code-factory/factory-standards/` | Two sources of "Law"; split vs monorepo unresolved |
| **Standards constants** | `code-factory/src/standards/constants.ts` AND `standards-for-factory/schemas/` | Drift (audit-confirmed) |
| **Package validation** | Core CLI vs standards CLI (+ foundation review) | Overlapping entry points |
| **Worker/tenant identity** | `factory`: EMPLOYEES, TENANTS, DEPARTMENTS.workers | Three registries, same metaphor |
| **Department representation** | `factory` operations `DepartmentStatus` vs departments `Department` | Same org, different types |
| **Permission models** | `factory` ClearanceLevel vs NexusPermission | Only one has UI |
| **Operations monitoring** | `OperationsFloorInterior` vs dead `OperationsCenterInterior` | Routing ambiguity |
| **Factory services list** | 18 Nexus services vs 10 department service names | Doc/count mismatch |

### Duplicate engines

| Engine | Locations |
|--------|-----------|
| Certification validation | `@factory/core` validators; `standards-for-factory/src/validator.ts`; nested copy in code-factory |
| Package packager | `standards-for-factory/src/package-certification.ts` vs `tenant-certification-kit/scripts/package-certification.ts` (kit version older per audit) |

### Duplicate dashboards

| Dashboard | Locations |
|-----------|-----------|
| Watchboard / Command Center | Tower Mission Control AND Operations Floor (`factory`) |
| Department dashboards | Per-building `DepartmentDashboardPanel` + Commons floor map (computed separately) |
| System health metrics | Dead `OperationsCenterInterior` (Nexus metrics) vs `OperationsFloorInterior` (business ops) |

### Duplicate storage

| Data | Locations |
|------|-----------|
| factory-core certification | `code-factory/factory-certification/` AND `standards-for-factory/imports/factory-core/` AND nested `code-factory/factory-standards/imports/factory-core/` |
| Example certification packages | `standards-for-factory/examples/` (stale) AND `imports/examples/` (CI-checked) |
| Factory HQ certification | `standards-for-factory/imports/factory/` folder vs `.zip` (audit: can diverge) |

### Duplicate documentation

| Topic | Locations |
|-------|-----------|
| Standards relationship | `code-factory/docs/HOW_CORE_RELATES_TO_STANDARDS.md` vs `standards-for-factory/docs/` |
| Tenant integration | `code-factory/docs/TENANT_INTEGRATION.md` vs `standards-for-factory/tenant-certification-kit/` |
| Foundation README | `code-factory` feature branch vs `main` placeholder |

### Duplicate responsibility

| Responsibility | Competing owners |
|----------------|------------------|
| Canonical law | `standards-for-factory` (intended) vs nested `code-factory/factory-standards/` |
| Standards validation | Standalone standards repo vs nested subpackage |
| Company operations UI | Tower Mission Control vs Operations Center building (same seeded data) |
| Infrastructure ops UI | Utility Floor (Nexus services) vs dead OperationsCenterInterior |

---

## PART 7 — Repair Priority

Single ordered queue across the ecosystem. Position = dependency order + audit "safest next step" + risk reduction. **No repairs ordered here — sequencing only.**

| Order | Repository | Why this position |
|-------|------------|-------------------|
| **1** | `standards-for-factory` | **Law must be trustworthy first.** Audit score highest (83) but stale `examples/`, zip/folder drift, and unvalidated placeholder imports undermine all downstream certification. Safest audit step: validate/regenerate every `imports/` zip. Blocks tenant trust. |
| **2** | `code-factory` | **SDK is second foundation.** Self-cert passes but repo identity confusion, nested standards duplicate, and unpublished package block tenant adoption. Audit safest step: next tenant cert (Citadel) using SDK — proves cross-repo loop. Depends on standards being authoritative (order 1). |
| **3** | `factory` | **HQ consumes proofs last.** Richest UI but lowest factory readiness (38) and no wire to SDK/standards. Audit safest step: resolve Operations Center dead code + building copy truth. Depends on knowing what certification import will look like (orders 1–2). |
| **4** | **UNKNOWN tenant repos** (Citadel first per code-factory audit) | Placeholder zips only. First real tenant audit+certification proves end-to-end ecosystem — cannot prioritize further without audits. |
| **5** | Ecosystem CI/CD | **UNKNOWN owner repo.** All three audits: no `.github/workflows`. After per-repo health stable, shared CI gates certification. |
| **6** | Integration wiring (HQ ↔ imports ↔ SDK) | **Not started** per audits. Only after individual repos certified and artifacts trusted. |

### Per-repository first repair (from audits — for execution planning only)

| Repo | Audit "safest next step" |
|------|--------------------------|
| standards-for-factory | Validate every `imports/` zip; regenerate failures |
| code-factory | Citadel certification using SDK helpers |
| factory | Resolve Operations Center routing / delete dead `OperationsCenterInterior` + align building copy |

---

## PART 8 — Certification Gates

Gates define minimum bar to **advance maturity level** (Part 4). Derived from what audited repos actually have — not invented requirements.

### Level 0 — Idea

| Gate | Requirement |
|------|-------------|
| Documentation | Concept README |
| Tests | None |
| Scripts | None |
| CI | None |
| Qualification | None |
| Factory certification | None |

### Level 1 — Scaffold

| Gate | Requirement |
|------|-------------|
| Documentation | README + folder structure |
| Tests | **UNKNOWN** minimum |
| Scripts | `build` or equivalent |
| CI | None |
| Qualification | None |
| Factory certification | None |

*Example: `code-factory` `main` branch at audit — placeholder README only.*

### Level 2 — Prototype

| Gate | Requirement |
|------|-------------|
| Minimum tests | At least one passing test file **OR** audit documents explicit test gap with passing build |
| Documentation | README describes actual behavior |
| Scripts | `build`, `test` (may fail if missing — factory audit failed here) |
| CI | Not required (none have it) |
| Qualification | Self-declared or draft manifest |
| Factory certification | Optional; may fail |
| Typecheck | Recommended — code-factory has it; standards missing script; factory missing at audit |

**factory at audit:** Met some gates (build, lint) — failed test/typecheck scripts → solidly Prototype, not Beta.

### Level 3 — Beta

| Gate | Requirement |
|------|-------------|
| Minimum tests | All tests pass; ≥10 tests OR audit documents coverage of critical validator paths |
| Documentation | Docs match code; known gaps listed |
| Scripts | `build`, `test`, `lint`; `typecheck` recommended |
| CI | Recommended — **none audited yet** |
| Qualification | `factory-qualification.json` with honest status |
| Factory certification | Package in `standards-for-factory/imports/` with **pass** and score ≥ threshold (audit uses 95+ for foundation) |
| Factory certification validator | `npm run validate:package` pass on standards repo |

**standards-for-factory:** Meets most; missing `typecheck` script and CI prevents Level 4.

### Level 4 — Daily Driver

| Gate | Requirement |
|------|-------------|
| Minimum tests | Passing test suite + documented coverage target |
| Documentation | Complete, no stale reference artifacts |
| Scripts | Full set: `build`, `test`, `lint`, `typecheck` |
| CI | Required — build + test + lint on PR |
| Qualification | Operational or equivalent per manifest lifecycle |
| Factory certification | Pass; score ≥ 95; zip and folder synchronized |
| Integration | Verified consumer exists (e.g., HQ imports package OR tenant uses SDK in production path) |

**No audited repo meets Level 4 today.**

### Level 5 — Foundation

| Gate | Requirement |
|------|-------------|
| Minimum tests | Comprehensive; coverage reporting; negative fixtures |
| Documentation | Constitution-level; protocols indexed |
| Scripts | Full script surface + validation CLIs |
| CI | Required + certification validation in pipeline |
| Qualification | Operational; independent audit (not self-audit only) |
| Factory certification | Pass 97+; stored in standards `imports/`; TENANT_ROLLOUT_READY true |
| Ecosystem role | Other repos depend on it; published or stable vendor path |
| Duplication | No competing canonical copy in another repo |

**Candidate:** `standards-for-factory` aspires to this role; blocked by artifact drift, no CI, nested duplicate in code-factory, no independent audit.

---

## PART 9 — Success Criteria

What the **completed** Factory ecosystem looks like — descriptive success state, not a redesign plan. Grounded in audit gaps inverted.

### Reliability

- Certification packages in `standards-for-factory/imports/` are validated in CI; zips match folders.
- HQ (`factory`) does not present mock data as live without labeling.
- No dead routed components; building copy matches actual UI.
- Session state or persistence documented; conveyor/operations mutations survive refresh **or** are honestly ephemeral.

### Integration

- Tenant repos vendor or `npm install` a **published** `@factory/core`.
- HQ reads approved certification packages from standards archive (or API) — import protocol implemented.
- Frozen tenants in HQ either embed real apps or UI says "not connected."
- Single canonical `factory-standards` location; no competing nested copy without explicit sync contract.
- Event/object registry in HQ backed by SDK types, not parallel ad-hoc models.

### Testing

- Every repo: `npm test` passes with meaningful coverage of critical paths.
- Every repo: `npm run typecheck` exists and passes.
- standards: `validate:examples` in CI; all `imports/` zips validated.
- factory: tests for `FactoryNexus`, `FactoryOperations`, navigation/clearance logic.
- code-factory: validator coverage beyond single test file; negative cases.

### Maintainability

- One worker/tenant registry source of truth (or documented mapping).
- One permission model (or documented bridge).
- No stale `examples/` trees; one example location.
- LICENSE files present where package.json claims MIT.
- `next lint` migration planned before Next.js 16.

### Performance

- HQ remains static-prerender friendly; bundle size monitored (audit: ~102 kB first load — acceptable).
- Validation CLI stays sub-second for typical packages (audit: <200ms in standards tests).

### Developer experience

- README lists all scripts per repo.
- Tenant kit + SDK docs agree on file counts and optional fields.
- Bootstrap CLI creates repos that pass validation on first try.
- New engineer onboarding path: read this map → read three audits → run validate on imports.

### Minimal duplication

- `factory-standards` exists in exactly one canonical git remote.
- Standards constants have one authoritative file; core mirrors via generated or pinned sync.
- One packager implementation (kit imports from standards, not fork).
- One operations monitoring concept in HQ (infra vs business ops clearly separated).

### Clear ownership

| Layer | Owner |
|-------|-------|
| Law / schemas / validator | `standards-for-factory` |
| SDK / types / tenant CLI | `code-factory` |
| HQ shell / import UI / spatial UX | `factory` |
| Tenant product behavior | Each tenant repo |
| Certification archive | `standards-for-factory/imports/` |
| Ecosystem governance | This document + audits + standards constitution |

---

## Appendix A — Audit score summary

| Dimension | factory | code-factory | standards-for-factory |
|-----------|---------|--------------|----------------------|
| Mission clarity | 78 | 82 | 92 |
| Architecture | 72 | 75 | 88 |
| Code quality | 74 | 80 | 85 |
| Documentation | 45 | 78 | 90 |
| Testing | 5 | 65 | 78 |
| Maintainability | 58 | 72 | 80 |
| Scalability | 50 | 60 | 75 |
| UX | 70 | 50 (N/A baseline) | 70 |
| Performance | 82 | 85 | 85 |
| Factory readiness | 38 | 77 | 90 |
| **Overall** | **52** | **74** | **83** |

---

## Appendix B — Document governance

| Rule | Enforcement |
|------|-------------|
| Audits are primary evidence | Re-audit before changing maturity scores |
| No invented capabilities | If not in an audit, mark **UNKNOWN** |
| No redesign in this map | Sequencing and ownership only |
| Updates | New `ACTUAL_STATE_AUDIT.md` in any repo triggers map review |
| Conflicts | Standards repo wins for certification law; SDK audit wins for type shapes; factory audit wins for HQ behavior |

---

## Appendix C — Open unknowns (ecosystem-wide)

1. Final git topology: monorepo vs split for core + standards  
2. npm publish plan for `@factory/core` and/or standards CLI  
3. Existence and state of Citadel, BossLady, Forgina, Horizon repositories  
4. Factory HQ import UI implementation timeline  
5. Authentication and persistence architecture  
6. Whether Sentinel gets a building or shares Observatory  
7. CI/CD ownership and GitHub Actions adoption  
8. Independent audit process vs self-certification  
9. JSON Schema as source of truth vs hand-coded validators long-term  
10. Whether `factory` repair branches change audit baseline (re-audit if merged)

---

*This is the canonical governing map for the Factory ecosystem. It describes verified state and documented intent only. It does not authorize redesign or implementation.*
