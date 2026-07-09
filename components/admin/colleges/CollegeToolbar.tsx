"use client";

import React from "react";
import { Search, SlidersHorizontal, ChevronDown, Download, Trash2, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CollegeToolbar({
  search,
  onSearchChange,
  showFilters,
  onShowFiltersChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  stateFilter,
  onStateFilterChange,
  cityFilter,
  onCityFilterChange,
  stateOptions,
  cityOptions,
  selectedCount,
  onBulkDelete,
  onBulkVerify,
  onExportCSV,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  showFilters: boolean;
  onShowFiltersChange: (b: boolean) => void;
  typeFilter: string;
  onTypeFilterChange: (v: string) => void;
  statusFilter: string;
  onStatusFilterChange: (v: string) => void;
  stateFilter: string;
  onStateFilterChange: (v: string) => void;
  cityFilter: string;
  onCityFilterChange: (v: string) => void;
  stateOptions: string[];
  cityOptions: string[];
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkVerify: () => void;
  onExportCSV: () => void;
}) {
  const hasActiveFilters = typeFilter !== "all" || statusFilter !== "all" || stateFilter !== "all" || cityFilter !== "all";
  const activeFiltersCount = (typeFilter !== "all" ? 1 : 0) + (statusFilter !== "all" ? 1 : 0) + (stateFilter !== "all" ? 1 : 0) + (cityFilter !== "all" ? 1 : 0);

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
            placeholder="Search by college name, city, or state..."
            className="w-full rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 pl-10 pr-4 py-2.5 text-sm text-[#1C1B19] dark:text-zinc-100 placeholder:text-[#6B6660]/60 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C] transition-all"
          />
        </div>

        {/* Buttons & Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedCount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#6B6660] dark:text-zinc-400">
                Selected: <strong className="text-[#1C1B19] dark:text-zinc-200">{selectedCount}</strong>
              </span>
              <button
                onClick={onBulkVerify}
                className="flex items-center gap-1.5 rounded-xl border border-emerald-200 hover:bg-emerald-50 dark:border-emerald-900/30 dark:hover:bg-emerald-950/20 px-3.5 py-2 text-xs font-bold text-emerald-700 transition-all"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Verify Selected
              </button>
              <button
                onClick={onBulkDelete}
                className="flex items-center gap-1.5 rounded-xl border border-red-200 hover:bg-red-50 dark:border-rose-900/30 dark:hover:bg-rose-950/20 px-3.5 py-2 text-xs font-bold text-[#A23B2E] transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Selected
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onShowFiltersChange(!showFilters)}
                className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all shadow-sm active:scale-95 ${
                  showFilters || hasActiveFilters
                    ? "bg-[#1F3A5C]/5 border-[#1F3A5C] text-[#1F3A5C] dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
                    : "bg-white border-[#E3DFD6] text-[#1C1B19] hover:bg-[#FAF8F4] dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
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
            </>
          )}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 shadow-sm">
              {/* Type Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#6B6660] dark:text-zinc-400 uppercase tracking-widest">College Type</label>
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => onTypeFilterChange(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs text-[#1C1B19] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20"
                  >
                    <option value="all">All Types</option>
                    <option value="Government">Government</option>
                    <option value="Private">Private</option>
                    <option value="Deemed">Deemed</option>
                    <option value="Autonomous">Autonomous</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 pointer-events-none text-[#6B6660] dark:text-zinc-500" />
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#6B6660] dark:text-zinc-400 uppercase tracking-widest">Verification Status</label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs text-[#1C1B19] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20"
                  >
                    <option value="all">All Statuses</option>
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 pointer-events-none text-[#6B6660] dark:text-zinc-500" />
                </div>
              </div>

              {/* State Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#6B6660] dark:text-zinc-400 uppercase tracking-widest">State Location</label>
                <div className="relative">
                  <select
                    value={stateFilter}
                    onChange={(e) => onStateFilterChange(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs text-[#1C1B19] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20"
                  >
                    <option value="all">All States</option>
                    {stateOptions.filter((s) => s !== "all").map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 pointer-events-none text-[#6B6660] dark:text-zinc-500" />
                </div>
              </div>

              {/* City Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#6B6660] dark:text-zinc-400 uppercase tracking-widest">City Location</label>
                <div className="relative">
                  <select
                    value={cityFilter}
                    onChange={(e) => onCityFilterChange(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs text-[#1C1B19] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20"
                  >
                    <option value="all">All Cities</option>
                    {cityOptions.filter((c) => c !== "all").map((city) => (
                      <option key={city} value={city}>
                        {city}
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
