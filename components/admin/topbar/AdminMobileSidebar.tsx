"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { adminNavItems } from "@/lib/admin-nav";
import { LayoutDashboard, Building2, BookOpen, FileText, Users, Settings, ArrowLeft, Shield, Zap } from "lucide-react";

const iconMap: Record<string, any> = {
  Dashboard: LayoutDashboard,
  Colleges: Building2,
  Courses: BookOpen,
  Blogs: FileText,
  Users: Users,
  Settings: Settings,
};

export function AdminMobileSidebar({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: { name?: string | null; email?: string | null } }) {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Close sidebar"
          />
          <motion.aside
            className="fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-white dark:bg-zinc-950 border-r border-[#E3DFD6] dark:border-zinc-800 shadow-2xl md:hidden"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            aria-label="Admin navigation"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="border-b border-[#E3DFD6] dark:border-zinc-800 px-5 py-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F3A5C] text-white shadow-sm">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1C1B19] dark:text-zinc-100">Admin Console</p>
                    <p className="text-[10px] uppercase tracking-widest text-[#8C6422] mt-0.5">Records & Registry</p>
                  </div>
                </div>
                <nav className="p-4 space-y-1.5">
                  {adminNavItems.map((item) => {
                    const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
                    const Icon = iconMap[item.label] || LayoutDashboard;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                          active
                            ? "bg-[#1F3A5C]/5 text-[#1F3A5C] border-l-4 border-[#1F3A5C] pl-3"
                            : "text-[#6B6660] hover:text-[#1C1B19] hover:bg-[#FAF8F4]/80 border-l-4 border-transparent"
                        }`}
                      >
                        <Icon className={`h-4.5 w-4.5 ${active ? "text-[#1F3A5C]" : "text-[#6B6660]/60"}`} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="border-t border-[#E3DFD6] dark:border-zinc-800 p-4 space-y-4">
                <div className="flex items-center gap-2.5 rounded-xl bg-emerald-500/5 px-3 py-2 text-emerald-700 dark:text-emerald-300">
                  <Zap className="h-4 w-4 shrink-0 animate-pulse" />
                  <span className="text-[11px] font-semibold">System Status: <span className="font-bold">Online</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-tr from-[#1F3A5C] to-[#2E5A88] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {(user.name || user.email || "A").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[#1C1B19] dark:text-zinc-200">{user.name ?? "Admin user"}</p>
                    <p className="truncate text-[10px] font-medium text-[#6B6660] dark:text-zinc-500 mt-0.5">{user.email ?? "admin@collegeblink.com"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
