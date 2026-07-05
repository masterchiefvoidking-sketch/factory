import type { TenantId } from "@/nexus/types";
import { TENANT_IDS } from "@/nexus/types";
import { nexus } from "@/nexus/factory";
import { detectRhythmPhase, RHYTHM_PROFILES } from "./rhythm";
import { TENANT_BLUEPRINTS } from "./blueprints";
import type {
  CampusClock,
  CommandCenterData,
  ConveyorArtifact,
  ConveyorStage,
  DepartmentState,
  DepartmentStatus,
  FactoryRequest,
  FactoryReview,
  HealthState,
  LogisticsStatus,
  MailItem,
  Mission,
  MissionHealth,
  OpsHistoryEntry,
  OwnedObject,
  QueueColumn,
  QueueItem,
  RequestStatus,
  ReviewOutcome,
  WatchboardData,
} from "./types";
import { KNOWLEDGE_FLOW_STEPS } from "./types";

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function now(): string {
  return new Date().toISOString();
}

const STAGE_TO_TENANT: Record<ConveyorStage, TenantId> = {
  observe: "observatory",
  capture: "sentinel",
  reason: "prime",
  remember: "citadel",
  invent: "forge",
  build: "bosslady",
  ship: "flippy",
  measure: "fip",
  archive: "citadel",
};

/**
 * FactoryOperations — the company operating system.
 *
 * Coordinates work across frozen tenants.
 * Tenants report state. The Factory visualizes and routes.
 */
export class FactoryOperations {
  private departments: Map<TenantId, DepartmentStatus> = new Map();
  private missions: Mission[] = [];
  private requests: FactoryRequest[] = [];
  private reviews: FactoryReview[] = [];
  private queues: QueueItem[] = [];
  private mail: MailItem[] = [];
  private conveyor: ConveyorArtifact[] = [];
  private history: OpsHistoryEntry[] = [];
  private ownedObjects: OwnedObject[] = [];

  constructor() {
    this.initDepartments();
    this.seedMissions();
    this.seedRequests();
    this.seedQueues();
    this.seedMail();
    this.seedConveyor();
    this.seedHistory();
    this.seedOwnership();
  }

  // ─── Campus Clock ────────────────────────────────────────────────────────

  getClock(): CampusClock {
    const rhythmPhase = detectRhythmPhase();
    const d = new Date();
    return {
      factoryTime: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      utc: d.toISOString(),
      rhythmPhase,
      shiftLabel: RHYTHM_PROFILES[rhythmPhase].label,
      operationalDay: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    };
  }

  // ─── Departments ───────────────────────────────────────────────────────

  getDepartments(): DepartmentStatus[] {
    return Array.from(this.departments.values());
  }

  getDepartment(tenantId: TenantId): DepartmentStatus | undefined {
    return this.departments.get(tenantId);
  }

  setDepartmentState(tenantId: TenantId, state: DepartmentState, work?: string): void {
    const dept = this.departments.get(tenantId);
    if (!dept) return;
    dept.state = state;
    dept.lastUpdated = now();
    if (work) dept.currentWork = work;
    this.recordHistory("department.state", `${tenantId} → ${state}`, tenantId);
  }

  // ─── Missions ──────────────────────────────────────────────────────────

  getMissions(): Mission[] {
    return this.missions;
  }

  getMissionHealth(mission: Mission): MissionHealth {
    const allTasks = mission.objectives.flatMap((o) =>
      o.projects.flatMap((p) => p.tasks)
    );
    if (allTasks.length === 0) return "on-track";
    const blocked = allTasks.filter((t) => t.status === "blocked").length;
    const done = allTasks.filter((t) => t.status === "done").length;
    if (blocked > 0) return "blocked";
    if (done === allTasks.length) return "complete";
    if (blocked > 0 || allTasks.some((t) => t.status === "waiting")) return "at-risk";
    return "on-track";
  }

  // ─── Requests ──────────────────────────────────────────────────────────

  getRequests(): FactoryRequest[] {
    return this.requests;
  }

