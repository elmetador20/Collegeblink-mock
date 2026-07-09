"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const RECENT_PAGES = [
  { label: "Colleges", href: "/admin/colleges" },
  { label: "Blog CMS", href: "/admin/blogs" },
  { label: "Users", href: "/admin/users" },
];

interface SidebarRecentProps {
  collapsed: boolean;
}

export function SidebarRecent({ collapsed }: SidebarRecentProps) {
  const pathname = usePathname();

  if (collapsed) return null;

  return (
    <div className="px-3">
      <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
        Recent
      </p>
      <div className="space-y-0.5">
        {RECENT_PAGES.map((page) => {
          const active = pathname === page.href;
          return (
            <Link
              key={page.href}
              href={page.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-150",
                active
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              )}
            >
              <Clock className="h-3 w-3 text-zinc-300 dark:text-zinc-600 shrink-0" />
              {page.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
