"use client";

import { motion } from "framer-motion";
import { useFactory } from "@/context/FactoryContext";
import { getEmployeesInBuilding } from "@/domain/registry";
import type { EmployeeStatus } from "@/domain/types";
import { WallDisplay } from "./WallDisplay";
import { WindowView } from "@/components/atmosphere/WindowView";

const STATUS_COLORS: Record<EmployeeStatus, string> = {
  working: "#2ecc71",
  idle: "#f39c12",
  maintenance: "#e67e22",
  offline: "#95a5a6",
  thinking: "#9b59b6",
};

export function BuildingInterior() {
  const { currentBuilding, currentShift, powerState } = useFactory();
  const employees = getEmployeesInBuilding(currentBuilding.id);

  return (
    <motion.div
      key={currentBuilding.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="factory-scroll h-full overflow-y-auto"
    >
      {/* Building header */}
      <div className="border-b border-factory-accent-dim/20 px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-3">
              <span className="text-3xl">{currentBuilding.glyph}</span>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-factory-text-muted">
                  Floor {currentBuilding.floor} · {currentBuilding.wing}
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
            <p>{currentShift} shift</p>
            <p className="mt-1" style={{ color: powerState === "online" ? "#2ecc71" : "#e74c3c" }}>
              Power: {powerState}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-8 lg:grid-cols-3">
        {/* Main content — left 2 cols */}
        <div className="space-y-6 lg:col-span-2">
          {/* Purpose */}
          <section>
            <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
              Purpose
            </h2>
            <p className="text-sm leading-relaxed text-factory-text">
              {currentBuilding.purpose}
            </p>
            <p className="mt-2 text-xs italic text-factory-text-muted">
              Never: {currentBuilding.neverDoes}
            </p>
          </section>

          {/* The Walls */}
          <section>
            <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
              The Walls
            </h2>
            <WallDisplay items={currentBuilding.wallContent} accent={currentBuilding.accent} />
          </section>

          {/* Employees present */}
          {employees.length > 0 && (
            <section>
              <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
                Present Today
              </h2>
              <div className="space-y-2">
                {employees.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex items-center gap-4 rounded border border-factory-accent-dim/10 bg-factory-bg-elevated/30 px-4 py-3"
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[emp.status] }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{emp.name}</span>
                        <span className="text-[10px] text-factory-text-muted">
                          {emp.badgeNumber}
                        </span>
                      </div>
                      <p className="text-xs text-factory-text-muted">
                        {emp.role} · {emp.desk}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: STATUS_COLORS[emp.status] }}>
                        {emp.status}
                      </p>
                      <p className="mt-0.5 max-w-[200px] truncate text-[10px] text-factory-text-muted">
                        {emp.currentAssignment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quotes on the wall */}
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

        {/* Right column — windows & atmosphere */}
        <div className="space-y-4">
          <section>
            <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
              The Windows
            </h2>
            <WindowView />
            <p className="mt-2 text-[10px] text-factory-text-muted">
              Outside the windows is the real world. The Factory exists somewhere.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
              Building Role
            </h2>
            <div className="rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/30 p-4">
              <p className="text-sm text-factory-text">{currentBuilding.role}</p>
              <div className="mt-3 border-t border-factory-accent-dim/10 pt-3">
                <p className="text-[10px] uppercase tracking-wider text-factory-text-muted">
                  Clearance Required
                </p>
                <p className="mt-1 text-sm capitalize text-factory-accent">
                  {currentBuilding.clearanceRequired}
                </p>
              </div>
            </div>
          </section>

          {currentBuilding.maintenanceMode && (
            <section>
              <div className="rounded border border-orange-500/30 bg-orange-500/10 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-orange-400">
                  Under Maintenance
                </p>
                <p className="mt-1 text-xs text-factory-text-muted">
                  This building is currently being repaired. Some systems may be offline.
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </motion.div>
  );
}
