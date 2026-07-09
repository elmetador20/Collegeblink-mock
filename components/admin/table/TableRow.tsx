"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export function TableRow({ children, className }: TableRowProps) {
  return (
    <tr className={cn("hover:bg-[#FAF8F4]/40 transition-colors group", className)}>
      {children}
    </tr>
  );
}
