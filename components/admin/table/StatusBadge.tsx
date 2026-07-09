"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: boolean | string;
  type: "verified" | "active" | "published" | "role" | "plan";
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  if (type === "verified") {
    return status ? (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200/50 rounded-full px-2.5 py-0.5">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
        Verified
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6660] bg-gray-50 border border-gray-200/50 rounded-full px-2.5 py-0.5">
        Unverified
      </span>
    );
  }

  if (type === "active") {
    return status !== false ? (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200/50 rounded-full px-2.5 py-0.5">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6660] bg-gray-50 border border-gray-200/50 rounded-full px-2.5 py-0.5">
        Inactive
      </span>
    );
  }

  if (type === "published") {
    return status ? (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200/50 rounded-full px-2.5 py-0.5">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
        Published
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6660] bg-gray-50 border border-gray-200/50 rounded-full px-2.5 py-0.5">
        Draft
      </span>
    );
  }

  if (type === "role") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
          status === "ADMIN"
            ? "bg-amber-50 border-amber-200/50 text-amber-800"
            : "bg-[#1F3A5C]/5 border-[#1F3A5C]/10 text-[#1F3A5C]"
        )}
      >
        {String(status)}
      </span>
    );
  }

  if (type === "plan") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
          status === "PREMIUM"
            ? "bg-emerald-50 border-emerald-200/50 text-emerald-800"
            : "bg-gray-50 border-gray-200/50 text-gray-700"
        )}
      >
        {String(status)}
      </span>
    );
  }

  return null;
}
export default StatusBadge;
