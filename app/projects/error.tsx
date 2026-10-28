"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProjectsError({ unstable_retry }: { unstable_retry: () => void }) {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-3xl space-y-6 px-6 py-24">
        <p className="font-mono text-sm font-bold text-cyber-orange">{"// CONNECTION_INTERRUPTED"}</p>
        <h1 className="text-3xl font-extrabold">Projects are temporarily unavailable.</h1>
        <p className="text-base leading-relaxed text-muted">Please try again. You can also visit About to learn more about my work and find my contact links.</p>
        <div className="flex flex-wrap gap-4 font-mono text-sm">
          <button type="button" onClick={() => unstable_retry()} className="min-h-12 rounded-md bg-foreground px-6 font-semibold text-background">Try again</button>
          <Link href="/about" className="inline-flex min-h-12 items-center rounded-md border border-card-border bg-card px-6">About me</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
