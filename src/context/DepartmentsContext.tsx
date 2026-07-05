"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEPARTMENTS,
  COMMONS_SPACES,
  CROSS_DEPARTMENT_PROJECTS,
  EXECUTIVE_FLOOR,
  VISITOR_GUIDE,
} from "@/departments/registry";
import { buildOrgChart } from "@/departments/org-chart";
import { buildDepartmentDashboards } from "@/departments/dashboards";
import { DEPARTMENT_ARCHITECT_RULE, FACTORY_SERVICE_NAMES } from "@/departments/types";
import type {
  Department,
  DepartmentDashboard,
  DepartmentId,
  OrgChartNode,
} from "@/departments/types";

interface DepartmentsContextValue {
  departments: Record<DepartmentId, Department>;
  dashboards: Record<DepartmentId, DepartmentDashboard>;
  orgChart: OrgChartNode;
  commonsSpaces: typeof COMMONS_SPACES;
  crossDepartmentProjects: typeof CROSS_DEPARTMENT_PROJECTS;
  executiveFloor: typeof EXECUTIVE_FLOOR;
  visitorGuide: typeof VISITOR_GUIDE;
  factoryServices: readonly string[];
  architectRule: string;
  selectedDepartmentId: DepartmentId | null;
  setSelectedDepartmentId: (id: DepartmentId | null) => void;
  expandedOrgNodes: Set<string>;
  toggleOrgNode: (id: string) => void;
  refresh: () => void;
}

const DepartmentsContext = createContext<DepartmentsContextValue | null>(null);

export function DepartmentsProvider({ children }: { children: ReactNode }) {
  const [tick, setTick] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<DepartmentId | null>(null);
  const [expandedOrgNodes, setExpandedOrgNodes] = useState<Set<string>>(
    () => new Set(["founder"])
  );

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  const toggleOrgNode = useCallback((id: string) => {
    setExpandedOrgNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo<DepartmentsContextValue>(() => {
    void tick;
    return {
      departments: DEPARTMENTS,
      dashboards: buildDepartmentDashboards(),
      orgChart: buildOrgChart(),
      commonsSpaces: COMMONS_SPACES,
      crossDepartmentProjects: CROSS_DEPARTMENT_PROJECTS,
      executiveFloor: EXECUTIVE_FLOOR,
      visitorGuide: VISITOR_GUIDE,
      factoryServices: FACTORY_SERVICE_NAMES,
      architectRule: DEPARTMENT_ARCHITECT_RULE,
      selectedDepartmentId,
      setSelectedDepartmentId,
      expandedOrgNodes,
      toggleOrgNode,
      refresh,
    };
  }, [tick, selectedDepartmentId, expandedOrgNodes, toggleOrgNode, refresh]);

  return (
    <DepartmentsContext.Provider value={value}>{children}</DepartmentsContext.Provider>
  );
}

export function useDepartments(): DepartmentsContextValue {
  const ctx = useContext(DepartmentsContext);
  if (!ctx) throw new Error("useDepartments must be used within DepartmentsProvider");
  return ctx;
}
