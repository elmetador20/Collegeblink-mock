"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "@/lib/admin-nav";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  FileText,
  Users,
  ArrowLeft,
  Shield,
  Zap,
  Settings,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Dashboard: LayoutDashboard,
  Colleges: Building2,
  Courses: BookOpen,
  Blogs: FileText,
  Users: Users,
  Settings: Settings,
};

export function AdminSidebar({
  user,
}: {
  user: { name?: string | null; email?: string | null };
}) {
  const pathname = usePathname();

  return (
    <aside className="relative h-screen w-64 shrink-0 border-r border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between select-none">
      
      {/* Brand Header */}
      <div>
        <div className="border-b border-[#E3DFD6] dark:border-zinc-800 px-6 py-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F3A5C] text-white shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="font-serif text-base font-bold text-[#1C1B19] dark:text-zinc-100 leading-tight">Admin Console</p>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#8C6422] mt-0.5">Records & Registry</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 py-6 space-y-1.5">
          {adminNavItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
            const Icon = iconMap[item.label] || LayoutDashboard;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group active:scale-98 ${
                  active
                    ? "bg-[#1F3A5C]/5 text-[#1F3A5C] border-l-4 border-[#1F3A5C] pl-3 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-300"
                    : "text-[#6B6660] dark:text-zinc-400 hover:text-[#1C1B19] dark:hover:text-zinc-200 hover:bg-[#FAF8F4]/80 dark:hover:bg-zinc-900/50 border-l-4 border-transparent"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 transition-colors ${
                  active ? "text-[#1F3A5C] dark:text-zinc-200" : "text-[#6B6660]/60 dark:text-zinc-500 group-hover:text-[#1C1B19] dark:group-hover:text-zinc-200"
                }`} />
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#1F3A5C] dark:bg-zinc-300 animate-pulse" />
                )}
              </Link>
            );
          })}

          <div className="pt-4 px-3">
            <div className="h-px bg-[#E3DFD6] dark:bg-zinc-800" />
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#6B6660] dark:text-zinc-400 hover:text-[#A23B2E] hover:bg-rose-50/50 dark:hover:bg-rose-950/10 transition-all duration-200 group active:scale-98"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-[#6B6660]/60 group-hover:text-[#A23B2E] transition-colors" />
            <span>Back to Site</span>
          </Link>
        </nav>
      </div>

      {/* Profile & Footer Status Info */}
      <div className="p-4 border-t border-[#E3DFD6] dark:border-zinc-800 space-y-4">
        {/* Status indicator */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] border border-emerald-500/10 text-emerald-700 dark:text-emerald-400">
          <Zap className="h-4 w-4 shrink-0 animate-pulse" />
          <div className="text-[11px] font-semibold">
            System Status: <span className="font-bold text-emerald-800 dark:text-emerald-300">Online</span>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-tr from-[#1F3A5C] to-[#2E5A88] flex items-center justify-center text-xs font-bold text-white shadow-sm">
            {(user.name || user.email || "A").slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-[#1C1B19] dark:text-zinc-200 leading-tight">
              {user.name ?? "Admin user"}
            </p>
            <p className="truncate text-[10px] font-medium text-[#6B6660] dark:text-zinc-500 mt-0.5">
              {user.email ?? "admin@collegeblink.com"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}