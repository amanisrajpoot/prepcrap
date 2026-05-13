"use client";

import { useProgressStore } from "@/store/progress";
import { PillarFrontmatter } from "@/types/content";
import { CheckCircle2, Circle, Lock } from "lucide-react";

interface MasteryDashboardProps {
  pillars: PillarFrontmatter[];
}

export default function MasteryDashboard({ pillars }: MasteryDashboardProps) {
  const { masteredPillars, quizScores, completedExercises } = useProgressStore();

  const getPillarStatus = (slug: string, exerciseCount: number) => {
    const quizPassed = !!quizScores[slug];
    
    // Count completed exercises for this pillar
    const completedCount = Object.keys(completedExercises).filter(id => id.startsWith(slug) && completedExercises[id]).length;
    const allExercisesDone = completedCount >= exerciseCount && exerciseCount > 0;
    
    if (quizPassed && allExercisesDone) return "mastered";
    if (quizPassed || completedCount > 0) return "in-progress";
    return "locked";
  };

  const scrollToPillar = (slug: string) => {
    const el = document.getElementById(`pillar-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full glass-card p-6 mb-12 relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-accent-primary/10 transition-all duration-700" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            Mastery Dashboard
            <span className="text-xs font-normal text-foreground/40 font-mono bg-foreground/5 px-2 py-0.5 rounded">
              {pillars.filter(p => getPillarStatus(p.slug, 1) === "mastered").length}/{pillars.length} Mastered
            </span>
          </h2>
          <p className="text-sm text-foreground/50 mt-1">
            Complete all exercises and pass the quiz to master a pillar.
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-1.5 text-accent-emerald">
            <div className="w-2 h-2 rounded-full bg-accent-emerald shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            Mastered
          </div>
          <div className="flex items-center gap-1.5 text-accent-primary">
            <div className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(124,92,252,0.5)]" />
            In Progress
          </div>
          <div className="flex items-center gap-1.5 text-foreground/20">
            <div className="w-2 h-2 rounded-full bg-foreground/10" />
            Not Started
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-3">
        {pillars.map((pillar) => {
          // Approximate exercise count (will be refined in the store later if needed)
          // For now just assume 1 to check status
          const status = getPillarStatus(pillar.slug, 1);
          
          let statusClass = "border-[rgba(139,148,255,0.1)] bg-surface/30 opacity-40";
          let icon = <Circle className="w-3 h-3 text-foreground/20" />;
          
          if (status === "mastered") {
            statusClass = "border-accent-emerald/40 bg-accent-emerald/5 shadow-[0_0_15px_rgba(52,211,153,0.1)] opacity-100";
            icon = <CheckCircle2 className="w-4 h-4 text-accent-emerald" />;
          } else if (status === "in-progress") {
            statusClass = "border-accent-primary/40 bg-accent-primary/5 shadow-[0_0_15px_rgba(124,92,252,0.1)] opacity-100";
            icon = <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />;
          }

          return (
            <button
              key={pillar.slug}
              onClick={() => scrollToPillar(pillar.slug)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 hover:scale-110 hover:border-foreground/30 group/item ${statusClass}`}
              title={pillar.title}
            >
              <span className="text-xl mb-1 filter grayscale-[0.5] group-hover/item:grayscale-0 transition-all">
                {pillar.icon}
              </span>
              <div className="mt-1">
                {icon}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
