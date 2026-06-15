"use client";

import { useFeedStore } from "@/store/feed";
import { TopicPack } from "@/types/curriculum";
import { ChevronRight, Clock, CheckCircle2, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export function TrackClientTopics({ topics }: { topics: TopicPack[] }) {
  const { cardEvents } = useFeedStore();

  const { topicsStatus, completedTopics, progressPercent } = useMemo(() => {
    let completedCount = 0;
    
    const statuses = topics.map(pack => {
      const activities = pack.activities;
      if (!activities || activities.length === 0) return { status: 'not-started', completed: 0, total: 0 };

      let comp = 0;
      activities.forEach(act => {
        if (cardEvents[act.id]?.completed) comp++;
      });

      let status = 'not-started';
      if (comp === activities.length) {
        status = 'completed';
        completedCount++;
      } else if (comp > 0) {
        status = 'in-progress';
      }

      return { status, completed: comp, total: activities.length };
    });

    const percent = topics.length > 0 ? Math.round((completedCount / topics.length) * 100) : 0;
    
    return { topicsStatus: statuses, completedTopics: completedCount, progressPercent: percent };
  }, [topics, cardEvents]);

  return (
    <>
      {/* Progress Overview injected into the header section space */}
      <div className="bg-surface rounded-2xl p-5 border border-white/5 shadow-xl flex flex-wrap gap-6 items-center mb-8 -mt-6 relative z-10 mx-6">
        <div className="flex-1 min-w-[200px]">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-foreground/70">Mastery</span>
            <span className="text-accent-primary">{progressPercent}%</span>
          </div>
          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent-primary transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        
        <div className="flex gap-6 text-sm">
          <div className="flex flex-col">
            <span className="text-foreground/50 font-medium">Topics</span>
            <span className="font-bold text-lg">{completedTopics} <span className="text-foreground/30">/ {topics.length}</span></span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 max-w-3xl mx-auto">
        <div className="space-y-4">
          {topics.map((pack, idx) => {
            const topic = pack.topic;
            const statusObj = topicsStatus[idx];
            const isCompleted = statusObj.status === 'completed';
            const isInProgress = statusObj.status === 'in-progress';
            
            return (
              <Link 
                href={`/topics/${topic.id}`} 
                key={topic.id}
                className="block group bg-surface border border-white/5 rounded-2xl p-5 hover:border-accent-primary/50 hover:bg-white/[0.02] transition-all relative overflow-hidden"
              >
                {/* Progress bar background for in-progress */}
                {isInProgress && (
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-accent-secondary opacity-50 transition-all"
                    style={{ width: `${Math.round((statusObj.completed / statusObj.total) * 100)}%` }}
                  />
                )}
                {isCompleted && (
                  <div className="absolute inset-y-0 left-0 w-1 bg-accent-tertiary" />
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      isCompleted ? 'bg-accent-tertiary/20 text-accent-tertiary' : 
                      isInProgress ? 'bg-accent-secondary/20 text-accent-secondary' :
                      'bg-white/5 text-foreground/50'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isInProgress ? <PlayCircle className="w-5 h-5" /> : idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-accent-primary transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-xs text-foreground/50 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {topic.metadata.estimatedMinutes}m
                        </span>
                        <span className={`px-2 py-0.5 rounded-full bg-white/5 ${
                          topic.metadata.difficulty === 'advanced' || topic.metadata.difficulty === 'interview' 
                            ? 'text-red-400' 
                            : 'text-accent-secondary'
                        }`}>
                          {topic.metadata.difficulty}
                        </span>
                        {isInProgress && (
                          <span className="text-accent-secondary italic">In progress...</span>
                        )}
                        {isCompleted && (
                          <span className="text-accent-tertiary font-bold">Mastered</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <ChevronRight className={`w-5 h-5 transition-colors ${
                    isCompleted ? 'text-accent-tertiary/50 group-hover:text-accent-tertiary' :
                    isInProgress ? 'text-accent-secondary/50 group-hover:text-accent-secondary' :
                    'text-foreground/20 group-hover:text-accent-primary'
                  }`} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  );
}
