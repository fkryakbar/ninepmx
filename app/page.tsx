import type { Metadata } from "next";
import Link from "next/link";
import AnimatedBackground from "./components/AnimatedBackground";
import Image from "next/image";
import { Suspense } from "react";
import FeaturedProjects from "./components/FeaturedProjects";
import ProjectGridSkeleton from "./components/ProjectGridSkeleton";
import InteractiveTerminal from "./components/InteractiveTerminal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TypewriterTagline from "./components/TypewriterTagline";

export const metadata: Metadata = {
  title: "fkryakbar | A Developer Obsessed With Performance.",
  description:
    "I build scalable applications, backend systems, and automation tools while continuously exploring better ways to create reliable and efficient software.",
};

export default function Home() {
  return (
    <>
      {/* High performance moving grid canvas backdrop */}
      <AnimatedBackground />

      {/* Main Header / Navigation */}
      <Navbar />

      {/* Main Container */}
      <main id="main-content" tabIndex={-1} className="mx-auto flex w-full min-w-0 max-w-7xl flex-col px-6 py-12 md:py-20 lg:py-24 space-y-24 md:space-y-36">

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
          <div className="flex flex-col sm:flex-row gap-4 font-mono text-sm font-bold tracking-widest">
            <a
              href="#projects"
              className="flex h-12 items-center justify-center rounded-md bg-foreground px-6 text-background transition-transform duration-200 hover:-translate-y-1 active:translate-y-0"
            >
              View projects
            </a>
            <Link
              href="/about"
              className="flex h-12 items-center justify-center rounded-md border border-card-border bg-card px-6 text-foreground hover:border-cyber-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all duration-300"
            >
              About me
            </Link>
          </div>
        </section>

        {/* Bento Stats Banner */}
        <section aria-label="Profile highlights" className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-4 font-mono">
          {[
            { label: "Applications shipped", val: "45+", desc: "Node & React setups" },
            { label: "Mobile optimized", val: "100%", desc: "Mobile Optimized" },
            { label: "Lines of typed code", val: "150K", desc: "Pure TypeScript" },
            { label: "Runtime uptime", val: "99.9%", desc: "Continuous Deploys" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel flex flex-col gap-2 rounded-lg p-5 border border-card-border"
            >
              <span className="text-xs tracking-wider text-muted">{stat.label}</span>
              <span className="text-3xl font-extrabold text-cyber-cyan">{stat.val}</span>
              <span className="text-xs text-muted leading-tight">{stat.desc}</span>
            </div>
          ))}
        </section>

        <section id="projects" aria-labelledby="projects-heading" className="space-y-8">
          <div className="border-b border-card-border pb-6">
            <span className="font-mono text-xs font-bold text-cyber-pink tracking-widest uppercase">{"// 01. SOURCE_CODE_METADATA"}</span>
            <h2 id="projects-heading" className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">Featured projects</h2>
          </div>
          <Suspense fallback={<ProjectGridSkeleton />}>
            <FeaturedProjects />
          </Suspense>
          <div className="flex justify-center pt-2">
            <Link href="/projects" className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-cyber-cyan/40 bg-card px-6 font-mono text-sm font-semibold text-cyber-cyan transition hover:border-cyber-cyan sm:w-auto">
              View all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Section 3: Interactive Skills Terminal */}
        <section id="skills" className="grid gap-12 lg:grid-cols-5 items-center">
          <div className="lg:col-span-2 space-y-6">
            <span className="font-mono text-xs font-bold text-cyber-green tracking-widest uppercase">{"// MY CORE TECHNOLOGY STACK"}</span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans">
              My Core Technology Stack
            </h2>
            <p className="text-base leading-relaxed text-foreground/80 font-sans">
              I enjoy learning and working with a variety of modern, robust technologies. My stack centers around Next.js, React, Go, TypeScript, Tailwind, Laravel, Node.js, and Docker tools that help me build stable, performant applications while continually growing as an engineer.
            </p>
            <div className="rounded-lg border border-card-border bg-card/40 p-4 font-mono text-xs text-muted space-y-1">
              <div>$ systeminfo | grep active_stack</div>
              <div>- FRONTEND : Next.js, React, TypeScript, Tailwind</div>
              <div>- BACKEND  : Go, Laravel, Node.js</div>
              <div>- DEPLOY   : Docker (SECURED)</div>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <InteractiveTerminal />
          </div>
        </section>

        {/* Section 4: Partner In Crime */}
        <section id="partners" className="space-y-12">
          <div className="border-b border-card-border pb-6">
            <span className="font-mono text-xs font-bold text-cyber-amber tracking-widest uppercase">{"// 02. ALLIED_NEURAL_NETWORKS"}</span>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
              Partner In Crime
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80 font-sans">
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
                className={`glass-panel group relative flex min-w-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex-col items-center gap-4 rounded-xl p-6 ${agent.glow}`}
              >
                {/* Logo with light background for dark logos */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl p-2 border border-card-border transition-transform duration-300 group-hover:scale-110 ai-logo-container">
                  <Image
                    width={48}
                    height={48}
                    src={agent.logo}
                    alt={agent.name}
                    className={`h-full w-full object-contain ${agent.contrast ? "ai-logo-contrast" : ""}`}
                  />
                </div>

                {/* Agent name */}
                <h3 className={`font-mono text-sm font-bold tracking-wider ${agent.accent} transition-colors`}>
                  {agent.name.toUpperCase()}
                </h3>

                {/* Model tags */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {agent.models.map((model) => (
                    <span
                      key={model}
                      className={`max-w-full rounded-full border ${agent.border} bg-card/60 px-2 py-0.5 font-mono text-xs leading-relaxed break-all text-center text-muted`}
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
