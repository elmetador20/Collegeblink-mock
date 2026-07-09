"use client";

import React from "react";
import { Building2, Search, X } from "lucide-react";
import { inputClass } from "@/components/admin/form-controls";

interface CollegesSectionProps {
  colleges: any[];
  loadingColleges: boolean;
  selectedColleges: string[];
  setSelectedColleges: React.Dispatch<React.SetStateAction<string[]>>;
  collegeSearch: string;
  setCollegeSearch: (val: string) => void;
  filteredColleges: any[];
  handleToggleCollege: (id: string) => void;
}

export function CollegesSection({
  colleges,
  loadingColleges,
  selectedColleges,
  setSelectedColleges,
  collegeSearch,
  setCollegeSearch,
  filteredColleges,
  handleToggleCollege,
}: CollegesSectionProps) {
  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <Building2 className="h-5 w-5 text-[#8C6422]" />
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Related Colleges Selector
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
            Select which registered colleges offer this course curriculum
          </p>
        </div>
      </div>

      {/* Selected Colleges Count/Tags */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#1C1B19] dark:text-zinc-300">
            Selected Colleges ({selectedColleges.length})
          </span>
          {selectedColleges.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedColleges([])}
              className="text-[11px] text-[#A23B2E] hover:underline font-bold"
            >
              Clear all selected
            </button>
          )}
        </div>

        {selectedColleges.length > 0 ? (
          <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/40 max-h-36 overflow-y-auto">
            {selectedColleges.map((cId) => {
              const colMatch = colleges.find((x) => x.id === cId);
              return (
                <span
                  key={cId}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1F3A5C]/5 dark:bg-zinc-800 border border-[#1F3A5C]/15 dark:border-zinc-700 px-3 py-1 text-xs text-[#1F3A5C] dark:text-zinc-300 font-medium"
                >
                  <span>{colMatch ? colMatch.name : `College ID: ${cId}`}</span>
                  <button
                    type="button"
                    onClick={() => handleToggleCollege(cId)}
                    className="rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 p-0.5 text-zinc-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-center py-4 border border-[#E3DFD6] dark:border-zinc-800 border-dashed rounded-lg text-[#6B6660]">
            No colleges currently linked to this course.
          </div>
        )}
      </div>

      {/* Search & Select Panel */}
      <div className="space-y-4 pt-4 border-t border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#6B6660]/60 pointer-events-none" />
          <input
            type="text"
            value={collegeSearch}
            onChange={(e) => setCollegeSearch(e.target.value)}
            placeholder="Search colleges by name, city, or state to add..."
            className={`${inputClass} pl-10`}
          />
        </div>

        {loadingColleges ? (
          /* Skeleton Loading State for selector */
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-11 rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 animate-pulse flex items-center justify-between px-3"
              >
                <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-[#E3DFD6] dark:border-zinc-800 rounded-lg overflow-hidden max-h-60 overflow-y-auto divide-y divide-[#E3DFD6] dark:divide-zinc-800">
            {filteredColleges.length === 0 ? (
              <div className="text-xs text-center py-6 text-[#6B6660]">
                No colleges matched the search term.
              </div>
            ) : (
              filteredColleges.map((col) => {
                const isChecked = selectedColleges.includes(col.id);
                return (
                  <div
                    key={col.id}
                    onClick={() => handleToggleCollege(col.id)}
                    className={`flex items-center justify-between p-3 cursor-pointer transition-colors text-xs ${
                      isChecked
                        ? "bg-[#1F3A5C]/[0.02] dark:bg-zinc-800/10"
                        : "hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="font-semibold text-[#1C1B19] dark:text-zinc-200">{col.name}</p>
                      <p className="text-[10px] text-[#6B6660] dark:text-zinc-500">
                        {col.city}, {col.state}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="rounded border-[#E3DFD6] text-[#1F3A5C] h-4 w-4 cursor-pointer"
                    />
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
