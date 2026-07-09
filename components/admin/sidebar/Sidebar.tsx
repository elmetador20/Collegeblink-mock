"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarWorkspace } from "./SidebarWorkspace";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarFavorites } from "./SidebarFavorites";
import { SidebarRecent } from "./SidebarRecent";
import { SidebarFooter } from "./SidebarFooter";
import { CommandPalette } from "@/components/admin/topbar/CommandPalette";

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null };
}

function SidebarBody({ user, collapsed, toggle, onOpenSearch, closeMobile }: {
  user: AdminSidebarProps["user"];
  collapsed: boolean;
  toggle: () => void;
  onOpenSearch: () => void;
  closeMobile?: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800">
      <SidebarLogo collapsed={collapsed} />
      <SidebarWorkspace collapsed={collapsed} />

      <div className="py-2 space-y-1">
        <SidebarSearch collapsed={collapsed} onOpen={onOpenSearch} />
      </div>

      <div className="flex-1 overflow-y-auto py-2 space-y-4 scrollbar-thin">
        <SidebarNavigation collapsed={collapsed} onItemClick={closeMobile} />
        <SidebarFavorites collapsed={collapsed} />
        <SidebarRecent collapsed={collapsed} />
      </div>

      <SidebarFooter user={user} collapsed={collapsed} onToggle={toggle} />
    </div>
  );
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const { collapsed, toggle, mobileOpen, openMobile, closeMobile } = useSidebar();
  const palette = useCommandPalette();

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden md:block shrink-0 h-screen overflow-hidden"
      >
        <SidebarBody user={user} collapsed={collapsed} toggle={toggle} onOpenSearch={palette.toggle} />
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64 md:hidden"
            >
              <SidebarBody user={user} collapsed={false} toggle={closeMobile} onOpenSearch={palette.toggle} closeMobile={closeMobile} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CommandPalette open={palette.open} onClose={palette.close} query={palette.query} onQueryChange={palette.setQuery} />
    </>
  );
}
