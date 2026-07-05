"use client";

import { useState } from "react";
import { useFactory } from "@/context/FactoryContext";
import { SHIFTS, SHIFT_PROFILES, type Shift } from "@/domain/types";

export function ShiftControls() {
  const { currentShift, setShift } = useFactory();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded border border-factory-accent-dim/20 bg-factory-bg-elevated px-3 py-2 text-[10px] uppercase tracking-wider text-factory-text-muted transition-colors hover:border-factory-accent-dim/40 hover:text-factory-text"
      >
        <ShiftIcon shift={currentShift} />
        <span>{SHIFT_PROFILES[currentShift].label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded border border-factory-accent-dim/30 bg-factory-bg-surface p-2 shadow-lg">
          <p className="px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-factory-text-muted">
            Shift Change
          </p>
          {SHIFTS.map((shift) => {
            const profile = SHIFT_PROFILES[shift];
            return (
              <button
                key={shift}
                onClick={() => {
                  setShift(shift);
                  setIsOpen(false);
                }}
                className={`w-full rounded px-2 py-2 text-left transition-colors ${
                  shift === currentShift
                    ? "bg-factory-accent/10"
                    : "hover:bg-factory-bg-elevated"
                }`}
              >
                <p className={`text-xs capitalize ${
                  shift === currentShift ? "text-factory-accent" : "text-factory-text"
                }`}>
                  {profile.label}
                </p>
                <p className="mt-0.5 text-[10px] text-factory-text-muted">
                  {profile.description}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ShiftIcon({ shift }: { shift: Shift }) {
  const icons: Record<Shift, string> = {
    morning: "☀",
    night: "☾",
    weekend: "☁",
    holiday: "✦",
  };
  return <span>{icons[shift]}</span>;
}
