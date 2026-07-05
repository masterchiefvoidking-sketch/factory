"use client";

import { useOperations } from "@/context/OperationsContext";
import { RHYTHM_PROFILES } from "@/operations/rhythm";

export function DailyRhythmBanner() {
  const { clock } = useOperations();
  const profile = RHYTHM_PROFILES[clock.rhythmPhase];

  return (
    <div className="flex items-center justify-between border-b border-factory-accent-dim/15 bg-factory-bg-elevated/30 px-6 py-2">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-factory-accent">
            Campus Clock · {clock.factoryTime}
          </p>
          <p className="text-[10px] text-factory-text-muted">{clock.operationalDay}</p>
        </div>
        <div className="hidden h-6 w-px bg-factory-accent-dim/20 sm:block" />
        <div className="hidden sm:block">
          <p className="text-[10px] font-medium text-factory-text">{profile.label}</p>
          <p className="text-[9px] text-factory-text-muted">{profile.campusNote}</p>
        </div>
      </div>
      <p className="text-[9px] italic text-factory-text-muted/60 hidden md:block">
        {profile.description}
      </p>
    </div>
  );
}
