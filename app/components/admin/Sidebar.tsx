"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  username: string;
}

const NAV_ITEMS = [
  {
    label: "DASHBOARD",
    href: "/admin",
    icon: "◆",
    color: "text-cyber-cyan",
  },
  {
    label: "PROJECTS",
    href: "/admin/projects",
    icon: "◈",
    color: "text-cyber-pink",
  },
];

export function AdminSidebar({ username }: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-card-border bg-card/20">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-card-border px-6 py-5">
        <span className="h-3 w-3 rounded-full bg-cyber-cyan animate-pulse" />
        <Link
          href="/admin"
          className="font-mono text-sm font-bold tracking-widest text-foreground"
        >{"//CMS_PANEL"}</Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 font-mono text-xs font-semibold tracking-widest transition-all ${
                active
                  ? "bg-foreground/5 text-foreground border border-card-border"
                  : "text-foreground/50 hover:text-foreground hover:bg-foreground/5 border border-transparent"
              }`}
            >
              <span className={`text-base ${active ? item.color : ""}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-card-border px-6 py-4 space-y-2">
        <div className="font-mono text-[10px] text-foreground/40 tracking-wider">
          OPERATOR: {username.toUpperCase()}
        </div>
        <div className="font-mono text-[10px] text-cyber-green/60 tracking-wider">
          STATUS: AUTHENTICATED
        </div>
        <Link
          href="/"
          className="block font-mono text-[10px] text-foreground/30 hover:text-cyber-cyan tracking-wider transition"
        >
          ← VIEW_PUBLIC_SITE
        </Link>
      </div>
    </aside>
  );
}
