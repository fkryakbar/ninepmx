export default function ProjectGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading projects">
      <p className="mb-4 font-mono text-sm text-muted">Loading projects…</p>
      <div aria-hidden="true" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-xl border border-card-border bg-card">
            <div className="aspect-video bg-foreground/5" />
            <div className="space-y-4 p-6">
              <div className="h-4 w-1/3 rounded bg-foreground/10" />
              <div className="h-6 w-4/5 rounded bg-foreground/10" />
              <div className="h-12 rounded bg-foreground/5" />
              <div className="h-5 w-1/3 rounded bg-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
