"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, Menu, Megaphone, Sparkles, Target, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const primaryLinks = [
  { href: "/colleges", label: "Colleges" },
  { href: "/courses", label: "Courses" },
  { href: "/study-abroad", label: "Study Abroad" },
  { href: "/smart-counselor", label: "Smart Counselor" },
  { href: "/exams", label: "Exams" },
];

const moreLinks = [
  { href: "/institutes", label: "Institutes" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/blogs", label: "Blogs" },
];

const allLinks = [{ href: "/", label: "Home" }, ...primaryLinks, ...moreLinks];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MoreMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const moreActive = moreLinks.some((link) => isActive(pathname, link.href));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all",
          moreActive
            ? "bg-accent text-white shadow-sm"
            : "text-muted-foreground hover:bg-accent/70 hover:text-white"
        )}
      >
        More
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2 rounded-2xl border border-border/70 bg-card/95 p-1.5 shadow-xl backdrop-blur-2xl">
          {moreLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-3 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-accent text-white"
                    : "text-muted-foreground hover:bg-accent/70 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-2xl">
      <div className="container mx-auto flex h-[4.5rem] items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img src="/logo.png" alt="CollegeBlink" className="h-12 w-auto object-contain rounded-full" />
        </Link>

        <nav className="hidden items-center gap-0.5 rounded-full border border-border/70 bg-card/60 p-1 shadow-sm backdrop-blur-xl lg:flex">
          {primaryLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-accent text-white shadow-sm"
                    : "text-muted-foreground hover:bg-accent/70 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <MoreMenu pathname={pathname} />
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <Button
            asChild
            className="hidden h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 text-[11px] font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-[0.98] lg:flex"
          >
            <Link href="/neetrankpredictor">
              <Target className="h-3 w-3" />
              <span>NEET Rank Predictor</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="hidden h-9 items-center gap-2 rounded-full border-indigo-500/30 bg-transparent px-4 text-[11px] font-bold text-indigo-500 transition-all hover:bg-indigo-500 hover:text-white active:scale-[0.98] xl:flex"
            onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-modal"))}
          >
            <Sparkles className="h-3 w-3" />
            <span>Need Counselling</span>
          </Button>

          <Button variant="glass" size="icon" className="hidden h-10 w-10 rounded-full xl:flex" asChild>
            <Link href="/colleges" aria-label="Search colleges">
              <Search className="h-4 w-4" />
            </Link>
          </Button>

          <div className="hidden lg:flex">
            <AnimatedThemeToggler className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border/70 bg-card/75 text-foreground shadow-sm backdrop-blur-md hover:bg-accent/75" />
          </div>

          <Button
            variant="glass"
            size="icon"
            className="relative hidden h-11 w-11 rounded-full border border-border/70 bg-card/60 shadow-lg backdrop-blur-xl transition-all hover:scale-110 hover:bg-accent/20 sm:flex"
            asChild
          >
            <Link href="/announcements" aria-label="Announcements">
              <Megaphone className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              <span className="absolute right-2.5 top-2.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              </span>
            </Link>
          </Button>

          <Button
            variant="glass"
            size="icon"
            className="h-10 w-10 rounded-full lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border/70 bg-background/95 px-4 py-4 backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/neetrankpredictor"
              onClick={() => setIsOpen(false)}
              className="mb-1 flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-bold text-white shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                NEET Rank Predictor
              </span>
            </Link>

            <Button
              variant="outline"
              className="mb-2 h-11 w-full items-center justify-center gap-2 rounded-2xl border-indigo-500/30 bg-transparent text-xs font-bold text-indigo-500 hover:bg-indigo-500 hover:text-white"
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Need Counselling</span>
            </Button>

            <div className="mb-2 flex items-center justify-between rounded-2xl border border-border/70 bg-card/60 px-4 py-3">
              <div>
                <div className="text-sm font-medium text-foreground">Theme</div>
                <div className="text-xs text-muted-foreground">Cycle visual modes</div>
              </div>
              <AnimatedThemeToggler />
            </div>

            {allLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                    active
                      ? "bg-accent text-white"
                      : "bg-card/50 text-muted-foreground hover:bg-accent/70 hover:text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}