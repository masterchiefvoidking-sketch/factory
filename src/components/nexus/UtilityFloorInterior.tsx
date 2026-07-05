"use client";

import { motion } from "framer-motion";
import { useNexus } from "@/context/NexusContext";
import { FactoryContractView } from "./FactoryContractView";
import { ObjectRegistryView } from "./ObjectRegistryView";

export function UtilityFloorInterior() {
  const { services, firstLaw } = useNexus();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="factory-scroll h-full overflow-y-auto"
    >
      <div className="border-b border-factory-accent-dim/20 px-8 py-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-factory-text-muted">
          Underground · Utilities Department
        </p>
        <h1 className="text-2xl font-light text-[#5d6d7e]">The Utility Floor</h1>
        <p className="mt-2 text-sm italic text-factory-text-muted">
          No tenant owns these. The Factory does.
        </p>
      </div>

      <div className="space-y-8 p-8">
        <blockquote className="border-l-2 border-[#5d6d7e] pl-4 text-sm italic text-factory-text-muted">
          &ldquo;{firstLaw}&rdquo;
        </blockquote>

        <section>
          <h2 className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-factory-accent">
            Shared Services — {services.length} Online
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="rounded border border-factory-accent-dim/15 bg-factory-bg-elevated/30 p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <p className="text-xs font-medium text-factory-text">{svc.name}</p>
                </div>
                <p className="mt-1 text-[10px] leading-relaxed text-factory-text-muted">
                  {svc.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <ObjectRegistryView />

        <FactoryContractView />
      </div>
    </motion.div>
  );
}
