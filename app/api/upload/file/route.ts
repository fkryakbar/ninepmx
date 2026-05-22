import { verifySession } from "@/lib/auth";
import { uploadFile } from "@/lib/upload";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await verifySession();
  } catch {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const result = await uploadFile(file);

    if (!result.success) {
      return Response.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return Response.json({ success: true, url: result.url });
  } catch (error) {
    console.error("File upload error:", error);
    return Response.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
