"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost" | "glass" | "default" | "link";
  size?: "sm" | "md" | "lg" | "icon" | "default";
  loading?: boolean;
  icon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      className,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-semibold transition-all duration-250 select-none outline-none active:scale-95 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default:
        "bg-[#1F3A5C] text-white hover:bg-[#1F3A5C]/90 shadow-sm dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
      primary:
        "bg-[#1F3A5C] text-white hover:bg-[#1F3A5C]/90 shadow-sm dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
      secondary:
        "bg-[#FAF8F4] border border-[#E3DFD6] text-[#1C1B19] hover:bg-[#E3DFD6]/40 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700/80",
      outline:
        "bg-transparent border border-[#E3DFD6] text-[#1C1B19] hover:bg-[#FAF8F4] dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800",
      danger:
        "bg-[#A23B2E] text-white hover:bg-[#A23B2E]/90 shadow-sm dark:bg-red-950/20 dark:text-red-400 dark:border dark:border-red-900/30 dark:hover:bg-red-900/20",
      ghost:
        "text-[#6B6660] hover:text-[#1C1B19] hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/60",
      glass:
        "bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 text-foreground border border-border/70 backdrop-blur-md",
      link:
        "text-[#1F3A5C] hover:underline bg-transparent p-0 h-auto font-normal dark:text-zinc-400 dark:hover:text-zinc-200",
    };

    const sizes = {
      default: "px-4 py-2.5 text-sm rounded-xl gap-2",
      sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-4 py-2.5 text-sm rounded-xl gap-2",
      lg: "px-6 py-3.5 text-base rounded-xl gap-2.5",
      icon: "h-10 w-10 p-0 rounded-full flex items-center justify-center shrink-0",
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : icon}
            {children}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
