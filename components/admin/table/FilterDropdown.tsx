"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  showFilters: boolean;
  filterOptions: {
    label1: string;
    options1: Option[];
    label2: string;
    options2: Option[];
  } | null;
  filter1: string;
  filter2: string;
  onFilter1Change: (val: string) => void;
  onFilter2Change: (val: string) => void;
}

export function FilterDropdown({
  showFilters,
  filterOptions,
  filter1,
  filter2,
  onFilter1Change,
  onFilter2Change,
}: FilterDropdownProps) {
  if (!filterOptions) return null;

  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden w-full text-left"
        >
          <div className="mt-3 grid grid-cols-1 gap-4 rounded-xl border border-[#E3DFD6] bg-white p-4 sm:grid-cols-2">
            {/* Filter 1 */}
            <div>
              <label className="text-xs font-semibold text-[#6B6660] uppercase tracking-wider">
                {filterOptions.label1}
              </label>
              <div className="relative mt-1.5">
                <select
                  value={filter1}
                  onChange={(e) => onFilter1Change(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[#E3DFD6] bg-white px-3 py-2 text-sm text-[#1C1B19] focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C]"
                >
                  {filterOptions.options1.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none text-[#6B6660]" />
              </div>
            </div>

            {/* Filter 2 */}
            <div>
              <label className="text-xs font-semibold text-[#6B6660] uppercase tracking-wider">
                {filterOptions.label2}
              </label>
              <div className="relative mt-1.5">
                <select
                  value={filter2}
                  onChange={(e) => onFilter2Change(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[#E3DFD6] bg-white px-3 py-2 text-sm text-[#1C1B19] focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C]"
                >
                  {filterOptions.options2.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none text-[#6B6660]" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default FilterDropdown;
