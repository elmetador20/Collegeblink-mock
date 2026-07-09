"use client";

import React from "react";
import { Search } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="py-20 text-center rounded-xl border border-dashed border-[#E3DFD6] dark:border-zinc-800 bg-[#FAF8F4]/30 dark:bg-zinc-950/10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF8F4] dark:bg-zinc-900 border border-[#E3DFD6] dark:border-zinc-800 text-[#6B6660]/60">
        {icon || <Search className="h-7 w-7" />}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">{title}</h3>
      <p className="mt-1.5 text-xs text-[#6B6660] dark:text-zinc-500 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
