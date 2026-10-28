"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "./MotionProvider";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

export default function InteractiveTerminal() {
  const { animationsEnabled } = useMotion();
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "NINEPMX Portfolio OS v1.6.2 (type 'help' for commands)", type: "system" },
    { text: "System diagnostic: SECURE | LOAD: NORMAL | STATUS: OPERATIONAL", type: "system" },
    { text: "Click presets or enter custom commands below.", type: "system" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const consoleRef = useRef<HTMLDivElement | null>(null);

  const skillsData = {
    frontend: "Next.js, React, Tailwind CSS, TypeScript",
    backend: "Go, Laravel, Node.js, Express, MySQL, RESTful APIs",
    devops: "Docker, Vercel, AWS S3, CI/CD, Git, GitHub Actions",
    tools: "VS Code, ESLint, Postman, Vite, Bun",
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { text: `$ ${cmd}`, type: "input" as const }];

    switch (trimmed) {
      case "help":
        newHistory.push(
          { text: "Available commands:", type: "system" },
          { text: "  skills      - Display all developer skill modules", type: "output" },
          { text: "  clear       - Clear the terminal console output", type: "output" },
          { text: "  about       - Load developer background bio data", type: "output" },
          { text: "  neofetch    - Show system specs and details", type: "output" },
          { text: "  npm run UI  - Run design matrix test", type: "output" }
        );
        break;
      case "skills":
        newHistory.push(
          { text: "Loading Skill Modules...", type: "system" },
          { text: `[FRONTEND]: ${skillsData.frontend}`, type: "output" },
          { text: `[BACKEND] : ${skillsData.backend}`, type: "output" },
          { text: `[DEVOPS]  : ${skillsData.devops}`, type: "output" },
          { text: `[TOOLS]   : ${skillsData.tools}`, type: "output" }
        );
        break;
      case "about":
        newHistory.push(
          { text: "Loading profile metadata...", type: "system" },
          { text: "Name       : Ahmad Fikri Akbar", type: "output" },
          { text: "Role       : ASN @ Ministry of Religious Affairs of Indonesia", type: "output" },
          { text: "Education  : Mathematics Education, Lambung Mangkurat University", type: "output" },
          { text: "Focus      : Software Engineering, Backend Architecture & Web Systems", type: "output" }
        );
        break;
      case "clear":
        setHistory([]);
        return;
      case "neofetch":
        newHistory.push(
          { text: "   /\_/\     OS: fkryakbar Cyber Portfolio OS 1.6.2", type: "output" },
          { text: "  ( o.o )    Kernel: React Server Engine v19", type: "output" },
          { text: "   > ^ <     Uptime: 2026-05-22 Server Active", type: "output" },
          { text: "  /     \    Shell: custom-bash-client", type: "output" },
          { text: " |       |   Theme: Glassmorphism / Synthwave", type: "output" },
          { text: "  \__/\_/    Specs: HTML5 Canvas, Tailwind v4, Geist-Mono", type: "output" }
        );
        break;
      case "npm run ui":
        newHistory.push(
          { text: "Initiating interface hardware diagnostic...", type: "system" },
          { text: "Testing backdrop filters: APPROVED (Optimized on Mobile)", type: "output" },
          { text: "Testing theme bindings: OPTIMIZED", type: "output" },
          { text: "Status: OPERATIONAL & STABLE", type: "system" }
        );
        break;
      default:
        // Try categoricals
        if (trimmed.includes("frontend") || trimmed.includes("npm run dev:frontend")) {
          newHistory.push({ text: `Frontend skills: ${skillsData.frontend}`, type: "output" });
        } else if (trimmed.includes("backend") || trimmed.includes("npm run dev:backend")) {
          newHistory.push({ text: `Backend skills: ${skillsData.backend}`, type: "output" });
        } else if (trimmed.includes("devops") || trimmed.includes("npm run dev:devops")) {
          newHistory.push({ text: `DevOps skills: ${skillsData.devops}`, type: "output" });
        } else if (trimmed.includes("tools") || trimmed.includes("npm run dev:tools")) {
          newHistory.push({ text: `Tools & systems: ${skillsData.tools}`, type: "output" });
        } else {
          newHistory.push({
            text: `Command not found: '${cmd}'. Type 'help' for options.`,
            type: "error",
          });
        }
    }

    setHistory(newHistory);
  };

  const handlePreset = (command: string) => {
    handleCommand(command);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal("");
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTo({
        top: consoleRef.current.scrollHeight,
        behavior: animationsEnabled ? "smooth" : "auto",
      });
    }
  }, [history, animationsEnabled]);

  return (
    <div className="glass-panel w-full overflow-hidden rounded-xl border border-card-border shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between bg-terminal-header px-4 py-3 border-b border-terminal-border">
        <div aria-hidden="true" className="flex shrink-0 items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-cyber-pink/80" />
          <div className="h-3 w-3 rounded-full bg-cyber-amber/80" />
          <div className="h-3 w-3 rounded-full bg-cyber-green/80" />
        </div>
        <span className="min-w-0 truncate px-3 font-mono text-xs font-semibold text-muted select-none">
          fkryakbar@portfolio-terminal:~
        </span>
      </div>

      {/* Preset Quick Buttons */}
      <div className="flex flex-wrap gap-2 bg-terminal-presets p-3 border-b border-terminal-border">
        <button
          onClick={() => handlePreset("npm run dev:frontend")}
          className="min-h-11 rounded border border-cyber-cyan/30 hover:border-cyber-cyan/70 bg-cyber-cyan/5 hover:bg-cyber-cyan/20 px-2 py-1 font-mono text-xs text-cyber-cyan transition duration-200"
        >
          $ run:frontend
        </button>
        <button
          onClick={() => handlePreset("npm run dev:backend")}
          className="min-h-11 rounded border border-cyber-orange/30 hover:border-cyber-orange/70 bg-cyber-orange/5 hover:bg-cyber-orange/20 px-2 py-1 font-mono text-xs text-cyber-orange transition duration-200"
        >
          $ run:backend
        </button>
        <button
          onClick={() => handlePreset("npm run dev:devops")}
          className="min-h-11 rounded border border-cyber-green/30 hover:border-cyber-green/70 bg-cyber-green/5 hover:bg-cyber-green/20 px-2 py-1 font-mono text-xs text-cyber-green transition duration-200"
        >
          $ run:devops
        </button>
        <button
          onClick={() => handlePreset("npm run dev:tools")}
          className="min-h-11 rounded border border-cyber-amber/30 hover:border-cyber-amber/70 bg-cyber-amber/5 hover:bg-cyber-amber/20 px-2 py-1 font-mono text-xs text-cyber-amber transition duration-200"
        >
          $ run:tools
        </button>
        <button
          onClick={() => handlePreset("neofetch")}
          className="min-h-11 rounded border border-foreground/30 hover:border-foreground/60 bg-foreground/5 hover:bg-foreground/10 px-2 py-1 font-mono text-xs text-foreground/80 transition duration-200"
        >
          $ neofetch
        </button>
      </div>

      {/* Terminal Screen Console */}
      <div
        ref={consoleRef}
        role="log"
        aria-label="Terminal output"
        aria-live="polite"
        aria-relevant="additions"
        className="h-[280px] overflow-y-auto bg-terminal-bg p-4 font-mono text-xs leading-relaxed text-terminal-text"
      >
        <div className="space-y-1.5">
          {history.map((line, idx) => {
            let colorClass = "text-foreground";
            if (line.type === "system") colorClass = "text-cyber-orange font-semibold";
            if (line.type === "input") colorClass = "text-cyber-cyan font-bold";
            if (line.type === "error") colorClass = "text-cyber-pink font-semibold";
            if (line.type === "output") colorClass = "text-cyber-green";

            return (
              <div key={idx} className={`${colorClass} whitespace-pre-wrap [overflow-wrap:anywhere]`}>
                {line.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Input Form */}
      <form onSubmit={handleSubmit} className="flex border-t border-terminal-border bg-terminal-input">
        <span className="flex items-center pl-4 font-mono text-xs font-bold text-cyber-cyan select-none">
          $
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter command (e.g. help, skills, about, neofetch, clear)..."
          className="min-h-11 min-w-0 flex-1 bg-transparent px-2.5 py-3 font-mono text-base text-terminal-text placeholder:text-muted sm:text-sm"
          aria-label="Terminal command prompt"
        />
        <button
          type="submit"
          className="bg-terminal-presets hover:bg-cyber-cyan/15 px-4 font-mono text-xs text-cyber-cyan border-l border-terminal-border transition duration-200"
        >
          Run
        </button>
      </form>
    </div>
  );
}
