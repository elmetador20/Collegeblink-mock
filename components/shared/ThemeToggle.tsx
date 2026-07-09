"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Circle, MoonStar, Sparkles } from "lucide-react";

const themes = [
  { value: "light", label: "Light", icon: Sparkles },
  { value: "dark", label: "AMOLED", icon: Circle },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="glass" size="icon" className="h-10 w-10">
        <span className="sr-only">Change theme</span>
      </Button>
    );
  }

  const activeIndex = themes.findIndex((item) => item.value === theme);
  const safeIndex = activeIndex >= 0 ? activeIndex : 0;
  const activeTheme = themes[safeIndex];
  const nextTheme = themes[(safeIndex + 1) % themes.length];
  const Icon = activeTheme.icon;

  return (
    <Button
      variant="glass"
      size="icon"
      className="h-10 w-10 rounded-full"
      onClick={() => setTheme(nextTheme.value)}
      title={`${activeTheme.label} theme`}
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">Switch to {nextTheme.label} theme</span>
    </Button>
  );
}
