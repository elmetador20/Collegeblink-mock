"use client";

import { useState, useCallback } from "react";

export interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: "info" | "success" | "warning";
}

const DEFAULT_NOTIFICATIONS: Notification[] = [
  { id: "1", title: "System Backup Successful", desc: "Weekly automatic database backup has completed.", time: "10m ago", unread: true, type: "success" },
  { id: "2", title: "New Review Moderation Required", desc: "Student submitted a review for IIT Bombay.", time: "1h ago", unread: true, type: "warning" },
  { id: "3", title: "New Counselor Registered", desc: "Counselor account 'Amit Verma' awaits approval.", time: "4h ago", unread: false, type: "info" },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(DEFAULT_NOTIFICATIONS);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const clear = useCallback(() => setNotifications([]), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return { notifications, unreadCount, open, toggle, close, markAllRead, clear };
}
