"use client";

import { useState } from "react";
import { PillarFrontmatter } from "@/types/content";
import ActiveRecall from "@/components/ActiveRecall";
import { X, ChevronLeft, ChevronRight, BrainCircuit, Trophy } from "lucide-react";

interface InterviewSimulatorProps {
  pillars: PillarFrontmatter[];
  onClose: () => void;
}

export default function InterviewSimulator({ pillars, onClose }: InterviewSimulatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!pillars || pillars.length === 0) return null;

  const total = pillars.length;
  const currentPillar = pillars[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl animate-fade-in" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-[95%] md:w-full max-w-2xl max-h-[85vh] md:max-h-[90vh] glass-card flex flex-col animate-scale-in overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent-secondary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header (Fixed) */}
        <div className="flex-shrink-0 p-6 md:p-10 pb-4 flex items-center justify-between relative z-10 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Interview Simulator</h3>
              <p className="text-xs text-foreground/40 font-mono">
                Flash Revision &middot; Pillar {currentIndex + 1} of {total}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-foreground/40 hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar (Fixed) */}
        <div className="px-6 md:px-10 relative z-10">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent-primary transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 py-8 space-y-6 relative z-10 scrollbar-thin scrollbar-thumb-white/10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{currentPillar.icon}</span>
            <h4 className="text-xl font-bold tracking-tight">{currentPillar.title}</h4>
          </div>

          <div className="p-4 rounded-xl bg-surface-hover/30 border border-white/5 italic text-foreground/60 text-sm leading-relaxed">
            &ldquo;{currentPillar.concept}&rdquo;
          </div>

          <div className="py-4">
            <ActiveRecall title="Interview Pitch Answer">
              <blockquote className="text-base text-foreground/80 leading-relaxed border-l-2 border-accent-secondary/40 pl-4 py-1 italic">
                {currentPillar.interviewScript}
              </blockquote>
            </ActiveRecall>
          </div>
        </div>

        {/* Footer Navigation (Fixed) */}
        <div className="flex-shrink-0 p-6 md:p-10 pt-4 border-t border-white/5 flex items-center justify-between relative z-10 bg-surface/50 backdrop-blur-md">
          <button 
            onClick={prev}
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex gap-2">
             {currentIndex === total - 1 ? (
               <button 
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent-emerald text-white text-sm font-bold shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all hover:scale-105 active:scale-95"
               >
                 <Trophy className="w-4 h-4" /> Finish Session
               </button>
             ) : (
               <button 
                onClick={next}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent-primary text-white text-sm font-bold shadow-[0_0_20px_rgba(124,92,252,0.3)] transition-all hover:scale-105 active:scale-95"
               >
                 Next Pillar <ChevronRight className="w-4 h-4" />
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
