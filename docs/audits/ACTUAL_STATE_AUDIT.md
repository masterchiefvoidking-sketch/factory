# Universal Factory Ecosystem — Actual State Audit

**Audit date:** 2026-07-05  
**Auditor mode:** Forensic investigation only — no redesign, no fixes applied  
**Repository:** `https://github.com/masterchiefvoidking-sketch/factory`  
**Branch audited:** `cursor/project-titan-building-architecture-1a9f`  
**Commit:** `7cf31d0` — Project Departments: organizational structure (Master Prompt 004)

---

## Executive Summary

**The Factory** (`factory` v0.1.0) is a **Next.js 15 single-page client application** that presents a **spatial metaphor** for a digital headquarters. It is not a traditional multi-route web app: one Next.js route (`/`) renders `null`; all UI is driven by client-side **location state** inside `CampusShell`.

The codebase implements **four conceptual layers** built across four master prompts:

| Layer | Codename | Location in code |
|-------|----------|------------------|
| Buildings / Campus | Project Titan (001) | `src/domain/`, `src/components/campus/`, building interiors |
| Shared Infrastructure | Project Nexus (002) | `src/nexus/`, `src/context/NexusContext.tsx` |
| Company Operations | Project Operations (003) | `src/operations/`, `src/context/OperationsContext.tsx` |
| Organizational Structure | Project Departments (004) | `src/departments/`, `src/context/DepartmentsContext.tsx` |

**What actually works today:** A polished **navigable campus shell** with travel animations, clearance gating, atmospheric controls, and **read-only dashboards** fed by **in-memory singletons** with seeded mock data. **Conveyor "Advance"** mutates in-memory artifact stage state. **Org chart** nodes expand/collapse. **Security clearance** changes which buildings are accessible.

**What does not exist today:** Real tenant applications, databases, API routes, persistence, authentication, tests, CI, environment configuration, or any external service integration. README and UI copy describe an aspirational organization; **no separate apps plug in**.

**Build health:** `npm install`, `npm run lint`, and `npm run build` succeed. `npm test` and `npm run typecheck` scripts are missing (TypeScript checking runs inside `next build` and passes).

**Maturity assessment:** Early **prototype / experience shell** (~7,156 lines of TypeScript/TSX across 56 source files). Strong conceptual architecture and UI cohesion; weak operational readiness for a production factory ecosystem.

---

## Repository Inventory

### Identity

| Field | Value |
|-------|-------|
| Repository name | `factory` |
| Git remote | `https://github.com/masterchiefvoidking-sketch/factory` |
| Package name | `factory` |
| Version | `0.1.0` |
| Git branch (audited) | `cursor/project-titan-building-architecture-1a9f` |
| Commits on branch | 7 (6 feature commits + initial) |
| PR | #1 (draft) |

### Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15.5.20 (App Router) |
| UI | React 19.2.7 |
| Language | TypeScript 5.9.3 (strict mode) |
| Styling | Tailwind CSS 4.3.2, custom CSS variables in `globals.css` |
| Animation | Framer Motion 12.42.2 |
| Fonts | Geist Sans, Geist Mono (via `next/font/google`) |
| Package manager | npm |
| Build system | Next.js (`next build`) |
| Runtime | Node.js (dev/build); static prerendered output for `/` |
| Lint | ESLint 9 + `eslint-config-next` (`next lint`, deprecated warning) |

### Major Dependencies

**Production:**
- `next` ^15.2.0 (resolved 15.5.20)
- `react` ^19.0.0
- `react-dom` ^19.0.0
- `framer-motion` ^12.4.7

**Development:**
- `typescript` ^5
- `tailwindcss` ^4, `@tailwindcss/postcss` ^4
- `eslint` ^9, `eslint-config-next` ^15.2.0
- `@types/node`, `@types/react`, `@types/react-dom`

### Project Size

| Metric | Count |
|--------|-------|
| TypeScript/TSX source files (`src/`) | 56 |
| Lines in `src/` | ~7,156 |
| Total project files (excl. `node_modules`, `.next`) | ~63 tracked source/config |
| `src/` disk size | ~428 KB |
| Documentation files | 1 (`README.md`) + this audit |
| Test files | 0 |
| API route files | 0 |
| Environment files (`.env*`) | 0 |

### Folder Structure

```
/workspace
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts          # empty config object
├── eslint.config.mjs
├── postcss.config.mjs
├── docs/
│   └── audits/
│       └── ACTUAL_STATE_AUDIT.md   # this file
└── src/
    ├── app/
    │   ├── layout.tsx      # provider tree + CampusShell
    │   ├── page.tsx        # returns null
    │   └── globals.css
    ├── domain/             # Titan campus: buildings, employees, transit
    ├── nexus/              # Nexus infrastructure singleton + types
    ├── operations/         # Operations singleton + types
    ├── departments/        # Department registry, org chart, dashboards
    ├── context/            # 4 React context providers
    └── components/
        ├── campus/         # Shell, LocationView
        ├── tower/          # Tower interior, departure board
        ├── building/       # Generic building interior
        ├── garden/         # Garden place
        ├── departments/    # Commons, org chart, floor map, dashboards
        ├── nexus/          # Utility floor, object registry, command palette
        ├── operations/     # Operations floor, conveyor, mailroom, watchboard
        ├── transit/        # Campus map, travel overlay
        ├── atmosphere/     # Shift, power, window view, lighting
        └── security/       # Clearance panel
```

### README Quality

**Strengths:** Clear four-layer mental model; department table; exploration steps; architect's rule.  
**Gaps:** No architecture diagram, no API docs, no contribution guide, no mention that tenants are metaphorical only, no script list, no deployment instructions beyond `npm run dev`.

### Documentation Quality

**Overall: Low.** Single README plus inline file-header comments in domain modules. No `docs/` folder existed before this audit. Types serve as implicit schema documentation. No ADRs, no runbooks, no env var reference.

---

## Purpose Discovery

### What the Application ACTUALLY Does

