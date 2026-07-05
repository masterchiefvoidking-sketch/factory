import type {
  Building,
  BuildingId,
  Employee,
  Location,
  TransitMode,
  TransitRoute,
} from "./types";
import { SURFACE_BUILDINGS } from "./types";

export { SURFACE_BUILDINGS };

/**
 * TITAN CAMPUS — Building Registry V1.0
 *
 * Nine buildings revolve around The Tower.
 * Every program is a tenant. The Factory itself is the product.
 */

export const BUILDINGS: Record<BuildingId, Building> = {
  tower: {
    id: "tower",
    name: "The Tower",
    tagline: "Headquarters. Mission Control. This is where every day begins.",
    role: "Executive operations — Morgan's headquarters",
    purpose:
      "Not Prime. Prime rents office space here. The Tower belongs to you. Huge atrium. Three-story digital globe. Live world. Weather. Markets. Factory health. Projects. Today.",
    neverDoes: "Build. The Tower never builds. It commands.",
    material: "Glass, steel, marble atrium",
    instinct: "purpose",
    soundscape: "Calm HVAC and distant activity",
    clearanceRequired: "founder",
    accent: "#c9a227",
    glyph: "🏛",
    position: { x: 50, y: 22 },
    towerRooms: [
      {
        id: "atrium",
        floor: 1,
        name: "The Atrium",
        purpose:
          "The heartbeat. Grand Central Terminal. Everybody passes through. Departure board shows where every employee is right now.",
        instinct: "belonging",
      },
      {
        id: "mission-control",
        floor: 2,
        name: "Mission Control",
        purpose:
          "NASA, not dashboards. Large wall. Factory status. Current missions. Blockers. Objectives. Launch countdowns. You stand. You don't sit.",
        instinct: "mastery",
      },
      {
        id: "war-room",
        floor: 3,
        name: "War Room",
        purpose:
          "Whiteboards. Glass. Blueprint tables. Strategy. No coding. Only thinking.",
        instinct: "curiosity",
      },
    ],
    wallContent: [
      {
        type: "dashboard",
        title: "Digital Globe",
        content: "Live world · Weather · Markets · Factory health · Projects · Today",
      },
      {
        type: "principle",
        title: "Foundation Stone",
        content: "Every room has one purpose. Every purpose has one room.",
      },
    ],
    quotes: [
      "Everything revolves around The Tower.",
      "This is where every day begins.",
    ],
  },

  observatory: {
    id: "observatory",
    name: "The Observatory",
    tagline: "A dome. 360° displays. It never sleeps.",
    role: "External awareness — everything enters here first",
    purpose:
      "Not an app. A dome. Circular. 360° displays. World. Space. Markets. News. Weather. Satellites. Construction. AI.",
    neverDoes: "Sleep. It never sleeps.",
    material: "Glass dome, curved displays",
    instinct: "curiosity",
    soundscape: "Soft radio chatter",
    clearanceRequired: "employee",
    accent: "#9b59b6",
    glyph: "🔭",
    position: { x: 50, y: 5 },
    wallContent: [
      {
        type: "dashboard",
        title: "360° Live Feeds",
        content: "World · Space · Markets · News · Weather · Satellites · Construction · AI",
      },
    ],
    quotes: ["Meet me in the Observatory.", "Every screen is alive."],
  },

  toolbelt: {
    id: "toolbelt",
    name: "Toolbelt",
    tagline: "The greatest library ever built.",
    role: "Media, learning & broadcast",
    purpose:
      "Not office. Library. Wood. Glass. Comfortable chairs. Huge displays. Movie theater. Listening rooms. Reading rooms. Broadcast studio. Very quiet.",
    neverDoes: "Rush. Very quiet.",
    material: "Wood, glass, leather chairs",
    instinct: "curiosity",
    soundscape: "Library silence",
    clearanceRequired: "employee",
    accent: "#3498db",
    glyph: "📚",
    position: { x: 12, y: 38 },
    wallContent: [
      {
        type: "dashboard",
        title: "Library Status",
        content: "2,847 titles · 3 listening rooms available · Broadcast studio idle",
      },
    ],
    quotes: ["The calmest building.", "Knowledge is experienced, not consumed."],
  },

  citadel: {
    id: "citadel",
    name: "Citadel",
    tagline: "Stone. Heavy. Permanent.",
    role: "Archives, vaults, history",
    purpose:
      "Stone. Heavy. Archives. Vaults. History. Every hallway contains history. Every decision ever made. Every document. Feels permanent.",
    neverDoes: "Forget. Nothing is lost.",
    material: "Stone, bronze, vault doors",
    instinct: "mastery",
    soundscape: "Echoing footsteps on stone",
    clearanceRequired: "employee",
    accent: "#cd7f32",
    glyph: "🏰",
    position: { x: 88, y: 38 },
    wallContent: [
      {
        type: "timeline",
        title: "Every Decision Ever Made",
        content: "Build the building · Hire an architect · Spatial memory over menus",
      },
    ],
    quotes: ["Every hallway contains history.", "Feels permanent."],
  },

  forge: {
    id: "forge",
    name: "The Forge",
    tagline: "Controlled chaos.",
    role: "Research, validation, experiments",
    purpose:
      "Industrial. Concrete. Steel. Prototype benches. Ideas on walls. 3D printers. Sketches. Business plans. Controlled chaos.",
    neverDoes: "Ship unproven ideas.",
    material: "Concrete, steel, exposed ductwork",
    instinct: "exploration",
    soundscape: "Industrial ambience",
    clearanceRequired: "architect",
    accent: "#e74c3c",
    glyph: "🔥",
    position: { x: 18, y: 58 },
    wallContent: [
      {
        type: "dashboard",
        title: "Active Experiments",
        content: "3 in validation · 7 signals this week · 2 prototypes on benches",
      },
    ],
    quotes: ["Where ideas become companies.", "Nothing leaves until proven."],
  },

  commons: {
    id: "commons",
    name: "The Commons",
    tagline: "Where the campus gathers.",
    role: "Central hub — connected underground and digitally",
    purpose:
      "The social center. Announcements. Factory timeline. Achievements. Celebrations. Where buildings connect. Company culture lives here.",
    neverDoes: "Become social media.",
    material: "Open plaza, living walls, skylights",
    instinct: "belonging",
    soundscape: "Murmur of conversation, fountain",
    clearanceRequired: "visitor",
    accent: "#27ae60",
    glyph: "🌿",
    position: { x: 50, y: 52 },
    wallContent: [
      {
        type: "timeline",
        title: "Factory Timeline",
        content: "Titan Campus conceived · Foundation poured · Morgan arrived",
      },
    ],
    quotes: ["Connected underground. Connected digitally. Connected philosophically."],
  },

  prime: {
    id: "prime",
    name: "Prime",
    tagline: "Rents office space in The Tower. Lives here.",
    role: "Strategic intelligence & orchestration",
    purpose:
      "Prime thinks here. Strategic intelligence. Cross-building coordination. White badge. The connective tissue between departments.",
    neverDoes: "Replace departments. Prime connects.",
    material: "Clean lines, white surfaces, subtle glow",
    instinct: "purpose",
    soundscape: "Quiet processing hum",
    clearanceRequired: "architect",
    accent: "#ecf0f1",
    glyph: "🧠",
    position: { x: 82, y: 58 },
    wallContent: [
      {
        type: "dashboard",
        title: "Prime Status",
        content: "Working · 4 active threads · Cross-building sync nominal",
      },
    ],
    quotes: ["Prime rents office space in The Tower.", "Intelligence is the space between features."],
  },

  bosslady: {
    id: "bosslady",
    name: "BossLady",
    tagline: "Things constantly being built.",
    role: "Engineering workshop & robotics lab",
    purpose:
      "Workshop. Robotics lab. Terminals. Standing desks. Mechanical keyboards. Screens everywhere. Things constantly being built.",
    neverDoes: "Sit still. BossLady is always compiling.",
    material: "Exposed circuits, standing desks, terminal arrays",
    instinct: "mastery",
    soundscape: "Mechanical keyboard sounds, compile chimes",
    clearanceRequired: "engineer",
    accent: "#e67e22",
    glyph: "🔨",
    position: { x: 22, y: 78 },
    wallContent: [
      {
        type: "dashboard",
        title: "Build Floor",
        content: "Compiling · 2 builds active · 47 tests passing · Terminal farm online",
      },
    ],
    quotes: ["BossLady's been in the Workshop all day.", "Mechanical keyboards."],
  },

  fip: {
    id: "fip",
    name: "FIP",
    tagline: "Quiet. Scientific.",
    role: "Metrics laboratory",
    purpose:
      "Laboratory. Graphs. Testing. Regression. Performance. Quiet. Scientific. Everything measurable lives here.",
    neverDoes: "Guess. If it can be measured, it is.",
    material: "Lab benches, graph walls, precision instruments",
    instinct: "mastery",
    soundscape: "Laboratory silence, occasional beep",
    clearanceRequired: "engineer",
    accent: "#2ecc71",
    glyph: "📊",
    position: { x: 78, y: 78 },
    wallContent: [
      {
        type: "dashboard",
        title: "Benchmark Suite",
        content: "All nominal · 0 regressions · 99.97% uptime · Sweep in progress",
      },
    ],
    quotes: ["Everything measurable.", "Quiet. Scientific."],
  },

  flippy: {
    id: "flippy",
    name: "Flippy",
    tagline: "Every release leaves here.",
    role: "Shipping dock & distribution",
    purpose:
      "Shipping dock. Loading bays. Containers. Packaging machines. Release board. Every release leaves here.",
    neverDoes: "Build. Flippy ships what others forge.",
    material: "Steel dock, loading bays, conveyor systems",
    instinct: "purpose",
    soundscape: "Conveyor belts, packaging machines",
    clearanceRequired: "engineer",
    accent: "#f1c40f",
    glyph: "📦",
    position: { x: 50, y: 92 },
    wallContent: [
      {
        type: "dashboard",
        title: "Release Board",
        content: "2 staged · 14 artifacts ready · 0 failed · Next launch: T-4:22:00",
      },
    ],
    quotes: ["Every release leaves here.", "Packaging machines never sleep."],
  },

  "engine-room": {
    id: "engine-room",
    name: "The Engine Room",
    tagline: "Nobody sees this. The Factory runs underneath everyone.",
    role: "Shared infrastructure",
    purpose:
      "Servers. Identity. Events. Objects. Authentication. Storage. Networking. Pipes. Power. The Factory literally runs underneath everyone.",
    neverDoes: "Display user-facing features.",
    material: "Exposed pipes, server racks, cable trays",
    instinct: "mastery",
    soundscape: "Deep machinery hum, cooling fans",
    clearanceRequired: "system",
    accent: "#4a5568",
    glyph: "⚙",
    position: { x: 50, y: 50 },
    underground: true,
    wallContent: [
      {
        type: "blueprint",
        title: "Core Systems",
        content: "Identity → Auth → Events → Objects → Storage → Networking → Power",
      },
    ],
    quotes: ["Nobody sees this.", "If it breaks, everything stops."],
  },

  garden: {
    id: "garden",
    name: "The Garden",
    tagline: "Somewhere that isn't trying to accomplish anything.",
    role: "Reflection & difficult decisions",
    purpose:
      "No screens. Trees. Water. Benches. Sky. Where difficult decisions are made. Where ideas mature. Where weekly reviews happen.",
    neverDoes: "Accomplish anything. That is the point.",
    material: "Trees, water features, stone benches, open sky",
    instinct: "belonging",
    soundscape: "Wind through trees, water, birds",
    clearanceRequired: "visitor",
    accent: "#58d68d",
    glyph: "🌳",
    position: { x: 92, y: 85 },
    isPlace: true,
    wallContent: [],
    quotes: [
      "Humans don't create their best ideas under fluorescent lights all the time.",
      "No screens. Just sky.",
    ],
  },
};

