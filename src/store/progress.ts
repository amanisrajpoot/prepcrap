import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewMode = "deep-dive" | "rapid-revision";

interface ProgressState {
  completedExercises: Record<string, boolean>;
  masteredPillars: Record<string, boolean>;
  quizScores: Record<string, boolean>; // slug -> passed
  viewMode: ViewMode;
  toggleExercise: (id: string) => void;
  isCompleted: (id: string) => boolean;
  setMastered: (slug: string, mastered: boolean) => void;
  setQuizPassed: (slug: string, passed: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  isPillarMastered: (slug: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedExercises: {},
      masteredPillars: {},
      quizScores: {},
      viewMode: "deep-dive",
      toggleExercise: (id: string) =>
        set((state) => ({
          completedExercises: {
            ...state.completedExercises,
            [id]: !state.completedExercises[id],
          },
        })),
      isCompleted: (id: string) => !!get().completedExercises[id],
      setMastered: (slug: string, mastered: boolean) =>
        set((state) => ({
          masteredPillars: {
            ...state.masteredPillars,
            [slug]: mastered,
          },
        })),
      setQuizPassed: (slug: string, passed: boolean) =>
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [slug]: passed,
          },
        })),
      setViewMode: (mode: ViewMode) => set({ viewMode: mode }),
      isPillarMastered: (slug: string) => !!get().masteredPillars[slug],
    }),
    {
      name: "prepcrap-progress",
    }
  )
);
