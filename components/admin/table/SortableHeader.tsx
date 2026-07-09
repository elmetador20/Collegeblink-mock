"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableHeaderProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export function SortableHeader({ label, onClick, className }: SortableHeaderProps) {
  return (
    <th
      onClick={onClick}
      className={cn(
        "px-5 py-4 font-semibold cursor-pointer hover:bg-[#FAF8F4]/80 transition-colors select-none text-left",
        className
      )}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className="h-3 w-3 text-[#6B6660]/60" />
      </div>
    </th>
  );
}
