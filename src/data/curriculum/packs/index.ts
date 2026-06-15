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
import { browserRenderingPack } from "./browser-rendering";
import { browserSecurityPack } from "./browser-security";
import { browserStoragePack } from "./browser-storage";
import { frontendSystemDesignPack } from "./frontend-system-design";
import { frontendBehavioralPack } from "./frontend-behavioral";
import { htmlA11yPack } from "./html-a11y";
import { cssLayoutsPack } from "./css-layouts";
import { cssArchitecturePack } from "./css-architecture";
import { dsaPatternsPack } from "./dsa-patterns";
import { dsaHashmapsPack } from "./dsa-hashmaps";
import { dsaTreesPack } from "./dsa-trees";
import { nodeRuntimePack } from "./node-runtime";
import { nodePerformancePack } from "./node-performance";
import { nodeStreamsPack } from "./node-streams";
import { nodeConcurrencyPack } from "./node-concurrency";
import { nodeScalabilityPack } from "./node-scalability";
import { nodeArchitecturePack } from "./node-architecture";
import { pgPerformancePack } from "./pg-performance";
import { pgTransactionsPack } from "./pg-transactions";
import { pgScalingPack } from "./pg-scaling";
import { netProtocolsPack } from "./net-protocols";
import { netDnsPack } from "./net-dns";
import { netWebsocketsPack } from "./net-websockets";
import { biSystemDesignPack } from "./bi-system-design";
import { biBehavioralPack } from "./bi-behavioral";
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
  "browser-rendering": browserRenderingPack,
  "browser-security": browserSecurityPack,
  "browser-storage": browserStoragePack,
  "fi-system-design": frontendSystemDesignPack,
  "fi-behavioral": frontendBehavioralPack,
  "html-a11y": htmlA11yPack,
  "css-layouts": cssLayoutsPack,
  "css-architecture": cssArchitecturePack,
  "dsa-patterns": dsaPatternsPack,
  "dsa-hashmaps": dsaHashmapsPack,
  "dsa-trees": dsaTreesPack,
  "node-runtime": nodeRuntimePack,
  "node-performance": nodePerformancePack,
  "node-streams": nodeStreamsPack,
  "node-concurrency": nodeConcurrencyPack,
  "node-scalability": nodeScalabilityPack,
  "node-architecture": nodeArchitecturePack,
  "pg-performance": pgPerformancePack,
  "pg-transactions": pgTransactionsPack,
  "pg-scaling": pgScalingPack,
  "net-protocols": netProtocolsPack,
  "net-dns": netDnsPack,
  "net-websockets": netWebsocketsPack,
  "bi-system-design": biSystemDesignPack,
  "bi-behavioral": biBehavioralPack,
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
