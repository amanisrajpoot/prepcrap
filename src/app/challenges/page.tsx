"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CHALLENGES, Challenge } from "@/data/challenges";
import Link from "next/link";
import { Code2, ChevronRight, Trophy, Zap, Brain, ListFilter } from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["All", "Array", "String", "Linked List", "Tree", "Graph", "DP", "JavaScript"];

export default function ChallengesPage() {
  const [filter, setFilter] = useState("All");

  const filteredChallenges = filter === "All" 
    ? CHALLENGES 
    : CHALLENGES.filter(c => c.category === filter);

  // Group by category for "All" view
  const categories = Array.from(new Set(CHALLENGES.map(c => c.category)));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-20">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-primary/20 bg-accent-primary/5 mb-4">
            <Zap className="w-3.5 h-3.5 text-accent-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-primary/80">Problem Bank</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Master the <span className="text-accent-primary">Essential</span> Problems
          </h1>
          <p className="text-lg text-foreground/50 max-w-2xl leading-relaxed">
            We've flooded the bank with the most frequently asked DSA and JavaScript challenges for senior full-stack roles.
          </p>
        </div>

        {/* Categories / Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="p-6 rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-sm">
            <Code2 className="w-6 h-6 text-accent-primary mb-3" />
            <p className="text-2xl font-bold text-foreground">{CHALLENGES.length}</p>
            <p className="text-xs text-foreground/40 uppercase tracking-widest font-bold">Total Problems</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-sm">
            <Trophy className="w-6 h-6 text-accent-emerald mb-3" />
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-foreground/40 uppercase tracking-widest font-bold">Solved</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-sm">
            <Zap className="w-6 h-6 text-accent-secondary mb-3" />
            <p className="text-2xl font-bold text-foreground">{categories.length}</p>
            <p className="text-xs text-foreground/40 uppercase tracking-widest font-bold">Categories</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-sm">
            <Brain className="w-6 h-6 text-purple-400 mb-3" />
            <p className="text-2xl font-bold text-foreground">Senior</p>
            <p className="text-xs text-foreground/40 uppercase tracking-widest font-bold">Curated for</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                filter === cat 
                ? "bg-accent-primary border-accent-primary text-white shadow-glow-sm" 
                : "bg-surface/40 border-white/5 text-foreground/40 hover:text-foreground hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Problem List grouped by category if 'All' */}
        <div className="space-y-12">
          {CATEGORIES.filter(c => c !== "All" && (filter === "All" || filter === c)).map(cat => {
            const catChallenges = CHALLENGES.filter(c => c.category === cat);
            if (catChallenges.length === 0) return null;

            return (
              <div key={cat} className="space-y-4">
                <h2 className="text-lg font-bold text-foreground/60 flex items-center gap-3 mb-6 uppercase tracking-widest">
                  <span className="w-8 h-px bg-white/10" />
                  {cat}
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono">{catChallenges.length}</span>
                </h2>
                
                <div className="grid gap-3">
                  {catChallenges.map((challenge) => (
                    <Link 
                      key={challenge.id}
                      href={`/challenges/${challenge.id}`}
                      className="group flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-surface/20 hover:bg-surface/40 hover:border-accent-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-accent-primary/20 transition-all">
                          <span className="text-lg font-bold text-accent-primary/60 group-hover:text-accent-primary">#</span>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground group-hover:text-accent-primary transition-colors">
                            {challenge.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${
                              challenge.difficulty === "Easy" ? "text-accent-emerald" :
                              challenge.difficulty === "Medium" ? "text-accent-secondary" :
                              "text-red-500"
                            }`}>
                              {challenge.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-foreground/20 group-hover:text-foreground/40 transition-colors">
                          Solve Problem
                        </span>
                        <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center bg-black/20 text-foreground/30 group-hover:text-accent-primary group-hover:border-accent-primary/20 transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
