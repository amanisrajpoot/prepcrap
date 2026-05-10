"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

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
}

export default function Quiz({ question, options, optionsJSON }: QuizProps) {
  let parsedOptions: Option[] = [];
  
  try {
    if (optionsJSON) {
      parsedOptions = JSON.parse(optionsJSON);
    } else if (options) {
      parsedOptions = options;
    }
  } catch (err) {
    console.error("Quiz component failed to parse options:", err, "optionsJSON:", optionsJSON);
  }

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    if (!hasSubmitted) {
      setSelectedId(id);
    }
  };

  const handleSubmit = () => {
    if (selectedId) {
      setHasSubmitted(true);
    }
  };

  const selectedOption = parsedOptions.find((o) => o.id === selectedId);

  return (
    <div className="my-6 p-5 rounded-xl border border-[rgba(139,148,255,0.15)] bg-[rgba(18,19,42,0.4)] shadow-sm">
      <h4 className="text-lg font-bold text-foreground mb-4">{question}</h4>

      <div className="space-y-3">
        {parsedOptions.map((option) => {
          const isSelected = selectedId === option.id;
          let buttonClass =
            "w-full text-left p-3 rounded-lg border transition-all duration-200 ";

          if (!hasSubmitted) {
            buttonClass += isSelected
              ? "border-accent-primary bg-accent-primary/10"
              : "border-[rgba(139,148,255,0.1)] hover:border-[rgba(139,148,255,0.3)] bg-surface";
          } else {
            if (option.isCorrect) {
              buttonClass +=
                "border-accent-emerald bg-accent-emerald/10 text-emerald-100";
            } else if (isSelected && !option.isCorrect) {
              buttonClass +=
                "border-accent-rose bg-accent-rose/10 text-rose-100";
            } else {
              buttonClass += "border-[rgba(139,148,255,0.1)] opacity-50";
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={hasSubmitted}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span>{option.text}</span>
                {hasSubmitted && option.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
                )}
                {hasSubmitted && isSelected && !option.isCorrect && (
                  <XCircle className="w-5 h-5 text-accent-rose" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {!hasSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedId}
          className="mt-5 w-full py-2.5 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          Check Answer
        </button>
      ) : (
        <div
          className={`mt-5 p-4 rounded-lg border ${
            selectedOption?.isCorrect
              ? "border-accent-emerald/30 bg-accent-emerald/5"
              : "border-accent-rose/30 bg-accent-rose/5"
          }`}
        >
          <p className="font-bold mb-1">
            {selectedOption?.isCorrect ? "Correct! 🎉" : "Incorrect."}
          </p>
          <p className="text-sm text-foreground/80">
            {selectedOption?.explanation ||
              (selectedOption?.isCorrect
                ? "Great job!"
                : "Review the concepts and try again.")}
          </p>
        </div>
      )}
    </div>
  );
}
