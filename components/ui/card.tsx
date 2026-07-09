"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
}

export function Card({
  title,
  subtitle,
  headerAction,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 mb-5">
          <div>
            {title && (
              <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction}
        </div>
      )}
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-semibold leading-none tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center", className)} {...props} />;
}
