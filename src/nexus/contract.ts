import type { FactoryContractClause } from "./types";

/**
 * The Factory Contract
 *
 * Every tenant signs the same contract.
 * This keeps the campus coherent while tenants evolve independently.
 */

export const FACTORY_CONTRACT = {
  version: "1.0.0",
  effectiveDate: "2026-07-05",
  parties: "Factory Infrastructure ↔ Tenant Application",
  preamble:
    "This contract governs how tenant applications participate in the Factory ecosystem. Tenants remain sovereign over their domain logic. The Factory owns shared infrastructure.",
} as const;

export const CONTRACT_CLAUSES: FactoryContractClause[] = [
  { id: "may-1", type: "may", text: "Register objects in the Factory Object Registry" },
  { id: "may-2", type: "may", text: "Publish events to the Factory Event Bus" },
  { id: "may-3", type: "may", text: "Subscribe to events they care about" },
  { id: "may-4", type: "may", text: "Read shared objects (as permitted by the Permission Engine)" },
  { id: "may-5", type: "may", text: "Use Factory Search — one search, every application contributes" },
  { id: "may-6", type: "may", text: "Use Factory Identity for authentication and authorization" },
  { id: "may-7", type: "may", text: "Use the Factory Clipboard — copy anywhere, paste anywhere" },
  { id: "may-8", type: "may", text: "Use Factory Automation for background workflows" },
  { id: "may-9", type: "may", text: "Use Factory Storage via the File Exchange protocol" },
  { id: "may-10", type: "may", text: "Register commands in the universal Command Palette" },
  { id: "may-not-1", type: "may-not", text: "Duplicate shared infrastructure" },
  { id: "may-not-2", type: "may-not", text: "Invent new identity systems" },
  { id: "may-not-3", type: "may-not", text: "Invent new notification systems" },
  { id: "may-not-4", type: "may-not", text: "Invent new search systems" },
  { id: "may-not-5", type: "may-not", text: "Invent incompatible object models" },
  { id: "may-not-6", type: "may-not", text: "Communicate directly with other tenants" },
  { id: "may-not-7", type: "may-not", text: "Bypass the Factory Event Bus for cross-tenant actions" },
];