  submitRequest(
    from: TenantId,
    to: TenantId,
    title: string,
    description: string,
    priority: FactoryRequest["priority"] = "normal"
  ): FactoryRequest {
    const request: FactoryRequest = {
      id: `req-${uid()}`,
      from,
      to,
      title,
      description,
      priority,
      status: "submitted",
      submittedAt: now(),
      updatedAt: now(),
      history: [{ timestamp: now(), action: "Request submitted", actor: from }],
    };
    this.requests.unshift(request);
    this.addMail("build-request", from, to, title, priority);
    this.recordHistory("request.submitted", `${from} → ${to}: ${title}`, from);
    nexus.emit("object.created", "factory", `Request submitted: ${title}`, { requestId: request.id });
    return request;
  }

  updateRequestStatus(id: string, status: RequestStatus, actor: TenantId | "factory"): void {
    const req = this.requests.find((r) => r.id === id);
    if (!req) return;
    req.status = status;
    req.updatedAt = now();
    if (status === "completed") req.completedAt = now();
    req.history.push({ timestamp: now(), action: `Status → ${status}`, actor });
    this.recordHistory("request.updated", `${req.title} → ${status}`, actor === "factory" ? "factory" : actor);

    if (status === "completed") {
      this.submitForReview(id);
    }
  }

  // ─── Reviews ───────────────────────────────────────────────────────────

  getReviews(): FactoryReview[] {
    return this.reviews;
  }

  submitForReview(requestId: string): void {
    const req = this.requests.find((r) => r.id === requestId);
    if (!req) return;
    this.addQueueItem(req.to, "review", req.title, requestId);
  }

  completeReview(
    requestId: string,
    reviewer: TenantId | "factory",
    outcome: ReviewOutcome,
    notes: string
  ): FactoryReview {
    const review: FactoryReview = {
      id: `rev-${uid()}`,
      requestId,
      reviewer,
      outcome,
      notes,
      reviewedAt: now(),
    };
    this.reviews.unshift(review);
    this.recordHistory("review.completed", `Review ${outcome}: ${requestId}`, reviewer === "factory" ? "factory" : reviewer);
    nexus.emit("decision.approved", reviewer === "factory" ? "factory" : reviewer, `Review ${outcome}`, { requestId });
    return review;
  }

  // ─── Queues ────────────────────────────────────────────────────────────

  getQueues(tenantId?: TenantId): QueueItem[] {
    return tenantId ? this.queues.filter((q) => q.tenantId === tenantId) : this.queues;
  }

  getQueuesByColumn(tenantId: TenantId): Record<QueueColumn, QueueItem[]> {
    const result = {} as Record<QueueColumn, QueueItem[]>;
    const cols: QueueColumn[] = ["inbox", "working", "waiting", "blocked", "review", "done", "archive"];
    for (const col of cols) result[col] = [];
    for (const item of this.queues.filter((q) => q.tenantId === tenantId)) {
      result[item.column].push(item);
    }
    return result;
  }

  // ─── Mailroom ──────────────────────────────────────────────────────────

  getMail(): MailItem[] {
    return this.mail;
  }

  findMail(id: string): MailItem | undefined {
    return this.mail.find((m) => m.id === id);
  }

  // ─── Conveyor ──────────────────────────────────────────────────────────

  getConveyor(): ConveyorArtifact[] {
    return this.conveyor;
  }

  advanceConveyor(id: string): ConveyorArtifact | undefined {
    const artifact = this.conveyor.find((c) => c.id === id);
    if (!artifact || artifact.status === "complete") return artifact;

    const stageOrder: ConveyorStage[] = [
      "observe", "capture", "reason", "remember", "invent",
      "build", "ship", "measure", "archive",
    ];
    const currentIdx = stageOrder.indexOf(artifact.currentStage);
    if (currentIdx < 0 || currentIdx >= stageOrder.length - 1) {
      artifact.status = "complete";
      return artifact;
    }

    const lastRecord = artifact.stages[artifact.stages.length - 1];
    if (lastRecord) lastRecord.exitedAt = now();

    const nextStage = stageOrder[currentIdx + 1];
    artifact.currentStage = nextStage;
    artifact.currentTenant = STAGE_TO_TENANT[nextStage];
    artifact.stages.push({
      stage: nextStage,
      tenantId: artifact.currentTenant,
      enteredAt: now(),
      artifactType: artifact.type,
    });

    this.recordHistory(
      "conveyor.advanced",
      `${artifact.title} → ${nextStage} (${artifact.currentTenant})`,
      artifact.currentTenant
    );
    return artifact;
  }

