"use client";

import React, { useState, useEffect } from "react";

export function TopbarDate() {
  const [mounted, setMounted] = useState(false);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setMounted(true);
    const date = new Date();
    setDateStr(date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="hidden lg:flex flex-col text-left select-none">
      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        {dateStr}
      </span>
    </div>
  );
}
