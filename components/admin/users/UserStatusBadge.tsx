"use client";

import React from "react";

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export function UserStatusBadge({
  type,
  value,
}: {
  type: "role" | "plan" | "status" | "verification";
  value: string | boolean;
}) {
  if (type === "role") {
    const role = value as string;
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-semibold border shadow-sm",
          role === "SUPERADMIN"
            ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30"
            : role === "ADMIN"
            ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30"
            : role === "COUNSELOR"
            ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30"
            : "bg-[#1F3A5C]/5 text-[#1F3A5C] border-[#1F3A5C]/15 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
        )}
      >
        {role}
      </span>
    );
  }

  if (type === "plan") {
    const plan = value as string;
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-semibold border shadow-sm",
          plan === "PREMIUM"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30"
            : plan === "DISABLED"
            ? "bg-red-50 text-red-700 border-red-200/50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30"
            : "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:border-zinc-700/50"
        )}
      >
        {plan}
      </span>
    );
  }

  if (type === "verification") {
    const isVerified = !!value;
    return isVerified ? (
      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Verified
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 text-xs text-[#6B6660] dark:text-zinc-400 font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        Pending
      </span>
    );
  }

  if (type === "status") {
    const status = value as string;
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-[10px] uppercase font-bold rounded-full px-2.5 py-0.5 border tracking-wider",
          status === "Active"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/10 dark:text-emerald-400 dark:border-emerald-900/20"
            : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/10 dark:text-red-400 dark:border-red-900/20"
        )}
      >
        {status}
      </span>
    );
  }

  return null;
}
