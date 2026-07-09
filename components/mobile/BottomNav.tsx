"use client";

import { Home, Search, GraduationCap, Sparkles, Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Colleges", path: "/colleges" },
    { icon: Globe, label: "Abroad", path: "/study-abroad" },
    { icon: GraduationCap, label: "Scholarships", path: "/scholarships" },
    { icon: Sparkles, label: "Counselor", path: "/smart-counselor" },
  ];

  useEffect(() => {
    tabs.forEach((tab) => {
      router.prefetch(tab.path);
    });
  }, [router]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border shadow-xl rounded-2xl flex justify-around py-2 z-50">
      {tabs.map((tab, i) => {
        const Icon = tab.icon;
        const active = pathname === tab.path;

        return (
          <button
            key={i}
            onClick={() => {
              router.push(tab.path);
              if (navigator.vibrate) {
                navigator.vibrate(10);
              }
            }}
            className={`flex flex-col items-center text-[10px] transition-all duration-200 active:scale-90 ${
              active ? "text-indigo-600 dark:text-indigo-400 scale-110" : "text-gray-400"
            }`}
          >
            <Icon size={20} />
            {tab.label}
            {active && (
              <div className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-1"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}
