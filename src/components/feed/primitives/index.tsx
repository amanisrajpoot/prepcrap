import { CheckCircle2, XCircle } from "lucide-react";

// ==========================================
// DISPLAY LAYER
// ==========================================

export function QuestionPrimitive({ text, subtitle }: { text: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      {subtitle && <span className="text-xs font-bold uppercase tracking-widest text-accent-primary mb-2 block">{subtitle}</span>}
      <h3 className="text-xl font-bold text-foreground leading-tight">{text}</h3>
    </div>
  );
}

export function ExplanationPrimitive({ text }: { text: string }) {
  return (
    <div className="mt-6 p-4 rounded-xl bg-accent-primary/10 border border-accent-primary/20 animate-fade-in-up">
      <div className="text-xs font-bold uppercase tracking-widest text-accent-primary mb-2">Explanation</div>
      <p className="text-sm text-foreground/80 leading-relaxed">{text}</p>
    </div>
  );
}

export function FeedbackPrimitive({ isCorrect, message }: { isCorrect: boolean; message: string }) {
  return (
    <div className={`mt-6 p-4 rounded-xl border animate-fade-in-up flex items-start gap-3 ${
      isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
    }`}>
      {isCorrect ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 shrink-0 mt-0.5" />}
      <p className="text-sm leading-relaxed">{message}</p>
    </div>
  );
}

// ==========================================
// INTERACTION LAYER
// ==========================================

export function InputPrimitive({ 
  value, 
  onChange, 
  placeholder, 
  onSubmit, 
  disabled 
}: { 
  value: string; 
  onChange: (v: string) => void; 
  placeholder?: string; 
  onSubmit?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="mt-4 flex flex-col gap-3 animate-fade-in-up">
      <input 
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all disabled:opacity-50"
        onKeyDown={e => {
          if (e.key === 'Enter' && onSubmit && !disabled) onSubmit();
        }}
      />
      {onSubmit && !disabled && (
        <button 
          onClick={onSubmit}
          className="w-full py-3 rounded-xl bg-accent-primary text-white font-bold transition-all hover:bg-accent-primary/90 active:scale-[0.98]"
        >
          Submit
        </button>
      )}
    </div>
  );
}

export function SelectionPrimitive({ 
  options, 
  selectedIds, 
  onSelect,
  disabled
}: {
  options: { id: string; label: string }[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="mt-4 flex flex-col gap-3 animate-fade-in-up">
      {options.map(opt => {
        const isSelected = selectedIds.includes(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => !disabled && onSelect(opt.id)}
            disabled={disabled}
            className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
              isSelected 
                ? 'bg-accent-primary/20 border-accent-primary text-accent-primary shadow-[0_0_15px_rgba(139,148,255,0.2)]'
                : 'bg-surface border-white/5 text-foreground hover:bg-white/5 hover:border-white/10 disabled:opacity-50'
            } border`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function SequencePrimitive({
  items,
  selectedIndex,
  onItemClick
}: {
  items: { id: string; label: string; icon?: React.ReactNode; state: 'upcoming' | 'active' | 'completed' }[];
  selectedIndex: number;
  onItemClick: (index: number) => void;
}) {
  return (
    <div className="mt-6 flex flex-col gap-0 relative animate-fade-in-up">
      <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/10" />
      {items.map((item, idx) => {
        const isActive = item.state === 'active';
        const isCompleted = item.state === 'completed';
        
        return (
          <button
            key={item.id}
            onClick={() => onItemClick(idx)}
            className={`relative flex items-center gap-4 py-4 px-2 transition-all ${isActive ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100'}`}
          >
            <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center relative z-10 transition-colors ${
              isActive ? 'bg-accent-primary ring-4 ring-accent-primary/20' :
              isCompleted ? 'bg-green-500' : 'bg-surface border-2 border-white/20'
            }`}>
              {isCompleted ? <CheckCircle2 className="w-3 h-3 text-background" /> : <div className="w-2 h-2 bg-background rounded-full" />}
            </div>
            <div className={`flex-1 text-left font-bold ${isActive ? 'text-accent-primary' : 'text-foreground'}`}>
              {item.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function CodeEditorPrimitive({
  template,
  values,
  onChange,
  onSubmit,
  disabled
}: {
  template: string;
  values: Record<string, string>; // e.g. { 'blank1': 'fetch' }
  onChange: (key: string, value: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
}) {
  const parts = template.split(/(\{\{[^}]+\}\})/g);

  return (
    <div className="mt-6 rounded-xl bg-[#0d1117] border border-white/10 p-4 font-mono text-[13px] shadow-inner overflow-x-auto whitespace-pre-wrap leading-relaxed animate-fade-in-up">
      {parts.map((part, i) => {
        if (part.startsWith('{{') && part.endsWith('}}')) {
          const key = part.slice(2, -2);
          const val = values[key] || '';
          const widthStr = Math.max(val.length, 5) + 'ch';

          return (
            <input
              key={i}
              type="text"
              value={val}
              disabled={disabled}
              onChange={(e) => onChange(key, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && onSubmit && !disabled) onSubmit();
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className="mx-1 px-1 py-0 bg-white/10 border border-white/20 rounded focus:outline-none focus:border-accent-primary focus:bg-accent-primary/20 text-accent-primary disabled:opacity-80 disabled:bg-accent-primary/10 disabled:border-transparent transition-all inline-block align-middle placeholder:text-white/20 text-center"
              style={{ width: widthStr }}
              placeholder="..."
            />
          );
        }
        
        // Escape HTML to prevent injection and rendering bugs
        let safePart = part.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        // Fix literal newlines from LLM
        safePart = safePart.replace(/\\n/g, '\n');

        // Very basic syntax highlighting for V1 that doesn't break HTML tags
        const highlighted = safePart
          .replace(/\b(const|let|var|await|async|function|return|if|else)\b/g, '<span class="text-pink-400">$1</span>')
          .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-blue-400">$1</span>');

        return <span key={i} dangerouslySetInnerHTML={{ __html: highlighted }} className="text-foreground/90" />;
      })}
    </div>
  );
}

// ==========================================
// ANALYTICS LAYER (Confidence)
// ==========================================

export function ConfidencePrimitive({
  onRate
}: {
  onRate: (level: 'guess' | 'somewhat' | 'sure') => void;
}) {
  return (
    <div className="mt-8 pt-6 border-t border-white/10 animate-fade-in-up">
      <div className="text-center text-xs font-bold uppercase tracking-widest text-foreground/50 mb-4">
        How confident were you?
      </div>
      <div className="flex gap-2 justify-center">
        <button onClick={() => onRate('guess')} className="px-4 py-2 rounded-xl bg-surface border border-white/10 text-xs font-bold hover:bg-white/5 active:scale-95 transition-all flex flex-col items-center gap-1">
          <span className="text-xl">😕</span> Guessing
        </button>
        <button onClick={() => onRate('somewhat')} className="px-4 py-2 rounded-xl bg-surface border border-white/10 text-xs font-bold hover:bg-white/5 active:scale-95 transition-all flex flex-col items-center gap-1">
          <span className="text-xl">🙂</span> Somewhat
        </button>
        <button onClick={() => onRate('sure')} className="px-4 py-2 rounded-xl bg-surface border border-white/10 text-xs font-bold hover:bg-white/5 active:scale-95 transition-all flex flex-col items-center gap-1">
          <span className="text-xl">😎</span> Very Sure
        </button>
      </div>
    </div>
  );
}
