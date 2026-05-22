import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/repositories/project";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Projects | fkryakbar Portfolio",
  description:
    "Browse all projects from fkryakbar — full-stack applications, open-source tools, and more.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PublicProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));

  const { data: projects, meta } = await getProjects(page, 9);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 md:py-20 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <span className="font-mono text-xs font-bold text-cyber-pink tracking-widest uppercase">{"// ALL_PROJECTS"}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Project Showcase
          </h1>
          <p className="text-base text-foreground/70 max-w-2xl">
            Browse through all projects — from full-stack applications to
            open-source tools and experiments.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-foreground/40">
              No projects available yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="glass-panel group relative flex flex-col overflow-hidden rounded-xl border border-card-border hover:border-cyber-cyan/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              >
                {/* Thumbnail */}
                {project.thumbnail && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.thumbnail}
                    alt={project.projectName}
                    className="h-48 w-full object-cover border-b border-card-border/60"
                  />
                )}

                <div className="flex flex-col flex-1 p-5 space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-bold tracking-wider ${project.type === "open_source"
                          ? "bg-cyber-green/10 text-cyber-green border border-cyber-green/20"
                          : "bg-cyber-pink/10 text-cyber-pink border border-cyber-pink/20"
                        }`}
                    >
                      {project.type === "open_source"
                        ? "OPEN_SOURCE"
                        : "CLOSE_SOURCE"}
                    </span>
                    <span className="text-foreground/40">
                      {new Date(project.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold group-hover:text-cyber-cyan transition duration-300">
                    {project.projectName}
                  </h2>

                  <div className="mt-auto pt-3 border-t border-card-border/60">
                    <span className="font-mono text-[10px] text-foreground/40 group-hover:text-cyber-cyan/60 transition">
                      VIEW_PROJECT →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta.lastPage > 1 && (
          <div className="flex items-center justify-center gap-2 font-mono text-xs">
            {page > 1 && (
              <Link
                href={`/projects?page=${page - 1}`}
                className="px-4 py-2 rounded border border-card-border bg-card/40 text-foreground/60 hover:text-foreground hover:border-cyber-cyan transition"
              >
                ← PREV
              </Link>
            )}
            <span className="px-4 py-2 text-foreground/40">
              PAGE {meta.page} / {meta.lastPage}
            </span>
            {page < meta.lastPage && (
              <Link
                href={`/projects?page=${page + 1}`}
                className="px-4 py-2 rounded border border-card-border bg-card/40 text-foreground/60 hover:text-foreground hover:border-cyber-cyan transition"
              >
                NEXT →
              </Link>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
