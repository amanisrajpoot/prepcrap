"use client";

import { useState } from "react";
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackConsole,
  useSandpack 
} from "@codesandbox/sandpack-react";
import { 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  Trophy, 
  Lightbulb, 
  FileText, 
  Code2,
  Terminal as TerminalIcon,
  Info,
  RotateCcw,
  Volume2,
  VolumeX,
  PlayCircle
} from "lucide-react";
import Link from "next/link";
import { Challenge } from "@/data/challenges";

interface LeetCodeWorkspaceProps {
  challenge: Challenge;
}

function WorkspacePanel({ challenge }: { challenge: Challenge }) {
  const { sandpack } = useSandpack();
  const [activeTab, setActiveTab] = useState<"description" | "solution" | "tips">("description");
  const [status, setStatus] = useState<"idle" | "testing" | "passed" | "failed">("idle");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleAudio = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(challenge.detailedExplanation);
      utterance.onend = () => setIsSpeaking(false);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const runVerification = () => {
    setStatus("testing");
    const code = sandpack.files["/index.js"]?.code || "";
    const regex = new RegExp(challenge.solutionRegex, "i");

    setTimeout(() => {
      if (regex.test(code)) {
        setStatus("passed");
      } else {
        setStatus("failed");
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-surface md:border-r border-white/5 overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-1 p-2 bg-black/20 border-b border-white/5">
        <button
          onClick={() => setActiveTab("description")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "description" ? "bg-accent-primary/20 text-accent-primary" : "text-foreground/40 hover:text-foreground/60"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Description
        </button>
        <button
          onClick={() => setActiveTab("solution")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "solution" ? "bg-accent-emerald/20 text-accent-emerald" : "text-foreground/40 hover:text-foreground/60"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          Solution
        </button>
        <button
          onClick={() => setActiveTab("tips")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "tips" ? "bg-accent-secondary/20 text-accent-secondary" : "text-foreground/40 hover:text-foreground/60"
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          Tricks & Tips
        </button>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "description" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-foreground">{challenge.title}</h1>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                challenge.difficulty === "Easy" ? "bg-accent-emerald/10 text-accent-emerald" :
                challenge.difficulty === "Medium" ? "bg-accent-secondary/10 text-accent-secondary" :
                "bg-red-500/10 text-red-500"
              }`}>
                {challenge.difficulty}
              </span>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                {challenge.description}
              </p>
            </div>
            
            <div className="mt-8 p-4 rounded-xl bg-accent-primary/5 border border-accent-primary/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent-primary mb-2 flex items-center gap-2">
                <Info className="w-3 h-3" />
                Note
              </h4>
              <p className="text-xs text-foreground/50">
                Write your solution in the editor and click "Verify Solution" to test against our internal checks.
              </p>
            </div>
          </div>
        )}

        {activeTab === "solution" && (
          <div className="animate-fade-in h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-accent-emerald">Reference Solution</h3>
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  isSpeaking ? "bg-accent-primary text-white shadow-glow-sm" : "bg-white/5 text-foreground/40 hover:text-foreground"
                }`}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                {isSpeaking ? "Stop Explanation" : "Audio Explanation"}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-accent-emerald/5 border border-accent-emerald/10 mb-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent-emerald mb-2 flex items-center gap-2">
                <PlayCircle className="w-3 h-3" />
                Step-by-Step Logic
              </h4>
              <p className="text-sm text-foreground/70 leading-relaxed italic">
                "{challenge.detailedExplanation}"
              </p>
            </div>

            <pre className="p-4 rounded-xl bg-black/40 border border-white/5 overflow-x-auto text-sm font-mono text-accent-emerald/80 leading-relaxed">
              {challenge.solution}
            </pre>
          </div>
        )}

        {activeTab === "tips" && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold text-accent-secondary mb-6">Tricks & Tips</h3>
            <div className="space-y-4">
              {challenge.tips.map((tip, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-secondary/20 flex items-center justify-center text-[10px] font-bold text-accent-secondary">
                    {i + 1}
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-4 bg-black/20 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg ${
            status === "passed" ? "bg-accent-emerald/20 text-accent-emerald" : 
            status === "failed" ? "bg-red-500/20 text-red-500" :
            "bg-accent-primary/10 text-accent-primary"
          }`}>
            {status === "passed" ? <Trophy className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-foreground/40">Status</p>
            <p className="text-xs font-bold">
              {status === "idle" && "Ready"}
              {status === "testing" && "Testing..."}
              {status === "passed" && "Correct!"}
              {status === "failed" && "Try again"}
            </p>
          </div>
        </div>

        <button
          onClick={runVerification}
          disabled={status === "testing"}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-white text-xs font-bold hover:shadow-glow-sm transition-all disabled:opacity-50"
        >
          {status === "passed" ? <RotateCcw className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
          {status === "passed" ? "Reset" : "Verify Solution"}
        </button>
      </div>
    </div>
  );
}

export default function LeetCodeWorkspace({ challenge }: LeetCodeWorkspaceProps) {
  return (
    <div className="flex flex-col min-h-screen md:h-screen w-full max-w-none bg-background overflow-y-auto md:overflow-hidden">
      {/* Header */}
      <header className="h-14 w-full border-b border-white/5 flex items-center justify-between px-6 bg-surface/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link 
            href="/challenges" 
            className="p-2 rounded-lg hover:bg-white/5 text-foreground/50 hover:text-foreground transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <h2 className="text-sm font-bold text-foreground/80">{challenge.title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-xs font-bold text-foreground/60 hover:text-foreground transition-all">
            <TerminalIcon className="w-3.5 h-3.5" />
            Console
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <SandpackProvider
          template="vanilla"
          theme="dark"
          files={{
            "/index.js": challenge.boilerplate
          }}
        >
          {/* Main Layout Grid */}
          <div className="flex-1 flex flex-col md:grid md:grid-rows-[1fr_280px] w-full h-full bg-[#0D0D0D] overflow-visible md:overflow-hidden">
            
            {/* Top Section: Problem & Editor */}
            <div className="flex flex-col md:grid md:grid-cols-[450px_1fr] overflow-visible md:overflow-hidden border-b border-white/5">
              
              {/* Panel 1: Description (Scrollable on desktop, auto-height on mobile) */}
              <div className="flex-shrink-0 md:h-full overflow-visible md:overflow-hidden flex flex-col bg-surface border-b md:border-b-0 md:border-r border-white/5">
                <WorkspacePanel challenge={challenge} />
              </div>

              {/* Panel 2: Code Editor */}
              <div className="min-h-[500px] md:h-full flex flex-col overflow-visible md:overflow-hidden bg-[#050505]">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-black/40">
                  <Code2 className="w-3.5 h-3.5 text-accent-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Editor</span>
                </div>
                <div className="flex-1 min-h-[400px] md:min-h-0 overflow-hidden">
                  <SandpackCodeEditor
                    showTabs
                    showLineNumbers={true}
                    showInlineErrors
                    wrapContent
                    className="!h-full !bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section: Console (Pins to bottom on desktop, auto-height on mobile) */}
            <div className="min-h-[250px] md:h-full bg-[#080808] flex flex-col overflow-visible md:overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-black/60">
                <TerminalIcon className="w-3 h-3 text-foreground/40" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Output</span>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <SandpackConsole className="!h-full !bg-transparent" />
              </div>
            </div>
          </div>
        </SandpackProvider>
      </div>
    </div>
  );
}
