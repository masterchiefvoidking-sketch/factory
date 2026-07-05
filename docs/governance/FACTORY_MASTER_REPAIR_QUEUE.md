# Factory Master Repair Queue

**One ecosystem-wide queue.** Not per-repo silos.  
**Code mirror:** `src/governance/repair-queue.ts`

Prioritized by **dependency order** and **risk to ecosystem trust**.

---

| ID | Order | Repo | Severity | Reason | Safe first action | Blockers | Done criteria |
|----|-------|------|----------|--------|-------------------|----------|---------------|
| **R-001** | 1 | factory-standards | Critical | Law must be trustworthy first | Validate every `imports/` zip; regenerate failures | None | All zips pass; examples synced |
| **R-002** | 2 | factory-core | High | SDK must prove outside itself | Citadel cert package via SDK CLI | R-001 | Second tenant validated at standards |
| **R-003** | 3 | factory | High | HQ governance truth before live claims | Complete `docs/governance/*`; static Control Tower | R-001–002 for live wire | Docs + labeled static UI |
| **R-004** | 4 | factory | Medium | Test/typecheck baseline | Merge repair-pass scripts; test governance registry | — | All npm scripts pass |
| **R-005** | 5 | flippy | Medium | Canonical branch unknown | Audit Mr. Flippy / Web Flip Factory repo | UNKNOWN repo | Audit + branch documented |
| **R-006** | 6 | bosslady | Medium | Engineering workflow unproven | Forensic audit + certification | R-002 | ACTUAL_STATE_AUDIT + imports/ |
| **R-007** | 7 | citadel | Medium | Memory integration unclear | Audit Citadel; README truth | R-002 | Audit complete |
| **R-008** | 8 | prime | Medium | Forgina usage unverified | Audit Prime/Forgina repo | UNKNOWN | ACTUAL_STATE_AUDIT |
| **R-009** | 9 | toolbelt | Medium | Horizon scope undecided | Clarify Horizon vs Toolbelt; audit | UNKNOWN repos | Relationship documented |
| **R-010** | 10 | factory | High | Integration contracts unwired | Document contract; no fake wire | R-001–003 | Static registry in UI; live later |

---

## Why This Order

1. **Standards** — If law is wrong, every certification is meaningless.
2. **Core** — Tenants need a proven SDK before HQ can display honest status.
3. **Factory governance** — Control tower is documentation + registry first (this pass).
4. **Factory quality gates** — Scripts/tests on HQ repo itself.
5–9. **Tenants** — Only after foundation; each needs its own audit.
10. **Live integration** — Last; requires trusted artifacts and contracts.

---

## Superseded

Factory-only `docs/repair/REPAIR_PLAN.md` remains for historical context. **Ecosystem order defers to this file.**
