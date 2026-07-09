"use client";

import React from "react";

interface TableHeaderProps {
  children: React.ReactNode;
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead>
      <tr className="sticky top-0 bg-[#FAF8F4] border-b border-[#E3DFD6] text-xs uppercase tracking-wide text-[#6B6660] font-medium z-10">
        {children}
      </tr>
    </thead>
  );
}
