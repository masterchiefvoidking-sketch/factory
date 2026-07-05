/**
 * PROJECT NEXUS — FACTORY MASTER PROMPT 002
 * The Shared Infrastructure Layer
 *
 * Applications never communicate directly.
 * They communicate through Factory infrastructure.
 */

// ─── The First Law ───────────────────────────────────────────────────────────

export const NEXUS_FIRST_LAW =
  "Applications never communicate directly. They communicate through Factory infrastructure.";

// ─── Frozen Tenants ──────────────────────────────────────────────────────────

export const TENANT_IDS = [
  "prime",
  "toolbelt",
  "bosslady",
  "citadel",
  "forge",
  "flippy",
  "fip",
  "observatory",
  "sentinel",
] as const;

export type TenantId = (typeof TENANT_IDS)[number];

export interface Tenant {
  id: TenantId;
  name: string;
  buildingId: string;
  badgeColor: string;
  status: "frozen";
  description: string;
}

// ─── Nexus Permission Model ──────────────────────────────────────────────────

export const NEXUS_PERMISSIONS = [
  "visitor",
  "operator",
  "engineer",
  "architect",
  "founder",
  "system",
] as const;

export type NexusPermission = (typeof NEXUS_PERMISSIONS)[number];

export const NEXUS_PERMISSION_RANK: Record<NexusPermission, number> = {
  visitor: 0,
  operator: 1,
  engineer: 2,
  architect: 3,
  founder: 4,
  system: 5,
};

export function hasNexusPermission(
  user: NexusPermission,
  required: NexusPermission
): boolean {
  return NEXUS_PERMISSION_RANK[user] >= NEXUS_PERMISSION_RANK[required];
}

// ─── Canonical Object Types ──────────────────────────────────────────────────

export const OBJECT_TYPES = [
  "project",
  "task",
  "decision",
  "business",
  "repository",
  "signal",
  "media",
  "report",
  "package",
  "contact",
  "company",
  "idea",
] as const;

export type ObjectType = (typeof OBJECT_TYPES)[number];

export interface FactoryObject {
  /** Globally unique — ONE object, not nine versions */
  id: string;
  type: ObjectType;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: TenantId;
  /** Tenant-specific perspectives on the same canonical object */
  perspectives: ObjectPerspective[];
}

export interface ObjectPerspective {
  tenantId: TenantId;
  role: string;
  summary: string;
  metadata?: Record<string, unknown>;
}

// ─── Event Bus ───────────────────────────────────────────────────────────────

export const EVENT_TYPES = [
  "media.saved",
  "task.completed",
  "build.failed",
  "build.succeeded",
  "package.released",
  "decision.approved",
  "signal.detected",
  "project.archived",
  "object.created",
  "object.updated",
  "notification.published",
  "search.indexed",
  "clipboard.copied",
  "file.exchanged",
  "automation.triggered",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export interface FactoryEvent {
  id: string;
  type: EventType;
  timestamp: string;
  source: TenantId | "factory";
  objectId?: string;
  objectType?: ObjectType;
  payload: Record<string, unknown>;
  summary: string;
}

export type EventHandler = (event: FactoryEvent) => void;

export interface EventSubscription {
  id: string;
  tenantId: TenantId;
  eventTypes: EventType[];
  handler: EventHandler;
}

// ─── Notifications ───────────────────────────────────────────────────────────

export type NotificationPriority = "low" | "normal" | "high" | "critical";

export interface FactoryNotification {
  id: string;
  timestamp: string;
  source: TenantId | "factory";
  title: string;
  body: string;
  priority: NotificationPriority;
  read: boolean;
  objectId?: string;
  actionUrl?: string;
}

// ─── Activity Stream ───────────────────────────────────────────────────────────

export interface ActivityEntry {
  id: string;
  timestamp: string;
  source: TenantId | "factory";
  action: string;
  summary: string;
  objectId?: string;
  objectType?: ObjectType;
  eventId: string;
}

// ─── Clipboard ───────────────────────────────────────────────────────────────

export type ClipboardItemType = "object" | "link" | "media" | "task" | "report" | "text";

export interface ClipboardItem {
  id: string;
  type: ClipboardItemType;
  copiedAt: string;
  copiedBy: TenantId | "user";
  sourceBuilding: string;
  label: string;
  objectId?: string;
  content: string;
}

// ─── File Exchange ───────────────────────────────────────────────────────────

export type ExchangeFileType =
  | "document"
  | "image"
  | "report"
  | "package"
  | "export"
  | "log"
  | "media";

export interface ExchangeFile {
  id: string;
  name: string;
  type: ExchangeFileType;
  sizeBytes: number;
  uploadedAt: string;
  uploadedBy: TenantId;
  objectId?: string;
  mimeType: string;
}

// ─── Search ──────────────────────────────────────────────────────────────────

export interface SearchResult {
  id: string;
  objectId: string;
  objectType: ObjectType;
  title: string;
  snippet: string;
  tenantId: TenantId;
  score: number;
}

export interface SearchResults {
  query: string;
  total: number;
  grouped: Record<TenantId, SearchResult[]>;
  results: SearchResult[];
}

// ─── Commands ────────────────────────────────────────────────────────────────

export interface FactoryCommand {
  id: string;
  tenantId: TenantId;
  label: string;
  description: string;
  shortcut?: string;
  permission: NexusPermission;
  category: string;
}

// ─── Shared Services Registry ──────────────────────────────────────────────────

export const SHARED_SERVICES = [
  "identity",
  "object-registry",
  "event-bus",
  "notification-center",
  "search",
  "activity-stream",
  "clipboard",
  "file-exchange",
  "package-exchange",
  "permission-engine",
  "time-service",
  "logging",
  "settings",
  "themes",
  "shortcuts",
  "automations",
  "api-gateway",
  "extension-system",
] as const;

export type SharedServiceId = (typeof SHARED_SERVICES)[number];

export interface SharedService {
  id: SharedServiceId;
  name: string;
  description: string;
  status: "online" | "degraded" | "offline";
  owner: "factory";
}

// ─── Skybridges ──────────────────────────────────────────────────────────────

export interface Skybridge {
  id: string;
  from: TenantId;
  carries: string;
  objectTypes: ObjectType[];
  description: string;
}

// ─── Factory Contract ────────────────────────────────────────────────────────

export interface FactoryContractClause {
  id: string;
  type: "may" | "may-not";
  text: string;
}

// ─── Operations Metrics ──────────────────────────────────────────────────────

export interface OperationsMetrics {
  systemHealth: "nominal" | "degraded" | "critical";
  eventTrafficPerMin: number;
  queueDepth: number;
  automationActive: number;
  backgroundJobs: number;
  storageUsedGb: number;
  searchIndexSize: number;
  connectorHealth: Record<TenantId, "healthy" | "degraded" | "offline">;
  serviceStatus: Record<SharedServiceId, "online" | "degraded" | "offline">;
}

// ─── Extensions ──────────────────────────────────────────────────────────────

export interface FactoryExtension {
  id: string;
  name: string;
  version: string;
  tenantId: TenantId;
  registeredAt: string;
  capabilities: string[];
}

// ─── Design System Tokens ──────────────────────────────────────────────────────

export interface DesignSystemTokens {
  typography: Record<string, string>;
  spacing: Record<string, string>;
  elevation: Record<string, string>;
  glass: Record<string, string>;
  lighting: Record<string, string>;
  animation: Record<string, string>;
}
