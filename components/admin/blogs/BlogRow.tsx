"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Flame, Calendar, MoreVertical, Eye, Edit, Copy, Trash2 } from "lucide-react";

interface BlogRowProps {
  blog: any;
  isSelected: boolean;
  onToggleSelect: () => void;
  seoScore: number;
  status: string;
  authorName: string;
  viewsCount: number;
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function BlogRow({
  blog,
  isSelected,
  onToggleSelect,
  seoScore,
  status,
  authorName,
  viewsCount,
  activeMenuId,
  setActiveMenuId,
  onDuplicate,
  onDelete,
}: BlogRowProps) {
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

      {/* Image Thumbnail Preview */}
      <td className="px-5 py-4">
        <div className="h-10 w-16 rounded-md overflow-hidden bg-[#FAF8F4] dark:bg-zinc-800 border border-[#E3DFD6] dark:border-zinc-700 relative">
          {blog.image ? (
            <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-zinc-300 dark:text-zinc-700">
              <ImageIcon className="h-4 w-4" />
            </div>
          )}
        </div>
      </td>

      {/* Title & Reading Time */}
      <td className="px-5 py-4">
        <div className="font-semibold text-[#1C1B19] dark:text-zinc-200 text-sm max-w-sm leading-snug line-clamp-2">
          {blog.title}
        </div>
        <div className="flex items-center gap-2 mt-1 text-[10px] text-[#6B6660] dark:text-zinc-400">
          <span className="font-mono">{blog.slug || blog.id}</span>
          <span>•</span>
          <span>{blog.readTime || "5 min read"}</span>
        </div>
      </td>

      {/* Category */}
      <td className="px-5 py-4">
        <span className="inline-flex items-center rounded-lg bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-bold text-[#6B6660] dark:text-zinc-300">
          {blog.category}
        </span>
      </td>

      {/* Author */}
      <td className="px-5 py-4 text-xs font-medium text-[#1C1B19] dark:text-zinc-300">
        {authorName}
      </td>

      {/* Views */}
      <td className="px-5 py-4 text-center text-xs font-semibold text-[#6B6660] dark:text-zinc-400">
        {viewsCount.toLocaleString()}
      </td>

      {/* SEO Score Badge */}
      <td className="px-5 py-4 text-center">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-bold rounded-lg px-2 py-0.5 border shadow-sm ${
            seoScore >= 80
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30"
              : seoScore >= 50
              ? "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30"
              : "bg-red-50 text-red-700 border-red-200/50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30"
          }`}
        >
          <Flame className="h-3 w-3" />
          {seoScore}/100
        </span>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-bold rounded-full px-2.5 py-0.5 border tracking-wider ${
            status === "Published"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30"
              : status === "Scheduled"
              ? "bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30"
              : "bg-zinc-100 text-[#6B6660] border-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:border-zinc-700/50"
          }`}
        >
          {status}
        </span>
      </td>

      {/* Published Date */}
      <td className="px-5 py-4 text-xs text-[#6B6660] dark:text-zinc-400 font-medium whitespace-nowrap">
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
      </td>

      {/* Action trigger */}
      <td className="px-5 py-4 text-right relative">
        <div className="flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenuId(activeMenuId === blog.id ? null : blog.id);
            }}
            className="p-1.5 rounded-lg border border-transparent hover:border-[#E3DFD6] dark:hover:border-zinc-700 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 text-[#6B6660] dark:text-zinc-400 transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {activeMenuId === blog.id && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setActiveMenuId(null)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  className="absolute right-12 top-2 mt-1 w-36 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 shadow-lg z-30 text-left"
                >
                  <Link
                    href={`/blogs/${blog.slug}`}
                    target="_blank"
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#6B6660] dark:text-zinc-300 hover:text-[#1C1B19] dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Read Article
                  </Link>
                  <Link
                    href={`/admin/blogs/${blog.id}/edit`}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#6B6660] dark:text-zinc-300 hover:text-[#1C1B19] dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit Content
                  </Link>
                  <button
                    onClick={onDuplicate}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#6B6660] dark:text-zinc-300 hover:text-[#1C1B19] dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Clone Post
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
