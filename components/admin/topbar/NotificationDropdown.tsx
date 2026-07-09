"use client";

import React from "react";
import { Bell, Check, Clock, Trash } from "lucide-react";
import { useNotifications, Notification } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";

export function NotificationDropdown() {
  const { notifications, unreadCount, open, toggle, close, markAllRead, clear } = useNotifications();

  React.useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (open && !target.closest(".notification-trigger")) {
        close();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open, close]);

  return (
    <div className="relative notification-trigger">
      <button
        type="button"
        onClick={toggle}
        className="relative h-9 w-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
        title="Notifications"
      >
        <Bell className="h-4.5 w-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-zinc-900 animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute -right-16 sm:right-0 mt-2 w-72 sm:w-80 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Notifications</h4>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
              >
                <Check className="h-3 w-3" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto divide-y divide-zinc-50 dark:divide-zinc-900">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-xs text-zinc-400">All caught up!</p>
              </div>
            ) : (
              notifications.map((n: Notification) => (
                <div key={n.id} className={cn("p-3.5 text-left transition-colors", n.unread ? "bg-zinc-50/50 dark:bg-zinc-900/30" : "bg-transparent")}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1">{n.title}</span>
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0 mt-1",
                      n.type === "success" ? "bg-emerald-500" : n.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                    )} />
                  </div>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-2">{n.desc}</p>
                  <div className="flex items-center gap-1 text-[9px] text-zinc-400 mt-2">
                    <Clock className="h-2.5 w-2.5" />
                    {n.time}
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 text-center">
              <button
                type="button"
                onClick={clear}
                className="text-[10px] font-bold text-zinc-400 hover:text-zinc-600 flex items-center justify-center gap-1 w-full"
              >
                <Trash className="h-3 w-3" /> Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
