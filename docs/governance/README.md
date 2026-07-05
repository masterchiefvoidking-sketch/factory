# Factory Governance — Mill Control Tower (Project 005)

**Authority layer for the Factory digital headquarters.**

| Document | Purpose |
|----------|---------|
| [MILL_CAMPUS_MODEL.md](./MILL_CAMPUS_MODEL.md) | Campus metaphor — buildings, rooms, river, anti-sprawl |
| [FACTORY_ECOSYSTEM_CANONICAL_MAP.md](./FACTORY_ECOSYSTEM_CANONICAL_MAP.md) | Full ecosystem blueprint (audited evidence) |
| [REPOSITORY_REGISTRY.md](./REPOSITORY_REGISTRY.md) | Every known program/repo — roles, maturity, blockers |
| [FACTORY_DEPENDENCY_GRAPH.md](./FACTORY_DEPENDENCY_GRAPH.md) | Allowed dependency direction |
| [FACTORY_MATURITY_MODEL.md](./FACTORY_MATURITY_MODEL.md) | Levels 0–5 and certification gates |
| [FACTORY_MASTER_REPAIR_QUEUE.md](./FACTORY_MASTER_REPAIR_QUEUE.md) | Single ecosystem repair order |
| [FACTORY_RELEASE_LAW.md](./FACTORY_RELEASE_LAW.md) | Release and maturity requirements |
| [FACTORY_STATUS.md](./FACTORY_STATUS.md) | Current health table (all repos) |
| [FACTORY_CONTROL_TOWER.md](./FACTORY_CONTROL_TOWER.md) | Mission Control design + code homes |
| [FACTORY_GOVERNANCE_RESULT.md](./FACTORY_GOVERNANCE_RESULT.md) | Pass 005 verification results |

**Related (outside governance):**

- [../audits/ACTUAL_STATE_AUDIT.md](../audits/ACTUAL_STATE_AUDIT.md) — Factory forensic audit
- [../repair/REPAIR_PLAN.md](../repair/REPAIR_PLAN.md) — Factory-only repair plan (superseded for ecosystem order by MASTER_REPAIR_QUEUE)

**Code mirror:** `src/governance/` — static registry consumed by Control Tower UI (labeled static, not live CI).

---

## Anti-Bloat Policy (Project 005)

| Rule | Enforcement |
|------|-------------|
| One purpose per room | Building/room registry in `domain/registry.ts` |
| One owner per object | Nexus object registry — one canonical ID |
| One registry for repositories | `REPOSITORY_REGISTRY.md` + `src/governance/registry.ts` |
| One repair queue | `FACTORY_MASTER_REPAIR_QUEUE.md` |
| One status table | `FACTORY_STATUS.md` |
| One release law | `FACTORY_RELEASE_LAW.md` |
| No duplicate command centers | Control Tower = ecosystem; CommandCenter = ops mock |
| No duplicate search / identity / notifications | Utility Floor (Nexus) owns metaphor |
| No custom tenant-to-tenant glue | Skybridges + Factory infrastructure only |
| No dashboard without a decision | Every panel must support govern/route/coordinate |

