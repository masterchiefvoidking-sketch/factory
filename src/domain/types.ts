/**
 * FACTORY MASTER PROMPT 001 — Domain Layer
 *
 * This is building architecture, not software architecture.
 * Every type here describes a physical place, a person, or a system
 * that exists inside the Factory campus.
 */

// ─── Clearance ───────────────────────────────────────────────────────────────

export const CLEARANCE_LEVELS = [
  "visitor",
  "employee",
  "engineer",
  "architect",
  "founder",
  "system",
  "administrator",
] as const;

export type ClearanceLevel = (typeof CLEARANCE_LEVELS)[number];

export const CLEARANCE_RANK: Record<ClearanceLevel, number> = {
  visitor: 0,
  employee: 1,
  engineer: 2,
  architect: 3,
  founder: 4,
  system: 5,
  administrator: 6,
};

export function hasClearance(
  userLevel: ClearanceLevel,
  requiredLevel: ClearanceLevel
): boolean {
  return CLEARANCE_RANK[userLevel] >= CLEARANCE_RANK[requiredLevel];
}

// ─── Shifts ──────────────────────────────────────────────────────────────────

export const SHIFTS = ["morning", "night", "weekend", "holiday"] as const;
export type Shift = (typeof SHIFTS)[number];

export interface ShiftProfile {
  id: Shift;
  label: string;
  description: string;
  lighting: "warm" | "cool" | "dim" | "festive";
  ambientNote: string;
}

export const SHIFT_PROFILES: Record<Shift, ShiftProfile> = {
  morning: {
    id: "morning",
    label: "Morning Shift",
    description: "The Factory awakens. Systems boot. Coffee brews.",
    lighting: "warm",
    ambientNote: "Distant machinery, morning announcements",
  },
  night: {
    id: "night",
    label: "Night Shift",
    description: "Reduced staff. Emergency lighting. Quiet hum.",
    lighting: "cool",
    ambientNote: "Low machinery hum, occasional alerts",
  },
  weekend: {
    id: "weekend",
    label: "Weekend",
    description: "Maintenance crews. Prototype benches. Movie nights.",
    lighting: "dim",
    ambientNote: "Relaxed atmosphere, Theater may be active",
  },
  holiday: {
    id: "holiday",
    label: "Holiday",
    description: "Celebrations in the Courtyard. Reduced operations.",
    lighting: "festive",
    ambientNote: "Celebration sounds from the Courtyard",
  },
};

// ─── Power State ─────────────────────────────────────────────────────────────

export const POWER_STATES = ["online", "backup", "offline"] as const;
export type PowerState = (typeof POWER_STATES)[number];

// ─── Buildings ───────────────────────────────────────────────────────────────

export const BUILDING_IDS = [
  "engine-room",
  "maintenance",
  "courtyard",
  "theater",
  "hangar",
  "archive",
  "data-center",
  "forge",
  "workshop",
  "prime",
  "observatory",
  "tower",
] as const;

export type BuildingId = (typeof BUILDING_IDS)[number];

export interface Building {
  id: BuildingId;
  name: string;
  tagline: string;
  floor: number;
  wing: string;
  role: string;
  /** What this building does — its reason for existing */
  purpose: string;
  /** What this building never does */
  neverDoes: string;
  clearanceRequired: ClearanceLevel;
  /** Wall content — what the walls teach */
  wallContent: WallItem[];
  /** Quotes displayed in this building */
  quotes: string[];
  /** Color accent for this building's atmosphere */
  accent: string;
  /** Icon glyph (unicode) */
  glyph: string;
  /** Employees (applications) that work here */
  residents: string[];
  /** Whether this building is under maintenance */
  maintenanceMode?: boolean;
}

export interface WallItem {
  type: "blueprint" | "timeline" | "photo" | "dashboard" | "quote" | "principle";
  title: string;
  content: string;
}

// ─── Floors (Elevator Map) ───────────────────────────────────────────────────

export interface ElevatorStop {
  floor: number;
  label: string;
  buildingId: BuildingId;
  /** Display name on elevator panel */
  displayName: string;
}

// ─── Employees (Applications as People) ──────────────────────────────────────

export type EmployeeStatus =
  | "working"
  | "idle"
  | "maintenance"
  | "offline"
  | "thinking";

export interface Employee {
  id: string;
  name: string;
  role: string;
  buildingId: BuildingId;
  desk: string;
  status: EmployeeStatus;
  currentAssignment: string;
  dependencies: string[];
  personality: string;
  badgeNumber: string;
  workingHours: string;
}

// ─── Transit ─────────────────────────────────────────────────────────────────

export type TransitMode = "elevator" | "hallway" | "skybridge" | "train";

export interface TransitRoute {
  from: BuildingId;
  to: BuildingId;
  mode: TransitMode;
  durationMs: number;
  description: string;
}

// ─── Campus ──────────────────────────────────────────────────────────────────

export interface Campus {
  name: string;
  location: string;
  buildings: BuildingId[];
  currentShift: Shift;
  powerState: PowerState;
}

export interface FactoryState {
  campus: Campus;
  currentBuildingId: BuildingId;
  userClearance: ClearanceLevel;
  isTraveling: boolean;
  travelingFrom: BuildingId | null;
  travelingTo: BuildingId | null;
  powerState: PowerState;
}
