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
import {
  BUILDINGS,
  DEFAULT_LOCATION,
  getTravelDuration,
  getTransitMode,
  isSameLocation,
} from "@/domain/registry";
import type {
  BuildingId,
  ClearanceLevel,
  FactoryState,
  Location,
  PowerState,
  Shift,
  TimePeriod,
  TowerRoomId,
  TransitMode,
} from "@/domain/types";
import { hasClearance } from "@/domain/types";

interface FactoryContextValue extends FactoryState {
  currentBuilding: (typeof BUILDINGS)[BuildingId];
  currentRoomName: string | null;
  travelTo: (buildingId: BuildingId, towerRoom?: TowerRoomId) => void;
  travelToTowerRoom: (room: TowerRoomId) => void;
  setClearance: (level: ClearanceLevel) => void;
  setShift: (shift: Shift) => void;
  setTimePeriod: (period: TimePeriod) => void;
  setPowerState: (state: PowerState) => void;
  canEnter: (buildingId: BuildingId) => boolean;
}

const FactoryContext = createContext<FactoryContextValue | null>(null);

function detectShift(): Shift {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  if (day === 0 || day === 6) return "weekend";
  if (hour >= 6 && hour < 18) return "morning";
  return "night";
}

function detectTimePeriod(): TimePeriod {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return "morning";
  if (hour >= 11 && hour < 14) return "lunch";
  if (hour >= 22 || hour < 6) return "night";
  return "morning";
}

export function FactoryProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION);
  const [userClearance, setUserClearance] = useState<ClearanceLevel>("founder");
  const [currentShift, setCurrentShift] = useState<Shift>(detectShift);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(detectTimePeriod);
  const [powerState, setPowerState] = useState<PowerState>("online");
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelingFrom, setTravelingFrom] = useState<Location | null>(null);
  const [travelingTo, setTravelingTo] = useState<Location | null>(null);
  const [transitMode, setTransitMode] = useState<TransitMode | null>(null);

  useEffect(() => {
    document.body.setAttribute("data-shift", currentShift);
    document.body.setAttribute("data-time", timePeriod);
    if (powerState === "offline") {
      document.body.setAttribute("data-time", "maintenance");
    }
  }, [currentShift, timePeriod, powerState]);

  const canEnter = useCallback(
    (buildingId: BuildingId) => {
      return hasClearance(userClearance, BUILDINGS[buildingId].clearanceRequired);
    },
    [userClearance]
  );

  const travelTo = useCallback(
    (buildingId: BuildingId, towerRoom?: TowerRoomId) => {
      const target: Location = {
        buildingId,
        towerRoom:
          buildingId === "tower"
            ? towerRoom ?? "atrium"
            : undefined,
      };

      if (isSameLocation(location, target) || isTraveling) return;
      if (!canEnter(buildingId)) return;

      const mode = getTransitMode(location.buildingId, buildingId);
      const duration =
        location.buildingId === buildingId && buildingId === "tower"
          ? 800
          : getTravelDuration(location.buildingId, buildingId);

      setIsTraveling(true);
      setTravelingFrom(location);
      setTravelingTo(target);
      setTransitMode(
        location.buildingId === buildingId ? "elevator" : mode
      );

      setTimeout(() => {
        setLocation(target);
        setIsTraveling(false);
        setTravelingFrom(null);
        setTravelingTo(null);
        setTransitMode(null);
      }, duration);
    },
    [location, isTraveling, canEnter]
  );

  const travelToTowerRoom = useCallback(
    (room: TowerRoomId) => travelTo("tower", room),
    [travelTo]
  );

  const currentBuilding = BUILDINGS[location.buildingId];
  const currentRoomName =
    location.buildingId === "tower" && location.towerRoom
      ? currentBuilding.towerRooms?.find((r) => r.id === location.towerRoom)?.name ?? null
      : null;

  const value = useMemo<FactoryContextValue>(
    () => ({
      campus: {
        name: "The Factory",
        codename: "TITAN CAMPUS",
        location: "Apple Park meets NASA meets Disney",
        buildings: Object.keys(BUILDINGS) as BuildingId[],
      },
      location,
      currentBuilding,
      currentRoomName,
      userClearance,
      isTraveling,
      travelingFrom,
      travelingTo,
      transitMode,
      powerState,
      currentShift,
      timePeriod,
      travelTo,
      travelToTowerRoom,
      setClearance: setUserClearance,
      setShift: setCurrentShift,
      setTimePeriod,
      setPowerState,
      canEnter,
    }),
    [
      location,
      currentBuilding,
      currentRoomName,
      userClearance,
      isTraveling,
      travelingFrom,
      travelingTo,
      transitMode,
      powerState,
      currentShift,
      timePeriod,
      travelTo,
      travelToTowerRoom,
      canEnter,
    ]
  );

  return (
    <FactoryContext.Provider value={value}>{children}</FactoryContext.Provider>
  );
}

export function useFactory(): FactoryContextValue {
  const ctx = useContext(FactoryContext);
  if (!ctx) throw new Error("useFactory must be used within FactoryProvider");
  return ctx;
}
