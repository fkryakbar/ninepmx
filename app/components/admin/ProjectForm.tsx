"use client";

import { useState, useActionState } from "react";
import { ImageUpload } from "@/app/components/admin/ImageUpload";
import TiptapEditor from "@/app/components/TiptapEditor";
import { generateSlug } from "@/lib/slug";
import type { ProjectActionState } from "@/actions/project";

interface ProjectFormProps {
  action: (
    state: ProjectActionState | undefined,
    formData: FormData
  ) => Promise<ProjectActionState>;
  initialData?: {
    projectName: string;
    thumbnail: string;
    content: string;
    type: "open_source" | "close_source";
    link: string | null;
    githubLink: string | null;
  };
  submitLabel: string;
}

export function ProjectForm({
  action,
  initialData,
  submitLabel,
}: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [projectName, setProjectName] = useState(
    initialData?.projectName || ""
  );
  const [slug, setSlug] = useState(
    initialData?.projectName ? generateSlug(initialData.projectName) : ""
  );

  function handleNameChange(name: string) {
    setProjectName(name);
    setSlug(generateSlug(name));
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden fields for values managed by state */}
      <input type="hidden" name="thumbnail" value={thumbnail} />
      <input type="hidden" name="content" value={content} />

      {/* Error display */}
      {state?.error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 font-mono text-sm text-red-400">
          <span className="text-[10px] text-red-500/70 block mb-1">
            ERROR:
          </span>
          {state.error}
        </div>
      )}

      {/* Project Name */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] font-bold tracking-widest text-foreground/60 uppercase">
          PROJECT_NAME *
        </label>
        <input
          name="projectName"
          type="text"
          required
          value={projectName}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full rounded-lg border border-card-border bg-card/60 px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/30 focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan/30 transition"
          placeholder="Enter project name"
        />
        {state?.fieldErrors?.projectName && (
          <p className="font-mono text-xs text-red-400">
            {state.fieldErrors.projectName[0]}
          </p>
        )}
      </div>

      {/* Slug Preview */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] font-bold tracking-widest text-foreground/60 uppercase">
          SLUG (auto-generated)
        </label>
        <div className="rounded-lg border border-card-border bg-card/30 px-4 py-3 font-mono text-sm text-foreground/50">
          {slug || "—"}
        </div>
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] font-bold tracking-widest text-foreground/60 uppercase">
          THUMBNAIL *
        </label>
        <ImageUpload value={thumbnail} onChange={setThumbnail} />
        {state?.fieldErrors?.thumbnail && (
          <p className="font-mono text-xs text-red-400">
            {state.fieldErrors.thumbnail[0]}
          </p>
        )}
      </div>

      {/* Content (Tiptap) */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] font-bold tracking-widest text-foreground/60 uppercase">
          CONTENT *
        </label>
        <TiptapEditor content={content} onChange={setContent} />
        {state?.fieldErrors?.content && (
          <p className="font-mono text-xs text-red-400">
            {state.fieldErrors.content[0]}
          </p>
        )}
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] font-bold tracking-widest text-foreground/60 uppercase">
          PROJECT_TYPE *
        </label>
        <select
          name="type"
          required
          defaultValue={initialData?.type || ""}
          className="w-full rounded-lg border border-card-border bg-card/60 px-4 py-3 font-mono text-sm text-foreground focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan/30 transition appearance-none"
        >
          <option value="" disabled>
            Select type...
          </option>
          <option value="open_source">Open Source</option>
          <option value="close_source">Close Source</option>
        </select>
        {state?.fieldErrors?.type && (
          <p className="font-mono text-xs text-red-400">
            {state.fieldErrors.type[0]}
          </p>
        )}
      </div>

      {/* Link */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] font-bold tracking-widest text-foreground/60 uppercase">
          PROJECT_LINK (optional)
        </label>
        <input
          name="link"
          type="url"
          defaultValue={initialData?.link || ""}
          className="w-full rounded-lg border border-card-border bg-card/60 px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/30 focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan/30 transition"
          placeholder="https://example.com"
        />
      </div>

      {/* GitHub Link */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] font-bold tracking-widest text-foreground/60 uppercase">
          GITHUB_LINK (optional)
        </label>
        <input
          name="githubLink"
          type="url"
          defaultValue={initialData?.githubLink || ""}
          className="w-full rounded-lg border border-card-border bg-card/60 px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/30 focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan/30 transition"
          placeholder="https://github.com/..."
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4 border-t border-card-border">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-foreground px-6 py-3 font-mono text-xs font-bold tracking-widest text-background transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
        >
          {pending ? "[PROCESSING...]" : `[${submitLabel}]`}
        </button>
        <a
          href="/admin/projects"
          className="font-mono text-xs text-foreground/50 hover:text-foreground transition"
        >
          ← CANCEL
        </a>
      </div>
    </form>
  );
}
