"use client";

import type { DepartmentId } from "@/departments/types";
import { useDepartments } from "@/context/DepartmentsContext";
import { TENANTS } from "@/nexus/tenants";

const HEALTH_COLORS = { healthy: "#2ecc71", degraded: "#f39c12", emergency: "#e74c3c" };

export function DepartmentDashboardPanel({ departmentId }: { departmentId: DepartmentId }) {
  const { departments, dashboards } = useDepartments();
  const dept = departments[departmentId];
  const dash = dashboards[departmentId];

  return (
    <section className="rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/20 p-4"
      style={{ borderTopColor: dept.accent, borderTopWidth: 2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-factory-text-muted">
            {dept.name}
          </p>
          <p className="text-sm italic text-factory-text">{dept.purpose}</p>
        </div>
        <div className="text-right text-[10px]">
          <p style={{ color: HEALTH_COLORS[dash.health] }}>{dash.health}</p>
          <p className="text-factory-text-muted">Load {dash.load}%</p>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <DashSection title="Workers">
          {dept.workers.map((w) => (
            <div key={w} className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: TENANTS[w].badgeColor }} />
              {TENANTS[w].name}
            </div>
          ))}
        </DashSection>
        <DashSection title="Current Work" items={dash.currentWork} />
        <DashSection title="Blocked" items={dash.blockedWork} empty="None" />
        <DashSection title="Recent Successes" items={dash.recentSuccesses} />
        <DashSection title="Upcoming Objectives" items={dash.upcomingObjectives} />
        <DashSection title="Produces" items={dept.produces} />
      </div>
    </section>
  );
}

function DashSection({
  title,
  items,
  empty,
  children,
}: {
  title: string;
  items?: string[];
  empty?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-factory-text-muted">{title}</p>
      {children ?? (
        <ul className="mt-1 space-y-0.5">
          {(items ?? []).length === 0 ? (
            <li className="text-[10px] text-factory-text-muted">{empty ?? "—"}</li>
          ) : (
            items!.map((item, i) => (
              <li key={i} className="text-[10px] text-factory-text">· {item}</li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
