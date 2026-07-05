"use client";

/**
 * Points visitors to governance documentation in the repo.
 */
export function GovernanceNotice() {
  return (
    <section className="rounded border border-[#27ae60]/30 bg-[#27ae60]/5 p-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#27ae60]">
        Mill Governance · Control Tower
      </p>
      <p className="mt-2 text-xs text-factory-text-muted">
        The ecosystem registry, repair queue, release law, and maturity model live in{" "}
        <code className="text-[10px] text-factory-accent">docs/governance/</code>.
        Mission Control displays a static summary — not live CI.
      </p>
      <ul className="mt-3 space-y-1 text-[10px] text-factory-text-muted">
        <li>· REPOSITORY_REGISTRY.md — every known program</li>
        <li>· FACTORY_MASTER_REPAIR_QUEUE.md — ecosystem repair order</li>
        <li>· FACTORY_STATUS.md — health table (YELLOW/ORANGE/GRAY)</li>
        <li>· FACTORY_RELEASE_LAW.md — no fake green status</li>
      </ul>
    </section>
  );
}
