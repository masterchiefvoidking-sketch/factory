"use client";

import { useOperations } from "@/context/OperationsContext";
import { TENANTS } from "@/nexus/tenants";

const STATE_COLORS: Record<string, string> = {
  idle: "#95a5a6",
  working: "#2ecc71",
  waiting: "#f39c12",
  blocked: "#e74c3c",
  review: "#9b59b6",
  maintenance: "#e67e22",
  offline: "#7f8c8d",
};

export function CommandCenter() {
  const { commandCenter, clock } = useOperations();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
            Command Center
          </h2>
          <p className="text-[10px] text-factory-text-muted">
            {clock.operationalDay} · {clock.factoryTime} · {clock.shiftLabel}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-light text-factory-accent">{commandCenter.factoryLoad}%</p>
          <p className="text-[9px] uppercase tracking-wider text-factory-text-muted">Factory Load</p>
        </div>
      </div>

      {/* Mission Progress */}
      <section>
        <p className="mb-2 text-[10px] uppercase tracking-wider text-factory-text-muted">Mission Progress</p>
        <div className="space-y-2">
          {commandCenter.missionProgress.map((m) => (
            <div key={m.missionId}>
              <div className="flex justify-between text-xs">
                <span className="text-factory-text">{m.title}</span>
                <span className="text-factory-text-muted">{m.percent}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-factory-bg-deep">
                <div
                  className="h-full rounded-full bg-factory-accent transition-all"
                  style={{ width: `${m.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Department Health */}
      <section>
        <p className="mb-2 text-[10px] uppercase tracking-wider text-factory-text-muted">Department Health</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {commandCenter.departmentHealth.map((d) => {
            const tenant = TENANTS[d.tenantId];
            return (
              <div
                key={d.tenantId}
                className="rounded border border-factory-accent-dim/10 bg-factory-bg-elevated/20 p-2 text-center"
              >
                <span className="text-sm">{tenant.name.charAt(0)}</span>
                <p className="mt-1 text-[9px] text-factory-text-muted truncate">{tenant.name}</p>
                <p
                  className="mt-0.5 text-[8px] uppercase tracking-wider"
                  style={{ color: STATE_COLORS[d.state] }}
                >
                  {d.state}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Critical Alerts */}
      {commandCenter.criticalAlerts.length > 0 && (
        <section>
          <p className="mb-2 text-[10px] uppercase tracking-wider text-red-400">Critical Alerts</p>
          {commandCenter.criticalAlerts.map((a) => (
            <p key={a.id} className="text-xs text-red-300">⚠ {a.message}</p>
          ))}
        </section>
      )}

      {/* Recent Decisions */}
      <section>
        <p className="mb-2 text-[10px] uppercase tracking-wider text-factory-text-muted">Recent Decisions</p>
        <div className="space-y-1">
          {commandCenter.recentDecisions.map((d) => (
            <div key={d.id} className="flex gap-2 text-xs">
              <span className="text-factory-text-muted">{new Date(d.timestamp).toLocaleTimeString()}</span>
              <span className="text-factory-text">{d.summary}</span>
            </div>
          ))}
          {commandCenter.recentDecisions.length === 0 && (
            <p className="text-xs text-factory-text-muted">No recent decisions</p>
          )}
        </div>
      </section>

      {/* Milestones */}
      <section>
        <p className="mb-2 text-[10px] uppercase tracking-wider text-factory-text-muted">Upcoming Milestones</p>
        {commandCenter.upcomingMilestones.map((m) => (
          <div key={m.id} className="flex justify-between border-b border-factory-accent-dim/10 py-1.5 text-xs">
            <span className="text-factory-text">{m.title}</span>
            <span className="text-factory-text-muted">{m.date}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
