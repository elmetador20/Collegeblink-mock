"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
  icon?: React.ReactNode;
}

export function Input({ error, icon, className, ...props }: InputProps) {
  return (
    <div className="w-full relative">
      {icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6660]/60 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={cn(
          "w-full rounded-xl border bg-white dark:bg-zinc-900/50 py-2.5 text-sm text-[#1C1B19] dark:text-zinc-100 placeholder:text-[#6B6660]/60 focus:outline-none focus:ring-2 transition-all",
          icon ? "pl-11 pr-4" : "px-4",
          error
            ? "border-[#A23B2E] focus:ring-[#A23B2E]/20 focus:border-[#A23B2E]"
            : "border-[#E3DFD6] dark:border-zinc-800 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C]",
          className
        )}
        {...props}
      />
    </div>
  );
}
