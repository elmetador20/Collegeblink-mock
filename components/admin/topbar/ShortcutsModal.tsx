"use client";

import React from "react";
import { Keyboard, X } from "lucide-react";

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

const SHORTCUT_LIST = [
  { name: "Command Palette", shortcut: "Ctrl + K / Cmd + K" },
  { name: "Go to Dashboard", shortcut: "g + d" },
  { name: "Go to Colleges", shortcut: "g + c" },
  { name: "Go to Courses", shortcut: "g + o" },
  { name: "Go to Blogs", shortcut: "g + b" },
  { name: "Go to Users", shortcut: "g + u" },
  { name: "Go to Settings", shortcut: "g + s" },
  { name: "Create College", shortcut: "n" },
  { name: "Show Shortcuts Cheatsheet", shortcut: "?" },
];

export function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center pt-24 sm:p-4 px-4 pb-8">
      <div className="fixed inset-0 bg-zinc-950/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4 select-none">
          <Keyboard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
            Keyboard Shortcuts
          </h3>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {SHORTCUT_LIST.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-zinc-50 dark:border-zinc-900/50 text-xs">
              <span className="font-medium text-zinc-600 dark:text-zinc-400">{item.name}</span>
              <kbd className="font-mono text-[10px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5 shadow-sm">
                {item.shortcut}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
