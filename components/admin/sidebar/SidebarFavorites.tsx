"use client";

import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarFavoritesProps {
  collapsed: boolean;
}

const FAVORITES = [
  { label: "Add College", href: "/admin/colleges/new" },
  { label: "New Blog Post", href: "/admin/blogs/new" },
];

export function SidebarFavorites({ collapsed }: SidebarFavoritesProps) {
  const pathname = usePathname();

  if (collapsed || FAVORITES.length === 0) return null;

  return (
    <div className="px-3">
      <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
        Favorites
      </p>
      <div className="space-y-0.5">
        {FAVORITES.map((fav) => {
          const active = pathname === fav.href;
          return (
            <Link
              key={fav.href}
              href={fav.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-150",
                active
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              )}
            >
              <Star className="h-3 w-3 text-amber-400 shrink-0 fill-amber-400" />
              {fav.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
