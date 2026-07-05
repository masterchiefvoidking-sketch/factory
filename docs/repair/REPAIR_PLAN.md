# Repair Plan — Audit-Based Only

**Source of truth:** `docs/audits/ACTUAL_STATE_AUDIT.md`  
**Created:** 2026-07-05  
**Branch:** `cursor/repair-pass-1a9f`  
**Rules:** No redesign. No new product features. No invented capabilities. No scope expansion.

---

## Top 10 Confirmed Defects

| # | Defect | Audit evidence |
|---|--------|----------------|
| 1 | Dead `OperationsCenterInterior.tsx` never routed | Architecture § unused component; Code Health § dead code |
| 2 | `operations-center` building copy contradicts routed UI (`OperationsFloorInterior`) | Purpose Conflicts § two operations rooms; Appendix buildings table |
| 3 | `npm test` script missing | Phase 10 exact output; Code Health § no tests |
| 4 | `npm run typecheck` script missing | Phase 10 exact output; Safe Recommendations § repair #4 |
| 5 | Command palette commands have no `onClick` handlers | UX Audit § CommandPalette; Capabilities § broken |
| 6 | Conveyor "Resume" label with no resume logic | Purpose Conflicts § conveyor; `pauseConveyor` only sets `paused` |
| 7 | Dual permission models — only Factory clearance exposed | Purpose Conflicts; `setPermission` unused in UI |
| 8 | Triple worker registries (`EMPLOYEES`, `TENANTS`, `DEPARTMENTS.workers`) | Purpose Conflicts; Factory Ecosystem § overlap |
| 9 | Runtime APIs unwired (`submitRequest`, `copyToClipboard`, `registerObject`) | Capabilities § hidden; Code Health § dead exports |
| 10 | All state lost on refresh — no persistence | Architecture § persistence none; Weaknesses § highest debt |

---

## Top 10 Stale Docs Claims

| # | Claim | Actual state |
|---|-------|--------------|
| 1 | README implies functioning worker applications | `TENANTS[].status: "frozen"` — metadata only |
| 2 | README lists 10 Factory Services | Nexus defines 18 `SHARED_SERVICES` |
| 3 | `operations-center` tagline: "No business logic" | Routes to business OS: watchboard, conveyor, mailroom |
| 4 | `operations-center` purpose: infra monitoring only | `OperationsFloorInterior` shows company operations |
| 5 | Mission Control delivers "60-second company overview" from live data | `CommandCenter` uses seeded mock data |
| 6 | Command palette presents executable commands | Commands are display-only |
| 7 | Conveyor: "Pause it. Inspect it. Replay it." | Pause only (no resume/replay/inspect) |
| 8 | Mailroom: track anything — implies interaction | Display-only, no status changes |
| 9 | README Explore step 2: "department dashboard" as live ops | `buildDepartmentDashboards()` returns computed mock metrics |
| 10 | Audit appendix lists PR #1 | PR #2 created after audit; branch has additional audit commit |

---

## Broken / Missing Scripts

| Script | Status (pre-repair) | Audit reference |
|--------|---------------------|-----------------|
| `npm test` | ❌ Missing | Phase 10 FAIL |
| `npm run typecheck` | ❌ Missing | Phase 10 FAIL |
| `npm run build` | ✅ Passes | Phase 10 SUCCESS |
| `npm run lint` | ✅ Passes (deprecated `next lint` warning) | Phase 10 SUCCESS |
| `npm install` | ✅ Passes (2 moderate audit vulnerabilities) | Phase 10 SUCCESS |
| `npm run dev` | ✅ Exists, not run in audit | Inventory |
| `npm start` | ✅ Exists, not run in audit | Inventory |

---

## Test / Typecheck / Build / Lint Gaps

| Gap | Detail |
|-----|--------|
| Test runner | None configured; 0 test files |
| Test coverage | 0% |
| Typecheck script | Not exposed; only runs inside `next build` |
| CI | No workflow files |
| Lint migration | `next lint` deprecated for Next.js 16 |
| Security audit | 2 moderate npm vulnerabilities (postcss/next chain) |
| E2E / integration | None |

---

## Dead Code

| Item | Evidence |
|------|----------|
| `src/components/nexus/OperationsCenterInterior.tsx` | Not imported anywhere |
| `src/app/page.tsx` returns `null` | `children` slot in CampusShell always empty |
| `operations.submitRequest()` | No UI consumer |
| `NexusContext.copyToClipboard` | No UI consumer |
| `NexusContext.setPermission` | No UI consumer |
| `operations.setDepartmentState()` | No UI consumer |

---

## Duplicate Systems

