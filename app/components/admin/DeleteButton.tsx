"use client";

import { deleteProjectAction } from "@/actions/project";
import { useState, useTransition } from "react";

interface DeleteButtonProps {
  projectId: string;
  projectName: string;
}

export function DeleteButton({ projectId, projectName }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteProjectAction(projectId);
      setShowConfirm(false);
    });
  }

  if (showConfirm) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="font-mono text-[10px] text-red-400">
          DELETE &quot;{projectName}&quot;?
        </span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="rounded border border-red-500/30 bg-red-500/10 px-2 py-1 font-mono text-[10px] text-red-400 hover:bg-red-500/20 transition disabled:opacity-50"
        >
          {isPending ? "..." : "YES"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="rounded border border-card-border bg-card/40 px-2 py-1 font-mono text-[10px] text-foreground/60 hover:text-foreground transition"
        >
          NO
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="rounded border border-card-border bg-card/40 px-2.5 py-1 font-mono text-[10px] tracking-wider text-foreground/50 hover:text-red-400 hover:border-red-500/30 transition"
    >
      DELETE
    </button>
  );
}