Delivers an **immersive spatial UI** where the user navigates a fictional corporate campus ("Titan Campus") by selecting buildings on a map or list. Each location shows **narrative copy, mock operational data, and static or lightly interactive panels**. State lives entirely in React context and two in-memory singleton classes (`FactoryNexus`, `FactoryOperations`).

There is **no backend**, **no user accounts**, and **no real work execution**.

### What the README Claims

- The Factory is a world-class organization headquarters, not a software suite.
- Four layers: Buildings, Infrastructure (Nexus), Operations, Departments.
- Eight departments with named worker applications (Observatory, Sentinel, Toolbelt, Prime, Citadel, Forge, BossLady, Flippy, FIP).
- Factory Services shared by all.
- The Commons as visitor/org hub.
- Tower War Room = executive floor; Tower Mission Control = 60-second company overview.

### What the UI Suggests

- A functioning company with live missions, conveyor pipelines, mailroom tracking, department health, object registry, and executive strategy rooms.
- Travel between buildings takes time and uses themed transit modes.
- Security clearance gates building access.
- Underground utility and operations floors expose infrastructure.

### What the Code Suggests

- **Presentation layer + domain models + in-memory simulators** for future integration.
- Tenants are explicitly `"frozen"` in `src/nexus/tenants.ts` — placeholders, not running apps.
- `FactoryNexus` and `FactoryOperations` implement rich APIs (register objects, emit events, submit requests) but **most mutation APIs are not wired to UI**.
- `page.tsx` returns `null`; `CampusShell` is the real application root.

### Workflows That Currently Exist

1. **Arrive** at Tower Atrium (default location).
2. **Navigate** via campus map, building list, or Tower floor buttons.
3. **Experience travel animation** with duration based on transit graph.
4. **Change clearance** → some buildings lock/unlock on map.
5. **Change shift / time period / power** → CSS `data-*` attributes on `<body>`.
6. **Open command palette** (⌘K) → search objects/tenants; commands display only.
7. **View** missions, watchboard, conveyor, mail, org chart, department dashboards.
8. **Advance conveyor** artifact one stage (in-memory).
9. **Pause conveyor** (sets status; no resume implementation).
10. **Expand/collapse org chart** nodes.

### Primary Purpose

**Spatial headquarters experience shell** — teach and visualize the Factory metaphor while housing future integration points.

### Secondary Purposes

- Nexus infrastructure API sketch (`FactoryNexus` singleton).
- Operations coordination API sketch (`FactoryOperations` singleton).
- Department/org registry for ownership mapping.
- Design system tokens and atmospheric UX.

### Target Users (as implied by copy)

- **Founder/executive** ("Morgan") — Tower, War Room, Mission Control.
- **Visitors** — Commons, Garden (low clearance).
- **Engineers/architects** — underground floors, BossLady, FIP.
- **Future tenant app developers** — Nexus contract, skybridges (not yet consumable).

### Current Maturity

**Prototype / demo (v0.1.0).** Builds and runs. No production data path.

### Purpose Conflicts (documented, not resolved)

| Conflict | Evidence |
|----------|----------|
| README implies real worker apps | `TENANTS[].status: "frozen"`; no iframe, micro-frontend, or API consumer |
| Two "operations" rooms | `operations-center` building → `OperationsFloorInterior`; unused `OperationsCenterInterior` shows Nexus metrics instead |
| Two permission models | `ClearanceLevel` (Factory) vs `NexusPermission` (Nexus); only Factory clearance has UI |
| Three "worker" registries | `EMPLOYEES` (domain), `TENANTS` (nexus), `DEPARTMENTS.workers` (departments) — overlapping concepts |
| README "Factory Services" vs code | 18 Nexus `SHARED_SERVICES` vs 10 `FACTORY_SERVICE_NAMES` in departments |
| Mission Control "60 seconds" | CommandCenter is mock progress bars, not aggregated live data |
| Conveyor "Resume" button | Label toggles; `pauseConveyor` only sets `paused`, no unpause |

---

## Architecture

### Routing

| Route | File | Renders |
|-------|------|---------|
| `/` | `src/app/page.tsx` | `null` (UI from `CampusShell` in layout) |
| `/_not-found` | Next.js default | 404 page |

**Client-side location routing** (`LocationView.tsx`):

| `location.buildingId` | Interior component |
|-----------------------|-------------------|
| `tower` | `TowerInterior` (sub-rooms: atrium, mission-control, war-room) |
| `garden` | `GardenInterior` |
| `commons` | `CommonsInterior` |
| `utility-floor` | `UtilityFloorInterior` |
| `operations-center` | `OperationsFloorInterior` |
| All others (observatory, toolbelt, citadel, forge, prime, bosslady, fip, flippy, engine-room) | `BuildingInterior` |

**Default location:** `{ buildingId: "tower", towerRoom: "atrium" }`

### Provider Nesting (`layout.tsx`)

```
FactoryProvider
  └── NexusProvider
        └── OperationsProvider
              └── DepartmentsProvider
                    └── CampusShell
                          └── {children}  // page.tsx null
```

### Contexts

| Context | File | State source | Key exports |
|---------|------|--------------|-------------|
| `FactoryContext` | `src/context/FactoryContext.tsx` | React `useState` | location, travel, clearance, shift, time, power |
| `NexusContext` | `src/context/NexusContext.tsx` | `nexus` singleton + tick | objects, events, search, commands, clipboard API |
| `OperationsContext` | `src/context/OperationsContext.tsx` | `operations` singleton + 30s tick | missions, conveyor, mail, watchboard, advance/pause |
| `DepartmentsContext` | `src/context/DepartmentsContext.tsx` | static registries + UI state | org chart, dashboards, selected department |

### Singletons (Services)

| Class | File | Role |
|-------|------|------|
| `FactoryNexus` | `src/nexus/factory.ts` | Object registry, event bus, search, clipboard, commands, metrics |
| `FactoryOperations` | `src/operations/runtime.ts` | Missions, requests, queues, mail, conveyor, history, watchboard |

Exported instances: `nexus`, `operations`.

### Domain Registries (Static Data)

