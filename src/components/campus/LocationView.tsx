"use client";

import { useFactory } from "@/context/FactoryContext";
import { BuildingInterior } from "@/components/building/BuildingInterior";
import { TowerInterior } from "@/components/tower/TowerInterior";
import { GardenInterior } from "@/components/garden/GardenInterior";

export function LocationView() {
  const { location } = useFactory();

  if (location.buildingId === "tower") return <TowerInterior />;
  if (location.buildingId === "garden") return <GardenInterior />;
  return <BuildingInterior />;
}
