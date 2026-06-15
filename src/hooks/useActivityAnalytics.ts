import { useFeedStore } from "@/store/feed";
import { TopicActivity } from "@/types/curriculum";
import { useMemo } from "react";

export interface ActivityAnalytics {
  completionRate: number;
  averageTimeMs: number;
  dropOffRate: number;
  totalAttempts: number;
}

export function useActivityAnalytics(activities: TopicActivity[]) {
  const { cardEvents } = useFeedStore();

  return useMemo(() => {
    const statsByType: Record<string, { completions: number; total: number; timeMs: number; dropOffs: number }> = {};

    // Initialize all seen types
    activities.forEach(a => {
      if (!statsByType[a.type]) {
        statsByType[a.type] = { completions: 0, total: 0, timeMs: 0, dropOffs: 0 };
      }
    });

    Object.entries(cardEvents).forEach(([cardId, event]) => {
      const activity = activities.find(a => a.id === cardId);
      if (!activity) return;

      const type = activity.type;
      statsByType[type].total += 1;
      
      if (event.completed) {
        statsByType[type].completions += 1;
        statsByType[type].timeMs += event.timeSpentMs || 0;
      } else {
        // If they viewed it but didn't complete it, and it's an interactive card, it's a dropoff
        if (event.viewed && type !== "why-it-matters" && type !== "content") {
          statsByType[type].dropOffs += 1;
        }
      }
    });

    const result: Record<string, ActivityAnalytics> = {};
    
    for (const [type, stats] of Object.entries(statsByType)) {
      result[type] = {
        completionRate: stats.total > 0 ? Math.round((stats.completions / stats.total) * 100) : 0,
        averageTimeMs: stats.completions > 0 ? Math.round(stats.timeMs / stats.completions) : 0,
        dropOffRate: stats.total > 0 ? Math.round((stats.dropOffs / stats.total) * 100) : 0,
        totalAttempts: stats.total
      };
    }

    return result;
  }, [cardEvents, activities]);
}
