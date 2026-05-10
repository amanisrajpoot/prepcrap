export default function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(139,148,255,0.08)] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-[10px]">
              P
            </div>
            <span className="text-sm text-foreground/40">
              PrepCrap — Open Source Interview Prep
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
            >
              Contribute on GitHub
            </a>
            <span className="text-xs text-foreground/20">
              Built with Next.js + MDX
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
