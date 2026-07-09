"use client";

import React, { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { LayoutGrid } from "lucide-react";

interface ContentDistributionChartProps {
  blogs: number;
  courses: number;
  colleges: number;
}

const COLORS = ["#6366f1", "#f59e0b", "#10b981"];
const LABELS = ["Blogs", "Courses", "Colleges"];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 shadow-xl text-xs backdrop-blur-sm">
      <p className="font-bold text-zinc-800 dark:text-zinc-100">{name}</p>
      <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">{value} items</p>
    </div>
  );
};

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.08) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function ContentDistributionChart({ blogs, courses, colleges }: ContentDistributionChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const data = [
    { name: "Blogs", value: blogs || 1 },
    { name: "Courses", value: courses || 1 },
    { name: "Colleges", value: colleges || 1 },
  ];

  const total = data.reduce((s, d) => s + d.value, 0);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 h-[340px] animate-pulse">
        <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
        <div className="h-3 w-52 bg-zinc-100 dark:bg-zinc-800 rounded mb-6" />
        <div className="h-[220px] bg-zinc-100 dark:bg-zinc-800 rounded-full mx-auto w-[220px]" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <LayoutGrid className="h-4 w-4 text-amber-500" />
        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Content Distribution</h3>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Breakdown of all content types</p>

      <div className="flex-1 flex flex-col">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} innerRadius={45}
              dataKey="value" labelLine={false} label={renderLabel} strokeWidth={2} stroke="transparent">
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {data.map((d, idx) => (
            <div key={d.name} className="text-center">
              <div className="w-2.5 h-2.5 rounded-full mx-auto mb-1" style={{ background: COLORS[idx] }} />
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">{d.name}</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100">{d.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
