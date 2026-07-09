"use client";

import React from "react";
import { Search, SlidersHorizontal, Download, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  showFilters: boolean;
  onShowFiltersChange: (val: boolean) => void;
  categoryFilter: string;
  onCategoryFilterChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  authorFilter: string;
  onAuthorFilterChange: (val: string) => void;
  categoryOptions: string[];
  authorOptions: string[];
  onExportCSV: () => void;
}

export function BlogToolbar({
  search,
  onSearchChange,
  showFilters,
  onShowFiltersChange,
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
  authorFilter,
  onAuthorFilterChange,
  categoryOptions,
  authorOptions,
  onExportCSV,
}: BlogToolbarProps) {
  const activeFiltersCount =
    (categoryFilter !== "all" ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0) +
    (authorFilter !== "all" ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#6B6660]/60 dark:text-zinc-500" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles by title, content, or category..."
            className="w-full rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 pl-10 pr-4 py-2.5 text-sm text-[#1C1B19] dark:text-zinc-100 placeholder:text-[#6B6660]/60 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C] transition-all"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onShowFiltersChange(!showFilters)}
            className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all shadow-sm active:scale-95 ${
              showFilters || activeFiltersCount > 0
                ? "bg-[#1F3A5C]/5 border-[#1F3A5C] text-[#1F3A5C] dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
                : "bg-white border-[#E3DFD6] text-[#1C1B19] hover:bg-[#FAF8F4] dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#1F3A5C] dark:bg-zinc-700 text-[10px] font-bold text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-[#1C1B19] dark:text-zinc-300 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-all shadow-sm active:scale-95"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 shadow-sm">
              {/* Category Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#6B6660] dark:text-zinc-400 uppercase tracking-widest">Category</label>
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => onCategoryFilterChange(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs text-[#1C1B19] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20"
                  >
                    <option value="all">All Categories</option>
                    {categoryOptions.filter((d) => d !== "all").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 pointer-events-none text-[#6B6660] dark:text-zinc-500" />
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#6B6660] dark:text-zinc-400 uppercase tracking-widest">Publish Status</label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs text-[#1C1B19] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20"
                  >
                    <option value="all">All Statuses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 pointer-events-none text-[#6B6660] dark:text-zinc-500" />
                </div>
              </div>

              {/* Author Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#6B6660] dark:text-zinc-400 uppercase tracking-widest">Author / Editor</label>
                <div className="relative">
                  <select
                    value={authorFilter}
                    onChange={(e) => onAuthorFilterChange(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs text-[#1C1B19] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20"
                  >
                    <option value="all">All Authors</option>
                    {authorOptions.filter((d) => d !== "all").map((auth) => (
                      <option key={auth} value={auth}>
                        {auth}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 pointer-events-none text-[#6B6660] dark:text-zinc-500" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
