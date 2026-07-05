import type { Skybridge, ObjectType } from "./types";

/**
 * The Skybridge System
 *
 * Visible architectural connections between tenants.
 * Not API diagrams. Architectural diagrams.
 * When a user opens Prime, they see the bridges.
 */

export const SKYBRIDGES: Skybridge[] = [
  {
    id: "toolbelt-media",
    from: "toolbelt",
    carries: "Media Objects",
    objectTypes: ["media"],
    description: "Toolbelt bookmarks and curates media. All tenants reference the same media object.",
  },
  {
    id: "prime-reasoning",
    from: "prime",
    carries: "Reasoning",
    objectTypes: ["project", "task", "decision", "idea", "signal"],
    description: "Prime reasons about any shared object without knowing tenant implementation details.",
  },
  {
    id: "citadel-memory",
    from: "citadel",
    carries: "Memory",
    objectTypes: ["decision", "report", "project"],
    description: "Citadel remembers every decision. Same object ID, permanent record.",
  },
  {
    id: "bosslady-execution",
    from: "bosslady",
    carries: "Execution",
    objectTypes: ["repository", "task", "package"],
    description: "BossLady builds integrations and executes builds on shared objects.",
  },
  {
    id: "flippy-packages",
    from: "flippy",
    carries: "Packages",
    objectTypes: ["package"],
    description: "Flippy packages artifacts. Every release references canonical package objects.",
  },
  {
    id: "fip-metrics",
    from: "fip",
    carries: "Metrics",
    objectTypes: ["report"],
    description: "FIP measures usage across all objects. One measurement layer.",
  },
  {
    id: "forge-signals",
    from: "forge",
    carries: "Signals & Ideas",
    objectTypes: ["signal", "idea", "business"],
    description: "Forge detects signals and evaluates business ideas as shared objects.",
  },
  {
    id: "observatory-feeds",
    from: "observatory",
    carries: "External Feeds",
    objectTypes: ["signal", "media"],
    description: "Observatory ingests world events as signals entering the Factory.",
  },
];

export function getBridgesForTenant(tenantId: string): Skybridge[] {
  return SKYBRIDGES.filter((b) => b.from === tenantId);
}

export function getBridgesForObjectType(type: ObjectType): Skybridge[] {
  return SKYBRIDGES.filter((b) => b.objectTypes.includes(type));
}
