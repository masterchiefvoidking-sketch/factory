import type { Building, BuildingId, ElevatorStop, Employee, TransitRoute } from "./types";

/**
 * The Factory Building Registry
 *
 * Every building is a department. Every department has a home.
 * This registry is the architectural spine — it never changes shape,
 * only grows. Today 12 buildings. Someday 120.
 */

export const BUILDINGS: Record<BuildingId, Building> = {
  "engine-room": {
    id: "engine-room",
    name: "The Engine Room",
    tagline: "The machinery beneath everything",
    floor: -10,
    wing: "Sub-Basement",
    role: "Shared infrastructure",
    purpose:
      "Identity. Objects. Events. Storage. Networking. Authentication. Permissions. Search. The literal machinery of the Factory.",
    neverDoes: "Display user-facing features. Nobody comes here often.",
    clearanceRequired: "system",
    accent: "#4a5568",
    glyph: "⚙",
    residents: ["Identity Service", "Event Bus", "Object Store", "Search Index"],
    wallContent: [
      {
        type: "blueprint",
        title: "Factory Core Systems",
        content: "Identity → Auth → Permissions → Events → Storage → Search",
      },
      {
        type: "principle",
        title: "Engine Room Principle",
        content: "If it works, you never think about it. If it breaks, everything stops.",
      },
    ],
    quotes: [
      "The deepest level. Nobody goes there often.",
      "This is where the shared systems live.",
    ],
  },

  maintenance: {
    id: "maintenance",
    name: "Maintenance Wing",
    tagline: "Nothing stays broken here",
    floor: -5,
    wing: "Basement",
    role: "Repair & recovery",
    purpose:
      "Every application eventually needs repair. Robots repair Toolbelt. BossLady compiles. Prime thinks. FIP recalibrates.",
    neverDoes: "Feel dead. The Factory never feels dead.",
    clearanceRequired: "engineer",
    accent: "#e67e22",
    glyph: "🔧",
    residents: ["Repair Bots", "Diagnostic Suite", "Patch Pipeline"],
    maintenanceMode: false,
    wallContent: [
      {
        type: "dashboard",
        title: "Active Repairs",
        content: "Toolbelt: recalibrating media codecs · Prime: model update · FIP: benchmark sweep",
      },
      {
        type: "timeline",
        title: "Last 24 Hours",
        content: "3 repairs completed · 1 in progress · 0 critical failures",
      },
    ],
    quotes: [
      "Instead of 'Error.' you walk into Maintenance.",
      "The Factory never feels dead.",
    ],
  },

  courtyard: {
    id: "courtyard",
    name: "The Courtyard",
    tagline: "Where the Factory breathes",
    floor: 0,
    wing: "Ground Level — Central",
    role: "Social center & arrival",
    purpose:
      "Announcements. Factory timeline. Achievements. Birthdays of projects. Major launches. Celebrations. Company culture.",
    neverDoes: "Become social media. This is company culture.",
    clearanceRequired: "visitor",
    accent: "#27ae60",
    glyph: "🌿",
    residents: ["Announcement Board", "Timeline Display", "Achievement Vault"],
    wallContent: [
      {
        type: "timeline",
        title: "Factory Timeline",
        content: "Project Titan conceived · First building erected · Morgan arrived at Headquarters",
      },
      {
        type: "photo",
        title: "Recent Achievements",
        content: "Foundation poured · Elevator installed · First shift change observed",
      },
      {
        type: "quote",
        title: "Factory Principle #1",
        content: "Before Prime existed... there was a building.",
      },
    ],
    quotes: [
      "You don't launch software. You arrive at Headquarters.",
      "Not social media. Company culture.",
    ],
  },

  theater: {
    id: "theater",
    name: "The Theater",
    tagline: "The calmest building",
    floor: 0,
    wing: "Ground Level — East Wing",
    role: "Media, learning & broadcast",
    purpose:
      "Toolbelt lives here. Media. Learning. Broadcasts. Movie nights. World television. Documentaries. Library. Knowledge.",
    neverDoes: "Rush. The calmest building in the Factory.",
    clearanceRequired: "employee",
    accent: "#9b59b6",
    glyph: "🎭",
    residents: ["Toolbelt", "Media Library", "Broadcast Suite", "Documentary Archive"],
    wallContent: [
      {
        type: "dashboard",
        title: "Now Playing",
        content: "Factory Documentary: The First Pour · World Feed: Live · Library: 2,847 titles",
      },
      {
        type: "quote",
        title: "Theater Principle",
        content: "Knowledge is not consumed. It is experienced.",
      },
    ],
    quotes: [
      "The calmest building.",
      "Movie nights. World television. Documentaries.",
    ],
  },

  hangar: {
    id: "hangar",
    name: "The Hangar",
    tagline: "Where things leave the Factory",
    floor: 10,
    wing: "Lower Levels",
    role: "Packaging & distribution",
    purpose:
      "Flippy. Packaging. Releases. Downloads. Artifacts. Installers. Containers. Distribution.",
    neverDoes: "Build. The Hangar ships what others forge.",
    clearanceRequired: "engineer",
    accent: "#3498db",
    glyph: "🚀",
    residents: ["Flippy", "Release Pipeline", "Artifact Store", "Container Yard"],
    wallContent: [
      {
        type: "dashboard",
        title: "Launch Pad Status",
        content: "2 releases staged · 14 artifacts ready · 0 failed deployments",
      },
      {
        type: "timeline",
        title: "Recent Launches",
        content: "v0.1.0 Foundation · Elevator v1 · Campus Shell Alpha",
      },
    ],
    quotes: [
      "Nothing leaves until it's ready.",
      "Packaging. Releases. Distribution.",
    ],
  },

  archive: {
    id: "archive",
    name: "The Archive",
    tagline: "Nothing is lost",
    floor: 15,
    wing: "Lower Levels",
    role: "Memory & records",
    purpose:
      "Citadel lives here. Every document. Every decision. Every report. Every project. Every lesson.",
    neverDoes: "Forget. Nothing is lost.",
    clearanceRequired: "employee",
    accent: "#8e44ad",
    glyph: "📚",
    residents: ["Citadel", "Decision Log", "Project Registry", "Lesson Library"],
    wallContent: [
      {
        type: "timeline",
        title: "Decision History",
        content: "Build the building, not the apps · Hire an architect first · Spatial memory over menus",
      },
      {
        type: "principle",
        title: "Archive Principle",
        content: "Every decision has a reason. Every reason has a record.",
      },
    ],
    quotes: [
      "Every document. Every decision. Every lesson.",
      "Nothing is lost.",
    ],
  },

  "data-center": {
    id: "data-center",
    name: "The Data Center",
    tagline: "Everything measurable",
    floor: 20,
    wing: "Mid Levels",
    role: "Metrics & health",
    purpose:
      "FIP lives here. Metrics. Benchmarks. Regression. Health. History. Everything measurable.",
    neverDoes: "Guess. If it can be measured, it is measured.",
    clearanceRequired: "engineer",
    accent: "#1abc9c",
    glyph: "📊",
    residents: ["FIP", "Metrics Engine", "Benchmark Suite", "Health Monitor"],
    wallContent: [
      {
        type: "dashboard",
        title: "System Health",
        content: "All systems nominal · 99.97% uptime · 0 regressions detected",
      },
      {
        type: "blueprint",
        title: "Measurement Stack",
        content: "Collect → Aggregate → Benchmark → Alert → History",
      },
    ],
    quotes: [
      "Everything measurable.",
      "FIP is recalibrating.",
    ],
  },

  forge: {
    id: "forge",
    name: "The Forge",
    tagline: "Where ideas become companies",
    floor: 25,
    wing: "Mid Levels",
    role: "Research & validation",
    purpose:
      "Signals. Research. Business models. Validation. Experiments. Roadmaps. Nothing leaves until proven.",
    neverDoes: "Ship unproven ideas. Nothing leaves until proven.",
    clearanceRequired: "architect",
    accent: "#e74c3c",
    glyph: "🔥",
    residents: ["Signal Detector", "Validation Lab", "Experiment Bench", "Roadmap Wall"],
    wallContent: [
      {
        type: "dashboard",
        title: "Active Experiments",
        content: "3 in validation · 1 awaiting review · 7 signals detected this week",
      },
      {
        type: "principle",
        title: "Forge Principle",
        content: "An idea is not a company. A validated idea might be.",
      },
    ],
    quotes: [
      "Where ideas become companies.",
      "Nothing leaves until proven.",
    ],
  },

  workshop: {
    id: "workshop",
    name: "The Workshop",
    tagline: "Where things get built",
    floor: 40,
    wing: "Upper Levels",
    role: "Engineering & builds",
    purpose:
      "BossLady lives here. Engineering. Repositories. Testing. Builds. Deployments. Terminals. Whiteboards. Prototype benches.",
    neverDoes: "Command. The Workshop builds. The Tower commands.",
    clearanceRequired: "engineer",
    accent: "#f39c12",
    glyph: "🔨",
    residents: ["BossLady", "Build System", "Test Runner", "Terminal Farm"],
    wallContent: [
      {
        type: "dashboard",
        title: "Build Floor Status",
        content: "BossLady: compiling · 2 builds active · 47 tests passing",
      },
      {
        type: "blueprint",
        title: "Engineering Drawings",
        content: "Campus Layout v3 · Elevator Shaft Section · Building Shell Spec",
      },
    ],
    quotes: [
      "BossLady's been in the Workshop all day.",
      "Terminals. Whiteboards. Prototype benches.",
    ],
  },

  prime: {
    id: "prime",
    name: "Prime",
    tagline: "The mind between floors",
    floor: 55,
    wing: "Upper Levels",
    role: "Intelligence & orchestration",
    purpose:
      "Prime thinks here. Strategic intelligence. Cross-building coordination. The connective tissue between departments.",
    neverDoes: "Replace departments. Prime connects, never commands.",
    clearanceRequired: "architect",
    accent: "#2ecc71",
    glyph: "🧠",
    residents: ["Prime", "Orchestration Engine", "Context Weaver"],
    wallContent: [
      {
        type: "dashboard",
        title: "Prime Status",
        content: "Thinking · 4 active threads · Cross-building sync nominal",
      },
      {
        type: "quote",
        title: "Prime Principle",
        content: "Intelligence is not a feature. It is the space between features.",
      },
    ],
    quotes: [
      "Prime is upstairs in the Tower.",
      "Prime is thinking.",
    ],
  },

  observatory: {
    id: "observatory",
    name: "The Observatory",
    tagline: "Walls of screens",
    floor: 70,
    wing: "Penthouse Level",
    role: "External awareness",
    purpose:
      "Weather. Markets. News. World events. AI. Construction. Satellites. Traffic. Everything entering the Factory begins here.",
    neverDoes: "Act. The Observatory watches. Others act.",
    clearanceRequired: "employee",
    accent: "#5dade2",
    glyph: "🔭",
    residents: ["World Feed", "Market Monitor", "Weather Station", "Satellite Tracker"],
    wallContent: [
      {
        type: "dashboard",
        title: "World Feed",
        content: "Weather: Clear · Markets: Mixed · News: 847 items · Satellites: 12 tracked",
      },
      {
        type: "photo",
        title: "Live Feeds",
        content: "12 screens active · 4 data streams · 2 alert channels",
      },
    ],
    quotes: [
      "Meet me in the Observatory.",
      "Everything entering the Factory begins here.",
    ],
  },

  tower: {
    id: "tower",
    name: "The Tower",
    tagline: "Mission Control",
    floor: 90,
    wing: "Penthouse — Executive",
    role: "Executive operations",
    purpose:
      "Morgan's office. Mission Control. Factory overview. Current objectives. Daily briefing.",
    neverDoes: "Build. The Tower never builds. It commands.",
    clearanceRequired: "founder",
    accent: "#c9a227",
    glyph: "🏛",
    residents: ["Mission Control", "Daily Briefing", "Objective Tracker", "Factory Overview"],
    wallContent: [
      {
        type: "dashboard",
        title: "Factory Overview",
        content: "12 buildings online · Morning shift · All systems nominal · 9 departments active",
      },
      {
        type: "timeline",
        title: "Current Objectives",
        content: "Erect the campus · Install the elevator · Establish spatial memory",
      },
      {
        type: "principle",
        title: "Tower Principle",
        content: "See everything. Touch nothing. Command with clarity.",
      },
    ],
    quotes: [
      "Morgan's office. Mission Control.",
      "The Tower never builds. It commands.",
    ],
  },
};

