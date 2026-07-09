"use client";

import React from "react";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen, ExternalLink, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  user: { name?: string | null; email?: string | null };
  collapsed: boolean;
  onToggle: () => void;
}

export function SidebarFooter({ user, collapsed, onToggle }: SidebarFooterProps) {
  const initials = (user.name ?? user.email ?? "A").slice(0, 2).toUpperCase();

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 space-y-1 mt-auto">
      {!collapsed && (
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-150 group"
        >
          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          Back to site
        </Link>
      )}

      <div className={cn("flex items-center gap-3 px-3 py-2", collapsed && "justify-center")}>
        <div className="h-7 w-7 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
          {initials}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate leading-tight">
              {user.name ?? "Admin"}
            </p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
              {user.email ?? "admin@collegeblink.com"}
            </p>
          </div>
        )}
        {!collapsed && (
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="h-6 w-6 shrink-0 flex items-center justify-center rounded-lg text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-150"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-150",
          collapsed && "justify-center"
        )}
      >
        {collapsed ? (
          <PanelLeftOpen className="h-4 w-4 shrink-0" />
        ) : (
          <>
            <PanelLeftClose className="h-4 w-4 shrink-0" />
            <span>Collapse</span>
          </>
        )}
      </button>
    </div>
  );
}
