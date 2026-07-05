"use client";

import { useFactory } from "@/context/FactoryContext";
import { POWER_STATES } from "@/domain/types";

export function PowerControls() {
  const { powerState, setPowerState } = useFactory();

  return (
    <div className="flex items-center gap-1">
      {POWER_STATES.map((state) => (
        <button
          key={state}
          onClick={() => setPowerState(state)}
          className={`rounded px-2 py-1 text-[9px] uppercase tracking-wider transition-colors ${
            state === powerState
              ? state === "online"
                ? "bg-green-500/20 text-green-400"
                : state === "backup"
                  ? "bg-orange-500/20 text-orange-400"
                  : "bg-red-500/20 text-red-400"
              : "text-factory-text-muted/40 hover:text-factory-text-muted"
          }`}
          title={`Set power to ${state}`}
        >
          {state}
        </button>
      ))}
    </div>
  );
}
