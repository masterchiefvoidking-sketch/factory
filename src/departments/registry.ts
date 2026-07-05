import type { TenantId } from "@/nexus/types";
import type {
  CommonsSpace,
  CrossDepartmentProject,
  Department,
  DepartmentId,
  ExecutiveFloor,
  VisitorGuide,
} from "./types";

/**
 * Factory Department Registry
 *
 * Applications are workers. Departments own responsibility.
 */

export const DEPARTMENTS: Record<DepartmentId, Department> = {
  intelligence: {
    id: "intelligence",
    name: "Department of Intelligence",
    purpose: "Observe reality.",
    workers: ["observatory", "sentinel"],
    responsibilities: [
      "World awareness",
      "Signals",
      "Change detection",
      "Trend monitoring",
      "Environmental awareness",
    ],
    produces: ["Signals", "Reports", "Alerts", "World snapshots"],
    buildingId: "observatory",
    entrance: "North Wing · Glass dome entrance",
    accent: "#9b59b6",
    glyph: "🔭",
    mapPosition: { x: 50, y: 12 },
    adjacentDepartments: ["reasoning", "knowledge"],
  },

  knowledge: {
    id: "knowledge",
    name: "Department of Knowledge",
    purpose: "Experience information.",
    workers: ["toolbelt"],
    responsibilities: [
      "Media",
      "Reading",
      "Learning",
      "Discovery",
      "Collections",
      "Research intake",
    ],
    produces: ["Knowledge Objects", "Collections", "Experiences", "Learning paths"],
    buildingId: "toolbelt",
    entrance: "West Wing · Library doors",
    accent: "#3498db",
    glyph: "📚",
    mapPosition: { x: 15, y: 38 },
    adjacentDepartments: ["intelligence", "memory"],
  },

  reasoning: {
    id: "reasoning",
    name: "Department of Reasoning",
    purpose: "Think.",
    workers: ["prime"],
    responsibilities: [
      "Reasoning",
      "Decision support",
      "Architecture",
      "Planning",
      "Tradeoffs",
    ],
    produces: ["Decisions", "Plans", "Strategies", "Recommendations"],
    buildingId: "prime",
    entrance: "East Wing · White corridor",
    accent: "#ecf0f1",
    glyph: "🧠",
    mapPosition: { x: 82, y: 38 },
    adjacentDepartments: ["intelligence", "innovation", "memory"],
  },

  memory: {
    id: "memory",
    name: "Department of Memory",
    purpose: "Institutional memory.",
    workers: ["citadel"],
    responsibilities: [
      "History",
      "Projects",
      "Objects",
      "Calendar",
      "Knowledge",
      "Memory",
    ],
    produces: ["Permanent records", "Reviews", "Archives", "Operating history"],
    buildingId: "citadel",
    entrance: "East Vault · Bronze doors",
    accent: "#cd7f32",
    glyph: "🏰",
    mapPosition: { x: 88, y: 55 },
    adjacentDepartments: ["knowledge", "reasoning"],
  },

  innovation: {
    id: "innovation",
    name: "Department of Innovation",
    purpose: "Create.",
    workers: ["forge"],
    responsibilities: [
      "Ideas",
      "Products",
      "Companies",
      "Experiments",
      "Research",
      "Validation",
    ],
    produces: ["Venture proposals", "Product proposals", "Experiments", "Roadmaps"],
    buildingId: "forge",
    entrance: "Southwest · Industrial bay doors",
    accent: "#e74c3c",
    glyph: "🔥",
    mapPosition: { x: 18, y: 62 },
    adjacentDepartments: ["reasoning", "engineering"],
  },

  engineering: {
    id: "engineering",
    name: "Department of Engineering",
    purpose: "Build.",
    workers: ["bosslady"],
    responsibilities: [
      "Repositories",
      "Coding",
      "Testing",
      "Refactoring",
      "Verification",
    ],
    produces: ["Working software", "Repositories", "Pull Requests", "Tests"],
    buildingId: "bosslady",
    entrance: "Southwest Workshop · Terminal bay",
    accent: "#e67e22",
    glyph: "🔨",
    mapPosition: { x: 25, y: 82 },
    adjacentDepartments: ["innovation", "release"],
  },

  release: {
    id: "release",
    name: "Department of Release",
    purpose: "Deliver.",
    workers: ["flippy"],
    responsibilities: [
      "Packaging",
      "Distribution",
      "Versioning",
      "Publishing",
      "Artifacts",
    ],
    produces: ["Releases", "Downloads", "Packages", "Installers"],
    buildingId: "flippy",
    entrance: "South Dock · Loading bay entrance",
    accent: "#f1c40f",
    glyph: "📦",
    mapPosition: { x: 50, y: 92 },
    adjacentDepartments: ["engineering", "quality"],
  },

  quality: {
    id: "quality",
    name: "Department of Quality",
    purpose: "Measure.",
    workers: ["fip"],
    responsibilities: [
      "Benchmarks",
      "Regression",
      "Health",
      "Qualification",
      "Metrics",
    ],
    produces: ["Scorecards", "Benchmarks", "Regression reports", "Release gates"],
    buildingId: "fip",
    entrance: "Southeast Lab · Precision instruments door",
    accent: "#2ecc71",
    glyph: "📊",
    mapPosition: { x: 78, y: 82 },
    adjacentDepartments: ["release", "reasoning"],
  },
};

export const EXECUTIVE_FLOOR: ExecutiveFloor = {
  name: "The Executive Floor",
  occupants: [
    { role: "Morgan", title: "Founder", authority: "Final Decision Authority" },
    { role: "Morgan", title: "Chief Architect", authority: "Vision & Campus Design" },
  ],
  purpose: "Sets vision. Approves missions. Reviews strategy.",
  neverDoes: "Perform operational work.",
  buildingId: "tower",
  roomId: "war-room",
};

