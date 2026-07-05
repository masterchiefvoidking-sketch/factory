"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFactory } from "@/context/FactoryContext";
import { BUILDINGS, SURFACE_BUILDINGS } from "@/domain/registry";
import type { BuildingId } from "@/domain/types";

export function CampusMap() {
  const {
    location,
    isTraveling,
    travelTo,
    canEnter,
  } = useFactory();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-14 items-center gap-2 rounded border border-factory-accent-dim/30 bg-factory-bg-elevated px-4 transition-all hover:border-factory-accent/50 hover:shadow-[0_0_20px_var(--factory-glow)]"
        aria-label="Open campus map"
      >
        <span className="text-factory-accent">◎</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-factory-text-muted group-hover:text-factory-accent">
          Campus
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute bottom-full right-0 mb-2 w-80 rounded border border-factory-accent-dim/30 bg-factory-bg-surface p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
              Titan Campus
            </p>
            <p className="mb-4 text-[10px] text-factory-text-muted">
              Nothing teleports. You travel.
            </p>

            {/* Radial campus map */}
            <div className="relative mx-auto mb-4 aspect-square w-full max-w-[260px]">
              {/* Connection lines */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                <line x1="50" y1="22" x2="50" y2="52" stroke="rgba(201,162,39,0.15)" strokeWidth="0.3" />
                <line x1="50" y1="5" x2="50" y2="22" stroke="rgba(201,162,39,0.15)" strokeWidth="0.3" />
                <line x1="50" y1="52" x2="12" y2="38" stroke="rgba(201,162,39,0.1)" strokeWidth="0.2" />
                <line x1="50" y1="52" x2="88" y2="38" stroke="rgba(201,162,39,0.1)" strokeWidth="0.2" />
                <line x1="50" y1="52" x2="50" y2="92" stroke="rgba(201,162,39,0.1)" strokeWidth="0.2" />
              </svg>

              {SURFACE_BUILDINGS.map((id) => {
                const b = BUILDINGS[id];
                const isCurrent = location.buildingId === id;
                const accessible = canEnter(id);

                return (
                  <button
                    key={id}
                    onClick={() => {
                      if (accessible && !isCurrent && !isTraveling) {
                        travelTo(id);
                        setIsOpen(false);
                      }
                    }}
                    disabled={isCurrent || isTraveling || !accessible}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${
                      isCurrent
                        ? "z-10 h-10 w-10 ring-2 ring-factory-accent"
                        : accessible
                          ? "h-8 w-8 hover:scale-110"
                          : "h-7 w-7 opacity-30 cursor-not-allowed"
                    }`}
                    style={{
                      left: `${b.position.x}%`,
                      top: `${b.position.y}%`,
                      backgroundColor: isCurrent ? `${b.accent}40` : `${b.accent}20`,
                      border: `1px solid ${b.accent}${accessible ? "60" : "20"}`,
                    }}
                    title={b.name}
                  >
                    <span className="text-xs">{b.glyph}</span>
                  </button>
                );
              })}

              {/* Garden */}
              <CampusPlace
                id="garden"
                position={BUILDINGS.garden.position}
                isCurrent={location.buildingId === "garden"}
                isTraveling={isTraveling}
                canEnter={canEnter("garden")}
                onSelect={() => { travelTo("garden"); setIsOpen(false); }}
              />
            </div>

            {/* Building list */}
            <div className="max-h-40 space-y-0.5 overflow-y-auto">
              {[...SURFACE_BUILDINGS, "garden" as BuildingId, "engine-room" as BuildingId].map((id) => {
                const b = BUILDINGS[id];
                const isCurrent = location.buildingId === id;
                const accessible = canEnter(id);
                return (
                  <button
                    key={id}
                    onClick={() => {
                      if (accessible && !isCurrent && !isTraveling) {
                        travelTo(id);
                        setIsOpen(false);
                      }
                    }}
                    disabled={isCurrent || isTraveling || !accessible}
                    className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs ${
                      isCurrent
                        ? "bg-factory-accent/10 text-factory-accent"
                        : accessible
                          ? "text-factory-text-muted hover:bg-factory-bg-elevated"
                          : "text-factory-text-muted/30 cursor-not-allowed"
                    }`}
                  >
                    <span>{b.glyph}</span>
                    <span>{b.name}</span>
                    {b.underground && (
                      <span className="ml-auto text-[8px] text-factory-text-muted">↓</span>
                    )}
                    {!accessible && <span className="ml-auto text-[8px]">🔒</span>}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CampusPlace({
  id,
  position,
  isCurrent,
  isTraveling,
  canEnter,
  onSelect,
}: {
  id: BuildingId;
  position: { x: number; y: number };
  isCurrent: boolean;
  isTraveling: boolean;
  canEnter: boolean;
  onSelect: () => void;
}) {
  const b = BUILDINGS[id];
  return (
    <button
      onClick={() => canEnter && !isCurrent && !isTraveling && onSelect()}
      disabled={isCurrent || isTraveling || !canEnter}
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${
        isCurrent ? "h-8 w-8 ring-2 ring-green-400" : "h-6 w-6 opacity-70 hover:opacity-100"
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        backgroundColor: `${b.accent}30`,
        border: `1px solid ${b.accent}50`,
      }}
      title={b.name}
    >
      <span className="text-[10px]">{b.glyph}</span>
    </button>
  );
}
