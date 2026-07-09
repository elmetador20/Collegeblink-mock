"use client";

import React from "react";
import { User, mockUsers } from "@/mock/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, GraduationCap } from "lucide-react";

export function RecentRegistrations() {
  // Sort by createdAt descending and get the top 5
  const latestUsers = [...mockUsers]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 mb-5">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Recent Registrations
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-1">
            Latest student signups on the platform
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-1">
        {latestUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between gap-4 p-3 rounded-xl border border-[#E3DFD6]/40 dark:border-zinc-800/40 bg-zinc-50/20 dark:bg-zinc-900/10 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800/20 transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-9 w-9 border border-[#E3DFD6] dark:border-zinc-800 shrink-0">
                <AvatarImage src={user.avatar || undefined} alt={user.name || "User"} />
                <AvatarFallback className="bg-[#1F3A5C]/5 dark:bg-zinc-800 text-[#1F3A5C] dark:text-zinc-300 text-xs font-bold font-sans">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="text-xs font-bold text-[#1C1B19] dark:text-zinc-200 truncate">
                  {user.name || "Anonymous User"}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-[#6B6660] dark:text-zinc-500">
                  <Mail className="h-3 w-3 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Badge
                className={cn(
                  "text-[9px] font-extrabold uppercase px-1.5 py-0.5 tracking-wider border",
                  user.plan === "PREMIUM"
                    ? "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30"
                    : "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:border-zinc-700/50"
                )}
              >
                {user.plan}
              </Badge>
              {user.stream && (
                <div className="flex items-center gap-1 text-[9px] text-[#8C6422] dark:text-amber-500 font-semibold uppercase tracking-wider">
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>
                    {user.stream} {user.targetYear ? `'${String(user.targetYear).slice(-2)}` : ""}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Utility class merger helper inside component in case Tailwind compilation needs standard cn classes.
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
