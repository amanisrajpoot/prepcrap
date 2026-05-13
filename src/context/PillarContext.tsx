"use client";

import { createContext, useContext } from "react";

interface PillarContextType {
  slug: string;
}

const PillarContext = createContext<PillarContextType | undefined>(undefined);

export function PillarProvider({ slug, children }: { slug: string; children: React.ReactNode }) {
  return <PillarContext.Provider value={{ slug }}>{children}</PillarContext.Provider>;
}

export function usePillar() {
  const context = useContext(PillarContext);
  if (context === undefined) {
    // Return a default or empty slug to avoid breaking, 
    // but ideally components should be used within a provider
    return { slug: "" };
  }
  return context;
}
