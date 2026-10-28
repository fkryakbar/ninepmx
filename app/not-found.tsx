import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Page not found | fkryakbar Portfolio",
  description: "This page could not be found. Explore projects or return to Ahmad Fikri Akbar’s portfolio.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-3xl space-y-6 px-6 py-24">
        <p className="font-mono text-sm font-bold tracking-widest text-cyber-orange">{"// 404 · ROUTE_NOT_FOUND"}</p>
        <h1 className="text-4xl font-extrabold tracking-tight">This page isn’t here.</h1>
        <p className="max-w-xl text-base leading-relaxed text-muted">The link may have changed, or the project may no longer be available. You can explore the projects or return to the home page.</p>
        <div className="flex flex-wrap gap-4 pt-2 font-mono text-sm">
          <Link href="/projects" className="inline-flex min-h-12 items-center rounded-md bg-foreground px-6 font-semibold text-background">View projects</Link>
          <Link href="/" className="inline-flex min-h-12 items-center rounded-md border border-card-border bg-card px-6">Back to Home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
