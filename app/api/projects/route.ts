import { getProjects } from "@/repositories/project";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "9", 10))
    );

    const result = await getProjects(page, limit);

    return Response.json(result);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
