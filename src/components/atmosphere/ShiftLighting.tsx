"use client";

import { useFactory } from "@/context/FactoryContext";
import { TIME_PROFILES } from "@/domain/types";

const TIME_OVERLAYS: Record<string, string> = {
  morning: "rgba(255, 200, 120, 0.06)",
  lunch: "rgba(255, 255, 240, 0.04)",
  night: "rgba(60, 100, 200, 0.1)",
  maintenance: "rgba(255, 50, 50, 0.12)",
};

export function ShiftLighting() {
  const { timePeriod, powerState } = useFactory();
  const profile = TIME_PROFILES[timePeriod];

  if (powerState === "offline") {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(255,30,30,0.18) 100%)",
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
            "radial-gradient(ellipse at center, transparent 40%, rgba(255,150,0,0.12) 100%)",
        }}
      />
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 transition-all duration-[4000ms]"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${TIME_OVERLAYS[timePeriod]} 0%, transparent 65%)`,
        boxShadow:
          profile.lighting === "blue-night"
            ? "inset 0 0 180px rgba(0,20,80,0.35)"
            : profile.lighting === "red-emergency"
              ? "inset 0 0 120px rgba(80,0,0,0.25)"
              : profile.lighting === "bright"
                ? "inset 0 0 60px rgba(255,255,200,0.05)"
                : "none",
      }}
    />
  );
}
