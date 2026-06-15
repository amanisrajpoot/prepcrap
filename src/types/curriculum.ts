// ==========================================
// 1. Structural Hierarchy
// Goal -> Track -> Module -> Topic -> Activities
// ==========================================

export type TrackType = 'technology' | 'outcome' | 'project' | 'career';

export interface CurriculumTrack {
  id: string;
  title: string;
  type: TrackType;
  description?: string;
}

export interface CurriculumModule {
  id: string;
  trackId: string;
  title: string;
  order: number;
}

export interface TopicMetadata {
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  interviewFrequency: number; // 1-10
  importance: number; // 1-10
  prerequisites?: string[];
  topGotchas?: string[];
}

export interface CurriculumTopic {
  id: string;
  moduleId: string;
  trackId: string;
  title: string;
  order: number;
  version?: number;
  description?: string;
  associatedOutcomePaths?: string[]; 
  metadata: TopicMetadata;
  objectives: string[]; // List of specific learning objectives (e.g. "Define a closure")
}

// ==========================================
// 2. Content & Activity Taxonomy
// ==========================================

export type DifficultyLevel = 'foundation' | 'intermediate' | 'advanced' | 'interview';

export type ActivityCategory = 'learn' | 'practice' | 'implementation' | 'evaluate' | 'interview';

// Specific activity types for future UI mapping
export type ActivityType = 
  | 'why-it-matters'
  | 'content'
  | 'meme'
  | 'mcq'
  | 'code-prediction'
  | 'interview'
  | 'hot-take'
  | 'explain'
  | 'debug'
  | 'scenario'
  | 'fill-blank'
  | 'compare'
  | 'timeline'
  | 'checkpoint'
  | 'assessment'
  | 'code-completion'
  | 'predict-next-line'
  | 'write-function'
  | 'fix-bug'
  | 'refactor'
  | 'system-design'
  | 'visual'
  | 'analogy'
  | 'tap-order'
  | 'progressive-match'
  | 'incident'
  | 'tradeoff'
  | 'estimation'
  | 'topic-complete';

export interface TopicActivity {
  id: string;
  topicId: string;
  objectiveId: string; // The specific objective this activity maps to
  category: ActivityCategory;
  type: ActivityType;
  difficulty: DifficultyLevel;
  // The actual JSON payload representing the card content
  payload: any; 
}

// A "Topic Pack" represents the fully generated JSON file for a specific topic
export interface TopicPack {
  topic: CurriculumTopic;
  activities: TopicActivity[];
  objectiveCoverage?: Record<string, string[]>; // Maps objective text to array of activity IDs
  objectiveDifficulty?: Record<string, DifficultyLevel>; // Maps objective text to its overall difficulty
}

export type TopicOverallStatus = 'not-started' | 'in-progress' | 'practiced' | 'mastered';

export interface TopicProgress {
  overall: TopicOverallStatus;
  learned: boolean;
  practiced: boolean;
  interviewed: boolean;
  assessed: boolean;
}

export interface ActivityOutcome {
  completed: boolean;
  score: number;
  attempts: number;
  durationMs: number;
  confidence?: 'guess' | 'somewhat' | 'sure';
  objectiveId: string;
  difficulty: DifficultyLevel;
  firstAttemptCorrect: boolean;
  hintUsed?: boolean;
  solutionViewed?: boolean;
}

// ==========================================
// 3. UX & Navigation Types
// ==========================================

export type FeedMode = 'daily' | 'learning' | 'practice' | 'evaluation';

export interface Goal {
  id: string;
  title: string;
  description: string;
  includedTrackIds: string[]; // Ties the goal to specific tracks
}
