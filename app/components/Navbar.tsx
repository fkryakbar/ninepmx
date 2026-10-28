"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MotionToggle } from "./MotionProvider";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home", accent: "text-cyber-cyan" },
  { href: "/about", label: "About", accent: "text-cyber-orange" },
  { href: "/projects", label: "Projects", accent: "text-cyber-pink" },
  { href: "/#skills", label: "Skills", accent: "text-cyber-green" },
  { href: "/about#contact", label: "Contact", accent: "text-cyber-amber" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (media.matches) setIsOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    media.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      media.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  function navigation(mobile: boolean) {
    return links.map(link => {
      const active = !link.href.includes("#") && (pathname === link.href || (link.href === "/projects" && pathname.startsWith("/projects/")));
      return (
        <Link
          key={link.href}
          href={link.href}
          aria-current={active ? "page" : undefined}
          onClick={() => setIsOpen(false)}
          className={`flex min-h-11 items-center border-b-2 ${mobile ? "w-fit" : "shrink-0"} ${active ? `${link.accent} border-current font-bold` : "border-transparent text-foreground/80 hover:text-foreground hover:border-current"}`}
        >
          <span aria-hidden="true">{"//"}</span>{link.label}
        </Link>
      );
    });
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 w-full border-b border-card-border bg-background/95 backdrop-blur-md"
        onKeyDown={event => {
          if (event.key === "Escape" && isOpen) {
            setIsOpen(false);
            toggleRef.current?.focus();
          }
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex min-h-11 shrink-0 items-center gap-2 font-mono text-base font-bold tracking-wider">
            <span aria-hidden="true" className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyber-cyan" />
            {"//FKRYAKBAR"}
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-4 font-mono text-xs lg:flex">
            {navigation(false)}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <MotionToggle />
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-card-border text-foreground lg:hidden"
            onClick={() => setIsOpen(value => !value)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <svg aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <div id="mobile-navigation" hidden={!isOpen} className="max-h-[calc(100dvh-70px)] overflow-y-auto border-t border-card-border bg-background px-6 py-4 lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2 font-mono text-sm">
            {navigation(true)}
          </nav>
          <div className="mt-4 flex flex-wrap gap-3 border-t border-card-border pt-4">
            <ThemeToggle />
            <MotionToggle />
          </div>
        </div>
      </header>
    </>
  );
}
