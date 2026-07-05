"use client";

import { useDepartments } from "@/context/DepartmentsContext";
import { DEPARTMENTS } from "@/departments/registry";

export function CrossDepartmentProjects() {
  const { crossDepartmentProjects } = useDepartments();

  return (
    <section>
      <h2 className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
        Cross-Department Projects
      </h2>
      <p className="mb-4 text-[10px] text-factory-text-muted">
        Projects belong to the Factory. Each department contributes by specialty.
      </p>

      <div className="space-y-4">
        {crossDepartmentProjects.map((proj) => (
          <div
            key={proj.id}
            className="rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/20 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-factory-text">{proj.title}</p>
                <p className="mt-1 text-xs text-factory-text-muted">{proj.description}</p>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-factory-accent">
                {proj.status}
              </span>
            </div>

            <div className="mt-3 grid gap-1 sm:grid-cols-2">
              {proj.participants.map((p) => {
                const dept = DEPARTMENTS[p.departmentId];
                return (
                  <div
                    key={`${p.departmentId}-${p.worker}`}
                    className="flex items-center gap-2 rounded bg-factory-bg-deep/50 px-2 py-1.5"
                  >
                    <span className="text-sm">{dept.glyph}</span>
                    <div>
                      <p className="text-[10px] font-medium" style={{ color: dept.accent }}>
                        {dept.name.replace("Department of ", "")}
                      </p>
                      <p className="text-[9px] text-factory-text-muted">
                        {p.worker} — {p.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
