# Factory Maturity Model

**Levels 0–5** — assign from audit evidence only. Gates in [FACTORY_RELEASE_LAW.md](./FACTORY_RELEASE_LAW.md).

---

## Levels

| Level | Name | Meaning |
|-------|------|---------|
| **0** | Idea | Concept only; no working artifact |
| **1** | Scaffold | Structure exists; placeholder README or shell |
| **2** | Prototype | Runs locally; incomplete; not ecosystem-trusted |
| **3** | Beta | Coherent; tested; documented gaps; may certify |
| **4** | Daily Driver | CI; honest docs; used routinely; integration proven |
| **5** | Foundation | Ecosystem-critical; certified; others depend on it |

---

## Minimum Requirements by Level

| Requirement | L0 | L1 | L2 | L3 | L4 | L5 |
|-------------|:--:|:--:|:--:|:--:|:--:|:--:|
| Build passes | — | ○ | ● | ● | ● | ● |
| Lint passes | — | — | ○ | ● | ● | ● |
| Typecheck script + pass | — | — | ○ | ● | ● | ● |
| Unit tests exist + pass | — | — | ○ | ● | ● | ● |
| E2E tests | — | — | — | ○ | ● | ● |
| Documentation matches behavior | — | ○ | ● | ● | ● | ● |
| ACTUAL_STATE_AUDIT.md | — | — | ○ | ● | ● | ● |
| Factory certification (standards) | — | — | — | ○ | ● | ● (required) |
| Repair plan/result for latest pass | — | — | — | ○ | ● | ● |
| Release gate documented | — | — | — | ○ | ● | ● |
| CI workflow | — | — | — | — | ● | ● |
| Manual human use proof | — | — | — | ○ | ● | ● |
| Independent audit (not self-only) | — | — | — | — | ○ | ● |

● Required · ○ Recommended · — Not required

---

## Current Assignments (audit evidence only)

| Program / Repo | Level | Audit score | Rationale |
|----------------|-------|-------------|-----------|
| factory-standards | **3 Beta** | 83 | Validator works; 20 tests; strong docs; stale artifacts block L4 |
| factory-core | **2 Prototype** | 74 | Self-cert 100; 16 tests; naming/monorepo/publish gaps |
| Factory (HQ) | **2 Prototype** | 52 | Polished UI; governance 005 adds docs; no live integration |
| BossLady, Citadel, Forge, FIP, Flippy, Observatory, Prime | **1 Scaffold** | — | Frozen tenant / placeholder zip only |
| Sentinel | **0 Idea** | — | Tenant id only; no building; no repo |
| Toolbelt / Horizon | **1 Scaffold** | — | Building shell; Horizon fixture only; relationship UNKNOWN |

---

## Promotion Rules

- **Never promote on mock data or self-asserted badges.**
- **Level 5** requires standards certification pass ≥ 97 for foundation repos, no competing canonical copy.
- **Level 4+** requires CI — **none of three audited repos have CI today.**
