/** Track options available to the user */
export type TrackDay = 1 | 3 | 7;

/** Metadata about a track option for UI display */
export interface TrackOption {
  days: TrackDay;
  label: string;
  subtitle: string;
  icon: string;
}

/** Structure of the exercises field in MDX frontmatter */
export interface ExercisesByTrack {
  "1-day": string[];
  "3-day": string[];
  "7-day": string[];
}

/** Parsed MDX frontmatter for a pillar/module */
export interface PillarFrontmatter {
  title: string;
  slug: string;
  order: number;
  icon: string;
  concept: string;
  interviewScript: string;
  pitfalls: string[];
  exercises: ExercisesByTrack;
}

/** A pillar with its parsed frontmatter and raw MDX body */
export interface Pillar {
  frontmatter: PillarFrontmatter;
  content: string;
}

/** Track configuration for display */
export const TRACK_OPTIONS: TrackOption[] = [
  {
    days: 1,
    label: "1-Day Sprint",
    subtitle: "Broad review of core concepts",
    icon: "⚡",
  },
  {
    days: 3,
    label: "3-Day Deep Dive",
    subtitle: "Edge cases & nuanced understanding",
    icon: "🔥",
  },
  {
    days: 7,
    label: "7-Day Mastery",
    subtitle: "Build from scratch & full command",
    icon: "🚀",
  },
];
