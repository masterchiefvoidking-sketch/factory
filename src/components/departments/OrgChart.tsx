"use client";

import type { OrgChartNode } from "@/departments/types";
import { useDepartments } from "@/context/DepartmentsContext";

export function OrgChart() {
  const { orgChart, expandedOrgNodes, toggleOrgNode } = useDepartments();

  return (
    <section>
      <h2 className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
        Organization Chart
      </h2>
      <p className="mb-4 text-[10px] text-factory-text-muted">
        Founder → Departments → Applications → Projects → Objects
      </p>
      <div className="rounded border border-factory-accent-dim/20 bg-factory-bg-elevated/20 p-4">
        <OrgNode node={orgChart} depth={0} expanded={expandedOrgNodes} onToggle={toggleOrgNode} />
      </div>
    </section>
  );
}

function OrgNode({
  node,
  depth,
  expanded,
  onToggle,
}: {
  node: OrgChartNode;
  depth: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
}) {
  const hasChildren = (node.children?.length ?? 0) > 0;
  const isExpanded = expanded.has(node.id);

  return (
    <div style={{ marginLeft: depth * 16 }}>
      <button
        onClick={() => hasChildren && onToggle(node.id)}
        className={`flex items-center gap-2 rounded px-2 py-1.5 text-left transition-colors hover:bg-factory-bg-elevated/50 ${
          hasChildren ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {hasChildren && (
          <span className="text-[10px] text-factory-text-muted w-3">
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        {!hasChildren && <span className="w-3" />}
        <span
          className="text-xs font-medium"
          style={{ color: node.accent ?? undefined }}
        >
          {node.label}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-factory-text-muted">
          {node.type}
        </span>
        {node.meta && (
          <span className="hidden truncate text-[10px] text-factory-text-muted sm:inline">
            — {node.meta}
          </span>
        )}
      </button>
      {isExpanded &&
        node.children?.map((child) => (
          <OrgNode
            key={child.id}
            node={child}
            depth={depth + 1}
            expanded={expanded}
            onToggle={onToggle}
          />
        ))}
    </div>
  );
}
