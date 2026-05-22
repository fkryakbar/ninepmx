import type { Metadata } from "next";
import Link from "next/link";
import { countProjects, getLatestProjects } from "@/repositories/project";

export const metadata: Metadata = {
  title: "Dashboard | Portfolio CMS",
};

export default async function AdminDashboardPage() {
  const [totalProjects, latestProjects] = await Promise.all([
    countProjects(),
    getLatestProjects(5),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold tracking-tight font-mono">
          DASHBOARD
        </h1>
        <p className="text-sm text-foreground/60 font-mono">
          // system overview and quick actions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-xl border border-card-border p-6 space-y-2">
          <span className="font-mono text-[10px] tracking-widest text-foreground/50">
            TOTAL_PROJECTS
          </span>
          <div className="text-4xl font-extrabold text-cyber-cyan font-mono">
            {totalProjects}
          </div>
          <span className="font-mono text-[10px] text-foreground/40">
            registered in database
          </span>
        </div>

        <div className="glass-panel rounded-xl border border-card-border p-6 space-y-2">
          <span className="font-mono text-[10px] tracking-widest text-foreground/50">
            STORAGE_ENGINE
          </span>
          <div className="text-4xl font-extrabold text-cyber-green font-mono">
            S3
          </div>
          <span className="font-mono text-[10px] text-foreground/40">
            cloudflare worker gateway
          </span>
        </div>

        <div className="glass-panel rounded-xl border border-card-border p-6 space-y-2">
          <span className="font-mono text-[10px] tracking-widest text-foreground/50">
            AUTH_STATUS
          </span>
          <div className="text-4xl font-extrabold text-cyber-amber font-mono">
            JWT
          </div>
          <span className="font-mono text-[10px] text-foreground/40">
            jose / signed cookie
          </span>
        </div>
      </div>

      {/* Quick Action */}
      <div className="flex gap-4">
        <Link
          href="/admin/projects/create"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 font-mono text-xs font-bold tracking-widest text-background transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          + NEW_PROJECT
        </Link>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card/40 px-5 py-3 font-mono text-xs font-bold tracking-widest text-foreground hover:border-cyber-cyan transition"
        >
          VIEW_ALL
        </Link>
      </div>

      {/* Latest Projects Table */}
      <div className="glass-panel rounded-xl border border-card-border overflow-hidden">
        <div className="flex items-center justify-between border-b border-card-border px-6 py-4">
          <span className="font-mono text-xs font-bold tracking-widest text-foreground/60">
            LATEST_PROJECTS
          </span>
          <span className="font-mono text-[10px] text-foreground/40">
            [{latestProjects.length} entries]
          </span>
        </div>

        {latestProjects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-mono text-sm text-foreground/40">
              No projects yet. Create your first project.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border/60 font-mono text-[10px] tracking-widest text-foreground/40">
                  <th className="px-6 py-3 text-left">PROJECT_NAME</th>
                  <th className="px-6 py-3 text-left">TYPE</th>
                  <th className="px-6 py-3 text-left">SLUG</th>
                  <th className="px-6 py-3 text-left">CREATED</th>
                </tr>
              </thead>
              <tbody>
                {latestProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-card-border/30 hover:bg-foreground/[0.02] transition"
                  >
                    <td className="px-6 py-3 font-mono text-sm font-semibold">
                      {project.projectName}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider ${
                          project.type === "open_source"
                            ? "bg-cyber-green/10 text-cyber-green border border-cyber-green/20"
                            : "bg-cyber-pink/10 text-cyber-pink border border-cyber-pink/20"
                        }`}
                      >
                        {project.type === "open_source"
                          ? "OPEN_SRC"
                          : "CLOSED_SRC"}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-mono text-xs text-foreground/60">
                      {project.slug}
                    </td>
                    <td className="px-6 py-3 font-mono text-[10px] text-foreground/40">
                      {new Date(project.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
