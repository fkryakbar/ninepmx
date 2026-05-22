import { getLatestProjects } from "@/repositories/project";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getLatestProjects(3);

    const response = projects.map((p) => ({
      projectName: p.projectName,
      slug: p.slug,
      thumbnail: p.thumbnail,
      type: p.type,
    }));

    return Response.json(response);
  } catch (error) {
    console.error("Failed to fetch latest projects:", error);
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
