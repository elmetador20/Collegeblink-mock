"use client";

import React from "react";
import { Bookmark, Keyboard, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PageActionsProps {
  isBookmarked: boolean;
  toggleBookmark: () => void;
  onShortcutsClick: () => void;
  maintenanceMode: boolean;
  handleToggleMaintenance: (checked: boolean) => void;
  toggling: boolean;
}

export function PageActions({
  isBookmarked,
  toggleBookmark,
  onShortcutsClick,
  maintenanceMode,
  handleToggleMaintenance,
  toggling,
}: PageActionsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Bookmark Trigger */}
      <button
        type="button"
        onClick={toggleBookmark}
        title="Bookmark Current Page (B)"
        className={`h-9 w-9 flex items-center justify-center rounded-xl border transition-all ${
          isBookmarked
            ? "bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20"
            : "bg-white dark:bg-zinc-900 border-[#E3DFD6] dark:border-zinc-800 text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4]"
        }`}
      >
        <Bookmark className="h-4.5 w-4.5" fill={isBookmarked ? "currentColor" : "none"} />
      </button>

      {/* Keyboard Shortcuts Trigger Button */}
      <button
        type="button"
        onClick={onShortcutsClick}
        title="Keyboard Shortcuts Cheatsheet (?)"
        className="h-9 w-9 flex items-center justify-center rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-all"
      >
        <Keyboard className="h-4.5 w-4.5" />
      </button>

      <div className="h-6 w-px bg-[#E3DFD6] dark:bg-zinc-800 mx-1" />

      {/* Maintenance system status indicator */}
      <div className="flex items-center gap-2 pl-1 bg-[#FAF8F4] dark:bg-zinc-900 px-3 py-1.5 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-1.5">
          {maintenanceMode ? (
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
          ) : (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          )}
          <span className={`text-[10px] font-bold uppercase tracking-wider ${
            maintenanceMode ? "text-amber-700 dark:text-amber-500" : "text-emerald-700 dark:text-emerald-500"
          }`}>
            {maintenanceMode ? "Maintenance" : "Online"}
          </span>
        </div>
        <Switch
          checked={maintenanceMode}
          onCheckedChange={handleToggleMaintenance}
          disabled={toggling}
          className="data-[state=checked]:bg-amber-500 scale-75 cursor-pointer"
        />
      </div>
    </div>
  );
}
