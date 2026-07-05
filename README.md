# The Factory

**MASTER ARCHITECTURE V1.0** — Titan Campus  
**PROJECT NEXUS** — FACTORY MASTER PROMPT 002

> Applications never communicate directly. They communicate through Factory infrastructure.

---

## What This Is

The Factory is a **physical place** and an **operating platform**.

- **Titan Campus** (V1.0) — the buildings, the spatial headquarters
- **Project Nexus** (V2.0) — the invisible infrastructure that lets every tenant cooperate

Tenants are **frozen**: Prime, Toolbelt, BossLady, Citadel, Forge, Flippy, FIP, Observatory, Sentinel.  
We don't redesign them. We build the campus that lets them work together.

## The First Law

> Applications never communicate directly. They communicate through Factory infrastructure.

## Shared Services (Utility Floor)

| Service | Purpose |
|---------|---------|
| Factory Identity | Authentication & tenant identity |
| Object Registry | ONE object. ONE ID. Every tenant references the same canonical object. |
| Event Bus | Every important action emits an event |
| Notification Center | One inbox. Not nine. |
| Search | One search. Every application contributes. |
| Activity Stream | Operational history. Not chat. |
| Clipboard | Copy anywhere. Paste anywhere. |
| File Exchange | Documents, images, reports — one protocol |
| Permission Engine | Visitor → System. Same model everywhere. |
| API Gateway | No direct tenant-to-tenant calls |
| Extension System | Future tenants plug in without modifying the Factory |

## The Object Registry

One canonical object. Not nine versions.

`Project` · `Task` · `Decision` · `Business` · `Repository` · `Signal` · `Media` · `Report` · `Package` · `Contact` · `Company` · `Idea`

**Example:** Toolbelt bookmarks NASA. Prime reasons about NASA. Citadel remembers NASA. BossLady builds NASA integration. Same object. Same ID. Different perspectives.

## Underground Infrastructure

| Location | Purpose |
|----------|---------|
| **Engine Room** | Servers, pipes, power — the machinery beneath everything |
| **Utility Floor** | Shared services. No tenant owns these. |
| **Operations Center** | System health, event traffic, connector status |

## The Factory Contract

Every tenant **may**: register objects, publish/subscribe events, use Factory search, identity, clipboard, storage.

Every tenant **may not**: duplicate shared infrastructure, invent new identity/notification/search systems, communicate directly with other tenants.

## Command Palette

Press **⌘K** anywhere in the Factory. Universal search and tenant commands.

## Getting Started

```bash
npm install
npm run dev
```

Arrive at The Tower. Travel underground to the Utility Floor. Open Operations Center. Press ⌘K.

---

*Adding the tenth application requires almost no Factory changes. It simply plugs in.*
