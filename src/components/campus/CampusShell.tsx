"use client";

import { LocationView } from "@/components/campus/LocationView";
import { ShiftLighting } from "@/components/atmosphere/ShiftLighting";
import { ShiftControls } from "@/components/atmosphere/ShiftControls";
import { PowerControls } from "@/components/atmosphere/PowerControls";
import { CampusMap } from "@/components/transit/CampusMap";
import { TravelOverlay } from "@/components/transit/TravelOverlay";
import { SecurityPanel } from "@/components/security/SecurityPanel";
import { useFactory } from "@/context/FactoryContext";
import { FOUNDATION_PRINCIPLE } from "@/domain/types";

export function CampusShell({ children }: { children?: React.ReactNode }) {
  const { currentBuilding, currentRoomName, campus } = useFactory();

  const locationLabel = currentRoomName
    ? `${currentBuilding.name} · ${currentRoomName}`
    : currentBuilding.name;

  return (
    <div className="flex h-screen flex-col">
      <ShiftLighting />
      <TravelOverlay />

      <header className="flex items-center justify-between border-b border-factory-accent-dim/20 bg-factory-bg-surface/80 px-6 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-sm font-light tracking-[0.3em] text-factory-accent uppercase">
              The Factory
            </h1>
            <p className="text-[10px] text-factory-text-muted">
              {campus.codename} · {campus.location}
            </p>
          </div>
          <div className="hidden h-8 w-px bg-factory-accent-dim/20 sm:block" />
          <div className="hidden sm:block">
            <p className="text-[10px] uppercase tracking-wider text-factory-text-muted">
              You are in
            </p>
            <p className="text-sm" style={{ color: currentBuilding.accent }}>
              {locationLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PowerControls />
          <ShiftControls />
          <SecurityPanel />
        </div>
      </header>

      <main className="relative flex-1 overflow-hidden bg-factory-bg-deep">
        <LocationView />
        {children}
      </main>

      <footer className="relative border-t border-factory-accent-dim/20 bg-factory-bg-surface/80 px-6 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <p className="max-w-md truncate text-[10px] italic text-factory-text-muted/60">
            {FOUNDATION_PRINCIPLE}
          </p>
          <CampusMap />
        </div>
      </footer>
    </div>
  );
}
