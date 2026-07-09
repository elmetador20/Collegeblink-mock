"use client";

import React from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#E3DFD6] dark:border-zinc-800 pb-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8C6422] dark:text-[#c49b45]">
            {eyebrow}
          </p>
          <h1 className="mt-1 font-serif text-2xl text-[#1C1B19] dark:text-zinc-100">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm text-[#6B6660] dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
    </div>
  );
}