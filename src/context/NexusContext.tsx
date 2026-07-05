"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { nexus } from "@/nexus/factory";
import type {
  ClipboardItem,
  FactoryCommand,
  FactoryEvent,
  FactoryNotification,
  FactoryObject,
  NexusPermission,
  SearchResults,
} from "@/nexus/types";
import type { ActivityEntry, OperationsMetrics } from "@/nexus/types";
import { CONTRACT_CLAUSES, FACTORY_CONTRACT } from "@/nexus/contract";
import { SKYBRIDGES } from "@/nexus/skybridges";
import { TENANTS } from "@/nexus/tenants";
import { DESIGN_SYSTEM } from "@/nexus/design-system";
import { NEXUS_FIRST_LAW } from "@/nexus/types";

interface NexusContextValue {
  permission: NexusPermission;
  setPermission: (p: NexusPermission) => void;
  objects: FactoryObject[];
  events: FactoryEvent[];
  notifications: FactoryNotification[];
  activity: ActivityEntry[];
  clipboard: ClipboardItem[];
  commands: FactoryCommand[];
  operations: OperationsMetrics;
  services: ReturnType<typeof nexus.getServices>;
  skybridges: typeof SKYBRIDGES;
  tenants: typeof TENANTS;
  contract: typeof FACTORY_CONTRACT;
  clauses: typeof CONTRACT_CLAUSES;
  designSystem: typeof DESIGN_SYSTEM;
  firstLaw: string;
  search: (query: string) => SearchResults;
  copyToClipboard: (label: string, content: string, source: string) => void;
  refresh: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

const NexusContext = createContext<NexusContextValue | null>(null);

export function NexusProvider({ children }: { children: ReactNode }) {
  const [permission, setPermission] = useState<NexusPermission>("founder");
  const [tick, setTick] = useState(0);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  const search = useCallback((query: string) => nexus.search(query), []);

  const copyToClipboard = useCallback(
    (label: string, content: string, source: string) => {
      nexus.copy({
        type: "text",
        copiedBy: "user",
        sourceBuilding: source,
        label,
        content,
      });
      refresh();
    },
    [refresh]
  );

  const value = useMemo<NexusContextValue>(() => {
    void tick; // re-fetch nexus runtime state on refresh
    return {
      permission,
      setPermission,
      objects: nexus.getAllObjects(),
      events: nexus.getEvents(),
      notifications: nexus.getNotifications(),
      activity: nexus.getActivity(),
      clipboard: nexus.getClipboard(),
      commands: nexus.getCommands(permission),
      operations: nexus.getOperationsMetrics(),
      services: nexus.getServices(),
      skybridges: SKYBRIDGES,
      tenants: TENANTS,
      contract: FACTORY_CONTRACT,
      clauses: CONTRACT_CLAUSES,
      designSystem: DESIGN_SYSTEM,
      firstLaw: NEXUS_FIRST_LAW,
      search,
      copyToClipboard,
      refresh,
      commandPaletteOpen,
      setCommandPaletteOpen,
    };
  }, [permission, tick, search, copyToClipboard, refresh, commandPaletteOpen]
  );

  return (
    <NexusContext.Provider value={value}>{children}</NexusContext.Provider>
  );
}

export function useNexus(): NexusContextValue {
  const ctx = useContext(NexusContext);
  if (!ctx) throw new Error("useNexus must be used within NexusProvider");
  return ctx;
}
