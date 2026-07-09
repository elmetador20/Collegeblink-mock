"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
}

export function Dropdown({ trigger, children, align = "right" }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div
            className={cn(
              "absolute mt-2 w-56 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 shadow-lg z-30",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            <div onClick={() => setOpen(false)}>{children}</div>
          </div>
        </>
      )}
    </div>
  );
}
