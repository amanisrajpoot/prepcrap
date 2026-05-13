"use client";

import React from "react";
import { ArrowRight, Layers, Cpu, Database, Network } from "lucide-react";

interface Node {
  id: string;
  label: string;
  sublabel?: string;
  icon?: "layers" | "cpu" | "database" | "network";
  status?: "active" | "inactive" | "highlight";
}

interface Connection {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

interface BlueprintProps {
  nodes?: Node[];
  nodesJSON?: string;
  connections?: Connection[];
  title?: string;
  type?: "flow" | "stack" | "queue" | "grid";
}

export default function VisualDiagram({ nodes = [], nodesJSON, connections = [], title, type = "flow" }: BlueprintProps) {
  const parsedNodes = nodesJSON ? JSON.parse(nodesJSON) : nodes;

  const getIcon = (type?: string) => {
    switch (type) {
      case "layers": return <Layers className="w-4 h-4" />;
      case "cpu": return <Cpu className="w-4 h-4" />;
      case "database": return <Database className="w-4 h-4" />;
      case "network": return <Network className="w-4 h-4" />;
      default: return null;
    }
  };

  if (!parsedNodes || parsedNodes.length === 0) return null;

  return (
    <div className="my-8 p-6 rounded-2xl border border-[rgba(139,148,255,0.15)] bg-[rgba(10,11,20,0.4)] backdrop-blur-sm overflow-x-auto relative group">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(#7c5cfc 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      
      {title && (
        <div className="mb-6 flex items-center justify-between">
          <h5 className="text-xs font-bold uppercase tracking-widest text-accent-primary/60">
            {title}
          </h5>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent-secondary/20" />
          </div>
        </div>
      )}

      <div className={`relative z-10 flex ${type === "stack" || type === "queue" ? "flex-col-reverse" : "flex-nowrap md:flex-wrap justify-center"} gap-4 min-w-max md:min-w-0`}>
        {parsedNodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <div 
              className={`
                relative p-4 rounded-xl border transition-all duration-500
                ${node.status === "highlight" 
                  ? "border-accent-primary bg-accent-primary/10 shadow-[0_0_20px_rgba(124,92,252,0.15)] scale-105 z-20" 
                  : "border-[rgba(139,148,255,0.1)] bg-surface/80"}
              `}
            >
              <div className="flex items-center gap-3">
                {node.icon && (
                  <div className={`p-2 rounded-lg ${node.status === "highlight" ? "bg-accent-primary text-white" : "bg-white/5 text-foreground/40"}`}>
                    {getIcon(node.icon)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-foreground">{node.label}</p>
                  {node.sublabel && <p className="text-[10px] text-foreground/40 font-mono mt-0.5">{node.sublabel}</p>}
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-primary/20 rounded-tr-lg" />
            </div>

            {/* Simple auto-arrows for flow type */}
            {type === "flow" && i < parsedNodes.length - 1 && (
              <div className="flex items-center justify-center text-accent-primary/30 animate-pulse">
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
