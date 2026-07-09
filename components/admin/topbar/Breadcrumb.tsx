"use client";

import React from "react";
import { ChevronRightCircle } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-[#6B6660] dark:text-zinc-400 font-medium pb-2 select-none">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.href ? (
            <a href={item.href} className="hover:text-[#1F3A5C] dark:hover:text-zinc-100 transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-[#1C1B19] dark:text-zinc-200 font-semibold">{item.label}</span>
          )}
          {idx < items.length - 1 && <ChevronRightCircle className="h-3 w-3 opacity-60 text-zinc-400" />}
        </React.Fragment>
      ))}
    </nav>
  );
}