| Module | Contents |
|--------|----------|
| `src/domain/registry.ts` | 14 buildings, 8 employees, transit routes |
| `src/nexus/tenants.ts` | 9 frozen tenants |
| `src/nexus/contract.ts` | Factory contract clauses |
| `src/nexus/skybridges.ts` | Tenant connection definitions |
| `src/nexus/design-system.ts` | Design tokens |
| `src/departments/registry.ts` | 8 departments, commons spaces, cross-dept projects |
| `src/departments/org-chart.ts` | Tree builder |
| `src/departments/dashboards.ts` | Dashboard builder |
| `src/operations/blueprints.ts` | Per-tenant blueprints |

### Components (by area)

**Campus:** `CampusShell`, `LocationView`  
**Transit:** `CampusMap`, `TravelOverlay`  
**Tower:** `TowerInterior`, `DepartureBoard`  
**Building:** `BuildingInterior`, `WallDisplay`  
**Garden:** `GardenInterior`  
**Departments:** `CommonsInterior`, `VisitorWelcome`, `OrgChart`, `DepartmentFloorMap`, `CrossDepartmentProjects`, `DepartmentDashboardPanel`  
**Nexus:** `UtilityFloorInterior`, `ObjectRegistryView`, `FactoryContractView`, `CommandPalette`, `TenantSkybridges`, `SkybridgeDiagram`, `OperationsCenterInterior` (**unused**)  
**Operations:** `OperationsFloorInterior`, `CommandCenter`, `Watchboard`, `ConveyorView`, `MailroomView`, `DailyRhythmBanner`, `FactoryBlueprint`  
**Atmosphere:** `ShiftLighting`, `ShiftControls`, `PowerControls`, `WindowView`  
**Security:** `SecurityPanel`

### Hooks

No custom hooks directory. Hooks used: `useFactory`, `useNexus`, `useOperations`, `useDepartments` (context hooks only).

### Types / Models / Schemas

| Area | File | Major types |
|------|------|-------------|
| Campus | `src/domain/types.ts` | `Building`, `Location`, `Employee`, `ClearanceLevel`, `FactoryState` |
| Nexus | `src/nexus/types.ts` | `FactoryObject`, `FactoryEvent`, `Tenant`, `NexusPermission`, `SharedService` |
| Operations | `src/operations/types.ts` | `Mission`, `FactoryRequest`, `ConveyorArtifact`, `MailItem`, `WatchboardData` |
| Departments | `src/departments/types.ts` | `Department`, `OrgChartNode`, `DepartmentDashboard` |

No Zod/runtime validation. TypeScript interfaces only.

### API Layers

**None.** No `src/app/api/`, no `fetch()` calls in source.

### Persistence

**None.** All data in memory. Refreshing the browser resets mutable state (conveyor advances lost unless re-seeded on load — seed runs in constructor so only session mutations are lost).

### Import / Export

No file import/export UI. `FactoryNexus` has `ExchangeFile` type and internal `files` array — not exposed in UI.

### Build Pipeline

```
npm install → npm run build
  → next build
  → TypeScript check (via build)
  → ESLint (via build)
  → Static prerender: /, /_not-found
```

### Testing Framework

**None configured.**

### External APIs

**None.**

### Local Storage

**Not used.** Grep found no `localStorage` or `sessionStorage`.

### File Handling

**None** in UI. Nexus has in-memory file exchange types.

### Configuration

| File | Purpose |
|------|---------|
| `next.config.ts` | Empty `NextConfig` |
| `tsconfig.json` | Strict TS, `@/*` path alias |
| `eslint.config.mjs` | ESLint flat config |
| `postcss.config.mjs` | Tailwind PostCSS |

### Environment Variables

**None defined or referenced.**

---

## User Experience Audit

### Global Chrome (always visible)

#### CampusShell
- **Purpose:** Application frame — header, main viewport, footer, overlays.
- **Inputs:** Context state from all four providers.
- **Outputs:** Location label, foundation principle footer, campus map trigger.
- **Working:** Layout, location display, child routing.
- **Placeholder:** `children` from `page.tsx` is always empty.
- **Missing:** Breadcrumbs beyond header; no back button.

#### DailyRhythmBanner
- **Purpose:** Show campus clock and rhythm phase.
- **Inputs:** `operations.getClock()`, `RHYTHM_PROFILES`.
- **Outputs:** Time, date, phase label/description.
- **Working:** Reads live `Date` for time; phase from `detectRhythmPhase()`.
- **Mock:** Phase descriptions are static copy.

#### TravelOverlay (modal-like, full screen)
- **Purpose:** Animate travel between locations.
- **Inputs:** `isTraveling`, `travelingFrom/To`, `transitMode`.
- **Outputs:** Animated overlay with from/to building names.
- **Working:** Shown during `setTimeout` travel duration.
- **Missing:** Cancel travel; accessibility announcements.

#### CommandPalette (modal, ⌘K)
- **Purpose:** Global search and commands.
- **Inputs:** Keyboard shortcut, search query.
- **Outputs:** Search results grouped by tenant; command list by category.
- **Working:** Open/close, search via `nexus.search()`.
- **Broken/Dead:** Command buttons have **no `onClick` handlers** — display only.
- **Missing:** Execute commands; navigate to result on click.

#### CampusMap (popover from footer)
- **Purpose:** Radial map + building list for navigation.
- **Inputs:** Click building glyph or list item.
- **Outputs:** `travelTo(buildingId)`; closes popover.
- **Working:** Surface buildings + garden + underground list; clearance gating (🔒).
- **Confusing:** Underground buildings not on radial map graphic (only in list).
- **Missing:** Tower room selection from map.

#### SecurityPanel (popover)
- **Purpose:** Change Factory clearance level.
- **Inputs:** Select clearance level.
- **Outputs:** `setClearance(level)` — affects `canEnter()`.
- **Working:** All 7 clearance levels.
- **Missing:** Nexus permission control (`setPermission` exists but no UI).

