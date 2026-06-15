import { useState } from "react";
import { useFeedStore } from "@/store/feed";
import { useSound } from "@/hooks/useSound";
import { 
  QuestionPrimitive, 
  ExplanationPrimitive, 
  FeedbackPrimitive, 
  InputPrimitive, 
  SelectionPrimitive, 
  SequencePrimitive, 
  ConfidencePrimitive,
  CodeEditorPrimitive
} from "./primitives";
import CardWrapper from "./CardWrapper";

// =====================================
// FILL BLANK CARD
// =====================================
export function FillBlankCard({ card }: { card: any }) {
  const { playClick } = useSound();
  const { recordEvent } = useFeedStore();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [confidence, setConfidence] = useState<'guess' | 'somewhat' | 'sure' | null>(null);

  const payload = card.payload;
  
  const handleSubmit = () => {
    if (!value.trim()) return;
    const normalizedValue = value.toLowerCase().trim();
    const correct = payload.answers.map((a: string) => a.toLowerCase().trim()).includes(normalizedValue);
    
    setIsCorrect(correct);
    setSubmitted(true);
    
    if (correct) {
      recordEvent(card.id, { 
        completed: true, 
        firstAttemptCorrect: mistakes === 0 
      });
    } else {
      setMistakes(m => m + 1);
    }
  };

  const handleConfidence = (val: 'guess' | 'somewhat' | 'sure') => {
    setConfidence(val);
    recordEvent(card.id, { confidence: val });
  };

  return (
    <CardWrapper card={card}>
      <div className="w-full flex flex-col justify-center">
        <QuestionPrimitive text={payload.prompt} subtitle="Fill in the blank" />
        
        {!submitted ? (
          <InputPrimitive 
            value={value} 
            onChange={setValue} 
            placeholder="Type your answer..." 
            onSubmit={handleSubmit} 
          />
        ) : (
          <div className="animate-fade-in-up">
            <InputPrimitive 
              value={value} 
              onChange={() => {}} 
              disabled 
            />
            <FeedbackPrimitive 
              isCorrect={isCorrect} 
              message={isCorrect ? "Spot on!" : "Incorrect."} 
            />
            {isCorrect && payload.explanation && <ExplanationPrimitive text={payload.explanation} />}
            
            {isCorrect && !confidence && (
              <ConfidencePrimitive onRate={handleConfidence} />
            )}

            {!isCorrect && !revealed && (
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { playClick(); setSubmitted(false);  setValue(""); }} className="px-4 py-2 rounded-lg bg-surface border border-accent-primary/30 text-xs font-bold text-accent-primary hover:bg-accent-primary/10 transition-all">
                  Try again
                </button>
                {mistakes >= 2 && (
                   <button onClick={() => { playClick(); setRevealed(true); }} className="px-4 py-2 rounded-lg bg-surface border border-accent-rose/30 text-xs font-bold text-accent-rose hover:bg-accent-rose/10 transition-all">
                     I'm Stuck (Reveal Answer)
                   </button>
                )}
              </div>
            )}

            {!isCorrect && revealed && (
               <div className="mt-4 p-4 rounded-xl border border-accent-rose/30 bg-accent-rose/5 animate-fade-in-up">
                 <div className="text-xs font-bold uppercase tracking-widest text-accent-rose mb-3">Concept Review Recommended</div>
                 <p className="text-sm text-foreground/80 mb-4">Acceptable answers: {payload.answers.join(", ")}</p>
                 {payload.explanation && <ExplanationPrimitive text={payload.explanation} />}
                 
                 <div className="mt-6 flex justify-end">
                    <button onClick={() => { playClick(); setRevealed(false);  setSubmitted(false); setValue(""); }} className="px-4 py-2 rounded-lg bg-surface border border-accent-primary/30 text-xs font-bold text-accent-primary hover:bg-accent-primary/10 transition-all">
                      Got it, let me try
                    </button>
                 </div>
               </div>
            )}
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

// =====================================
// COMPARE CARD
// =====================================
export function CompareCard({ card }: { card: any }) {
  const { playClick } = useSound();
  const { recordEvent } = useFeedStore();
  const payload = card.payload; 
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [confidence, setConfidence] = useState<'guess' | 'somewhat' | 'sure' | null>(null);

  const statement = payload.statements[currentIdx];

  const handleSelect = (choiceId: string) => {
    const isCorrect = choiceId === statement.belongsTo;
    
    if (!isCorrect) {
      setMistakes(m => m + 1);
      setFeedback({ isCorrect: false, message: `Incorrect. Try again.` });
    } else {
      setFeedback({ isCorrect: true, message: `Correct!` });
      setTimeout(() => {
        setFeedback(null);
        if (currentIdx < payload.statements.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setFinished(true);
          recordEvent(card.id, { 
            completed: true, 
            firstAttemptCorrect: mistakes === 0 
          });
        }
      }, 1000);
    }
  };

  const handleConfidence = (val: 'guess' | 'somewhat' | 'sure') => {
    setConfidence(val);
    recordEvent(card.id, { confidence: val });
  };

  if (finished) {
    return (
      <CardWrapper card={card}>
        <div className="w-full flex flex-col justify-center animate-fade-in-up">
          <QuestionPrimitive text={`${payload.left} vs ${payload.right}`} subtitle="Comparison Complete" />
          <FeedbackPrimitive isCorrect={true} message={`You correctly categorized all ${payload.statements.length} statements!`} />
          {payload.summary && <ExplanationPrimitive text={payload.summary} />}
          {!confidence && <ConfidencePrimitive onRate={handleConfidence} />}
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper card={card}>
      <div className="w-full flex flex-col justify-center">
        <QuestionPrimitive 
          text={statement.text} 
          subtitle={`Which does this belong to? (${currentIdx + 1}/${payload.statements.length})`} 
        />
        
        <SelectionPrimitive 
          options={[
            { id: 'left', label: payload.left },
            { id: 'right', label: payload.right }
          ]}
          selectedIds={[]}
          onSelect={handleSelect}
          disabled={!!feedback && feedback.isCorrect}
        />

        {feedback && (
          <FeedbackPrimitive isCorrect={feedback.isCorrect} message={feedback.message} />
        )}
      </div>
    </CardWrapper>
  );
}

// =====================================
// TIMELINE CARD
// =====================================
export function TimelineCard({ card }: { card: any }) {
  const { playClick } = useSound();
  const { recordEvent } = useFeedStore();
  const payload = card.payload; 
  
  const [activeIdx, setActiveIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleItemClick = (idx: number) => {
    if (payload.mode === 'explore') {
      setActiveIdx(idx);
      if (idx === payload.steps.length - 1 && !finished) {
        setFinished(true);
        recordEvent(card.id, { completed: true });
      }
    } else {
      // Guided mode
      if (idx === activeIdx) {
        if (activeIdx < payload.steps.length - 1) {
          setActiveIdx(activeIdx + 1);
        } else if (!finished) {
          setFinished(true);
          recordEvent(card.id, { completed: true });
        }
      } else if (idx < activeIdx) {
        setActiveIdx(idx);
      }
    }
  };

  const currentStep = payload.steps[activeIdx];

  return (
    <CardWrapper card={card}>
      <div className="w-full flex flex-col justify-center h-full overflow-y-auto scrollbar-none py-4">
        <QuestionPrimitive text={(card as any).topic || "Timeline"} subtitle={payload.mode === 'guided' ? "Tap active step to advance" : "Explore timeline"} />
        
        <SequencePrimitive 
          items={payload.steps.map((step: any, i: number) => ({
            id: i.toString(),
            label: step.title,
            state: i < activeIdx ? 'completed' : i === activeIdx ? 'active' : 'upcoming'
          }))}
          selectedIndex={activeIdx}
          onItemClick={handleItemClick}
        />

        <div className="mt-8 animate-fade-in-up">
          {currentStep && (
            <div className="p-4 rounded-xl bg-surface border border-white/10 shadow-lg shadow-black/50">
              <h4 className="font-bold text-accent-primary mb-2">{currentStep.title}</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{currentStep.description}</p>
            </div>
          )}
        </div>
        
        {finished && (
        <div className="mt-8">
           <FeedbackPrimitive isCorrect={true} message="Timeline complete! Scroll down to continue." />
        </div>
      )}
    </div>
  </CardWrapper>
  );
}

// =====================================
// CODE COMPLETION CARD
// =====================================
export function CodeCompletionCard({ card }: { card: any }) {
  const { playClick } = useSound();
  const { recordEvent } = useFeedStore();
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [confidence, setConfidence] = useState<'guess' | 'somewhat' | 'sure' | null>(null);

  const payload = card.payload;
  
  const handleSubmit = () => {
    const isMultiBlank = typeof payload.answers[0] === 'object';
    let correct = false;

    if (!isMultiBlank) {
      const match = payload.template.match(/\{\{([^}]+)\}\}/);
      if (!match) return;
      const key = match[1];
      
      const userVal = (values[key] || "").toLowerCase().trim();
      if (!userVal) return;

      correct = payload.answers.map((a: string) => a.toLowerCase().trim()).includes(userVal);
    } else {
      // Multiple blanks
      correct = payload.answers.some((ansObj: Record<string, string>) => {
        return Object.keys(ansObj).every(key => {
          const userVal = (values[key] || "").toLowerCase().trim();
          const expectedVal = ansObj[key].toLowerCase().trim();
          return userVal === expectedVal;
        });
      });
    }
    
    setIsCorrect(correct);
    setSubmitted(true);
    
    if (correct) {
      recordEvent(card.id, { 
        completed: true, 
        firstAttemptCorrect: mistakes === 0 
      });
    } else {
      setMistakes(m => m + 1);
    }
  };

  const handleConfidence = (val: 'guess' | 'somewhat' | 'sure') => {
    setConfidence(val);
    recordEvent(card.id, { confidence: val });
  };

  return (
    <CardWrapper card={card}>
      <div className="w-full flex flex-col justify-center">
        <QuestionPrimitive text="Complete the Code" subtitle="Implementation" />
        
        {payload.prompt && (
          <p className="text-foreground/80 text-sm mb-2">{payload.prompt}</p>
        )}

        <CodeEditorPrimitive 
          template={payload.template}
          values={values}
          onChange={(k, v) => setValues(prev => ({ ...prev, [k]: v }))}
          onSubmit={handleSubmit}
          disabled={submitted}
        />

        {!submitted ? (
          <div className="mt-6 flex justify-end animate-fade-in-up">
            <button 
              onClick={() => { playClick(); handleSubmit(); }}
              className="w-full py-3 rounded-xl bg-accent-primary text-white font-bold transition-all hover:bg-accent-primary/90 active:scale-[0.98]"
            >
              Run Code
            </button>
          </div>
        ) : (
          <div className="animate-fade-in-up mt-4">
            <FeedbackPrimitive 
              isCorrect={isCorrect} 
              message={isCorrect ? "Implementation correct!" : "Compilation Error."} 
            />
            {isCorrect && payload.explanation && <ExplanationPrimitive text={payload.explanation} />}
            
            {isCorrect && !confidence && (
              <ConfidencePrimitive onRate={handleConfidence} />
            )}

            {!isCorrect && !revealed && (
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { playClick(); setSubmitted(false); }} className="px-4 py-2 rounded-lg bg-surface border border-accent-primary/30 text-xs font-bold text-accent-primary hover:bg-accent-primary/10 transition-all">
                  Try again
                </button>
                {mistakes >= 2 && (
                   <button onClick={() => { playClick(); setRevealed(true); }} className="px-4 py-2 rounded-lg bg-surface border border-accent-rose/30 text-xs font-bold text-accent-rose hover:bg-accent-rose/10 transition-all">
                     I'm Stuck (Reveal Answer)
                   </button>
                )}
              </div>
            )}

            {!isCorrect && revealed && (
               <div className="mt-4 p-4 rounded-xl border border-accent-rose/30 bg-accent-rose/5 animate-fade-in-up">
                 <div className="text-xs font-bold uppercase tracking-widest text-accent-rose mb-3">Concept Review Recommended</div>
                 <p className="text-sm text-foreground/80 mb-4">Accepted answers: {typeof payload.answers[0] === 'string' ? payload.answers.join(" or ") : payload.answers.map((obj: any) => Object.values(obj).join(", ")).join(" OR ")}</p>
                 {payload.explanation && <ExplanationPrimitive text={payload.explanation} />}
                 
                 <div className="mt-6 flex justify-end">
                    <button onClick={() => { playClick(); setRevealed(false);  setSubmitted(false); }} className="px-4 py-2 rounded-lg bg-surface border border-accent-primary/30 text-xs font-bold text-accent-primary hover:bg-accent-primary/10 transition-all">
                      Got it, let me try
                    </button>
                 </div>
               </div>
            )}
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

// =====================================
// PROGRESSIVE MATCH CARD
// =====================================
export function ProgressiveMatchCard({ card }: { card: any }) {
  const { playClick } = useSound();
  const { recordEvent } = useFeedStore();
  const payload = card.payload; // { prompt, terms: { id, text, definitionId }[], definitions: { id, text }[] }
  
  const [currentTermIdx, setCurrentTermIdx] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const term = payload.terms[currentTermIdx];

  const handleSelect = (definitionId: string) => {
    const isCorrect = definitionId === term.definitionId;
    
    if (!isCorrect) {
      setMistakes(m => m + 1);
      setFeedback({ isCorrect: false, message: `Incorrect. Try again.` });
    } else {
      setFeedback({ isCorrect: true, message: `Correct!` });
      setTimeout(() => {
        setFeedback(null);
        if (currentTermIdx < payload.terms.length - 1) {
          setCurrentTermIdx(i => i + 1);
        } else {
          setFinished(true);
          recordEvent(card.id, { completed: true, firstAttemptCorrect: mistakes === 0 });
        }
      }, 1000);
    }
  };

  if (finished) {
    return (
      <CardWrapper card={card}>
        <div className="w-full flex flex-col justify-center animate-fade-in-up">
          <QuestionPrimitive text="Matching Complete" subtitle="Progressive Match" />
          <FeedbackPrimitive isCorrect={true} message={`You matched all ${payload.terms.length} terms perfectly!`} />
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper card={card}>
      <div className="w-full flex flex-col justify-center">
        <QuestionPrimitive 
          text={term.text} 
          subtitle={`${payload.prompt || "Match the term"} (${currentTermIdx + 1}/${payload.terms.length})`} 
        />
        
        <SelectionPrimitive 
          options={payload.definitions.map((d: any) => ({ id: d.id, label: d.text }))}
          selectedIds={[]}
          onSelect={handleSelect}
          disabled={!!feedback && feedback.isCorrect}
        />

        {feedback && (
          <FeedbackPrimitive isCorrect={feedback.isCorrect} message={feedback.message} />
        )}
      </div>
    </CardWrapper>
  );
}

// =====================================
// TAP ORDER CARD
// =====================================
export function TapOrderCard({ card }: { card: any }) {
  const { playClick } = useSound();
  const { recordEvent } = useFeedStore();
  const payload = card.payload; // { prompt, items: { id, text }[], correctOrder: string[] }
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const availableItems = payload.items.filter((i: any) => !selectedIds.includes(i.id));

  const handleSelect = (itemId: string) => {
    const nextExpectedId = payload.correctOrder[selectedIds.length];
    
    if (itemId !== nextExpectedId) {
      setMistakes(m => m + 1);
      setFeedback({ isCorrect: false, message: `Incorrect order. Try again.` });
      // Reset after a moment
      setTimeout(() => {
        setFeedback(null);
        setSelectedIds([]);
      }, 1500);
    } else {
      const newSelected = [...selectedIds, itemId];
      setSelectedIds(newSelected);
      setFeedback(null);
      
      if (newSelected.length === payload.correctOrder.length) {
        setFinished(true);
        recordEvent(card.id, { completed: true, firstAttemptCorrect: mistakes === 0 });
      }
    }
  };

  if (finished) {
    return (
      <CardWrapper card={card}>
        <div className="w-full flex flex-col justify-center animate-fade-in-up">
          <QuestionPrimitive text="Sequence Correct" subtitle="Tap Order" />
          <SequencePrimitive 
            items={payload.correctOrder.map((id: string) => {
              const item = payload.items.find((i: any) => i.id === id);
              return { id, label: item.text, state: 'completed' };
            })}
            selectedIndex={payload.correctOrder.length}
            onItemClick={() => {}}
          />
          <FeedbackPrimitive isCorrect={true} message={`Great job ordering the sequence!`} />
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper card={card}>
      <div className="w-full flex flex-col justify-center">
        <QuestionPrimitive text={payload.prompt || "Order the sequence"} subtitle="Tap items in the correct order" />
        
        {selectedIds.length > 0 && (
          <div className="mb-6 animate-fade-in-up">
            <span className="text-xs font-bold text-foreground/50 mb-2 block">Current Sequence:</span>
            <div className="flex flex-col gap-2">
              {selectedIds.map((id, idx) => {
                const item = payload.items.find((i: any) => i.id === id);
                return (
                  <div key={id} className="p-3 bg-accent-primary/20 border border-accent-primary rounded-xl text-accent-primary font-bold flex gap-3 items-center shadow-[0_0_15px_rgba(139,148,255,0.1)]">
                    <span className="w-6 h-6 rounded-full bg-accent-primary text-white flex items-center justify-center text-xs">{idx + 1}</span>
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <SelectionPrimitive 
          options={availableItems.map((i: any) => ({ id: i.id, label: i.text }))}
          selectedIds={[]}
          onSelect={handleSelect}
          disabled={!!feedback}
        />

        {feedback && (
          <FeedbackPrimitive isCorrect={feedback.isCorrect} message={feedback.message} />
        )}
      </div>
    </CardWrapper>
  );
}

// =====================================
// PREDICT NEXT LINE CARD
// =====================================
export function PredictNextLineCard({ card }: { card: any }) {
  const { playClick } = useSound();
  const { recordEvent } = useFeedStore();
  const payload = card.payload; // { template, options: { id, code, isCorrect, explanation }[] }
  
  const [selectedOpt, setSelectedOpt] = useState<any>(null);
  
  const handleSelect = (id: string) => {
    if (selectedOpt) return;
    const opt = payload.options.find((o: any) => o.id === id);
    setSelectedOpt(opt);
    recordEvent(card.id, { completed: true, firstAttemptCorrect: opt.isCorrect });
  };

  return (
    <CardWrapper card={card}>
      <div className="w-full flex flex-col justify-center">
        <QuestionPrimitive text="What comes next?" subtitle="Implementation" />
        
        <CodeEditorPrimitive 
          template={payload.template}
          values={selectedOpt ? { "blank": selectedOpt.code } : {}}
          onChange={() => {}}
          disabled={true}
        />

        <div className="mt-6 animate-fade-in-up">
          <SelectionPrimitive 
            options={payload.options.map((o: any) => ({ id: o.id, label: o.code }))}
            selectedIds={selectedOpt ? [selectedOpt.id] : []}
            onSelect={handleSelect}
            disabled={!!selectedOpt}
          />
        </div>

        {selectedOpt && (
          <div className="animate-fade-in-up mt-4">
            <FeedbackPrimitive 
              isCorrect={selectedOpt.isCorrect} 
              message={selectedOpt.isCorrect ? "Correct!" : "Incorrect."} 
            />
            {selectedOpt.isCorrect && selectedOpt.explanation && <ExplanationPrimitive text={selectedOpt.explanation} />}
            {!selectedOpt.isCorrect && (
              <button onClick={() => setSelectedOpt(null)} className="mt-3 px-4 py-2 rounded-lg bg-surface border border-accent-primary/30 text-xs font-bold text-accent-primary hover:bg-accent-primary/10 transition-all">
                Try again
              </button>
            )}
          </div>
        )}
      </div>
    </CardWrapper>
  );
}
