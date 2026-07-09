"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  collapsed: boolean;
  badge?: number;
  shortcut?: string;
  onClick?: () => void;
}

export function SidebarItem({ href, label, icon: Icon, collapsed, badge, shortcut, onClick }: SidebarItemProps) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 select-none",
        collapsed ? "justify-center" : "justify-start",
        active
          ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400"
          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-indigo-600 dark:bg-indigo-400" />
      )}

      <Icon className={cn("h-4 w-4 shrink-0 transition-colors duration-200",
        active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
      )} />

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge != null && badge > 0 && (
            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 text-[10px] font-bold px-1.5">
              {badge > 99 ? "99+" : badge}
            </span>
          )}
          {shortcut && !badge && (
            <span className="ml-auto text-[10px] text-zinc-400 dark:text-zinc-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              {shortcut}
            </span>
          )}
        </>
      )}
    </Link>
  );
}