/** Uniform system — badge colors */
export const EMPLOYEES: Employee[] = [
  {
    id: "prime",
    name: "Prime",
    role: "Strategic Intelligence",
    buildingId: "prime",
    desk: "Office 55, East Wing",
    status: "working",
    statusLabel: "Working",
    badgeColor: "#ecf0f1",
    badgeNumber: "WHT-001",
    currentAssignment: "Cross-building orchestration",
    personality: "Quiet, deep, connects dots others miss",
  },
  {
    id: "bosslady",
    name: "BossLady",
    role: "Chief Engineer",
    buildingId: "bosslady",
    desk: "Bench 1, North Wall",
    status: "compiling",
    statusLabel: "Compiling",
    badgeColor: "#e67e22",
    badgeNumber: "ORG-001",
    currentAssignment: "Project Titan foundation build",
    personality: "Precise, relentless, allergic to broken builds",
  },
  {
    id: "toolbelt",
    name: "Toolbelt",
    role: "Media Curator",
    buildingId: "toolbelt",
    desk: "Reading Room 3",
    status: "receiving",
    statusLabel: "Receiving feeds",
    badgeColor: "#3498db",
    badgeNumber: "BLU-001",
    currentAssignment: "Evening documentary curation",
    personality: "Calm, encyclopedic, loves a good documentary",
  },
  {
    id: "observatory",
    name: "Observatory",
    role: "World Monitor",
    buildingId: "observatory",
    desk: "Dome Center",
    status: "monitoring",
    statusLabel: "Monitoring",
    badgeColor: "#9b59b6",
    badgeNumber: "PRP-001",
    currentAssignment: "12 live feeds active",
    personality: "Watchful, never sleeps, sees everything entering",
  },
  {
    id: "flippy",
    name: "Flippy",
    role: "Release Captain",
    buildingId: "flippy",
    desk: "Loading Bay 2",
    status: "packaging",
    statusLabel: "Packaging",
    badgeColor: "#f1c40f",
    badgeNumber: "YLW-001",
    currentAssignment: "Staging v0.1.0 artifacts",
    personality: "Methodical, countdown-obsessed",
  },
  {
    id: "forge",
    name: "Forge",
    role: "Research Lead",
    buildingId: "forge",
    desk: "Prototype Bench 4",
    status: "researching",
    statusLabel: "Researching",
    badgeColor: "#e74c3c",
    badgeNumber: "RED-001",
    currentAssignment: "3 experiments in validation",
    personality: "Chaotic creative, validates everything twice",
  },
  {
    id: "citadel",
    name: "Citadel",
    role: "Chief Archivist",
    buildingId: "citadel",
    desk: "Vault A, Reading Room",
    status: "indexing",
    statusLabel: "Indexing",
    badgeColor: "#cd7f32",
    badgeNumber: "BRZ-001",
    currentAssignment: "Cataloging Master Architecture V1.0",
    personality: "Meticulous, remembers everything",
  },
  {
    id: "fip",
    name: "FIP",
    role: "Metrics Analyst",
    buildingId: "fip",
    desk: "Lab Station 7",
    status: "benchmarking",
    statusLabel: "Benchmarking",
    badgeColor: "#2ecc71",
    badgeNumber: "GRN-001",
    currentAssignment: "Campus-wide benchmark sweep",
    personality: "Data-driven, suspicious of anecdotes",
  },
];

