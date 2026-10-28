import Link from "next/link";
import { shouldOptimizeProjectImage } from "@/lib/project-images";
import type { ProjectPreview } from "@/lib/project-presentation";
import ProjectImage from "./ProjectImage";

export default function ProjectCard({ project, headingLevel = 2, fromPage }: {
  project: ProjectPreview;
  headingLevel?: 2 | 3;
  fromPage?: number;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const openSource = project.type === "open_source";
  const href = `/projects/${project.slug}${fromPage ? `?fromPage=${fromPage}` : ""}`;
  return (
    <Link href={href} className="glass-panel group flex min-w-0 flex-col overflow-hidden rounded-xl border border-card-border hover:border-cyber-cyan">
      <div className="border-b border-card-border">
        <ProjectImage src={project.thumbnail} alt="" sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 50vw, 400px" unoptimized={!shouldOptimizeProjectImage(project.thumbnail)} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className={`rounded-full border px-2.5 py-1 font-semibold ${openSource ? "border-cyber-green/30 bg-cyber-green/10 text-cyber-green" : "border-cyber-pink/30 bg-cyber-pink/10 text-cyber-pink"}`}>
            {openSource ? "Open source" : "Closed source"}
          </span>
          <time className="text-muted" dateTime={project.createdAt.toISOString()}>
            {project.createdAt.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })}
          </time>
        </div>
        <Heading className="text-lg font-bold leading-snug [overflow-wrap:anywhere] group-hover:text-cyber-cyan">{project.projectName}</Heading>
        {project.excerpt && <p className="line-clamp-2 text-sm leading-relaxed text-muted">{project.excerpt}</p>}
        <span className="mt-auto border-t border-card-border pt-4 font-mono text-sm font-semibold text-cyber-cyan">View project <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
