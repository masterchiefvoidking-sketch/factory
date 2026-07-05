# The Factory

**Project Titan — FACTORY MASTER PROMPT 001**

> Morgan doesn't launch software. He arrives at Headquarters.

---

## What This Is

The Factory is not software. The Factory is a place.

This repository contains the **building architecture** for Project Titan — the spatial headquarters where every application is a department, every department has people, and every person has a job.

We are not building apps. We are building the building they inhabit.

## The Campus

| Building | Floor | Role |
|----------|-------|------|
| **The Tower** | 90 | Executive operations. Mission Control. Morgan's office. |
| **The Observatory** | 70 | Walls of screens. Everything entering the Factory begins here. |
| **Prime** | 55 | Strategic intelligence. Cross-building orchestration. |
| **The Workshop** | 40 | BossLady. Engineering. Builds. Deployments. |
| **The Forge** | 25 | Where ideas become companies. Nothing leaves until proven. |
| **The Data Center** | 20 | FIP. Metrics. Benchmarks. Everything measurable. |
| **The Archive** | 15 | Citadel. Every document. Every decision. Nothing is lost. |
| **The Hangar** | 10 | Flippy. Packaging. Releases. Distribution. |
| **The Theater** | G | Toolbelt. Media. Learning. The calmest building. |
| **The Courtyard** | G | Arrival. Culture. Celebrations. Company timeline. |
| **Maintenance Wing** | B5 | Repair. Recovery. The Factory never feels dead. |
| **The Engine Room** | B10 | Identity. Events. Storage. The machinery beneath everything. |

## Architecture Principles

1. **Build the building, not the apps.** Before Prime existed, there was a building.
2. **Spatial memory over menus.** "Meet me in the Observatory" — not "click the analytics tab."
3. **Nothing teleports.** The elevator travels. The camera moves. You hear machinery.
4. **Every wall teaches something.** Blueprints. Timelines. Principles. Never empty.
5. **Every room has clearance.** Visitor through Administrator. Different doors open.
6. **The Factory changes with shifts.** Morning. Night. Weekend. Holiday.
7. **Scale without restructuring.** Today 12 buildings. Someday 120. Architecture never changes.

## Tech Stack

- **Next.js 15** — App shell
- **TypeScript** — Domain types (`Building`, `Floor`, `ClearanceLevel`, `Shift`)
- **Tailwind CSS 4** — Atmosphere and lighting
- **Framer Motion** — Elevator travel, camera movement, transitions

## Domain Layer

```
src/domain/
  types.ts      — Building architecture types
  registry.ts   — Building registry, elevator stops, employees, transit routes
```

The registry is the architectural spine. New buildings are added here — never by restructuring routes or layouts.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You arrive in the Courtyard.

Use the elevator (bottom-right) to travel between buildings.

## Adding a New Building

1. Add the building to `BUILDING_IDS` in `src/domain/types.ts`
2. Define it in `BUILDINGS` in `src/domain/registry.ts`
3. Add an elevator stop to `ELEVATOR_STOPS`
4. The building automatically appears in the campus

No route changes. No layout changes. The architecture scales.

---

*Before BossLady wrote code... there was a building.*
