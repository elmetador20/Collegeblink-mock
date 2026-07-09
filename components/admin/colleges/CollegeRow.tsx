"use client";

import React from "react";
import Link from "next/link";
import { MoreVertical, Eye, Edit, Copy, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CollegeStatusBadge } from "./CollegeStatusBadge";

export function CollegeRow({
  college,
  idx,
  page,
  limit,
  isSelected,
  onToggleSelect,
  activeMenuId,
  setActiveMenuId,
  onDuplicate,
  onDelete,
}: {
  college: any;
  idx: number;
  page: number;
  limit: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const isVerified = college.verified;

  return (
    <tr
      className={`hover:bg-[#FAF8F4]/30 dark:hover:bg-zinc-800/20 transition-all duration-150 group ${
        isSelected ? "bg-[#1F3A5C]/[0.02] dark:bg-zinc-800/10" : ""
      }`}
    >
      {/* Select Column */}
      <td className="px-5 py-4 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="rounded border-[#E3DFD6] dark:border-zinc-700 text-[#1F3A5C] focus:ring-[#1F3A5C]/35 cursor-pointer h-4 w-4"
        />
      </td>

      {/* Row count */}
      <td className="px-2 py-4 font-mono text-[11px] text-[#6B6660] dark:text-zinc-500 text-center">
        {(page - 1) * limit + idx + 1}
      </td>

      {/* College details */}
      <td className="px-5 py-4">
        <div className="font-semibold text-[#1C1B19] dark:text-zinc-200 text-sm">
          {college.name}
        </div>
        <div className="text-[11px] font-mono text-[#6B6660]/75 dark:text-zinc-500 mt-0.5">
          /{college.slug}
        </div>
      </td>

      {/* Location details */}
      <td className="px-5 py-4 text-xs text-[#6B6660] dark:text-zinc-400 font-medium">
        {college.city}, {college.state}
      </td>

      {/* Type details */}
      <td className="px-5 py-4">
        <span className="inline-flex items-center rounded-lg bg-[#FAF8F4] dark:bg-zinc-800 border border-[#E3DFD6] dark:border-zinc-700 px-2 py-0.5 text-[11px] font-semibold text-[#1C1B19] dark:text-zinc-300">
          {college.type}
        </span>
      </td>

      {/* NIRF rank */}
      <td className="px-5 py-4 text-center font-mono text-xs font-bold text-[#1C1B19] dark:text-zinc-300">
        {college.nirfRank ?? "—"}
      </td>

      {/* Verified Badge */}
      <td className="px-5 py-4">
        <CollegeStatusBadge verified={isVerified} />
      </td>

      {/* Row Action Trigger Menu */}
      <td className="px-5 py-4 text-right relative">
        <div className="flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenuId(activeMenuId === college.id ? null : college.id);
            }}
            className="p-1.5 rounded-lg border border-transparent hover:border-[#E3DFD6] dark:hover:border-zinc-700 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 text-[#6B6660] dark:text-zinc-400 transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {/* Action Dropdown Menu bubble */}
          <AnimatePresence>
            {activeMenuId === college.id && (
              <>
                {/* Click Away overlay */}
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setActiveMenuId(null)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  className="absolute right-12 top-2 mt-1 w-36 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 shadow-lg z-30 text-left"
                >
                  <Link
                    href={`/colleges/${college.slug}`}
                    target="_blank"
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#6B6660] dark:text-zinc-300 hover:text-[#1C1B19] dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Page
                  </Link>
                  <Link
                    href={`/admin/colleges/${college.id}/edit`}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#6B6660] dark:text-zinc-300 hover:text-[#1C1B19] dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit Details
                  </Link>
                  <button
                    onClick={onDuplicate}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#6B6660] dark:text-zinc-300 hover:text-[#1C1B19] dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Duplicate
                  </button>
                  <div className="h-px bg-[#E3DFD6] dark:bg-zinc-800 my-1" />
                  <button
                    onClick={onDelete}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#A23B2E] hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </td>
    </tr>
  );
}
