"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFactory } from "@/context/FactoryContext";
import { BUILDINGS } from "@/domain/registry";

export function TravelOverlay() {
  const { isTraveling, travelingFrom, travelingTo } = useFactory();

  const fromBuilding = travelingFrom ? BUILDINGS[travelingFrom] : null;
  const toBuilding = travelingTo ? BUILDINGS[travelingTo] : null;

  const goingUp = fromBuilding && toBuilding
    ? toBuilding.floor > fromBuilding.floor
    : true;

  return (
    <AnimatePresence>
      {isTraveling && fromBuilding && toBuilding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-factory-bg-deep"
        >
          {/* Machinery overlay */}
          <div className="factory-machinery-overlay absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(201,162,39,0.03)_2px,rgba(201,162,39,0.03)_4px)]" />

          {/* Vertical travel lines */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-8 w-px bg-factory-accent/20"
                style={{ left: `${5 + i * 5}%` }}
                animate={{
                  y: goingUp ? ["100vh", "-10vh"] : ["-10vh", "100vh"],
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Center display */}
          <div className="relative z-10 text-center">
            <motion.div
              animate={{ y: goingUp ? [-5, 5, -5] : [5, -5, 5] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="mb-6 text-4xl text-factory-accent"
            >
              {goingUp ? "▲" : "▼"}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-medium uppercase tracking-[0.4em] text-factory-text-muted"
            >
              {goingUp ? "Ascending" : "Descending"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <p className="text-sm text-factory-text-muted">
                Floor {fromBuilding.floor} → Floor {toBuilding.floor}
              </p>
              <p className="mt-2 text-lg text-factory-accent">
                {toBuilding.name}
              </p>
            </motion.div>

            {/* Floor counter animation */}
            <motion.div
              className="mt-6 font-mono text-3xl tabular-nums text-factory-accent"
              key={toBuilding.floor}
            >
              <FloorCounter
                from={fromBuilding.floor}
                to={toBuilding.floor}
                goingUp={goingUp}
              />
            </motion.div>

            {/* Machinery sound indicator */}
            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-[10px] tracking-wider text-factory-text-muted/50"
            >
              ◉ machinery ◉
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloorCounter({
  from,
  to,
  goingUp,
}: {
  from: number;
  to: number;
  goingUp: boolean;
}) {
  const floors: number[] = [];
  if (goingUp) {
    for (let f = from; f <= to; f++) floors.push(f);
  } else {
    for (let f = from; f >= to; f--) floors.push(f);
  }

  return (
    <motion.span
      key={`${from}-${to}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {to === 0 ? "G" : to}
    </motion.span>
  );
}
