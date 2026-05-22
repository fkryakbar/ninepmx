"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isMobile = false;

    // Grid properties
    let gridOffset = 0;
    const speed = 0.015; // Speed of movement

    // Particle/Code rain elements
    interface Particle {
      x: number;
      y: number;
      speed: number;
      char: string;
      size: number;
      color: string;
    }
    let particles: Particle[] = [];
    const chars = ["0", "1", "<", ">", "/", "{", "}", "[", "]", "+", "-", "*", "$"];

    const resize = () => {
      if (!canvas) return;
      isMobile = window.innerWidth < 768;
      
      // Handle high DPI screens for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      
      // Initialize particles based on screen size
      const count = isMobile ? 15 : 45;
      particles = Array.from({ length: count }, () => createParticle());
    };

    const createParticle = (): Particle => {
      const isLight = document.documentElement.classList.contains("light");
      return {
        x: Math.random() * width,
        y: Math.random() * height - height,
        speed: Math.random() * 1.5 + 0.5,
        char: chars[Math.floor(Math.random() * chars.length)],
        size: Math.floor(Math.random() * 8) + 10,
        color: isLight 
          ? `rgba(0, 119, 136, ${Math.random() * 0.15 + 0.05})` // Saturated teal for light mode
          : `rgba(0, 240, 255, ${Math.random() * 0.25 + 0.08})` // Glowing neon cyan for dark mode
      };
    };

    const drawGrid = (isLight: boolean) => {
      ctx.strokeStyle = isLight 
        ? "rgba(0, 119, 136, 0.04)" 
        : "rgba(0, 240, 255, 0.05)";
      ctx.lineWidth = 1;

      const horizon = height * 0.55; // Vanishing point horizon height
      const vanishingPointX = width * 0.5;

      // Draw Perspective Grid Lines converging to vanishing point
      const lineCount = isMobile ? 12 : 28;
      for (let i = 0; i <= lineCount; i++) {
        const xOnHorizon = vanishingPointX;
        const xOnBottom = ((i - lineCount / 2) / (lineCount / 2)) * (width * 1.5) + vanishingPointX;
        
        ctx.beginPath();
        ctx.moveTo(xOnHorizon, horizon);
        ctx.lineTo(xOnBottom, height);
        ctx.stroke();
      }

      // Draw horizontal lines with exponential 3D perspective
      const horizLineCount = isMobile ? 8 : 18;
      gridOffset += speed;
      if (gridOffset >= 1) gridOffset -= 1;

      for (let i = 0; i < horizLineCount; i++) {
        // Exponential spacing: dynamic calculation
        const progress = (i + gridOffset) / horizLineCount;
        // Map line to lower half screen with exponential scale
        const y = horizon + Math.pow(progress, 2.5) * (height - horizon);
        
        // Dynamic transparency: lines get brighter as they get closer
        const opacity = Math.pow(progress, 2) * (isLight ? 0.09 : 0.15);
        ctx.strokeStyle = isLight 
          ? `rgba(0, 119, 136, ${opacity})` 
          : `rgba(0, 240, 255, ${opacity})`;
        
        // Neon highlight lines occasionally
        if (i === horizLineCount - 2) {
          ctx.strokeStyle = isLight 
            ? `rgba(208, 0, 96, ${opacity * 1.5})` // Cyber pink light
            : `rgba(255, 0, 127, ${opacity * 1.5})`; // Cyber pink dark
        }

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Horizon line
      ctx.strokeStyle = isLight 
        ? "rgba(0, 119, 136, 0.08)" 
        : "rgba(0, 240, 255, 0.12)";
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(width, horizon);
      ctx.stroke();
    };

    const drawParticles = () => {
      ctx.font = "bold 12px monospace";
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, p.x, p.y);
        
        p.y += p.speed;
        
        // Reset when passing screen bottom
        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });
    };

    const renderLoop = () => {
      const isLight = document.documentElement.classList.contains("light");
      
      // Draw background color (clears canvas fast)
      ctx.fillStyle = isLight ? "#f7f5ed" : "#06060c";
      ctx.fillRect(0, 0, width, height);

      // Render digital code matrix
      drawParticles();

      // Render synthwave 3D grid
      drawGrid(isLight);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    resize();
    window.addEventListener("resize", resize);
    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
