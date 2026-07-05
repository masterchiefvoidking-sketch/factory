import type { WallItem } from "@/domain/types";

interface WallDisplayProps {
  items: WallItem[];
  accent: string;
}

const WALL_ICONS: Record<WallItem["type"], string> = {
  blueprint: "📐",
  timeline: "📅",
  photo: "🖼",
  dashboard: "📺",
  quote: "💬",
  principle: "⚖",
};

export function WallDisplay({ items, accent }: WallDisplayProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/50 p-4 transition-colors hover:border-factory-accent-dim/30"
          style={{ borderTopColor: accent, borderTopWidth: 2 }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm">{WALL_ICONS[item.type]}</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-factory-text-muted">
              {item.type}
            </span>
          </div>
          <h4 className="mb-1 text-sm font-medium text-factory-text">
            {item.title}
          </h4>
          <p className="text-xs leading-relaxed text-factory-text-muted">
            {item.content}
          </p>
        </div>
      ))}
    </div>
  );
}
