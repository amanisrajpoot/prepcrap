"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, HelpCircle, Trophy } from "lucide-react";
import { useProgressStore } from "@/store/progress";
import { usePillar } from "@/context/PillarContext";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface QuizProps {
  question: string;
  options?: Option[];
  optionsJSON?: string;
  slug?: string; // Passed from parent or context
}

export default function Quiz({ question, options, optionsJSON, slug: propsSlug }: QuizProps) {
  const { setQuizPassed, quizScores } = useProgressStore();
  const { slug: contextSlug } = usePillar();
  const slug = propsSlug || contextSlug;
  
  let parsedOptions: Option[] = [];
  try {
    if (optionsJSON) {
      parsedOptions = JSON.parse(optionsJSON);
    } else if (options) {
      parsedOptions = options;
    }
  } catch (err) {
    console.error("Quiz component failed to parse options:", err);
  }

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Load state if already passed
  useEffect(() => {
    if (slug && quizScores[slug] && !hasSubmitted) {
      // Find the correct option
      const correct = parsedOptions.find(o => o.isCorrect);
      if (correct) {
        setSelectedId(correct.id);
        setHasSubmitted(true);
        setIsCorrect(true);
      }
    }
  }, [slug, quizScores, parsedOptions, hasSubmitted]);

  const handleSelect = (id: string) => {
    if (!hasSubmitted) {
      setSelectedId(id);
    }
  };

  const handleSubmit = () => {
    if (selectedId) {
      const option = parsedOptions.find((o) => o.id === selectedId);
      const correct = !!option?.isCorrect;
      setIsCorrect(correct);
      setHasSubmitted(true);
      
      if (correct && slug) {
        setQuizPassed(slug, true);
      }
    }
  };

  const selectedOption = parsedOptions.find((o) => o.id === selectedId);

  return (
    <div className="Quiz my-8 p-6 rounded-2xl border border-[rgba(139,148,255,0.2)] bg-surface/40 backdrop-blur-sm shadow-xl relative overflow-hidden group">
      {/* Background Decorative Element */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent-primary/10 rounded-full blur-2xl group-hover:bg-accent-primary/20 transition-all duration-500" />
      
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-accent-primary/10 text-accent-primary">
          <HelpCircle className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
          Knowledge Check
        </span>
      </div>

      <h4 className="text-lg md:text-xl font-bold text-foreground mb-6 leading-tight">{question}</h4>

      <div className="space-y-3">
        {parsedOptions.map((option) => {
          const isSelected = selectedId === option.id;
          let buttonClass =
            "w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ";

          if (!hasSubmitted) {
            buttonClass += isSelected
              ? "border-accent-primary bg-accent-primary/10 shadow-[0_0_15px_rgba(124,92,252,0.2)]"
              : "border-[rgba(139,148,255,0.1)] hover:border-[rgba(139,148,255,0.3)] bg-surface/50 hover:bg-surface";
          } else {
            if (option.isCorrect) {
              buttonClass +=
                "border-accent-emerald bg-accent-emerald/10 text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.15)]";
            } else if (isSelected && !option.isCorrect) {
              buttonClass +=
                "border-accent-rose bg-accent-rose/10 text-rose-100";
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
                <span className="font-medium">{option.text}</span>
                {hasSubmitted && option.isCorrect && (
                  <div className="p-1 rounded-full bg-accent-emerald/20">
                    <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
                  </div>
                )}
                {hasSubmitted && isSelected && !option.isCorrect && (
                  <div className="p-1 rounded-full bg-accent-rose/20">
                    <XCircle className="w-5 h-5 text-accent-rose" />
                  </div>
                )}
              </div>
              {isSelected && !hasSubmitted && (
                <div className="absolute inset-y-0 left-0 w-1 bg-accent-primary" />
              )}
            </button>
          );
        })}
      </div>

      {!hasSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedId}
          className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-primary/20"
        >
          Verify Knowledge
        </button>
      ) : (
        <div
          className={`mt-8 p-5 rounded-xl border animate-fade-in-up ${
            isCorrect
              ? "border-accent-emerald/30 bg-accent-emerald/5"
              : "border-accent-rose/30 bg-accent-rose/5"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${isCorrect ? "bg-accent-emerald/20 text-accent-emerald" : "bg-accent-rose/20 text-accent-rose"}`}>
              {isCorrect ? <Trophy className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
            <div>
              <p className="font-bold text-lg mb-1">
                {isCorrect ? "Spot on! 🎉" : "Not quite right."}
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {selectedOption?.explanation ||
                  (isCorrect
                    ? "You've mastered this concept. Ready for the next one?"
                    : "Review the technical details and try again to solidify your understanding.")}
              </p>
              {!isCorrect && (
                <button 
                  onClick={() => { setHasSubmitted(false); setSelectedId(null); }}
                  className="mt-4 px-4 py-2 rounded-lg bg-surface border border-accent-primary/30 text-xs font-bold text-accent-primary hover:bg-accent-primary/10 transition-all flex items-center gap-2 w-fit"
                >
                  <HelpCircle className="w-3 h-3" />
                  Try again
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
