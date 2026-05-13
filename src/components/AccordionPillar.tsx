"use client";

import { useState, useRef, useEffect } from "react";
import type { TrackDay, PillarFrontmatter } from "@/types/content";
import { useTrack } from "@/context/TrackContext";
import { useProgressStore } from "@/store/progress";
import { PillarProvider } from "@/context/PillarContext";
import ActiveRecall from "@/components/ActiveRecall";
import { CheckCircle2, ChevronDown, Zap, BookOpen } from "lucide-react";

interface AccordionPillarProps {
  frontmatter: PillarFrontmatter;
  children: React.ReactNode;
  index: number;
}

export default function AccordionPillar({
  frontmatter,
  children,
  index,
}: AccordionPillarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { selectedTrack } = useTrack();
  const { isCompleted, toggleExercise, viewMode } = useProgressStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, selectedTrack, viewMode]);

  const trackKey = `${selectedTrack}-day` as keyof typeof frontmatter.exercises;
  const exercises = frontmatter.exercises[trackKey] || [];

  const trackColors: Record<TrackDay, string> = {
    1: "from-pink-400 to-orange-400",
    3: "from-accent-primary to-accent-secondary",
    7: "from-accent-emerald to-accent-secondary",
  };

  const isRevision = viewMode === "rapid-revision";

  return (
    <div
      className={`accordion-item animate-fade-in-up transition-all duration-500 ${
        isRevision && !isOpen ? "opacity-90 scale-[0.98]" : "opacity-100 scale-100"
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
      id={`pillar-${frontmatter.slug}`}
    >
      {/* Accordion Trigger */}
      <button
        className={`accordion-trigger ${isRevision ? "!py-3" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        data-open={isOpen}
        aria-expanded={isOpen}
        aria-controls={`content-${frontmatter.slug}`}
        id={`trigger-${frontmatter.slug}`}
      >
        <div className="flex items-center gap-3">
          <div className={`relative ${isRevision ? "scale-90" : ""}`}>
            <span className="text-2xl">{frontmatter.icon}</span>
            {isRevision && (
              <div className="absolute -top-1 -right-1 p-0.5 rounded-full bg-accent-rose text-white">
                <Zap className="w-2 h-2" />
              </div>
            )}
          </div>
          <div className="text-left">
            <h3 className={`font-bold transition-all ${isRevision ? "text-sm" : "text-base md:text-lg"}`}>
              {frontmatter.title}
            </h3>
            {!isRevision && (
              <>
                <p className="text-xs text-foreground/40 mt-0.5">
                  {exercises.length} exercise{exercises.length !== 1 ? "s" : ""} for{" "}
                  {selectedTrack}-day track
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                    Interactive Quiz
                  </span>
                  {frontmatter.slug.includes("javascript") || frontmatter.slug.includes("react") || frontmatter.slug.includes("next") || frontmatter.slug.includes("node") || frontmatter.slug.includes("express") || frontmatter.slug.includes("state") || frontmatter.slug.includes("performance") ? (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
                      Code Playground
                    </span>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isRevision && !isOpen && (
             <span className="text-[10px] font-bold uppercase tracking-widest text-accent-rose animate-pulse">
                Review Card
             </span>
          )}
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {/* Accordion Content */}
      <div
        className="accordion-content"
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0",
          opacity: isOpen ? 1 : 0,
        }}
        id={`content-${frontmatter.slug}`}
        role="region"
        aria-labelledby={`trigger-${frontmatter.slug}`}
      >
        <div ref={contentRef} className="px-5 pb-5 space-y-5">
          {/* Concept - Only show summarized in revision */}
          <div className={isRevision ? "p-4 rounded-xl bg-surface-hover/50 border border-white/5" : ""}>
            <span className="badge badge-concept mb-2">
              {isRevision ? "Key Takeaway" : "Concept"}
            </span>
            <p className={`${isRevision ? "text-base font-medium text-foreground" : "text-sm text-foreground/70"} leading-relaxed`}>
              {frontmatter.concept}
            </p>
          </div>

          {/* Active Recall Interview Script */}
          <PillarProvider slug={frontmatter.slug}>
            <ActiveRecall title="Interview Pitch">
              <blockquote className="text-sm text-foreground/60 leading-relaxed italic border-l-2 border-accent-secondary/40 pl-4">
                &ldquo;{frontmatter.interviewScript}&rdquo;
              </blockquote>
            </ActiveRecall>

            {!isRevision && (
              <>
                {/* Pitfalls */}
                <div>
                  <span className="badge badge-pitfall mb-2">Pitfalls</span>
                  <ul className="space-y-2 mt-2">
                    {frontmatter.pitfalls.map((pitfall, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-accent-rose mt-0.5 flex-shrink-0">
                          ✗
                        </span>
                        <span className="text-foreground/65">{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exercises (filtered by track) */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge badge-exercise">Exercises</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${trackColors[selectedTrack]}`}
                    >
                      {selectedTrack}-Day
                    </span>
                  </div>
                  <ol className="space-y-2 mt-2">
                    {exercises.map((exercise, i) => {
                      const exerciseId = `${frontmatter.slug}-${selectedTrack}-${i}`;
                      const completed = hasMounted ? isCompleted(exerciseId) : false;

                      return (
                        <li key={i} className="flex items-start gap-3 text-sm group" suppressHydrationWarning>
                          <button
                            onClick={() => toggleExercise(exerciseId)}
                            className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                              completed
                                ? "bg-accent-emerald border-accent-emerald text-white"
                                : "border-foreground/30 hover:border-foreground/60 text-transparent"
                            }`}
                            aria-label={`Mark exercise ${i + 1} as completed`}
                          >
                            <CheckCircle2 className={`w-3.5 h-3.5 ${completed ? "opacity-100" : "opacity-0"}`} />
                          </button>
                          <span
                            className={`pt-0.5 transition-all ${
                              completed
                                ? "text-foreground/40 line-through"
                                : "text-foreground/70 group-hover:text-foreground/90"
                            }`}
                            suppressHydrationWarning
                          >
                            {exercise}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </>
            )}

            {/* Interactive MDX Content (Quizzes, Editors, etc.) */}
            <div className={`pt-6 mt-6 border-t border-[rgba(139,148,255,0.1)] prose-mdx ${isRevision ? "revision-mode" : ""}`}>
              {/* In Revision mode, we might want to only show Quizzes. 
                  But MDXRemote renders everything. We'll handle this in components or just keep it. */}
              {children}
            </div>
          </PillarProvider>
        </div>
      </div>
    </div>
  );
}
