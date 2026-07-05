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
  getElevatorTravelDuration,
} from "@/domain/registry";
import type {
  BuildingId,
  ClearanceLevel,
  FactoryState,
  PowerState,
  Shift,
} from "@/domain/types";
import { hasClearance } from "@/domain/types";

interface FactoryContextValue extends FactoryState {
  currentBuilding: (typeof BUILDINGS)[BuildingId];
  currentShift: Shift;
  travelTo: (buildingId: BuildingId) => void;
  setClearance: (level: ClearanceLevel) => void;
  setShift: (shift: Shift) => void;
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

export function FactoryProvider({ children }: { children: ReactNode }) {
  const [currentBuildingId, setCurrentBuildingId] =
    useState<BuildingId>("courtyard");
  const [userClearance, setUserClearance] =
    useState<ClearanceLevel>("founder");
  const [currentShift, setCurrentShift] = useState<Shift>(detectShift);
  const [powerState, setPowerState] = useState<PowerState>("online");
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelingFrom, setTravelingFrom] = useState<BuildingId | null>(null);
  const [travelingTo, setTravelingTo] = useState<BuildingId | null>(null);

  useEffect(() => {
    document.body.setAttribute("data-shift", currentShift);
  }, [currentShift]);

  const canEnter = useCallback(
    (buildingId: BuildingId) => {
      const building = BUILDINGS[buildingId];
      return hasClearance(userClearance, building.clearanceRequired);
    },
    [userClearance]
  );

  const travelTo = useCallback(
    (buildingId: BuildingId) => {
      if (buildingId === currentBuildingId || isTraveling) return;
      if (!canEnter(buildingId)) return;

      const fromBuilding = BUILDINGS[currentBuildingId];
      const toBuilding = BUILDINGS[buildingId];
      const duration = getElevatorTravelDuration(
        fromBuilding.floor,
        toBuilding.floor
      );

      setIsTraveling(true);
      setTravelingFrom(currentBuildingId);
      setTravelingTo(buildingId);

      setTimeout(() => {
        setCurrentBuildingId(buildingId);
        setIsTraveling(false);
        setTravelingFrom(null);
        setTravelingTo(null);
      }, duration);
    },
    [currentBuildingId, isTraveling, canEnter]
  );

  const value = useMemo<FactoryContextValue>(
    () => ({
      campus: {
        name: "The Factory",
        location: "Somewhere between the city and the stars",
        buildings: Object.keys(BUILDINGS) as BuildingId[],
        currentShift,
        powerState,
      },
      currentBuildingId,
      currentBuilding: BUILDINGS[currentBuildingId],
      userClearance,
      isTraveling,
      travelingFrom,
      travelingTo,
      powerState,
      currentShift,
      travelTo,
      setClearance: setUserClearance,
      setShift: setCurrentShift,
      setPowerState,
      canEnter,
    }),
    [
      currentBuildingId,
      userClearance,
      isTraveling,
      travelingFrom,
      travelingTo,
      powerState,
      currentShift,
      travelTo,
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
