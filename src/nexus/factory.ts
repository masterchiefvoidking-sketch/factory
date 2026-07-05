import type {
  ActivityEntry,
  ClipboardItem,
  EventType,
  ExchangeFile,
  FactoryCommand,
  FactoryEvent,
  FactoryExtension,
  FactoryNotification,
  FactoryObject,
  NexusPermission,
  ObjectType,
  OperationsMetrics,
  SearchResults,
  SharedService,
  SharedServiceId,
  TenantId,
} from "./types";
import { SHARED_SERVICES } from "./types";
import { TENANTS } from "./tenants";
import { SKYBRIDGES } from "./skybridges";

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function now(): string {
  return new Date().toISOString();
}

/** Seed: NASA as the canonical cross-tenant object example */
const SEED_OBJECTS: FactoryObject[] = [
  {
    id: "obj-nasa-001",
    type: "media",
    title: "NASA",
    description: "National Aeronautics and Space Administration",
    createdAt: "2026-07-01T10:00:00Z",
    updatedAt: "2026-07-05T01:00:00Z",
    createdBy: "toolbelt",
    perspectives: [
      { tenantId: "toolbelt", role: "Bookmark", summary: "Bookmarked in media library" },
      { tenantId: "prime", role: "Reasoning", summary: "Active reasoning thread about space exploration strategy" },
      { tenantId: "citadel", role: "Memory", summary: "12 related decisions archived" },
      { tenantId: "bosslady", role: "Execution", summary: "NASA API integration in progress" },
      { tenantId: "forge", role: "Evaluation", summary: "2 business ideas under validation" },
      { tenantId: "flippy", role: "Packaging", summary: "NASA connector v0.3 staged" },
      { tenantId: "fip", role: "Metrics", summary: "847 interactions measured this week" },
    ],
  },
  {
    id: "obj-project-titan",
    type: "project",
    title: "Project Titan",
    description: "The Factory campus — building architecture",
    createdAt: "2026-07-01T08:00:00Z",
    updatedAt: "2026-07-05T01:42:00Z",
    createdBy: "bosslady",
    perspectives: [
      { tenantId: "bosslady", role: "Build", summary: "Foundation compiled and deployed" },
      { tenantId: "prime", role: "Strategy", summary: "Architectural alignment verified" },
      { tenantId: "citadel", role: "Record", summary: "Master Prompt 001 archived" },
      { tenantId: "fip", role: "Health", summary: "Build pipeline nominal" },
    ],
  },
];

const SERVICE_DEFINITIONS: Record<SharedServiceId, { name: string; description: string }> = {
  identity: { name: "Factory Identity", description: "Authentication, sessions, and tenant identity" },
  "object-registry": { name: "Factory Object Registry", description: "One object. One ID. Every tenant references the same canonical object." },
  "event-bus": { name: "Factory Event Bus", description: "Every important action emits an event. Tenants subscribe to what they care about." },
  "notification-center": { name: "Factory Notification Center", description: "One inbox. Not nine. Factory prioritizes." },
  search: { name: "Factory Search", description: "One search. Every application contributes. Results grouped by tenant." },
  "activity-stream": { name: "Factory Activity Stream", description: "Operational history. Not chat. Everything important, chronologically." },
  clipboard: { name: "Factory Clipboard", description: "Copy anywhere. Paste anywhere. Objects, links, media, tasks, reports." },
  "file-exchange": { name: "Factory File Exchange", description: "Documents, images, reports, packages — one shared protocol." },
  "package-exchange": { name: "Factory Package Exchange", description: "Artifact distribution between tenants via Factory protocol." },
  "permission-engine": { name: "Factory Permission Engine", description: "Visitor → System. Every tenant uses the same model." },
  "time-service": { name: "Factory Time Service", description: "Canonical timestamps, scheduling, and shift awareness." },
  logging: { name: "Factory Logging", description: "Centralized operational logging. No tenant duplicates." },
  settings: { name: "Factory Settings", description: "Shared configuration layer for the campus." },
  themes: { name: "Factory Themes", description: "Lighting, glass, elevation — shared visual language." },
  shortcuts: { name: "Factory Shortcuts", description: "Global keyboard shortcuts routed through Factory." },
  automations: { name: "Factory Automations", description: "Background workflows triggered by events." },
  "api-gateway": { name: "Factory API Gateway", description: "Single entry point. No direct tenant-to-tenant calls." },
  "extension-system": { name: "Factory Extension System", description: "Future tenants plug in without modifying the Factory." },
};

/**
 * FactoryNexus — the shared infrastructure runtime.
 *
 * This is what lives in the Utility Floor and Engine Room.
 * Tenants call these services. They never call each other.
 */
export class FactoryNexus {
  private objects = new Map<string, FactoryObject>();
  private events: FactoryEvent[] = [];
  private notifications: FactoryNotification[] = [];
  private activity: ActivityEntry[] = [];
  private clipboard: ClipboardItem[] = [];
  private files: ExchangeFile[] = [];
  private commands: FactoryCommand[] = [];
  private extensions: FactoryExtension[] = [];
  private subscribers = new Map<string, (event: FactoryEvent) => void>();
  private eventCount = 0;

