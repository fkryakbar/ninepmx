"use server";

import { verifySession } from "@/lib/auth";
import { generateSlug } from "@/lib/slug";
import {
  createProject as createProjectRepo,
  updateProject as updateProjectRepo,
  deleteProject as deleteProjectRepo,
} from "@/repositories/project";
import { CreateProjectSchema, UpdateProjectSchema } from "@/types/project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface ProjectActionState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function createProjectAction(
  _prevState: ProjectActionState | undefined,
  formData: FormData
): Promise<ProjectActionState> {
  await verifySession();

  const rawData = {
    projectName: formData.get("projectName") as string,
    thumbnail: formData.get("thumbnail") as string,
    content: formData.get("content") as string,
    type: formData.get("type") as string,
    link: (formData.get("link") as string) || null,
    githubLink: (formData.get("githubLink") as string) || null,
  };

  const parsed = CreateProjectSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const slug = generateSlug(parsed.data.projectName);

  try {
    await createProjectRepo({
      ...parsed.data,
      slug,
      link: parsed.data.link ?? null,
      githubLink: parsed.data.githubLink ?? null,
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint")
    ) {
      return { error: "A project with this name already exists" };
    }
    return { error: "Failed to create project" };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProjectAction(
  id: string,
  _prevState: ProjectActionState | undefined,
  formData: FormData
): Promise<ProjectActionState> {
  await verifySession();

  const rawData: Record<string, unknown> = {};
  const projectName = formData.get("projectName") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const content = formData.get("content") as string;
  const type = formData.get("type") as string;
  const link = formData.get("link") as string;
  const githubLink = formData.get("githubLink") as string;

  if (projectName) rawData.projectName = projectName;
  if (thumbnail) rawData.thumbnail = thumbnail;
  if (content) rawData.content = content;
  if (type) rawData.type = type;
  if (link !== undefined) rawData.link = link || null;
  if (githubLink !== undefined) rawData.githubLink = githubLink || null;

  const parsed = UpdateProjectSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const updateData: Record<string, unknown> = { ...parsed.data };

  if (parsed.data.projectName) {
    updateData.slug = generateSlug(parsed.data.projectName);
  }

  try {
    await updateProjectRepo(id, updateData as Parameters<typeof updateProjectRepo>[1]);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint")
    ) {
      return { error: "A project with this name already exists" };
    }
    return { error: "Failed to update project" };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  await verifySession();

  try {
    await deleteProjectRepo(id);
  } catch {
    return { error: "Failed to delete project" };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
}