export const TRANSIT_ROUTES: TransitRoute[] = [
  { from: "tower", to: "observatory", mode: "skybridge", durationMs: 2500, description: "Glass skybridge north to the dome" },
  { from: "tower", to: "commons", mode: "elevator", durationMs: 1500, description: "Express elevator to The Commons" },
  { from: "commons", to: "toolbelt", mode: "glass-tunnel", durationMs: 2000, description: "West glass tunnel to the library" },
  { from: "commons", to: "citadel", mode: "glass-tunnel", durationMs: 2000, description: "East glass tunnel to the vaults" },
  { from: "forge", to: "bosslady", mode: "moving-walkway", durationMs: 1800, description: "Moving walkway through the workshop corridor" },
  { from: "prime", to: "fip", mode: "hallway", durationMs: 1200, description: "Laboratory corridor" },
  { from: "bosslady", to: "flippy", mode: "autonomous-cart", durationMs: 2200, description: "Autonomous cart to the shipping dock" },
  { from: "commons", to: "engine-room", mode: "elevator", durationMs: 3000, description: "Service elevator descending underground" },
  { from: "flippy", to: "garden", mode: "hallway", durationMs: 1500, description: "Garden path past the loading bays" },
  { from: "tower", to: "prime", mode: "skybridge", durationMs: 2000, description: "East skybridge" },
];

