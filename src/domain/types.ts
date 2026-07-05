/**
 * THE FACTORY — MASTER ARCHITECTURE V1.0
 * Codename: TITAN CAMPUS
 *
 * Building architecture, not software architecture.
 * Every room has one purpose. Every purpose has one room.
 */

// ─── Foundation Stone ────────────────────────────────────────────────────────

export const FOUNDATION_PRINCIPLE =
  "Every room has one purpose. Every purpose has one room.";

// ─── Human Instincts ─────────────────────────────────────────────────────────

export const HUMAN_INSTINCTS = [
  "exploration",
  "mastery",
  "belonging",
  "curiosity",
  "purpose",
] as const;

export type HumanInstinct = (typeof HUMAN_INSTINCTS)[number];

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

// ─── Time & Lighting ─────────────────────────────────────────────────────────

export const TIME_PERIODS = ["morning", "lunch", "night", "maintenance"] as const;
export type TimePeriod = (typeof TIME_PERIODS)[number];

export const SHIFTS = ["morning", "night", "weekend", "holiday"] as const;
export type Shift = (typeof SHIFTS)[number];

export interface TimeProfile {
  id: TimePeriod;
  label: string;
  lighting: "warm-sunlight" | "bright" | "blue-night" | "red-emergency";
  description: string;
}

export const TIME_PROFILES: Record<TimePeriod, TimeProfile> = {
  morning: {
    id: "morning",
    label: "Morning",
    lighting: "warm-sunlight",
    description: "Warm sunlight fills the campus.",
  },
  lunch: {
    id: "lunch",
    label: "Lunch",
    lighting: "bright",
    description: "Bright. The Commons is alive.",
  },
  night: {
    id: "night",
    label: "Night",
    lighting: "blue-night",
    description: "Blue ambient. The Observatory never sleeps.",
  },
  maintenance: {
    id: "maintenance",
    label: "Maintenance",
    lighting: "red-emergency",
    description: "Red emergency lighting. Repair crews active.",
  },
};

export interface ShiftProfile {
  id: Shift;
  label: string;
  description: string;
  ambientNote: string;
}

export const SHIFT_PROFILES: Record<Shift, ShiftProfile> = {
  morning: {
    id: "morning",
    label: "Morning Shift",
    description: "The Factory awakens. Every day begins at The Tower.",
    ambientNote: "Calm HVAC and distant activity",
  },
  night: {
    id: "night",
    label: "Night Shift",
    description: "Reduced staff. The Observatory watches.",
    ambientNote: "Low hum, soft radio chatter from above",
  },
  weekend: {
    id: "weekend",
    label: "Weekend",
    description: "The Garden fills. Toolbelt hosts movie nights.",
    ambientNote: "Library silence, occasional celebration",
  },
  holiday: {
    id: "holiday",
    label: "Holiday",
    description: "The Commons celebrates. Reduced operations.",
    ambientNote: "Celebration from the Courtyard",
  },
};

// ─── Power ───────────────────────────────────────────────────────────────────

export const POWER_STATES = ["online", "backup", "offline"] as const;
export type PowerState = (typeof POWER_STATES)[number];

// ─── Campus Buildings ────────────────────────────────────────────────────────

/** Nine surface buildings + underground + garden */
export const BUILDING_IDS = [
  "tower",
  "observatory",
  "toolbelt",
  "citadel",
  "forge",
  "commons",
  "prime",
  "bosslady",
  "fip",
  "flippy",
  "engine-room",
  "garden",
] as const;

export type BuildingId = (typeof BUILDING_IDS)[number];

/** Surface buildings visible on the campus map */
export const SURFACE_BUILDINGS: BuildingId[] = [
  "observatory",
  "tower",
  "toolbelt",
  "citadel",
  "forge",
  "commons",
  "prime",
  "bosslady",
  "fip",
  "flippy",
];

export type TowerRoomId = "atrium" | "mission-control" | "war-room";

export interface TowerRoom {
  id: TowerRoomId;
  floor: number;
  name: string;
  purpose: string;
  instinct: HumanInstinct;
}

export interface CampusPosition {
  x: number;
  y: number;
}

export interface Building {
  id: BuildingId;
  name: string;
  tagline: string;
  role: string;
  purpose: string;
  neverDoes: string;
  material: string;
  instinct: HumanInstinct;
  soundscape: string;
  clearanceRequired: ClearanceLevel;
  accent: string;
  glyph: string;
  position: CampusPosition;
  underground?: boolean;
  isPlace?: boolean;
  wallContent: WallItem[];
  quotes: string[];
  towerRooms?: TowerRoom[];
}

export interface WallItem {
  type: "blueprint" | "timeline" | "photo" | "dashboard" | "quote" | "principle";
  title: string;
  content: string;
}

// ─── Location ────────────────────────────────────────────────────────────────

export interface Location {
  buildingId: BuildingId;
  towerRoom?: TowerRoomId;
}

// ─── Employees (Applications as Tenants) ─────────────────────────────────────

export type EmployeeStatus =
  | "working"
  | "idle"
  | "maintenance"
  | "offline"
  | "thinking"
  | "compiling"
  | "monitoring"
  | "researching"
  | "indexing"
  | "benchmarking"
  | "packaging"
  | "receiving";

export interface Employee {
  id: string;
  name: string;
  role: string;
  buildingId: BuildingId;
  desk: string;
  status: EmployeeStatus;
  statusLabel: string;
  badgeColor: string;
  badgeNumber: string;
  currentAssignment: string;
  personality: string;
}

// ─── Transit ─────────────────────────────────────────────────────────────────

export type TransitMode =
  | "elevator"
  | "hallway"
  | "skybridge"
  | "glass-tunnel"
  | "moving-walkway"
  | "autonomous-cart"
  | "underground-rail";

export interface TransitRoute {
  from: BuildingId;
  to: BuildingId;
  mode: TransitMode;
  durationMs: number;
  description: string;
}

// ─── Factory State ───────────────────────────────────────────────────────────

export interface Campus {
  name: string;
  codename: string;
  location: string;
  buildings: BuildingId[];
}

export interface FactoryState {
  campus: Campus;
  location: Location;
  userClearance: ClearanceLevel;
  isTraveling: boolean;
  travelingFrom: Location | null;
  travelingTo: Location | null;
  transitMode: TransitMode | null;
  powerState: PowerState;
  currentShift: Shift;
  timePeriod: TimePeriod;
}
