"use client";

import { useNexus } from "@/context/NexusContext";
import { TENANTS } from "@/nexus/tenants";

export function ObjectRegistryView() {
  const { objects } = useNexus();

  return (
    <section>
      <h2 className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
        The Object Registry
      </h2>
      <p className="mb-4 text-[10px] text-factory-text-muted">
        ONE object. ONE ID. Different perspectives.
      </p>

      <div className="space-y-4">
        {objects.map((obj) => (
          <div
            key={obj.id}
            className="rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/20 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] text-factory-accent">{obj.id}</p>
                <p className="text-sm font-medium text-factory-text">
                  {obj.title}
                  <span className="ml-2 text-[10px] uppercase text-factory-text-muted">
                    {obj.type}
                  </span>
                </p>
                {obj.description && (
                  <p className="mt-1 text-xs text-factory-text-muted">{obj.description}</p>
                )}
              </div>
            </div>

            <div className="mt-3 border-t border-factory-accent-dim/10 pt-3">
              <p className="mb-2 text-[9px] uppercase tracking-wider text-factory-text-muted">
                Perspectives
              </p>
              <div className="grid gap-1 sm:grid-cols-2">
                {obj.perspectives.map((p) => {
                  const tenant = TENANTS[p.tenantId];
                  return (
                    <div
                      key={p.tenantId}
                      className="flex items-center gap-2 rounded bg-factory-bg-deep/50 px-2 py-1.5"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: tenant.badgeColor }}
                      />
                      <span className="text-[10px] font-medium" style={{ color: tenant.badgeColor }}>
                        {tenant.name}
                      </span>
                      <span className="text-[10px] text-factory-text-muted">· {p.summary}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