const TRANSIT_MODE_LABELS: Record<TransitMode, string> = {
  elevator: "Elevator",
  hallway: "Hallway",
  skybridge: "Skybridge",
  "glass-tunnel": "Glass Tunnel",
  "moving-walkway": "Moving Walkway",
  "autonomous-cart": "Autonomous Cart",
  "underground-rail": "Underground Rail",
};

export function getTransitMode(from: BuildingId, to: BuildingId): TransitMode {
  const direct = TRANSIT_ROUTES.find(
    (r) => (r.from === from && r.to === to) || (r.from === to && r.to === from)
  );
  if (direct) return direct.mode;

  const fromB = BUILDINGS[from];
  const toB = BUILDINGS[to];

  if (fromB.underground || toB.underground) return "elevator";
  if (fromB.isPlace || toB.isPlace) return "hallway";

  const dist = campusDistance(from, to);
  if (dist < 25) return "hallway";
  if (dist < 40) return "moving-walkway";
  if (dist < 55) return "glass-tunnel";
  return "skybridge";
}

export function getTransitDescription(mode: TransitMode): string {
  return TRANSIT_MODE_LABELS[mode];
}

export function campusDistance(from: BuildingId, to: BuildingId): number {
  const a = BUILDINGS[from].position;
  const b = BUILDINGS[to].position;
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function getTravelDuration(from: BuildingId, to: BuildingId): number {
  const direct = TRANSIT_ROUTES.find(
    (r) => (r.from === from && r.to === to) || (r.from === to && r.to === from)
  );
  if (direct) return direct.durationMs;

  const dist = campusDistance(from, to);
  const mode = getTransitMode(from, to);
  const base = dist * 40;
  const modeMultiplier: Record<TransitMode, number> = {
    hallway: 1,
    elevator: 1.2,
    skybridge: 1.1,
    "glass-tunnel": 1.3,
    "moving-walkway": 0.9,
    "autonomous-cart": 1.4,
    "underground-rail": 1.5,
  };
  return Math.max(1200, Math.round(base * modeMultiplier[mode]));
}

export function getBuilding(id: BuildingId): Building {
  return BUILDINGS[id];
}

export function getEmployeesInBuilding(buildingId: BuildingId): Employee[] {
  return EMPLOYEES.filter((e) => e.buildingId === buildingId);
}

export function locationKey(loc: Location): string {
  return loc.towerRoom ? `${loc.buildingId}:${loc.towerRoom}` : loc.buildingId;
}

export function isSameLocation(a: Location, b: Location): boolean {
  return locationKey(a) === locationKey(b);
}

export const DEFAULT_LOCATION: Location = {
  buildingId: "tower",
  towerRoom: "atrium",
};
