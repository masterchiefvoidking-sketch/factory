/**
 * PROJECT GOVERNANCE 005 — Mill Control Tower
 * Static governance types. Evidence-backed registry only.
 */

export const MATURITY_LEVELS = [
  "idea",
  "scaffold",
  "prototype",
  "beta",
  "daily-driver",
  "foundation",
] as const;

export type MaturityLevel = (typeof MATURITY_LEVELS)[number];

export const MATURITY_LABELS: Record<MaturityLevel, string> = {
  idea: "0 — Idea",
  scaffold: "1 — Scaffold",
  prototype: "2 — Prototype",
  beta: "3 — Beta",
  "daily-driver": "4 — Daily Driver",
  foundation: "5 — Foundation",
};

export const HEALTH_STATUSES = [
  "green",
  "yellow",
  "orange",
  "red",
  "gray",
] as const;

export type HealthStatus = (typeof HEALTH_STATUSES)[number];

export const INTEGRATION_STATUSES = [
  "verified",
  "documented",
  "placeholder",
  "unwired",
  "unknown",
] as const;

export type IntegrationStatus = (typeof INTEGRATION_STATUSES)[number];

export const CONFIDENCE_LEVELS = ["high", "medium", "low"] as const;
export type ConfidenceLevel = (typeof CONFIDENCE_LEVELS)[number];

export interface RepositoryEntry {
  id: string;
  canonicalName: string;
  alternateNames: string[];
  githubRepo: string | null;
  npmPackage: string | null;
  role: string;
  department: string;
  buildingId: string | null;
  maturity: MaturityLevel;
  auditScore: number | null;
  health: HealthStatus;
  integrationStatus: IntegrationStatus;
  owns: string[];
  mustNotOwn: string[];
  provides: string[];
  consumes: string[];
  blockers: string[];
  evidenceSource: string;
  confidence: ConfidenceLevel;
  notes?: string;
}

export interface RepairQueueItem {
  id: string;
  repo: string;
  severity: "critical" | "high" | "medium" | "low";
  dependencyOrder: number;
  reason: string;
  evidence: string;
  safeFirstAction: string;
  blockers: string[];
  doneCriteria: string;
}

export interface RepoStatusRow {
  repo: string;
  role: string;
  department: string;
  maturity: MaturityLevel;
  auditScore: number | null;
  build: "pass" | "fail" | "unknown";
  tests: "pass" | "fail" | "missing" | "unknown";
  lint: "pass" | "fail" | "unknown";
  typecheck: "pass" | "fail" | "missing" | "unknown";
  docs: "good" | "partial" | "poor" | "unknown";
  factoryCertification: string;
  integrationStatus: IntegrationStatus;
  blocker: string;
  nextRepair: string;
  overall: HealthStatus;
}
