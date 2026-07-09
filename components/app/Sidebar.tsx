"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GraduationCap,
  Scale,
  User,
  Settings,
  Shield,
  BarChart3,
  CreditCard,
  Brain,
  Bell,
  LogOut
} from "lucide-react";

const userNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/colleges", label: "Explore Colleges", icon: GraduationCap },
  { href: "/compare", label: "Compare Tools", icon: Scale },
  { href: "/dashboard/profile", label: "My Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const adminSections = [
  {
    title: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/colleges", label: "Colleges", icon: GraduationCap },
      { href: "/admin/smart", label: "Smart Settings", icon: Brain },
    ],
  },
  {
    title: "Management",
    items: [
      { href: "/admin/users", label: "Users", icon: User },
      { href: "/admin/payments", label: "Payments", icon: CreditCard },
      { href: "/admin/notifications", label: "Notifications", icon: Bell },
    ],
  },
];

export default function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  return (
    <div className="w-[260px] h-screen bg-white dark:bg-[#0a0a0b] flex flex-col shrink-0 border-r border-zinc-200 dark:border-white/5 shadow-sm overflow-hidden relative z-50">
      
      
      <div className="flex items-center h-20 px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform duration-300">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">CollegeBlink</span>
        </Link>
      </div>

      
      <nav className="flex-1 overflow-y-auto px-4 space-y-6 py-4 scrollbar-hide">
        {isAdmin ? (
          <div className="space-y-5">
            {adminSections.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group",
                          active
                            ? "bg-accent text-white"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                        )}
                      >
                        <Icon className={cn("h-4 w-4", active ? "text-white" : "text-zinc-400 group-hover:text-accent")} />
                        <span>{item.label}</span>
                        {active && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-zinc-100 dark:border-white/5 space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-150"
              >
                <LogOut className="h-4 w-4" />
                <span>Exit Admin</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Navigation
            </h3>
            <div className="space-y-1">
              {userNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group",
                      active
                        ? "bg-accent text-white"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", active ? "text-white" : "text-zinc-400 group-hover:text-accent")} />
                    <span>{item.label}</span>
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      
      <div className="p-4 border-t border-zinc-100 dark:border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Shield className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">System Status</span>
            <span className="text-sm font-medium text-zinc-900 dark:text-white">Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}

