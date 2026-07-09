"use client";

import React, { useState, useRef, useEffect } from "react";
import { LogOut, Settings, ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { DEMO_MODE } from "@/lib/demo";

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const name = DEMO_MODE ? "Demo Admin" : session?.user?.name ?? "Admin User";
  const email = DEMO_MODE ? "demo@collegeblink.com" : session?.user?.email ?? "admin@collegeblink.com";
  const initials = name.slice(0, 2).toUpperCase();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-9 w-9 sm:w-auto sm:px-2.5 py-1 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all select-none"
        title="Account actions"
      >
        <div className="h-6.5 w-6.5 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-[10px] shrink-0">
          {initials}
        </div>
        <span className="hidden sm:inline font-semibold text-zinc-700 dark:text-zinc-300 truncate max-w-[80px]">{name}</span>
        <ChevronDown className="hidden sm:inline h-3 w-3 text-zinc-400 shrink-0" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-2.5 py-2 border-b border-zinc-100 dark:border-zinc-900">
            <p className="text-xs font-bold text-zinc-950 dark:text-zinc-50 truncate">{name}</p>
            <p className="text-[10px] text-zinc-400 truncate mt-0.5">{email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/admin/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <Settings className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              Settings
            </Link>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-900 p-1">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors w-full text-left"
            >
              <LogOut className="h-3.5 w-3.5 shrink-0" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
