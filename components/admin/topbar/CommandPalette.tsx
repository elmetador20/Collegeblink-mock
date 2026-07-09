"use client";

import React, { useEffect, useRef } from "react";
import { Search, ArrowRight, CornerDownLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommandItem {
  label: string;
  href: string;
  category: string;
  shortcut: string;
}

const COMMAND_ITEMS: CommandItem[] = [
  { label: "Go to Dashboard", href: "/admin", category: "Navigation", shortcut: "g d" },
  { label: "Go to Colleges", href: "/admin/colleges", category: "Navigation", shortcut: "g c" },
  { label: "Go to Courses", href: "/admin/courses", category: "Navigation", shortcut: "g o" },
  { label: "Go to Blogs", href: "/admin/blogs", category: "Navigation", shortcut: "g b" },
  { label: "Go to Users", href: "/admin/users", category: "Navigation", shortcut: "g u" },
  { label: "Go to Settings", href: "/admin/settings", category: "Navigation", shortcut: "g s" },
  { label: "Create College", href: "/admin/colleges/new", category: "Actions", shortcut: "n c" },
  { label: "Create Course", href: "/admin/courses/new", category: "Actions", shortcut: "n o" },
  { label: "Write Blog", href: "/admin/blogs/new", category: "Actions", shortcut: "n b" },
  { label: "Create User", href: "/admin/users/new", category: "Actions", shortcut: "n u" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (v: string) => void;
}

export function CommandPalette({ open, onClose, query, onQueryChange }: CommandPaletteProps) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [open]);

  const filtered = COMMAND_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filtered[selectedIndex];
      if (selected) {
        router.push(selected.href);
        onClose();
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-40 px-4">
      <div className="fixed inset-0 bg-zinc-950/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl z-10 flex flex-col max-h-[400px]">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 px-4 py-3 shrink-0">
          <Search className="h-4.5 w-4.5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 outline-none"
          />
          <kbd className="rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-1.5 py-0.5 text-[10px] font-bold text-zinc-400">
            ESC
          </kbd>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-400 italic">
              No results found
            </div>
          ) : (
            filtered.map((item, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-xs transition-colors ${
                    active
                      ? "bg-indigo-50 dark:bg-zinc-900 text-indigo-700 dark:text-indigo-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5 text-zinc-400 shrink-0">
                      {item.category}
                    </span>
                    <span className="font-semibold truncate">{item.label}</span>
                  </div>
                  {active ? (
                    <div className="flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-400 shrink-0">
                      <span className="font-semibold font-mono">Enter</span>
                      <CornerDownLeft className="h-3 w-3" />
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-zinc-400 font-mono shrink-0">{item.shortcut}</span>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[9px] text-zinc-400 select-none shrink-0">
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-indigo-500" />
            <span>Use Arrow keys to navigate</span>
          </div>
          <span>CollegeBlink Console</span>
        </div>
      </div>
    </div>
  );
}
