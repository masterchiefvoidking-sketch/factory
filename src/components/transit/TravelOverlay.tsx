"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFactory } from "@/context/FactoryContext";
import { BUILDINGS, getTransitDescription } from "@/domain/registry";

const MODE_GLYPHS: Record<string, string> = {
  elevator: "▲▼",
  hallway: "→",
  skybridge: "⌁",
  "glass-tunnel": "◎",
  "moving-walkway": "≫",
  "autonomous-cart": "◈",
  "underground-rail": "═",
};

export function TravelOverlay() {
  const { isTraveling, travelingFrom, travelingTo, transitMode } = useFactory();

  const fromBuilding = travelingFrom ? BUILDINGS[travelingFrom.buildingId] : null;
  const toBuilding = travelingTo ? BUILDINGS[travelingTo.buildingId] : null;
  const mode = transitMode ?? "hallway";

  const isVertical = mode === "elevator" || mode === "underground-rail";
  const isTowerInternal =
    travelingFrom?.buildingId === "tower" &&
    travelingTo?.buildingId === "tower";

  return (
    <AnimatePresence>
      {isTraveling && fromBuilding && toBuilding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-factory-bg-deep"
        >
          <div className="factory-machinery-overlay absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(201,162,39,0.02)_40px,rgba(201,162,39,0.02)_41px)]" />

          {/* Travel lines */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-factory-accent/15"
                style={{
                  width: isVertical ? 1 : 60,
                  height: isVertical ? 60 : 1,
                  left: isVertical ? `${10 + i * 6}%` : undefined,
                  top: isVertical ? undefined : `${10 + i * 6}%`,
                }}
                animate={
                  isVertical
                    ? { y: ["100vh", "-10vh"] }
                    : { x: ["-10vw", "110vw"] }
                }
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 1.5,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl text-factory-accent"
            >
              {MODE_GLYPHS[mode] ?? "→"}
            </motion.p>

            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.4em] text-factory-text-muted">
              {isTowerInternal ? "Tower Elevator" : getTransitDescription(mode)}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <p className="text-sm text-factory-text-muted">
                {fromBuilding.name} → {toBuilding.name}
              </p>
              {travelingTo?.towerRoom && (
                <p className="mt-1 text-lg text-factory-accent">
                  {toBuilding.towerRooms?.find((r) => r.id === travelingTo.towerRoom)?.name}
                </p>
              )}
            </motion.div>

            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-[10px] tracking-wider text-factory-text-muted/50"
            >
              ◉ traveling ◉
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
