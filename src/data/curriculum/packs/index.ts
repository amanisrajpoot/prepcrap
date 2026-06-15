import { ClosuresPack } from "./closures";
import { EventLoopPack } from "./event-loop";
import { promisesPack } from "./promises";
import { executioncontextPack } from "./execution-context";
import { prototypesPack } from "./prototypes";
import { reactRenderingEnginePack } from "./react-rendering-engine";
import { hooksMentalModelsPack } from "./hooks-mental-models";
import { reactPerformancePack } from "./react-performance";
import { asyncUxPatternsPack } from "./async-ux-patterns";
import { modernReactPack } from "./modern-react";
import { nodeRuntimePack } from "./node-runtime";
import { nodePerformancePack } from "./node-performance";
import { nodeStreamsPack } from "./node-streams";
import { nodeConcurrencyPack } from "./node-concurrency";
import { nodeScalabilityPack } from "./node-scalability";
import { nodeArchitecturePack } from "./node-architecture";
import { sdRequirementsPack } from "./sd-requirements";
import { sdStoragePack } from "./sd-storage";
import { sdCommunicationPack } from "./sd-communication";
import { sdReliabilityPack } from "./sd-reliability";
import { sdCaseStudiesPack } from "./sd-case-studies";
import { TopicPack } from "@/types/curriculum";

// Registry of all available packs
export const PACK_REGISTRY: Record<string, TopicPack> = {
  "closures": ClosuresPack,
  "event-loop": EventLoopPack,
  "promises": promisesPack,
  "execution-context": executioncontextPack,
  "prototypes": prototypesPack,
  "react-rendering-engine": reactRenderingEnginePack,
  "hooks-mental-models": hooksMentalModelsPack,
  "react-performance": reactPerformancePack,
  "async-ux-patterns": asyncUxPatternsPack,
  "modern-react": modernReactPack,
  "node-runtime": nodeRuntimePack,
  "node-performance": nodePerformancePack,
  "node-streams": nodeStreamsPack,
  "node-concurrency": nodeConcurrencyPack,
  "node-scalability": nodeScalabilityPack,
  "node-architecture": nodeArchitecturePack,
  "sd-requirements": sdRequirementsPack,
  "sd-storage": sdStoragePack,
  "sd-communication": sdCommunicationPack,
  "sd-reliability": sdReliabilityPack,
  "sd-case-studies": sdCaseStudiesPack
};

// For fallback testing
export const FallbackPack: TopicPack = {
  topic: {
    id: "fallback",
    moduleId: "fallback",
    trackId: "fallback",
    title: "Coming Soon",
    order: 1,
    metadata: { difficulty: "foundation", estimatedMinutes: 5, interviewFrequency: 1, importance: 1 },
    objectives: []
  },
  activities: [
    {
      id: "fallback-content",
      topicId: "fallback",
      objectiveId: "none",
      category: "learn",
      type: "content",
      difficulty: "foundation",
      payload: {
        title: "Content Generating",
        content: "This topic pack is currently queued for generation by the Curriculum Engine. Check back soon."
      }
    }
  ]
};
