"use client";

import React from "react";
import Link from "next/link";
import {
  Plus, GraduationCap, PenTool, Users, Star, Download, HardDrive, Settings, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Action {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  accent: string;
  bg: string;
}

const PRIMARY_ACTIONS: Action[] = [
  { label: "Add College", description: "List a new institute", icon: Plus, href: "/admin/colleges/new", accent: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/30" },
  { label: "Add Course", description: "Create a new program", icon: GraduationCap, href: "/admin/courses/new", accent: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/40 hover:bg-amber-100 dark:hover:bg-amber-900/30" },
  { label: "Add Blog", description: "Write & publish article", icon: PenTool, href: "/admin/blogs/new", accent: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/30" },
  { label: "Manage Users", description: "Review user base", icon: Users, href: "/admin/users", accent: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/30" },
];

const SECONDARY_ACTIONS: Action[] = [
  { label: "Reviews", description: "Moderate pending reviews", icon: Star, href: "/admin/colleges", accent: "text-rose-600 dark:text-rose-400", bg: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50" },
  { label: "Export CSV", description: "Download data snapshot", icon: Download, href: "/admin", accent: "text-zinc-700 dark:text-zinc-300", bg: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50" },
  { label: "Backup Data", description: "Create manual backup", icon: HardDrive, href: "/admin", accent: "text-zinc-700 dark:text-zinc-300", bg: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50" },
  { label: "Settings", description: "System configuration", icon: Settings, href: "/admin/settings", accent: "text-zinc-700 dark:text-zinc-300", bg: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50" },
];

function ActionCard({ action }: { action: Action }) {
  const Icon = action.icon;
  return (
    <Link href={action.href} className={cn("flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 group", action.bg)}>
      <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", action.accent, "bg-current/10")}>
        <Icon className={cn("h-4 w-4", action.accent)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">{action.label}</p>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">{action.description}</p>
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
    </Link>
  );
}

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <div className="mb-5">
        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-0.5">Quick Actions</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Common administrative tasks</p>
      </div>

      <div className="space-y-2 mb-4">
        {PRIMARY_ACTIONS.map((a) => <ActionCard key={a.label} action={a} />)}
      </div>

      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">System</p>
        {SECONDARY_ACTIONS.map((a) => <ActionCard key={a.label} action={a} />)}
      </div>
    </div>
  );
}
