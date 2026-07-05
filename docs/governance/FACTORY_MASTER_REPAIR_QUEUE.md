# Factory Master Repair Queue

**One ecosystem-wide queue.** Not per-repo silos.  
**Code mirror:** `src/governance/repair-queue.ts`

Prioritized by **dependency order** and **risk to ecosystem trust**.  
Updated after **Proof #001 — Citadel Tenant Certification** ingest (2026-07-05).

---

## Completed (evidence-backed)

| ID | Repo | Reason | Evidence |
|----|------|--------|----------|
| **R-001** | factory-standards | Standards completion pass | Completion pass succeeded; Citadel validated at standards |
| **R-002** | factory-core | Core completion pass | factory-core completion pass succeeded |
| **R-003** | factory | HQ governance truth | Governance 005 docs + static Control Tower |
| **R-004** | factory | Test/typecheck baseline | npm test, typecheck, build, lint pass |
| **R-007** | citadel | Tenant certification verified | Proof #001 PASS 98/100; factoryCertificationReady |
| **R-015** | factory | Proof ingest | FACTORY_PROOF_LOG.md + registry updated |

---

## Open — forward order (not completed)

| ID | Order | Repo | Severity | Reason | Safe first action | Blockers | Done criteria |
|----|-------|------|----------|--------|-------------------|----------|---------------|
| **R-011** | 1 | citadel | Critical | Add CI to Citadel certification path | CI: test, build, lint, typecheck, cert:validate | R-015 done | CI runs on every change |
| **R-012** | 2 | factory | High | Register more tenants through certification | Run cert chain; ingest proofs | R-011 pattern | Proof #002+ in log |
| **R-005** | 3 | flippy | Medium | Resolve Mr. Flippy branch identity | Audit repo; document branch | UNKNOWN repo | Branch in registry |
| **R-006** | 4 | bosslady | Medium | Certify BossLady | Audit + certification package | R-012 pattern | Proof if pass |
| **R-008** | 5 | prime | Medium | Certify Forgina | Audit + cert chain | R-012 pattern | Proof if pass |
| **R-013** | 6 | factory | High | Certify Factory itself | Run standards/core against Factory | R-004 | Self-cert proof recorded |
| **R-009** | 7 | toolbelt | Medium | Certify Horizon after scope decision | Decide player/scope first | Scope UNKNOWN | Cert only after decision |
| **R-010** | 8 | factory | High | Live integration contracts | Document contract; no fake wire | R-011, R-013 | Static registry first |

---

## Why this order

1. **Citadel CI (R-011)** — First real tenant proof exists; automate the path before scaling.
2. **More tenants (R-012)** — Repeat proven chain; grow proof log honestly.
3. **Flippy identity (R-005)** — Release path blocked without canonical branch.
4. **BossLady / Forgina (R-006, R-008)** — Next tenant certifications after pattern established.
5. **Factory self-cert (R-013)** — HQ must certify itself before claiming full control tower authority.
6. **Horizon (R-009)** — Only after explicit player/scope decision.
7. **Live integration (R-010)** — Last; Proof #001 explicitly does not prove live wire.

---

## Superseded

Factory-only `docs/repair/REPAIR_PLAN.md` remains for historical context. **Ecosystem order defers to this file.**