  constructor() {
    for (const obj of SEED_OBJECTS) {
      this.objects.set(obj.id, obj);
    }
    this.seedEvents();
    this.seedCommands();
  }

  // ─── Object Registry ─────────────────────────────────────────────────────

  registerObject(
    obj: Omit<FactoryObject, "id" | "createdAt" | "updatedAt" | "perspectives"> & {
      perspectives?: FactoryObject["perspectives"];
    }
  ): FactoryObject {
    const record: FactoryObject = {
      ...obj,
      id: `obj-${uid()}`,
      createdAt: now(),
      updatedAt: now(),
      perspectives: obj.perspectives ?? [],
    };
    this.objects.set(record.id, record);
    this.emit("object.created", "factory", `Object registered: ${record.title}`, {
      objectId: record.id,
      objectType: record.type,
    });
    return record;
  }

  getObject(id: string): FactoryObject | undefined {
    return this.objects.get(id);
  }

  getAllObjects(): FactoryObject[] {
    return Array.from(this.objects.values());
  }

  addPerspective(
    objectId: string,
    perspective: FactoryObject["perspectives"][0]
  ): FactoryObject | undefined {
    const obj = this.objects.get(objectId);
    if (!obj) return undefined;
    obj.perspectives.push(perspective);
    obj.updatedAt = now();
    this.emit("object.updated", perspective.tenantId, `${perspective.tenantId} added perspective on ${obj.title}`, {
      objectId,
      objectType: obj.type,
    });
    return obj;
  }

  // ─── Event Bus ─────────────────────────────────────────────────────────

  emit(
    type: EventType,
    source: TenantId | "factory",
    summary: string,
    payload: Record<string, unknown> = {}
  ): FactoryEvent {
    const event: FactoryEvent = {
      id: `evt-${uid()}`,
      type,
      timestamp: now(),
      source,
      summary,
      objectId: payload.objectId as string | undefined,
      objectType: payload.objectType as ObjectType | undefined,
      payload,
    };
    this.events.unshift(event);
    if (this.events.length > 200) this.events.pop();
    this.eventCount++;

    this.activity.unshift({
      id: `act-${uid()}`,
      timestamp: event.timestamp,
      source,
      action: type,
      summary,
      objectId: event.objectId,
      objectType: event.objectType,
      eventId: event.id,
    });
    if (this.activity.length > 100) this.activity.pop();

    for (const handler of this.subscribers.values()) {
      handler(event);
    }
    return event;
  }

  getEvents(limit = 50): FactoryEvent[] {
    return this.events.slice(0, limit);
  }

  subscribe(id: string, handler: (event: FactoryEvent) => void): () => void {
    this.subscribers.set(id, handler);
    return () => this.subscribers.delete(id);
  }

  // ─── Notifications ─────────────────────────────────────────────────────

  publishNotification(
    source: TenantId | "factory",
    title: string,
    body: string,
    priority: FactoryNotification["priority"] = "normal"
  ): FactoryNotification {
    const notification: FactoryNotification = {
      id: `ntf-${uid()}`,
      timestamp: now(),
      source,
      title,
      body,
      priority,
      read: false,
    };
    this.notifications.unshift(notification);
    this.emit("notification.published", source, title, { notificationId: notification.id });
    return notification;
  }

  getNotifications(): FactoryNotification[] {
    return this.notifications;
  }

  // ─── Search ────────────────────────────────────────────────────────────

  search(query: string): SearchResults {
    const q = query.toLowerCase();
    const results = this.getAllObjects()
      .filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.description?.toLowerCase().includes(q) ||
          o.perspectives.some((p) => p.summary.toLowerCase().includes(q))
      )
      .flatMap((o) =>
        o.perspectives.map((p) => ({
          id: `srch-${o.id}-${p.tenantId}`,
          objectId: o.id,
          objectType: o.type,
          title: o.title,
          snippet: p.summary,
          tenantId: p.tenantId,
          score: o.title.toLowerCase() === q ? 1 : 0.7,
        }))
      )
      .sort((a, b) => b.score - a.score);

    const grouped = {} as SearchResults["grouped"];
    for (const r of results) {
      if (!grouped[r.tenantId]) grouped[r.tenantId] = [];
      grouped[r.tenantId].push(r);
    }

