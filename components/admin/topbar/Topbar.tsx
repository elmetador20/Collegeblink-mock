"use client";

import React from "react";
import { Menu, Keyboard } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { TopbarDate } from "./TopbarDate";
import { GlobalSearch } from "./GlobalSearch";
import { CommandPalette } from "./CommandPalette";
import { ShortcutsModal } from "./ShortcutsModal";
import { QuickCreate } from "./QuickCreate";
import { NotificationDropdown } from "./NotificationDropdown";
import { ProfileDropdown } from "./ProfileDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

interface TopbarProps {
  user?: { name?: string | null; email?: string | null };
}

export function Topbar({ user }: TopbarProps) {
  const palette = useCommandPalette();
  const [showShortcuts, setShowShortcuts] = React.useState(false);

  // Bind keyboard shortcuts
  useKeyboardShortcuts({
    onOpenSearch: palette.toggle,
    onOpenShortcuts: () => setShowShortcuts((prev) => !prev),
  });

  const handleMobileMenuToggle = () => {
    window.dispatchEvent(new Event("toggle-admin-sidebar"));
  };

  return (
    <>
      <header className="h-16 shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4 select-none">
      {/* Left side: Hamburger (mobile only) & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={handleMobileMenuToggle}
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        <div className="hidden sm:block">
          <Breadcrumbs />
        </div>
      </div>

      {/* Right side: Search, Date, Create, Notifications, Shortcuts, Theme, Profile */}
      <div className="flex items-center gap-3 shrink-0 ml-auto">
        <GlobalSearch onOpenPalette={palette.toggle} />
        <TopbarDate />
        <QuickCreate />
        <NotificationDropdown />
        <button
          type="button"
          onClick={() => setShowShortcuts(true)}
          className="h-9 w-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all select-none active:scale-95 duration-150"
          title="Keyboard Shortcuts (?)"
        >
          <Keyboard className="h-4.5 w-4.5" />
        </button>
        <ThemeToggle />
        <ProfileDropdown />
      </div>
    </header>

    <CommandPalette
      open={palette.open}
      onClose={palette.close}
      query={palette.query}
      onQueryChange={palette.setQuery}
    />

    <ShortcutsModal open={showShortcuts} onClose={() => setShowShortcuts(false)} />
  </>
);
}

export default Topbar;
