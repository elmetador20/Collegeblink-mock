"use client";

import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLogoProps {
  collapsed: boolean;
}

export function SidebarLogo({ collapsed }: SidebarLogoProps) {
  return (
    <Link
      href="/admin"
      className={cn(
        "flex items-center gap-3 px-4 py-4 border-b border-zinc-200 dark:border-zinc-800 transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
        collapsed && "justify-center px-3"
      )}
    >
      <div className="h-8 w-8 shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
        <Shield className="h-4 w-4 text-white" />
      </div>
      {!collapsed && (
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
            Admin Console
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mt-0.5">
            CollegeBlink
          </p>
        </div>
      )}
    </Link>
  );
}
