/**
 * PROJECT OPERATIONS — FACTORY MASTER PROMPT 003
 * The Operating System of the Company
 *
 * Applications are departments. Departments perform work.
 * The Factory coordinates the work.
 */

import type { TenantId } from "@/nexus/types";

// ─── Architect's Rule ────────────────────────────────────────────────────────

export const ARCHITECT_RULE =
  "If two tenants need to communicate, build or extend Factory infrastructure—not custom glue.";

// ─── Department States ─────────────────────────────────────────────────────

export const DEPARTMENT_STATES = [
  "idle",
  "working",
  "waiting",
  "blocked",
  "review",
  "maintenance",
  "offline",
] as const;

export type DepartmentState = (typeof DEPARTMENT_STATES)[number];

export const HEALTH_STATES = ["healthy", "degraded", "emergency"] as const;
export type HealthState = (typeof HEALTH_STATES)[number];

export interface DepartmentStatus {
  tenantId: TenantId;
  state: DepartmentState;
  health: HealthState;
  currentWork: string;
  queueDepth: number;
  lastUpdated: string;
}

// ─── Daily Rhythm ────────────────────────────────────────────────────────────

export const RHYTHM_PHASES = [
  "morning-startup",
  "daily-brief",
  "operational-hours",
  "lunch-state",
  "evening-wind-down",
  "night-processing",
  "weekend-mode",
  "holiday-mode",
] as const;

export type RhythmPhase = (typeof RHYTHM_PHASES)[number];

export interface RhythmProfile {
  id: RhythmPhase;
  label: string;
  description: string;
  campusNote: string;
}

// ─── Mission System ──────────────────────────────────────────────────────────

export type MissionHealth = "on-track" | "at-risk" | "blocked" | "complete";

export interface Evidence {
  id: string;
  taskId: string;
  type: string;
  summary: string;
  createdAt: string;
  createdBy: TenantId;
}

export interface OpsTask {
  id: string;
  projectId: string;
  title: string;
  owner: TenantId;
  status: QueueColumn;
  evidence: Evidence[];
}

export interface OpsProject {
  id: string;
  objectiveId: string;
  title: string;
  owner: TenantId;
  tasks: OpsTask[];
}