#### ShiftControls / PowerControls / ShiftLighting
- **Purpose:** Atmospheric shift, time period, power state.
- **Inputs:** Button selections.
- **Outputs:** `data-shift`, `data-time` on body; CSS theming.
- **Working:** State updates and visual atmosphere.
- **Mock:** No effect on business logic.

---

### Tower (`tower`)

#### TowerInterior — Floor 1: Atrium
- **Purpose:** Campus heartbeat; departure board; digital globe.
- **Inputs:** Tower room nav buttons.
- **Outputs:** DepartureBoard, globe placeholder.
- **Placeholder:** Digital globe (emoji + rotating border, no live data).
- **Working:** Room switching within tower.

#### TowerInterior — Floor 2: Mission Control
- **Purpose:** Company overview in 60 seconds.
- **Components:** `CommandCenter`, `Watchboard`.
- **Working:** Displays seeded operations data.
- **Mock:** All metrics are static/seeded, not live.

#### TowerInterior — Floor 3: War Room
- **Purpose:** Executive strategy space.
- **Outputs:** Executive floor copy, architect rule, placeholder whiteboards.
- **Placeholder:** Strategy/Architecture/Roadmap boards (decorative lines only).

#### DepartureBoard
- **Purpose:** Show where employees are.
- **Data:** Static `EMPLOYEES` array.
- **Missing:** Live status updates; click to navigate.

---

### The Commons (`commons`)

#### CommonsInterior
- **Purpose:** Org hub for visitors.
- **Sections:** VisitorWelcome, Shared Spaces, DepartmentFloorMap, OrgChart, CrossDepartmentProjects, How Work Flows.
- **Working:** All sections render static/registry data.
- **Missing:** Interactive commons spaces (cafeteria, auditorium, etc.) — cards only.

#### VisitorWelcome
- **Purpose:** Onboarding copy for visitors.
- **Working:** Static guide text.

#### DepartmentFloorMap
- **Purpose:** Spatial department layout.
- **Inputs:** Click department → `setSelectedDepartmentId`.
- **Working:** Selection state; visual highlight.
- **Missing:** Navigation to department building on click.

#### OrgChart
- **Purpose:** Hierarchical org visualization.
- **Inputs:** Toggle expand/collapse per node.
- **Working:** Tree interaction.
- **Missing:** Navigate to entity on click.

#### CrossDepartmentProjects
- **Purpose:** Show cross-cutting initiatives.
- **Mock:** Static seeded projects from registry.

#### DepartmentDashboardPanel (also on department buildings)
- **Purpose:** Department-specific KPI panel at building entrance.
- **Data:** `buildDepartmentDashboards()` — computed mock metrics.
- **Working:** Renders per department.
- **Mock:** Metrics are generated, not measured.

---

### Generic Buildings (`BuildingInterior`)

**Applies to:** observatory, toolbelt, citadel, forge, prime, bosslady, fip, flippy, engine-room.

- **Purpose:** Tenant building landing — narrative, walls, employee card, windows.
- **Inputs:** `currentBuilding` from Factory context.
- **Outputs:** Department dashboard (if mapped), wall content, quotes, `WindowView`, `TenantSkybridges`, `FactoryBlueprint`.
- **Working:** Rich static content per building from registry.
- **Dead:** `GardenInterior` path bypasses this; `isPlace` buildings return null in BuildingInterior but garden has own component.
- **Missing:** Actual tenant application embed.
- **Note:** `engine-room` uses generic interior (not a dedicated engine room UI).

---

### Garden (`garden`)

#### GardenInterior
- **Purpose:** Screen-free reflection space.
- **Working:** Full-screen scenic UI, quotes.
- **Missing:** Interactive elements (intentionally minimal).

---

### Utility Floor (`utility-floor`)

#### UtilityFloorInterior
- **Purpose:** Nexus shared services showcase.
- **Sections:** 18 services grid, ObjectRegistryView, FactoryContractView.
- **Working:** Reads `nexus.getServices()`, objects, contract.
- **Mock:** All services show green "online" regardless of reality.

#### ObjectRegistryView
- **Purpose:** Canonical objects with tenant perspectives.
- **Data:** Seeded NASA + Project Titan objects.
- **Missing:** Create/edit objects UI (API exists on singleton).

#### FactoryContractView
- **Purpose:** Display Factory contract clauses.
- **Working:** Static contract data.

---

### Operations Center (`operations-center`)

#### OperationsFloorInterior
- **Purpose:** Company OS — watchboard, conveyor, mailroom, logistics, history.
- **Working:** Read-only panels + conveyor advance/pause.
- **Note:** This is **not** the same as unused `OperationsCenterInterior` (Nexus infra metrics).

#### Watchboard
- **Purpose:** Mission health, approvals, releases, completed work.
- **Mock:** Seeded watchboard data.

#### ConveyorView
- **Purpose:** Knowledge flow pipeline visualization + artifact control.
- **Working:** `Advance` calls `advanceConveyor` — mutates stage.
- **Partially broken:** `Pause`/`Resume` — pause works; resume label appears but **no resume logic** in `pauseConveyor`.
- **Missing:** Replay, inspect artifact detail.

#### MailroomView
- **Purpose:** Track mail items across factory.
- **Working:** Display only.
- **Missing:** Mark read, archive, submit mail.

#### CommandCenter (also in Tower Mission Control)
- **Purpose:** Mission progress, department health, alerts, decisions, milestones.
- **Mock:** All seeded.

---

### Unused Screen

#### OperationsCenterInterior (`src/components/nexus/OperationsCenterInterior.tsx`)
- **Status:** **Dead code** — not imported by `LocationView` or any other file.
- **Would show:** Nexus operations metrics, connector health, event traffic, activity stream, skybridge diagram.
- **Conflict:** Building `operations-center` routes to `OperationsFloorInterior` instead.

---

## Data Model

### Campus / Location

