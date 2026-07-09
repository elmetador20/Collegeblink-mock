"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { getDrawerItems } from "@/lib/navigation-config";
import {
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export default function MobileDrawer({ isOpen, onClose, isAdmin = false }: MobileDrawerProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = isAdmin ? "admin" : "user";
  const items = getDrawerItems(role);
  
  const x = useMotionValue(0);
  const handleDragEnd = (_: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -50) {
      onClose();
    }
  };

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
                    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-white dark:bg-[#121214] z-50 shadow-2xl md:hidden"
          >
            <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5">
                <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter">Menu</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95"
                >
                  <X className="h-4 w-4 text-gray-900 dark:text-white" />
                </button>
              </div>

              <div className="p-4 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                    <span className="text-white font-black text-sm uppercase">
                      {session?.user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900 dark:text-white uppercase">
                      {session?.user?.name || "Guest"}
                    </p>
                    <p className="text-[10px] font-black text-accent uppercase tracking-wider">
                      {isAdmin ? "Admin" : "User"}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group active:scale-95",
                        active
                          ? "bg-accent/10 text-accent"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        active ? "scale-110" : "group-hover:scale-110"
                      )} />
                      <span className="flex-1 text-[10px] font-black uppercase tracking-wider">{item.name}</span>
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-all duration-300",
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      )} />
                    </Link>
                  );
                })}
              </nav>

                            <div className="p-4 border-t border-gray-100 dark:border-white/5">
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 group active:scale-95"
                >
                  <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="flex-1 text-[10px] font-black uppercase tracking-wider text-left">Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
