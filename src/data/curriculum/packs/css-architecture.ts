import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "css-architecture")!;

export const cssArchitecturePack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "ca-intro",
      topicId: "css-architecture",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "CSS Architecture & Scaling",
        explanation: "Writing CSS for a single page is easy. Writing CSS for a 100-developer enterprise app is a nightmare. Global scope means a change to `.button` in the header might accidentally break the `.button` in the footer. To solve this, we invented architectures: BEM (naming conventions), CSS Modules (build-time scoping), CSS-in-JS (runtime scoping), and Tailwind (utility classes). Each has profound tradeoffs in developer experience, HTML bloat, and runtime performance.",
        interviewContext: "Seniors don't argue about 'which framework is best'. They discuss the tradeoffs of specificity, bundle size, and runtime performance."
      }
    },
    {
      id: "ca-scenario-cssinjs",
      topicId: "css-architecture",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Cost of CSS-in-JS",
        scenario: "Your team uses styled-components. A junior developer creates a `<TableRow>` component and maps over 1,000 items. The page becomes incredibly slow to render. What is the architectural root cause?",
        options: [
          {
            id: "opt1",
            text: "React cannot render 1,000 items efficiently.",
            isCorrect: false,
            explanation: "React can render 1,000 simple items very quickly. The bottleneck is the styling layer."
          },
          {
            id: "opt2",
            text: "CSS-in-JS parses strings and injects <style> tags into the DOM at runtime for every component render.",
            isCorrect: true,
            explanation: "Correct! Runtime CSS-in-JS libraries must parse the CSS string, generate a hash class name, and manipulate the DOM to inject a `<style>` tag while the user is waiting. Doing this 1,000 times synchronously blocks the main thread. This is why the industry is moving toward zero-runtime CSS-in-JS (like Panda CSS or Vanilla Extract) or Tailwind."
          },
          {
            id: "opt3",
            text: "The CSS has too high of a specificity.",
            isCorrect: false,
            explanation: "Specificity affects styling rules, not the catastrophic runtime performance of rendering components."
          }
        ]
      }
    },
    {
      id: "ca-explain-tailwind",
      topicId: "css-architecture",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "What is the primary architectural tradeoff of using Utility-First CSS (like Tailwind) versus Semantic CSS (like BEM)?",
        modelAnswer: "Tailwind's tradeoff is trading HTML bloat for CSS scale. With BEM, your HTML is clean (`<div class='card'>`) but your CSS file grows infinitely as you add features, eventually leading to dead code because devs are afraid to delete CSS. With Tailwind, the CSS bundle is extremely small and capped (only shipping the utilities used), but your HTML becomes massive and harder to read (`<div class='p-4 bg-white rounded shadow-md'>`).",
        interviewContext: "This is a classic senior interview discussion. Focus on the relationship between the HTML file size and the CSS file size."
      }
    },
    {
      id: "ca-complete",
      topicId: "css-architecture",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "CSS Architecture & Scaling",
        topicId: "css-architecture"
      }
    }
  ]
};
