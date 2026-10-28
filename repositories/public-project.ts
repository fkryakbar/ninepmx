import "server-only";
import { prisma } from "@/lib/prisma";
import { projectExcerpt, type ProjectPreview } from "@/lib/project-presentation";

const previewSelect = {
  id: true, projectName: true, slug: true, thumbnail: true,
  type: true, createdAt: true, content: true,
} as const;

function toPreview({ content, ...project }: Omit<ProjectPreview, "excerpt"> & { content: string }): ProjectPreview {
  return { ...project, excerpt: projectExcerpt(content) };
}

// Separate UI queries preserve the existing REST response shapes.
export async function getFeaturedProjectPreviews() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }, take: 3, select: previewSelect,
  });
  return projects.map(toPreview);
}

export async function getPublicProjectPage(requestedPage: number) {
  const limit = 9;
  const total = await prisma.project.count();
  const lastPage = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(Math.max(1, requestedPage), lastPage);
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }, skip: (page - 1) * limit,
    take: limit, select: previewSelect,
  });
  return { projects: projects.map(toPreview), page, lastPage, total };
}
