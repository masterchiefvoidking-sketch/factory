"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexus } from "@/context/NexusContext";
import { TENANTS } from "@/nexus/tenants";

export function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    commands,
    search,
  } = useNexus();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof search> | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape") setCommandPaletteOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (query.length > 1) {
      setSearchResults(search(query));
    } else {
      setSearchResults(null);
    }
  }, [query, search]);

  const grouped = commands.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    },
    {} as Record<string, typeof commands>
  );

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg overflow-hidden rounded border border-factory-accent-dim/30 bg-factory-bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-factory-accent-dim/20 p-4">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search objects, commands, tenants..."
                className="w-full bg-transparent text-sm text-factory-text outline-none placeholder:text-factory-text-muted"
              />
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {searchResults && searchResults.total > 0 ? (
                <div>
                  <p className="px-2 py-1 text-[9px] uppercase tracking-wider text-factory-text-muted">
                    Search Results — {searchResults.total}
                  </p>
                  {searchResults.results.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center gap-2 rounded px-2 py-2 hover:bg-factory-bg-elevated"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: TENANTS[r.tenantId].badgeColor }}
                      />
                      <div>
                        <p className="text-xs text-factory-text">{r.title}</p>
                        <p className="text-[10px] text-factory-text-muted">{r.snippet}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                Object.entries(grouped).map(([category, cmds]) => (
                  <div key={category}>
                    <p className="px-2 py-1 text-[9px] uppercase tracking-wider text-factory-text-muted">
                      {category}
                    </p>
                    {cmds.map((cmd) => (
                      <button
                        key={cmd.id}
                        className="flex w-full items-center justify-between rounded px-2 py-2 text-left hover:bg-factory-bg-elevated"
                      >
                        <div>
                          <p className="text-xs text-factory-text">{cmd.label}</p>
                          <p className="text-[10px] text-factory-text-muted">{cmd.description}</p>
                        </div>
                        {cmd.shortcut && (
                          <span className="font-mono text-[10px] text-factory-text-muted">
                            {cmd.shortcut}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-factory-accent-dim/20 px-4 py-2 text-[9px] text-factory-text-muted">
              Factory Command System · ⌘K to toggle
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
