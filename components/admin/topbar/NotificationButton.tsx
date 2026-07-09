"use client";

import React from "react";
import { Bell } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: "info" | "success" | "warning";
}

interface NotificationButtonProps {
  notifications: NotificationItem[];
  showNotifications: boolean;
  setShowNotifications: (v: boolean) => void;
  markAllRead: () => void;
  clearAllNotifications: () => void;
  innerRef: React.RefObject<HTMLDivElement | null>;
}

export function NotificationButton({
  notifications,
  showNotifications,
  setShowNotifications,
  markAllRead,
  clearAllNotifications,
  innerRef,
}: NotificationButtonProps) {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="relative" ref={innerRef}>
      <button
        type="button"
        onClick={() => setShowNotifications(!showNotifications)}
        title="Notification Center (N)"
        className="h-9 w-9 flex items-center justify-center rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-all"
      >
        <Bell className="h-4.5 w-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#A23B2E] text-[9px] font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden z-50">
          <div className="px-4 py-3 bg-[#FAF8F4] dark:bg-zinc-900/50 border-b border-[#E3DFD6] dark:border-zinc-800 flex justify-between items-center">
            <span className="text-xs font-bold text-[#1C1B19] dark:text-zinc-200">System Notifications</span>
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-[10px] font-bold text-[#1F3A5C] dark:text-zinc-300 hover:underline"
              >
                Mark read
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-[#E3DFD6]/60 dark:divide-zinc-800/60 text-left">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#6B6660]/75">
                No new system logs.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3.5 flex gap-2.5 transition-colors ${
                    n.unread ? "bg-[#1F3A5C]/[0.02] dark:bg-zinc-800/20" : ""
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full shrink-0 mt-1.5 ${
                    n.type === "success" ? "bg-emerald-500" : n.type === "warning" ? "bg-amber-500" : "bg-[#1F3A5C]"
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#1C1B19] dark:text-zinc-200 leading-normal">{n.title}</p>
                    <p className="text-[11px] text-[#6B6660] dark:text-zinc-400 mt-0.5 leading-normal">{n.desc}</p>
                    <p className="text-[9px] text-[#6B6660]/60 mt-1">{n.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <div className="p-2 border-t border-[#E3DFD6] dark:border-zinc-800 bg-[#FAF8F4]/30 text-center">
              <button
                type="button"
                onClick={clearAllNotifications}
                className="text-[10px] font-bold text-[#A23B2E] hover:underline"
              >
                Clear notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
