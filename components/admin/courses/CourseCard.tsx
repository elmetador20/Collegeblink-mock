"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Building2, Edit, Copy, Trash2 } from "lucide-react";

interface CourseCardProps {
  course: any;
  isSelected: boolean;
  onToggleSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function CourseCard({
  course,
  isSelected,
  onToggleSelect,
  onDuplicate,
  onDelete,
}: CourseCardProps) {
  const isActive = course.active !== false;

  return (
    <motion.div
      layout
      className={`rounded-xl border p-5 bg-white dark:bg-zinc-900/50 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group ${
        isSelected ? "border-[#1F3A5C] ring-2 ring-[#1F3A5C]/10" : "border-[#E3DFD6] dark:border-zinc-800"
      }`}
    >
      <div className="space-y-3">
        {/* Header Degree / Status */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#1F3A5C] dark:text-zinc-300 bg-[#1F3A5C]/5 dark:bg-zinc-800 px-2 py-0.5 rounded-lg border border-[#1F3A5C]/10 dark:border-zinc-700 font-sans">
            {course.degree}
          </span>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="rounded border-[#E3DFD6] dark:border-zinc-700 text-[#1F3A5C] focus:ring-[#1F3A5C]/35 cursor-pointer h-4 w-4"
            />
            <span
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-emerald-500 animate-pulse" : "bg-zinc-300"
              }`}
            />
          </div>
        </div>

        {/* Course Title */}
        <div>
          <h4 className="text-sm font-bold text-[#1C1B19] dark:text-zinc-100 group-hover:text-[#1F3A5C] transition-colors leading-snug">
            {course.name}
          </h4>
          {course.description && (
            <p className="text-[11px] text-[#6B6660] dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          )}
        </div>

        {/* Duration and Colleges Offered */}
        <div className="flex items-center justify-between gap-2 pt-2 text-[11px] text-[#6B6660] dark:text-zinc-500 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{course.duration} Years</span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>{course.colleges?.length || 0} colleges</span>
          </div>
        </div>

        {/* Prospects List */}
        {course.careerProspects && course.careerProspects.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1.5">
            {course.careerProspects.slice(0, 3).map((job: string) => (
              <span
                key={job}
                className="text-[9px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-[#6B6660] px-1.5 py-0.5 rounded font-sans"
              >
                {job}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions Row */}
      <div className="flex items-center justify-end gap-2.5 pt-4 mt-4 border-t border-[#E3DFD6]/60 dark:border-zinc-800/60">
        <Link
          href={`/admin/courses/${course.id}/edit`}
          className="p-1.5 rounded-lg border border-[#E3DFD6] dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-[#6B6660] hover:text-[#1C1B19] transition-all"
          title="Edit"
        >
          <Edit className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={onDuplicate}
          className="p-1.5 rounded-lg border border-[#E3DFD6] dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-[#6B6660] hover:text-[#1C1B19] transition-all"
          title="Duplicate"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg border border-rose-100 hover:bg-rose-50 text-[#A23B2E] transition-all"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
