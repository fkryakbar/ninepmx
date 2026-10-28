"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function RefreshProjects() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button type="button" disabled={pending} onClick={() => startTransition(() => router.refresh())} className="mt-4 inline-flex min-h-11 items-center font-mono text-sm text-cyber-cyan underline underline-offset-4 disabled:cursor-wait">
      {pending ? "Reloading projects…" : "Reload projects"}
    </button>
  );
}
