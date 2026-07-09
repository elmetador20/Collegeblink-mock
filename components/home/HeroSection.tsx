"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


const searchPlaceholders = [
  "Search colleges, exams, courses...",
  "Search IIT colleges...",
  "Best MBA under 10L...",
  "Top Medical schools in Delhi...",
];

const quickChips = [
  { label: "B.Tech", icon: "🎓", filter: "stream=engineering" },
  { label: "Scholarships", icon: "💰", filter: "scholarships=true" },
  { label: "Delhi", icon: "📍", filter: "state=delhi" },
  { label: "MBA", icon: "🏫", filter: "course=mba" },
  { label: "Medical", icon: "🩺", filter: "stream=medical" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

interface HeroSectionProps {
  stats?: {
    colleges: number;
    students: number;
    scholarships: number;
    successRate: number;
  };
}

export default function HeroSection({ stats }: HeroSectionProps) {
  const router = useRouter();
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const searchColleges = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const res = await fetch(`/api/colleges?search=${encodeURIComponent(searchQuery)}&limit=6`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setSearchResults(data?.colleges || []);
      } catch (error) {
        console.error("Error searching colleges:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchColleges, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleExplore = () => {
    router.push(`/colleges${searchQuery ? `?search=${searchQuery}` : ""}`);
  };

  const handleChipClick = (filter: string) => {
    router.push(`/colleges?${filter}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/imageshero-childrenf.jpg"
          alt="Campus Life"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>

      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          
          <motion.div variants={fadeUp}>
            <Badge className="mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-white border-primary/20 backdrop-blur-md shadow-sm text-sm hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer">
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              The Next Generation of College Discovery
            </Badge>
          </motion.div>

          
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Find Your Perfect College, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">
              Faster.
            </span>
          </motion.h1>

          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Skip the noise. Let our smart system analyze millions of data points to find the exact colleges where you'll thrive, get accepted, and succeed.
          </motion.p>

          
          <motion.div variants={fadeUp} className="w-full max-w-2xl relative mb-8 group z-30">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
            <div className={`relative p-2 backdrop-blur-xl border rounded-full shadow-2xl flex items-center transition-all duration-300 ${isSearchFocused ? 'border-primary bg-card/95' : 'border-white/30 bg-white/10'}`}>
              <Search className={`h-6 w-6 ml-4 transition-colors duration-300 ${isSearchFocused ? 'text-primary' : (searchQuery ? 'text-foreground' : 'text-white/70')}`} />
              <div className="relative flex-1 h-12 ml-3 overflow-hidden flex items-center">
                <AnimatePresence mode="popLayout">
                  {!isSearchFocused && (
                    <motion.div
                      key={placeholderIdx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center text-white/50 text-base pointer-events-none"
                    >
                      {searchPlaceholders[placeholderIdx]}
                    </motion.div>
                  )}
                </AnimatePresence>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleExplore();
                    }
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="w-full bg-transparent border-none border-0 shadow-none outline-none text-foreground dark:text-white text-base relative z-10 placeholder-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none focus:border-transparent focus:shadow-none"
                  placeholder={isSearchFocused ? "Try 'Top B.Tech in Pune...'" : ""}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExplore}
                className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 h-auto font-semibold text-base shadow-lg hover:shadow-amber-500/25 transition-all"
              >
                Explore
              </motion.button>
            </div>

            
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute top-[calc(100%+12px)] left-0 w-full bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl p-5 shadow-2xl text-left max-h-96 overflow-y-auto z-50 text-foreground"
                >
                  {searchQuery.length < 2 ? (
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Quick Filters</div>
                        <div className="flex flex-wrap gap-2">
                          {quickChips.map((chip) => (
                            <button
                              key={chip.label}
                              onClick={() => handleChipClick(chip.filter)}
                              className="px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium"
                            >
                              <span className="mr-2">{chip.icon}</span>
                              {chip.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {isSearching ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : searchResults.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                          No colleges found
                        </div>
                      ) : (
                        searchResults.map((college) => (
                          <Link
                            key={college.id}
                            href={`/colleges/${college.slug}`}
                            onClick={() => {
                              setSearchQuery("");
                              setSearchResults([]);
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center text-2xl">
                              🎓
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-foreground text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                {college.name}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>📍 {college.city}</span>
                                {college.type && (
                                  <>
                                    <span>•</span>
                                    <span>{college.type}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          
          <motion.div variants={fadeUp} className="w-full max-w-2xl mb-10">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
              {quickChips.map((chip) => (
                <motion.button
                  key={chip.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChipClick(chip.filter)}
                  className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all whitespace-nowrap text-sm font-medium"
                >
                  <span className="mr-2">{chip.icon}</span>
                  {chip.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          
          <motion.div variants={fadeUp}>
            <Link
              href="/quiz"
              className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm font-medium"
            >
              Not sure where to start? Take our 30-second quiz <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
