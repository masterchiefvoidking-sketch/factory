import type { DesignSystemTokens } from "./types";

/**
 * Factory Design System
 *
 * Typography, spacing, animations, glass, lighting.
 * Applications feel related without looking identical.
 */

export const DESIGN_SYSTEM: DesignSystemTokens = {
  typography: {
    "display": "font-light tracking-[0.3em] uppercase",
    "heading": "font-light tracking-wide",
    "body": "text-sm leading-relaxed",
    "caption": "text-[10px] uppercase tracking-[0.2em]",
    "mono": "font-mono tabular-nums",
  },
  spacing: {
    "room": "2rem",
    "hallway": "1.5rem",
    "desk": "1rem",
    "tight": "0.5rem",
  },
  elevation: {
    "floor": "0",
    "desk": "1",
    "panel": "2",
    "overlay": "40",
    "transit": "50",
  },
  glass: {
    "window": "bg-factory-bg-surface/80 backdrop-blur-sm",
    "panel": "bg-factory-bg-elevated/50 backdrop-blur-md",
    "hud": "bg-factory-bg-deep/60 backdrop-blur-lg",
  },
  lighting: {
    "morning": "rgba(255, 200, 120, 0.06)",
    "lunch": "rgba(255, 255, 240, 0.04)",
    "night": "rgba(60, 100, 200, 0.1)",
    "maintenance": "rgba(255, 50, 50, 0.12)",
    "glow": "rgba(201, 162, 39, 0.15)",
  },
  animation: {
    "travel": "0.8s ease-in-out",
    "fade": "0.6s ease",
    "machinery": "2s ease-in-out infinite",
  },
};
