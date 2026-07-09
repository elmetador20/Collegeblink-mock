"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Eye, Edit, Copy, Trash2, Building2 } from "lucide-react";

interface CourseRowProps {
  course: any;
  idx: number;
  page: number;
  limit: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function CourseRow({
  course,
  idx,
  page,
  limit,
  isSelected,
  onToggleSelect,
  activeMenuId,
  setActiveMenuId,
  onDuplicate,
  onDelete,
}: CourseRowProps) {
  const isActive = course.active !== false;

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

      <td className="px-2 py-4 font-mono text-[11px] text-[#6B6660] dark:text-zinc-500 text-center">
        {(page - 1) * limit + idx + 1}
      </td>

      <td className="px-5 py-4">
        <div className="font-semibold text-[#1C1B19] dark:text-zinc-200 text-sm">
          {course.name}
        </div>
        {course.description && (
          <p className="text-[11px] text-[#6B6660] dark:text-zinc-400 mt-1 line-clamp-1 max-w-md">
            {course.description}
          </p>
        )}
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex items-center rounded-lg bg-[#1F3A5C]/5 dark:bg-zinc-800 border border-[#1F3A5C]/10 dark:border-zinc-700 px-2 py-0.5 text-[11px] font-bold text-[#1F3A5C] dark:text-zinc-300">
          {course.degree}
        </span>
      </td>

      <td className="px-5 py-4 text-center font-medium text-xs text-[#1C1B19] dark:text-zinc-300">
        {course.duration} {Number(course.duration) === 1 ? "Year" : "Years"}
      </td>

      <td className="px-5 py-4 text-xs text-[#6B6660] dark:text-zinc-400 font-medium">
        <div className="flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" />
          <span>{course.colleges?.length || 0} colleges</span>
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-bold rounded-full px-2.5 py-0.5 border shadow-sm ${
            isActive
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30"
              : "bg-zinc-100 text-[#6B6660] border-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:border-zinc-700/50"
          }`}
        >
          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
          {isActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="px-5 py-4 text-right relative">
        <div className="flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenuId(activeMenuId === course.id ? null : course.id);
            }}
            className="p-1.5 rounded-lg border border-transparent hover:border-[#E3DFD6] dark:hover:border-zinc-700 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 text-[#6B6660] dark:text-zinc-400 transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {activeMenuId === course.id && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setActiveMenuId(null)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  className="absolute right-12 top-2 mt-1 w-36 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 shadow-lg z-30 text-left"
                >
                  <Link
                    href={`/courses/${course.id}`}
                    target="_blank"
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#6B6660] dark:text-zinc-300 hover:text-[#1C1B19] dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Course
                  </Link>
                  <Link
                    href={`/admin/courses/${course.id}/edit`}
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
