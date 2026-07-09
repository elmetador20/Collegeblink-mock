"use client";

import React from "react";

export function CollegeStatusBadge({ verified }: { verified: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-bold rounded-full px-2.5 py-0.5 border shadow-sm ${
        verified
          ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30"
          : "bg-zinc-100 text-[#6B6660] border-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:border-zinc-700/50"
      }`}
    >
      {verified && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
      {verified ? "Verified" : "Unverified"}
    </span>
  );
}
