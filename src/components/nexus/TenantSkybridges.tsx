"use client";

import { SKYBRIDGES } from "@/nexus/skybridges";
import { TENANTS } from "@/nexus/tenants";
import type { BuildingId } from "@/domain/types";

const BUILDING_TO_TENANT: Partial<Record<BuildingId, keyof typeof TENANTS>> = {
  prime: "prime",
  toolbelt: "toolbelt",
  bosslady: "bosslady",
  citadel: "citadel",
  forge: "forge",
  flippy: "flippy",
  fip: "fip",
  observatory: "observatory",
};

export function TenantSkybridges({ buildingId }: { buildingId: BuildingId }) {
  const tenantId = BUILDING_TO_TENANT[buildingId];
  if (!tenantId) return null;

  const bridges = SKYBRIDGES.filter((b) => b.from === tenantId);
  const tenant = TENANTS[tenantId];
  if (bridges.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
        Skybridges
      </h2>
      <p className="mb-3 text-[10px] text-factory-text-muted">
        Architectural connections. Not API diagrams.
      </p>
      <div className="rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/30 p-4 font-mono text-xs">
        <p className="font-medium" style={{ color: tenant.badgeColor }}>
          {tenant.name}
        </p>
        {bridges.map((bridge) => (
          <p key={bridge.id} className="ml-2 mt-1 text-factory-text-muted">
            ├────{bridge.carries}────────────┐
          </p>
        ))}
        <p className="ml-2 mt-1 text-factory-accent/60">
          └─────────────────────────────────┘
        </p>
      </div>
    </section>
  );
}
