/**
 * Verified certification proofs ingested into Factory governance.
 * STATIC — not live CI. See docs/governance/FACTORY_PROOF_LOG.md
 */
import type { ProofLogEntry } from "./types";

export const PROOF_LOG: ProofLogEntry[] = [
  {
    id: "proof-001",
    title: "Proof #001 — Citadel Tenant Certification",
    date: "2026-07-05",
    repo: "Citadel",
    branch: "UNKNOWN",
    prNumber: "UNKNOWN",
    certificationScore: 98,
    proves: [
      "factory-standards completion pass succeeded",
      "factory-core completion pass succeeded",
      "Citadel certification passed factory-standards validation",
      "Standards/core certification chain validates a real tenant",
      "Citadel is Factory-certification-ready",
    ],
    doesNotProve: [
      "Live Factory HQ integration",
      "Daily-driver readiness",
      "Automated CI on Citadel certification path",
      "Manual JSON import is not live wire",
    ],
    commandResults: {
      "factory-standards validation": "PASS — score 98/100",
      "npm test": "59/59 pass",
      "npm run build": "pass",
      "npm run lint": "0 errors, 7 warnings",
      "npm run typecheck": "pass",
      "npm audit": "0 vulnerabilities",
    },
  },
];

export const FIRST_CERTIFIED_TENANT_ID = "citadel";
