"use client";

import { TrackProvider, useTrack } from "@/context/TrackContext";
import TrackSelector from "@/components/TrackSelector";
import MasteryDashboard from "@/components/MasteryDashboard";
import { useProgressStore } from "@/store/progress";
import { PillarFrontmatter } from "@/types/content";
import { BookOpen, Zap } from "lucide-react";

interface ContentAreaProps {
  children: React.ReactNode;
  count: number;
  pillars: PillarFrontmatter[];
}

function ContentAreaInner({ children, count, pillars }: ContentAreaProps) {
  const { selectedTrack, setSelectedTrack } = useTrack();
  const { viewMode, setViewMode } = useProgressStore();

  return (
    <>
      {/* Mastery Dashboard */}
      <section className="mb-12">
        <MasteryDashboard pillars={pillars} />
      </section>

      {/* Track Selector */}
      <section className="mb-12 md:mb-16">
        <TrackSelector
          selectedTrack={selectedTrack}
          onTrackChange={setSelectedTrack}
        />
      </section>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex p-1 rounded-full bg-surface border border-[rgba(139,148,255,0.1)] shadow-lg">
          <button
            onClick={() => setViewMode("deep-dive")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${
              viewMode === "deep-dive"
                ? "bg-accent-primary text-white shadow-glow-sm"
                : "text-foreground/40 hover:text-foreground/70"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Deep Dive
          </button>
          <button
            onClick={() => setViewMode("rapid-revision")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${
              viewMode === "rapid-revision"
                ? "bg-accent-rose text-white shadow-[0_0_15px_rgba(244,114,182,0.3)]"
                : "text-foreground/40 hover:text-foreground/70"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Rapid Revision
          </button>
        </div>
      </div>

      {/* Accordion Pillars */}
      <section className="w-full max-w-3xl mx-auto" id="pillars-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {viewMode === "rapid-revision" ? "Revision Cards" : "Study Pillars"}
          </h2>
          <span className="text-xs text-foreground/40 font-mono">
            {count} modules
          </span>
        </div>

        <div className="space-y-3 stagger-children" key={`${selectedTrack}-${viewMode}`}>
          {children}
        </div>
      </section>
    </>
  );
}

export default function ContentArea({ children, count, pillars }: ContentAreaProps) {
  return (
    <TrackProvider>
      <ContentAreaInner count={count} pillars={pillars}>{children}</ContentAreaInner>
    </TrackProvider>
  );
}