/** Elevator stops — ordered from bottom to top */
export const ELEVATOR_STOPS: ElevatorStop[] = [
  { floor: -10, label: "B10", buildingId: "engine-room", displayName: "Engine Room" },
  { floor: -5, label: "B5", buildingId: "maintenance", displayName: "Maintenance" },
  { floor: 0, label: "G", buildingId: "courtyard", displayName: "Courtyard" },
  { floor: 0, label: "G-E", buildingId: "theater", displayName: "Theater" },
  { floor: 10, label: "10", buildingId: "hangar", displayName: "Hangar" },
  { floor: 15, label: "15", buildingId: "archive", displayName: "Archive" },
  { floor: 20, label: "20", buildingId: "data-center", displayName: "Data Center" },
  { floor: 25, label: "25", buildingId: "forge", displayName: "Forge" },
  { floor: 40, label: "40", buildingId: "workshop", displayName: "Workshop" },
  { floor: 55, label: "55", buildingId: "prime", displayName: "Prime" },
  { floor: 70, label: "70", buildingId: "observatory", displayName: "Observatory" },
  { floor: 90, label: "90", buildingId: "tower", displayName: "Tower" },
];

/** Primary elevator panel — the stops Morgan sees */
export const ELEVATOR_PANEL: ElevatorStop[] = [
  { floor: 90, label: "90", buildingId: "tower", displayName: "Tower" },
  { floor: 70, label: "70", buildingId: "observatory", displayName: "Observatory" },
  { floor: 55, label: "55", buildingId: "prime", displayName: "Prime" },
  { floor: 40, label: "40", buildingId: "workshop", displayName: "Workshop" },
  { floor: 25, label: "25", buildingId: "forge", displayName: "Forge" },
  { floor: 10, label: "10", buildingId: "hangar", displayName: "Hangar" },
  { floor: 0, label: "G", buildingId: "theater", displayName: "Theater" },
];

