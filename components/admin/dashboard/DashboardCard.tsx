"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  extra?: React.ReactNode;
  loading?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function DashboardCard({
  title,
  subtitle,
  extra,
  loading = false,
  hoverEffect = true,
  className,
  children,
  onClick,
  ...props
}: DashboardCardProps) {
  const CardWrapper = onClick ? motion.button : motion.div;

  if (loading) {
    return (
      <div
        className={cn(
          "rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-4",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <Skeleton className="h-8 w-8 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <Skeleton className="h-10 w-full bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="h-3 w-2/3 bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  }

  return (
    // @ts-ignore
    <CardWrapper
      onClick={onClick}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={cn(
        "text-left block w-full rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm transition-shadow duration-200",
        hoverEffect && "hover:shadow-md hover:border-[#1F3A5C]/30 dark:hover:border-zinc-700",
        onClick && "cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {(title || subtitle || extra) && (
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-0.5">
            {title && (
              <h3 className="font-serif text-sm font-semibold tracking-tight text-[#1C1B19] dark:text-zinc-100">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#6B6660] dark:text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>
          {extra && <div className="shrink-0">{extra}</div>}
        </div>
      )}
      <div className="relative">{children}</div>
    </CardWrapper>
  );
}
