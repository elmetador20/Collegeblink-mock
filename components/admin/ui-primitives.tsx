"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Search, ChevronRightCircle } from "lucide-react";

export { Button } from "@/components/ui/button";
export { Badge } from "@/components/ui/badge";
export { Card } from "@/components/ui/card";
export { Input } from "@/components/ui/input";
export { Select } from "@/components/ui/Select";
export { Dialog } from "@/components/ui/Dialog";
export { EmptyState } from "@/components/ui/EmptyState";
export { Skeleton } from "@/components/ui/skeleton";

// Helper utility for class merges
export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

/* ==========================================
   PAGINATION
   ========================================== */
interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  totalItems,
  limit,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-[#E3DFD6]/60 dark:border-zinc-800/60 pt-5 px-1">
      <p className="text-xs text-[#6B6660] dark:text-zinc-400 font-medium">
        Showing <strong className="font-semibold text-[#1C1B19] dark:text-zinc-200">{(page - 1) * limit + 1}</strong> to{" "}
        <strong className="font-semibold text-[#1C1B19] dark:text-zinc-200">
          {Math.min(page * limit, totalItems)}
        </strong>{" "}
        of <strong className="font-semibold text-[#1C1B19] dark:text-zinc-200">{totalItems}</strong> records
      </p>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 text-[#1C1B19] dark:text-zinc-300 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-zinc-900 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold border transition-all",
              page === p
                ? "bg-[#1F3A5C] border-[#1F3A5C] text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900"
                : "bg-white border-[#E3DFD6] text-[#1C1B19] hover:bg-[#FAF8F4] dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300"
            )}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 text-[#1C1B19] dark:text-zinc-300 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-zinc-900 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   SEARCH BAR
   ========================================== */
interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search records..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#6B6660]/60 dark:text-zinc-500" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 pl-11 pr-4 py-2.5 text-sm text-[#1C1B19] dark:text-zinc-100 placeholder:text-[#6B6660]/60 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C] transition-all"
      />
    </div>
  );
}

/* ==========================================
   BREADCRUMBS
   ========================================== */
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

/* ==========================================
   SKELETON LOADERS
   ========================================== */
export function TableSkeleton() {
  return (
    <div className="space-y-4 w-full">
      <div className="flex gap-4">
        <div className="animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 h-10 w-48" />
        <div className="animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 h-10 w-24" />
      </div>
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900/50">
        <div className="h-12 bg-zinc-50 dark:bg-zinc-800/40 border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 h-4 w-20" />
          ))}
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {Array.from({ length: 4 }).map((_, rowIdx) => (
            <div key={rowIdx} className="h-16 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="animate-pulse bg-zinc-200/80 dark:bg-zinc-800/80 h-9 w-9 rounded-full" />
                <div className="space-y-1.5">
                  <div className="animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 h-4.5 w-28" />
                  <div className="animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 h-3.5 w-16" />
                </div>
              </div>
              <div className="animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 h-5 w-24" />
              <div className="animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 h-4 w-12" />
              <div className="animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 h-6 w-16" />
              <div className="animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 h-8 w-12 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
