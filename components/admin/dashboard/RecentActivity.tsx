"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  BookOpen,
  FileText,
  CreditCard,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "user" | "college" | "course" | "blog" | "payment" | "analytics";
  user: string;
  action: string;
  time: string;
  createdAt: Date;
}

interface RecentActivityProps {
  activities: Activity[];
}

const typeConfig = {
  user: {
    icon: Users,
    colorClass: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50",
  },
  college: {
    icon: Building2,
    colorClass: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",
  },
  course: {
    icon: BookOpen,
    colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50",
  },
  blog: {
    icon: FileText,
    colorClass: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/50",
  },
  payment: {
    icon: CreditCard,
    colorClass: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-400 dark:border-pink-900/50",
  },
  analytics: {
    icon: BarChart3,
    colorClass: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800",
  },
};

export function RecentActivity({ activities }: RecentActivityProps) {
  const now = new Date();

  // Safely parse date and group
  const todayList: Activity[] = [];
  const yesterdayList: Activity[] = [];
  const earlierList: Activity[] = [];

  activities.forEach((act) => {
    const created = new Date(act.createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24) {
      todayList.push(act);
    } else if (diffHours < 48) {
      yesterdayList.push(act);
    } else {
      earlierList.push(act);
    }
  });

  const renderGroup = (title: string, list: Activity[]) => {
    if (list.length === 0) return null;

    return (
      <div className="space-y-3">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8C6422] dark:text-amber-500">
          {title}
        </h4>
        <div className="space-y-4">
          {list.map((activity, idx) => {
            const config = typeConfig[activity.type] || typeConfig.analytics;
            const Icon = config.icon;

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-4 group relative"
              >
                {/* Colored Badge Node */}
                <div
                  className={cn(
                    "h-8 w-8 rounded-full border flex items-center justify-center shrink-0 z-10 transition-transform duration-200 group-hover:scale-110",
                    config.colorClass
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-xs font-bold text-[#1C1B19] dark:text-zinc-200">
                      {activity.user}
                    </p>
                    <span className="text-[10px] text-[#6B6660] dark:text-zinc-500 font-medium shrink-0">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6660] dark:text-zinc-400 leading-relaxed font-sans">
                    {activity.action}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 mb-5">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Recent Activity
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-1">
            Timeline of operations
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-full px-2.5 py-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Live Feed
          </span>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {/* Continuous Timeline Line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-[#E3DFD6]/60 dark:bg-zinc-800/80" />

        <div className="space-y-6 relative overflow-y-auto max-h-[350px] pr-2 scrollbar-thin">
          {activities.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6B6660] dark:text-zinc-500">
              No recent activity recorded.
            </div>
          ) : (
            <>
              {renderGroup("Today", todayList)}
              {renderGroup("Yesterday", yesterdayList)}
              {renderGroup("Earlier", earlierList)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
