"use client";

import { useNexus } from "@/context/NexusContext";
import { TENANTS } from "@/nexus/tenants";

export function SkybridgeDiagram() {
  const { skybridges } = useNexus();

  return (
    <div className="rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/20 p-6">
      <h2 className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
        The Skybridge System
      </h2>
      <p className="mb-6 text-[10px] text-factory-text-muted">
        Architectural connections between tenants. Not API diagrams.
      </p>

      <div className="font-mono text-xs leading-relaxed text-factory-text-muted">
        {skybridges.map((bridge) => {
          const tenant = TENANTS[bridge.from];
          return (
            <div key={bridge.id} className="mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: tenant.badgeColor }}
                />
                <span className="font-medium text-factory-text">{tenant.name}</span>
              </div>
              <div className="ml-1 border-l border-factory-accent-dim/30 pl-4">
                <p className="text-factory-accent">
                  ├────{bridge.carries}────────────┐
                </p>
                <p className="mt-1 pl-4 text-[10px] italic">{bridge.description}</p>
                <p className="mt-0.5 pl-4 text-[9px] text-factory-text-muted/60">
                  Objects: {bridge.objectTypes.join(", ")}
                </p>
              </div>
            </div>
          );
        })}
        <p className="mt-2 text-factory-accent">└─────────────────────────────────┘</p>
      </div>
    </div>
  );
}
