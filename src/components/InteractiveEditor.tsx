"use client";

import { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { CheckCircle2, Play, Trophy, RotateCcw } from "lucide-react";
import { useProgressStore } from "@/store/progress";
import { usePillar } from "@/context/PillarContext";

interface InteractiveEditorProps {
  files?: Record<string, string>;
  filesJSON?: string;
  template?: "react" | "vanilla";
  showConsole?: boolean;
  challengeTitle?: string;
  solutionRegex?: string;
}

function ValidationPanel({ solutionRegex, onPass }: { solutionRegex?: string, onPass: () => void }) {
  const { sandpack } = useSandpack();
  const [status, setStatus] = useState<"idle" | "testing" | "passed" | "failed">("idle");

  const checkSolution = () => {
    if (!solutionRegex) return;
    setStatus("testing");
    
    // Get the main file content
    const code = sandpack.files["/index.js"]?.code || sandpack.files["/App.js"]?.code || "";
    const regex = new RegExp(solutionRegex, "i");
    
    setTimeout(() => {
      if (regex.test(code)) {
        setStatus("passed");
        onPass();
      } else {
        setStatus("failed");
      }
    }, 800);
  };

  if (!solutionRegex) return null;

  return (
    <div className="p-4 border-t border-[rgba(139,148,255,0.1)] bg-surface/30 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-lg ${status === "passed" ? "bg-accent-emerald/20 text-accent-emerald" : "bg-accent-primary/10 text-accent-primary"}`}>
          {status === "passed" ? <Trophy className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">Challenge Status</p>
          <p className="text-sm font-medium">
            {status === "idle" && "Ready to test?"}
            {status === "testing" && "Validating..."}
            {status === "passed" && "Challenge Mastered!"}
            {status === "failed" && "Not quite. Check your logic."}
          </p>
        </div>
      </div>
      
      <button
        onClick={checkSolution}
        disabled={status === "testing" || status === "passed"}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
          status === "passed" 
            ? "bg-accent-emerald/20 text-accent-emerald cursor-default" 
            : "bg-accent-primary text-white hover:shadow-glow-sm"
        }`}
      >
        {status === "passed" ? <CheckCircle2 className="w-3.5 h-3.5" /> : "Verify Solution"}
      </button>
    </div>
  );
}

export default function InteractiveEditor({
  files,
  filesJSON,
  template = "react",
  showConsole = true,
  challengeTitle,
  solutionRegex
}: InteractiveEditorProps) {
  const parsedFiles = filesJSON ? JSON.parse(filesJSON) : (files || {});
  const { slug } = usePillar();
  const { setQuizPassed, quizScores } = useProgressStore(); // Reusing quizPassed for "challenge passed"

  return (
    <div className="InteractiveEditor my-10 rounded-2xl overflow-hidden border border-[rgba(139,148,255,0.2)] bg-surface/20 shadow-2xl relative">
      {challengeTitle && (
        <div className="px-6 py-4 border-b border-[rgba(139,148,255,0.1)] bg-accent-primary/5">
          <h5 className="text-sm font-bold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            Challenge: {challengeTitle}
          </h5>
        </div>
      )}

      <SandpackProvider
        template={template}
        theme="dark"
        files={parsedFiles}
        customSetup={{
          dependencies: {
            "lucide-react": "^0.292.0",
          },
        }}
      >
        <SandpackLayout className="!rounded-none !border-none">
          <SandpackCodeEditor
            showTabs
            showLineNumbers={true}
            showInlineErrors
            wrapContent
            className="!h-[400px]"
          />
          <div className="flex flex-col flex-1 border-l border-[rgba(139,148,255,0.15)] h-[400px]">
            <SandpackPreview className="!h-[60%] border-b border-[rgba(139,148,255,0.15)]" />
            {showConsole && (
              <SandpackConsole className="!h-[40%] !bg-[#151515]" />
            )}
          </div>
        </SandpackLayout>
        
        <ValidationPanel 
          solutionRegex={solutionRegex} 
          onPass={() => slug && setQuizPassed(slug, true)} 
        />
      </SandpackProvider>
    </div>
  );
}
