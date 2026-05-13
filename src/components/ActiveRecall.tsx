"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ActiveRecallProps {
  children: React.ReactNode;
  title?: string;
}

export default function ActiveRecall({ children, title = "Interview Script" }: ActiveRecallProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="my-4 rounded-xl border border-[rgba(139,148,255,0.15)] bg-[rgba(124,92,252,0.03)] overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(139,148,255,0.1)] bg-[rgba(124,92,252,0.05)]">
        <span className="text-xs font-bold uppercase tracking-wider text-accent-primary flex items-center gap-2">
          {isRevealed ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          {title}
        </span>
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
            isRevealed 
              ? "bg-foreground/10 text-foreground/60 hover:bg-foreground/20" 
              : "bg-accent-primary text-white hover:shadow-glow-sm"
          }`}
        >
          {isRevealed ? "Hide Answer" : "Test Your Recall"}
        </button>
      </div>
      
      <div className="relative p-4">
        {!isRevealed && (
          <div className="absolute inset-0 z-10 backdrop-blur-md bg-background/40 flex flex-col items-center justify-center p-6 text-center cursor-pointer group" onClick={() => setIsRevealed(true)}>
            <p className="text-sm font-medium text-foreground/80 group-hover:text-accent-primary transition-colors">
              Think about your answer first...
            </p>
            <p className="text-[10px] text-foreground/40 mt-2">
              (Click anywhere inside to reveal)
            </p>
          </div>
        )}
        <div className={`transition-all duration-500 ${isRevealed ? "opacity-100 blur-0" : "opacity-20 blur-sm select-none pointer-events-none"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
