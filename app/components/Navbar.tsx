import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-card-border bg-background/60 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-cyber-cyan animate-pulse rounded-full" />
          <Link
            href="/"
            className="font-mono text-base font-bold tracking-wider text-foreground hover:text-cyber-cyan transition duration-200"
          >{"//FKRYAKBAR"}</Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-semibold tracking-widest text-foreground/80">
          <Link href="/" className="hover:text-cyber-cyan transition">{"//HOME"}</Link>
          <Link href="/about" className="hover:text-cyber-orange transition">{"//ABOUT"}</Link>
          <Link href="/projects" className="hover:text-cyber-pink transition">{"//PROJECTS"}</Link>
          <Link href="/#skills" className="hover:text-cyber-green transition">{"//SKILLS"}</Link>
          <Link href="/#contact" className="hover:text-cyber-amber transition">{"//CONTACT"}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
