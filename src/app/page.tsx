"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFeedStore } from "@/store/feed";
import { GOALS, TRACKS, TOPICS } from "@/data/curriculum/taxonomy";
import { FeedMode } from "@/types/curriculum";
import { Brain, Code2, Rocket, Target, ArrowRight, Star, Clock, CheckCircle2, Circle } from "lucide-react";

export default function CurriculumExplorer() {
  const router = useRouter();
  const { setGoal, setMode, topicProgress } = useFeedStore();
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const MODES: { id: FeedMode; title: string; desc: string; icon: any }[] = [
    { id: "learning", title: "Learn", desc: "Understand core concepts through content and analogies.", icon: Brain },
    { id: "practice", title: "Practice", desc: "Apply knowledge with scenarios, code completion, and debugging.", icon: Code2 },
    { id: "evaluation", title: "Assessment", desc: "Test your readiness with a timed evaluation.", icon: Target },
    { id: "daily", title: "Daily Mix", desc: "A balanced mix of all the above.", icon: Rocket },
  ];

  const handleStart = (mode: FeedMode) => {
    if (selectedGoalId) {
      setGoal(selectedGoalId);
      router.push(`/track/${selectedTrackId}`);
    }
  };

  const selectedGoal = GOALS.find(g => g.id === selectedGoalId);
  const availableTracks = TRACKS.filter(t => selectedGoal?.includedTrackIds.includes(t.id));
  const availableTopics = TOPICS.filter(t => t.trackId === selectedTrackId);

  return (
    <div className="flex flex-col flex-1 min-h-screen relative overflow-hidden bg-background">
      {/* Background glow effect */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(124,92,252,0.05)_0%,transparent_70%)]" />
      </div>

      <main className="flex-1 relative z-10 flex flex-col items-center p-6 min-h-[100dvh]">
        <div className="w-full max-w-4xl mx-auto pt-12 pb-24">
          
          {/* Breadcrumbs Navigation */}
          {step > 1 && (
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/40 mb-12">
              <button onClick={() => setStep(1)} className="hover:text-foreground transition-colors">Goals</button>
              {step > 1 && selectedGoal && (
                <>
                  <span>/</span>
                  <button onClick={() => setStep(2)} className={`hover:text-foreground transition-colors ${step === 2 ? 'text-accent-primary' : ''}`}>{selectedGoal.title}</button>
                </>
              )}
              {step > 2 && selectedTrackId && (
                <>
                  <span>/</span>
                  <button onClick={() => setStep(3)} className={`hover:text-foreground transition-colors ${step === 3 ? 'text-accent-primary' : ''}`}>
                    {TRACKS.find(t => t.id === selectedTrackId)?.title}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Header */}
          {step === 1 && (
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-primary/20 bg-accent-primary/5 mb-6">
                <span className="text-xs font-bold text-accent-primary tracking-widest uppercase">
                  Curriculum Explorer
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                Choose your <span className="text-accent-primary">Goal</span>
              </h1>
            </div>
          )}

          {/* Step 1: Goals */}
          {step === 1 && (
            <div className="grid gap-4 animate-fade-in-up w-full max-w-2xl mx-auto">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => { setSelectedGoalId(goal.id); setStep(2); }}
                  className="w-full p-6 text-left rounded-2xl bg-surface border border-white/5 hover:border-accent-primary/50 hover:bg-accent-primary/5 transition-all group flex flex-col"
                >
                  <div className="flex justify-between items-center w-full mb-2">
                    <h3 className="text-xl font-bold text-foreground">{goal.title}</h3>
                    <ArrowRight className="w-5 h-5 text-accent-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4">{goal.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {goal.includedTrackIds.slice(0, 4).map(tId => (
                      <span key={tId} className="px-2 py-1 bg-white/5 rounded text-[10px] uppercase font-bold text-foreground/40">
                        {TRACKS.find(t => t.id === tId)?.title || tId}
                      </span>
                    ))}
                    {goal.includedTrackIds.length > 4 && (
                      <span className="px-2 py-1 bg-white/5 rounded text-[10px] uppercase font-bold text-foreground/40">+{goal.includedTrackIds.length - 4} more</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Tracks Browser */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Tracks for {selectedGoal?.title}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {availableTracks.map((track) => {
                  const trackTopics = TOPICS.filter(t => t.trackId === track.id);
                  const completedTopics = trackTopics.filter(t => topicProgress[t.id]?.overall === 'mastered').length;
                  const progressPct = trackTopics.length ? Math.round((completedTopics / trackTopics.length) * 100) : 0;

                  return (
                    <button
                      key={track.id}
                      onClick={() => router.push(`/track/${track.id}`)}
                      className="p-6 text-left rounded-2xl bg-surface border border-white/5 hover:border-accent-secondary/50 hover:bg-accent-secondary/5 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-accent-secondary transition-colors">{track.title}</h3>
                        <div className="text-xs font-bold text-foreground/40">{trackTopics.length} Topics</div>
                      </div>
                      <div className="w-full bg-background rounded-full h-1.5 mb-2 overflow-hidden">
                        <div className="bg-accent-secondary h-1.5 rounded-full" style={{ width: `${progressPct}%` }} />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{progressPct}% Complete</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Topic Browser */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-8 text-foreground">{TRACKS.find(t => t.id === selectedTrackId)?.title} Topics</h2>
              <div className="grid gap-4">
                {availableTopics.map((topic) => {
                  const progress = topicProgress[topic.id];
                  const status = progress?.overall || 'not-started';
                  
                  return (
                    <button
                      key={topic.id}
                      onClick={() => { setSelectedTopicId(topic.id); setStep(4); }}
                      className="p-6 text-left rounded-2xl bg-surface border border-white/5 hover:border-accent-emerald/50 hover:bg-accent-emerald/5 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-accent-emerald transition-colors">{topic.title}</h3>
                          {status === 'mastered' && <span className="px-2 py-0.5 bg-accent-emerald/20 text-accent-emerald text-[10px] font-bold uppercase tracking-wider rounded">Mastered</span>}
                          {status === 'practiced' && <span className="px-2 py-0.5 bg-accent-secondary/20 text-accent-secondary text-[10px] font-bold uppercase tracking-wider rounded">Practiced</span>}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-foreground/50">
                          {topic.metadata && (
                            <>
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-accent-amber" />
                                <span>Importance {topic.metadata.importance}/10</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>~{topic.metadata.estimatedMinutes}m</span>
                              </div>
                              <div className="uppercase tracking-wider text-[10px] font-bold bg-white/5 px-2 py-0.5 rounded">
                                {topic.metadata.difficulty}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 md:border-l md:border-white/10 md:pl-6">
                        <div className="flex flex-col gap-1 text-[10px] uppercase font-bold tracking-widest">
                          <div className={`flex items-center gap-2 ${progress?.learned ? 'text-accent-emerald' : 'text-foreground/30'}`}>
                            {progress?.learned ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />} Learned
                          </div>
                          <div className={`flex items-center gap-2 ${progress?.practiced ? 'text-accent-emerald' : 'text-foreground/30'}`}>
                            {progress?.practiced ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />} Practiced
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 text-[10px] uppercase font-bold tracking-widest">
                          <div className={`flex items-center gap-2 ${progress?.interviewed ? 'text-accent-emerald' : 'text-foreground/30'}`}>
                            {progress?.interviewed ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />} Interview
                          </div>
                          <div className={`flex items-center gap-2 ${progress?.assessed ? 'text-accent-emerald' : 'text-foreground/30'}`}>
                            {progress?.assessed ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />} Assessment
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Mode Selection */}
          {step === 4 && (
            <div className="w-full max-w-4xl animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-8 text-foreground text-center">Select Activity Mode</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {MODES.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => handleStart(mode.id)}
                      className="p-6 text-left rounded-2xl bg-surface border border-white/5 hover:border-accent-primary/50 hover:bg-accent-primary/5 transition-all group flex gap-4"
                    >
                      <div className="p-4 rounded-xl bg-background border border-white/5 flex-shrink-0 group-hover:border-accent-primary/30 transition-colors">
                        <Icon className="w-6 h-6 text-accent-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent-primary transition-colors">{mode.title}</h3>
                        <p className="text-sm text-foreground/60 leading-relaxed">{mode.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
