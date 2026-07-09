"use client";

import React from "react";
import Link from "next/link";
import { mockBlogs } from "@/mock/blogs";
import { Calendar, Clock, Edit2, FileText, ExternalLink } from "lucide-react";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function RecentBlogs() {
  const recentBlogs = [...mockBlogs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <FileText className="h-4 w-4 text-purple-500" />
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Recent Drafts & Posts</h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Latest blog articles and their status</p>
        </div>
        <Link href="/admin/blogs" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1">
          All blogs <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {recentBlogs.map((blog) => (
          <div key={blog.id} className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/20 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/40 transition-all duration-150 group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="inline-flex items-center rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold px-1.5 py-0.5 uppercase shrink-0">
                  {blog.category}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                  <Calendar className="h-2.5 w-2.5" />{formatDate(blog.createdAt)}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                  <Clock className="h-2.5 w-2.5" />{blog.readTime}
                </div>
              </div>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1">{blog.title}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase border ${blog.published ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40" : "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40"}`}>
                <div className={`w-1 h-1 rounded-full ${blog.published ? "bg-emerald-500" : "bg-amber-500"}`} />
                {blog.published ? "Published" : "Draft"}
              </span>
              <Link href={`/admin/blogs/edit/${blog.id}`} className="h-6 w-6 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 flex items-center justify-center transition-all duration-150 opacity-0 group-hover:opacity-100">
                <Edit2 className="h-2.5 w-2.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
