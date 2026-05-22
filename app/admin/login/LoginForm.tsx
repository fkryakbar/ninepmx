"use client";

import { useActionState } from "react";
import type { LoginState } from "@/actions/auth";

interface LoginFormProps {
  action: (
    state: LoginState | undefined,
    formData: FormData
  ) => Promise<LoginState>;
}

export function LoginForm({ action }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 font-mono">
          <span className="text-[10px] text-red-500/70 block mb-1">
            ERROR_AUTH:
          </span>
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="username"
          className="block font-mono text-[10px] font-bold tracking-widest text-foreground/60 uppercase"
        >
          USERNAME
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="w-full rounded-lg border border-card-border bg-card/60 px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/30 focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan/30 transition"
          placeholder="enter_username"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block font-mono text-[10px] font-bold tracking-widest text-foreground/60 uppercase"
        >
          PASSWORD
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-card-border bg-card/60 px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/30 focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan/30 transition"
          placeholder="••••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-foreground px-4 py-3 font-mono text-sm font-bold tracking-widest text-background transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {pending ? "[AUTHENTICATING...]" : "[INITIATE_SESSION]"}
      </button>
    </form>
  );
}
