"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="mt-5 flex items-center justify-between border-t border-[#E3DFD6]/60 pt-4 px-1">
      <p className="text-xs text-[#6B6660]">
        Showing <span className="font-semibold text-[#1C1B19]">{(page - 1) * limit + 1}</span> to{" "}
        <span className="font-semibold text-[#1C1B19]">
          {Math.min(page * limit, totalItems)}
        </span>{" "}
        of <span className="font-semibold text-[#1C1B19]">{totalItems}</span> records
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="rounded-lg border border-[#E3DFD6] bg-white p-1.5 text-[#1C1B19] hover:bg-[#FAF8F4] disabled:opacity-40 disabled:hover:bg-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold border transition-all ${
              page === p
                ? "bg-[#1F3A5C] border-[#1F3A5C] text-white"
                : "bg-white border-[#E3DFD6] text-[#1C1B19] hover:bg-[#FAF8F4]"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="rounded-lg border border-[#E3DFD6] bg-white p-1.5 text-[#1C1B19] hover:bg-[#FAF8F4] disabled:opacity-40 disabled:hover:bg-white transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
export default Pagination;