    return { query, total: results.length, grouped, results };
  }

  // ─── Clipboard ─────────────────────────────────────────────────────────

  copy(item: Omit<ClipboardItem, "id" | "copiedAt">): ClipboardItem {
    const record: ClipboardItem = { ...item, id: `clip-${uid()}`, copiedAt: now() };
    this.clipboard.unshift(record);
    if (this.clipboard.length > 20) this.clipboard.pop();
    this.emit("clipboard.copied", item.copiedBy === "user" ? "factory" : item.copiedBy, `Copied: ${item.label}`);
    return record;
  }

  getClipboard(): ClipboardItem[] {
    return this.clipboard;
  }

  // ─── File Exchange ─────────────────────────────────────────────────────

  exchangeFile(file: Omit<ExchangeFile, "id" | "uploadedAt">): ExchangeFile {
    const record: ExchangeFile = { ...file, id: `file-${uid()}`, uploadedAt: now() };
    this.files.unshift(record);
    this.emit("file.exchanged", file.uploadedBy, `File exchanged: ${file.name}`, { fileId: record.id });
    return record;
  }

  getFiles(): ExchangeFile[] {
    return this.files;
  }

  // ─── Commands ──────────────────────────────────────────────────────────

  registerCommand(cmd: Omit<FactoryCommand, "id">): FactoryCommand {
    const record: FactoryCommand = { ...cmd, id: `cmd-${uid()}` };
    this.commands.push(record);
    return record;
  }

  getCommands(permission: NexusPermission): FactoryCommand[] {
    const ranks = { visitor: 0, operator: 1, engineer: 2, architect: 3, founder: 4, system: 5 };
    return this.commands.filter((c) => ranks[permission] >= ranks[c.permission]);
  }

  // ─── Activity Stream ───────────────────────────────────────────────────

  getActivity(limit = 30): ActivityEntry[] {
    return this.activity.slice(0, limit);
  }

  // ─── Operations ────────────────────────────────────────────────────────

  getOperationsMetrics(): OperationsMetrics {
    const connectorHealth = {} as OperationsMetrics["connectorHealth"];
    for (const id of Object.keys(TENANTS) as TenantId[]) {
      connectorHealth[id] = "healthy";
    }

    const serviceStatus = {} as OperationsMetrics["serviceStatus"];
    for (const id of SHARED_SERVICES) {
      serviceStatus[id] = "online";
    }

    return {
      systemHealth: "nominal",
      eventTrafficPerMin: Math.min(this.eventCount, 142),
      queueDepth: 0,
      automationActive: 3,
      backgroundJobs: 7,
      storageUsedGb: 2.4,
      searchIndexSize: this.objects.size,
      connectorHealth,
      serviceStatus,
    };
  }

  getServices(): SharedService[] {
    return SHARED_SERVICES.map((id) => ({
      id,
      name: SERVICE_DEFINITIONS[id].name,
      description: SERVICE_DEFINITIONS[id].description,
      status: "online" as const,
      owner: "factory" as const,
    }));
  }

  getSkybridges() {
    return SKYBRIDGES;
  }

  getExtensions(): FactoryExtension[] {
    return this.extensions;
  }

  // ─── Seed Data ─────────────────────────────────────────────────────────

  private seedEvents() {
    this.emit("media.saved", "toolbelt", "Toolbelt bookmarked NASA", {
      objectId: "obj-nasa-001",
      objectType: "media",
    });
    this.emit("signal.detected", "observatory", "Observatory detected space industry signal", {
      objectId: "obj-nasa-001",
      objectType: "signal",
    });
    this.emit("build.succeeded", "bosslady", "BossLady completed NASA API integration build", {
      objectId: "obj-nasa-001",
    });
    this.emit("package.released", "flippy", "Flippy staged NASA connector v0.3", {
      objectId: "obj-nasa-001",
      objectType: "package",
    });
    this.emit("decision.approved", "citadel", "Citadel archived Titan architecture decision", {
      objectId: "obj-project-titan",
      objectType: "decision",
    });
    this.eventCount = this.events.length;
  }

  private seedCommands() {
    const cmds: Omit<FactoryCommand, "id">[] = [
      { tenantId: "prime", label: "Open reasoning thread", description: "Start a new Prime reasoning session", permission: "operator", category: "Prime" },
      { tenantId: "toolbelt", label: "Search library", description: "Search Toolbelt media library", shortcut: "⌘K", permission: "visitor", category: "Toolbelt" },
      { tenantId: "bosslady", label: "Run build", description: "Trigger BossLady build pipeline", permission: "engineer", category: "BossLady" },
      { tenantId: "citadel", label: "Search archives", description: "Search Citadel decision history", permission: "operator", category: "Citadel" },
      { tenantId: "forge", label: "New experiment", description: "Start Forge validation experiment", permission: "architect", category: "Forge" },
      { tenantId: "flippy", label: "Stage release", description: "Stage package for release", permission: "engineer", category: "Flippy" },
      { tenantId: "fip", label: "Run benchmark", description: "Trigger FIP benchmark sweep", permission: "engineer", category: "FIP" },
      { tenantId: "observatory", label: "Open world feed", description: "View Observatory live feeds", permission: "visitor", category: "Observatory" },
    ];
    for (const cmd of cmds) this.registerCommand(cmd);
  }
}

/** Singleton Factory infrastructure runtime */
export const nexus = new FactoryNexus();