  pauseConveyor(id: string): void {
    const a = this.conveyor.find((c) => c.id === id);
    if (a) a.status = "paused";
  }

  // ─── History ───────────────────────────────────────────────────────────

  getHistory(query?: string): OpsHistoryEntry[] {
    if (!query) return this.history;
    const q = query.toLowerCase();
    return this.history.filter(
      (h) => h.searchable && (h.summary.toLowerCase().includes(q) || h.category.toLowerCase().includes(q))
    );
  }

  // ─── Ownership ─────────────────────────────────────────────────────────

  getOwnedObjects(): OwnedObject[] {
    return this.ownedObjects;
  }

  // ─── Logistics ─────────────────────────────────────────────────────────

  getLogistics(): LogisticsStatus {
    return {
      scheduledJobs: 12,
      activeQueues: TENANT_IDS.length,
      pendingRetries: 0,
      backpressure: "none",
      maintenanceWindow: null,
      auditEntriesToday: this.history.length,
    };
  }

  // ─── Watchboard ────────────────────────────────────────────────────────

  getWatchboard(): WatchboardData {
    const currentMissions = this.missions.filter((m) => m.health !== "complete");
    return {
      currentMissions,
      blockedMissions: this.missions.filter((m) => m.health === "blocked"),
      waitingApprovals: this.requests.filter((r) => r.status === "submitted" || r.status === "completed"),
      factoryHealth: this.computeFactoryHealth(),
      upcomingReleases: [
        { id: "rel-1", title: "Factory v0.2.0 — Project Operations", eta: "T-3 days" },
        { id: "rel-2", title: "NASA Connector v0.3", eta: "T-5 days" },
      ],
      recentlyCompleted: [
        { id: "done-1", title: "Project Nexus infrastructure", completedAt: "2026-07-05T01:00:00Z" },
        { id: "done-2", title: "Titan Campus V1.0", completedAt: "2026-07-05T00:30:00Z" },
      ],
      factoryLoad: this.computeFactoryLoad(),
    };
  }

  // ─── Command Center ────────────────────────────────────────────────────

  getCommandCenter(): CommandCenterData {
    return {
      factoryLoad: this.computeFactoryLoad(),
      missionProgress: this.missions.map((m) => ({
        missionId: m.id,
        title: m.title,
        percent: this.missionPercent(m),
        health: m.health,
      })),
      departmentHealth: this.getDepartments(),
      recentDecisions: this.history.filter((h) => h.category.includes("decision") || h.category.includes("review")).slice(0, 5),
      criticalAlerts: this.getDepartments()
        .filter((d) => d.health === "emergency" || d.state === "blocked")
        .map((d) => ({ id: d.tenantId, message: `${d.tenantId} is ${d.state}`, source: d.tenantId })),
      upcomingMilestones: [
        { id: "ms-1", title: "Operations layer complete", date: "2026-07-05" },
        { id: "ms-2", title: "First conveyor replay", date: "2026-07-12" },
      ],
    };
  }

  getBlueprints() {
    return TENANT_BLUEPRINTS;
  }

  getKnowledgeFlow() {
    return KNOWLEDGE_FLOW_STEPS;
  }

  // ─── Private ───────────────────────────────────────────────────────────

  private computeFactoryLoad(): number {
    const working = this.getDepartments().filter((d) => d.state === "working").length;
    return Math.round((working / TENANT_IDS.length) * 100);
  }

  private computeFactoryHealth(): HealthState {
    const depts = this.getDepartments();
    if (depts.some((d) => d.health === "emergency")) return "emergency";
    if (depts.some((d) => d.health === "degraded" || d.state === "blocked")) return "degraded";
    return "healthy";
  }

  private missionPercent(m: Mission): number {
    const tasks = m.objectives.flatMap((o) => o.projects.flatMap((p) => p.tasks));
    if (tasks.length === 0) return 0;
    const done = tasks.filter((t) => t.status === "done").length;
    return Math.round((done / tasks.length) * 100);
  }

  private recordHistory(category: string, summary: string, source: TenantId | "factory", missionId?: string): void {
    this.history.unshift({
      id: `hist-${uid()}`,
      timestamp: now(),
      category,
      summary,
      source,
      searchable: true,
      missionId,
    });
    if (this.history.length > 500) this.history.pop();
  }

