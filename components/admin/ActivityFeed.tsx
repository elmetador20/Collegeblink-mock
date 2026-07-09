"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, CreditCard, BarChart3, FileText, BookOpen, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Activity {
  id: string;
  type: "user" | "college" | "payment" | "analytics" | "blog" | "course" | "approve";
  user: string;
  action: string;
  time: string;
}

interface ActivityFeedProps {
  activities?: Activity[];
  loading?: boolean;
}

const defaultActivities: Activity[] = [
  { id: "1", type: "user", user: "Rahul Kumar", action: "signed up", time: "2 min ago" },
  { id: "2", type: "college", user: "Priya Singh", action: "applied to IIT Delhi", time: "5 min ago" },
  { id: "3", type: "payment", user: "Amit Shah", action: "upgraded to Premium", time: "12 min ago" },
  { id: "4", type: "analytics", user: "System", action: "generated weekly report", time: "1 hour ago" },
  { id: "5", type: "user", user: "Neha Gupta", action: "compared 3 colleges", time: "2 hours ago" },
];

const typeIcons = {
  user: Users,
  college: Building2,
  payment: CreditCard,
  analytics: BarChart3,
  blog: FileText,
  course: BookOpen,
  approve: CheckSquare,
};

const typeColors = {
  user: "bg-[#1F3A5C] text-white",
  college: "bg-[#1F3A5C] text-white",
  payment: "bg-[#1F3A5C] text-white",
  analytics: "bg-[#1F3A5C] text-white",
  blog: "bg-[#1F3A5C] text-white",
  course: "bg-[#1F3A5C] text-white",
  approve: "bg-[#1F3A5C] text-white",
};

export default function ActivityFeed({ activities = defaultActivities, loading }: ActivityFeedProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-[#121214] rounded-2xl p-5 border-2 border-gray-100 dark:border-white/5 animate-pulse h-full">
        <div className="h-5 bg-gray-200 dark:bg-white/5 rounded-lg w-28 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-white/5 shrink-0" />
                <div className="flex-1 space-y-1">
                   <div className="h-2.5 bg-gray-200 dark:bg-white/5 rounded w-3/4" />
                   <div className="h-1.5 bg-gray-200 dark:bg-white/5 rounded w-1/4" />
                </div>
             </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#121214] rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden h-full flex flex-col">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-white/5 flex flex-row items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Activity Feed</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Recent events</p>
        </div>
        <div className="flex items-center gap-2">
             <div className="flex items-center gap-1.5 bg-emerald-500 rounded px-2 py-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-xs font-medium text-white">Live</span>
             </div>
        </div>
      </div>

      <div className="p-5 flex-1 relative overflow-hidden">
                <div className="absolute left-[34px] top-6 bottom-6 w-0.5 bg-gray-100 dark:bg-white/5" />
        
        <div className="space-y-4 relative">
          {activities.map((activity, idx) => {
            const Icon = typeIcons[activity.type];
            return (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
                className="flex items-start gap-4 group"
              >
                <div className={cn("h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10", typeColors[activity.type])}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between mb-0.5">
                     <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.user}
                     </p>
                     <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                    {activity.action}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
