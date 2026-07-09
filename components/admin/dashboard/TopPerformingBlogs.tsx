"use client";

import React from "react";
import Link from "next/link";
import { Eye, Clock, TrendingUp, ExternalLink } from "lucide-react";

interface BlogStat {
  id: string;
  title: string;
  views: string;
  seoScore: number;
  readTime: string;
  ctr: string;
  category: string;
}

const TOP_BLOGS: BlogStat[] = [
  { id: "b1", title: "How to Crack JEE Advanced: Tips from Top Rankers", views: "24.5K", seoScore: 92, readTime: "6 min", ctr: "4.8%", category: "Admissions" },
  { id: "b2", title: "Top 10 Engineering Colleges in India for 2025", views: "18.3K", seoScore: 88, readTime: "8 min", ctr: "3.9%", category: "Rankings" },
  { id: "b3", title: "CAT 2026: Achieve a 99+ Percentile Roadmap", views: "12.1K", seoScore: 85, readTime: "7 min", ctr: "3.2%", category: "MBA Prep" },
  { id: "b4", title: "The Rise of AI & Data Science in B.Tech", views: "9.8K", seoScore: 79, readTime: "5 min", ctr: "2.7%", category: "Trends" },
];

function SeoScoreBar({ score }: { score: number }) {
  const color = score >= 90 ? "bg-emerald-500" : score >= 75 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden w-16">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tabular-nums">{score}</span>
    </div>
  );
}

export function TopPerformingBlogs() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <TrendingUp className="h-4 w-4 text-indigo-500" />
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Top Performing Blogs</h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Ranked by views, SEO score and CTR</p>
        </div>
        <Link href="/admin/blogs" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1">
          View all <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800">
              <th className="px-6 py-3">Article</th>
              <th className="px-4 py-3">Views</th>
              <th className="px-4 py-3 min-w-[120px]">SEO Score</th>
              <th className="px-4 py-3">Read Time</th>
              <th className="px-4 py-3">CTR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/80">
            {TOP_BLOGS.map((blog, idx) => (
              <tr key={blog.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3 min-w-[200px] max-w-[280px]">
                    <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600 w-4 shrink-0">#{idx + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1">{blog.title}</p>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">{blog.category}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    <Eye className="h-3.5 w-3.5 text-zinc-400" />
                    {blog.views}
                  </div>
                </td>
                <td className="px-4 py-3"><SeoScoreBar score={blog.seoScore} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <Clock className="h-3 w-3" />{blog.readTime}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{blog.ctr}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
