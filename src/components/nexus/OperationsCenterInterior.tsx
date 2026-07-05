"use client";

import { useNexus } from "@/context/NexusContext";
import { SkybridgeDiagram } from "./SkybridgeDiagram";

export function OperationsCenterInterior() {
  const { operations, events, activity, services } = useNexus();

  const healthColor =
    operations.systemHealth === "nominal"
      ? "#2ecc71"
      : operations.systemHealth === "degraded"
        ? "#f39c12"
        : "#e74c3c";

  return (
    <div className="factory-scroll h-full overflow-y-auto">
      <div className="border-b border-factory-accent-dim/20 px-8 py-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-factory-text-muted">
          Underground · Operations
        </p>
        <h1 className="text-2xl font-light text-[#1abc9c]">The Operations Center</h1>
        <p className="mt-2 text-sm italic text-factory-text-muted">
          No business logic. Just Factory operations.
        </p>
      </div>

      <div className="grid gap-6 p-8 lg:grid-cols-2">
        {/* System health wall */}
        <section className="lg:col-span-2">
          <div
            className="grid grid-cols-2 gap-3 rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/20 p-4 sm:grid-cols-4"
            style={{ borderTopColor: healthColor, borderTopWidth: 2 }}
          >
            <Metric label="System Health" value={operations.systemHealth} color={healthColor} />
            <Metric label="Event Traffic" value={`${operations.eventTrafficPerMin}/min`} />
            <Metric label="Queue Depth" value={String(operations.queueDepth)} />
            <Metric label="Background Jobs" value={String(operations.backgroundJobs)} />
            <Metric label="Automations" value={String(operations.automationActive)} />
            <Metric label="Storage" value={`${operations.storageUsedGb} GB`} />
            <Metric label="Search Index" value={`${operations.searchIndexSize} objects`} />
            <Metric label="Services" value={`${services.filter((s) => s.status === "online").length}/${services.length}`} />
          </div>
        </section>

        {/* Connector health */}
        <section>
          <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
            Connector Health
          </h2>
          <div className="space-y-1">
            {Object.entries(operations.connectorHealth).map(([tenant, status]) => (
              <div
                key={tenant}
                className="flex items-center justify-between rounded border border-factory-accent-dim/10 bg-factory-bg-elevated/20 px-3 py-2"
              >
                <span className="text-xs capitalize text-factory-text">{tenant}</span>
                <span
                  className="text-[10px] uppercase tracking-wider"
                  style={{
                    color: status === "healthy" ? "#2ecc71" : status === "degraded" ? "#f39c12" : "#e74c3c",
                  }}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Event traffic */}
        <section>
          <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
            Event Traffic
          </h2>
          <div className="max-h-48 space-y-1 overflow-y-auto">
            {events.slice(0, 8).map((evt) => (
              <div
                key={evt.id}
                className="rounded border border-factory-accent-dim/10 bg-factory-bg-elevated/20 px-3 py-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-factory-accent">{evt.type}</span>
                  <span className="text-[9px] text-factory-text-muted">{evt.source}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-factory-text-muted">{evt.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Activity stream */}
        <section className="lg:col-span-2">
          <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
            Activity Stream
          </h2>
          <p className="mb-3 text-[10px] text-factory-text-muted">
            Operational history. Not chat.
          </p>
          <div className="space-y-1">
            {activity.slice(0, 6).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 border-l-2 border-factory-accent-dim/30 py-1 pl-3"
              >
                <span className="font-mono text-[9px] text-factory-text-muted">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-[10px] capitalize text-factory-accent">{entry.source}</span>
                <span className="text-xs text-factory-text">{entry.summary}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skybridge system */}
        <section className="lg:col-span-2">
          <SkybridgeDiagram />
        </section>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="text-center">
      <p className="text-[9px] uppercase tracking-wider text-factory-text-muted">{label}</p>
      <p className="mt-1 text-sm font-medium capitalize" style={{ color: color ?? undefined }}>
        {value}
      </p>
    </div>
  );
}
