"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getInitials } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Search, Bell, Flame, Command, Menu, X, ArrowLeft } from "lucide-react";
import { track } from "@/lib/track";

const MobileDrawer = dynamic(() => import("./MobileDrawer"), { ssr: false });

export default function Topbar({ title = "Dashboard", isAdmin = false }: { title?: string; isAdmin?: boolean }) {
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      
      <header className="md:hidden h-[56px] bg-white/80 dark:bg-[#121214]/80 backdrop-blur-xl border-b-2 border-gray-100/50 dark:border-white/5 flex-shrink-0 sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-colors duration-500">
        <div className="w-full h-full flex items-center justify-between px-4">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-200"
          >
            <Menu className="h-4 w-4" />
          </button>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h1>
          <div className="w-8" />
        </div>
      </header>

      
      <header className="h-[64px] bg-white/80 dark:bg-[#121214]/80 backdrop-blur-xl border-b-2 border-gray-100/50 dark:border-white/5 flex-shrink-0 sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-colors duration-500 hidden md:block">
        <div className="max-w-[1600px] mx-auto w-full h-full flex items-center justify-between px-4">
          
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:block">
              <h1 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h1>
              <div className="h-0.5 w-5 bg-accent rounded-full mt-0.5" />
            </div>
          </div>

          
          <div className="flex-1 mx-8 hidden lg:block">
            <form className="relative group w-full" onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) track("search_used", { query: searchQuery });
            }}>
              <Search className="lucide lucide-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" />
              <input 
                placeholder="Search across CollegeBlink..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium text-gray-950 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-[#1A1A1E] focus:border-accent/30 dark:focus:border-accent/30 transition-all" 
                type="text" 
              />
            </form>
          </div>

          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex">
               <AnimatedThemeToggler className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-200" />
            </div>

            <div className="relative">
              <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#121214]"></span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-px h-6 bg-gray-100 dark:bg-white/10 hidden md:block"></div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent hover:border-gray-100 dark:hover:border-white/5 transition-all duration-200 outline-none">
                    <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
                      {session?.user?.avatar ? (
                        <img alt="User" className="w-full h-full object-cover" src={session.user.avatar} />
                      ) : (
                        <div className="text-white font-semibold text-sm">{getInitials(session?.user?.name || "U")}</div>
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">
                        {session?.user?.name || "Guest User"}
                      </p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121214] p-1 shadow-lg" align="end">
                  <DropdownMenuItem asChild className="rounded-md font-medium text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5">
                    <Link href="/dashboard/profile">View Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-100 dark:bg-white/5" />
                  <DropdownMenuItem 
                    className="rounded-md font-medium text-sm cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-500/10"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          
        </div>
      </header>

      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isAdmin={isAdmin} />
    </>
  );
}
