"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Users, Building2, TrendingUp, DollarSign, ArrowUpRight } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalColleges: number;
  totalApplications: number;
  revenue: number;
}

interface StatsCardsProps {
  stats?: Stats;
  loading?: boolean;
}

const statConfig = [
  { key: "totalUsers" as const, title: "Total Users", icon: Users, color: "text-accent" },
  { key: "totalColleges" as const, title: "Colleges", icon: Building2, color: "text-accent" },
  { key: "totalApplications" as const, title: "Applications", icon: TrendingUp, color: "text-accent" },
  { key: "revenue" as const, title: "Revenue", icon: DollarSign, color: "text-accent", format: (v: number) => `₹${(v / 1000).toFixed(0)}K` },
];

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-8 bg-gray-50 dark:bg-white/5 rounded-2xl border-2 border-gray-100 dark:border-white/5 shadow-sm">
            <Skeleton className="h-4 w-20 mb-3" />
            <Skeleton className="h-10 w-28" />
          </div>
        ))}
      </div>
    );
  }

  const displayStats = stats || { totalUsers: 0, totalColleges: 0, totalApplications: 0, revenue: 0 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map((stat) => {
        const Icon = stat.icon;
        const value = displayStats[stat.key];
        const displayValue = stat.format ? stat.format(value) : value.toLocaleString();

        return (
          <div
            key={stat.key}
            className="p-4 bg-white dark:bg-[#121214] rounded-lg border border-gray-200 dark:border-white/10 hover:border-accent/20 transition-all duration-200"
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 font-medium text-xs">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+12%</span>
                </div>
              </div>
              
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.title}</p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white tabular-nums leading-none">{displayValue}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
