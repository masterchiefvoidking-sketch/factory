"use client";

import { BuildingInterior } from "@/components/building/BuildingInterior";
import { ShiftLighting } from "@/components/atmosphere/ShiftLighting";
import { ShiftControls } from "@/components/atmosphere/ShiftControls";
import { PowerControls } from "@/components/atmosphere/PowerControls";
import { Elevator } from "@/components/transit/Elevator";
import { TravelOverlay } from "@/components/transit/TravelOverlay";
import { SecurityPanel } from "@/components/security/SecurityPanel";
import { useFactory } from "@/context/FactoryContext";

export function CampusShell({ children }: { children?: React.ReactNode }) {
  const { currentBuilding, campus } = useFactory();

  return (
    <div className="flex h-screen flex-col">
      <ShiftLighting />
      <TravelOverlay />

      {/* Headquarters header */}
      <header className="flex items-center justify-between border-b border-factory-accent-dim/20 bg-factory-bg-surface/80 px-6 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-sm font-light tracking-[0.3em] text-factory-accent uppercase">
              The Factory
            </h1>
            <p className="text-[10px] text-factory-text-muted">
              {campus.location}
            </p>
          </div>
          <div className="hidden h-8 w-px bg-factory-accent-dim/20 sm:block" />
          <div className="hidden sm:block">
            <p className="text-[10px] uppercase tracking-wider text-factory-text-muted">
              You are in
            </p>
            <p className="text-sm" style={{ color: currentBuilding.accent }}>
              {currentBuilding.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PowerControls />
          <ShiftControls />
          <SecurityPanel />
        </div>
      </header>

      {/* Main viewport — the building interior */}
      <main className="relative flex-1 overflow-hidden bg-factory-bg-deep">
        <BuildingInterior />
        {children}
      </main>

      {/* Transit system — elevator docked bottom-right */}
      <footer className="relative border-t border-factory-accent-dim/20 bg-factory-bg-surface/80 px-6 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="text-[10px] text-factory-text-muted">
            <span className="uppercase tracking-wider">Transit System</span>
            <span className="mx-2 text-factory-accent-dim">·</span>
            <span>Nothing teleports. You travel.</span>
          </div>
          <Elevator />
        </div>
      </footer>
    </div>
  );
}
