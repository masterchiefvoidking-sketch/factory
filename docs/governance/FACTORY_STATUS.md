# Factory Status

**Ecosystem health dashboard (documentation).** Not live CI.  
**Code mirror:** `src/governance/status.ts`

**Legend:** GREEN reliable · YELLOW useful incomplete · ORANGE prototype/risky · RED blocked · GRAY unknown

**First certified tenant:** Citadel (Proof #001) — PASS 98/100 — manual integration only

---

| Repo | Role | Department | Maturity | Audit | Build | Tests | Lint | Typecheck | Docs | Factory cert | Integration | Blocker | Next repair | Overall |
|------|------|------------|----------|-------|-------|-------|------|-----------|------|--------------|-------------|---------|-------------|---------|
| factory-standards | The Law | Factory Services | Beta (3) | 83 | pass | pass | pass | **missing** | good | N/A | verified | Stale zips; no CI | Maintain | **YELLOW** |
| factory-core | SDK | Factory Services | Prototype (2) | 74 | pass | pass | pass | pass | good | PASS 97; completion pass OK | documented | Unpublished; split confusion | Maintain | **YELLOW** |
| **factory** | HQ / Control Tower | Executive | Prototype (2) | 52 | pass | pass | pass | pass | partial | PASS 95; self-cert pending | unwired | Mock ops UI; no live wire | R-013 | **ORANGE** |
| bosslady | Engineering | Engineering | Scaffold (1) | — | ? | ? | ? | ? | ? | not certified | placeholder | No audit | R-006 | **GRAY** |
| prime / forgina | Reasoning | Reasoning | Scaffold (1) | — | ? | ? | ? | ? | ? | not certified | placeholder | No audit | R-008 | **GRAY** |
| **citadel** | Executive command center / memory | Memory | **Beta (3)** | — | pass | 59/59 | 0 err / 7 warn | pass | ? | **PASS 98** (Proof #001) | **manual** | No live wire; no CI on cert path | **R-011** | **YELLOW** |
| toolbelt / horizon | Knowledge | Knowledge | Scaffold (1) | — | ? | ? | ? | ? | ? | fixture only | unknown | Scope UNKNOWN | R-009 | **GRAY** |
| flippy | Release | Release | Scaffold (1) | — | ? | ? | ? | ? | ? | not certified | placeholder | Branch UNKNOWN | R-005 | **GRAY** |
| forge | Innovation | Innovation | Scaffold (1) | — | ? | ? | ? | ? | ? | none | placeholder | No audit | — | **GRAY** |
| fip | Quality | Quality | Scaffold (1) | — | ? | ? | ? | ? | ? | none | placeholder | No audit | — | **GRAY** |
| observatory | Intelligence | Intelligence | Scaffold (1) | — | ? | ? | ? | ? | ? | none | placeholder | No audit | — | **GRAY** |
| sentinel | Security | Intelligence | Idea (0) | — | ? | ? | ? | ? | ? | none | unknown | No repo | — | **GRAY** |

---

## Factory HQ (this repo) — detail

| Field | Value |
|-------|-------|
| Governance pass | 005 — Mill Control Tower + Proof #001 ingest |
| Scripts | dev, build, start, lint, typecheck, test |
| Governance docs | `docs/governance/` (12+ files incl. FACTORY_PROOF_LOG) |
| Control Tower UI | Tower → Mission Control → static panel + Proof #001 card |
| Live CI feed | **Not implemented** |
| First certified tenant | Citadel — 98/100 — manual only |
| Next safest repair | **R-011** (Citadel CI) |

---

## Ecosystem summary

- **3 audited foundation repos** — 0 at GREEN overall
- **1 certified tenant proof** — Citadel (YELLOW; not Daily Driver; not live integrated)
- **8+ tenant programs** — remaining GRAY (unknown or not certified)
- **Critical path:** R-011 → R-012 → tenant certifications → R-013 (Factory self-cert)
