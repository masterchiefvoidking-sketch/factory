"use client";

import { useFactory } from "@/context/FactoryContext";
import { BuildingInterior } from "@/components/building/BuildingInterior";
import { TowerInterior } from "@/components/tower/TowerInterior";
import { GardenInterior } from "@/components/garden/GardenInterior";
import { UtilityFloorInterior } from "@/components/nexus/UtilityFloorInterior";
import { OperationsFloorInterior } from "@/components/operations/OperationsFloorInterior";

export function LocationView() {
  const { location } = useFactory();

  if (location.buildingId === "tower") return <TowerInterior />;
  if (location.buildingId === "garden") return <GardenInterior />;
  if (location.buildingId === "utility-floor") return <UtilityFloorInterior />;
  if (location.buildingId === "operations-center") return <OperationsFloorInterior />;
  return <BuildingInterior />;
}
