# Factory Control Tower

**Design for Mission Control** — ecosystem command headquarters.  
**Current implementation:** Static registry panel only (Governance 005).

---

## Purpose

Mission Control (Tower Floor 2) must eventually answer in under 60 seconds:

- Is the ecosystem healthy?
- What is blocked?
- What ships next?
- Who owns what?

Today it shows **seeded operations mock data** (audit-confirmed). Governance 005 adds a **clearly labeled static** ecosystem registry panel alongside existing views.

---

## Future Mission Control Contents

| Panel | Data source (future) | Today |
|-------|----------------------|-------|
| Repository health | CI webhooks → governance API | **Static** `src/governance/status.ts` |
| Build/test/lint/typecheck | Per-repo CI | **UNKNOWN** — not wired |
| Maturity level | REPOSITORY_REGISTRY | **Static** registry |
| Master repair queue | `repair-queue.ts` | **Static** top 5 items |
| Blockers | Registry entries | **Static** |
| Tenant status | Tenant audits + cert packages | **GRAY** / placeholder |
| Department status | Operations runtime | **Mock** seeded data |
| Factory certification | standards imports/ | **Static** scores from audits |
| Release readiness | RELEASE_LAW gates | **Doc only** |
| Integration map | DEPENDENCY_GRAPH | **Doc only** |
| Unknowns | Registry confidence=low | **Listed** |

---

## UI Implementation (005)

| Component | Location | Behavior |
|-----------|----------|----------|
| `ControlTowerPanel` | `src/components/governance/ControlTowerPanel.tsx` | Static table; banner: NOT LIVE CI |
| Wired in | `TowerInterior` → Mission Control floor | Below intro copy, above CommandCenter |
| `GovernanceNotice` | `CommonsInterior` | Points to `docs/governance/` |

**Not built (deliberately):**

- Live CI polling
- Fake green badges from mock operations data
- Tenant app embeds
- Duplicate full standards validator in HQ

---

## Code Homes for Governance Data

| Concern | Proper home | Today |
|---------|-------------|-------|
| Ecosystem map | `docs/governance/FACTORY_ECOSYSTEM_CANONICAL_MAP.md` | ✅ |
| Repository registry | `src/governance/registry.ts` + docs | ✅ 005 |
| Maturity | `src/governance/types.ts` + docs | ✅ |
| Repair queue | `src/governance/repair-queue.ts` + docs | ✅ |
| Status table | `src/governance/status.ts` + docs | ✅ |
| Release law | `docs/governance/FACTORY_RELEASE_LAW.md` | ✅ |
| Campus buildings | `src/domain/registry.ts` | Existing |
| Frozen tenants | `src/nexus/tenants.ts` | Existing — not ecosystem truth |
| Departments | `src/departments/registry.ts` | Existing |
| Object/event registry | `src/nexus/factory.ts` | In-memory sim — not governance |
| Operations missions | `src/operations/runtime.ts` | Mock — not governance |
| Skybridges | `src/nexus/skybridges.ts` | Integration paths (data) |
| Factory blueprints | `src/operations/blueprints.ts` | Per-tenant capability sketch |
| Mission Control ops UI | `CommandCenter`, `Watchboard` | Mock — keep separate from Control Tower |
| Utility Floor | `UtilityFloorInterior` | Nexus services display |
| Operations Center | `OperationsFloorInterior` | Company OS mock |
| Commons | `CommonsInterior` | Org chart + governance notice |
| War Room | `TowerInterior` war-room | Executive strategy — not status table |

---

## Integration Contract (future, not built)

1. Tenant completes certification → package in `standards-for-factory/imports/{tenant}/`
2. Factory HQ reads **approved package metadata only** (score, pass/fail, maturity) — not tenant internals
3. Control Tower displays registry row update — source tagged `standards-import`
4. Live CI requires tenant-published status endpoint or monorepo workflow dispatch — **UNKNOWN** protocol

---

## Anti-Bloat (see also governance README)

- One Control Tower panel for ecosystem health
- Do not add second Command Center for same data
- Operations `Watchboard` remains **company operations mock** until real ops feed exists
