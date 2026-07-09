"use client";

import React from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

interface ActionMenuProps {
  editHref: string;
  onDeleteClick: () => void;
}

export function ActionMenu({ editHref, onDeleteClick }: ActionMenuProps) {
  return (
    <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
      <Link
        href={editHref}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-[#1F3A5C] hover:bg-[#1F3A5C]/5 transition-all"
      >
        <Edit className="h-3 w-3" />
        Edit
      </Link>
      <button
        type="button"
        onClick={onDeleteClick}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-[#A23B2E] hover:bg-[#A23B2E]/5 transition-all"
      >
        <Trash2 className="h-3 w-3" />
        Delete
      </button>
    </div>
  );
}
export default ActionMenu;
