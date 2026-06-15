"use client";

import { useFeedStore } from "@/store/feed";
import { TopicActivity } from "@/types/curriculum";
import { TrendingUp, Play } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export function TopicClientDashboard({ 
  topicId, 
  activities 
}: { 
  topicId: string, 
  activities: TopicActivity[] 
}) {
  const { cardEvents } = useFeedStore();

  const { completedActivities, progressPercent, fakeInterviewScore } = useMemo(() => {
    let completed = 0;
    activities.forEach(act => {
      if (cardEvents[act.id]?.completed) {
        completed++;
      }
    });

    const progress = activities.length > 0 ? Math.round((completed / activities.length) * 100) : 0;
    
    // Fake interview score based on progress for now
    const interviewScore = Math.min(100, Math.round(progress * 0.8) + (progress === 100 ? 20 : 0));

    return { completedActivities: completed, progressPercent: progress, fakeInterviewScore: interviewScore };
  }, [activities, cardEvents]);

  return (
    <>
      <div className="flex gap-4 mb-6">
        <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold text-foreground/70 border border-white/10">
          {activities.length} Activities
        </span>
      </div>

      {/* Action Button */}
      <Link 
        href={`/feed/${topicId}`}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-accent-primary hover:bg-accent-primary/90 text-white font-bold py-4 px-8 rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(139,148,255,0.3)] mb-8"
      >
        <Play className="w-5 h-5 fill-current" />
        {progressPercent === 100 ? "Review Topic" : progressPercent > 0 ? "Resume Learning" : "Start Learning"}
      </Link>

      {/* Two Column Stats: Progress & Interview Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-surface border border-white/5">
          <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-2">Activity Progress</h3>
          <div className="text-3xl font-black mb-3">{progressPercent}%</div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent-secondary transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-foreground/50 mt-2">{completedActivities} of {activities.length} completed</p>
        </div>

        <div className="p-5 rounded-2xl bg-surface border border-accent-tertiary/20 shadow-[0_0_15px_rgba(45,212,191,0.05)] relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent-tertiary/10 rounded-full blur-2xl"></div>
          <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent-tertiary" />
            Interview Readiness
          </h3>
          <div className="text-4xl font-black text-accent-tertiary mb-1">{fakeInterviewScore}%</div>
          <p className="text-xs text-foreground/60 leading-tight">Based on your performance in scenario and debug activities.</p>
        </div>
      </div>
    </>
  );
}
