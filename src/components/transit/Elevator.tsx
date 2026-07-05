"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFactory } from "@/context/FactoryContext";
import { ELEVATOR_PANEL, BUILDINGS } from "@/domain/registry";
import type { BuildingId } from "@/domain/types";

export function Elevator() {
  const {
    currentBuildingId,
    isTraveling,
    travelingTo,
    travelTo,
    canEnter,
  } = useFactory();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Elevator call button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-14 w-14 flex-col items-center justify-center rounded border border-factory-accent-dim/30 bg-factory-bg-elevated transition-all hover:border-factory-accent/50 hover:shadow-[0_0_20px_var(--factory-glow)]"
        aria-label="Open elevator panel"
      >
        <span className="text-[8px] uppercase tracking-[0.2em] text-factory-text-muted group-hover:text-factory-accent">
          Elev
        </span>
        <span className="text-lg text-factory-accent">▲</span>
        <span className="text-lg leading-none text-factory-accent">▼</span>
      </button>

      {/* Elevator panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 right-16 w-56 rounded border border-factory-accent-dim/30 bg-factory-bg-surface shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            {/* Panel header */}
            <div className="border-b border-factory-accent-dim/20 px-4 py-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
                Factory Transit
              </p>
              <p className="mt-0.5 text-[10px] text-factory-text-muted">
                Select destination
              </p>
            </div>

            {/* Floor buttons */}
            <div className="p-2">
              {[...ELEVATOR_PANEL].reverse().map((stop) => {
                const isCurrent = stop.buildingId === currentBuildingId;
                const isDestination = stop.buildingId === travelingTo;
                const accessible = canEnter(stop.buildingId);
                const building = BUILDINGS[stop.buildingId];

                return (
                  <button
                    key={stop.buildingId}
                    onClick={() => {
                      if (accessible && !isCurrent) {
                        travelTo(stop.buildingId);
                        setIsOpen(false);
                      }
                    }}
                    disabled={isCurrent || isTraveling || !accessible}
                    className={`group/stop flex w-full items-center gap-3 rounded px-3 py-2.5 text-left transition-all ${
                      isCurrent
                        ? "bg-factory-accent/10 border border-factory-accent/30"
                        : isDestination
                          ? "bg-factory-accent/5 animate-pulse"
                          : accessible
                            ? "hover:bg-factory-bg-elevated border border-transparent"
                            : "opacity-30 cursor-not-allowed border border-transparent"
                    }`}
                  >
                    <span
                      className={`font-mono text-sm tabular-nums ${
                        isCurrent ? "text-factory-accent" : "text-factory-text-muted"
                      }`}
                    >
                      {stop.floor === 0 ? "G" : stop.floor}
                    </span>
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          isCurrent ? "text-factory-accent font-medium" : "text-factory-text"
                        }`}
                      >
                        {stop.displayName}
                      </p>
                      {!accessible && (
                        <p className="text-[9px] uppercase tracking-wider text-factory-emergency">
                          Clearance Required
                        </p>
                      )}
                    </div>
                    <span className="text-sm opacity-50">{building.glyph}</span>
                  </button>
                );
              })}
            </div>

            {/* Extended destinations */}
            <div className="border-t border-factory-accent-dim/20 p-2">
              <p className="px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-factory-text-muted">
                Extended Campus
              </p>
              <ExtendedStop
                buildingId="courtyard"
                label="Courtyard"
                floor="G"
                currentBuildingId={currentBuildingId}
                isTraveling={isTraveling}
                canEnter={canEnter}
                travelTo={(id) => { travelTo(id); setIsOpen(false); }}
              />
              <ExtendedStop
                buildingId="archive"
                label="Archive"
                floor="15"
                currentBuildingId={currentBuildingId}
                isTraveling={isTraveling}
                canEnter={canEnter}
                travelTo={(id) => { travelTo(id); setIsOpen(false); }}
              />
              <ExtendedStop
                buildingId="data-center"
                label="Data Center"
                floor="20"
                currentBuildingId={currentBuildingId}
                isTraveling={isTraveling}
                canEnter={canEnter}
                travelTo={(id) => { travelTo(id); setIsOpen(false); }}
              />
              <ExtendedStop
                buildingId="maintenance"
                label="Maintenance"
                floor="B5"
                currentBuildingId={currentBuildingId}
                isTraveling={isTraveling}
                canEnter={canEnter}
                travelTo={(id) => { travelTo(id); setIsOpen(false); }}
              />
              <ExtendedStop
                buildingId="engine-room"
                label="Engine Room"
                floor="B10"
                currentBuildingId={currentBuildingId}
                isTraveling={isTraveling}
                canEnter={canEnter}
                travelTo={(id) => { travelTo(id); setIsOpen(false); }}
              />
            </div>

            {/* Floor indicator */}
            <div className="border-t border-factory-accent-dim/20 px-4 py-2">
              <div className="flex items-center justify-between text-[10px] text-factory-text-muted">
                <span>Current</span>
                <span className="font-mono text-factory-accent">
                  Floor {BUILDINGS[currentBuildingId].floor}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExtendedStop({
  buildingId,
  label,
  floor,
  currentBuildingId,
  isTraveling,
  canEnter,
  travelTo,
}: {
  buildingId: BuildingId;
  label: string;
  floor: string;
  currentBuildingId: BuildingId;
  isTraveling: boolean;
  canEnter: (id: BuildingId) => boolean;
  travelTo: (id: BuildingId) => void;
}) {
  const isCurrent = buildingId === currentBuildingId;
  const accessible = canEnter(buildingId);

  return (
    <button
      onClick={() => accessible && !isCurrent && travelTo(buildingId)}
      disabled={isCurrent || isTraveling || !accessible}
      className={`flex w-full items-center gap-3 rounded px-3 py-1.5 text-left text-xs transition-all ${
        isCurrent
          ? "text-factory-accent"
          : accessible
            ? "text-factory-text-muted hover:text-factory-text"
            : "text-factory-text-muted/30 cursor-not-allowed"
      }`}
    >
      <span className="font-mono w-6">{floor}</span>
      <span>{label}</span>
      {!accessible && <span className="ml-auto text-[8px] text-factory-emergency">🔒</span>}
    </button>
  );
}
