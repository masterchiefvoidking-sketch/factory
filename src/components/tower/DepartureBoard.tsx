"use client";

import { EMPLOYEES } from "@/domain/registry";

export function DepartureBoard() {
  return (
    <div className="overflow-hidden rounded border border-factory-accent-dim/30 bg-factory-bg-deep">
      <div className="border-b border-factory-accent-dim/20 bg-factory-bg-elevated px-4 py-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-factory-accent">
          Departure Board
        </p>
        <p className="text-[10px] text-factory-text-muted">
          Where everyone is right now
        </p>
      </div>
      <div className="divide-y divide-factory-accent-dim/10">
        {EMPLOYEES.map((emp) => (
          <div
            key={emp.id}
            className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-factory-bg-elevated/30"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold"
              style={{
                backgroundColor: `${emp.badgeColor}20`,
                color: emp.badgeColor,
                border: `1px solid ${emp.badgeColor}40`,
              }}
            >
              {emp.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-factory-text">{emp.name}</p>
              <p className="truncate text-[10px] text-factory-text-muted">
                {emp.desk}
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: emp.badgeColor }}
              >
                {emp.statusLabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
