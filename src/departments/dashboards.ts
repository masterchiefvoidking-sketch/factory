import type { DepartmentDashboard, DepartmentId } from "./types";
import { DEPARTMENTS } from "./registry";
import { operations } from "@/operations/runtime";

/**
 * Build department dashboards from operations data.
 * Oversight only — no duplicate tenant functionality.
 */
export function buildDepartmentDashboards(): Record<DepartmentId, DepartmentDashboard> {
  const result = {} as Record<DepartmentId, DepartmentDashboard>;

  for (const deptId of Object.keys(DEPARTMENTS) as DepartmentId[]) {
    const dept = DEPARTMENTS[deptId];
    const deptStatuses = operations
      .getDepartments()
      .filter((d) => dept.workers.includes(d.tenantId));

    const health = deptStatuses.some((d) => d.health === "emergency")
      ? "emergency"
      : deptStatuses.some((d) => d.health === "degraded" || d.state === "blocked")
        ? "degraded"
        : "healthy";

    const working = deptStatuses.filter((d) => d.state === "working");
    const blocked = deptStatuses.filter((d) => d.state === "blocked" || d.state === "waiting");

    const queues = dept.workers.flatMap((w) => operations.getQueues(w));
    const currentWork = queues
      .filter((q) => q.column === "working")
      .map((q) => q.title);
    const blockedWork = queues
      .filter((q) => q.column === "blocked" || q.column === "waiting")
      .map((q) => q.title);

    const missions = operations.getMissions().filter((m) =>
      dept.workers.includes(m.owner as typeof dept.workers[number])
    );

    result[deptId] = {
      departmentId: deptId,
      mission: dept.purpose,
      health,
      load: Math.round(
        (working.length / Math.max(dept.workers.length, 1)) * 100
      ),
      currentWork: currentWork.length > 0
        ? currentWork
        : deptStatuses.map((d) => d.currentWork),
      blockedWork: blockedWork.length > 0
        ? blockedWork
        : blocked.map((d) => `${d.tenantId}: ${d.state}`),
      recentSuccesses: [
        `${dept.name} — all workers reporting`,
        ...missions.filter((m) => m.health === "complete").map((m) => m.title),
      ].slice(0, 3),
      upcomingObjectives: missions
        .filter((m) => m.health !== "complete")
        .map((m) => m.title)
        .slice(0, 3),
    };
  }

  return result;
}
