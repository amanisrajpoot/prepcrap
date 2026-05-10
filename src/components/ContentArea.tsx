"use client";

import { useState } from "react";
import type { TrackDay, PillarFrontmatter } from "@/types/content";
import TrackSelector from "@/components/TrackSelector";
import AccordionPillar from "@/components/AccordionPillar";

interface PillarData {
  frontmatter: PillarFrontmatter;
  contentNode: React.ReactNode;
}

interface ContentAreaProps {
  pillars: PillarData[];
}

export default function ContentArea({ pillars }: ContentAreaProps) {
  const [selectedTrack, setSelectedTrack] = useState<TrackDay>(3);

  return (
    <>
      {/* Track Selector */}
      <section className="mb-12 md:mb-16">
        <TrackSelector
          selectedTrack={selectedTrack}
          onTrackChange={setSelectedTrack}
        />
      </section>

      {/* Accordion Pillars */}
      <section className="w-full max-w-3xl mx-auto" id="pillars-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Study Pillars
          </h2>
          <span className="text-xs text-foreground/40 font-mono">
            {pillars.length} modules
          </span>
        </div>

        <div className="space-y-3 stagger-children" key={selectedTrack}>
          {pillars.length > 0 ? (
            pillars.map((pillar, index) => (
              <AccordionPillar
                key={pillar.frontmatter.slug}
                frontmatter={pillar.frontmatter}
                contentNode={pillar.contentNode}
                selectedTrack={selectedTrack}
                index={index}
              />
            ))
          ) : (
            /* Empty state placeholder */
            <div className="glass-card p-12 text-center">
              <div className="text-5xl mb-4 animate-float">📚</div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                No Content Yet
              </h3>
              <p className="text-sm text-foreground/50 max-w-sm mx-auto">
                Add <code className="text-accent-primary">.mdx</code> files to
                the <code className="text-accent-primary">content/</code>{" "}
                directory to get started. Each file represents a study pillar.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