  private addQueueItem(tenantId: TenantId, column: QueueColumn, title: string, objectId?: string): void {
    this.queues.push({
      id: `q-${uid()}`,
      tenantId,
      column,
      title,
      objectId,
      updatedAt: now(),
    });
  }

  private addMail(
    type: MailItem["type"],
    sender: TenantId | "factory",
    recipient: TenantId | "factory",
    subject: string,
    priority: MailItem["priority"]
  ): void {
    this.mail.unshift({
      id: `mail-${uid()}`,
      type,
      sender,
      recipient,
      subject,
      priority,
      status: "in-transit",
      createdAt: now(),
      history: [
        { timestamp: now(), location: "Factory Mailroom", action: "Received and routed" },
      ],
    });
  }

  private initDepartments(): void {
    const states: Record<TenantId, { state: DepartmentState; work: string; health: HealthState }> = {
      prime: { state: "working", work: "Cross-mission reasoning", health: "healthy" },
      toolbelt: { state: "idle", work: "Curating evening selection", health: "healthy" },
      bosslady: { state: "working", work: "Compiling operations layer", health: "healthy" },
      citadel: { state: "working", work: "Indexing operational history", health: "healthy" },
      forge: { state: "waiting", work: "Awaiting venture approval", health: "healthy" },
      flippy: { state: "working", work: "Staging v0.2.0 release", health: "healthy" },
      fip: { state: "working", work: "Benchmark sweep in progress", health: "healthy" },
      observatory: { state: "working", work: "12 live feeds active", health: "healthy" },
      sentinel: { state: "idle", work: "Monitoring access patterns", health: "healthy" },
    };

    for (const id of TENANT_IDS) {
      const s = states[id];
      this.departments.set(id, {
        tenantId: id,
        state: s.state,
        health: s.health,
        currentWork: s.work,
        queueDepth: Math.floor(Math.random() * 5) + 1,
        lastUpdated: now(),
      });
    }
  }

