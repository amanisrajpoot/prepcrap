export interface TopicMetadata {
  importance: number; // 1-10
  interviewFrequency: number; // 1-10
  difficulty: "foundation" | "intermediate" | "advanced" | "interview" | "implementation";
  prerequisites: string[];
}

export interface GeneratedObjective {
  objective: string;
  interviewFrequency: number; // 1-10
  realWorldImportance: number; // 1-10
}

export interface ActivityPlan {
  objective: string;
  activities: string[]; // List of activity categories (e.g. "learn", "recall", "implementation", "interview")
}

export interface LLMProvider {
  analyzeTopic(topic: string): Promise<TopicMetadata>;
  generateObjectives(topic: string, metadata: TopicMetadata, avoidConcepts: string[]): Promise<GeneratedObjective[]>;
  planActivities(topic: string, objective: string): Promise<ActivityPlan>;
  generateActivities(topic: string, plan: ActivityPlan, avoidConcepts: string[]): Promise<any[]>;
  generateAssessments(topic: string, objectives: string[]): Promise<any>;
}

import { GeminiProvider } from "./gemini";

export function createProvider(providerName: string = "gemini"): LLMProvider {
  switch (providerName.toLowerCase()) {
    case "gemini":
      return new GeminiProvider();
    default:
      throw new Error(`Unsupported LLM provider: ${providerName}`);
  }
}
