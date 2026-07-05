"use client";

import { useFactory } from "@/context/FactoryContext";
import { SHIFT_PROFILES } from "@/domain/types";

const SHIFT_OVERLAYS: Record<string, string> = {
  morning: "rgba(255, 200, 100, 0.04)",
  night: "rgba(60, 100, 200, 0.08)",
  weekend: "rgba(100, 200, 150, 0.05)",
  holiday: "rgba(255, 100, 100, 0.06)",
};

export function ShiftLighting() {
  const { currentShift, powerState } = useFactory();
  const profile = SHIFT_PROFILES[currentShift];

  if (powerState === "offline") {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(255,50,50,0.15) 100%)",
        }}
      />
    );
  }

  if (powerState === "backup") {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(255,150,0,0.1) 100%)",
        }}
      />
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 transition-all duration-[3000ms]"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${SHIFT_OVERLAYS[currentShift]} 0%, transparent 70%)`,
        boxShadow:
          profile.lighting === "dim"
            ? "inset 0 0 200px rgba(0,0,0,0.4)"
            : profile.lighting === "cool"
              ? "inset 0 0 150px rgba(0,20,60,0.3)"
              : "none",
      }}
    />
  );
}
