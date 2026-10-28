import { getFeaturedProjectPreviews } from "@/repositories/public-project";
import { connection } from "next/server";
import ProjectCard from "./ProjectCard";
import RefreshProjects from "./RefreshProjects";

export default async function FeaturedProjects() {
  // Retry must re-query the database, rather than reuse a prerendered failure.
  await connection();
  let projects;
  try {
    projects = await getFeaturedProjectPreviews();
  } catch (error) {
    console.error("Unable to load featured projects", error);
    return (
      <div className="rounded-xl border border-card-border bg-card p-8 text-center">
        <p className="text-muted">Projects are temporarily unavailable. Please try again.</p>
        <RefreshProjects />
      </div>
    );
  }
  if (!projects.length) return (
    <p className="rounded-xl border border-dashed border-card-border bg-card p-8 text-center text-muted">
      No projects published yet. Check back soon to see what I’m building.
    </p>
  );
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map(project => <ProjectCard key={project.id} project={project} headingLevel={3} />)}
    </div>
  );
}
