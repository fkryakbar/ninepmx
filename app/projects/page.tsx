import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getPublicProjectPage } from "@/repositories/public-project";
import { parsePublicPage, projectsPageHref } from "@/lib/project-presentation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectGridSkeleton from "@/app/components/ProjectGridSkeleton";

export const metadata: Metadata = {
  title: "Projects | fkryakbar Portfolio",
  description: "Browse projects by Ahmad Fikri Akbar — full-stack applications, open-source tools, and experiments.",
};

export default async function PublicProjectsPage({ searchParams }: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestedPage = parsePublicPage(params.page);
  if (params.page !== undefined && params.page !== String(requestedPage)) redirect("/projects");
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full min-w-0 max-w-7xl space-y-10 px-6 py-12 md:py-20">
        <div className="space-y-4">
          <span className="font-mono text-xs font-bold tracking-widest text-cyber-pink">{"// ALL_PROJECTS"}</span>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Project showcase</h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">Browse my applications, open-source tools, and experiments. Open a project to read the story behind it.</p>
        </div>
        <Suspense fallback={<ProjectGridSkeleton count={9} />}>
          <ProjectResults requestedPage={requestedPage} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

async function ProjectResults({ requestedPage }: { requestedPage: number }) {
  const { projects, page, lastPage, total } = await getPublicProjectPage(requestedPage);
  if (page !== requestedPage) redirect(projectsPageHref(page));

  return (
    <>
      {total > 0 && <p className="font-mono text-sm text-muted">{total} projects · Newest first</p>}
      {projects.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => <ProjectCard key={project.id} project={project} fromPage={page} />)}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-card-border bg-card p-8 text-center">
          <h2 className="text-lg font-semibold">No projects published yet</h2>
          <p className="mt-3 text-muted">Check back soon, or visit About to learn more about my work.</p>
          <Link href="/about" className="mt-4 inline-flex min-h-11 items-center font-mono text-sm text-cyber-cyan underline underline-offset-4">About me</Link>
        </div>
      )}
      {lastPage > 1 && (
        <nav aria-label="Project pagination" className="flex flex-wrap items-center justify-center gap-3 font-mono text-sm">
          {page > 1 && <Link rel="prev" href={projectsPageHref(page - 1)} className="inline-flex min-h-11 items-center rounded-md border border-card-border bg-card px-4 hover:border-cyber-cyan">← Previous</Link>}
          <span className="px-2 text-muted">Page {page} of {lastPage}</span>
          {page < lastPage && <Link rel="next" href={projectsPageHref(page + 1)} className="inline-flex min-h-11 items-center rounded-md border border-card-border bg-card px-4 hover:border-cyber-cyan">Next →</Link>}
        </nav>
      )}
    </>
  );
}
