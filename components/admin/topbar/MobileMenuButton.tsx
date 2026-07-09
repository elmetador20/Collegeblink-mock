"use client";

import React from "react";
import { Menu } from "lucide-react";

interface MobileMenuButtonProps {
  onClick?: () => void;
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4]"
    >
      <Menu className="h-4.5 w-4.5" />
    </button>
  );
}
