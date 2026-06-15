"use client";
import { ReactNode, useEffect, useRef } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useFeedStore } from "@/store/feed";
import { FeedCard } from "@/data/feed-cards";

export default function CardWrapper({ card, children }: { card: FeedCard, children: ReactNode }) {
  const { savedCardIds, toggleSave, recordEvent } = useFeedStore();
  const isSaved = savedCardIds.includes(card.id);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scrollbacks logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            recordEvent(card.id, { viewed: true });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [card.id, recordEvent]);

  return (
    <div ref={containerRef} className="w-full h-[100dvh] snap-start snap-always flex flex-col justify-end items-center px-4 pb-6 pt-16 shrink-0">
      <div className="w-full max-w-md h-full max-h-[850px] bg-[rgba(18,19,42,0.85)] backdrop-blur-xl rounded-[32px] border border-[rgba(139,148,255,0.15)] flex flex-col relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 shrink-0">
          {(card as any).payload?.category || (card as any).category || (card as any).topic ? (
            <div className="px-3 py-1.5 bg-accent-primary/10 text-accent-primary text-[10px] font-bold uppercase tracking-widest rounded-lg border border-accent-primary/20">
              {(card as any).payload?.category || (card as any).category || (card as any).topic}
            </div>
          ) : <div />}
          <button 
            onClick={() => toggleSave(card.id)} 
            className="p-2 -mr-2 text-foreground/40 hover:text-accent-amber transition-colors active:scale-95"
          >
            {isSaved ? <BookmarkCheck className="w-6 h-6 text-accent-amber fill-accent-amber/20" /> : <Bookmark className="w-6 h-6" />}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-4 flex flex-col justify-center relative scrollbar-none">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-auto shrink-0 pt-4 flex justify-center items-center text-foreground/20 text-xs font-bold uppercase tracking-widest animate-pulse">
          Continue ↓
        </div>
      </div>
    </div>
  );
}
