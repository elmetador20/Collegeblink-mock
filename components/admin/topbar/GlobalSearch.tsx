"use client";

import React from "react";
import { Search, Command } from "lucide-react";

interface GlobalSearchProps {
  onOpenPalette: () => void;
}

export function GlobalSearch({ onOpenPalette }: GlobalSearchProps) {
  return (
    <button
      type="button"
      onClick={onOpenPalette}
      className="flex items-center justify-center sm:justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 h-9 w-9 sm:w-44 md:w-52 transition-all duration-150 shadow-inner select-none cursor-pointer shrink-0"
      title="Search console (Ctrl+K)"
    >
      <div className="flex items-center gap-2">
        <Search className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
        <span className="hidden sm:inline text-xs text-zinc-400 dark:text-zinc-500 font-medium">Search...</span>
      </div>
      <div className="hidden sm:flex items-center gap-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 py-0.5 text-[9px] font-bold text-zinc-400 select-none">
        <Command className="h-2.5 w-2.5" />K
      </div>
    </button>
  );
}
