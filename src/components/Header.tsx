"use client";

import { useState } from "react";
import { Menu, X, Code } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-[rgba(139,148,255,0.08)] bg-background/50 backdrop-blur-md sticky top-0 z-[50]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3" id="brand-logo">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-sm shadow-lg">
            P
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground tracking-tight leading-none">
              PrepCrap
            </h1>
            <p className="text-[10px] text-foreground/40 font-medium tracking-wider uppercase">
              Senior Frontend Prep
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" id="main-nav">
          <a href="#pillars-container" className="text-sm text-foreground/50 hover:text-foreground transition-colors">Pillars</a>
          <a href="#track-selector" className="text-sm text-foreground/50 hover:text-foreground transition-colors">Tracks</a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors"
          >
            <Code className="w-4 h-4" />
            GitHub
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground/50 hover:text-foreground transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-white/5 animate-fade-in py-6 px-6 space-y-6 shadow-2xl">
          <a 
            href="#pillars-container" 
            onClick={() => setIsOpen(false)}
            className="block text-lg font-bold text-foreground"
          >
            Study Pillars
          </a>
          <a 
            href="#track-selector" 
            onClick={() => setIsOpen(false)}
            className="block text-lg font-bold text-foreground"
          >
            Revision Tracks
          </a>
          <div className="pt-6 border-t border-white/5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground/70"
            >
              <Code className="w-5 h-5" />
              <span className="font-medium">Star on GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
