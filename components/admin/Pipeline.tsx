"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PipelineItem {
  name: string;
  applications: number;
  progress: number;
  status: "High Demand" | "Active" | "Growing" | "Normal";
}

interface PipelineProps {
  items?: PipelineItem[];
  loading?: boolean;
}

const defaultItems: PipelineItem[] = [
  { name: "IIT Delhi", applications: 245, progress: 78, status: "High Demand" },
  { name: "IIT Bombay", applications: 198, progress: 65, status: "Active" },
  { name: "BITS Pilani", applications: 156, progress: 52, status: "Growing" },
  { name: "VIT Vellore", applications: 134, progress: 45, status: "Active" },
];

const statusColors = {
  "High Demand": "bg-accent text-white shadow-lg shadow-accent/20",
  "Active": "bg-accent/10 text-accent dark:text-accent border-accent/20",
  "Growing": "bg-white dark:bg-white/5 text-gray-400 border-gray-200 dark:border-white/10",
  "Normal": "bg-muted text-muted-foreground",
};

export default function Pipeline({ items = defaultItems, loading }: PipelineProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-[#121214] rounded-2xl p-6 border-2 border-gray-100 dark:border-white/5 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-white/5 rounded-lg w-40 mb-5" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
             <div key={i} className="h-16 bg-gray-50 dark:bg-white/[0.02] rounded-xl w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#121214] rounded-lg border border-gray-200 dark:border-white/10 h-full flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">College Pipeline</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Application statistics</p>
        </div>
        <Building2 className="h-4 w-4 text-accent" />
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
        {items.map((item) => (
          <div key={item.name} className="space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent transition-colors">{item.name}</span>
                <Badge className={cn("rounded-md font-medium text-xs px-2 py-0.5 border", statusColors[item.status])}>
                  {item.status}
                </Badge>
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {item.applications} applications
              </span>
            </div>
            
            <div className="space-y-1.5">
              <div className="relative h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-y-0 left-0 bg-accent rounded-full"
                 />
              </div>
              <div className="flex justify-between items-center">
                 <p className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                    Capacity
                 </p>
                 <span className="text-xs font-medium text-accent leading-none">{item.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
