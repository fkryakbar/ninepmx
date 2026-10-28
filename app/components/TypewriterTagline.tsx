"use client";

import { useEffect, useState } from "react";
import { useMotion } from "./MotionProvider";

const words = ["Ship.", "Build.", "Optimize."];

function AnimatedWord() {
  const [currentText, setCurrentText] = useState(words[0]);

  useEffect(() => {
    let wordIndex = 0;
    let text = words[0];
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[wordIndex];
      text = deleting ? text.slice(0, -1) : word.slice(0, text.length + 1);
      setCurrentText(text);
      let delay = deleting ? 45 : 100;
      if (deleting && !text) {
        wordIndex = (wordIndex + 1) % words.length;
        deleting = false;
        delay = 300;
      } else if (!deleting && text === word) {
        deleting = true;
        delay = 2000;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 2000);
    return () => clearTimeout(timer);
  }, []);

  return currentText;
}

export default function TypewriterTagline() {
  const { animationsEnabled } = useMotion();

  return (
    <h1 className="font-mono text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
      <span className="sr-only">I don’t just write code. I ship, build, and optimize.</span>
      <span aria-hidden="true">
        I Don’t Just Write Code.<br />I{" "}
        <span className="inline-grid align-bottom">
          <span className="invisible col-start-1 row-start-1">Optimize.</span>
          <span className="typewriter-cursor col-start-1 row-start-1 bg-gradient-to-r from-cyber-orange to-cyber-pink bg-clip-text text-transparent">
            {animationsEnabled ? <AnimatedWord /> : words[0]}
          </span>
        </span>
      </span>
    </h1>
  );
}
