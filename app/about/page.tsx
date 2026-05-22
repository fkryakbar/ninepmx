import type { Metadata } from "next";
import Link from "next/link";
import AnimatedBackground from "../components/AnimatedBackground";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: "About | Ahmad Fikri Akbar - Civil Servant & Software Engineer",
  description:
    "Professional background of Ahmad Fikri Akbar, civil servant (ASN) at the Ministry of Religious Affairs of Indonesia, specializing in software engineering and performant web systems.",
};

export default function AboutPage() {
  return (
    <>
      {/* Immersive retro synthwave canvas background grid */}
      <AnimatedBackground />

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-card-border bg-background/60 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-cyber-orange animate-pulse rounded-full" />
            <Link
              href="/"
              className="font-mono text-base font-bold tracking-wider text-foreground hover:text-cyber-orange transition duration-200"
            >
              //FKRYAKBAR
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-semibold tracking-widest text-foreground/80">
            <Link href="/" className="hover:text-cyber-cyan transition">//HOME</Link>
            <Link href="/about" className="text-cyber-orange font-bold tracking-wider">//ABOUT</Link>
            <Link href="/#projects" className="hover:text-cyber-pink transition">//PROJECTS</Link>
            <Link href="/#skills" className="hover:text-cyber-green transition">//SKILLS</Link>
            <Link href="/#contact" className="hover:text-cyber-amber transition">//CONTACT</Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto flex max-w-7xl flex-col px-6 py-12 md:py-20 lg:py-24 space-y-16">

        {/* Main Section Grid */}
        <section className="grid gap-8 lg:grid-cols-12 items-start">

          {/* Left Column: Key Stats / Retro Inspection Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-xl border border-card-border overflow-hidden glow-orange relative">
              {/* Scanlines / CRT Top Bar */}
              <div className="bg-black/40 px-4 py-3 border-b border-card-border flex items-center justify-between font-mono text-[10px]">
                <span className="font-bold text-cyber-orange">INSPECT_NODE: BIO_METADATA</span>
                <span className="text-foreground/40">ONLINE</span>
              </div>

              {/* Profile Telemetry Elements */}
              <div className="p-6 space-y-6 font-mono text-xs">
                <div className="flex flex-col gap-2 pb-4 border-b border-card-border/50">
                  <span className="text-[10px] text-foreground/40 tracking-wider">FULL_NAME</span>
                  <span className="text-base font-bold text-foreground">Ahmad Fikri Akbar</span>
                </div>

                <div className="flex flex-col gap-2 pb-4 border-b border-card-border/50">
                  <span className="text-[10px] text-foreground/40 tracking-wider">PUBLIC_SECTOR_ROLE</span>
                  <span className="text-foreground font-semibold leading-relaxed">
                    Civil Servant (ASN)
                  </span>
                  <span className="text-[10px] text-cyber-orange">
                    Ministry of Religious Affairs of the Republic of Indonesia
                  </span>
                  <span className="text-[9px] text-foreground/60 leading-tight">
                    Directorate of Islamic Education
                  </span>
                </div>

                <div className="flex flex-col gap-2 pb-4 border-b border-card-border/50">
                  <span className="text-[10px] text-foreground/40 tracking-wider">EDUCATION</span>
                  <span className="text-foreground font-semibold">
                    Bachelor of Mathematics Education
                  </span>
                  <span className="text-[10px] text-foreground/60">
                    Lambung Mangkurat University
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-foreground/40 tracking-wider">ENGINEERING_STATS</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] mt-1">
                    <div className="bg-black/30 border border-card-border/60 rounded p-2 text-center">
                      <div className="text-cyber-cyan font-bold">EST. 2021</div>
                      <div className="text-[8px] text-foreground/40">JOURNEY_START</div>
                    </div>
                    <div className="bg-black/30 border border-card-border/60 rounded p-2 text-center">
                      <div className="text-cyber-green font-bold">8+ TECHS</div>
                      <div className="text-[8px] text-foreground/40">ACTIVE_STACK</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Card: System Diagnostics */}
            <div className="glass-panel rounded-xl border border-card-border p-5 space-y-3 font-mono text-[10px] text-foreground/50">
              <div className="flex justify-between">
                <span>SYSTEM_STABILITY:</span>
                <span className="text-cyber-green font-bold">EXCELLENT</span>
              </div>
              <div className="flex justify-between">
                <span>COMPILER_TARGET:</span>
                <span className="text-cyber-orange">NEXT_JS_V16</span>
              </div>
              <div className="flex justify-between">
                <span>RENDER_MODE:</span>
                <span className="text-cyber-cyan">HYBRID_SSR</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative Biography */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-cyber-orange tracking-widest uppercase">
                // 02. PROFILE_NARRATIVE
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans">
                About Ahmad Fikri Akbar
              </h2>
              <div className="h-[2px] w-24 bg-gradient-to-r from-cyber-orange to-transparent" />
            </div>

            {/* Biography Blocks */}
            <div className="space-y-6 text-base leading-relaxed text-foreground/80 font-sans">
              <p>
                Hi! My name is <strong>Ahmad Fikri Akbar</strong>. I hold a degree in Mathematics Education from Lambung Mangkurat University and currently serve as a civil servant (ASN) at the Ministry of Religious Affairs of the Republic of Indonesia, under the Directorate of Islamic Education.
              </p>

              <p>
                Beyond my role in government service, I am deeply passionate about software engineering and web development. Since starting my programming journey in 2021, I have consistently dedicated myself to learning, building, and improving through hands-on experience and continuous self-study.
              </p>

              <p className="border-l-2 border-cyber-orange bg-cyber-orange/5 p-4 rounded-r-lg font-mono text-sm leading-relaxed text-foreground italic">
                &ldquo;I enjoy building systems that are not only functional, but also reliable, scalable, and genuinely useful for the people who use them.&rdquo;
              </p>

              <p>
                Over the years, I have developed multiple applications ranging from academic information systems and automation platforms to real-time dashboards and backend services. I enjoy working on challenging problems, exploring modern technologies, and refining systems to perform better with every iteration. For me, programming is not just about writing code, it is about building solutions that people can genuinely rely on.
              </p>

              <p>
                Through this website, I share my projects, experiments, and insights related to programming, backend engineering, system architecture, and web development. Every project here represents part of my journey as a developer who is still learning, still building, and continuously striving to create better software.
              </p>

              <p>
                If you are interested in collaboration, technology, or simply exchanging ideas, feel free to reach out. I am always open to meaningful discussions and new opportunities.
              </p>
            </div>

            {/* Quick Action CTA */}
            <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs font-bold tracking-widest">
              <Link
                href="/#contact"
                className="flex h-12 items-center justify-center rounded-md bg-foreground px-6 text-background transition-transform duration-200 hover:-translate-y-1 active:translate-y-0"
              >
                [GET_IN_TOUCH]
              </Link>
              <Link
                href="/"
                className="flex h-12 items-center justify-center rounded-md border border-card-border bg-card px-6 text-foreground hover:border-cyber-orange transition-all duration-300"
              >
                [BACK_TO_HOME]
              </Link>
            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-card-border bg-card/20 py-8 text-center font-mono text-[10px] text-foreground/60">
        <div className="mx-auto max-w-7xl px-6 space-y-2">
          <div>
            &copy; 2026 Ahmad Fikri Akbar // ALL RIGHTS SHIPPED, COMPREHENDED & DEPLOYED.
          </div>
          <div className="text-cyber-orange/80 font-bold">
            SYSTEM_UPTIME: 100% | ENVIRONMENT: CANARY_REACT_19
          </div>
        </div>
      </footer>
    </>
  );
}
