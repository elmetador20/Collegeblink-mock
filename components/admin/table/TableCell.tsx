"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export function TableCell({ children, className }: TableCellProps) {
  return (
    <td className={cn("px-5 py-4 text-[#1C1B19]", className)}>
      {children}
    </td>
  );
}
