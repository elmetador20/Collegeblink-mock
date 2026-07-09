"use client";

import React from "react";

interface BulkActionsProps {
  selectedCount?: number;
  onClear?: () => void;
  actions?: React.ReactNode;
}

export function BulkActions({ selectedCount = 0, onClear, actions }: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-3 bg-[#1F3A5C]/5 border border-[#1F3A5C]/15 rounded-xl px-4 py-2 text-sm text-[#1F3A5C]">
      <span>{selectedCount} selected</span>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="hover:underline font-semibold"
        >
          Clear
        </button>
      )}
      <div className="h-4 w-px bg-[#1F3A5C]/20 mx-1" />
      {actions}
    </div>
  );
}
export default BulkActions;
