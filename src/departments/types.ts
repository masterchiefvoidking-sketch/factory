/**
 * PROJECT DEPARTMENTS — FACTORY MASTER PROMPT 004
 * The Organizational Structure
 *
 * Companies are organized by departments.
 * Applications are workers assigned to departments.
 */

import type { TenantId } from "@/nexus/types";
import type { BuildingId } from "@/domain/types";

// ─── Architect's Rule ────────────────────────────────────────────────────────

export const DEPARTMENT_ARCHITECT_RULE =
  "Every capability must answer: Which department owns the mission? Which application performs the work? Which Factory service supports it?";

// ─── Departments ─────────────────────────────────────────────────────────────

export const DEPARTMENT_IDS = [
  "intelligence",
  "knowledge",
  "reasoning",
  "memory",
  "innovation",
  "engineering",
  "release",
  "quality",
] as const;

export type DepartmentId = (typeof DEPARTMENT_IDS)[number];

export interface Department {
  id: DepartmentId;
  name: string;
  purpose: string;
  /** Workers (frozen applications) assigned to this department */
  workers: TenantId[];
  responsibilities: string[];
  produces: string[];
  /** Primary building on campus */
  buildingId: BuildingId;
  /** Wing / entrance description */
  entrance: string;
  accent: string;
  glyph: string;
  /** Position on department floor map */
  mapPosition: { x: number; y: number };
  /** Connected departments via hallways */
  adjacentDepartments: DepartmentId[];
}

// ─── Executive Floor ─────────────────────────────────────────────────────────

export interface ExecutiveFloor {
  name: string;
  occupants: { role: string; title: string; authority: string }[];
  purpose: string;
  neverDoes: string;
  buildingId: BuildingId;
  roomId: string;
}

// ─── Factory Services (not a department) ─────────────────────────────────────

export const FACTORY_SERVICE_NAMES = [
  "Identity",
  "Events",
  "Search",
  "Objects",
  "Notifications",
  "Automation",
  "Permissions",
  "Storage",
  "Scheduling",
  "Logging",
] as const;

// ─── The Commons ─────────────────────────────────────────────────────────────

export const COMMONS_SPACE_IDS = [
  "cafeteria",
  "auditorium",
  "training-center",
  "design-gallery",
  "innovation-wall",
  "recognition-hall",
] as const;

export type CommonsSpaceId = (typeof COMMONS_SPACE_IDS)[number];

export interface CommonsSpace {
  id: CommonsSpaceId;
  name: string;
  description: string;
  glyph: string;
  /** Sample content shown in the space */
  highlights: string[];
}

// ─── Organization Chart ──────────────────────────────────────────────────────

export type OrgNodeType =
  | "founder"
  | "department"
  | "application"
  | "project"
  | "object";

export interface OrgChartNode {
  id: string;
  type: OrgNodeType;
  label: string;
  parentId: string | null;
  meta?: string;
  accent?: string;
  children?: OrgChartNode[];
}

// ─── Department Dashboard ────────────────────────────────────────────────────

export interface DepartmentDashboard {
  departmentId: DepartmentId;
  mission: string;
  health: "healthy" | "degraded" | "emergency";
  load: number;
  currentWork: string[];
  blockedWork: string[];
  recentSuccesses: string[];
  upcomingObjectives: string[];
}

// ─── Cross-Department Projects ───────────────────────────────────────────────

export interface CrossDepartmentContribution {
  departmentId: DepartmentId;
  worker: TenantId;
  role: string;
}

export interface CrossDepartmentProject {
  id: string;
  title: string;
  description: string;
  status: "planning" | "active" | "review" | "complete";
  owner: "factory";
  participants: CrossDepartmentContribution[];
}

// ─── Floor Map ───────────────────────────────────────────────────────────────

export interface FloorMapHallway {
  from: DepartmentId | "executive" | "commons" | "services";
  to: DepartmentId | "executive" | "commons" | "services";
  label: string;
}

export interface DepartmentFloorMap {
  departments: Department[];
  hallways: FloorMapHallway[];
  executive: { position: { x: number; y: number } };
  commons: { position: { x: number; y: number } };
  services: { position: { x: number; y: number }; label: string };
}

// ─── Visitor Experience ────────────────────────────────────────────────────────

export interface VisitorGuide {
  whoWorksHere: { department: string; workers: string[]; purpose: string }[];
  howWorkFlows: string[];
  whereToStart: string;
}
