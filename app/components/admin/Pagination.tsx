"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export function Pagination({
  currentPage,
  lastPage,
  basePath,
  searchParams = {},
}: PaginationProps) {
  if (lastPage <= 1) return null;

  function buildUrl(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  }

  // Generate page numbers to display
  const pages: (number | "...")[] = [];
  if (lastPage <= 7) {
    for (let i = 1; i <= lastPage; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(lastPage - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < lastPage - 2) pages.push("...");
    pages.push(lastPage);
  }

  return (
    <div className="flex items-center justify-center gap-1 font-mono text-xs">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-3 py-2 rounded border border-card-border bg-card/40 text-foreground/60 hover:text-foreground hover:border-cyber-cyan transition"
        >
          ←
        </Link>
      )}

      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`dots-${idx}`}
            className="px-2 py-2 text-foreground/30"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildUrl(page)}
            className={`px-3 py-2 rounded border transition ${
              page === currentPage
                ? "border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan font-bold"
                : "border-card-border bg-card/40 text-foreground/60 hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < lastPage && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-3 py-2 rounded border border-card-border bg-card/40 text-foreground/60 hover:text-foreground hover:border-cyber-cyan transition"
        >
          →
        </Link>
      )}
    </div>
  );
}
