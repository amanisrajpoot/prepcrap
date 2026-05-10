export default function Header() {
  return (
    <header className="w-full border-b border-[rgba(139,148,255,0.08)]">
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

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6" id="main-nav">
          <a
            href="#pillars-container"
            className="text-sm text-foreground/50 hover:text-foreground transition-colors"
          >
            Pillars
          </a>
          <a
            href="#track-selector"
            className="text-sm text-foreground/50 hover:text-foreground transition-colors"
          >
            Tracks
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
        </nav>

        {/* Mobile menu indicator */}
        <button
          className="md:hidden p-2 text-foreground/50 hover:text-foreground transition-colors"
          aria-label="Menu"
          id="mobile-menu-btn"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      </div>
    </header>
  );
}
