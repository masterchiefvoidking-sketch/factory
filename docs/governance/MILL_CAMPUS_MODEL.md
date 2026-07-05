# Mill Campus Model

**Project:** Governance 005 — Mill Control Tower  
**Principle:** Every room has one purpose. Every purpose has one room.

---

## The Metaphor

The Factory is a **river mill campus** — a digital headquarters where specialized buildings house programs (tenants). Power flows through shared infrastructure like a river through a mill. Nothing teleports. You travel. You govern from The Tower.

| Campus element | Meaning | Implementation home (Factory repo) |
|----------------|---------|-----------------------------------|
| **Mill / Campus** | The digital headquarters | `factory` repo — spatial shell + governance |
| **Buildings** | Major programs or departments | `src/domain/registry.ts` — 14 buildings |
| **Rooms** | Specific responsibilities | Tower floors, building interiors, underground floors |
| **Skybridges** | Allowed integration paths only | `src/nexus/skybridges.ts` — data definitions |
| **Underground utilities** | Shared infrastructure (Nexus) | `utility-floor`, `engine-room` |
| **River / power** | Standards, events, objects, certification, release flow | External: standards + core; in-app: Nexus + Operations simulators |
| **Shipping dock** | Release pipeline | `flippy` building → Flippy tenant |
| **Archive vault** | Institutional memory | `citadel` building → Citadel tenant |
| **Workshop** | Engineering | `bosslady` building → BossLady tenant |
| **Tower** | Executive oversight, control tower | `tower` — Atrium, Mission Control, War Room |
| **Observatory** | World intake, signals | `observatory` building |
| **Forge** | Product/business creation | `forge` building |
| **FIP** | Qualification and measurement | `fip` building |
| **Commons** | Org hub — belongs to no department | `commons` building |
| **Garden** | Reflection (no screens) | `garden` place |

---

## Three Laws of the Campus

1. **factory-standards is the law** — what may be certified, shipped, and integrated.
2. **factory-core is the machinery** — shared SDK/tools tenants use to comply.
3. **Factory is the place** — governs, routes, visualizes, coordinates. Does not duplicate tenant internals.

Tenants (BossLady, Citadel, Forge, etc.) are **workers in buildings**. They own their business logic. Factory owns **visibility and coordination**.

---

## How This Prevents Bloat

| Anti-pattern | Campus rule |
|--------------|-------------|
| Menu sprawl | Navigate by **building**, not infinite app launcher |
| Duplicate dashboards | One **Mission Control** for ecosystem health; tenant metrics stay in tenant buildings |
| Custom glue between apps | **Skybridges** only — extend Factory infrastructure, not point-to-point |
| Duplicate search/identity/notifications | **Utility Floor** (Nexus) — one shared service metaphor |
| HQ reimplementing tenant features | Building interior = **landing + status**, not full app embed (until real integration) |
| Multiple repair trackers | **One** `FACTORY_MASTER_REPAIR_QUEUE.md` |
| Multiple repo lists | **One** `REPOSITORY_REGISTRY.md` + `src/governance/registry.ts` |

---

## Travel and Clearance

- **Travel** (`FactoryContext.travelTo`) — moving between buildings takes time; reinforces spatial model.
- **Clearance** (`SecurityPanel`) — who may enter which building; separate from Nexus permission (unification **UNKNOWN** / future).

---

## Underground vs Surface

| Zone | Buildings | Role |
|------|-----------|------|
| Surface | Observatory, Tower, Toolbelt, Citadel, Forge, Commons, Prime, BossLady, FIP, Flippy, Garden | Departments + executive |
| Underground | Engine Room, Utility Floor, Operations Center | Infrastructure + company OS visibility |

---

## What Factory Must Not Become

- Another bloated application with every tenant's features inside it
- A second standards repo or SDK
- A fake "live" dashboard fed by invented CI data

Factory becomes a **control tower** by owning **truthful registry + governance docs + labeled static visibility** first; live wires only when proven.
