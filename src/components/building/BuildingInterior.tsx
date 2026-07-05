"use client";

import { motion } from "framer-motion";
import { useFactory } from "@/context/FactoryContext";
import { getEmployeesInBuilding } from "@/domain/registry";
import { WallDisplay } from "./WallDisplay";
import { WindowView } from "@/components/atmosphere/WindowView";
import { TenantSkybridges } from "@/components/nexus/TenantSkybridges";

const INSTINCT_LABELS: Record<string, string> = {
  exploration: "Exploration",
  mastery: "Mastery",
  belonging: "Belonging",
  curiosity: "Curiosity",
  purpose: "Purpose",
};

export function BuildingInterior() {
  const { currentBuilding, currentShift, timePeriod } = useFactory();
  const employees = getEmployeesInBuilding(currentBuilding.id);

  if (currentBuilding.isPlace) return null;

  return (
    <motion.div
      key={currentBuilding.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="factory-scroll h-full overflow-y-auto"
    >
      <div className="border-b border-factory-accent-dim/20 px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-3">
              <span className="text-3xl">{currentBuilding.glyph}</span>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-factory-text-muted">
                  {currentBuilding.material}
                </p>
                <h1
                  className="text-2xl font-light tracking-wide"
                  style={{ color: currentBuilding.accent }}
                >
                  {currentBuilding.name}
                </h1>
              </div>
            </div>
            <p className="mt-2 text-sm italic text-factory-text-muted">
              {currentBuilding.tagline}
            </p>
          </div>
          <div className="text-right text-[10px] tracking-wider text-factory-text-muted">
            <p>{currentShift} · {timePeriod}</p>
            <p className="mt-1 text-factory-accent/60">◉ {currentBuilding.soundscape} ◉</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section>
            <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
              One Purpose
            </h2>
            <p className="text-sm leading-relaxed text-factory-text">
              {currentBuilding.purpose}
            </p>
            <p className="mt-2 text-xs italic text-factory-text-muted">
              Never: {currentBuilding.neverDoes}
            </p>
          </section>

          {currentBuilding.wallContent.length > 0 && (
            <section>
              <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
                The Walls
              </h2>
              <WallDisplay items={currentBuilding.wallContent} accent={currentBuilding.accent} />
            </section>
          )}

          {employees.length > 0 && (
            <section>
              <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
                Tenant
              </h2>
              {employees.map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center gap-4 rounded border border-factory-accent-dim/10 bg-factory-bg-elevated/30 px-4 py-3"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: `${emp.badgeColor}20`,
                      color: emp.badgeColor,
                      border: `2px solid ${emp.badgeColor}50`,
                    }}
                  >
                    {emp.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{emp.name}</span>
                      <span
                        className="rounded px-1.5 py-0.5 text-[9px] uppercase tracking-wider"
                        style={{
                          backgroundColor: `${emp.badgeColor}15`,
                          color: emp.badgeColor,
                        }}
                      >
                        {emp.badgeNumber}
                      </span>
                    </div>
                    <p className="text-xs text-factory-text-muted">
                      {emp.role} · {emp.desk}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{ color: emp.badgeColor }}
                    >
                      {emp.statusLabel}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          )}

          <section>
            <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
              On The Wall
            </h2>
            <div className="space-y-2">
              {currentBuilding.quotes.map((quote, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 pl-4 text-sm italic text-factory-text-muted"
                  style={{ borderColor: currentBuilding.accent }}
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-4">
          {!currentBuilding.underground && (
            <section>
              <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
                The Windows
              </h2>
              <WindowView />
            </section>
          )}

          <section>
            <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
              Hallway Instinct
            </h2>
            <div className="rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/30 p-4">
              <p className="text-sm text-factory-accent">
                {INSTINCT_LABELS[currentBuilding.instinct]}
              </p>
              <p className="mt-2 text-xs text-factory-text-muted">
                Every hallway reinforces one of the five human instincts.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
              Soundscape
            </h2>
            <div className="rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/30 p-4">
              <p className="text-sm text-factory-text">{currentBuilding.soundscape}</p>
            </div>
          </section>

          <TenantSkybridges buildingId={currentBuilding.id} />
        </div>
      </div>
    </motion.div>
  );
}
