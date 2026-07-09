"use client";

import React from "react";
import { Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarSearchProps {
  collapsed: boolean;
  onOpen: () => void;
}

export function SidebarSearch({ collapsed, onOpen }: SidebarSearchProps) {
  if (collapsed) {
    return (
      <button
        type="button"
        onClick={onOpen}
        title="Search (Ctrl+K)"
        className="mx-3 flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200"
      >
        <Search className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="px-3">
      <button
        type="button"
        onClick={onOpen}
        className="w-full flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-400 dark:text-zinc-500 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all duration-200 group"
      >
        <div className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5" />
          <span className="font-medium">Search...</span>
        </div>
        <div className="flex items-center gap-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-zinc-400">
          <Command className="h-2.5 w-2.5" />K
        </div>
      </button>
    </div>
  );
}
