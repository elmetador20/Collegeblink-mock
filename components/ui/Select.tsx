"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string | null;
}

export function Select({ children, error, className, ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          "w-full rounded-xl border bg-white dark:bg-zinc-900/50 px-4 py-2.5 text-sm text-[#1C1B19] dark:text-zinc-100 focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer",
          error
            ? "border-[#A23B2E] focus:ring-[#A23B2E]/20 focus:border-[#A23B2E]"
            : "border-[#E3DFD6] dark:border-zinc-800 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C]",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B6660]/60 dark:text-zinc-500">
        <ChevronLeft className="h-4 w-4 rotate-270" />
      </div>
    </div>
  );
}
