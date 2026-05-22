import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION || "auto",
  endpoint: process.env.AWS_ENDPOINT,
  forcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === "true",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const S3_BUCKET = process.env.AWS_BUCKET!;
export const S3_PUBLIC_URL = process.env.AWS_PUBLIC_URL!;