| Area | Duplicates | Risk |
|------|------------|------|
| Operations UI | `OperationsFloorInterior` (routed) vs `OperationsCenterInterior` (dead) | Architectural confusion |
| Permissions | `ClearanceLevel` vs `NexusPermission` | Inconsistent gating story |
| Workers | `EMPLOYEES`, `TENANTS`, `DEPARTMENTS.workers` | Drift on rename/add |
| Department status | `operations.DepartmentStatus` vs `departments.Department` | Same org, different shapes |
| Mission visibility | `Watchboard` in Tower Mission Control and Operations Floor | Acceptable duplication for now |
| Factory services count | 18 (Nexus) vs 10 (departments `FACTORY_SERVICE_NAMES`) | Doc inconsistency |

---

## Mock / Placeholder Systems

| System | Behavior |
|--------|----------|
| `FactoryNexus` singleton | In-memory seed objects/events; all services show "online" |
| `FactoryOperations` singleton | Seeded missions, mail, conveyor, logistics stats |
| `buildDepartmentDashboards()` | Computed mock KPIs |
| Tower digital globe | Emoji + CSS animation |
| War Room whiteboards | Decorative placeholder lines |
| Building `wallContent` | Static narrative dashboards |
| `WindowView` | Procedural sky by time period |
| Tenant applications | Frozen metadata — no embed, no iframe |
| Logistics stats in Operations Floor | Hardcoded numbers in `getLogistics()` |

---

## Factory Integration Gaps

| Integration point | Status |
|-------------------|--------|
| Tenant app hosting | No protocol, no mount point |
| Skybridges | Data definitions only |
| Object registry mutations | API exists; no create/edit UI |
| Event bus | Internal only; no external subscribers |
| Clipboard / file exchange | API/types only |
| Persistence adapter | None |
| API routes | None |
| Environment configuration | None |
| Authentication | None |
| Cross-repo tenant repos | Unknown; not referenced in code |

---

## Highest-Risk Bloat

| Risk | Why |
|------|-----|
| `src/operations/runtime.ts` (700 lines) | Growing without tests; seed + API mixed |
| `src/domain/registry.ts` (620 lines) | Large narrative data; duplicate worker refs |
| Registry duplication across 3 modules | Maintenance drift |
| `OperationsCenterInterior` (142 lines) | Dead weight + confusion |
| README aspiration vs implementation | Misleads contributors |
| Unwired runtime APIs | Surface area without tests or UI |

---

## Safest Repair Order

Repairs are ordered to maximize truth/clarity and testability with minimal runtime risk. User repair-pass rules prioritize scripts/tests before feature-touching work; audit "One Safest Next Step" (Operations Center) is repair #3 after script infrastructure.

| Order | Repair | Risk | Rationale |
|-------|--------|------|-----------|
| **1** | Add `typecheck` script + minimal `test` runner with smoke tests on pure domain functions | **None** | Audit repair #4; closes script gaps; no UI/runtime change |
| **2** | Document script list in README (`typecheck`, `test`, `build`, `lint`) | **None** | Truth fix for stale docs; no runtime change |
| **3** | Delete `OperationsCenterInterior` + align `operations-center` building copy with `OperationsFloorInterior` | **None** | Audit "One Safest Next Step"; removes dead code; copy-only + delete |
| **4** | Command palette: disable command buttons or add no-op `aria-disabled` + honest label | **Low** | Stops false affordance without inventing commands |
| **5** | Conveyor: rename "Resume" to reflect pause-only OR implement unpause in `pauseConveyor` | **Low** | Fixes misleading UI |
| **6** | README truth pass: frozen tenants, mock data, script list | **None** | Doc-only |
| **7** | Department floor map: navigate to building on select | **Low** | Small UX; uses existing `travelTo` |
| **8** | Minimal tests for `FactoryNexus` / `FactoryOperations` pure methods | **Low** | Increases coverage without UI change |
| **9** | Investigate (not implement): unify permission models | **Medium** | Needs design decision |
| **10** | Investigate (not implement): single worker registry source | **Medium** | Needs design decision |

### Deferred (not in repair scope)

- Persistence / API layer
- Real tenant integration
- URL-based building routes
- Architecture refactor of provider tree
- `next lint` → ESLint CLI migration (separate infra task)

---

## Repair #1 (this pass)

**Add `typecheck` script and minimal `test` infrastructure** with smoke tests for pure functions in `src/domain/types.ts` (`hasClearance`, clearance rank behavior).

- No UI changes
- No new product features
- No dependency beyond dev test runner (`vitest`)
- Preserves all passing build/lint behavior

---

*Plan derived solely from `docs/audits/ACTUAL_STATE_AUDIT.md`. No fixes applied in this document.*
