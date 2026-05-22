import { verifySession } from "@/lib/auth";
import { logout } from "@/actions/auth";

import { AdminSidebar } from "@/app/components/admin/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <AdminSidebar username={session.username} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-card-border bg-background/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="font-mono text-[10px] text-foreground/50 tracking-widest">
              ADMIN_PANEL // {session.username.toUpperCase()}
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="font-mono text-[10px] tracking-widest text-foreground/50 hover:text-red-400 transition px-3 py-1.5 rounded border border-card-border hover:border-red-500/30 bg-card/40"
              >
                [LOGOUT]
              </button>
            </form>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
