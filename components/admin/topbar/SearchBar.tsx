"use client";

import React from "react";
import { Search, Command } from "lucide-react";

interface SearchBarProps {
  onClick: () => void;
}

export function SearchBar({ onClick }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-[340px]">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-[#FAF8F4]/50 dark:bg-zinc-900/50 hover:bg-[#FAF8F4] dark:hover:bg-zinc-900 px-3.5 py-2 text-sm text-[#6B6660] dark:text-zinc-400 font-semibold cursor-pointer shadow-inner transition-all duration-150"
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-[#6B6660]/70" />
          <span>Search console...</span>
        </div>
        <div className="flex items-center gap-0.5 rounded border border-[#E3DFD6] dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-[#6B6660]">
          <Command className="h-2.5 w-2.5" />
          <span>K</span>
        </div>
      </button>
    </div>
  );
}
