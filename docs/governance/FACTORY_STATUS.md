# Factory Status

**Ecosystem health dashboard (documentation).** Not live CI.  
**Code mirror:** `src/governance/status.ts`

**Legend:** GREEN reliable · YELLOW useful incomplete · ORANGE prototype/risky · RED blocked · GRAY unknown

---

| Repo | Role | Department | Maturity | Audit | Build | Tests | Lint | Typecheck | Docs | Factory cert | Integration | Blocker | Next repair | Overall |
|------|------|------------|----------|-------|-------|-------|------|-----------|------|--------------|-------------|---------|-------------|---------|
| factory-standards | The Law | Factory Services | Beta (3) | 83 | pass | pass | pass | **missing** | good | N/A | verified | Stale zips; no CI | R-001 | **YELLOW** |
| factory-core | SDK | Factory Services | Prototype (2) | 74 | pass | pass | pass | pass | good | PASS 97 | documented | Unpublished; split confusion | R-002 | **YELLOW** |
| **factory** | HQ / Control Tower | Executive | Prototype (2) | 52 | pass | pass | pass | pass | partial | PASS 95 | unwired | Mock ops UI; no live wire | R-003 | **ORANGE** |
| bosslady | Engineering | Engineering | Scaffold (1) | — | ? | ? | ? | ? | ? | placeholder | placeholder | No audit | R-006 | **GRAY** |
| prime / forgina | Reasoning | Reasoning | Scaffold (1) | — | ? | ? | ? | ? | ? | none | placeholder | No audit | R-008 | **GRAY** |
| citadel | Memory | Memory | Scaffold (1) | — | ? | ? | ? | ? | ? | placeholder | placeholder | No audit | R-007 | **GRAY** |
| toolbelt / horizon | Knowledge | Knowledge | Scaffold (1) | — | ? | ? | ? | ? | ? | horizon fixture | unknown | Scope UNKNOWN | R-009 | **GRAY** |
| flippy | Release | Release | Scaffold (1) | — | ? | ? | ? | ? | ? | placeholder | placeholder | Branch UNKNOWN | R-005 | **GRAY** |
| forge | Innovation | Innovation | Scaffold (1) | — | ? | ? | ? | ? | ? | none | placeholder | No audit | — | **GRAY** |
| fip | Quality | Quality | Scaffold (1) | — | ? | ? | ? | ? | ? | none | placeholder | No audit | — | **GRAY** |
| observatory | Intelligence | Intelligence | Scaffold (1) | — | ? | ? | ? | ? | ? | none | placeholder | No audit | — | **GRAY** |
| sentinel | Security | Intelligence | Idea (0) | — | ? | ? | ? | ? | ? | none | unknown | No repo | — | **GRAY** |

---

## Factory HQ (this repo) — detail

| Field | Value |
|-------|-------|
| Governance pass | 005 — Mill Control Tower |
| Scripts | dev, build, start, lint, typecheck, test |
| Governance docs | `docs/governance/` (10 files) |
| Control Tower UI | Tower → Mission Control → static panel |
| Live CI feed | **Not implemented** |
| Next safest repair | **R-003** (this pass) then **R-001** ecosystem |

---

## Ecosystem summary

- **3 audited repos** — 0 at GREEN overall
- **9+ tenant programs** — all GRAY (unknown)
- **Critical path:** R-001 → R-002 → R-003 → R-010
