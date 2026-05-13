"use client";

import { useProgressStore } from "@/store/progress";
import { PillarFrontmatter } from "@/types/content";
import { CheckCircle2, Circle, Clock, AlertTriangle, Sparkles } from "lucide-react";

interface MasteryDashboardProps {
  pillars: PillarFrontmatter[];
}

export default function MasteryDashboard({ pillars }: MasteryDashboardProps) {
  const { masteredPillars, quizScores, completedExercises, reviewDates } = useProgressStore();

  const getPillarStatus = (slug: string, exerciseCount: number) => {
    const quizPassed = !!quizScores[slug];
    const completedCount = Object.keys(completedExercises).filter(id => id.startsWith(slug) && completedExercises[id]).length;
    
    // In a real app we'd get actual exercise counts, for now we assume 1+
    const allExercisesDone = completedCount >= 1;
    
    const isDue = reviewDates[slug] && Date.now() > reviewDates[slug];
    
    if (quizPassed && allExercisesDone) return isDue ? "due" : "mastered";
    if (quizPassed || completedCount > 0) return "in-progress";
    return "locked";
  };

  if (!pillars || pillars.length === 0) return null;

  const masteryCount = pillars.filter(p => {
    const status = getPillarStatus(p.slug, 1);
    return status === "mastered" || status === "due";
  }).length;
  
  const readinessScore = pillars.length > 0 ? Math.round((masteryCount / pillars.length) * 100) : 0;

  const getLevelName = (score: number) => {
    if (score >= 100) return "Principal Engineer";
    if (score >= 80) return "Senior Staff";
    if (score >= 60) return "Senior Frontend";
    if (score >= 40) return "Mid-Level";
    if (score >= 20) return "Junior Engineer";
    return "Intern";
  };

  const levelName = getLevelName(readinessScore);

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
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
            Mastery Dashboard
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-[10px] text-accent-primary uppercase tracking-tighter font-bold">
              <Sparkles className="w-3 h-3" />
              {levelName} ({readinessScore}%)
            </span>
          </h2>
          <p className="text-sm text-foreground/50 mt-1">
            Track your senior-level mastery across all pillars.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-1.5 text-accent-emerald">
            <div className="w-2 h-2 rounded-full bg-accent-emerald shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            Mastered
          </div>
          <div className="flex items-center gap-1.5 text-accent-amber">
            <div className="w-2 h-2 rounded-full bg-accent-amber shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            Review Due
          </div>
          <div className="flex items-center gap-1.5 text-accent-primary">
            <div className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(124,92,252,0.5)]" />
            Active
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-4 -mx-2 px-2 md:overflow-visible">
        <div className="flex md:grid md:grid-cols-8 lg:grid-cols-10 gap-3 min-w-max md:min-w-0">
          {pillars.map((pillar) => {
            const status = getPillarStatus(pillar.slug, 1);
            
            let statusClass = "border-[rgba(139,148,255,0.05)] bg-surface/20 opacity-30";
            let icon = <Circle className="w-3 h-3 text-foreground/10" />;
            
            if (status === "mastered") {
              statusClass = "border-accent-emerald/30 bg-accent-emerald/5 opacity-100";
              icon = <CheckCircle2 className="w-4 h-4 text-accent-emerald" />;
            } else if (status === "due") {
              statusClass = "border-accent-amber/40 bg-accent-amber/5 opacity-100 shadow-[0_0_15px_rgba(251,191,36,0.1)]";
              icon = <AlertTriangle className="w-4 h-4 text-accent-amber animate-bounce" />;
            } else if (status === "in-progress") {
              statusClass = "border-accent-primary/40 bg-accent-primary/5 opacity-100";
              icon = <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />;
            }

            return (
              <button
                key={pillar.slug}
                onClick={() => scrollToPillar(pillar.slug)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-500 hover:scale-105 hover:border-foreground/20 group/item min-w-[80px] ${statusClass}`}
                title={pillar.title}
              >
                <span className="text-2xl mb-2 filter grayscale-[0.5] group-hover/item:grayscale-0 transition-all">
                  {pillar.icon}
                </span>
                <div className="mt-auto">
                  {icon}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
