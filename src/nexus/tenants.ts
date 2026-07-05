import type { Tenant, TenantId } from "./types";

/**
 * Frozen Tenants
 *
 * These applications are NOT being redesigned.
 * They plug into Nexus infrastructure as-is.
 */

export const TENANTS: Record<TenantId, Tenant> = {
  prime: {
    id: "prime",
    name: "Prime",
    buildingId: "prime",
    badgeColor: "#ecf0f1",
    status: "frozen",
    description: "Strategic intelligence. Reasons about shared objects.",
  },
  toolbelt: {
    id: "toolbelt",
    name: "Toolbelt",
    buildingId: "toolbelt",
    badgeColor: "#3498db",
    status: "frozen",
    description: "Media curator. Bookmarks and archives media objects.",
  },
  bosslady: {
    id: "bosslady",
    name: "BossLady",
    buildingId: "bosslady",
    badgeColor: "#e67e22",
    status: "frozen",
    description: "Chief engineer. Builds integrations and executes on objects.",
  },
  citadel: {
    id: "citadel",
    name: "Citadel",
    buildingId: "citadel",
    badgeColor: "#cd7f32",
    status: "frozen",
    description: "Chief archivist. Remembers every decision and document.",
  },
  forge: {
    id: "forge",
    name: "Forge",
    buildingId: "forge",
    badgeColor: "#e74c3c",
    status: "frozen",
    description: "Research lead. Evaluates business ideas and signals.",
  },
  flippy: {
    id: "flippy",
    name: "Flippy",
    buildingId: "flippy",
    badgeColor: "#f1c40f",
    status: "frozen",
    description: "Release captain. Packages and distributes artifacts.",
  },
  fip: {
    id: "fip",
    name: "FIP",
    buildingId: "fip",
    badgeColor: "#2ecc71",
    status: "frozen",
    description: "Metrics analyst. Measures usage and performance.",
  },
  observatory: {
    id: "observatory",
    name: "Observatory",
    buildingId: "observatory",
    badgeColor: "#9b59b6",
    status: "frozen",
    description: "World monitor. Watches external signals entering the Factory.",
  },
  sentinel: {
    id: "sentinel",
    name: "Sentinel",
    buildingId: "observatory",
    badgeColor: "#7f8c8d",
    status: "frozen",
    description: "Security watcher. Monitors threats and access patterns.",
  },
};
