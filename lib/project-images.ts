export const projectImageBase = new URL(
  process.env.AWS_PUBLIC_URL || "https://g2-backend.fikri-afa289.workers.dev/g2/ninepmx",
);

export function shouldOptimizeProjectImage(src: string): boolean {
  if (src.startsWith("/") && !src.startsWith("//")) return true;
  try {
    const image = new URL(src);
    const prefix = `${projectImageBase.pathname.replace(/\/$/, "")}/`;
    return image.origin === projectImageBase.origin && image.pathname.startsWith(prefix) && !image.search;
  } catch {
    return false;
  }
}
