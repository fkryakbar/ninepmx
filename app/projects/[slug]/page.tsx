import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/repositories/project";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.projectName} | fkryakbar Portfolio`,
    description: `${project.projectName} — a ${project.type.replace("_", " ")} project by fkryakbar.`,
    openGraph: {
      title: project.projectName,
      description: `${project.projectName} — a ${project.type.replace("_", " ")} project.`,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-12 md:py-20 space-y-8">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-foreground/50 hover:text-cyber-cyan transition"
        >
          ← BACK_TO_PROJECTS
        </Link>

        {/* Hero */}
        {project.thumbnail && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.thumbnail}
            alt={project.projectName}
            className="w-full rounded-xl border border-card-border object-cover max-h-[400px]"
          />
        )}

        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-wider ${project.type === "open_source"
                ? "bg-cyber-green/10 text-cyber-green border border-cyber-green/20"
                : "bg-cyber-pink/10 text-cyber-pink border border-cyber-pink/20"
                }`}
            >
              {project.type === "open_source" ? "OPEN_SOURCE" : "CLOSE_SOURCE"}
            </span>
            <span className="font-mono text-[10px] text-foreground/40">
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {project.projectName}
          </h1>

          {/* Links */}
          {(project.link || project.githubLink) && (
            <div className="flex gap-3 flex-wrap">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card/40 px-4 py-2 font-mono text-xs font-bold tracking-widest text-foreground/70 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition"
                >
                  🔗 LIVE_SITE
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card/40 px-4 py-2 font-mono text-xs font-bold tracking-widest text-foreground/70 hover:text-foreground hover:border-foreground/30 transition"
                >
                  ⚙ GITHUB
                </a>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <article
          className="tiptap-content prose-custom"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </main>

      <Footer />
    </>
  );
}
