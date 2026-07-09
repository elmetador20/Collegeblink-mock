"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/ui-primitives";
import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Eye,
  Keyboard,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Lock,
} from "lucide-react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  // Settings State
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [defaultRows, setDefaultRows] = useState(10);
  const [notifyOnUser, setNotifyOnUser] = useState(true);
  const [notifyOnReview, setNotifyOnReview] = useState(true);
  const [notifyOnBackup, setNotifyOnBackup] = useState(true);

  // Load configuration
  useEffect(() => {
    fetch("/api/admin/maintenance")
      .then((res) => res.json())
      .then((data) => setMaintenanceMode(data.maintenanceMode || false))
      .catch(() => {});

    const savedRows = localStorage.getItem("admin_default_rows");
    if (savedRows) setDefaultRows(Number(savedRows));

    const savedNotifyUser = localStorage.getItem("admin_notify_user");
    if (savedNotifyUser) setNotifyOnUser(savedNotifyUser === "true");

    const savedNotifyReview = localStorage.getItem("admin_notify_review");
    if (savedNotifyReview) setNotifyOnReview(savedNotifyReview === "true");

    const savedNotifyBackup = localStorage.getItem("admin_notify_backup");
    if (savedNotifyBackup) setNotifyOnBackup(savedNotifyBackup === "true");
  }, []);

  const handleMaintenanceToggle = async (val: boolean) => {
    setToggling(true);
    try {
      const res = await fetch("/api/admin/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maintenanceMode: val,
          maintenanceMessage: "We're currently performing maintenance. Please check back soon.",
          maintenanceEta: null,
          contactEmail: "support@collegeblink.com",
        }),
      });

      if (!res.ok) throw new Error("Toggle failed");
      setMaintenanceMode(val);
      toast.success(val ? "Maintenance mode enabled" : "Maintenance mode disabled");
    } catch (e) {
      toast.error("Failed to toggle maintenance status");
    } finally {
      setToggling(false);
    }
  };

  const handleSavePreferences = () => {
    localStorage.setItem("admin_default_rows", String(defaultRows));
    localStorage.setItem("admin_notify_user", String(notifyOnUser));
    localStorage.setItem("admin_notify_review", String(notifyOnReview));
    localStorage.setItem("admin_notify_backup", String(notifyOnBackup));
    toast.success("Preferences updated successfully");
  };

  const handleClearCache = () => {
    localStorage.removeItem("admin_history");
    toast.success("Client cache and search history cleared");
  };

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        eyebrow="Console"
        title="System Settings"
        description="Configure dashboard variables, notification logs, maintenance parameters, and UI preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (2/3 width) - Main configurations */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Maintenance Control */}
          <Card
            title="System Maintenance Control"
            subtitle="Take the public website offline for database schema migration or code deployment updates"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-[#FAF8F4]/30 dark:bg-zinc-950/20">
              <div className="flex gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm ${
                  maintenanceMode ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
                }`}>
                  {maintenanceMode ? <AlertTriangle className="h-5 w-5 animate-pulse" /> : <CheckCircle2 className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1B19] dark:text-zinc-100">
                    {maintenanceMode ? "Maintenance Mode is Active" : "System Status: Online"}
                  </h4>
                  <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5 max-w-md">
                    When active, normal users are blocked by a splash page. Admins can still access dashboard resources.
                  </p>
                </div>
              </div>
              <button
                disabled={toggling}
                onClick={() => handleMaintenanceToggle(!maintenanceMode)}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all active:scale-95 shadow-sm ${
                  maintenanceMode
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-amber-600 hover:bg-amber-700 text-white"
                }`}
              >
                {toggling ? "Switching..." : maintenanceMode ? "Go Live" : "Go Maintenance"}
              </button>
            </div>
          </Card>

          {/* Card 2: UI Preferences */}
          <Card
            title="Dashboard Display & Preferences"
            subtitle="Adjust grid row settings and search indexing behaviors"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="rows" className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
                    Default Records Per Page
                  </label>
                  <select
                    id="rows"
                    value={defaultRows}
                    onChange={(e) => setDefaultRows(Number(e.target.value))}
                    className="w-full rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-[#1C1B19] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C]"
                  >
                    <option value={5}>5 Rows</option>
                    <option value={10}>10 Rows</option>
                    <option value={25}>25 Rows</option>
                    <option value={50}>50 Rows</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="theme" className="block text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">
                    Color Appearance Theme
                  </label>
                  <select
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-[#1C1B19] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#1F3A5C]/20 focus:border-[#1F3A5C]"
                  >
                    <option value="light">Light theme</option>
                    <option value="dark">Dark theme</option>
                    <option value="system">Follow system setting</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3DFD6]/60 dark:border-zinc-800/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="rounded-xl bg-[#1F3A5C] text-white hover:bg-[#1F3A5C]/90 px-6 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-95"
                >
                  Save display preferences
                </button>
              </div>
            </div>
          </Card>

          {/* Card 3: Cache Controls */}
          <Card
            title="Registry Cache Maintenance"
            subtitle="Wipe dynamic UI cookies, state filters, and local search command histories"
          >
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="text-sm font-semibold text-[#1C1B19] dark:text-zinc-200">Clear Search & Recent Path Logs</p>
                <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">Wipes local state variables recorded in your browser session.</p>
              </div>
              <button
                type="button"
                onClick={handleClearCache}
                className="rounded-xl border border-red-200 hover:bg-red-50 text-[#A23B2E] px-4 py-2.5 text-xs font-bold transition-all"
              >
                Clear dynamic history
              </button>
            </div>
          </Card>
        </div>

        {/* Right Column (1/3 width) - Reference / Info */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Card 4: Keyboard shortcuts cheat grid */}
          <Card
            title="Shortcut Reference"
            subtitle="Fast command shortcuts accessible from any admin layout panel"
          >
            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 pb-1.5">
                <span className="font-semibold text-[#6B6660]">Command Palette</span>
                <span className="font-mono font-bold text-[#1C1B19] dark:text-zinc-300">Ctrl + K</span>
              </div>
              <div className="flex justify-between border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 pb-1.5">
                <span className="font-semibold text-[#6B6660]">Go to Dashboard</span>
                <span className="font-mono font-bold text-[#1C1B19] dark:text-zinc-300">g then d</span>
              </div>
              <div className="flex justify-between border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 pb-1.5">
                <span className="font-semibold text-[#6B6660]">Go to Colleges</span>
                <span className="font-mono font-bold text-[#1C1B19] dark:text-zinc-300">g then c</span>
              </div>
              <div className="flex justify-between border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 pb-1.5">
                <span className="font-semibold text-[#6B6660]">Go to Courses</span>
                <span className="font-mono font-bold text-[#1C1B19] dark:text-zinc-300">g then o</span>
              </div>
              <div className="flex justify-between border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 pb-1.5">
                <span className="font-semibold text-[#6B6660]">Go to Blogs</span>
                <span className="font-mono font-bold text-[#1C1B19] dark:text-zinc-300">g then b</span>
              </div>
              <div className="flex justify-between border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 pb-1.5">
                <span className="font-semibold text-[#6B6660]">Go to Users</span>
                <span className="font-mono font-bold text-[#1C1B19] dark:text-zinc-300">g then u</span>
              </div>
              <div className="flex justify-between border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 pb-1.5">
                <span className="font-semibold text-[#6B6660]">Bookmark current Page</span>
                <span className="font-mono font-bold text-[#1C1B19] dark:text-zinc-300">b</span>
              </div>
              <div className="flex justify-between border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 pb-1.5">
                <span className="font-semibold text-[#6B6660]">Show Shortcuts List</span>
                <span className="font-mono font-bold text-[#1C1B19] dark:text-zinc-300">?</span>
              </div>
            </div>
          </Card>

          {/* Card 5: Security Lock Info */}
          <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-[#FAF8F4]/30 dark:bg-zinc-950/20 p-6 flex gap-3 text-xs leading-normal">
            <Lock className="h-5 w-5 text-[#8C6422] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-[#1C1B19] dark:text-zinc-200">Database Protection Enforced</h5>
              <p className="text-[#6B6660] dark:text-zinc-400 mt-1">
                Security constraints block destructive database overrides unless accessing via validated counselor profiles. Session logs are archived daily.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
