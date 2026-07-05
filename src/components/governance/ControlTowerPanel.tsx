"use client";

import { REPOSITORY_REGISTRY } from "@/governance/registry";
import { OPEN_REPAIR_ITEMS } from "@/governance/repair-queue";
import { FACTORY_STATUS_TABLE, PROOF_SUMMARY } from "@/governance/status";
import type { HealthStatus } from "@/governance/types";

const HEALTH_COLORS: Record<HealthStatus, string> = {
  green: "#2ecc71",
  yellow: "#f1c40f",
  orange: "#e67e22",
  red: "#e74c3c",
  gray: "#95a5a6",
};

/**
 * Static ecosystem registry — NOT live CI.
 * Source: docs/governance/ + src/governance/ (Project 005)
 */
export function ControlTowerPanel() {
  const audited = REPOSITORY_REGISTRY.filter((r) => r.auditScore !== null);
  const unknown = REPOSITORY_REGISTRY.filter((r) => r.auditScore === null);
  const topRepairs = OPEN_REPAIR_ITEMS.slice(0, 5);

  return (
    <section className="rounded border border-amber-500/40 bg-amber-500/5 p-4">
      <div className="mb-4 border-b border-amber-500/20 pb-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-amber-400">
          Control Tower · Ecosystem Registry
        </p>
        <p className="mt-1 text-[10px] text-factory-text-muted">
          STATIC DATA · Project Governance 005 · Not live CI · Source: forensic audits
        </p>
        <p className="mt-1 text-[9px] italic text-factory-text-muted/70">
          docs/governance/ — update registry after each repo audit
        </p>
      </div>

      {/* Proof #001 — static, not live */}
      <div className="mb-4 rounded border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
        <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">
          Certification proof (static)
        </p>
        <p className="mt-1 text-xs text-factory-text">{PROOF_SUMMARY}</p>
        <p className="mt-1 text-[9px] italic text-factory-text-muted/70">
          Not live CI · manual JSON import only · see FACTORY_PROOF_LOG.md
        </p>
      </div>

      {/* Audited repos */}
      <div className="mb-4">
        <p className="mb-2 text-[10px] uppercase tracking-wider text-factory-text-muted">
          Audited repositories ({audited.length})
        </p>
        <div className="space-y-2">
          {audited.map((repo) => {
            const status = FACTORY_STATUS_TABLE.find(
              (s) =>
                s.repo.includes(repo.id) ||
                (repo.id === "factory-core" && s.repo === "factory-core") ||
                (repo.id === "factory" && s.repo === "factory")
            );
            return (
              <div
                key={repo.id}
                className="flex flex-wrap items-center gap-2 rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/30 px-3 py-2"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: HEALTH_COLORS[repo.health] }}
                  title={repo.health}
                />
                <span className="text-xs font-medium text-factory-text">
                  {repo.canonicalName}
                </span>
                <span className="text-[9px] text-factory-text-muted">
                  L{repo.maturity === "beta" ? "3" : repo.maturity === "prototype" ? "2" : "?"}
                </span>
                {repo.auditScore !== null && (
                  <span className="text-[9px] text-factory-accent">
                    audit {repo.auditScore}/100
                  </span>
                )}
                <span className="text-[9px] uppercase text-factory-text-muted">
                  {repo.integrationStatus}
                </span>
                {status && (
                  <span
                    className="ml-auto text-[9px] uppercase"
                    style={{ color: HEALTH_COLORS[status.overall] }}
                  >
                    {status.overall}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Unknown count */}
      <div className="mb-4">
        <p className="mb-1 text-[10px] uppercase tracking-wider text-factory-text-muted">
          Unaudited programs
        </p>
        <p className="text-xs text-factory-text-muted">
          {unknown.length} tenants — status{" "}
          <span style={{ color: HEALTH_COLORS.gray }}>GRAY</span> · confidence low
        </p>
      </div>

      {/* Top repair queue */}
      <div>
        <p className="mb-2 text-[10px] uppercase tracking-wider text-factory-text-muted">
          Master repair queue (top 5)
        </p>
        <div className="space-y-1">
          {topRepairs.map((item) => (
            <div
              key={item.id}
              className="flex gap-2 border-l-2 border-factory-accent-dim/30 py-1 pl-2 text-[10px]"
            >
              <span className="font-mono text-factory-accent">{item.id}</span>
              <span className="text-factory-text-muted">{item.repo}</span>
              <span className="truncate text-factory-text">{item.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
