"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getBottomNavItems } from "@/lib/navigation-config";

export default function MobileNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const role = isAdmin ? "admin" : "user";
  const links = getBottomNavItems(role);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 flex justify-around py-3 px-2 md:hidden z-50 safe-area-bottom">
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 active:scale-95",
              active
                ? "text-accent bg-accent/10"
                : "text-white/50 hover:text-white/80"
            )}
          >
            <Icon className={cn(
              "h-5 w-5 transition-transform duration-300",
              active ? "scale-110" : ""
            )} />
            <span className="text-[10px] font-medium">{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
