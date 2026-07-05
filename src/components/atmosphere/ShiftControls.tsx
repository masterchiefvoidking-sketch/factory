"use client";

import { useState } from "react";
import { useFactory } from "@/context/FactoryContext";
import { SHIFTS, SHIFT_PROFILES, TIME_PERIODS, TIME_PROFILES } from "@/domain/types";

export function ShiftControls() {
  const { currentShift, setShift, timePeriod, setTimePeriod } = useFactory();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded border border-factory-accent-dim/20 bg-factory-bg-elevated px-3 py-2 text-[10px] uppercase tracking-wider text-factory-text-muted transition-colors hover:border-factory-accent-dim/40 hover:text-factory-text"
      >
        <span>{TIME_PROFILES[timePeriod].label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded border border-factory-accent-dim/30 bg-factory-bg-surface p-2 shadow-lg">
          <p className="px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-factory-text-muted">
            Lighting
          </p>
          {TIME_PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => { setTimePeriod(period); setIsOpen(false); }}
              className={`w-full rounded px-2 py-1.5 text-left text-xs ${
                period === timePeriod ? "bg-factory-accent/10 text-factory-accent" : "text-factory-text-muted hover:bg-factory-bg-elevated"
              }`}
            >
              {TIME_PROFILES[period].label}
            </button>
          ))}

          <div className="my-2 border-t border-factory-accent-dim/20" />

          <p className="px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-factory-text-muted">
            Shift
          </p>
          {SHIFTS.map((shift) => (
            <button
              key={shift}
              onClick={() => { setShift(shift); setIsOpen(false); }}
              className={`w-full rounded px-2 py-1.5 text-left text-xs ${
                shift === currentShift ? "bg-factory-accent/10 text-factory-accent" : "text-factory-text-muted hover:bg-factory-bg-elevated"
              }`}
            >
              {SHIFT_PROFILES[shift].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
