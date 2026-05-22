import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, S3_BUCKET, S3_PUBLIC_URL } from "./s3";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
];

const ALLOWED_FILE_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

function generateUniqueFilename(originalName: string): string {
  const ext = getFileExtension(originalName);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}_${random}.${ext}`;
}

export async function uploadImage(file: File): Promise<UploadResult> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { success: false, error: "Invalid image type. Allowed: JPEG, PNG, GIF, WebP, SVG, AVIF" };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return { success: false, error: "Image too large. Maximum size is 5MB" };
  }

  const filename = generateUniqueFilename(file.name);
  const key = `projects/images/${filename}`;

  return uploadToS3(file, key);
}

export async function uploadFile(file: File): Promise<UploadResult> {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { success: false, error: "Invalid file type. Allowed: images, PDF, ZIP, DOCX" };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: "File too large. Maximum size is 20MB" };
  }

  const filename = generateUniqueFilename(file.name);
  const key = `projects/files/${filename}`;

  return uploadToS3(file, key);
}

async function uploadToS3(file: File, key: string): Promise<UploadResult> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const url = `${S3_PUBLIC_URL}/${key}`;
    return { success: true, url };
  } catch (error) {
    console.error("S3 upload error:", error);
    return { success: false, error: "Failed to upload file" };
  }
}
