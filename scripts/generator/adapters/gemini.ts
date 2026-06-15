import { GoogleGenAI, Type } from "@google/genai";
import * as dotenv from "dotenv";
import { LLMProvider, TopicMetadata, GeneratedObjective, ActivityPlan } from "./index";

dotenv.config();

export class GeminiProvider implements LLMProvider {
  private ai: GoogleGenAI;
  private model = "gemini-2.5-flash";

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  private async generateJson<T>(prompt: string, schema: any): Promise<T> {
    const response = await this.ai.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2
      }
    });
    
    if (!response.text) throw new Error("No response from Gemini");
    return JSON.parse(response.text) as T;
  }

  async analyzeTopic(topic: string): Promise<TopicMetadata> {
    const prompt = `Analyze the software engineering topic: "${topic}". 
Return metadata including real-world importance (1-10), interview frequency (1-10), overall difficulty, and prerequisites.`;

    return this.generateJson<TopicMetadata>(prompt, {
      type: Type.OBJECT,
      properties: {
        importance: { type: Type.INTEGER },
        interviewFrequency: { type: Type.INTEGER },
        difficulty: { type: Type.STRING, enum: ["foundation", "intermediate", "advanced", "interview", "implementation"] },
        prerequisites: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["importance", "interviewFrequency", "difficulty", "prerequisites"]
    });
  }

  async generateObjectives(topic: string, metadata: TopicMetadata, avoidConcepts: string[]): Promise<GeneratedObjective[]> {
    const prompt = `You are a Senior Staff Engineering Curriculum Designer.
Generate 5-7 distinct learning objectives for the topic: "${topic}".

Requirements:
- Cover beginner to interview level.
- Avoid overlap.
- Objectives must be strictly measurable and action-oriented.
- Focus heavily on practical engineering use, debugging, and implementation.
- DO NOT create objectives related to the following already covered concepts:
  [${avoidConcepts.join(", ")}]

Good Objective Examples: "Predict Promise behavior in event loop scenarios", "Debug closure-related memory leaks"
Bad Objective Examples: "Understand promises", "Learn about scope"`;

    const result = await this.generateJson<{ objectives: GeneratedObjective[] }>(prompt, {
      type: Type.OBJECT,
      properties: {
        objectives: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              objective: { type: Type.STRING },
              interviewFrequency: { type: Type.INTEGER },
              realWorldImportance: { type: Type.INTEGER }
            },
            required: ["objective", "interviewFrequency", "realWorldImportance"]
          }
        }
      },
      required: ["objectives"]
    });
    
    return result.objectives;
  }

  async planActivities(topic: string, objective: string): Promise<ActivityPlan> {
    const prompt = `Plan the activities for this specific objective: "${objective}" inside the topic "${topic}".
Select exactly one activity per cognitive step required to master this objective. Choose from: learn, recall, compare, implementation, debug, interview.
Ensure a heavy bias towards implementation and interview prep.`;

    return this.generateJson<ActivityPlan>(prompt, {
      type: Type.OBJECT,
      properties: {
        objective: { type: Type.STRING },
        activities: {
          type: Type.ARRAY,
          items: { type: Type.STRING, enum: ["learn", "recall", "compare", "implementation", "debug", "interview"] }
        }
      },
      required: ["objective", "activities"]
    });
  }

  async generateActivities(topic: string, plan: ActivityPlan, avoidConcepts: string[]): Promise<any[]> {
    const prompt = `Generate the exact activity payloads for the objective: "${plan.objective}" (Topic: ${topic}).
We need the following activity types: ${plan.activities.join(", ")}.

Avoid reusing the following concepts: [${avoidConcepts.join(", ")}].
Ensure the content feels like an elite interview-prep platform, avoiding academic tone. Use real-world examples.`;

    const result = await this.generateJson<{ activities: any[] }>(prompt, {
      type: Type.OBJECT,
      properties: {
        activities: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              payload: { type: Type.OBJECT } // The payload structure will be validated later
            },
            required: ["type", "difficulty", "payload"]
          }
        }
      },
      required: ["activities"]
    });
    
    return result.activities;
  }

  async generateAssessments(topic: string, objectives: string[]): Promise<any> {
    const prompt = `Generate final assessment activities for the topic "${topic}".
This should include 1 Checkpoint activity and 1 final Assessment/Interview activity covering these objectives:
${objectives.join("\\n")}`;

    const result = await this.generateJson<{ activities: any[] }>(prompt, {
      type: Type.OBJECT,
      properties: {
        activities: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              payload: { type: Type.OBJECT }
            },
            required: ["type", "difficulty", "payload"]
          }
        }
      },
      required: ["activities"]
    });
    
    return result.activities;
  }
}
