"use client";

import { motion } from "framer-motion";
import { useDepartments } from "@/context/DepartmentsContext";
import { OrgChart } from "./OrgChart";
import { DepartmentFloorMap } from "./DepartmentFloorMap";
import { CrossDepartmentProjects } from "./CrossDepartmentProjects";
import { VisitorWelcome } from "./VisitorWelcome";
import { GovernanceNotice } from "@/components/governance/GovernanceNotice";
import { DEPARTMENT_ARCHITECT_RULE } from "@/departments/types";

export function CommonsInterior() {
  const { commonsSpaces, visitorGuide } = useDepartments();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="factory-scroll h-full overflow-y-auto"
    >
      <div className="border-b border-factory-accent-dim/20 px-8 py-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-factory-text-muted">
          Belongs to no department · The Factory owns this
        </p>
        <h1 className="text-2xl font-light text-[#27ae60]">The Commons</h1>
        <p className="mt-2 text-sm italic text-factory-text-muted">
          Not the lobby. Not the Tower. Where the organization gathers.
        </p>
      </div>

      <div className="space-y-8 p-8">
        <VisitorWelcome />

        <GovernanceNotice />

        <section>
          <h2 className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
            Shared Spaces
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {commonsSpaces.map((space) => (
              <div
                key={space.id}
                className="rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/30 p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{space.glyph}</span>
                  <p className="text-sm font-medium text-factory-text">{space.name}</p>
                </div>
                <p className="mt-2 text-xs text-factory-text-muted">{space.description}</p>
                <ul className="mt-2 space-y-1">
                  {space.highlights.map((h, i) => (
                    <li key={i} className="text-[10px] text-factory-text-muted/80">· {h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <DepartmentFloorMap />

        <OrgChart />

        <CrossDepartmentProjects />

        <section>
          <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
            How Work Flows
          </h2>
          <div className="space-y-2">
            {visitorGuide.howWorkFlows.map((flow, i) => (
              <p key={i} className="border-l-2 border-[#27ae60]/40 pl-3 text-xs text-factory-text-muted">
                {flow}
              </p>
            ))}
          </div>
        </section>

        <blockquote className="border-l-2 border-[#27ae60] pl-4 text-sm italic text-factory-text-muted">
          &ldquo;{DEPARTMENT_ARCHITECT_RULE}&rdquo;
        </blockquote>
      </div>
    </motion.div>
  );
}
