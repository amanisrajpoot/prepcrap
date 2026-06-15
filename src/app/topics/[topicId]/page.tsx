import { PACK_REGISTRY } from "@/data/curriculum/packs";
import Link from "next/link";
import { Play, CheckCircle2, TrendingUp, BookOpen, AlertTriangle, Target } from "lucide-react";
import { TopicClientDashboard } from "@/components/topics/TopicClientDashboard";

export default async function TopicDashboardPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const pack = PACK_REGISTRY[topicId];
  
  if (!pack) {
    return <div className="p-8 text-white">Topic not found</div>;
  }

  const { topic, activities } = pack;
  
  // Extract "Why It Matters" from the first activity if it exists
  const whyItMattersAct = activities.find(a => a.type === "why-it-matters");
  const hook = whyItMattersAct?.payload?.explanation || "Master this topic to level up your engineering skills.";

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <div className="pt-16 px-6 pb-8 border-b border-white/5 bg-gradient-to-b from-accent-secondary/10 to-background">
        <Link href={`/track/${topic.trackId}`} className="text-accent-secondary text-sm font-bold mb-4 inline-block hover:underline">
          &larr; Back to Track
        </Link>
        <h1 className="text-4xl font-black tracking-tight mb-4">{topic.title}</h1>
        
        <TopicClientDashboard topicId={topic.id} activities={activities} />
      </div>

      <div className="px-6 py-8 max-w-3xl mx-auto space-y-10">
        
        {/* Why it Matters */}
        <section className="-mt-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent-secondary" />
            Why This Matters
          </h2>
          <div className="p-5 rounded-2xl bg-surface border border-white/5 text-foreground/80 leading-relaxed">
            {hook}
          </div>
        </section>

        {/* Objectives */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent-primary" />
            Learning Objectives
          </h2>
          <div className="space-y-3">
            {topic.objectives.map((obj, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-6 h-6 text-foreground/20 flex-shrink-0" />
                <span className="font-medium text-foreground/90 leading-snug">{obj}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