| Object | Owner | Relationships | Persistence | Lifecycle |
|--------|-------|---------------|-------------|-----------|
| `Building` | `domain/registry.ts` | 14 buildings, positions, clearance | Static | Immutable at runtime |
| `Location` | `FactoryContext` | buildingId + optional towerRoom | Session (React state) | Changes via `travelTo` |
| `Employee` | `domain/registry.ts` | 1:1 with buildingId (mostly) | Static | Display only |
| `TransitRoute` | `domain/registry.ts` | from/to buildings | Static | Used for travel duration |

### Nexus

| Object | Owner | Relationships | Persistence | Lifecycle |
|--------|-------|---------------|-------------|-----------|
| `FactoryObject` | `FactoryNexus` | perspectives per tenant | In-memory Map | `registerObject`, seed on init |
| `FactoryEvent` | `FactoryNexus` | optional objectId | In-memory array (max 200) | `emit`, seed |
| `FactoryNotification` | `FactoryNexus` | — | In-memory | Seed |
| `ActivityEntry` | `FactoryNexus` | links eventId | In-memory (max 100) | Auto on emit |
| `ClipboardItem` | `FactoryNexus` | source building | In-memory | `copy()` — no UI |
| `FactoryCommand` | `FactoryNexus` | permission-gated | In-memory | Seed |
| `Tenant` | `nexus/tenants.ts` | buildingId | Static frozen | Immutable |
| `SharedService` | `FactoryNexus` | 18 services | Static definitions | Status mocked online |

### Operations

| Object | Owner | Relationships | Persistence | Lifecycle |
|--------|-------|---------------|-------------|-----------|
| `Mission` | `FactoryOperations` | objectives → projects → tasks | In-memory seed | Read-only in UI |
| `FactoryRequest` | `FactoryOperations` | from/to tenant, history | In-memory seed | `submitRequest` API unused in UI |
| `FactoryReview` | `FactoryOperations` | requestId | In-memory | API only |
| `QueueItem` | `FactoryOperations` | tenantId + column | In-memory seed | `getQueues` not in UI |
| `MailItem` | `FactoryOperations` | sender/recipient tenants | In-memory seed | Display only |
| `ConveyorArtifact` | `FactoryOperations` | stages[], current tenant | In-memory seed | `advanceConveyor` / `pauseConveyor` |
| `OpsHistoryEntry` | `FactoryOperations` | searchable flag | In-memory | Grows on mutations |
| `OwnedObject` | `FactoryOperations` | objectId, owner tenant | In-memory seed | Display via operations context (not dedicated UI) |
| `DepartmentStatus` | `FactoryOperations` | per TenantId | In-memory seed | `setDepartmentState` API unused in UI |

### Departments

| Object | Owner | Relationships | Persistence | Lifecycle |
|--------|-------|---------------|-------------|-----------|
| `Department` | `departments/registry.ts` | workers[], buildingId | Static | Immutable |
| `OrgChartNode` | `buildOrgChart()` | tree children | Computed | Expand state in context |
| `DepartmentDashboard` | `buildDepartmentDashboards()` | per departmentId | Computed mock | Immutable per session |
| `CrossDepartmentProject` | registry | lead + participating depts | Static | Display only |
| `CommonsSpace` | registry | — | Static | Display only |

### Session / User

| Object | Owner | Persistence | Notes |
|--------|-------|-------------|-------|
| `userClearance` | FactoryContext | Session | Default `founder` |
| `NexusPermission` | NexusContext | Session | Default `founder`, no UI |
| `currentShift` / `timePeriod` | FactoryContext | Session | Auto-detect on load |
| `powerState` | FactoryContext | Session | Default `online` |
| `selectedDepartmentId` | DepartmentsContext | Session | For floor map |
| `expandedOrgNodes` | DepartmentsContext | Session | Default includes `founder` |

### Settings

No user settings persistence. `FactoryNexus` includes a Settings **service definition** only.

---

## Capabilities

### Navigation & Spatial UX
- ✅ Campus map with radial layout
- ✅ Building list including underground
- ✅ Clearance-gated access
- ✅ Travel animations with mode-specific visuals
- ✅ Tower internal floor navigation
- ✅ Default arrival at Tower Atrium

### Atmosphere
- ✅ Shift selection (morning/night/weekend/holiday)
- ✅ Time period selection
- ✅ Power state (online/backup/offline)
- ✅ Body `data-*` driven CSS theming
- ✅ Window view (procedural sky by time)
- ⚠️ ShiftLighting — visual only

### Nexus Infrastructure (in-memory)
- ✅ Object registry display
- ✅ Multi-perspective objects (NASA example)
- ✅ Event bus (internal, seeded events)
- ✅ Search (command palette)
- ✅ Factory contract display
- ✅ 18 shared service definitions
- ✅ Skybridge diagram data
- ⚠️ Clipboard — API exists, no UI
- ⚠️ Commands — listed, not executable
- ❌ File exchange UI
- ❌ Notifications inbox UI
- ❌ Extension system

### Operations (in-memory)
- ✅ Campus clock + rhythm phases
- ✅ Mission display
- ✅ Watchboard
- ✅ Command center dashboard
- ✅ Mailroom display
- ✅ Conveyor display
- ✅ Conveyor advance (working mutation)
- ⚠️ Conveyor pause only (resume broken)
- ✅ Operational history display
- ✅ Logistics stats (static numbers)
- ❌ Submit request UI
- ❌ Queue management UI
- ❌ Review workflow UI
- ❌ Mission create/edit

### Departments
- ✅ 8 department definitions
- ✅ Org chart with expand/collapse
- ✅ Department floor map selection
- ✅ Per-building department dashboards
- ✅ Cross-department project cards
- ✅ Visitor welcome guide
- ✅ Executive floor content in War Room

### Security
- ✅ Factory clearance UI
- ❌ Nexus permission UI
- ❌ Real authentication

### Hidden / Experimental
- `OperationsCenterInterior` — complete UI, never routed
- `submitRequest`, `completeReview`, `registerObject` — runtime APIs without UI
- `copyToClipboard` — context export without consumers

### Broken
- Conveyor Resume button (label only)
- Command palette command execution

### Placeholder
- Digital globe (Tower Atrium)
- War Room whiteboards
- All "live" dashboards and wall content
- Tenant applications (frozen metadata only)

