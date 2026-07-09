"use client";

import React from "react";
import { Search, SlidersHorizontal, Trash2, CheckCircle2, Download, X } from "lucide-react";

export function UserToolbar({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  verificationFilter,
  onVerificationFilterChange,
  showFilters,
  onShowFiltersChange,
  onClearFilters,
  hasActiveFilters,
  selectedCount,
  onBulkDelete,
  onBulkDisable,
  onExportCSV,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  roleFilter: string;
  onRoleFilterChange: (v: string) => void;
  statusFilter: string;
  onStatusFilterChange: (v: string) => void;
  verificationFilter: string;
  onVerificationFilterChange: (v: string) => void;
  showFilters: boolean;
  onShowFiltersChange: (b: boolean) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkDisable: () => void;
  onExportCSV: () => void;
}) {
  return (
    <div className="space-y-4">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Left: Search input & Advanced Filters Toggle */}
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, email, stream, city..."
              className="w-full rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 pl-11 pr-4 py-2.5 text-sm text-[#1C1B19] dark:text-zinc-100 placeholder:text-[#6B6660]/60 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C] transition-all"
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-3.5 text-[#6B6660] hover:text-[#1C1B19] p-0.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <button
            onClick={() => onShowFiltersChange(!showFilters)}
            className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-150 active:scale-95 shadow-sm ${
              showFilters || hasActiveFilters
                ? "border-[#1F3A5C] bg-[#1F3A5C]/5 text-[#1F3A5C] dark:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-200"
                : "border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-1 h-2 w-2 rounded-full bg-[#1F3A5C] dark:bg-zinc-300 animate-pulse" />
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs font-bold text-[#A23B2E] hover:underline flex items-center gap-1"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Right: Selection status & CSV Export & Bulk Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {selectedCount > 0 ? (
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold text-[#6B6660] dark:text-zinc-400">
                Selected: <strong className="text-[#1C1B19] dark:text-zinc-200">{selectedCount}</strong>
              </span>
              <button
                onClick={onBulkDisable}
                className="flex items-center gap-1.5 rounded-xl border border-amber-200 hover:bg-amber-50 dark:border-amber-900/30 dark:hover:bg-amber-950/20 px-3.5 py-2.5 text-xs font-bold text-[#8C6422] transition-all"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Suspend Selected
              </button>
              <button
                onClick={onBulkDelete}
                className="flex items-center gap-1.5 rounded-xl border border-red-200 hover:bg-red-50 dark:border-rose-900/30 dark:hover:bg-rose-950/20 px-3.5 py-2.5 text-xs font-bold text-[#A23B2E] transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Selected
              </button>
            </div>
          ) : (
            <button
              onClick={onExportCSV}
              className="flex items-center gap-1.5 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-all active:scale-95 shadow-sm"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Expandable Drawer */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-[#FAF8F4]/40 dark:bg-zinc-900/40">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6660] dark:text-zinc-400 mb-1.5">
              Access Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => onRoleFilterChange(e.target.value)}
              className="w-full rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-[#1C1B19] dark:text-zinc-100 focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SUPERADMIN">SUPERADMIN</option>
              <option value="COUNSELOR">COUNSELOR</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6660] dark:text-zinc-400 mb-1.5">
              Account Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="w-full rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-[#1C1B19] dark:text-zinc-100 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6660] dark:text-zinc-400 mb-1.5">
              Email Verification
            </label>
            <select
              value={verificationFilter}
              onChange={(e) => onVerificationFilterChange(e.target.value)}
              className="w-full rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-[#1C1B19] dark:text-zinc-100 focus:outline-none"
            >
              <option value="ALL">All Verification States</option>
              <option value="Verified">Verified Only</option>
              <option value="Pending">Unverified Only</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
