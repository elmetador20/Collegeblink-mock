"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, ArrowRight, Keyboard, X } from "lucide-react";
import toast from "react-hot-toast";

import { SearchBar } from "./SearchBar";
import { NotificationButton } from "./NotificationButton";
import { UserMenu } from "./UserMenu";
import { PageActions } from "./PageActions";
import { ThemeToggle } from "./ThemeToggle";

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: "info" | "success" | "warning";
}

interface BookmarkItem {
  label: string;
  href: string;
}

export function Topbar({ onRefresh }: { onRefresh?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [toggling, setToggling] = useState(false);

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [history, setHistory] = useState<BookmarkItem[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "System Backup Successful",
      desc: "Weekly automatic database backup has completed.",
      time: "10m ago",
      unread: true,
      type: "success",
    },
    {
      id: "2",
      title: "New Review Moderation Required",
      desc: "Student submitted a review for IIT Bombay.",
      time: "1h ago",
      unread: true,
      type: "warning",
    },
    {
      id: "3",
      title: "New Counselor Registered",
      desc: "Counselor account 'Amit Verma' awaits approval.",
      time: "4h ago",
      unread: false,
      type: "info",
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [showPalette, setShowPalette] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const commandItems = [
    { label: "Go to Dashboard", href: "/admin", category: "Navigation", shortcut: "g d" },
    { label: "Go to Colleges Registry", href: "/admin/colleges", category: "Navigation", shortcut: "g c" },
    { label: "Go to Courses Registry", href: "/admin/courses", category: "Navigation", shortcut: "g o" },
    { label: "Go to Blogs CMS", href: "/admin/blogs", category: "Navigation", shortcut: "g b" },
    { label: "Go to Users Registry", href: "/admin/users", category: "Navigation", shortcut: "g u" },
    { label: "Go to System Settings", href: "/admin/settings", category: "Navigation", shortcut: "g s" },
    { label: "Create New College", href: "/admin/colleges/new", category: "Actions", shortcut: "n c" },
    { label: "Create New Course", href: "/admin/courses/new", category: "Actions", shortcut: "n o" },
    { label: "Publish Blog Post", href: "/admin/blogs/new", category: "Actions", shortcut: "n b" },
    { label: "Add User Account", href: "/admin/users/new", category: "Actions", shortcut: "n u" },
  ];

  const filteredCommands = commandItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetch("/api/admin/maintenance")
      .then((res) => res.json())
      .then((data) => setMaintenanceMode(data.maintenanceMode || false))
      .catch(() => {});

    const savedBookmarks = localStorage.getItem("admin_bookmarks");
    if (savedBookmarks) {
      try {
        const parsed = JSON.parse(savedBookmarks);
        setBookmarks(parsed);
        setIsBookmarked(parsed.some((b: BookmarkItem) => b.href === pathname));
      } catch (e) {}
    }

    const savedHistory = localStorage.getItem("admin_history");
    let currentHistory: BookmarkItem[] = [];
    if (savedHistory) {
      try {
        currentHistory = JSON.parse(savedHistory);
      } catch (e) {}
    }

    const pathLabels: Record<string, string> = {
      "/admin": "Dashboard",
      "/admin/colleges": "Colleges Registry",
      "/admin/courses": "Courses Registry",
      "/admin/blogs": "Blogs CMS",
      "/admin/users": "Users Registry",
      "/admin/settings": "Settings",
    };
    let label = pathLabels[pathname] || pathname.split("/").pop() || "Admin Page";
    if (pathname.endsWith("/new")) {
      label = `Create ${pathname.split("/")[2]}`;
    }

    const nextHistory = [
      { label, href: pathname },
      ...currentHistory.filter((item) => item.href !== pathname),
    ].slice(0, 7);

    setHistory(nextHistory);
    localStorage.setItem("admin_history", JSON.stringify(nextHistory));
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (historyRef.current && !historyRef.current.contains(e.target as Node)) {
        setShowHistoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let keysPressed: Record<string, boolean> = {};

    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowPalette((prev) => !prev);
        return;
      }

      if (e.key === "?" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
        return;
      }

      if (e.key === "Escape") {
        setShowPalette(false);
        setShowShortcuts(false);
        setShowNotifications(false);
        setShowHistoryDropdown(false);
        return;
      }

      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;
      keysPressed[e.key.toLowerCase()] = true;

      if (keysPressed["g"]) {
        const routes: Record<string, string> = {
          d: "/admin",
          c: "/admin/colleges",
          o: "/admin/courses",
          b: "/admin/blogs",
          u: "/admin/users",
          s: "/admin/settings",
        };
        const dest = routes[e.key.toLowerCase()];
        if (dest) {
          e.preventDefault();
          router.push(dest);
        }
      }

      if (keysPressed["n"]) {
        const dest = e.key.toLowerCase() === "c" ? "/admin/colleges/new" : e.key.toLowerCase() === "o" ? "/admin/courses/new" : null;
        if (dest) {
          e.preventDefault();
          router.push(dest);
        }
      }

      if (e.key.toLowerCase() === "b" && !keysPressed["g"]) {
        e.preventDefault();
        toggleBookmark();
      }

      if (e.key.toLowerCase() === "m" && !keysPressed["g"]) {
        e.preventDefault();
        handleToggleMaintenance(!maintenanceMode);
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      delete keysPressed[e.key.toLowerCase()];
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pathname, maintenanceMode, bookmarks]);

  useEffect(() => {
    if (showPalette) {
      setSelectedIndex(0);
    }
  }, [searchQuery, showPalette]);

  function handlePaletteKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredCommands[selectedIndex];
      if (target) {
        router.push(target.href);
        setShowPalette(false);
      }
    }
  }

  const handleToggleMaintenance = async (checked: boolean) => {
    try {
      setToggling(true);
      const res = await fetch("/api/admin/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maintenanceMode: checked,
          maintenanceMessage: "We're currently performing maintenance. Please check back soon.",
          maintenanceEta: null,
          contactEmail: "support@collegeblink.com",
        }),
      });

      if (!res.ok) throw new Error("Toggle failure");

      setMaintenanceMode(checked);
      toast.success(checked ? "Maintenance mode activated" : "Maintenance mode deactivated");
    } catch (error) {
      toast.error("Failed to update maintenance settings");
    } finally {
      setToggling(false);
    }
  };

  const toggleBookmark = () => {
    let nextBookmarks = [...bookmarks];
    if (isBookmarked) {
      nextBookmarks = nextBookmarks.filter((b) => b.href !== pathname);
      setIsBookmarked(false);
      toast.success("Bookmark removed");
    } else {
      const pathLabels: Record<string, string> = {
        "/admin": "Dashboard",
        "/admin/colleges": "Colleges Registry",
        "/admin/courses": "Courses Registry",
        "/admin/blogs": "Blogs CMS",
        "/admin/users": "Users Registry",
        "/admin/settings": "Settings",
      };
      let label = pathLabels[pathname] || pathname.split("/").pop() || "Admin Page";
      if (pathname.endsWith("/new")) {
        label = `Create ${pathname.split("/")[2]}`;
      }
      nextBookmarks.push({ label, href: pathname });
      setIsBookmarked(true);
      toast.success("Bookmark added");
    }
    setBookmarks(nextBookmarks);
    localStorage.setItem("admin_bookmarks", JSON.stringify(nextBookmarks));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success("All marked as read");
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast.success("Notifications cleared");
  };

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-[#E3DFD6] dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-30 select-none">
      <SearchBar onClick={() => setShowPalette(true)} />

      <div className="flex items-center gap-3">
        <UserMenu
          bookmarks={bookmarks}
          history={history}
          showHistoryDropdown={showHistoryDropdown}
          setShowHistoryDropdown={setShowHistoryDropdown}
          innerRef={historyRef}
        />
        <NotificationButton
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          markAllRead={markAllRead}
          clearAllNotifications={clearAllNotifications}
          innerRef={notificationsRef}
        />
        <PageActions
          isBookmarked={isBookmarked}
          toggleBookmark={toggleBookmark}
          onShortcutsClick={() => setShowShortcuts(true)}
          maintenanceMode={maintenanceMode}
          handleToggleMaintenance={handleToggleMaintenance}
          toggling={toggling}
        />
        <ThemeToggle />
      </div>

      {showPalette && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-40 px-4 pb-8">
          <div className="fixed inset-0 bg-[#1C1B19]/35 backdrop-blur-[2px]" onClick={() => setShowPalette(false)} />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl z-10">
            <div className="flex items-center gap-3 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 px-4 py-3">
              <Search className="h-5 w-5 text-[#6B6660]/60" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handlePaletteKeyDown}
                placeholder="Type a navigation key or action name..."
                className="flex-1 bg-transparent text-sm text-[#1C1B19] dark:text-zinc-100 placeholder:text-[#6B6660]/50 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPalette(false)}
                className="rounded border border-[#E3DFD6] dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold text-[#6B6660]"
              >
                ESC
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto py-2">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#6B6660] italic">
                  No matching links found. Try 'Colleges' or 'Blog'.
                </div>
              ) : (
                filteredCommands.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      router.push(item.href);
                      setShowPalette(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                      idx === selectedIndex
                        ? "bg-[#1F3A5C]/5 dark:bg-zinc-800 text-[#1C1B19] dark:text-white"
                        : "text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4]/80 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5 text-[#6B6660]">
                        {item.category}
                      </span>
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    {idx === selectedIndex ? (
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-[#1F3A5C] dark:text-zinc-300">Enter</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#1F3A5C] dark:text-zinc-300" />
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-[#6B6660]/60 font-mono">{item.shortcut}</span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1C1B19]/35 backdrop-blur-[2px]" onClick={() => setShowShortcuts(false)} />
          <div className="relative w-full max-w-md max-h-[90vh] overflow-hidden rounded-2xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xl z-10">
            <button
              type="button"
              onClick={() => setShowShortcuts(false)}
              className="absolute right-4 top-4 rounded-md text-[#6B6660] hover:text-[#1C1B19] p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="flex items-center gap-2.5 pb-4 border-b border-[#E3DFD6] dark:border-zinc-800 mb-4">
              <Keyboard className="h-5.5 w-5.5 text-[#1F3A5C] dark:text-zinc-300" />
              <h3 className="font-serif text-lg font-bold text-[#1C1B19] dark:text-zinc-100">
                Keyboard Shortcuts
              </h3>
            </div>

            <div className="space-y-3.5 max-h-[85vh] overflow-y-auto text-left">
              {[
                { name: "Command Palette", shortcut: "Ctrl + K / Cmd + K" },
                { name: "Go to Dashboard", shortcut: "g then d" },
                { name: "Go to Colleges", shortcut: "g then c" },
                { name: "Go to Courses", shortcut: "g then o" },
                { name: "Go to Blogs", shortcut: "g then b" },
                { name: "Go to Users", shortcut: "g then u" },
                { name: "Go to Settings", shortcut: "g then s" },
                { name: "Bookmark Current Path", shortcut: "b" },
                { name: "Toggle Maintenance Mode", shortcut: "m" },
                { name: "Show Shortcuts Cheatsheet", shortcut: "?" },
              ].map((item, idx) => (
                <div key={idx} className="grid grid-cols-2 py-1 items-center border-b border-zinc-100 dark:border-zinc-800 text-xs">
                  <span className="font-semibold text-[#1C1B19] dark:text-zinc-300">{item.name}</span>
                  <span className="text-right font-mono font-bold text-[#6B6660]">{item.shortcut}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export default Topbar;
