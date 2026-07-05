"use client";

import { useOperations } from "@/context/OperationsContext";

const PRIORITY_COLORS = { low: "#95a5a6", normal: "#3498db", high: "#f39c12", critical: "#e74c3c" };
const STATUS_LABELS = { "in-transit": "In Transit", delivered: "Delivered", read: "Read", archived: "Archived" };

export function MailroomView() {
  const { mail } = useOperations();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
          Factory Mailroom
        </h2>
        <p className="text-[10px] text-factory-text-muted">
          Every request, report, and artifact passes through one intake. You can always answer: &ldquo;Where is this?&rdquo;
        </p>
      </div>

      <div className="space-y-2">
        {mail.map((item) => (
          <div
            key={item.id}
            className="rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/20 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-factory-accent">{item.id}</span>
                  <span className="text-[8px] uppercase tracking-wider text-factory-text-muted">{item.type}</span>
                </div>
                <p className="mt-1 text-xs text-factory-text">{item.subject}</p>
                <p className="mt-0.5 text-[10px] text-factory-text-muted">
                  {item.sender} → {item.recipient}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-[9px] uppercase tracking-wider"
                  style={{ color: PRIORITY_COLORS[item.priority] }}
                >
                  {item.priority}
                </p>
                <p className="mt-1 text-[9px] text-factory-text-muted">
                  {STATUS_LABELS[item.status]}
                </p>
              </div>
            </div>

            {/* Tracking history */}
            <div className="mt-2 border-t border-factory-accent-dim/10 pt-2">
              {item.history.map((h, i) => (
                <p key={i} className="text-[9px] text-factory-text-muted/70">
                  {new Date(h.timestamp).toLocaleTimeString()} · {h.location} · {h.action}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
