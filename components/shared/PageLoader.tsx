"use client";

import { GraduationCap } from "lucide-react";

export function PageLoader() {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/25">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -inset-2 animate-ping rounded-2xl border-2 border-indigo-400/30" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
