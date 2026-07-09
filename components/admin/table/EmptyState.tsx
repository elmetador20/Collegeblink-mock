"use client";

import React from "react";
import { FileSpreadsheet } from "lucide-react";

interface EmptyStateProps {
  colSpan: number;
}

export function EmptyState({ colSpan }: EmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF8F4] border border-[#E3DFD6] text-[#6B6660]/60">
          <FileSpreadsheet className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-[#1C1B19]">No records found</h3>
        <p className="mt-1 text-xs text-[#6B6660] max-w-xs mx-auto leading-relaxed">
          Try changing filters, adjusting your search term, or create a new record.
        </p>
      </td>
    </tr>
  );
}
export default EmptyState;
