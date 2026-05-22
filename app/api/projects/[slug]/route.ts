import { getProjectBySlug } from "@/repositories/project";
import type { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
      return Response.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return Response.json(project);
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return Response.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
