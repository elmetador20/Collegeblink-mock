"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium select-none" aria-label="Breadcrumb">
      <Link href="/admin" className="flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
        <Home className="h-3.5 w-3.5" />
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        if (segment.toLowerCase() === "admin") return null;

        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-[120px]">
                {label}
              </span>
            ) : (
              <Link href={href} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors truncate max-w-[120px]">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