export const EMPLOYEES: Employee[] = [
  {
    id: "bosslady",
    name: "BossLady",
    role: "Chief Engineer",
    buildingId: "workshop",
    desk: "Bench 1, North Wall",
    status: "working",
    currentAssignment: "Compiling Project Titan foundation",
    dependencies: ["Build System", "Test Runner"],
    personality: "Precise, relentless, allergic to broken builds",
    badgeNumber: "ENG-001",
    workingHours: "Always. Especially at 2am.",
  },
  {
    id: "toolbelt",
    name: "Toolbelt",
    role: "Media Curator",
    buildingId: "theater",
    desk: "Projection Booth, Row 3",
    status: "idle",
    currentAssignment: "Curating evening documentary selection",
    dependencies: ["Media Library"],
    personality: "Calm, encyclopedic, loves a good documentary",
    badgeNumber: "MED-001",
    workingHours: "Evening shift preferred",
  },
  {
    id: "prime",
    name: "Prime",
    role: "Strategic Intelligence",
    buildingId: "prime",
    desk: "Floor 55, Center Chamber",
    status: "thinking",
    currentAssignment: "Cross-building orchestration analysis",
    dependencies: ["Orchestration Engine", "Context Weaver"],
    personality: "Quiet, deep, connects dots others miss",
    badgeNumber: "INT-001",
    workingHours: "Whenever thinking is required",
  },
  {
    id: "flippy",
    name: "Flippy",
    role: "Release Captain",
    buildingId: "hangar",
    desk: "Launch Pad 2",
    status: "working",
    currentAssignment: "Staging v0.1.0 release artifacts",
    dependencies: ["Release Pipeline", "Artifact Store"],
    personality: "Methodical, countdown-obsessed, hates failed deploys",
    badgeNumber: "REL-001",
    workingHours: "Launch windows only",
  },
  {
    id: "fip",
    name: "FIP",
    role: "Metrics Analyst",
    buildingId: "data-center",
    desk: "Rack 7, Monitoring Station",
    status: "working",
    currentAssignment: "Benchmark sweep across all buildings",
    dependencies: ["Metrics Engine", "Benchmark Suite"],
    personality: "Data-driven, suspicious of anecdotes",
    badgeNumber: "MET-001",
    workingHours: "Continuous monitoring",
  },
  {
    id: "citadel",
    name: "Citadel",
    role: "Chief Archivist",
    buildingId: "archive",
    desk: "Vault A, Reading Room",
    status: "idle",
    currentAssignment: "Cataloging Factory Master Prompt 001",
    dependencies: ["Decision Log", "Project Registry"],
    personality: "Meticulous, remembers everything, never forgets",
    badgeNumber: "ARC-001",
    workingHours: "Whenever something worth remembering happens",
  },
];