export interface Objective {
  id: string;
  missionId: string;
  title: string;
  owner: TenantId;
  projects: OpsProject[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  owner: TenantId;
  health: MissionHealth;
  startedAt: string;
  objectives: Objective[];
}

// ─── Ownership ───────────────────────────────────────────────────────────────

export interface OwnedObject {
  objectId: string;
  type: string;
  title: string;
  owner: TenantId;
  contributors: TenantId[];
}

// ─── Request System ──────────────────────────────────────────────────────────

export const REQUEST_STATUSES = [
  "submitted",
  "accepted",
  "in-progress",
  "completed",
  "returned",
  "cancelled",
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export interface FactoryRequest {
  id: string;
  from: TenantId;
  to: TenantId;
  title: string;
  description: string;
  priority: "low" | "normal" | "high" | "critical";
  status: RequestStatus;
  submittedAt: string;
  updatedAt: string;
  completedAt?: string;
  history: RequestHistoryEntry[];
}

export interface RequestHistoryEntry {
  timestamp: string;
  action: string;
  actor: TenantId | "factory";
}

// ─── Review System ───────────────────────────────────────────────────────────

export const REVIEW_OUTCOMES = [
  "accepted",
  "rejected",
  "needs-revision",
  "archived",
] as const;

export type ReviewOutcome = (typeof REVIEW_OUTCOMES)[number];

export interface FactoryReview {
  id: string;
  requestId: string;
  reviewer: TenantId | "factory";
  outcome: ReviewOutcome;
  notes: string;
  reviewedAt: string;
}

// ─── Work Queues ─────────────────────────────────────────────────────────────

export const QUEUE_COLUMNS = [
  "inbox",
  "working",
  "waiting",
  "blocked",
  "review",
  "done",
  "archive",
] as const;

export type QueueColumn = (typeof QUEUE_COLUMNS)[number];

export interface QueueItem {
  id: string;
  tenantId: TenantId;
  column: QueueColumn;
  title: string;
  objectId?: string;
  updatedAt: string;
}

// ─── Mailroom ────────────────────────────────────────────────────────────────

export const MAIL_TYPES = [
  "build-request",
  "review-request",
  "release-package",
  "research-report",
  "daily-briefing",
  "metrics-report",
  "general",
] as const;

export type MailType = (typeof MAIL_TYPES)[number];

export interface MailItem {
  id: string;
  type: MailType;
  sender: TenantId | "factory";
  recipient: TenantId | "factory";
  subject: string;
  priority: "low" | "normal" | "high" | "critical";
  status: "in-transit" | "delivered" | "read" | "archived";
  createdAt: string;
  history: { timestamp: string; location: string; action: string }[];
}

// ─── Conveyor System ─────────────────────────────────────────────────────────

export const CONVEYOR_STAGES = [
  "observe",
  "capture",
  "reason",
  "remember",
  "invent",
  "build",
  "ship",
  "measure",
  "archive",
] as const;

export type ConveyorStage = (typeof CONVEYOR_STAGES)[number];

export interface ConveyorArtifact {
  id: string;
  title: string;
  type: string;
  currentStage: ConveyorStage;
  currentTenant: TenantId;
  stages: ConveyorStageRecord[];
  status: "moving" | "paused" | "inspecting" | "complete";
  startedAt: string;
}

export interface ConveyorStageRecord {
  stage: ConveyorStage;
  tenantId: TenantId;
  enteredAt: string;
  exitedAt?: string;
  artifactType: string;
}

// ─── Knowledge Flow ──────────────────────────────────────────────────────────

export const KNOWLEDGE_FLOW_STEPS = [
  { stage: "observe" as ConveyorStage, tenant: "observatory" as TenantId, label: "Observe" },
  { stage: "capture" as ConveyorStage, tenant: "sentinel" as TenantId, label: "Capture" },
  { stage: "reason" as ConveyorStage, tenant: "prime" as TenantId, label: "Reason" },
  { stage: "remember" as ConveyorStage, tenant: "citadel" as TenantId, label: "Remember" },
  { stage: "invent" as ConveyorStage, tenant: "forge" as TenantId, label: "Invent" },
  { stage: "build" as ConveyorStage, tenant: "bosslady" as TenantId, label: "Build" },
  { stage: "ship" as ConveyorStage, tenant: "flippy" as TenantId, label: "Ship" },
  { stage: "measure" as ConveyorStage, tenant: "fip" as TenantId, label: "Measure" },
  { stage: "archive" as ConveyorStage, tenant: "citadel" as TenantId, label: "Archive" },
];

// ─── Operational History ─────────────────────────────────────────────────────

export interface OpsHistoryEntry {
  id: string;
  timestamp: string;
  category: string;
  summary: string;
  source: TenantId | "factory";
  searchable: boolean;
  missionId?: string;
}

// ─── Factory Blueprints ──────────────────────────────────────────────────────

export interface TenantBlueprint {
  tenantId: TenantId;
  purpose: string;
  inputs: string[];
  outputs: string[];
  sharedServices: string[];
  ownedObjects: string[];
  dependencies: TenantId[];
  version: string;
  health: HealthState;
}

// ─── Logistics ───────────────────────────────────────────────────────────────

export interface LogisticsStatus {
  scheduledJobs: number;
  activeQueues: number;
  pendingRetries: number;
  backpressure: "none" | "low" | "medium" | "high";
  maintenanceWindow: string | null;
  auditEntriesToday: number;
}

// ─── Watchboard ──────────────────────────────────────────────────────────────

export interface WatchboardData {
  currentMissions: Mission[];
  blockedMissions: Mission[];
  waitingApprovals: FactoryRequest[];
  factoryHealth: HealthState;
  upcomingReleases: { id: string; title: string; eta: string }[];
  recentlyCompleted: { id: string; title: string; completedAt: string }[];
  factoryLoad: number;
}

// ─── Command Center ──────────────────────────────────────────────────────────

export interface CommandCenterData {
  factoryLoad: number;
  missionProgress: { missionId: string; title: string; percent: number; health: MissionHealth }[];
  departmentHealth: DepartmentStatus[];
  recentDecisions: OpsHistoryEntry[];
  criticalAlerts: { id: string; message: string; source: TenantId }[];
  upcomingMilestones: { id: string; title: string; date: string }[];
}

// ─── Campus Clock ────────────────────────────────────────────────────────────

export interface CampusClock {
  factoryTime: string;
  utc: string;
  rhythmPhase: RhythmPhase;
  shiftLabel: string;
  operationalDay: string;
}
