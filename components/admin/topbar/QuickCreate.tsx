"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Plus, Building2, BookOpen, FileText, Users, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CREATE_LINKS = [
  { label: "Create College", href: "/admin/colleges/new", icon: Building2 },
  { label: "Create Course", href: "/admin/courses/new", icon: BookOpen },
  { label: "Create Blog", href: "/admin/blogs/new", icon: FileText },
  { label: "Create User", href: "/admin/users/new", icon: Users },
];

export function QuickCreate() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white h-9 w-9 sm:w-auto sm:px-3 py-2 transition-all shadow-sm"
        title="Create new record"
      >
        <Plus className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline text-xs font-semibold">Create New</span>
        <ChevronDown className="hidden sm:inline h-3 w-3 opacity-85 shrink-0" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {CREATE_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <Icon className="h-4 w-4 text-zinc-400 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
