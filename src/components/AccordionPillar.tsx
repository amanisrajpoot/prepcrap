"use client";

import { useState, useRef, useEffect } from "react";
import type { TrackDay, PillarFrontmatter } from "@/types/content";

import { useProgressStore } from "@/store/progress";

interface AccordionPillarProps {
  frontmatter: PillarFrontmatter;
  contentNode: React.ReactNode;
  selectedTrack: TrackDay;
  index: number;
}

function ChevronIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AccordionPillar({
  frontmatter,
  contentNode,
  selectedTrack,
  index,
}: AccordionPillarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { isCompleted, toggleExercise } = useProgressStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, selectedTrack]);

  const trackKey = `${selectedTrack}-day` as keyof typeof frontmatter.exercises;
  const exercises = frontmatter.exercises[trackKey] || [];

  const trackColors: Record<TrackDay, string> = {
    1: "from-pink-400 to-orange-400",
    3: "from-accent-primary to-accent-secondary",
    7: "from-accent-emerald to-accent-secondary",
  };

  return (
    <div
      className="accordion-item animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
      id={`pillar-${frontmatter.slug}`}
    >
      {/* Accordion Trigger */}
      <button
        className="accordion-trigger"
        onClick={() => setIsOpen(!isOpen)}
        data-open={isOpen}
        aria-expanded={isOpen}
        aria-controls={`content-${frontmatter.slug}`}
        id={`trigger-${frontmatter.slug}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{frontmatter.icon}</span>
          <div className="text-left">
            <h3 className="text-base md:text-lg font-bold">
              {frontmatter.title}
            </h3>
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
          </div>
        </div>
        <ChevronIcon />
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
          {/* Concept */}
          <div>
            <span className="badge badge-concept mb-2">Concept</span>
            <p className="text-sm text-foreground/70 leading-relaxed">
              {frontmatter.concept}
            </p>
          </div>

          {/* Interview Script */}
          <div>
            <span className="badge badge-script mb-2">Interview Script</span>
            <blockquote className="text-sm text-foreground/60 leading-relaxed italic border-l-2 border-accent-secondary/40 pl-4">
              &ldquo;{frontmatter.interviewScript}&rdquo;
            </blockquote>
          </div>

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
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={completed ? "opacity-100" : "opacity-0"}
                        suppressHydrationWarning
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
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
          {/* Interactive MDX Content */}
          <div className="pt-6 mt-6 border-t border-[rgba(139,148,255,0.1)] prose-mdx">
            {contentNode}
          </div>
        </div>
      </div>
    </div>
  );
}
