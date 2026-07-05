"use client";

import { useState } from "react";
import { useFactory } from "@/context/FactoryContext";
import { CLEARANCE_LEVELS, type ClearanceLevel } from "@/domain/types";

export function SecurityPanel() {
  const { userClearance, setClearance } = useFactory();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded border border-factory-accent-dim/20 bg-factory-bg-elevated px-3 py-2 text-[10px] uppercase tracking-wider text-factory-text-muted transition-colors hover:border-factory-accent-dim/40 hover:text-factory-text"
      >
        <span className="text-factory-accent">🛡</span>
        <span className="capitalize">{userClearance}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded border border-factory-accent-dim/30 bg-factory-bg-surface p-2 shadow-lg">
          <p className="px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-factory-text-muted">
            Factory Security
          </p>
          {CLEARANCE_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => {
                setClearance(level);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs capitalize transition-colors ${
                level === userClearance
                  ? "bg-factory-accent/10 text-factory-accent"
                  : "text-factory-text-muted hover:bg-factory-bg-elevated hover:text-factory-text"
              }`}
            >
              <ClearanceIcon level={level} active={level === userClearance} />
              {level}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ClearanceIcon({ level, active }: { level: ClearanceLevel; active: boolean }) {
  const icons: Record<ClearanceLevel, string> = {
    visitor: "○",
    employee: "◐",
    engineer: "◑",
    architect: "◕",
    founder: "★",
    system: "⚙",
    administrator: "⬡",
  };
  return (
    <span className={active ? "text-factory-accent" : "text-factory-text-muted/50"}>
      {icons[level]}
    </span>
  );
}
