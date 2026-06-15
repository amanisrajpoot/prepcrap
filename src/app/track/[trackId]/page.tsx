import { PACK_REGISTRY } from "@/data/curriculum/packs";
import { TRACKS } from "@/data/curriculum/taxonomy";
import Link from "next/link";
import { ChevronRight, Target, Trophy, Clock } from "lucide-react";
import { TrackClientTopics } from "@/components/topics/TrackClientTopics";

export default async function TrackDashboardPage({ params }: { params: Promise<{ trackId: string }> }) {
  const { trackId } = await params;
  const track = TRACKS.find(t => t.id === trackId);
  
  if (!track) {
    return <div className="p-8 text-white">Track not found for ID: {trackId}</div>;
  }

  // Sort topics by order
  const topics = Object.values(PACK_REGISTRY)
    .filter(pack => pack.topic.trackId === trackId)
    .sort((a, b) => a.topic.order - b.topic.order);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <div className="pt-16 px-6 pb-8 border-b border-white/5 bg-gradient-to-b from-accent-primary/10 to-background">
        <Link href="/" className="text-accent-primary text-sm font-bold mb-4 inline-block hover:underline">
          &larr; Back to Tracks
        </Link>
        <h1 className="text-4xl font-black tracking-tight mb-3">{track.title}</h1>
        <p className="text-foreground/70 leading-relaxed text-lg max-w-2xl">
          {track.description}
        </p>
      </div>

      {/* Progress Overview & Topics List */}
      <TrackClientTopics topics={topics} />
    </div>
  );
}
