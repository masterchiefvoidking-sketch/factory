"use client";

import { useOperations } from "@/context/OperationsContext";
import { Watchboard } from "./Watchboard";
import { ConveyorView } from "./ConveyorView";
import { MailroomView } from "./MailroomView";

export function OperationsFloorInterior() {
  const { logistics, architectRule, history } = useOperations();

  return (
    <div className="factory-scroll h-full overflow-y-auto">
      <div className="border-b border-factory-accent-dim/20 px-8 py-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-factory-text-muted">
          Underground · Project Operations
        </p>
        <h1 className="text-2xl font-light text-[#e8b86d]">Factory Operations</h1>
        <p className="mt-2 text-sm italic text-factory-text-muted">
          The operating system of the company. Not software. A functioning organization.
        </p>
      </div>

      <div className="space-y-8 p-8">
        <blockquote className="border-l-2 border-[#e8b86d] pl-4 text-sm italic text-factory-text-muted">
          &ldquo;{architectRule}&rdquo;
        </blockquote>

        <Watchboard />

        <div className="grid gap-6 lg:grid-cols-2">
          <ConveyorView />
          <MailroomView />
        </div>

        {/* Logistics */}
        <section>
          <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
            Factory Logistics
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            <LogisticsStat label="Scheduled" value={String(logistics.scheduledJobs)} />
            <LogisticsStat label="Queues" value={String(logistics.activeQueues)} />
            <LogisticsStat label="Retries" value={String(logistics.pendingRetries)} />
            <LogisticsStat label="Backpressure" value={logistics.backpressure} />
            <LogisticsStat label="Audit Today" value={String(logistics.auditEntriesToday)} />
            <LogisticsStat label="Maintenance" value={logistics.maintenanceWindow ?? "None"} />
          </div>
        </section>

        {/* Operational History */}
        <section>
          <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
            Operational History
          </h2>
          <p className="mb-3 text-[10px] text-factory-text-muted">
            Every significant event. Permanently searchable. Nothing disappears.
          </p>
          <div className="max-h-48 space-y-1 overflow-y-auto">
            {history.slice(0, 12).map((h) => (
              <div key={h.id} className="flex gap-3 border-l-2 border-factory-accent-dim/20 py-1 pl-3">
                <span className="font-mono text-[9px] text-factory-text-muted whitespace-nowrap">
                  {new Date(h.timestamp).toLocaleString()}
                </span>
                <span className="font-mono text-[9px] text-factory-accent">{h.category}</span>
                <span className="text-[10px] text-factory-text">{h.summary}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function LogisticsStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-factory-accent-dim/10 bg-factory-bg-elevated/20 p-2 text-center">
      <p className="text-[8px] uppercase tracking-wider text-factory-text-muted">{label}</p>
      <p className="mt-0.5 text-xs capitalize text-factory-text">{value}</p>
    </div>
  );
}
