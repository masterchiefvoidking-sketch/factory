import type { RhythmPhase, RhythmProfile } from "./types";

export const RHYTHM_PROFILES: Record<RhythmPhase, RhythmProfile> = {
  "morning-startup": {
    id: "morning-startup",
    label: "Morning Startup",
    description: "Systems boot. Departments come online. The campus awakens.",
    campusNote: "Warm sunlight. Departure board activates.",
  },
  "daily-brief": {
    id: "daily-brief",
    label: "Daily Brief",
    description: "Mission Control reviews objectives. Morgan gets the briefing.",
    campusNote: "Tower atrium is busiest.",
  },
  "operational-hours": {
    id: "operational-hours",
    label: "Operational Hours",
    description: "Full production. All departments working.",
    campusNote: "Conveyors moving. Mailroom active.",
  },
  "lunch-state": {
    id: "lunch-state",
    label: "Lunch State",
    description: "Reduced pace. The Commons fills.",
    campusNote: "Bright lighting. Garden may be active.",
  },
  "evening-wind-down": {
    id: "evening-wind-down",
    label: "Evening Wind-down",
    description: "Day shift completes. Handoffs to night processing.",
    campusNote: "Warm to cool transition.",
  },
  "night-processing": {
    id: "night-processing",
    label: "Night Processing",
    description: "Background jobs. Batch processing. Observatory watches.",
    campusNote: "Blue ambient. Reduced staff.",
  },
  "weekend-mode": {
    id: "weekend-mode",
    label: "Weekend Mode",
    description: "Maintenance crews. Prototype benches. Movie nights.",
    campusNote: "Relaxed atmosphere.",
  },
  "holiday-mode": {
    id: "holiday-mode",
    label: "Holiday Mode",
    description: "Celebrations. Reduced operations.",
    campusNote: "The Commons celebrates.",
  },
};

export function detectRhythmPhase(): RhythmPhase {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();

  if (day === 0 || day === 6) return "weekend-mode";
  if (hour >= 6 && hour < 7) return "morning-startup";
  if (hour >= 7 && hour < 8) return "daily-brief";
  if (hour >= 8 && hour < 12) return "operational-hours";
  if (hour >= 12 && hour < 13) return "lunch-state";
  if (hour >= 13 && hour < 17) return "operational-hours";
  if (hour >= 17 && hour < 19) return "evening-wind-down";
  return "night-processing";
}