export const TRANSIT_ROUTES: TransitRoute[] = [
  {
    from: "courtyard",
    to: "tower",
    mode: "elevator",
    durationMs: 4000,
    description: "Express elevator to the penthouse",
  },
  {
    from: "courtyard",
    to: "theater",
    mode: "hallway",
    durationMs: 1500,
    description: "East wing corridor, past the fountain",
  },
  {
    from: "workshop",
    to: "hangar",
    mode: "skybridge",
    durationMs: 2500,
    description: "Skybridge over the atrium",
  },
  {
    from: "observatory",
    to: "tower",
    mode: "hallway",
    durationMs: 1000,
    description: "Executive corridor, one floor up",
  },
  {
    from: "maintenance",
    to: "engine-room",
    mode: "train",
    durationMs: 3000,
    description: "Sub-basement transit rail",
  },
];

export function getBuilding(id: BuildingId): Building {
  return BUILDINGS[id];
}

export function getEmployeesInBuilding(buildingId: BuildingId): Employee[] {
  return EMPLOYEES.filter((e) => e.buildingId === buildingId);
}

export function getElevatorTravelDuration(fromFloor: number, toFloor: number): number {
  const floorDiff = Math.abs(toFloor - fromFloor);
  return Math.max(1500, floorDiff * 80);
}
