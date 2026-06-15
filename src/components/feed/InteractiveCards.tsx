"use client";
import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, HelpCircle, Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { useFeedStore } from "@/store/feed";
import CardWrapper from "./CardWrapper";
import { MCQCard as MCQCardType, CodePredictionCard as CodePredictionCardType, InterviewCard as InterviewCardType, HotTakeCard as HotTakeCardType } from "@/data/feed-cards";

export function MCQCard({ card }: { card: any }) {
  const { recordEvent } = useFeedStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (id: string) => {
    if (!hasSubmitted) setSelectedId(id);
  };

  const payload = card.payload || card;

  const handleSubmit = () => {
    if (selectedId && !hasSubmitted) {
      const option = payload.options.find((o: any) => o.id === selectedId);
      const correct = !!option?.isCorrect;
      setIsCorrect(correct);
      setHasSubmitted(true);
      
      // Update store events
      recordEvent(card.id, { 
        completed: correct,
      });
    }
  };

  const selectedOption = payload.options.find((o: any) => o.id === selectedId);

  return (
    <CardWrapper card={card}>
      <h3 className="text-xl font-bold text-foreground mb-8 leading-tight">
        {String(payload.question || '').split(/\\n|\n/).map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h3>
      
      <div className="space-y-3">
        {payload.options.map((option: any) => {
          const isSelected = selectedId === option.id;
          let buttonClass = "w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ";

          if (!hasSubmitted) {
            buttonClass += isSelected
              ? "border-accent-primary bg-accent-primary/10 shadow-[0_0_15px_rgba(124,92,252,0.2)]"
              : "border-[rgba(139,148,255,0.1)] hover:border-[rgba(139,148,255,0.3)] bg-surface/50";
          } else {
            if (isSelected && option.isCorrect) {
              buttonClass += "border-accent-emerald bg-accent-emerald/10 text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.15)]";
            } else if (isSelected && !option.isCorrect) {
              buttonClass += "border-accent-rose bg-accent-rose/10 text-rose-100";
            } else {
              buttonClass += "border-[rgba(139,148,255,0.05)] opacity-40";
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={hasSubmitted}
              className={buttonClass}
            >
              <div className="flex items-center justify-between gap-4 relative z-10">
                <span className="font-medium text-sm">{option.text}</span>
                {hasSubmitted && option.isCorrect && <CheckCircle2 className="w-5 h-5 text-accent-emerald shrink-0" />}
                {hasSubmitted && isSelected && !option.isCorrect && <XCircle className="w-5 h-5 text-accent-rose shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {!hasSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedId}
          className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold disabled:opacity-30 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-primary/20"
        >
          Check Answer
        </button>
      ) : (
        <div className={`mt-8 p-4 rounded-xl border animate-fade-in-up ${isCorrect ? "border-accent-emerald/30 bg-accent-emerald/5" : "border-accent-rose/30 bg-accent-rose/5"}`}>
          <p className="font-bold mb-2 text-sm">{isCorrect ? "Correct!" : "Not quite."}</p>
          <p className="text-xs text-foreground/70 leading-relaxed">{selectedOption?.explanation || (isCorrect ? "Great job!" : "Try again to unlock the next card.")}</p>
          {!isCorrect && (
            <button onClick={() => { setHasSubmitted(false); setSelectedId(null); }} className="mt-4 px-4 py-2 rounded-lg bg-surface border border-accent-primary/30 text-xs font-bold text-accent-primary hover:bg-accent-primary/10 transition-all">
              Try again
            </button>
          )}
        </div>
      )}
    </CardWrapper>
  );
}

export function CodePredictionCard({ card }: { card: any }) {
  const { recordEvent } = useFeedStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const payload = card.payload || card;

  const handleSubmit = () => {
    if (selectedId && !hasSubmitted) {
      const option = payload.options.find((o: any) => o.id === selectedId);
      const correct = !!option?.isCorrect;
      setIsCorrect(correct);
      setHasSubmitted(true);
      recordEvent(card.id, { completed: correct });
    }
  };

  return (
    <CardWrapper card={card}>
      <h3 className="text-xl font-bold text-foreground mb-4 leading-tight">
        {String(payload.question || '').split(/\\n|\n/).map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h3>
      <div className="bg-[#0d0d12] border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
        <pre className="text-sm text-accent-secondary font-mono leading-relaxed">
          <code>
            {String(payload.code || '').split(/\\n|\n/).map((line, i) => (
              <div key={i} className="min-h-[1.5em]">{line}</div>
            ))}
          </code>
        </pre>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {payload.options.map((option: any) => {
          const isSelected = selectedId === option.id;
          let btnClass = "text-center p-3 rounded-xl border transition-all font-mono text-sm ";
          
          if (!hasSubmitted) {
            btnClass += isSelected ? "border-accent-primary bg-accent-primary/10 shadow-[0_0_15px_rgba(124,92,252,0.2)]" : "border-[rgba(139,148,255,0.1)] hover:border-[rgba(139,148,255,0.3)] bg-surface/50";
          } else {
            if (isSelected && option.isCorrect) {
              btnClass += "border-accent-emerald bg-accent-emerald/10 text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.15)]";
            } else if (isSelected && !option.isCorrect) {
              btnClass += "border-accent-rose bg-accent-rose/10 text-rose-100";
            } else {
              btnClass += "border-[rgba(139,148,255,0.05)] opacity-40";
            }
          }

          return (
            <button key={option.id} onClick={() => !hasSubmitted && setSelectedId(option.id)} disabled={hasSubmitted} className={btnClass}>
              {option.text}
            </button>
          );
        })}
      </div>

      {!hasSubmitted ? (
        <button onClick={handleSubmit} disabled={!selectedId} className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold disabled:opacity-30 transition-all hover:scale-[1.02] active:scale-[0.98]">
          Run Code
        </button>
      ) : (
        <div className={`mt-6 p-4 rounded-xl border animate-fade-in-up ${isCorrect ? "border-accent-emerald/30 bg-accent-emerald/5" : "border-accent-rose/30 bg-accent-rose/5"}`}>
          <p className="text-xs text-foreground/70 leading-relaxed">{payload.options.find((o: any) => o.id === selectedId)?.explanation}</p>
          {!isCorrect && (
            <button onClick={() => { setHasSubmitted(false); setSelectedId(null); }} className="mt-3 px-4 py-2 rounded-lg bg-surface border border-accent-primary/30 text-xs font-bold text-accent-primary hover:bg-accent-primary/10 transition-all">
              Try again
            </button>
          )}
        </div>
      )}
    </CardWrapper>
  );
}

export function InterviewCard({ card }: { card: any }) {
  const { recordEvent } = useFeedStore();
  const [revealed, setRevealed] = useState(false);
  const [mountedTime, setMountedTime] = useState(0);

  useEffect(() => {
    setMountedTime(Date.now());
  }, []);

  const handleReveal = () => {
    const revealedAfterMs = Date.now() - mountedTime;
    setRevealed(true);
    recordEvent(card.id, { completed: true, revealedAfterMs });
  };

  const payload = card.payload || card;

  return (
    <CardWrapper card={card}>
      <div className="flex flex-col items-center justify-center text-center space-y-6 h-full">
        <HelpCircle className="w-12 h-12 text-accent-primary/40 mb-2" />
        <h3 className="text-2xl font-bold leading-tight">
          {String(payload.question || '').split(/\\n|\n/).map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h3>
        
        {!revealed ? (
          <div className="pt-8 flex flex-col items-center gap-4">
            <p className="text-sm font-medium text-accent-secondary animate-pulse">Think first...</p>
            <button onClick={handleReveal} className="px-8 py-3 rounded-full border border-accent-primary/30 bg-accent-primary/10 text-accent-primary font-bold hover:bg-accent-primary/20 transition-all flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Reveal Answer
            </button>
          </div>
        ) : (
          <div className="mt-8 p-6 rounded-2xl bg-surface border border-white/5 text-left animate-fade-in-up w-full">
            <div className="text-xs font-bold uppercase tracking-widest text-accent-emerald mb-4">Model Answer</div>
            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{payload.answer || payload.modelAnswer}</p>
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

export function HotTakeCard({ card }: { card: any }) {
  const { recordEvent } = useFeedStore();
  const [voted, setVoted] = useState<"agree" | "disagree" | null>(null);

  const handleVote = (vote: "agree" | "disagree") => {
    setVoted(vote);
    recordEvent(card.id, { completed: true });
  };

  const payload = card.payload || card;

  return (
    <CardWrapper card={card}>
      <div className="flex flex-col items-center text-center">
        <div className="px-4 py-1.5 bg-accent-rose/20 text-accent-rose text-xs font-bold uppercase tracking-widest rounded-full mb-8 flex items-center gap-2">
          <span>🔥</span> Hot Take
        </div>
        <h3 className="text-2xl font-bold leading-tight mb-12">{payload.statement}</h3>
        
        {!voted ? (
          <div className="flex gap-4 w-full">
            <button onClick={() => handleVote("agree")} className="flex-1 py-4 rounded-xl border border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald font-bold hover:bg-accent-emerald/20 transition-all flex flex-col items-center gap-2">
              <ThumbsUp className="w-6 h-6" />
              Agree
            </button>
            <button onClick={() => handleVote("disagree")} className="flex-1 py-4 rounded-xl border border-accent-rose/30 bg-accent-rose/10 text-accent-rose font-bold hover:bg-accent-rose/20 transition-all flex flex-col items-center gap-2">
              <ThumbsDown className="w-6 h-6" />
              Disagree
            </button>
          </div>
        ) : (
          <div className="w-full p-6 rounded-2xl bg-surface border border-white/5 text-left animate-fade-in-up">
            <div className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-3">Community Consensus</div>
            <p className="text-sm text-foreground/80 leading-relaxed">{payload.explanation}</p>
          </div>
        )}
      </div>
    </CardWrapper>
  );
}
