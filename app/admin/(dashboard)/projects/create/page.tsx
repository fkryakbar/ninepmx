import type { Metadata } from "next";
import { ProjectForm } from "@/app/components/admin/ProjectForm";
import { createProjectAction } from "@/actions/project";

export const metadata: Metadata = {
  title: "Create Project | Portfolio CMS",
};

export default function CreateProjectPage() {
  return (
    <div className="max-w-3xl space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold tracking-tight font-mono">
          CREATE_PROJECT
        </h1>
        <p className="text-sm text-foreground/60 font-mono">{"// add a new project to your showcase"}</p>
      </div>

      {/* Form */}
      <div className="glass-panel rounded-xl border border-card-border p-6 lg:p-8">
        <ProjectForm action={createProjectAction} submitLabel="CREATE_PROJECT" />
      </div>
    </div>
  );
}
