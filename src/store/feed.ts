import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FeedMode, TopicProgress, ActivityOutcome } from "@/types/curriculum";

export interface CardEvent extends Partial<ActivityOutcome> {
  viewed: boolean;
  viewedAt: number;
  timeSpentMs: number;
  revealedAfterMs?: number;
  scrollBacks: number;
  saved: boolean;
  interacted: boolean;
}

interface FeedState {
  currentChapterId: string | null;
  currentIndex: number;
  isAssessmentActive: boolean;
  savedCardIds: string[];
  sessionStart: number | null;
  cardsViewedThisSession: number;
  cardEvents: Record<string, CardEvent>;
  topicProgress: Record<string, TopicProgress>; // track progress by topic ID
  
  // V2 Config
  selectedGoal: string | null;
  selectedMode: FeedMode;

  // Actions
  startSession: () => void;
  setCurrentIndex: (index: number) => void;
  setChapter: (chapterId: string) => void;
  setGoal: (goalId: string) => void;
  setMode: (mode: FeedMode) => void;
  updateTopicProgress: (topicId: string, progress: Partial<TopicProgress>) => void;
  setAssessmentActive: (active: boolean) => void;
  toggleSave: (cardId: string) => void;
  recordEvent: (cardId: string, eventUpdate: Partial<CardEvent>) => void;
  incrementScrollBack: (cardId: string) => void;
  clearSession: () => void;
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set, get) => ({
      currentChapterId: null,
      currentIndex: 0,
      isAssessmentActive: false,
      savedCardIds: [],
      sessionStart: null,
      cardsViewedThisSession: 0,
      cardEvents: {},
      topicProgress: {},
      
      selectedGoal: null,
      selectedMode: 'daily',

      startSession: () => set({ sessionStart: Date.now(), cardsViewedThisSession: 0 }),
      
      setCurrentIndex: (index) => set((state) => ({ 
        currentIndex: index,
        cardsViewedThisSession: Math.max(state.cardsViewedThisSession, index + 1)
      })),

      setChapter: (chapterId) => set({ currentChapterId: chapterId, currentIndex: 0 }),
      setGoal: (goalId) => set({ selectedGoal: goalId, currentIndex: 0 }),
      setMode: (mode) => set({ selectedMode: mode, currentIndex: 0 }),
      setAssessmentActive: (active) => set({ isAssessmentActive: active }),

      updateTopicProgress: (topicId, progressUpdate) => set((state) => {
        const current = state.topicProgress[topicId] || {
          overall: 'not-started',
          learned: false,
          practiced: false,
          interviewed: false,
          assessed: false
        };
        
        const next = { ...current, ...progressUpdate };
        
        // Auto-compute overall status based on booleans
        if (next.assessed && next.interviewed && next.practiced && next.learned) {
          next.overall = 'mastered';
        } else if (next.practiced || next.learned) {
          next.overall = 'practiced'; // or in-progress depending on definition
        } else if (next.learned || next.interviewed) {
          next.overall = 'in-progress';
        }

        return {
          topicProgress: {
            ...state.topicProgress,
            [topicId]: next
          }
        };
      }),

      toggleSave: (cardId) => set((state) => {
        const isSaved = state.savedCardIds.includes(cardId);
        const newSaved = isSaved 
          ? state.savedCardIds.filter(id => id !== cardId)
          : [...state.savedCardIds, cardId];
        
        // Also update event
        const event = state.cardEvents[cardId] || { viewed: false, completed: false, timeSpentMs: 0, scrollBacks: 0, saved: false };
        
        return {
          savedCardIds: newSaved,
          cardEvents: {
            ...state.cardEvents,
            [cardId]: { ...event, saved: !isSaved }
          }
        };
      }),

      recordEvent: (cardId, eventUpdate) => set((state) => {
        const currentEvent = state.cardEvents[cardId] || {
          viewed: false,
          completed: false,
          timeSpentMs: 0,
          scrollBacks: 0,
          saved: state.savedCardIds.includes(cardId),
        };
        
        return {
          cardEvents: {
            ...state.cardEvents,
            [cardId]: { ...currentEvent, ...eventUpdate }
          }
        };
      }),

      incrementScrollBack: (cardId) => set((state) => {
        const currentEvent = state.cardEvents[cardId] || {
          viewed: false,
          completed: false,
          timeSpentMs: 0,
          scrollBacks: 0,
          saved: state.savedCardIds.includes(cardId),
        };
        return {
          cardEvents: {
            ...state.cardEvents,
            [cardId]: { ...currentEvent, scrollBacks: currentEvent.scrollBacks + 1 }
          }
        };
      }),

      clearSession: () => set({ sessionStart: null, cardsViewedThisSession: 0, currentIndex: 0 }),
    }),
    {
      name: "developer-daily-feed",
    }
  )
);
