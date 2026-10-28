"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";

const MotionContext = createContext<{
  animationsEnabled: boolean;
  reducedMotion: boolean;
  toggleAnimations: () => void;
} | null>(null);

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const animationsEnabled = !paused && !reducedMotion;

  useEffect(() => {
    document.documentElement.dataset.motion = animationsEnabled ? "on" : "off";
  }, [animationsEnabled]);

  return (
    <MotionContext.Provider value={{ animationsEnabled, reducedMotion, toggleAnimations: () => setPaused(value => !value) }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) throw new Error("useMotion must be used within MotionProvider");
  return context;
}

export function MotionToggle() {
  const { animationsEnabled, reducedMotion, toggleAnimations } = useMotion();
  return (
    <button
      type="button"
      onClick={toggleAnimations}
      disabled={reducedMotion}
      aria-pressed={!animationsEnabled}
      title={reducedMotion ? "Animations are paused by your system preference" : undefined}
      className="flex min-h-11 items-center justify-center rounded-md border border-card-border bg-card px-3 font-mono text-xs text-foreground disabled:cursor-default"
    >
      {reducedMotion ? "Motion reduced" : animationsEnabled ? "Pause animations" : "Resume animations"}
    </button>
  );
}
