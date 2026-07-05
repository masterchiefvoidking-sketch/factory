"use client";

import { useDepartments } from "@/context/DepartmentsContext";

export function VisitorWelcome() {
  const { visitorGuide } = useDepartments();

  return (
    <section className="rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/20 p-6">
      <h2 className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
        Welcome to The Factory
      </h2>
      <p className="mb-4 text-sm text-factory-text-muted">
        {visitorGuide.whereToStart}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-wider text-factory-text-muted">
            Who works here
          </p>
          <div className="space-y-2">
            {visitorGuide.whoWorksHere.map((entry) => (
              <div key={entry.department} className="text-xs">
                <p className="font-medium text-factory-text">{entry.department}</p>
                <p className="text-factory-text-muted">
                  {entry.workers.join(", ")} — {entry.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-wider text-factory-text-muted">
            What you should understand
          </p>
          <ul className="space-y-1 text-xs text-factory-text-muted">
            <li>· Applications are <strong className="text-factory-text">workers</strong>, not departments</li>
            <li>· Departments <strong className="text-factory-text">own responsibility</strong></li>
            <li>· Factory Services support everyone — no department owns them</li>
            <li>· The Executive Floor sets vision — never operational work</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
