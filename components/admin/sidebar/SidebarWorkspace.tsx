"use client";

import React from "react";
import { ChevronDown, ChevronsUpDown, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarWorkspaceProps {
  collapsed: boolean;
}

export function SidebarWorkspace({ collapsed }: SidebarWorkspaceProps) {
  return (
    <div className="px-3 py-2">
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-5 w-5 rounded bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
            <LayoutGrid className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
          </div>
          {!collapsed && (
            <span className="text-xs font-bold truncate">Default Org</span>
          )}
        </div>
        {!collapsed && <ChevronsUpDown className="h-3.5 w-3.5 text-zinc-400 shrink-0" />}
      </div>
    </div>
  );
}
