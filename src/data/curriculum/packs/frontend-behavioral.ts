import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "fi-behavioral")!;

export const frontendBehavioralPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "fb-intro",
      topicId: "fi-behavioral",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "The Behavioral Round",
        explanation: "The Behavioral Round evaluates if people actually want to work with you. A common trap for frontend engineers is bikeshedding—arguing passionately about trivial things like React vs Vue, or Tailwind vs CSS Modules, instead of discussing business impact. Interviewers want to see pragmatism, empathy for users (accessibility, performance), and the ability to own mistakes without blaming teammates.",
        interviewContext: "Always use the STAR method: Situation, Task, Action, Result. Focus heavily on the 'Result' (metrics, business impact)."
      }
    },
    {
      id: "fb-scenario-conflict",
      topicId: "fi-behavioral",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Disagreement",
        scenario: "The interviewer asks: 'Tell me about a time you disagreed with a designer on a UI feature.'",
        options: [
          {
            id: "opt1",
            text: "'The designer wanted a complex animation that was slow. I told them it was a bad idea and built it my way because I am the engineer.'",
            isCorrect: false,
            explanation: "This shows arrogance and poor collaboration. Even if you were technically right, your communication was hostile."
          },
          {
            id: "opt2",
            text: "'I never disagree with designers. I just build whatever they hand me.'",
            isCorrect: false,
            explanation: "This shows a lack of ownership and technical leadership. You are expected to push back if a design harms performance or accessibility."
          },
          {
            id: "opt3",
            text: "'I prototyped the animation and profiled it, showing the designer that it dropped frames on low-end devices. We collaborated to find a simpler CSS transition that achieved the visual goal but maintained 60fps.'",
            isCorrect: true,
            explanation: "Perfect. You used data (profiling), showed empathy for the user (low-end devices), and collaborated to find a compromise."
          }
        ]
      }
    },
    {
      id: "fb-explain-failure",
      topicId: "fi-behavioral",
      objectiveId: topicData.objectives[2],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "How should you answer the classic interview question: 'Tell me about a time you failed or made a mistake?'",
        modelAnswer: "Choose a real, technical mistake (e.g., 'I pushed a memory leak to production that crashed the browser tab'). Explain the impact honestly without downplaying it. Most importantly, spend 80% of the answer explaining the *Action* you took to fix it and the *Systemic Changes* you implemented to ensure it never happens again (e.g., 'I wrote a post-mortem and added an automated Lighthouse CI check to catch memory growth').",
        interviewContext: "Never use a fake weakness like 'I work too hard'. Own your failures."
      }
    },
    {
      id: "fb-complete",
      topicId: "fi-behavioral",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "The Behavioral Round",
        topicId: "fi-behavioral"
      }
    }
  ]
};
