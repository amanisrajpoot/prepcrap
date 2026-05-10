import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedExercises: Record<string, boolean>;
  toggleExercise: (id: string) => void;
  isCompleted: (id: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedExercises: {},
      toggleExercise: (id: string) =>
        set((state) => ({
          completedExercises: {
            ...state.completedExercises,
            [id]: !state.completedExercises[id],
          },
        })),
      isCompleted: (id: string) => !!get().completedExercises[id],
    }),
    {
      name: "prepcrap-progress",
    }
  )
);
