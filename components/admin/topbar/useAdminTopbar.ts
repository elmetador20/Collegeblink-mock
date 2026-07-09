"use client";

import { useState, useEffect, useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import toast from "react-hot-toast";

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: "info" | "success" | "warning";
}

export interface BookmarkItem {
  label: string;
  href: string;
}

export interface CommandItem {
  label: string;
  href: string;
  category: string;
  shortcut: string;
}

const adminCommandItems: CommandItem[] = [
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

export function useAdminTopbar(pathname: string) {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [history, setHistory] = useState<BookmarkItem[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: "1", title: "System Backup Successful", desc: "Weekly automatic database backup has completed.", time: "10m ago", unread: true, type: "success" },
    { id: "2", title: "New Review Moderation Required", desc: "Student submitted a review for IIT Bombay.", time: "1h ago", unread: true, type: "warning" },
    { id: "3", title: "New Counselor Registered", desc: "Counselor account 'Amit Verma' awaits approval.", time: "4h ago", unread: false, type: "info" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const filteredCommands = adminCommandItems.filter((item) =>
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
      } catch {}
    }

    const savedHistory = localStorage.getItem("admin_history");
    let currentHistory: BookmarkItem[] = [];
    if (savedHistory) {
      try {
        currentHistory = JSON.parse(savedHistory);
      } catch {}
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
          window.location.assign(dest);
        }
      }

      if (keysPressed["n"]) {
        const dest = e.key.toLowerCase() === "c" ? "/admin/colleges/new" : e.key.toLowerCase() === "o" ? "/admin/courses/new" : null;
        if (dest) {
          e.preventDefault();
          window.location.assign(dest);
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
  }, [maintenanceMode, showHistoryDropdown, showNotifications]);

  useEffect(() => {
    if (showPalette) {
      setSelectedIndex(0);
    }
  }, [searchQuery, showPalette]);

  const handlePaletteKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      window.location.assign(filteredCommands[selectedIndex].href);
    }

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
    }

    if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
  };

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
    } catch {
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

  return {
    maintenanceMode,
    toggling,
    bookmarks,
    history,
    isBookmarked,
    showHistoryDropdown,
    setShowHistoryDropdown,
    notifications,
    showNotifications,
    setShowNotifications,
    showPalette,
    setShowPalette,
    showShortcuts,
    setShowShortcuts,
    searchQuery,
    setSearchQuery,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    notificationsRef,
    historyRef,
    handleToggleMaintenance,
    toggleBookmark,
    markAllRead,
    clearAllNotifications,
    handlePaletteKeyDown,
  };
}
