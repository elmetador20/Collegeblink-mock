"use client";

import React from "react";
import Link from "next/link";
import { Users, ExternalLink } from "lucide-react";

interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  joined: string;
  lastLogin: string;
  status: "active" | "inactive";
  initials: string;
}

const RECENT_USERS: RecentUser[] = [
  { id: "u1", name: "Aarav Sharma", email: "aarav@example.com", role: "USER", joined: "Today", lastLogin: "2h ago", status: "active", initials: "AS" },
  { id: "u2", name: "Priya Nair", email: "priya@example.com", role: "ADMIN", joined: "Yesterday", lastLogin: "1d ago", status: "active", initials: "PN" },
  { id: "u3", name: "Rohan Mehta", email: "rohan@example.com", role: "USER", joined: "3d ago", lastLogin: "3d ago", status: "inactive", initials: "RM" },
  { id: "u4", name: "Sneha Gupta", email: "sneha@example.com", role: "USER", joined: "1w ago", lastLogin: "5d ago", status: "active", initials: "SG" },
  { id: "u5", name: "Karan Patel", email: "karan@example.com", role: "USER", joined: "2w ago", lastLogin: "1w ago", status: "inactive", initials: "KP" },
];

const AVATAR_COLORS = [
  "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400",
  "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400",
  "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400",
  "bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400",
  "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400",
];

export function RecentUsersWidget() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Users className="h-4 w-4 text-emerald-500" />
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Recent Users</h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Newest registrations and their status</p>
        </div>
        <Link href="/admin/users" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1">
          View all <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="divide-y divide-zinc-50 dark:divide-zinc-800/80">
        {RECENT_USERS.map((user, idx) => (
          <div key={user.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors duration-150 group">
            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
              {user.initials}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">{user.name}</p>
                {user.role === "ADMIN" && (
                  <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-[9px] font-bold px-1.5 py-0.5 uppercase shrink-0">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">{user.email}</p>
            </div>

            <div className="text-right shrink-0">
              <div className="flex items-center justify-end gap-1.5 mb-1">
                <div className={`h-1.5 w-1.5 rounded-full ${user.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-zinc-300 dark:bg-zinc-600"}`} />
                <span className={`text-[10px] font-bold uppercase ${user.status === "active" ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"}`}>
                  {user.status}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Joined {user.joined}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-3 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">Last login shown per user</p>
      </div>
    </div>
  );
}
