# Factory Release Law

**Strict ecosystem-wide rules.** No fake green status.

---

## Core Rule

No repository is considered **mature** or **release-ready** unless every applicable gate below passes with **documented evidence**.

---

## Mandatory Gates (all repos at Level 2+)

| Gate | Requirement |
|------|-------------|
| **README truth** | README describes actual behavior, not aspiration |
| **npm install** | Exits 0 |
| **npm test** | Script exists; all tests pass |
| **npm run build** | Exits 0 (or documented N/A for doc-only repos) |
| **npm run lint** | Exits 0 |
| **npm run typecheck** | Script exists; exits 0 |
| **Audit current** | `docs/audits/ACTUAL_STATE_AUDIT.md` reflects branch audited |
| **Repair result** | Latest repair pass documented if repairs were done |
| **Hidden failures** | None — exact command output recorded |
| **Factory role** | Documented in REPOSITORY_REGISTRY |
| **Maturity assigned** | Level 0–5 with evidence in FACTORY_MATURITY_MODEL |

---

## Level 4 (Daily Driver) Additional Gates

| Gate | Requirement |
|------|-------------|
| **CI** | `.github/workflows` or equivalent runs build + test + lint on PR |
| **Integration** | At least one verified consumer or human use proof |
| **Factory certification** | If applicable: standards validation pass |

---

## Level 5 (Foundation) Additional Gates

| Gate | Requirement |
|------|-------------|
| **Certification** | MUST pass `factory-standards` validation (score ≥ 97 for foundation repos) |
| **Independent audit** | Not self-audit only |
| **No duplicate canonical** | Single source (e.g. one factory-standards remote) |
| **CI** | Required including certification validation where applicable |

---

## Factory HQ Specific

| Gate | Requirement |
|------|-------------|
| Governance docs | `docs/governance/*` complete and current |
| Registry sync | `src/governance/registry.ts` matches REPOSITORY_REGISTRY |
| Control Tower | Static UI labeled **not live CI** until wired |
| No mock-as-live | Seeded operations data must not be labeled real |

---

## Release Prohibition

**Do not release** if:

- Audit score conflicts with assigned maturity without explanation
- `npm test` or `typecheck` missing (Level 2+)
- README claims integrations that audits mark unwired
- Certification package fails standards validation
- Placeholder tenant zips presented as shipped products

---

## Current Compliance Snapshot (2026-07-05)

| Repo | Meets L2 gates? | Meets L4? | Meets L5? |
|------|-----------------|-----------|-----------|
| factory-standards | Mostly (no typecheck script) | No (no CI) | No (artifact drift) |
| factory-core | Yes (on audit branch) | No | No (self-audit; duplicate standards) |
| factory | Yes (post repair-pass scripts) | No | No |
| Tenants | **UNKNOWN** | No | No |