export const COMMONS_SPACES: CommonsSpace[] = [
  {
    id: "cafeteria",
    name: "Cafeteria",
    description: "Recent activity and informal updates. Where departments mingle.",
    glyph: "☕",
    highlights: [
      "BossLady compiling — heard from Engineering",
      "Forge pitching 2 venture ideas at lunch",
      "FIP benchmark results posted on the board",
    ],
  },
  {
    id: "auditorium",
    name: "Auditorium",
    description: "Major announcements and launch events.",
    glyph: "🎤",
    highlights: [
      "Next: Project Operations launch briefing",
      "Last: Titan Campus V1.0 dedication",
    ],
  },
  {
    id: "training-center",
    name: "Training Center",
    description: "Documentation and onboarding. Learn the Factory.",
    glyph: "🎓",
    highlights: [
      "Master Prompt 001: The Building",
      "Master Prompt 002: Shared Infrastructure",
      "Master Prompt 003: Operations",
      "Master Prompt 004: Departments",
    ],
  },
  {
    id: "design-gallery",
    name: "Design Gallery",
    description: "Current concepts and prototypes on display.",
    glyph: "🖼",
    highlights: [
      "Titan Campus radial layout — approved",
      "Conveyor system prototype — in review",
      "Department floor map — current",
    ],
  },
  {
    id: "innovation-wall",
    name: "Innovation Wall",
    description: "Ideas waiting for validation. Anyone can pin.",
    glyph: "💡",
    highlights: [
      "NASA integration connector — validating",
      "Voice-activated elevator — idea",
      "Cross-department project templates — idea",
    ],
  },
  {
    id: "recognition-hall",
    name: "Recognition Hall",
    description: "Completed milestones and major achievements.",
    glyph: "🏆",
    highlights: [
      "Project Titan — Campus erected",
      "Project Nexus — 18 services online",
      "First conveyor artifact completed",
    ],
  },
];

export const CROSS_DEPARTMENT_PROJECTS: CrossDepartmentProject[] = [
  {
    id: "proj-toolbelt-broadcast",
    title: "Toolbelt Broadcast v1.0",
    description: "Cross-department initiative to deliver a unified broadcast experience.",
    status: "active",
    owner: "factory",
    participants: [
      { departmentId: "intelligence", worker: "observatory", role: "Monitor sources" },
      { departmentId: "knowledge", worker: "toolbelt", role: "Deliver the experience" },
      { departmentId: "reasoning", worker: "prime", role: "Evaluate tradeoffs" },
      { departmentId: "memory", worker: "citadel", role: "Preserve decisions" },
      { departmentId: "innovation", worker: "forge", role: "Explore future opportunities" },
      { departmentId: "engineering", worker: "bosslady", role: "Implement" },
      { departmentId: "release", worker: "flippy", role: "Ship" },
      { departmentId: "quality", worker: "fip", role: "Qualify" },
    ],
  },
  {
    id: "proj-nasa-pipeline",
    title: "NASA Integration Pipeline",
    description: "End-to-end signal from Observatory to shipped connector.",
    status: "active",
    owner: "factory",
    participants: [
      { departmentId: "intelligence", worker: "observatory", role: "Detect signal" },
      { departmentId: "intelligence", worker: "sentinel", role: "Create change object" },
      { departmentId: "reasoning", worker: "prime", role: "Create decision" },
      { departmentId: "innovation", worker: "forge", role: "Venture proposal" },
      { departmentId: "engineering", worker: "bosslady", role: "Build integration" },
      { departmentId: "release", worker: "flippy", role: "Package release" },
      { departmentId: "quality", worker: "fip", role: "Benchmark" },
      { departmentId: "memory", worker: "citadel", role: "Archive everything" },
    ],
  },
];

export const VISITOR_GUIDE: VisitorGuide = {
  whoWorksHere: (Object.keys(DEPARTMENTS) as DepartmentId[]).map((id) => {
    const d = DEPARTMENTS[id];
    return {
      department: d.name,
      workers: d.workers.map((w) => w.charAt(0).toUpperCase() + w.slice(1)),
      purpose: d.purpose,
    };
  }),
  howWorkFlows: [
    "Intelligence observes → Knowledge experiences → Reasoning thinks",
    "Innovation creates → Engineering builds → Release delivers → Quality measures",
    "Memory archives everything · Factory Services support all departments",
    "Cross-department projects coordinate through Factory Operations",
  ],
  whereToStart: "The Commons — then the Organization Chart — then any department entrance",
};

/** Map tenant → department */
export const TENANT_TO_DEPARTMENT: Record<TenantId, DepartmentId> = {
  observatory: "intelligence",
  sentinel: "intelligence",
  toolbelt: "knowledge",
  prime: "reasoning",
  citadel: "memory",
  forge: "innovation",
  bosslady: "engineering",
  flippy: "release",
  fip: "quality",
};

/** Map building → department (primary) */
export const BUILDING_TO_DEPARTMENT: Partial<Record<string, DepartmentId>> = {
  observatory: "intelligence",
  toolbelt: "knowledge",
  prime: "reasoning",
  citadel: "memory",
  forge: "innovation",
  bosslady: "engineering",
  flippy: "release",
  fip: "quality",
};

export function getDepartment(id: DepartmentId): Department {
  return DEPARTMENTS[id];
}

export function getDepartmentForTenant(tenantId: TenantId): Department {
  return DEPARTMENTS[TENANT_TO_DEPARTMENT[tenantId]];
}

export function getDepartmentForBuilding(buildingId: string): Department | undefined {
  const deptId = BUILDING_TO_DEPARTMENT[buildingId];
  return deptId ? DEPARTMENTS[deptId] : undefined;
}
