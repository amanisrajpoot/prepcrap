"use client";

import { useState } from "react";
import type { TrackDay } from "@/types/content";
import { TRACK_OPTIONS } from "@/types/content";

interface TrackSelectorProps {
  selectedTrack: TrackDay;
  onTrackChange: (track: TrackDay) => void;
}

export default function TrackSelector({
  selectedTrack,
  onTrackChange,
}: TrackSelectorProps) {
  const [hoveredTrack, setHoveredTrack] = useState<TrackDay | null>(null);

  return (
    <div className="w-full" id="track-selector">
      {/* Section Header */}
      <div className="text-center mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-primary mb-2">
          Choose Your Pace
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Select a Study Track
        </h2>
        <p className="mt-2 text-sm text-foreground/50 max-w-md mx-auto">
          Pick a timeline that fits your schedule. All tracks cover the same
          pillars — intensity is what changes.
        </p>
      </div>

      {/* Track Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {TRACK_OPTIONS.map((option) => {
          const isActive = selectedTrack === option.days;
          const isHovered = hoveredTrack === option.days;

          return (
            <button
              key={option.days}
              className="track-pill group"
              data-active={isActive}
              data-track={option.days}
              onClick={() => onTrackChange(option.days)}
              onMouseEnter={() => setHoveredTrack(option.days)}
              onMouseLeave={() => setHoveredTrack(null)}
              id={`track-${option.days}-day`}
              aria-pressed={isActive}
              aria-label={`Select ${option.label}`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`text-lg transition-transform duration-300 ${
                    isActive || isHovered ? "scale-110" : ""
                  }`}
                >
                  {option.icon}
                </span>
                <span>{option.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Track Description */}
      <div className="mt-6 text-center">
        {TRACK_OPTIONS.map((option) => (
          <p
            key={option.days}
            className={`text-sm text-foreground/40 transition-all duration-300 ${
              selectedTrack === option.days
                ? "opacity-100 translate-y-0"
                : "hidden"
            }`}
          >
            {option.subtitle}
          </p>
        ))}
      </div>
    </div>
  );
}
