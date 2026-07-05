/**
 * Ecosystem-wide master repair queue — single ordered list.
 * Evidence from audits + governance pass 005.
 */
import type { RepairQueueItem } from "./types";

export const MASTER_REPAIR_QUEUE: RepairQueueItem[] = [
  {
    id: "R-001",
    repo: "factory-standards",
    severity: "critical",
    dependencyOrder: 1,
    reason: "Law must be trustworthy before any tenant or HQ integration",
    evidence:
      "standards audit: stale examples/, zip/folder drift, unvalidated placeholder imports",
    safeFirstAction:
      "Run validate:package on every imports/ zip; regenerate failures; record table",
    blockers: ["None — can proceed independently"],
    doneCriteria:
      "All imports/ zips pass validation; examples/ synced or deprecated; docs match code",
  },
  {
    id: "R-002",
    repo: "factory-core",
    severity: "high",
    dependencyOrder: 2,
    reason: "SDK must prove certification outside itself",
    evidence:
      "code-factory audit: self-audit only; nested standards duplicate; not published",
    safeFirstAction:
      "Citadel certification package using @factory/core CLI (audit safest next step)",
    blockers: ["R-001 standards artifact trust"],
    doneCriteria:
      "Second tenant package validated at standards; split-repo decision documented",
  },
  {
    id: "R-003",
    repo: "factory",
    severity: "high",
    dependencyOrder: 3,
    reason: "HQ must own truthful governance before claiming control tower",
    evidence: "Governance 005 docs; factory audit 52/100; mock data in Mission Control",
    safeFirstAction:
      "Complete docs/governance/*; static Control Tower panel labeled not live",
    blockers: ["R-001", "R-002 for live integration — not for static registry"],
    doneCriteria:
      "All governance docs exist; registry matches audits; UI clearly static",
  },
  {
    id: "R-004",
    repo: "factory",
    severity: "medium",
    dependencyOrder: 4,
    reason: "Test/typecheck baseline for HQ reliability",
    evidence:
      "factory audit: missing scripts; repair-pass added vitest + typecheck on branch",
    safeFirstAction: "Merge repair-pass scripts; expand tests for governance registry",
    blockers: [],
    doneCriteria: "npm test, typecheck, build, lint all pass; documented in governance result",
  },
  {
    id: "R-005",
    repo: "flippy",
    severity: "medium",
    dependencyOrder: 5,
    reason: "Release pipeline canonical branch unknown",
    evidence: "Prompt repair queue item; placeholder zip only",
    safeFirstAction: "Audit Mr. Flippy / Web Flip Factory repo; assign canonical branch",
    blockers: ["UNKNOWN repo location"],
    doneCriteria: "Repository audited; branch documented in REPOSITORY_REGISTRY",
  },
  {
    id: "R-006",
    repo: "bosslady",
    severity: "medium",
    dependencyOrder: 6,
    reason: "Engineering workflow not proven in ecosystem",
    evidence: "No tenant audit; placeholder zip only",
    safeFirstAction: "Forensic audit of BossLady repo; certification package",
    blockers: ["R-002 SDK proof path"],
    doneCriteria: "ACTUAL_STATE_AUDIT.md exists; certification in standards imports/",
  },
  {
    id: "R-007",
    repo: "citadel",
    severity: "medium",
    dependencyOrder: 7,
    reason: "Memory/archive integration truth unclear",
    evidence: "SDK types exist; README/integration UNKNOWN",
    safeFirstAction: "Audit Citadel repo; align README with Factory integration status",
    blockers: ["R-002"],
    doneCriteria: "Audit complete; integration status not placeholder",
  },
  {
    id: "R-008",
    repo: "prime",
    severity: "medium",
    dependencyOrder: 8,
    reason: "Forgina real-world usage not verified",
    evidence: "Frozen tenant in factory only; no repo audit",
    safeFirstAction: "Audit Forgina/Prime repo; Week Zero usage logs if they exist",
    blockers: ["UNKNOWN"],
    doneCriteria: "ACTUAL_STATE_AUDIT.md; maturity assigned from evidence",
  },
  {
    id: "R-009",
    repo: "toolbelt",
    severity: "medium",
    dependencyOrder: 9,
    reason: "Horizon/player qualification scope undecided",
    evidence: "horizon-invalid fixture; Toolbelt/Horizon relationship UNKNOWN",
    safeFirstAction: "Clarify Horizon vs Toolbelt; audit whichever repos exist",
    blockers: ["UNKNOWN repo list"],
    doneCriteria: "Relationship documented; audits or marked N/A",
  },
  {
    id: "R-010",
    repo: "factory",
    severity: "high",
    dependencyOrder: 10,
    reason: "Tenant-to-Factory integration contracts not implemented",
    evidence: "factory audit: no fetch, no API, skybridges data-only",
    safeFirstAction: "Document integration contract in FACTORY_CONTROL_TOWER.md; no fake wire",
    blockers: ["R-001", "R-002", "R-003"],
    doneCriteria: "Approved packages display in HQ from static registry; live wire optional later",
  },
];
