# Factory Dependency Graph

**Allowed dependency direction** — evidence from audits. No point-to-point tenant glue.

---

## Canonical Direction

```text
factory-standards  (The Law)
        │
        │ defines validity for certification packages
        ▼
factory-core  (@factory/core — The Machinery)
        │
        │ provides SDK, types, validators, CLI
        ▼
Factory  (HQ — The Mill Campus)
        │
        │ governs · visualizes · coordinates · documents
        ▼
Tenant applications  (BossLady, Citadel, Forge, …)
```

---

## Rules

1. **Tenants may consume** factory-standards protocols, factory-core SDK, and Factory-published integration contracts.
2. **Tenants must not depend on each other** directly unless explicitly approved through Factory infrastructure (skybridge / event bus / object registry).
3. **If two tenants need to communicate** → build or extend Factory infrastructure (Nexus/Operations layers), not custom glue.
4. **Factory must not duplicate** standards schemas or SDK validators.
5. **factory-standards must not implement** tenant product behavior or HQ UI.

---

## Dependency Matrix

| From ↓ / To → | standards | core | factory | tenants |
|---------------|-----------|------|---------|---------|
| **factory-standards** | — | validates packages | imports cert data | receives cert zips |
| **factory-core** | mirrors constants ⚠ | — | **UNKNOWN** live dep | intended consumer |
| **factory** | **UNKNOWN** live | **UNKNOWN** live | — | visualizes (static) |
| **tenants** | cert workflow | intended SDK | future integration | **FORBIDDEN** direct |

⚠ Audit-confirmed duplication risk: `code-factory/src/standards/` vs `standards-for-factory/schemas/`

---

## Integration Status (verified)

| Link | Status | Evidence |
|------|--------|----------|
| Tenant → standards (cert drop) | **Manual** | `imports/` folder |
| standards → validates core package | **Working** | PASS 97/100 |
| standards → validates factory package | **Working** | PASS 95/100 |
| core → self-cert | **Working** | 100/100 |
| factory → standards/core live | **Unwired** | No npm dep, no fetch |
| tenant → tenant | **None** | By design |

---

## Forbidden Patterns

- BossLady → Citadel direct API
- Custom shared database between tenants without Factory object registry
- Duplicate validation logic in Factory HQ
- HQ embedding full tenant UIs without certification + integration contract

---

## Future Approved Paths (documented, not built)

| Path | Mechanism |
|------|-----------|
| Tenant emits event | Factory event bus (Nexus) |
| Shared object reference | Factory object registry (canonical ID) |
| Cross-tenant request | Factory Operations `submitRequest` (API exists, UI unwired) |
| Release artifact | Flippy → Factory logistics visibility |
