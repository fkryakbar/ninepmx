import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById } from "@/repositories/project";
import { ProjectForm } from "@/app/components/admin/ProjectForm";
import { updateProjectAction } from "@/actions/project";

export const metadata: Metadata = {
  title: "Edit Project | Portfolio CMS",
};

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  // Bind the project ID to the update action
  const boundAction = updateProjectAction.bind(null, id);

  return (
    <div className="max-w-3xl space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold tracking-tight font-mono">
          EDIT_PROJECT
        </h1>
        <p className="text-sm text-foreground/60 font-mono">
          // modifying: {project.projectName}
        </p>
      </div>

      {/* Form */}
      <div className="glass-panel rounded-xl border border-card-border p-6 lg:p-8">
        <ProjectForm
          action={boundAction}
          initialData={{
            projectName: project.projectName,
            thumbnail: project.thumbnail,
            content: project.content,
            type: project.type,
            link: project.link,
            githubLink: project.githubLink,
          }}
          submitLabel="UPDATE_PROJECT"
        />
      </div>
    </div>
  );
}
