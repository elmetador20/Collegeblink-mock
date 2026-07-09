"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all select-none active:scale-95 duration-150"
      title="Toggle Dark Mode"
    >
      <Sun className="h-4.5 w-4.5 hidden dark:block text-amber-400" />
      <Moon className="h-4.5 w-4.5 block dark:hidden text-indigo-500" />
    </button>
  );
}
