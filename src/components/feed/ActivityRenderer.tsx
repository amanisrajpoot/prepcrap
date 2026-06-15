"use client";

import React from "react";
import { ContentCard, MemeCard } from "./BasicCards";
import { MCQCard, CodePredictionCard, InterviewCard, HotTakeCard } from "./InteractiveCards";
import { ExplainCard, DebugCard, ScenarioCard, WhyItMattersCard, TopicCompleteCard, IncidentCard, TradeoffCard, EstimationCard } from "./CognitiveCards";
import { FillBlankCard, TimelineCard, CompareCard, CodeCompletionCard, ProgressiveMatchCard, TapOrderCard, PredictNextLineCard } from "./PracticeCards";
import { CheckpointCard } from "./CheckpointCard";

// This object acts as the plugin registry for all activity types.
// As new practice components (FillBlank, Match, Order) are built in Phase 2,
// they just get registered here without changing the feed logic.
const ActivityRegistry: Record<string, React.FC<{ card: any }>> = {
  "content": ContentCard,
  "meme": MemeCard,
  "mcq": MCQCard,
  "code-prediction": CodePredictionCard,
  "interview": InterviewCard,
  "hot-take": HotTakeCard,
  "explain": ExplainCard,
  "debug": DebugCard,
  "scenario": ScenarioCard,
  "incident": IncidentCard,
  "tradeoff": TradeoffCard,
  "estimation": EstimationCard,
  "fill-blank": FillBlankCard,
  "compare": CompareCard,
  "timeline": TimelineCard,
  "code-completion": CodeCompletionCard,
  "write-function": CodeCompletionCard,
  "fix-bug": CodeCompletionCard,
  "refactor": CodeCompletionCard,
  "progressive-match": ProgressiveMatchCard,
  "tap-order": TapOrderCard,
  "predict-next-line": PredictNextLineCard,
  "why-it-matters": WhyItMattersCard,
  // Phase 2B placeholders:
  // "fill-blank": FillBlankCard,
  // "match": MatchCard,
  // "order": OrderCard,
  "checkpoint": CheckpointCard,
  "topic-complete": TopicCompleteCard,
};

export default function ActivityRenderer({ card }: { card: any }) {
  const Component = ActivityRegistry[card.type];

  if (!Component) {
    // Fallback if an activity type hasn't been built yet
    return (
      <div className="w-full h-full flex items-center justify-center p-6 text-center">
        <div className="glass-card p-8 border-accent-rose/30">
          <p className="text-accent-rose font-bold mb-2">Unsupported Activity</p>
          <p className="text-sm text-foreground/50">
            The `{card.type}` renderer is not registered.
          </p>
        </div>
      </div>
    );
  }

  return <Component card={card} />;
}
