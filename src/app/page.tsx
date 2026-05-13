import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentArea from "@/components/ContentArea";
import AccordionPillar from "@/components/AccordionPillar";
import { getAllPillars } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import InteractiveEditor from "@/components/InteractiveEditor";
import Quiz from "@/components/Quiz";
import VisualDiagram from "@/components/VisualDiagram";

export default function Home() {
  const pillars = getAllPillars();

  // Custom MDX components
  const components = {
    InteractiveEditor,
    Quiz,
    VisualDiagram,
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen relative">
      {/* Background glow effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(124,92,252,0.08)_0%,transparent_70%)]" />
        <div className="absolute top-[200px] right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full max-w-4xl mx-auto px-6 pt-16 pb-8 md:pt-24 md:pb-12 text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(139,148,255,0.15)] bg-[rgba(124,92,252,0.06)] mb-6 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            <span className="text-xs font-medium text-foreground/60">
              Open Source &middot; Free Forever
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-emerald bg-clip-text text-transparent animate-gradient">
              Crack Your Senior
            </span>
            <br />
            <span className="text-foreground">Frontend Interview</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            An interactive accordion framework with{" "}
            <span className="text-foreground/70 font-medium">
              dynamic study tracks
            </span>
            . Go from a 1-day cram sprint to a 7-day mastery deep dive.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent-primary">
                {pillars.length}
              </p>
              <p className="text-[11px] text-foreground/40 uppercase tracking-wider">
                Pillars
              </p>
            </div>
            <div className="w-px h-8 bg-foreground/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-accent-secondary">3</p>
              <p className="text-[11px] text-foreground/40 uppercase tracking-wider">
                Tracks
              </p>
            </div>
            <div className="w-px h-8 bg-foreground/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-accent-emerald">∞</p>
              <p className="text-[11px] text-foreground/40 uppercase tracking-wider">
                Practice
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-12" />

        {/* Content Area (Client Component) */}
        <section className="w-full max-w-4xl mx-auto px-6 pb-20">
          <ContentArea count={pillars.length} pillars={pillars.map(p => p.frontmatter)}>
            {pillars.map((p, index) => (
              <AccordionPillar 
                key={p.frontmatter.slug} 
                frontmatter={p.frontmatter}
                index={index}
              >
                <MDXRemote source={p.content} components={components} />
              </AccordionPillar>
            ))}
          </ContentArea>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
