"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BarChart3, 
  Building2, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  Shield, 
  Sparkles,
  Zap,
  TrendingUp,
  Database,
  BrainCircuit
} from "lucide-react";

const sections = [
  {
    title: "Overview",
    links: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
    ],
  },
  {
    title: "Content",
    links: [
      { name: "Colleges", href: "/admin/colleges", icon: Building2 },
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Payments", href: "/admin/payments", icon: CreditCard },
    ],
  },
  {
    title: "Settings",
    links: [
      { name: "Smart", href: "/admin/smart", icon: BrainCircuit },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[260px] h-screen bg-white dark:bg-[#0a0a0b] border-r border-zinc-200 dark:border-white/5 flex flex-col shrink-0 shadow-sm overflow-hidden relative z-50">
      
            <div className="flex items-center h-20 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Admin</h1>
          </div>
        </div>
      </div>

      
              {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.links.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(`${link.href}/`));
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group",
                      active
                        ? "bg-accent text-white"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", active ? "text-white" : "text-zinc-400 group-hover:text-accent")} />
                    <span>{link.name}</span>
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-150"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit Admin</span>
        </Link>

      <div className="p-4 border-t border-zinc-100 dark:border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Zap className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">System Status</span>
            <span className="text-sm font-medium text-zinc-900 dark:text-white">Online</span>
          </div>
        </div>
      </div>

    </div>
  );
}
