"use client";
import { ContentCard as ContentCardType, MemeCard as MemeCardType } from "@/data/feed-cards";
import CardWrapper from "./CardWrapper";
import { useFeedStore } from "@/store/feed";
import { useEffect } from "react";

export function ContentCard({ card }: { card: any }) {
  const { recordEvent } = useFeedStore();

  useEffect(() => {
    // Auto-complete content cards after a short delay of viewing
    const timer = setTimeout(() => {
      recordEvent(card.id, { completed: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, [card.id, recordEvent]);

  const payload = card.payload || card;

  return (
    <CardWrapper card={card}>
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent leading-tight">
        {payload.title}
      </h2>
      <div className="text-lg text-foreground/70 leading-relaxed space-y-4 whitespace-pre-wrap">
        {payload.content}
      </div>
    </CardWrapper>
  );
}

export function MemeCard({ card }: { card: any }) {
  const { recordEvent } = useFeedStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      recordEvent(card.id, { completed: true });
    }, 1500);
    return () => clearTimeout(timer);
  }, [card.id, recordEvent]);

  const payload = card.payload || card;

  return (
    <CardWrapper card={card}>
      <div className="flex flex-col items-center justify-center text-center h-full space-y-8">
        <div className="text-8xl animate-float">
          {payload.emoji}
        </div>
        <div className="space-y-4">
          <p className="text-xl text-foreground/80 font-medium">
            {payload.setup}
          </p>
          <p className="text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            {payload.punchline}
          </p>
        </div>
      </div>
    </CardWrapper>
  );
}
