"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const data6Months = [
  { name: "Jan", Signups: 140, Views: 2400, Reviews: 24 },
  { name: "Feb", Signups: 220, Views: 4500, Reviews: 38 },
  { name: "Mar", Signups: 390, Views: 9800, Reviews: 56 },
  { name: "Apr", Signups: 480, Views: 12000, Reviews: 72 },
  { name: "May", Signups: 540, Views: 15400, Reviews: 89 },
  { name: "Jun", Signups: 720, Views: 19800, Reviews: 112 },
];

const data12Months = [
  ...data6Months,
  { name: "Jul", Signups: 810, Views: 21000, Reviews: 130 },
  { name: "Aug", Signups: 920, Views: 23500, Reviews: 145 },
  { name: "Sep", Signups: 1050, Views: 27000, Reviews: 168 },
  { name: "Oct", Signups: 1180, Views: 31200, Reviews: 190 },
  { name: "Nov", Signups: 1300, Views: 34500, Reviews: 210 },
  { name: "Dec", Signups: 1450, Views: 39000, Reviews: 245 },
];

export function AnalyticsChart() {
  const [mounted, setMounted] = useState(false);
  const [range, setRange] = useState<"6m" | "12m">("6m");

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = range === "6m" ? data6Months : data12Months;

  if (!mounted) {
    return (
      <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm h-[385px] flex flex-col justify-between">
        <div className="animate-pulse space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="h-[260px] bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm flex flex-col justify-between h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Monthly Analytics
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-1">
            Platform traffic and engagement details
          </p>
        </div>

        <div className="flex items-center gap-2 border border-[#E3DFD6] dark:border-zinc-800 rounded-lg p-1 bg-zinc-50 dark:bg-zinc-950/20 max-w-fit">
          <button
            onClick={() => setRange("6m")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
              range === "6m"
                ? "bg-[#1F3A5C] text-white shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                : "text-[#6B6660] hover:text-[#1C1B19] dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            6 Months
          </button>
          <button
            onClick={() => setRange("12m")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
              range === "12m"
                ? "bg-[#1F3A5C] text-white shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                : "text-[#6B6660] hover:text-[#1C1B19] dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            12 Months
          </button>
        </div>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1F3A5C" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#1F3A5C" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8C6422" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#8C6422" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E3DFD6"
              className="opacity-40 dark:hidden"
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
              className="opacity-40 hidden dark:block"
            />
            <XAxis
              dataKey="name"
              stroke="#6B6660"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6B6660"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white/95 dark:bg-zinc-950/95 border border-[#E3DFD6] dark:border-zinc-800 p-3 rounded-lg shadow-md space-y-1.5 backdrop-blur-md">
                      <p className="text-xs font-bold text-[#1C1B19] dark:text-zinc-300">
                        {payload[0].payload.name} 2025
                      </p>
                      {payload.map((item: any) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between gap-6 text-xs"
                        >
                          <span
                            className="font-medium"
                            style={{ color: item.color }}
                          >
                            {item.name}:
                          </span>
                          <span className="font-bold text-[#1C1B19] dark:text-zinc-100">
                            {item.value.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="Views"
              stroke="#8C6422"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorViews)"
            />
            <Area
              type="monotone"
              dataKey="Signups"
              stroke="#1F3A5C"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSignups)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
