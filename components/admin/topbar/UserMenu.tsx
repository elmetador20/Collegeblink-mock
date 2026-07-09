"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bookmark, History } from "lucide-react";

interface BookmarkItem {
  label: string;
  href: string;
}

interface UserMenuProps {
  bookmarks: BookmarkItem[];
  history: BookmarkItem[];
  showHistoryDropdown: boolean;
  setShowHistoryDropdown: (v: boolean) => void;
  innerRef: React.RefObject<HTMLDivElement | null>;
}

export function UserMenu({
  bookmarks,
  history,
  showHistoryDropdown,
  setShowHistoryDropdown,
  innerRef,
}: UserMenuProps) {
  const router = useRouter();

  return (
    <div className="relative" ref={innerRef}>
      <button
        type="button"
        onClick={() => setShowHistoryDropdown(!showHistoryDropdown)}
        title="Recently Visited & Bookmarks"
        className="h-9 w-9 flex items-center justify-center rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-all"
      >
        <History className="h-4.5 w-4.5" />
      </button>
      
      {showHistoryDropdown && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden py-3 z-50 text-left">
          <div className="px-4 pb-2 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 mb-2">
            <span className="text-[10px] font-bold text-[#6B6660] dark:text-zinc-400 uppercase tracking-widest">
              Bookmarks
            </span>
          </div>
          <div className="max-h-36 overflow-y-auto px-2 space-y-0.5">
            {bookmarks.length === 0 ? (
              <p className="text-xs text-[#6B6660]/70 px-2 py-1 italic">No bookmarked pages yet.</p>
            ) : (
              bookmarks.map((b, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    router.push(b.href);
                    setShowHistoryDropdown(false);
                  }}
                  className="w-full text-left rounded-lg px-2.5 py-1.5 text-xs text-[#1C1B19] dark:text-zinc-200 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 font-semibold truncate flex items-center gap-1.5"
                >
                  <Bookmark className="h-3 w-3 text-amber-500" fill="currentColor" />
                  {b.label}
                </button>
              ))
            )}
          </div>

          <div className="px-4 pt-3 pb-2 border-b border-t border-[#E3DFD6]/60 dark:border-zinc-800/60 my-2">
            <span className="text-[10px] font-bold text-[#6B6660] dark:text-zinc-400 uppercase tracking-widest">
              Recently Visited
            </span>
          </div>
          <div className="max-h-44 overflow-y-auto px-2 space-y-0.5">
            {history.length === 0 ? (
              <p className="text-xs text-[#6B6660]/70 px-2 py-1 italic">No history logged.</p>
            ) : (
              history.map((h, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    router.push(h.href);
                    setShowHistoryDropdown(false);
                  }}
                  className="w-full text-left rounded-lg px-2.5 py-1.5 text-xs text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 font-medium truncate flex items-center gap-1.5"
                >
                  <History className="h-3 w-3 text-[#6B6660]/55" />
                  {h.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
