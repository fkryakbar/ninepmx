import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/repositories/project";
import { Pagination } from "@/app/components/admin/Pagination";
import { DeleteButton } from "@/app/components/admin/DeleteButton";

export const metadata: Metadata = {
  title: "Projects | Portfolio CMS",
};

interface ProjectsPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function AdminProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const search = params.search || "";

  const { data: projects, meta } = await getProjects(page, 10, search || undefined);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight font-mono">
            PROJECTS
          </h1>
          <p className="text-sm text-foreground/60 font-mono">{"// manage your project showcase [{meta.total} total]"}</p>
        </div>

        <Link
          href="/admin/projects/create"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 font-mono text-xs font-bold tracking-widest text-background transition-transform hover:-translate-y-0.5 active:translate-y-0 w-fit"
        >
          + NEW_PROJECT
        </Link>
      </div>

      {/* Search */}
      <form className="flex gap-2">
        <input
          name="search"
          type="text"
          defaultValue={search}
          placeholder="Search projects..."
          className="flex-1 max-w-sm rounded-lg border border-card-border bg-card/60 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-foreground/30 focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan/30 transition"
        />
        <button
          type="submit"
          className="rounded-lg border border-card-border bg-card/40 px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-foreground/60 hover:text-foreground hover:border-foreground/30 transition"
        >
          SEARCH
        </button>
      </form>

      {/* Table */}
      <div className="glass-panel rounded-xl border border-card-border overflow-hidden">
        {projects.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-mono text-sm text-foreground/40">
              {search
                ? `No projects matching "${search}"`
                : "No projects yet. Create your first one."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border/60 font-mono text-[10px] tracking-widest text-foreground/40">
                  <th className="px-6 py-3 text-left">PROJECT_NAME</th>
                  <th className="px-6 py-3 text-left">TYPE</th>
                  <th className="px-6 py-3 text-left hidden md:table-cell">
                    SLUG
                  </th>
                  <th className="px-6 py-3 text-left hidden lg:table-cell">
                    CREATED
                  </th>
                  <th className="px-6 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-card-border/30 hover:bg-foreground/[0.02] transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {project.thumbnail && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={project.thumbnail}
                            alt=""
                            className="h-8 w-8 rounded object-cover border border-card-border"
                          />
                        )}
                        <span className="font-mono text-sm font-semibold">
                          {project.projectName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 hidden md:table-cell font-mono text-xs text-foreground/60">
                      {project.slug}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell font-mono text-[10px] text-foreground/40">
                      {new Date(project.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="rounded border border-card-border bg-card/40 px-2.5 py-1 font-mono text-[10px] tracking-wider text-foreground/50 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition"
                        >
                          EDIT
                        </Link>
                        <DeleteButton
                          projectId={project.id}
                          projectName={project.projectName}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={meta.page}
        lastPage={meta.lastPage}
        basePath="/admin/projects"
        searchParams={search ? { search } : {}}
      />
    </div>
  );
}