---

## Dependencies

### Internal Modules

```
app/layout.tsx
  → context/* (4 providers)
  → components/campus/CampusShell
       → LocationView → [interior components]
       → transit, security, nexus, operations components

operations/runtime.ts → nexus/factory.ts
context/OperationsContext → operations/runtime.ts
context/NexusContext → nexus/factory.ts
context/DepartmentsContext → departments/*
components/* → context hooks + domain/nexus/operations/departments data
```

### External Libraries

| Package | Usage |
|---------|-------|
| next | Framework, fonts, build |
| react / react-dom | UI |
| framer-motion | Travel overlay, page transitions, campus map |
| tailwindcss | Utility styling |
| typescript | Type safety |
| eslint | Lint |

### APIs / Services

**None connected.**

### Assets

- **Fonts:** Geist Sans, Geist Mono (Google Fonts via Next)
- **Icons:** Unicode emoji/glyphs in registry (🏛, 🔭, etc.) — no icon library
- **Images:** None
- **Media:** None
- **CSS:** `globals.css` — Factory theme variables (`--factory-*`)

---

## Factory Ecosystem Analysis

### Responsibility That Appears to Belong Here

Based on code and README alignment:

1. **Spatial shell** — campus navigation, travel, atmosphere, clearance.
2. **Integration façade** — Nexus singleton as future service bus; Operations as coordination layer.
3. **Canonical registry** — objects, tenants, departments, buildings in one metaphor.
4. **Executive visibility** — Tower Mission Control / Watchboard as aggregation surface (when real data exists).

### Responsibilities That Clearly Belong Elsewhere

| Responsibility | Why |
|----------------|-----|
| Tenant app UIs (Prime, BossLady, etc.) | Explicitly `frozen`; separate products |
| Persistent storage | No DB layer in this repo |
| Authentication / identity provider | No auth implementation |
| Real event streaming | In-memory arrays only |
| CI/CD for tenant releases | Flippy is metaphor only here |
| Actual media/library (Toolbelt) | Not implemented |
| Real observability stack | OperationsCenterInterior mocks metrics |

### Potential Overlap

| Area | Overlap |
|------|---------|
| Operations Center building vs Operations Floor component | Two concepts merged into one route; dead alternate UI |
| `EMPLOYEES` vs `TENANTS` vs `DEPARTMENTS.workers` | Three representations of "applications as workers" |
| `DepartmentStatus` (operations) vs `Department` (departments) | Same org, different types and data sources |
| Factory clearance vs Nexus permission | Parallel security models |
| Mission Control vs Operations Floor | Both show watchboard/command data |

### Potential Missing Responsibilities

- Tenant hosting/embedding (iframe, module federation, deep links).
- Persistence adapter (localStorage, IndexedDB, or API).
- Single permission model applied across UI.
- API route layer or tRPC for singletons.
- Wiring mutation APIs to UI (requests, reviews, object registration).
- Tests and CI.
- Environment-based configuration.
- Removing or routing dead `OperationsCenterInterior`.

### Integration Points (existing hooks)

| Integration point | Mechanism |
|-------------------|-----------|
| Object registry | `nexus.registerObject()`, `addPerspective()` |
| Event bus | `nexus.emit()`, `subscribe()` |
| Cross-tenant requests | `operations.submitRequest()` |
| Department state | `operations.setDepartmentState()` |
| Search | `nexus.search()` |
| Clipboard | `nexus.copy()` via context |

### Unknowns

| Unknown | Notes |
|---------|-------|
| Intended tenant integration protocol | Skybridges are data only; no runtime bridge |
| Whether `engine-room` gets a dedicated UI | Currently generic BuildingInterior |
| Sentinel tenant | Listed in Nexus/departments; no separate building |
| Production deployment target | No Dockerfile, Vercel config, or env docs |
| Relationship to other repos | README references apps not in this monorepo |
| Which operations view is canonical | OperationsFloorInterior vs OperationsCenterInterior |

### Confidence Level

| Assessment | Confidence |
|------------|------------|
| Repo is a UI shell with mock data | **High** |
| Four-layer architecture intent | **High** |
| No production backend | **High** |
| Tenant apps exist elsewhere | **Medium** (README implies; not verified) |
| Future persistence strategy | **Low** (no clues in code) |

---

## Code Health

### Build Status

| Command | Result |
|---------|--------|
| `npm install` | ✅ SUCCESS |
| `npm test` | ❌ FAIL — missing script |
| `npm run build` | ✅ SUCCESS |
| `npm run lint` | ✅ SUCCESS |
| `npm run typecheck` | ❌ FAIL — missing script |

### Phase 10 — Exact Command Output

#### `npm install`

```
up to date, audited 339 packages in 692ms

143 packages are looking for funding
  run `npm fund` for details

2 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

Exit code: **0**

#### `npm test`

```
npm error Missing script: "test"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: /home/ubuntu/.npm/_logs/2026-07-05T18_28_24_987Z-debug-0.log
```

Exit code: **1**

#### `npm run lint`

```
> factory@0.1.0 lint
> next lint

`next lint` is deprecated and will be removed in Next.js 16.
For new projects, use create-next-app to choose your preferred linter.
For existing projects, migrate to the ESLint CLI:
npx @next/codemod@canary next-lint-to-eslint-cli .

✔ No ESLint warnings or errors
```

Exit code: **0**

#### `npm run typecheck`

```
npm error Missing script: "typecheck"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: /home/ubuntu/.npm/_logs/2026-07-05T18_28_25_059Z-debug-0.log
```

Exit code: **1**

Note: `npm run build` includes `Linting and checking validity of types ...` and passes.

#### `npm run build`

```
> factory@0.1.0 build
> next build

   ▲ Next.js 15.5.20

   Creating an optimized production build ...
 ✓ Compiled successfully in 5.2s
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (0/4) ...
   Generating static pages (1/4) 
   Generating static pages (2/4) 
   Generating static pages (3/4) 
 ✓ Generating static pages (4/4)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                 Size  First Load JS
