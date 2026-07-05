"use client";

import type { TenantId } from "@/nexus/types";
import { useOperations } from "@/context/OperationsContext";
import { TENANTS } from "@/nexus/tenants";

export function FactoryBlueprint({ tenantId }: { tenantId: TenantId }) {
  const { blueprints } = useOperations();
  const blueprint = blueprints[tenantId];
  if (!blueprint) return null;

  const tenant = TENANTS[tenantId];
  const healthColor = blueprint.health === "healthy" ? "#2ecc71" : blueprint.health === "degraded" ? "#f39c12" : "#e74c3c";

  return (
    <section>
      <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
        Factory Blueprint
      </h2>
      <p className="mb-3 text-[10px] text-factory-text-muted">
        Mounted outside the entrance. Understand this department at a glance.
      </p>

      <div
        className="rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/30 p-4"
        style={{ borderTopColor: tenant.badgeColor, borderTopWidth: 2 }}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium" style={{ color: tenant.badgeColor }}>{tenant.name}</p>
          <div className="text-right text-[9px]">
            <p className="text-factory-text-muted">v{blueprint.version}</p>
            <p style={{ color: healthColor }}>{blueprint.health}</p>
          </div>
        </div>

        <p className="mt-2 text-xs text-factory-text">{blueprint.purpose}</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <BlueprintSection title="Inputs" items={blueprint.inputs} />
          <BlueprintSection title="Outputs" items={blueprint.outputs} />
          <BlueprintSection title="Shared Services" items={blueprint.sharedServices} />
          <BlueprintSection title="Owned Objects" items={blueprint.ownedObjects} />
        </div>

        {blueprint.dependencies.length > 0 && (
          <div className="mt-3 border-t border-factory-accent-dim/10 pt-3">
            <p className="text-[9px] uppercase tracking-wider text-factory-text-muted">Dependencies</p>
            <p className="mt-1 text-xs text-factory-text">
              {blueprint.dependencies.map((d) => TENANTS[d].name).join(" · ")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function BlueprintSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-factory-text-muted">{title}</p>
      <ul className="mt-1 space-y-0.5">
        {items.map((item) => (
          <li key={item} className="text-[10px] text-factory-text">· {item}</li>
        ))}
      </ul>
    </div>
  );
}
