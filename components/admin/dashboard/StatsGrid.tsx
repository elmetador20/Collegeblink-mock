"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Building2, BookOpen, FileText, Users, MessageSquare, FileEdit, UserPlus, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCard {
  label: string;
  count: number | string;
  change: string;
  changeType: "up" | "down" | "neutral";
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  sparkline: number[];
  accent: string;
}

interface StatsGridProps {
  collegesCount: number;
  coursesCount: number;
  blogsCount: number;
  activeUsersCount: number;
  pendingReviewsCount: number;
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 24, pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatsGrid({ collegesCount, coursesCount, blogsCount, activeUsersCount, pendingReviewsCount }: StatsGridProps) {
  const stats: StatCard[] = [
    { label: "Total Colleges", count: collegesCount, change: "+12.3%", changeType: "up", description: "Active institutes", href: "/admin/colleges", icon: Building2, sparkline: [2, 4, 3, 6, 5, 8, 7, 10, 9, 12], accent: "#6366f1" },
    { label: "Total Courses", count: coursesCount, change: "+4.5%", changeType: "up", description: "Approved programs", href: "/admin/courses", icon: BookOpen, sparkline: [5, 8, 6, 9, 11, 10, 13, 15, 12, 18], accent: "#f59e0b" },
    { label: "Total Blogs", count: blogsCount, change: "+8.2%", changeType: "up", description: "Published articles", href: "/admin/blogs", icon: FileText, sparkline: [3, 5, 4, 7, 6, 9, 8, 11, 10, 14], accent: "#10b981" },
    { label: "Total Users", count: activeUsersCount, change: "+18.7%", changeType: "up", description: "Platform members", href: "/admin/users", icon: Users, sparkline: [10, 14, 12, 18, 16, 22, 20, 26, 24, 30], accent: "#3b82f6" },
    { label: "Pending Reviews", count: pendingReviewsCount, change: "-15.4%", changeType: "down", description: "Awaiting approval", href: "/admin/colleges", icon: MessageSquare, sparkline: [20, 18, 22, 16, 19, 14, 17, 12, 15, 10], accent: "#f43f5e" },
    { label: "Draft Articles", count: 7, change: "0%", changeType: "neutral", description: "Unpublished posts", href: "/admin/blogs", icon: FileEdit, sparkline: [4, 5, 6, 5, 7, 6, 8, 7, 8, 7], accent: "#8b5cf6" },
    { label: "Joined Today", count: 14, change: "+40%", changeType: "up", description: "New registrations", href: "/admin/users", icon: UserPlus, sparkline: [3, 5, 4, 8, 6, 10, 8, 12, 11, 14], accent: "#06b6d4" },
    { label: "Monthly Growth", count: "23.4%", change: "+2.1%", changeType: "up", description: "vs last month", href: "/admin", icon: TrendingUp, sparkline: [12, 15, 14, 18, 17, 20, 19, 22, 21, 24], accent: "#10b981" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isUp = stat.changeType === "up";
        const isDown = stat.changeType === "down";
        return (
          <Link key={stat.label} href={stat.href} className="group block">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110" style={{ background: `${stat.accent}18`, color: stat.accent }}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className={cn("inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold border", isUp ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-900/40" : isDown ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200/60 dark:border-rose-900/40" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700")}>
                  {isUp ? <ArrowUpRight className="h-2.5 w-2.5" /> : isDown ? <ArrowDownRight className="h-2.5 w-2.5" /> : null}
                  {stat.change}
                </span>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">{stat.count}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-none">{stat.description}</p>
                <Sparkline data={stat.sparkline} color={stat.accent} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
