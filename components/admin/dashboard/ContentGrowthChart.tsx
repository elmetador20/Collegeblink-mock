"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHLY_DATA = [
  { month: "Jan", Blogs: 3, Courses: 8, Colleges: 2 },
  { month: "Feb", Blogs: 5, Courses: 12, Colleges: 4 },
  { month: "Mar", Blogs: 8, Courses: 10, Colleges: 6 },
  { month: "Apr", Blogs: 6, Courses: 15, Colleges: 5 },
  { month: "May", Blogs: 11, Courses: 18, Colleges: 9 },
  { month: "Jun", Blogs: 14, Courses: 22, Colleges: 12 },
  { month: "Jul", Blogs: 10, Courses: 19, Colleges: 8 },
  { month: "Aug", Blogs: 17, Courses: 25, Colleges: 14 },
  { month: "Sep", Blogs: 20, Courses: 28, Colleges: 16 },
  { month: "Oct", Blogs: 16, Courses: 24, Colleges: 11 },
  { month: "Nov", Blogs: 22, Courses: 31, Colleges: 18 },
  { month: "Dec", Blogs: 26, Courses: 35, Colleges: 22 },
];

const SERIES = [
  { key: "Blogs", color: "#6366f1", label: "Blogs Created" },
  { key: "Courses", color: "#f59e0b", label: "Courses Added" },
  { key: "Colleges", color: "#10b981", label: "Colleges Added" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm min-w-[140px]">
      <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 text-xs mb-1">
          <span className="flex items-center gap-1.5 font-medium" style={{ color: p.color }}>
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            {p.dataKey}
          </span>
          <span className="font-bold text-zinc-800 dark:text-zinc-100">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export function ContentGrowthChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 h-[340px] animate-pulse">
        <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
        <div className="h-3 w-64 bg-zinc-100 dark:bg-zinc-800 rounded mb-6" />
        <div className="h-[240px] bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-indigo-500" />
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Monthly Content Growth</h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Blogs, courses and colleges added each month</p>
        </div>
        <div className="flex items-center gap-3">
          {SERIES.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
              {s.key}
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={MONTHLY_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "currentColor" }} className="text-zinc-400" tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "currentColor" }} className="text-zinc-400" tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          {SERIES.map((s) => (
            <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2.5}
              dot={{ fill: s.color, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
