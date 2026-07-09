"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SidebarSectionProps {
  title?: string;
  collapsed: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SidebarSection({ title, collapsed, children, className }: SidebarSectionProps) {
  return (
    <div className={cn("px-3 space-y-0.5", className)}>
      {title && !collapsed && (
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
          {title}
        </p>
      )}
      {collapsed && title && (
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2 mx-2" />
      )}
      {children}
    </div>
  );
}
