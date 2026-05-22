"use client";

import { useEffect, useState } from "react";

const words = ["Ship.", "Build.", "Optimize."];
export default function TypewriterTagline() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    

    const handleType = () => {
      const fullWord = words[wordIndex];

      if (!isDeleting) {
        // Typing phase
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(100); // Standard speed while typing

        if (currentText === fullWord) {
          // Pause when full word is finished
          setIsDeleting(false);
          setTypingSpeed(2000); // Long pause at the end
          setIsDeleting(true);
        }
      } else {
        // Backspacing phase
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(45); // Faster speed while deleting

        if (currentText === "") {
          setIsDeleting(false);
          // Advance to the next word
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(300); // Brief pause before typing next word
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingSpeed, wordIndex]);

  return (
    <h2 className="min-h-[4rem] text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-mono leading-none">
      I Don’t Just Write Code.
      <span className="mt-2 sm:inline"> I </span>
      <span className="typewriter-cursor inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyber-orange to-cyber-pink  drop-shadow-[0_0_15px_rgba(255,0,127,0.15)]">
        {currentText}
      </span>
    </h2>
  );
}
