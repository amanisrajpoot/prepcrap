import FeedContainer from "@/components/feed/FeedContainer";

export default async function TopicFeedPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  return <FeedContainer topicId={topicId} />;
}
