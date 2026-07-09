"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const ROUTE_SHORTCUTS: Record<string, string> = {
  d: "/admin",
  c: "/admin/colleges",
  o: "/admin/courses",
  b: "/admin/blogs",
  u: "/admin/users",
  s: "/admin/settings",
};

interface Options {
  onOpenSearch?: () => void;
  onOpenShortcuts?: () => void;
}

export function useKeyboardShortcuts({ onOpenSearch, onOpenShortcuts }: Options = {}) {
  const router = useRouter();

  const handler = useCallback((e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const isInput = ["INPUT", "TEXTAREA"].includes(target.tagName) || target.isContentEditable;

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      onOpenSearch?.();
      return;
    }

    if (e.key === "?" && !isInput) {
      e.preventDefault();
      onOpenShortcuts?.();
      return;
    }

    if (isInput) return;

    if (e.key.toLowerCase() === "g") {
      const next = (e2: KeyboardEvent) => {
        const dest = ROUTE_SHORTCUTS[e2.key.toLowerCase()];
        if (dest) { e2.preventDefault(); router.push(dest); }
        window.removeEventListener("keydown", next);
      };
      window.addEventListener("keydown", next);
      setTimeout(() => window.removeEventListener("keydown", next), 1500);
    }

    if (e.key === "n" && !e.shiftKey) {
      router.push("/admin/colleges/new");
    }
  }, [router, onOpenSearch, onOpenShortcuts]);

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handler]);
}
