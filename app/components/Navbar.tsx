"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Helper to determine active link
  const isActive = (path: string) => pathname === path || (path === '/projects' && pathname?.startsWith('/projects'));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-card-border bg-background/60 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 animate-pulse rounded-full ${isActive("/about") ? "bg-cyber-orange" : isActive("/projects") ? "bg-cyber-pink" : "bg-cyber-cyan"}`} />
          <Link
            href="/"
            className={`font-mono text-base font-bold tracking-wider transition duration-200 ${isActive("/about") ? "text-cyber-orange hover:text-cyber-orange/80" : isActive("/projects") ? "text-cyber-pink hover:text-cyber-pink/80" : "text-foreground hover:text-cyber-cyan"}`}
          >
            {"//FKRYAKBAR"}
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-semibold tracking-widest text-foreground/80">
          <Link href="/" className={pathname === "/" ? "text-cyber-cyan font-bold tracking-wider" : "hover:text-cyber-cyan transition"}>{"//HOME"}</Link>
          <Link href="/about" className={isActive("/about") ? "text-cyber-orange font-bold tracking-wider" : "hover:text-cyber-orange transition"}>{"//ABOUT"}</Link>
          <Link href="/projects" className={isActive("/projects") ? "text-cyber-pink font-bold tracking-wider" : "hover:text-cyber-pink transition"}>{"//PROJECTS"}</Link>
          <Link href="/#skills" className="hover:text-cyber-green transition">{"//SKILLS"}</Link>
          <Link href="/#contact" className="hover:text-cyber-amber transition">{"//CONTACT"}</Link>
        </nav>

        {/* Right side Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden flex items-center justify-center p-2 text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-card-border bg-background/95 backdrop-blur-md px-6 py-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 font-mono text-sm font-semibold tracking-widest text-foreground/80">
            <Link href="/" className={pathname === "/" ? "text-cyber-cyan" : "hover:text-cyber-cyan transition"} onClick={() => setIsOpen(false)}>{"//HOME"}</Link>
            <Link href="/about" className={isActive("/about") ? "text-cyber-orange" : "hover:text-cyber-orange transition"} onClick={() => setIsOpen(false)}>{"//ABOUT"}</Link>
            <Link href="/projects" className={isActive("/projects") ? "text-cyber-pink" : "hover:text-cyber-pink transition"} onClick={() => setIsOpen(false)}>{"//PROJECTS"}</Link>
            <Link href="/#skills" className="hover:text-cyber-green transition" onClick={() => setIsOpen(false)}>{"//SKILLS"}</Link>
            <Link href="/#contact" className="hover:text-cyber-amber transition" onClick={() => setIsOpen(false)}>{"//CONTACT"}</Link>
            
            <div className="pt-4 mt-2 border-t border-card-border/50 flex justify-start">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
