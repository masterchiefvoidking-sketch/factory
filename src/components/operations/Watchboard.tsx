"use client";

import { useOperations } from "@/context/OperationsContext";

const HEALTH_COLORS = { healthy: "#2ecc71", degraded: "#f39c12", emergency: "#e74c3c" };
const MISSION_COLORS = { "on-track": "#2ecc71", "at-risk": "#f39c12", blocked: "#e74c3c", complete: "#3498db" };

export function Watchboard() {
  const { watchboard, clock } = useOperations();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
          The Watchboard
        </h2>
        <span className="text-[10px] text-factory-text-muted">
          {clock.shiftLabel} · Load {watchboard.factoryLoad}%
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Factory Health" value={watchboard.factoryHealth} color={HEALTH_COLORS[watchboard.factoryHealth]} />
        <StatCard label="Active Missions" value={String(watchboard.currentMissions.length)} />
        <StatCard label="Blocked" value={String(watchboard.blockedMissions.length)} color={watchboard.blockedMissions.length > 0 ? "#e74c3c" : undefined} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Current Missions">
          {watchboard.currentMissions.map((m) => (
            <div key={m.id} className="flex items-center justify-between border-b border-factory-accent-dim/10 py-2 last:border-0">
              <div>
                <p className="text-xs text-factory-text">{m.title}</p>
                <p className="text-[10px] text-factory-text-muted">Owner: {m.owner}</p>
              </div>
              <span className="text-[10px] uppercase" style={{ color: MISSION_COLORS[m.health] }}>{m.health}</span>
            </div>
          ))}
        </Panel>

        <Panel title="Waiting Approvals">
          {watchboard.waitingApprovals.length === 0 ? (
            <p className="text-xs text-factory-text-muted">None</p>
          ) : (
            watchboard.waitingApprovals.map((r) => (
              <div key={r.id} className="border-b border-factory-accent-dim/10 py-2 last:border-0">
                <p className="text-xs text-factory-text">{r.title}</p>
                <p className="text-[10px] text-factory-text-muted">{r.from} → {r.to} · {r.status}</p>
              </div>
            ))
          )}
        </Panel>

        <Panel title="Upcoming Releases">
          {watchboard.upcomingReleases.map((r) => (
            <div key={r.id} className="flex justify-between border-b border-factory-accent-dim/10 py-2 last:border-0">
              <p className="text-xs text-factory-text">{r.title}</p>
              <span className="text-[10px] text-factory-accent">{r.eta}</span>
            </div>
          ))}
        </Panel>

        <Panel title="Recently Completed">
          {watchboard.recentlyCompleted.map((r) => (
            <div key={r.id} className="border-b border-factory-accent-dim/10 py-2 last:border-0">
              <p className="text-xs text-factory-text">{r.title}</p>
              <p className="text-[10px] text-factory-text-muted">
                {new Date(r.completedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/30 p-3 text-center">
      <p className="text-[9px] uppercase tracking-wider text-factory-text-muted">{label}</p>
      <p className="mt-1 text-sm font-medium capitalize" style={{ color }}>{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/20 p-3">
      <p className="mb-2 text-[10px] uppercase tracking-wider text-factory-text-muted">{title}</p>
      {children}
    </div>
  );
}
