"use client";

import { motion } from "framer-motion";
import { FOUNDATION_PRINCIPLE } from "@/domain/types";

export function GardenInterior() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="factory-scroll flex h-full flex-col items-center justify-center overflow-y-auto p-8"
    >
      {/* Sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #1a3a5c 0%, #2d6a4f 40%, #1b4332 100%)",
        }}
      />

      {/* Trees silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3">
        <svg viewBox="0 0 800 200" className="h-full w-full" preserveAspectRatio="none">
          <ellipse cx="100" cy="180" rx="60" ry="80" fill="#0d2818" />
          <ellipse cx="250" cy="170" rx="80" ry="100" fill="#0a1f12" />
          <ellipse cx="400" cy="175" rx="70" ry="90" fill="#0d2818" />
          <ellipse cx="550" cy="165" rx="90" ry="110" fill="#0a1f12" />
          <ellipse cx="700" cy="180" rx="65" ry="85" fill="#0d2818" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg text-center">
        <p className="text-5xl">🌳</p>
        <h1 className="mt-4 text-2xl font-light tracking-wide text-green-200">
          The Garden
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-green-100/70">
          No screens. Trees. Water. Benches. Sky.
        </p>
        <p className="mt-6 text-sm italic text-green-100/50">
          Where difficult decisions are made. Where ideas mature.
          Where weekly reviews happen.
        </p>
        <p className="mt-8 text-xs text-green-100/40">
          Somewhere that isn&apos;t trying to accomplish anything.
        </p>

        <blockquote className="mt-12 border-l-2 border-green-400/30 pl-4 text-left text-sm italic text-green-100/40">
          &ldquo;{FOUNDATION_PRINCIPLE}&rdquo;
        </blockquote>
      </div>

      {/* Ambient sound indicator */}
      <p className="absolute bottom-6 text-[10px] tracking-wider text-green-100/30">
        ◉ wind through trees · water · birds ◉
      </p>
    </motion.div>
  );
}
