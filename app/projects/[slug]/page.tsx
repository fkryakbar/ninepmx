import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/repositories/project";
import { parsePublicPage, projectExcerpt, projectsPageHref } from "@/lib/project-presentation";
import { shouldOptimizeProjectImage } from "@/lib/project-images";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProjectImage from "@/app/components/ProjectImage";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ fromPage?: string | string[] }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found | fkryakbar Portfolio" };
  const description = projectExcerpt(project.content) || `${project.projectName} — a project by Ahmad Fikri Akbar.`;
  return {
    title: `${project.projectName} | fkryakbar Portfolio`, description,
    openGraph: { title: project.projectName, description, images: project.thumbnail ? [{ url: project.thumbnail }] : [] },
  };
}

export default async function ProjectDetailPage({ params, searchParams }: ProjectDetailPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const returnPage = parsePublicPage(query.fromPage);
  const openSource = project.type === "open_source";

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full min-w-0 max-w-4xl space-y-8 px-6 py-12 md:py-20">
        <Link href={projectsPageHref(returnPage)} className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted hover:text-cyber-cyan">← Back to projects{returnPage > 1 ? ` · Page ${returnPage}` : ""}</Link>
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className={`rounded-full border px-3 py-1 font-semibold ${openSource ? "border-cyber-green/30 bg-cyber-green/10 text-cyber-green" : "border-cyber-pink/30 bg-cyber-pink/10 text-cyber-pink"}`}>{openSource ? "Open source" : "Closed source"}</span>
            <time dateTime={project.createdAt.toISOString()} className="text-muted">{project.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight [overflow-wrap:anywhere] md:text-4xl">{project.projectName}</h1>
          {(project.link || project.githubLink) && (
            <div className="flex flex-wrap gap-3 font-mono text-sm">
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-card-border bg-card px-4 text-cyber-cyan hover:border-cyber-cyan">Live site <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
              {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-card-border bg-card px-4 hover:border-foreground">GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
            </div>
          )}
        </div>
        {project.thumbnail && (
          <div className="overflow-hidden rounded-xl border border-card-border">
            <ProjectImage src={project.thumbnail} alt={`Screenshot of ${project.projectName}`} sizes="(max-width: 895px) calc(100vw - 48px), 848px" unoptimized={!shouldOptimizeProjectImage(project.thumbnail)} contain />
          </div>
        )}
        <article className="tiptap-content prose-custom" dangerouslySetInnerHTML={{ __html: project.content }} />
      </main>
      <Footer />
    </>
  );
}
