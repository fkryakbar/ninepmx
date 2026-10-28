"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProjectImage({ src, alt, sizes, unoptimized, contain = false }: {
  src: string;
  alt: string;
  sizes: string;
  unoptimized: boolean;
  contain?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-card">
      {src && failedSrc !== src ? (
        <Image
          key={src} src={src} alt={alt} fill sizes={sizes} unoptimized={unoptimized}
          className={contain ? "object-contain" : "object-cover"}
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <div className="flex h-full items-center justify-center p-6 font-mono text-sm text-muted" role={alt ? "img" : undefined} aria-label={alt || undefined}>
          Preview unavailable
        </div>
      )}
    </div>
  );
}
