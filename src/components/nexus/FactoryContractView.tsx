"use client";

import { useNexus } from "@/context/NexusContext";

export function FactoryContractView() {
  const { contract, clauses } = useNexus();
  const may = clauses.filter((c) => c.type === "may");
  const mayNot = clauses.filter((c) => c.type === "may-not");

  return (
    <section>
      <h2 className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
        The Factory Contract
      </h2>
      <p className="mb-4 text-[10px] text-factory-text-muted">
        v{contract.version} · {contract.parties}
      </p>

      <div className="rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/20 p-4">
        <p className="mb-4 text-xs italic text-factory-text-muted">{contract.preamble}</p>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-green-400">
              May
            </p>
            <ul className="space-y-1.5">
              {may.map((c) => (
                <li key={c.id} className="flex gap-2 text-xs text-factory-text">
                  <span className="text-green-400">✓</span>
                  {c.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-red-400">
              May Not
            </p>
            <ul className="space-y-1.5">
              {mayNot.map((c) => (
                <li key={c.id} className="flex gap-2 text-xs text-factory-text">
                  <span className="text-red-400">✗</span>
                  {c.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