  private seedMissions(): void {
    this.missions = [
      {
        id: "mission-titan",
        title: "Project Titan — Erect the Campus",
        description: "Build the spatial headquarters. Establish spatial memory.",
        owner: "prime",
        health: "on-track",
        startedAt: "2026-07-01T00:00:00Z",
        objectives: [
          {
            id: "obj-campus",
            missionId: "mission-titan",
            title: "Erect Titan Campus",
            owner: "bosslady",
            projects: [
              {
                id: "proj-buildings",
                objectiveId: "obj-campus",
                title: "Building Shells",
                owner: "bosslady",
                tasks: [
                  { id: "task-tower", projectId: "proj-buildings", title: "The Tower (3 floors)", owner: "bosslady", status: "done", evidence: [] },
                  { id: "task-campus", projectId: "proj-buildings", title: "Radial campus map", owner: "bosslady", status: "done", evidence: [] },
                  { id: "task-garden", projectId: "proj-buildings", title: "The Garden", owner: "bosslady", status: "done", evidence: [] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "mission-nexus",
        title: "Project Nexus — Shared Infrastructure",
        description: "Build the invisible layer tenants cooperate through.",
        owner: "prime",
        health: "complete",
        startedAt: "2026-07-04T00:00:00Z",
        objectives: [
          {
            id: "obj-nexus",
            missionId: "mission-nexus",
            title: "Shared Services",
            owner: "bosslady",
            projects: [
              {
                id: "proj-services",
                objectiveId: "obj-nexus",
                title: "18 Shared Services",
                owner: "bosslady",
                tasks: [
                  { id: "task-registry", projectId: "proj-services", title: "Object Registry", owner: "bosslady", status: "done", evidence: [] },
                  { id: "task-bus", projectId: "proj-services", title: "Event Bus", owner: "bosslady", status: "done", evidence: [] },
                  { id: "task-contract", projectId: "proj-services", title: "Factory Contract", owner: "citadel", status: "done", evidence: [] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "mission-ops",
        title: "Project Operations — Company OS",
        description: "Build the operational layer. Missions, queues, conveyor, mailroom.",
        owner: "prime",
        health: "on-track",
        startedAt: "2026-07-05T00:00:00Z",
        objectives: [
          {
            id: "obj-ops",
            missionId: "mission-ops",
            title: "Operational Infrastructure",
            owner: "bosslady",
            projects: [
              {
                id: "proj-ops",
                objectiveId: "obj-ops",
                title: "Operations Runtime",
                owner: "bosslady",
                tasks: [
                  { id: "task-missions", projectId: "proj-ops", title: "Mission System", owner: "bosslady", status: "working", evidence: [] },
                  { id: "task-conveyor", projectId: "proj-ops", title: "Conveyor System", owner: "bosslady", status: "working", evidence: [] },
                  { id: "task-mailroom", projectId: "proj-ops", title: "Factory Mailroom", owner: "bosslady", status: "inbox", evidence: [] },
                  { id: "task-watchboard", projectId: "proj-ops", title: "The Watchboard", owner: "prime", status: "waiting", evidence: [] },
                ],
              },
            ],
          },
        ],
      },
    ];

    for (const m of this.missions) {
      m.health = this.getMissionHealth(m);
    }
  }

  private seedRequests(): void {
    this.requests = [
      {
        id: "req-001",
        from: "prime",
        to: "bosslady",
        title: "Implement Operations Runtime",
        description: "Build FactoryOperations class with missions, queues, conveyor, mailroom.",
        priority: "high",
        status: "in-progress",
        submittedAt: "2026-07-05T00:00:00Z",
        updatedAt: now(),
        history: [
          { timestamp: "2026-07-05T00:00:00Z", action: "Request submitted", actor: "prime" },
          { timestamp: "2026-07-05T00:15:00Z", action: "Status → accepted", actor: "bosslady" },
          { timestamp: "2026-07-05T00:30:00Z", action: "Status → in-progress", actor: "bosslady" },
        ],
      },
      {
        id: "req-002",
        from: "forge",
        to: "prime",
        title: "Review NASA venture proposal",
        description: "Forge detected 2 business ideas around NASA integration. Needs strategic review.",
        priority: "normal",
        status: "submitted",
        submittedAt: "2026-07-05T01:00:00Z",
        updatedAt: "2026-07-05T01:00:00Z",
        history: [
          { timestamp: "2026-07-05T01:00:00Z", action: "Request submitted", actor: "forge" },
        ],
      },
      {
        id: "req-003",
        from: "flippy",
        to: "fip",
        title: "Benchmark v0.2.0 release candidate",
        description: "Release candidate staged. Need FIP benchmark sweep before ship.",
        priority: "high",
        status: "accepted",
        submittedAt: "2026-07-04T22:00:00Z",
        updatedAt: "2026-07-04T22:30:00Z",
        history: [
          { timestamp: "2026-07-04T22:00:00Z", action: "Request submitted", actor: "flippy" },
          { timestamp: "2026-07-04T22:30:00Z", action: "Status → accepted", actor: "fip" },
        ],
      },
    ];
  }

  private seedQueues(): void {
    const seed: { tenant: TenantId; column: QueueColumn; title: string }[] = [
      { tenant: "bosslady", column: "working", title: "Operations runtime implementation" },
      { tenant: "bosslady", column: "inbox", title: "Review Forge venture proposal deps" },
      { tenant: "prime", column: "working", title: "Mission ops strategic alignment" },
      { tenant: "prime", column: "waiting", title: "Awaiting Forge NASA review input" },
      { tenant: "forge", column: "waiting", title: "Venture proposal pending Prime review" },
      { tenant: "flippy", column: "working", title: "Package v0.2.0 release candidate" },
      { tenant: "fip", column: "working", title: "Benchmark sweep — v0.2.0 RC" },
      { tenant: "citadel", column: "working", title: "Archive Master Prompt 003" },
      { tenant: "toolbelt", column: "inbox", title: "New media feed from Observatory" },
      { tenant: "observatory", column: "working", title: "Monitor 12 live world feeds" },
    ];
    for (const s of seed) {
      this.addQueueItem(s.tenant, s.column, s.title);
    }
  }

  private seedMail(): void {
    const items: Omit<MailItem, "id" | "createdAt" | "history">[] = [
      { type: "build-request", sender: "prime", recipient: "bosslady", subject: "Implement Operations Runtime", priority: "high", status: "delivered" },
      { type: "review-request", sender: "forge", recipient: "prime", subject: "NASA venture proposal review", priority: "normal", status: "in-transit" },
      { type: "release-package", sender: "flippy", recipient: "fip", subject: "v0.2.0 RC benchmark package", priority: "high", status: "delivered" },
      { type: "daily-briefing", sender: "factory", recipient: "prime", subject: "Morning Daily Brief — July 5", priority: "normal", status: "read" },
      { type: "metrics-report", sender: "fip", recipient: "factory", subject: "Weekly benchmark summary", priority: "low", status: "delivered" },
      { type: "research-report", sender: "forge", recipient: "citadel", subject: "NASA market signal analysis", priority: "normal", status: "in-transit" },
    ];
    for (const item of items) {
      this.mail.push({
        ...item,
        id: `mail-${uid()}`,
        createdAt: now(),
        history: [
          { timestamp: now(), location: "Factory Mailroom", action: "Received" },
          { timestamp: now(), location: "Routing", action: `Routed to ${item.recipient}` },
        ],
      });
    }
  }

  private seedConveyor(): void {
    this.conveyor = [
      {
        id: "conv-nasa",
        title: "NASA Signal → Integration Pipeline",
        type: "Signal",
        currentStage: "build",
        currentTenant: "bosslady",
        status: "moving",
        startedAt: "2026-07-04T10:00:00Z",
        stages: [
          { stage: "observe", tenantId: "observatory", enteredAt: "2026-07-04T10:00:00Z", exitedAt: "2026-07-04T10:30:00Z", artifactType: "Signal" },
          { stage: "capture", tenantId: "sentinel", enteredAt: "2026-07-04T10:30:00Z", exitedAt: "2026-07-04T11:00:00Z", artifactType: "Change" },
          { stage: "reason", tenantId: "prime", enteredAt: "2026-07-04T11:00:00Z", exitedAt: "2026-07-04T14:00:00Z", artifactType: "Decision" },
          { stage: "invent", tenantId: "forge", enteredAt: "2026-07-04T14:00:00Z", exitedAt: "2026-07-04T16:00:00Z", artifactType: "Venture Proposal" },
          { stage: "build", tenantId: "bosslady", enteredAt: "2026-07-04T16:00:00Z", artifactType: "Build" },
        ],
      },
      {
        id: "conv-ops",
        title: "Operations Layer Artifact",
        type: "Project",
        currentStage: "reason",
        currentTenant: "prime",
        status: "moving",
        startedAt: "2026-07-05T00:00:00Z",
        stages: [
          { stage: "observe", tenantId: "observatory", enteredAt: "2026-07-05T00:00:00Z", exitedAt: "2026-07-05T00:10:00Z", artifactType: "Signal" },
          { stage: "reason", tenantId: "prime", enteredAt: "2026-07-05T00:10:00Z", artifactType: "Decision" },
        ],
      },
    ];
  }

  private seedHistory(): void {
    const entries: { cat: string; sum: string; src: TenantId | "factory" }[] = [
      { cat: "mission.started", sum: "Mission started: Project Operations", src: "prime" },
      { cat: "mission.started", sum: "Mission started: Project Nexus", src: "prime" },
      { cat: "release.failed", sum: "Release v0.1.9 rollback detected", src: "flippy" },
      { cat: "regression.detected", sum: "FIP detected latency regression in search index", src: "fip" },
      { cat: "media.imported", sum: "Toolbelt imported 14 NASA documentary titles", src: "toolbelt" },
      { cat: "decision.changed", sum: "Prime updated NASA integration strategy", src: "prime" },
      { cat: "repository.archived", sum: "Citadel archived legacy-v0.0.9 branch", src: "citadel" },
      { cat: "source.deprecated", sum: "Observatory deprecated RSS feed source #7", src: "observatory" },
    ];
    for (const e of entries) {
      this.recordHistory(e.cat, e.sum, e.src);
    }
  }

  private seedOwnership(): void {
    this.ownedObjects = [
      { objectId: "obj-nasa-001", type: "media", title: "NASA", owner: "toolbelt", contributors: ["prime", "citadel", "bosslady", "forge", "flippy", "fip"] },
      { objectId: "obj-project-titan", type: "project", title: "Project Titan", owner: "bosslady", contributors: ["prime", "citadel", "fip"] },
      { objectId: "mission-ops", type: "mission", title: "Project Operations", owner: "prime", contributors: ["bosslady", "citadel", "fip"] },
    ];
  }
}

export const operations = new FactoryOperations();
