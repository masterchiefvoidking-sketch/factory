"use client";

import { useDepartments } from "@/context/DepartmentsContext";
import { useFactory } from "@/context/FactoryContext";
import { DEPARTMENTS } from "@/departments/registry";
import type { DepartmentId } from "@/departments/types";

export function DepartmentFloorMap({
  onSelectDepartment,
}: {
  onSelectDepartment?: (id: DepartmentId) => void;
}) {
  const { departments, factoryServices } = useDepartments();
  const { travelTo } = useFactory();

  const handleSelect = (id: DepartmentId) => {
    onSelectDepartment?.(id);
    travelTo(DEPARTMENTS[id].buildingId);
  };

  return (
    <section>
      <h2 className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
        Department Floor Map
      </h2>
      <p className="mb-4 text-[10px] text-factory-text-muted">
        Spatial. Not menu-driven. Click a department to travel to its entrance.
      </p>

      <div className="relative mx-auto aspect-[4/3] max-w-2xl rounded border border-factory-accent-dim/20 bg-factory-bg-deep/50">
        {/* Hallway lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <line x1="50" y1="18" x2="50" y2="48" stroke="rgba(201,162,39,0.12)" strokeWidth="0.4" />
          <line x1="50" y1="48" x2="15" y2="38" stroke="rgba(201,162,39,0.08)" strokeWidth="0.3" />
          <line x1="50" y1="48" x2="85" y2="38" stroke="rgba(201,162,39,0.08)" strokeWidth="0.3" />
          <line x1="50" y1="48" x2="50" y2="88" stroke="rgba(201,162,39,0.08)" strokeWidth="0.3" />
        </svg>

        {/* Executive Floor */}
        <MapNode
          x={50} y={8}
          label="Executive"
          glyph="🏛"
          accent="#c9a227"
          onClick={() => travelTo("tower", "war-room")}
        />

        {/* Commons center */}
        <MapNode
          x={50} y={48}
          label="Commons"
          glyph="🌿"
          accent="#27ae60"
          isCurrent
        />

        {/* Factory Services */}
        <MapNode
          x={50} y={62}
          label="Services"
          glyph="⚙"
          accent="#5d6d7e"
          small
          onClick={() => travelTo("utility-floor")}
        />

        {/* Departments */}
        {Object.values(departments).map((dept) => (
          <MapNode
            key={dept.id}
            x={dept.mapPosition.x}
            y={dept.mapPosition.y}
            label={dept.name.replace("Department of ", "")}
            glyph={dept.glyph}
            accent={dept.accent}
            onClick={() => handleSelect(dept.id)}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-[9px] text-factory-text-muted">
        Factory Services: {factoryServices.slice(0, 5).join(" · ")}… — used by all, owned by none
      </p>
    </section>
  );
}

function MapNode({
  x, y, label, glyph, accent, onClick, isCurrent, small,
}: {
  x: number; y: number; label: string; glyph: string; accent: string;
  onClick?: () => void; isCurrent?: boolean; small?: boolean;
}) {
  const size = small ? "h-7 w-7 text-xs" : "h-10 w-10 text-sm";
  return (
    <button
      onClick={onClick}
      disabled={isCurrent}
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all hover:scale-110 ${size} ${
        isCurrent ? "ring-2 ring-green-400" : "hover:shadow-lg"
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: `${accent}25`,
        borderColor: `${accent}60`,
      }}
      title={label}
    >
      {glyph}
    </button>
  );
}
