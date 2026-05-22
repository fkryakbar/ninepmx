import type { Metadata } from "next";
import Link from "next/link";
import { login } from "@/actions/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Portfolio CMS",
  description: "Login to Portfolio CMS admin panel",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-foreground/60 hover:text-cyber-cyan transition"
          >
            <span className="h-2 w-2 rounded-full bg-cyber-cyan animate-pulse" />{"//FKRYAKBAR"}</Link>
          <h1 className="text-2xl font-extrabold tracking-tight font-mono">
            ADMIN_LOGIN
          </h1>
          <p className="text-sm text-foreground/60 font-mono">{"// authenticate to access control panel"}</p>
        </div>

        {/* Login Card */}
        <div className="glass-panel rounded-xl border border-card-border p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-card-border/60 pb-4 font-mono text-[10px] text-foreground/50">
            <span className="h-2 w-2 rounded-full bg-cyber-green" />
            <span>SECURE_TUNNEL: ACTIVE</span>
          </div>

          <LoginForm action={login} />
        </div>

        <p className="text-center text-[10px] font-mono text-foreground/40">
          PORTFOLIO_CMS v1.0 // ENCRYPTED_SESSION
        </p>
      </div>
    </div>
  );
}
