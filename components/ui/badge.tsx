"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "purple" | "outline" | "default" | "secondary";
}

export function Badge({ variant = "neutral", className, children, ...props }: BadgeProps) {
  const styles = {
    default: "bg-[#1F3A5C]/5 text-[#1F3A5C] border-[#1F3A5C]/15 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
    warning: "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
    danger: "bg-red-50 text-red-700 border-red-200/50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30",
    info: "bg-[#1F3A5C]/5 text-[#1F3A5C] border-[#1F3A5C]/15 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
    neutral: "bg-zinc-100 text-[#6B6660] border-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:border-zinc-700/50",
    purple: "bg-purple-50 text-purple-700 border-purple-200/50 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30",
    outline: "bg-transparent text-muted-foreground border-border/70 dark:text-zinc-400 dark:border-zinc-800",
    secondary: "bg-[#FAF8F4] text-[#1C1B19] border-[#E3DFD6] dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-semibold border shadow-sm tracking-wide transition-colors",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
