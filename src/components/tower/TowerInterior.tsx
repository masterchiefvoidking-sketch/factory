"use client";

import { motion } from "framer-motion";
import { useFactory } from "@/context/FactoryContext";
import { DepartureBoard } from "./DepartureBoard";
import { CommandCenter } from "@/components/operations/CommandCenter";
import { Watchboard } from "@/components/operations/Watchboard";
import { useDepartments } from "@/context/DepartmentsContext";
import { FOUNDATION_PRINCIPLE } from "@/domain/types";

export function TowerInterior() {
  const { location, currentBuilding, travelToTowerRoom } = useFactory();
  const room = location.towerRoom ?? "atrium";
  const rooms = currentBuilding.towerRooms ?? [];

  return (
    <motion.div
      key={room}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="factory-scroll h-full overflow-y-auto"
    >
      {/* Tower navigation — internal elevator */}
      <div className="border-b border-factory-accent-dim/20 bg-factory-bg-surface/50 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-factory-text-muted">
              The Tower · Headquarters
            </p>
            <h1 className="text-2xl font-light text-factory-accent">
              {rooms.find((r) => r.id === room)?.name ?? "The Tower"}
            </h1>
          </div>
          <div className="flex gap-1">
            {rooms.map((r) => (
              <button
                key={r.id}
                onClick={() => travelToTowerRoom(r.id)}
                className={`rounded px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all ${
                  r.id === room
                    ? "bg-factory-accent/20 text-factory-accent border border-factory-accent/30"
                    : "text-factory-text-muted hover:text-factory-text border border-transparent"
                }`}
              >
                F{r.floor} · {r.name.split(" ").pop()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8">
        {room === "atrium" && <AtriumFloor />}
        {room === "mission-control" && <MissionControlFloor />}
        {room === "war-room" && <WarRoomFloor />}
      </div>
    </motion.div>
  );
}

function AtriumFloor() {
  return (
    <div className="space-y-8">
      {/* Digital globe placeholder */}
      <div className="relative mx-auto aspect-[2/1] max-w-2xl overflow-hidden rounded-full border border-factory-accent-dim/20 bg-gradient-to-b from-factory-bg-elevated to-factory-bg-deep">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl">🌍</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-factory-text-muted">
              Live World · Weather · Markets · Factory Health
            </p>
          </div>
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border border-factory-accent/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <p className="text-center text-sm italic text-factory-text-muted">
        Think Grand Central Terminal. Everybody passes through here.
      </p>

      <DepartureBoard />

      <blockquote className="border-l-2 border-factory-accent pl-4 text-sm italic text-factory-text-muted">
        &ldquo;{FOUNDATION_PRINCIPLE}&rdquo;
      </blockquote>
    </div>
  );
}

function MissionControlFloor() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-factory-text-muted">
        NASA, not dashboards. You stand. You don&apos;t sit. Morgan understands the entire company in under sixty seconds.
      </p>
      <CommandCenter />
      <Watchboard />
    </div>
  );
}

function WarRoomFloor() {
  const { executiveFloor, architectRule } = useDepartments();

  return (
    <div className="space-y-6">
      <section className="rounded border border-factory-accent/30 bg-factory-accent/5 p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-factory-accent">
          {executiveFloor.name}
        </p>
        <p className="mt-2 text-sm text-factory-text">{executiveFloor.purpose}</p>
        <p className="mt-1 text-xs italic text-factory-text-muted">
          Never: {executiveFloor.neverDoes}
        </p>
        <div className="mt-4 space-y-2">
          {executiveFloor.occupants.map((o, i) => (
            <div key={i} className="flex gap-4 text-sm">
              <span className="font-medium text-factory-accent">{o.role}</span>
              <span className="text-factory-text">{o.title}</span>
              <span className="text-factory-text-muted">— {o.authority}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm text-factory-text-muted">
        Whiteboards. Glass. Blueprint tables. Strategy. No coding. Only thinking.
      </p>

      <blockquote className="border-l-2 border-factory-accent pl-4 text-sm italic text-factory-text-muted">
        &ldquo;{architectRule}&rdquo;
      </blockquote>

      <div className="grid gap-4 md:grid-cols-3">
        {["Strategy", "Architecture", "Roadmap"].map((board) => (
          <div
            key={board}
            className="aspect-[4/3] rounded border border-factory-accent-dim/20 bg-white/5 p-4"
          >
            <p className="text-[10px] uppercase tracking-wider text-factory-text-muted">
              {board}
            </p>
            <div className="mt-4 space-y-2">
              <div className="h-px w-3/4 bg-factory-accent-dim/30" />
              <div className="h-px w-1/2 bg-factory-accent-dim/20" />
              <div className="h-px w-2/3 bg-factory-accent-dim/25" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
