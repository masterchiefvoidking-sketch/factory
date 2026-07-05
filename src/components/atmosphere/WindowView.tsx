"use client";

import { useEffect, useState } from "react";

interface OutsideWorld {
  timeOfDay: string;
  weather: string;
  temperature: string;
  city: string;
  season: string;
  skyDescription: string;
}

function getOutsideWorld(): OutsideWorld {
  const hour = new Date().getHours();
  const month = new Date().getMonth();

  let timeOfDay: string;
  let skyDescription: string;
  if (hour >= 5 && hour < 8) {
    timeOfDay = "Dawn";
    skyDescription = "Pale gold bleeding into lavender";
  } else if (hour >= 8 && hour < 17) {
    timeOfDay = "Day";
    skyDescription = "Clear blue with scattered clouds";
  } else if (hour >= 17 && hour < 20) {
    timeOfDay = "Dusk";
    skyDescription = "Amber horizon, deepening violet above";
  } else {
    timeOfDay = "Night";
    skyDescription = "Stars visible through the glass";
  }

  const seasons = ["Winter", "Winter", "Spring", "Spring", "Spring", "Summer", "Summer", "Summer", "Autumn", "Autumn", "Autumn", "Winter"];

  return {
    timeOfDay,
    weather: "Clear",
    temperature: `${18 + Math.floor(Math.sin(month) * 8)}°C`,
    city: "The city stretches below",
    season: seasons[month],
    skyDescription,
  };
}

export function WindowView() {
  const [world, setWorld] = useState<OutsideWorld>(getOutsideWorld);

  useEffect(() => {
    const interval = setInterval(() => setWorld(getOutsideWorld()), 60000);
    return () => clearInterval(interval);
  }, []);

  const isNight = world.timeOfDay === "Night" || world.timeOfDay === "Dusk";

  return (
    <div className="relative h-32 w-full overflow-hidden rounded-sm border border-factory-accent-dim/20">
      {/* Sky gradient */}
      <div
        className="absolute inset-0 transition-all duration-[5000ms]"
        style={{
          background: isNight
            ? "linear-gradient(to bottom, #0a0a20 0%, #1a1a3a 40%, #2a2a4a 100%)"
            : world.timeOfDay === "Dawn"
              ? "linear-gradient(to bottom, #ff9a56 0%, #ffd89b 40%, #87ceeb 100%)"
              : "linear-gradient(to bottom, #4a90d9 0%, #87ceeb 50%, #b8dff5 100%)",
        }}
      />

      {/* Stars at night */}
      {isNight && (
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() > 0.8 ? 2 : 1,
                height: Math.random() > 0.8 ? 2 : 1,
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.7,
              }}
            />
          ))}
        </div>
      )}

      {/* City silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-12">
        <svg viewBox="0 0 400 50" className="h-full w-full" preserveAspectRatio="none">
          <rect x="0" y="30" width="30" height="20" fill={isNight ? "#0a0a15" : "#2a3a4a"} />
          <rect x="35" y="20" width="25" height="30" fill={isNight ? "#0c0c18" : "#3a4a5a"} />
          <rect x="65" y="10" width="20" height="40" fill={isNight ? "#080810" : "#2a3a4a"} />
          <rect x="90" y="25" width="35" height="25" fill={isNight ? "#0a0a15" : "#3a4a5a"} />
          <rect x="130" y="5" width="15" height="45" fill={isNight ? "#0c0c18" : "#2a3a4a"} />
          <rect x="150" y="15" width="40" height="35" fill={isNight ? "#080810" : "#3a4a5a"} />
          <rect x="195" y="22" width="25" height="28" fill={isNight ? "#0a0a15" : "#2a3a4a"} />
          <rect x="225" y="8" width="18" height="42" fill={isNight ? "#0c0c18" : "#3a4a5a"} />
          <rect x="248" y="18" width="30" height="32" fill={isNight ? "#080810" : "#2a3a4a"} />
          <rect x="283" y="28" width="22" height="22" fill={isNight ? "#0a0a15" : "#3a4a5a"} />
          <rect x="310" y="12" width="28" height="38" fill={isNight ? "#0c0c18" : "#2a3a4a"} />
          <rect x="343" y="22" width="20" height="28" fill={isNight ? "#080810" : "#2a3a4a"} />
          <rect x="368" y="32" width="32" height="18" fill={isNight ? "#0a0a15" : "#3a4a5a"} />
        </svg>
      </div>

      {/* Window frame overlay */}
      <div className="absolute inset-0 border-2 border-factory-accent-dim/10" />

      {/* Info strip */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/40 px-3 py-1 text-[10px] tracking-wider text-factory-text-muted backdrop-blur-sm">
        <span>{world.timeOfDay} · {world.season}</span>
        <span>{world.weather} · {world.temperature}</span>
        <span>{world.skyDescription}</span>
      </div>
    </div>
  );
}
