import { CHALLENGES } from "@/data/challenges";
import LeetCodeWorkspace from "@/components/LeetCodeWorkspace";
import { notFound } from "next/navigation";

export default async function ChallengePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const challenge = CHALLENGES.find((c) => c.id === id);

  if (!challenge) {
    notFound();
  }

  return <LeetCodeWorkspace challenge={challenge} />;
}

export async function generateStaticParams() {
  return CHALLENGES.map((challenge) => ({
    id: challenge.id,
  }));
}
