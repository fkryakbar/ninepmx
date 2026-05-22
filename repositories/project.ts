import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getProjects(
  page: number = 1,
  limit: number = 9,
  search?: string
) {
  const skip = (page - 1) * limit;

  const where: Prisma.ProjectWhereInput = search
    ? {
        projectName: {
          contains: search,
          mode: "insensitive",
        },
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.project.count({ where }),
  ]);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      lastPage: Math.ceil(total / limit),
    },
  };
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export async function getLatestProjects(count: number = 3) {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: count,
    select: {
      id: true,
      projectName: true,
      slug: true,
      thumbnail: true,
      type: true,
      createdAt: true,
    },
  });
}

export async function createProject(data: {
  projectName: string;
  slug: string;
  thumbnail: string;
  content: string;
  type: "open_source" | "close_source";
  link?: string | null;
  githubLink?: string | null;
}) {
  return prisma.project.create({ data });
}

export async function updateProject(
  id: string,
  data: {
    projectName?: string;
    slug?: string;
    thumbnail?: string;
    content?: string;
    type?: "open_source" | "close_source";
    link?: string | null;
    githubLink?: string | null;
  }
) {
  return prisma.project.update({ where: { id }, data });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({ where: { id } });
}

export async function countProjects() {
  return prisma.project.count();
}
