"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { TrackDay } from "@/types/content";

interface TrackContextType {
  selectedTrack: TrackDay;
  setSelectedTrack: (track: TrackDay) => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export function TrackProvider({ children }: { children: ReactNode }) {
  const [selectedTrack, setSelectedTrack] = useState<TrackDay>(3);
  return (
    <TrackContext.Provider value={{ selectedTrack, setSelectedTrack }}>
      {children}
    </TrackContext.Provider>
  );
}

export function useTrack() {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error("useTrack must be used within a TrackProvider");
  }
  return context;
}