┌ ○ /                                      123 B         102 kB
└ ○ /_not-found                            992 B         103 kB
+ First Load JS shared by all             102 kB
  ├ chunks/255-3981a3d1f3561bd8.js       46.2 kB
  ├ chunks/4bd1b696-c023c6e3521b1417.js  54.2 kB
  └ other shared chunks (total)           1.9 kB


○  (Static)  prerendered as static content
```

Exit code: **0**

### Lint

Clean — no ESLint warnings or errors. Deprecation warning for `next lint`.

### Tests

**None.** No test runner, no test files, no coverage.

### Large Files

| File | Lines | Notes |
|------|-------|-------|
| `src/operations/runtime.ts` | 700 | Largest; seed + APIs |
| `src/domain/registry.ts` | 620 | Building definitions |
| `src/nexus/factory.ts` | 399 | Nexus singleton |
| `src/departments/registry.ts` | 362 | Department data |

None are unmanageable; `runtime.ts` is the main complexity concentration.

### Dead Code

| Item | Evidence |
|------|----------|
| `OperationsCenterInterior.tsx` | Not imported anywhere except self |
| `page.tsx` `null` | Children slot unused |
| `submitRequest` and related | No UI wiring |
| `copyToClipboard` | No UI wiring |
| `NexusContext.setPermission` | No UI wiring |

### Unused Files

- `src/components/nexus/OperationsCenterInterior.tsx` — confirmed unused

### Unused Dependencies

All `package.json` dependencies appear used (Next, React, Framer Motion, Tailwind). No obvious bloat.

### Circular Imports

No circular import issues detected. `operations/runtime.ts` imports `nexus`; nexus does not import operations.

### Duplicate Logic

- Two permission systems (Factory clearance vs Nexus permission).
- Two operations UIs (Floor vs Center interior).
- Employee/tenant/worker registries overlap.
- `Watchboard` rendered in both Tower Mission Control and Operations Floor.

### TODOs / FIXMEs

**Grep for TODO|FIXME|XXX|HACK in `src/`:** No matches.

### Comment Quality

Good module-level docblocks in domain/nexus/operations files explaining master prompts. Minimal inline comments elsewhere — acceptable for current size.

### Naming Consistency

Generally consistent: `Factory*`, building metaphors, `use*` context hooks. Minor inconsistency: `BuildingInterior` vs `*Interior` naming; `operations-center` building vs `OperationsFloorInterior` component.

### Folder Organization

Clear separation by master prompt layer. Components grouped by spatial area. No `hooks/`, `lib/`, or `api/` folders yet.

### Technical Debt

1. Dead `OperationsCenterInterior` vs live `OperationsFloorInterior` routing confusion.
2. Non-functional command palette actions.
3. Conveyor resume incomplete.
4. Dual permission models without unification story.
5. Triple worker registry without single source of truth.
6. Missing test script and CI.
7. `next lint` deprecation path not addressed.
8. 2 moderate npm audit vulnerabilities (postcss/next chain).
9. All state lost on refresh.
10. README oversells relative to implementation.

---

## Strengths

### Best Architecture Decisions

1. **Four-layer provider nesting** mirrors documented mental model — easy onboarding.
2. **Location as state, not routes** — fits spatial metaphor; avoids URL fragmentation for demo.
3. **Singleton services (`nexus`, `operations`)** — clear future extraction point to real backends.
4. **Canonical object model with perspectives** — strong cross-tenant data design.
5. **Frozen tenant registry** — explicit boundary: don't redesign tenants here.

### Best UI

1. **Campus map + travel overlay** — distinctive, cohesive atmosphere.
2. **Tower three-floor structure** — clear executive narrative arc.
3. **The Commons** — effective org onboarding in one screen.
4. **Consistent typography/spacing** — `text-[10px] uppercase tracking-[0.3em]` design language.
5. **Garden** — intentional contrast (no dashboards).

### Best Code

1. **`src/domain/types.ts`** — thorough domain modeling.
2. **`FactoryContext` travel logic** — clearance, duration, tower room handling clean.
3. **`src/nexus/factory.ts`** — well-structured service class with emit/subscribe.
4. **Strict TypeScript** — builds clean.

### Best Documentation

1. **README four-layer table** — concise and accurate at conceptual level.
2. **File header comments** citing master prompts — traceability.
3. **Architect rules** repeated in UI copy — reinforces design intent.

### Most Reusable Systems

1. `FactoryNexus` — object registry + event bus pattern.
2. `FactoryOperations` — mission/conveyor/mail domain model.
3. `domain/registry.ts` — building graph + transit calculations.
4. `departments/org-chart.ts` + `dashboards.ts` — composable org views.
5. Atmosphere system (`data-shift`, `data-time` on body).

### Strongest Modules

| Module | Strength |
|--------|----------|
| `src/context/FactoryContext.tsx` | Core navigation works reliably |
| `src/components/transit/*` | Best UX polish |
| `src/nexus/factory.ts` | Richest API surface |
| `src/departments/registry.ts` | Complete org model |

---

## Weaknesses

### Highest Technical Debt

1. No persistence or API — all value lost on refresh.
2. Dead `OperationsCenterInterior` + routing ambiguity.
3. Rich runtime APIs with minimal UI wiring.
4. No automated tests.

### Most Confusing Code

1. **Two operations interiors** — which is Operations Center building supposed to show?
2. **Three worker registries** — which is source of truth?
3. **Conveyor Resume** — misleading UI.
4. **Command palette commands** — look clickable, do nothing.

### Weakest Architecture

- **Security model duplication** (Clearance vs NexusPermission) with only one exposed.
- **No integration boundary** for real tenant apps despite skybridge metaphor.

### Weakest UX

- Command palette promises actions that don't run.
- Department floor map selects but doesn't navigate.
- Search results don't navigate on click.
- Underground buildings absent from radial map graphic.

### Biggest Maintenance Risks

1. `operations/runtime.ts` (700 lines) growing without tests.
2. Registry data duplicated across domain/nexus/departments.
3. README/code drift as features are imagined vs built.
4. `next lint` removal in Next.js 16.

---

## Scores (0–100)

| Dimension | Score | Explanation |
|-----------|-------|-------------|
| **Mission clarity** | 78 | README and code headers articulate vision well; conflicts between aspiration and implementation reduce score. |
| **Architecture** | 72 | Clean layered structure and singleton boundaries; penalized for duplicate models and dead routing path. |
| **Code quality** | 74 | Strict TS, consistent patterns, no lint errors; large runtime file and unwired APIs hurt. |
| **Documentation** | 45 | One README, no API docs, no ops docs; types help but insufficient for ecosystem onboarding. |
| **Testing** | 5 | No tests, no test script, no CI. |
| **Maintainability** | 58 | Small codebase and clear folders help; registry duplication and missing tests hurt. |
| **Scalability** | 50 | Singleton in-memory design won't scale; patterns suggest future extraction but not implemented. |
| **UX** | 70 | Strong atmosphere and navigation; broken/partial interactions and mock data visible on inspection. |
| **Performance** | 82 | Static prerender, small bundle (~102 kB first load), no network waterfalls; fine for current scope. |
| **Factory readiness** | 38 | Metaphor and integration sketches exist; no real tenants, persistence, auth, or ops pipeline. |
| **Overall maturity** | 52 | Polished v0.1 experience shell — not yet an operational factory ecosystem. |

---

## Safe Recommendations

### What Should Absolutely Be Preserved

1. **Four-layer conceptual model** (Buildings → Nexus → Operations → Departments).
2. **Spatial navigation** — campus map, travel overlay, clearance gating.
3. **`FactoryNexus` object + event model** — canonical ID with perspectives.
4. **`FactoryOperations` domain types** — missions, conveyor stages, mailroom.
5. **Frozen tenant boundary** — don't merge tenant apps into this repo.
6. **Atmosphere system** — shift/time/power theming.
7. **The Commons as org hub** — visitor welcome, org chart, floor map.
8. **TypeScript strict mode and path aliases.**

### What Should Definitely Not Be Touched Yet

1. **Tenant application codebases** (external, frozen by design).
2. **Building registry narrative content** — extensive curated copy in `domain/registry.ts`.
3. **Core provider nesting order** — dependencies assume Nexus under Factory, Operations under Nexus.
4. **Default arrival location** (Tower Atrium) — establishes UX entry point.
5. **Major routing refactor to URL-based buildings** — would be redesign; defer until integration requirements are clear.

### What Deserves Investigation

1. **Resolve Operations Center UI** — `OperationsCenterInterior` vs `OperationsFloorInterior` intent.
2. **Unify worker/tenant/employee registries** — single source of truth design.
3. **Unify permission models** — Factory clearance vs Nexus permission.
4. **Command palette** — intended behavior for commands and search result selection.
5. **Conveyor pause/resume** — complete or remove Resume label.
6. **Where tenant apps will mount** — iframe, links, micro-frontends?
7. **Persistence strategy** — session restore, API backend, or hybrid.
8. **Sentinel** — department worker without dedicated building.

### What Deserves Repair First

1. **Wire or remove dead `OperationsCenterInterior`** — eliminates architectural confusion.
2. **Command palette `onClick` or disable command buttons** — stops false affordance.
3. **Fix conveyor resume** — implement unpause or rename button to Pause only.
4. **Add `typecheck` script** — `"typecheck": "tsc --noEmit"` for CI readiness.
5. **Department floor map → navigate to building** — small UX win, already has selection state.

### One Safest Next Step

**Document and resolve the Operations Center routing decision:** either route `operations-center` to `OperationsCenterInterior` (Nexus infra ops) and rename/rehome business operations elsewhere, or delete `OperationsCenterInterior` and update building copy to match `OperationsFloorInterior`. This is a small, reversible change that removes the largest architectural ambiguity without redesigning the ecosystem.

---

## Unknowns

1. External tenant repositories — existence, tech stack, integration timeline.
2. Whether URL routing per building is desired for shareable deep links.
3. Production hosting and environment variable requirements.
4. Auth provider choice (if any).
5. Official list of Factory Services (10 vs 18).
6. Fate of `engine-room` as distinct from `utility-floor`.
7. Whether `npm audit` moderate vulnerabilities are accepted risk.
8. PR #1 merge target timeline and scope of v0.2.0.

---

## Appendix: Buildings Registry

| ID | Name | Clearance | Interior | Underground |
|----|------|-----------|----------|-------------|
| tower | The Tower | founder | TowerInterior | No |
| observatory | The Observatory | employee | BuildingInterior | No |
| toolbelt | Toolbelt | employee | BuildingInterior | No |
| citadel | Citadel | employee | BuildingInterior | No |
| forge | The Forge | architect | BuildingInterior | No |
| commons | The Commons | visitor | CommonsInterior | No |
| prime | Prime | architect | BuildingInterior | No |
| bosslady | BossLady | engineer | BuildingInterior | No |
| fip | FIP | engineer | BuildingInterior | No |
| flippy | Flippy | engineer | BuildingInterior | No |
| engine-room | The Engine Room | system | BuildingInterior | Yes |
| utility-floor | The Utility Floor | engineer | UtilityFloorInterior | Yes |
| operations-center | The Operations Center | architect | OperationsFloorInterior | Yes |
| garden | The Garden | visitor | GardenInterior | No (isPlace) |

## Appendix: Git History (feature branch)

```
7cf31d0 Project Departments: organizational structure (Master Prompt 004)
4ea7b94 Project Operations: the company operating system (Master Prompt 003)
2ab57ff Update README for Project Nexus and fix NexusContext lint
dd7078f Project Nexus: shared infrastructure layer (Master Prompt 002)
6fd11ec Master Architecture V1.0: Titan Campus radial layout
64606f9 Build Project Titan: the Factory as spatial headquarters
9c37762 Initial commit
```

---

*End of audit. This document describes observed state only. No code was modified during investigation except creation of this file.*
