"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { operations } from "@/operations/runtime";
import { ARCHITECT_RULE } from "@/operations/types";
import type {
  CampusClock,
  CommandCenterData,
  ConveyorArtifact,
  DepartmentStatus,
  FactoryRequest,
  FactoryReview,
  LogisticsStatus,
  MailItem,
  Mission,
  OpsHistoryEntry,
  OwnedObject,
  QueueItem,
  WatchboardData,
} from "@/operations/types";
import type { TenantBlueprint } from "@/operations/types";
import { TENANT_BLUEPRINTS } from "@/operations/blueprints";
import type { TenantId } from "@/nexus/types";

interface OperationsContextValue {
  clock: CampusClock;
  departments: DepartmentStatus[];
  missions: Mission[];
  requests: FactoryRequest[];
  reviews: FactoryReview[];
  mail: MailItem[];
  conveyor: ConveyorArtifact[];
  history: OpsHistoryEntry[];
  ownedObjects: OwnedObject[];
  logistics: LogisticsStatus;
  watchboard: WatchboardData;
  commandCenter: CommandCenterData;
  blueprints: Record<TenantId, TenantBlueprint>;
  architectRule: string;
  getQueues: (tenantId: TenantId) => Record<string, QueueItem[]>;
  advanceConveyor: (id: string) => void;
  pauseConveyor: (id: string) => void;
  searchHistory: (query: string) => OpsHistoryEntry[];
  refresh: () => void;
}

const OperationsContext = createContext<OperationsContextValue | null>(null);

export function OperationsProvider({ children }: { children: ReactNode }) {
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const value = useMemo<OperationsContextValue>(() => {
    void tick;
    return {
      clock: operations.getClock(),
      departments: operations.getDepartments(),
      missions: operations.getMissions(),
      requests: operations.getRequests(),
      reviews: operations.getReviews(),
      mail: operations.getMail(),
      conveyor: operations.getConveyor(),
      history: operations.getHistory(),
      ownedObjects: operations.getOwnedObjects(),
      logistics: operations.getLogistics(),
      watchboard: operations.getWatchboard(),
      commandCenter: operations.getCommandCenter(),
      blueprints: TENANT_BLUEPRINTS,
      architectRule: ARCHITECT_RULE,
      getQueues: (tenantId) => operations.getQueuesByColumn(tenantId),
      advanceConveyor: (id) => { operations.advanceConveyor(id); setTick((t) => t + 1); },
      pauseConveyor: (id) => { operations.pauseConveyor(id); setTick((t) => t + 1); },
      searchHistory: (q) => operations.getHistory(q),
      refresh,
    };
  }, [tick, refresh]);

  return (
    <OperationsContext.Provider value={value}>{children}</OperationsContext.Provider>
  );
}

export function useOperations(): OperationsContextValue {
  const ctx = useContext(OperationsContext);
  if (!ctx) throw new Error("useOperations must be used within OperationsProvider");
  return ctx;
}
