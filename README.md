# The Factory

**MASTER ARCHITECTURE V1.0 — Codename: TITAN CAMPUS**

> Morgan doesn't launch software. He arrives at Headquarters.

---

## What This Is

The Factory is a **physical place**. Every program is merely a tenant. The Factory itself is the product.

This is building architecture — Apple Park meets NASA meets Disney meets MIT meets the Pentagon.

## Foundation Stone

> **"Every room has one purpose. Every purpose has one room."**

## The Campus

Nine buildings revolve around **The Tower**. Connected underground. Connected digitally. Connected philosophically.

```
                     OBSERVATORY
                           ▲
            ┌──────────────┼──────────────┐
            │          THE TOWER          │
            │   F1 Atrium · F2 Mission    │
            │   Control · F3 War Room     │
            └───────┬──────┼──────┬───────┘
         TOOLBELT   │  COMMONS  │  CITADEL
                    FORGE  PRIME
                 BOSSLADY    FIP
                        FLIPPY
```

Plus **The Garden** (no screens, just sky) and **The Engine Room** (underground).

| Building | Tenant | Badge | Soundscape |
|----------|--------|-------|------------|
| **The Tower** | Morgan (Headquarters) | Gold | Calm HVAC |
| **The Observatory** | World Monitor | Purple | Soft radio chatter |
| **Toolbelt** | Media Curator | Blue | Library silence |
| **Citadel** | Chief Archivist | Bronze | Echoing stone |
| **The Forge** | Research Lead | Red | Industrial ambience |
| **The Commons** | Everyone | Green | Fountain murmur |
| **Prime** | Strategic Intelligence | White | Quiet processing |
| **BossLady** | Chief Engineer | Orange | Mechanical keyboards |
| **FIP** | Metrics Analyst | Green | Laboratory silence |
| **Flippy** | Release Captain | Yellow | Packaging machines |

## The Tower (Three Floors)

1. **The Atrium** — Grand Central Terminal. Departure board shows where every employee is right now. Digital globe. Where every day begins.
2. **Mission Control** — NASA, not dashboards. Factory status. Missions. Blockers. Launch countdowns. You stand.
3. **War Room** — Whiteboards. Glass. Strategy. No coding. Only thinking.

## Five Human Instincts

Every hallway reinforces one:

- **Exploration** — The Forge
- **Mastery** — BossLady, FIP, Citadel
- **Belonging** — The Commons, The Garden, The Atrium
- **Curiosity** — The Observatory, Toolbelt, War Room
- **Purpose** — The Tower, Prime, Flippy

## Transportation

No sidebar. Campus map with radial layout. Travel via:

- Elevators (Tower floors, underground)
- Skybridges
- Glass tunnels
- Moving walkways
- Autonomous carts

Nothing teleports. You travel.

## Getting Started

```bash
npm install
npm run dev
```

You arrive in **The Tower Atrium**. Open the campus map (bottom-right). Travel.

## Adding a Building

1. Add to `BUILDING_IDS` in `src/domain/types.ts`
2. Define in `BUILDINGS` in `src/domain/registry.ts` with position, material, instinct, soundscape
3. It appears on the campus map automatically

The architecture never changes shape. It only grows.

---

*Before Prime existed... there was a building.*
