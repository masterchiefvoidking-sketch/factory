# Repository Registry

**Single source of truth** for every known program.  
**Code mirror:** `src/governance/registry.ts`  
**Evidence:** `ACTUAL_STATE_AUDIT.md` per repo where available. **UNKNOWN** otherwise.

---

## Foundation Layer

### factory-standards

| Field | Value |
|-------|-------|
| Canonical name | factory-standards |
| Alternate names | standards-for-factory, The Law |
| GitHub | `masterchiefvoidking-sketch/standards-for-factory` |
| npm | `factory-standards` |
| Role | Certification law — schemas, validator, scoring |
| Department | Factory Services |
| Building | — (governs all) |
| Maturity | **3 Beta** |
| Audit score | **83/100** |
| Status | **YELLOW** |
| Owns | Schemas, validator, imports/ archive, tenant kit |
| Must not own | SDK, HQ UI, tenant runtime |
| Provides | Validation reports, governance docs |
| Consumes | Certification packages (manual) |
| Integration | **Verified** offline validation |
| Blockers | Stale zips/examples; no typecheck script; no CI |
| Evidence | Audit @ `cursor/factory-standards-init-eb83` |
| Confidence | **High** |

### factory-core

| Field | Value |
|-------|-------|
| Canonical name | factory-core |
| Alternate names | code-factory, @factory/core, The Machinery |
| GitHub | `masterchiefvoidking-sketch/code-factory` |
| npm | `@factory/core` |
| Role | Shared SDK |
| Department | Factory Services |
| Building | engine-room |
| Maturity | **2 Prototype** |
| Audit score | **74/100** |
| Status | **YELLOW** |
| Owns | Types, validators, certification CLI |
| Must not own | Canonical law, tenant UIs |
| Provides | SDK + CLI |
| Consumes | Standards rules (mirrored) |
| Integration | **Documented**; not published to npm |
| Blockers | Monorepo/split confusion; self-audit only |
| Evidence | Audit @ `cursor/factory-standards-validate-core-9173` |
| Confidence | **High** |

### Factory (HQ)

| Field | Value |
|-------|-------|
| Canonical name | Factory |
| Alternate names | factory, Titan Campus, The Mill |
| GitHub | `masterchiefvoidking-sketch/factory` |
| npm | `factory` (private) |
| Role | Digital headquarters / control tower |
| Department | Executive / Campus |
| Building | tower |
| Maturity | **2 Prototype** |
| Audit score | **52/100** (pre-governance); scripts improved on repair branch |
| Status | **ORANGE** |
| Owns | Campus UI, governance docs, registry, coordination visibility |
| Must not own | Standards, SDK, tenant logic |
| Provides | HQ experience, governance layer |
| Consumes | **UNKNOWN** live SDK/standards |
| Integration | **Unwired** |
| Blockers | Mock ops data; no persistence; dead code paths |
| Evidence | `docs/audits/ACTUAL_STATE_AUDIT.md` |
| Confidence | **High** |

---

## Tenant Programs (buildings on campus)

| ID | Canonical | Alt names | Building | Dept | Maturity | Audit | Status | Integration | Blocker |
|----|-----------|-----------|----------|------|----------|-------|--------|-------------|---------|
| bosslady | BossLady | Chief Engineer | bosslady | Engineering | 1 Scaffold | — | GRAY | Placeholder | No repo audit |
| prime | Forgina Prime | Prime, Forgina | prime | Reasoning | 1 Scaffold | — | GRAY | Placeholder | No repo audit |
| citadel | Citadel | Archivist | citadel | Memory | 1 Scaffold | — | GRAY | Placeholder | Placeholder zip only |
| toolbelt | Toolbelt | Horizon (?) | toolbelt | Knowledge | 1 Scaffold | — | GRAY | Unknown | Horizon relationship UNKNOWN |
| flippy | Mr. Flippy | Flippy, Web Flip Factory | flippy | Release | 1 Scaffold | — | GRAY | Placeholder | Canonical branch UNKNOWN |
| forge | Forge | Innovation Lab | forge | Innovation | 1 Scaffold | — | GRAY | Placeholder | No audit |
| fip | FIP | Metrics Lab | fip | Quality | 1 Scaffold | — | GRAY | Placeholder | No audit |
| observatory | Observatory | World Monitor | observatory | Intelligence | 1 Scaffold | — | GRAY | Placeholder | No audit |
| sentinel | Sentinel | Security Watcher | observatory (shared) | Intelligence | 0 Idea | — | GRAY | Unknown | No repo; no building |

---

## Certification Packages in standards (not live apps)

| Package path | Subject | Result |
|--------------|---------|--------|
| `imports/factory/` | Factory HQ | PASS 95/100 |
| `imports/factory-core/` | SDK | PASS 97/100 |
| `imports/examples/citadel-valid/` | Test fixture | PASS 98/100 |
| `imports/examples/horizon-invalid/` | Negative fixture | FAIL 75/100 (intentional) |
| `imports/{citadel,bosslady,forgina,horizon}/` | Tenants | Placeholder zip only |

---

## Registry Maintenance

1. Update `src/governance/registry.ts` when audits complete.
2. Mirror changes here and in `FACTORY_STATUS.md`.
3. Never mark **GREEN** without audit + passing scripts per Release Law.
