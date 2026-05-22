"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-32 rounded border border-card-border bg-card opacity-50 animate-pulse" />
    );
  }

  const currentTheme = theme || "dark";

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-md border border-card-border bg-card px-4 py-2 text-xs font-mono tracking-wider transition-all duration-300 hover:border-cyber-cyan hover:shadow-[0_0_10px_rgba(0,240,255,0.25)] active:scale-95"
      aria-label="Toggle system theme"
    >
      {/* Laser scan animation overlay on hover */}
      <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent transition-transform duration-1000 group-hover:translate-y-full" />

      {/* Switch indicator LED */}
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${currentTheme === "dark" ? "bg-cyber-cyan" : "bg-cyber-pink"
          }`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${currentTheme === "dark" ? "bg-cyber-cyan" : "bg-cyber-pink"
          }`} />
      </span>

      <span className="select-none font-bold uppercase text-foreground">
        SYS_MODE: <span className={currentTheme === "dark" ? "text-cyber-cyan" : "text-cyber-pink"}>{currentTheme}</span>
      </span>

      {/* Retro Mini Icon */}
      <svg
        className={`h-3.5 w-3.5 transition-transform duration-500 ${currentTheme === "dark" ? "rotate-0 text-cyber-cyan" : "rotate-180 text-cyber-pink"
          }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        {currentTheme === "dark" ? (
          // Moon Icon
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        ) : (
          // Sun Icon
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"
          />
        )}
      </svg>
    </button>
  );
}
