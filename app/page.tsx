import type { Metadata } from "next";
import Link from "next/link";
import AnimatedBackground from "./components/AnimatedBackground";
import ContactForm from "./components/ContactForm";
import InteractiveTerminal from "./components/InteractiveTerminal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TypewriterTagline from "./components/TypewriterTagline";
import { getLatestProjects } from "@/repositories/project";

export const metadata: Metadata = {
  title: "fkryakbar | A Developer Obsessed With Performance.",
  description:
    "I build scalable applications, backend systems, and automation tools while continuously exploring better ways to create reliable and efficient software.",
};



export default async function Home() {
  // Fetch latest projects from database
  const dbProjects = await getLatestProjects(3);
  return (
    <>
      {/* High performance moving grid canvas backdrop */}
      <AnimatedBackground />

      {/* Main Header / Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="mx-auto flex max-w-7xl flex-col px-6 py-12 md:py-20 lg:py-24 space-y-24 md:space-y-36">

        {/* Section 1: Hero */}
        <section id="hero" className="flex flex-col gap-8 md:gap-12 pt-8">
          <div className="flex max-w-4xl flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded border border-cyber-cyan/20 bg-cyber-cyan/5 px-3 py-1 font-mono text-xs font-bold text-cyber-cyan tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan" />
              </span>
              system_status: operational
            </div>

            {/* Core Typewriter Tagline */}
            <TypewriterTagline />

            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-foreground/75 font-sans">
              I enjoy building scalable applications, experimenting with new technologies, and creating open-source projects that solve real problems and help other developers learn and build faster.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs font-bold tracking-widest">
            <a
              href="#projects"
              className="flex h-12 items-center justify-center rounded-md bg-foreground px-6 text-background transition-transform duration-200 hover:-translate-y-1 active:translate-y-0"
            >
              [LAUNCH_SHOWCASE]
            </a>
            <a
              href="#contact"
              className="flex h-12 items-center justify-center rounded-md border border-card-border bg-card px-6 text-foreground hover:border-cyber-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all duration-300"
            >
              [ESTABLISH_CONN]
            </a>
          </div>
        </section>

        {/* Bento Stats Banner */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4 font-mono">
          {[
            { label: "SHIPPED_APPLICATIONS", val: "45+", desc: "Node & React setups" },
            { label: "SYSTEMS_PERFORMANCE", val: "100%", desc: "Mobile Optimized" },
            { label: "LINES_OF_TYPED_CODE", val: "150K", desc: "Pure TypeScript" },
            { label: "RUNTIME_UPTIME_RATE", val: "99.9%", desc: "Continuous Deploys" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel flex flex-col gap-2 rounded-lg p-5 border border-card-border"
            >
              <span className="text-[10px] tracking-wider text-foreground/50">{stat.label}</span>
              <span className="text-3xl font-extrabold text-cyber-cyan">{stat.val}</span>
              <span className="text-[10px] text-foreground/60 leading-tight">{stat.desc}</span>
            </div>
          ))}
        </section>

        {/* Section 2: Projects Showcase (Server-Side Rendered for SEO) */}
        <section id="projects" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-card-border pb-6">
            <div>
              <span className="font-mono text-xs font-bold text-cyber-pink tracking-widest uppercase">{"// 01. SOURCE_CODE_METADATA"}</span>
              <h3 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
                Featured System Operations
              </h3>
            </div>
            <Link
              href="/projects"
              className="font-mono text-xs text-foreground/50 hover:text-cyber-cyan transition"
            >
              VIEW_ALL →
            </Link>
          </div>

          {dbProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {dbProjects.map((proj, idx) => {
                const glowClasses = ["glow-cyan", "glow-pink", "glow-green"];
                return (
                  <Link
                    key={proj.id}
                    href={`/projects/${proj.slug}`}
                    className={`glass-panel group relative flex flex-col justify-between overflow-hidden rounded-xl ${glowClasses[idx % 3]}`}
                  >
                    {proj.thumbnail && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={proj.thumbnail}
                        alt={proj.projectName}
                        className="h-44 w-full object-cover border-b border-card-border/60"
                      />
                    )}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-bold tracking-wider ${proj.type === "open_source"
                            ? "bg-cyber-green/10 text-cyber-green border border-cyber-green/20"
                            : "bg-cyber-pink/10 text-cyber-pink border border-cyber-pink/20"
                            }`}
                        >
                          {proj.type === "open_source" ? "OPEN_SRC" : "CLOSED_SRC"}
                        </span>
                        <span className="text-foreground/40">
                          {new Date(proj.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold group-hover:text-cyber-cyan transition duration-300">
                        {proj.projectName}
                      </h4>
                      <div className="pt-2 border-t border-card-border/60">
                        <span className="font-mono text-[10px] text-foreground/40 group-hover:text-cyber-cyan/60 transition">
                          VIEW_PROJECT →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-card-border rounded-xl bg-card/20">
              <p className="font-mono text-sm text-foreground/40">{"// SYSTEM_OFFLINE: No projects currently found in database."}</p>
            </div>
          )}
        </section>

        {/* Section 3: Interactive Skills Terminal */}
        <section id="skills" className="grid gap-12 lg:grid-cols-5 items-center">
          <div className="lg:col-span-2 space-y-6">
            <span className="font-mono text-xs font-bold text-cyber-green tracking-widest uppercase">{"// MY CORE TECHNOLOGY STACK"}</span>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans">
              My Core Technology Stack
            </h3>
            <p className="text-sm leading-relaxed text-foreground/75 font-sans">
              I enjoy learning and working with a variety of modern, robust technologies. My stack centers around Next.js, React, Go, TypeScript, Tailwind, Laravel, Node.js, and Docker tools that help me build stable, performant applications while continually growing as an engineer.
            </p>
            <div className="rounded-lg border border-card-border bg-card/40 p-4 font-mono text-[10px] text-foreground/60 space-y-1">
              <div>$ systeminfo | grep active_stack</div>
              <div>- FRONTEND : Next.js, React, TypeScript, Tailwind</div>
              <div>- BACKEND  : Go, Laravel, Node.js</div>
              <div>- DEPLOY   : Docker (SECURED)</div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <InteractiveTerminal />
          </div>
        </section>

        {/* Section 4: Partner In Crime */}
        <section id="partners" className="space-y-12">
          <div className="border-b border-card-border pb-6">
            <span className="font-mono text-xs font-bold text-cyber-amber tracking-widest uppercase">{"// 02. ALLIED_NEURAL_NETWORKS"}</span>
            <h3 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
              Partner In Crime
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/75 font-sans">
              Yes, I build with AI agents, the most elite fleet of digital co-pilots on the planet.
              But don&apos;t get it twisted: every single line they generate passes through <span className="text-cyber-cyan font-semibold">my{" "}</span>review.
              I read it, I understand it, I refactor it if it&apos;s ugly. These agents accelerate my workflow;
              they don&apos;t replace my brain. A professional developer who blindly ships AI-generated code
              isn&apos;t a developer, they&apos;re a copy-paste operator. I am <span className="text-cyber-pink font-semibold">not</span> that.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {[
              {
                name: "Claude",
                logo: "/ai/claude.webp",
                models: ["claude-opus-4-6", "claude-sonnet-4-6"],
                glow: "glow-cyan",
                accent: "text-cyber-cyan",
                border: "border-cyber-cyan/20",
              },
              {
                name: "ChatGPT",
                logo: "/ai/openai.webp",
                models: ["gpt-5.3-codex"],
                glow: "glow-green",
                accent: "text-cyber-green",
                border: "border-cyber-green/20",
                contrast: true,
              },
              {
                name: "Gemini",
                logo: "/ai/gemini.webp",
                models: ["gemini-3.1-pro", "gemini-3.1-flash"],
                glow: "glow-cyan",
                accent: "text-cyber-cyan",
                border: "border-cyber-cyan/20",
              },
              {
                name: "DeepSeek",
                logo: "/ai/deepseek.webp",
                models: ["deepseek-v4-pro", "deepseek-v4-flash"],
                glow: "glow-pink",
                accent: "text-cyber-pink",
                border: "border-cyber-pink/20",
              },
              {
                name: "MiniMax",
                logo: "/ai/minimax.webp",
                models: ["MiniMax-M2.7-highspeed"],
                glow: "glow-orange",
                accent: "text-cyber-orange",
                border: "border-cyber-orange/20",
              },
              {
                name: "GLM",
                logo: "/ai/zai.webp",
                models: ["glm-5-turbo", "glm-5.1"],
                glow: "glow-green",
                accent: "text-cyber-green",
                border: "border-cyber-green/20",
                contrast: true,
              },
              {
                name: "Kimi",
                logo: "/ai/kimi.webp",
                models: ["kimi-k2.6"],
                glow: "glow-pink",
                accent: "text-cyber-pink",
                border: "border-cyber-pink/20",
              },
            ].map((agent) => (
              <div
                key={agent.name}
                className={`glass-panel group relative flex w-full sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] flex-col items-center gap-4 rounded-xl p-6 ${agent.glow}`}
              >
                {/* Logo with light background for dark logos */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl p-2 border border-card-border transition-transform duration-300 group-hover:scale-110 ai-logo-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={agent.logo}
                    alt={agent.name}
                    className={`h-full w-full object-contain ${agent.contrast ? "ai-logo-contrast" : ""}`}
                  />
                </div>

                {/* Agent name */}
                <h4 className={`font-mono text-sm font-bold tracking-wider ${agent.accent} transition-colors`}>
                  {agent.name.toUpperCase()}
                </h4>

                {/* Model tags */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {agent.models.map((model) => (
                    <span
                      key={model}
                      className={`rounded-full border ${agent.border} bg-card/60 px-2 py-0.5 font-mono text-[9px] tracking-wider text-foreground/50`}
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Contact / Establishment */}
        <section id="contact" className="mx-auto w-full max-w-2xl space-y-6">
          <div className="text-center">
            <span className="font-mono text-xs font-bold text-cyber-orange tracking-widest uppercase">{"// 03. UPLINK_TUNNEL"}</span>
          </div>

          <ContactForm />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
