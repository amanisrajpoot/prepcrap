"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFeedStore } from "@/store/feed";
import { PACK_REGISTRY, FallbackPack } from "@/data/curriculum/packs";
import ActivityRenderer from "./ActivityRenderer";
import { ArrowLeft } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export default function FeedContainer({ topicId }: { topicId: string }) {
  const router = useRouter();
  const { playSwipe, playTada } = useSound();
  
  // Memoize cards for this specific topic
  const filteredCards = useMemo(() => {
    const pack = PACK_REGISTRY[topicId] || FallbackPack;
    let baseCards = pack.activities;
    
    // Create a copy of base cards
    const finalCards = [...baseCards];

    // Finally, add a Topic Complete card at the very end
    finalCards.push({
      id: `topic-complete-${topicId}`,
      topicId: pack.topic.id,
      objectiveId: 'none',
      category: 'evaluate',
      type: 'topic-complete',
      difficulty: 'foundation',
      payload: { topicTitle: pack.topic.title }
    });

    return finalCards;
  }, [topicId]);

  const { 
    currentIndex, 
    setCurrentIndex, 
    startSession,
    sessionStart,
    incrementScrollBack,
    selectedGoal,
    selectedMode,
    cardEvents,
    isAssessmentActive
  } = useFeedStore();
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Derive chapter points based on activities (mock for now)
  const activeChapter = { title: PACK_REGISTRY[topicId]?.topic.title || "Topic" };
  const [highestIndex, setHighestIndex] = useState(0);

  // Start session and reset stale state on mount
  useEffect(() => {
    if (!sessionStart) {
      startSession();
    }
    
    // Always ensure assessment lock is cleared when entering a standard feed
    useFeedStore.getState().setAssessmentActive(false);

    // Calculate the highest uncompleted index to resume from
    const storeState = useFeedStore.getState();
    let resumeIndex = 0;
    for (let i = 0; i < filteredCards.length; i++) {
      if (!storeState.cardEvents[filteredCards[i].id]?.completed) {
        resumeIndex = i;
        break;
      }
    }
    
    // Set current index safely
    setCurrentIndex(resumeIndex);
    setHighestIndex(resumeIndex);
    
    // Scroll to top or the resume index
    if (containerRef.current) {
      containerRef.current.scrollTop = resumeIndex * containerRef.current.clientHeight;
    }
  }, [topicId]);

  // Handle scroll snapping logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, clientHeight } = containerRef.current;
      // Calculate which card is most visible
      const newIndex = Math.round(scrollTop / clientHeight);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < filteredCards.length) {
        if (newIndex < highestIndex) {
          // It's a scroll back
          const cardId = filteredCards[newIndex].id;
          incrementScrollBack(cardId);
        } else if (newIndex > highestIndex) {
          setHighestIndex(newIndex);
        }
        
        // Play sound effects
        if (newIndex === filteredCards.length - 1) {
          playTada();
        } else {
          playSwipe();
        }
        
        setCurrentIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentIndex, setCurrentIndex, filteredCards, highestIndex, incrementScrollBack]);

  // Compute Chapter Progress
  useEffect(() => {
    // Legacy tracking update
  }, [currentIndex, filteredCards]);

  // Calculate points earned in current chapter (using index as proxy for now)
  const progressPercent = Math.min(100, Math.round(((currentIndex + 1) / filteredCards.length) * 100));

  // Scroll Lock Logic: Only enforce mandatory scroll lock on strict assessment activities
  const visibleCards = filteredCards.filter((_, idx) => {
    if (idx <= currentIndex) return true; // always show past and current
    
    const currentCard = filteredCards[currentIndex];
    const isStrictCard = currentCard && !['why-it-matters', 'content', 'topic-complete'].includes(currentCard.type);
    
    const currentCardEvent = cardEvents[currentCard?.id];
    const isCurrentCompleted = currentCardEvent?.completed;
    
    const canProceed = isStrictCard ? isCurrentCompleted : true;
    
    if (idx === currentIndex + 1 && canProceed) return true;
    return false;
  });

  const currentCard = filteredCards[currentIndex];
  const isStrictCardLocked = currentCard && !['why-it-matters', 'content', 'topic-complete'].includes(currentCard.type) && !cardEvents[currentCard.id]?.completed;

  return (
    <div className="relative w-full h-[100dvh] bg-background overflow-hidden">
      {/* Chapter Progress Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-background to-transparent pointer-events-none">
        <div className="max-w-md mx-auto relative">
          <div className="absolute -top-1 -left-2 z-50">
            <button 
              onClick={() => router.push(`/topics/${topicId}`)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground hover:bg-white/10 transition-colors pointer-events-auto"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
            
          <div className="flex-1 flex flex-col gap-2 ml-14">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-accent-primary uppercase tracking-widest truncate max-w-[200px]">
                {activeChapter.title}
              </span>
              <span className="text-[10px] font-mono text-accent-secondary">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Snap Scroll Container */}
      <div 
        id="feed-scroll-container"
        ref={containerRef}
        className={`w-full h-full snap-y snap-mandatory scrollbar-none scroll-smooth ${isAssessmentActive ? 'overflow-hidden' : 'overflow-y-scroll'}`}
      >
        {visibleCards.map((card) => (
          <ActivityRenderer key={card.id} card={card} />
        ))}
        {/* Helper text when locked */}
        {visibleCards.length === currentIndex + 1 && isStrictCardLocked && (
          <div className="w-full flex justify-center pb-8 pt-4 snap-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 animate-pulse">
              Complete card to continue
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
