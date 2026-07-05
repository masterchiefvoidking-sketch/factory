"use client";

import { useOperations } from "@/context/OperationsContext";
import { TENANTS } from "@/nexus/tenants";
import { KNOWLEDGE_FLOW_STEPS } from "@/operations/types";

export function ConveyorView() {
  const { conveyor, advanceConveyor, pauseConveyor } = useOperations();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
          The Conveyor System
        </h2>
        <p className="text-[10px] text-factory-text-muted">
          Every artifact moves through the Factory. Watch it. Pause it. Inspect it. Replay it.
        </p>
      </div>

      {/* Knowledge flow pipeline */}
      <div className="flex flex-wrap items-center justify-center gap-1 py-4">
        {KNOWLEDGE_FLOW_STEPS.map((step, i) => (
          <div key={step.stage} className="flex items-center gap-1">
            <div className="rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/30 px-2 py-1 text-center">
              <p className="text-[8px] uppercase tracking-wider text-factory-text-muted">{step.label}</p>
              <p className="text-[9px]" style={{ color: TENANTS[step.tenant].badgeColor }}>
                {TENANTS[step.tenant].name}
              </p>
            </div>
            {i < KNOWLEDGE_FLOW_STEPS.length - 1 && (
              <span className="text-factory-accent-dim">↓</span>
            )}
          </div>
        ))}
      </div>

      {/* Active artifacts */}
      <div className="space-y-3">
        {conveyor.map((artifact) => (
          <div
            key={artifact.id}
            className="rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/20 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-factory-text">{artifact.title}</p>
                <p className="text-[10px] text-factory-text-muted">
                  {artifact.type} · Currently at{" "}
                  <span style={{ color: TENANTS[artifact.currentTenant].badgeColor }}>
                    {TENANTS[artifact.currentTenant].name}
                  </span>
                  {" "}· {artifact.currentStage}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => advanceConveyor(artifact.id)}
                  disabled={artifact.status === "complete"}
                  className="rounded border border-factory-accent-dim/30 px-2 py-1 text-[9px] uppercase tracking-wider text-factory-accent hover:bg-factory-accent/10 disabled:opacity-30"
                >
                  Advance
                </button>
                <button
                  onClick={() => pauseConveyor(artifact.id)}
                  className="rounded border border-factory-accent-dim/30 px-2 py-1 text-[9px] uppercase tracking-wider text-factory-text-muted hover:bg-factory-bg-elevated"
                >
                  {artifact.status === "paused" ? "Resume" : "Pause"}
                </button>
              </div>
            </div>

            {/* Stage trail */}
            <div className="mt-3 flex flex-wrap gap-1">
              {artifact.stages.map((s, i) => (
                <span
                  key={i}
                  className={`rounded px-1.5 py-0.5 text-[8px] uppercase tracking-wider ${
                    s.stage === artifact.currentStage
                      ? "bg-factory-accent/20 text-factory-accent"
                      : s.exitedAt
                        ? "bg-factory-bg-deep text-factory-text-muted/50"
                        : "bg-factory-bg-elevated text-factory-text-muted"
                  }`}
                >
                  {s.stage}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
