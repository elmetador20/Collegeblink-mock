"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import * as backend from "@/lib/backend";

interface StickySearchProps {
  isVisible: boolean;
}

export default function StickySearch({ isVisible }: StickySearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const searchColleges = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const data = await backend.getColleges({ search: searchQuery, limit: 6 });
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
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-20 left-0 right-0 z-40 px-4"
    >
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
        <div className={`relative p-2 backdrop-blur-xl border rounded-full shadow-2xl flex items-center transition-all duration-300 ${isSearchFocused ? 'border-primary/50 bg-card/95 ring-2 ring-primary/10' : 'border-border/60 bg-card/80'}`}>
          <Search className={`h-5 w-5 ml-3 transition-colors duration-300 ${isSearchFocused ? 'text-primary' : 'text-muted-foreground'}`} />
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
            className="flex-1 bg-transparent border-none outline-none text-foreground text-sm ml-3 mr-2 placeholder:text-muted-foreground"
            placeholder="Search colleges, exams, courses..."
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
              className="mr-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleExplore}
            className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1.5 text-sm font-medium shadow-md hover:shadow-amber-500/25 transition-all"
          >
            Go
          </button>
        </div>

        
        <AnimatePresence>
          {isSearchFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-[calc(100%+8px)] left-0 w-full bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl p-4 shadow-2xl text-left max-h-80 overflow-y-auto z-50 text-foreground"
            >
              {searchQuery.length < 2 ? (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  Start typing to search colleges...
                </div>
              ) : (
                <div className="space-y-2">
                  {isSearching ? (
                    <div className="flex items-center justify-center py-6">
                      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground text-sm">
                      No colleges found
                    </div>
                  ) : (
                    searchResults.map((college) => (
                      <button
                        key={college.id}
                        onClick={() => {
                          router.push(`/colleges/${college.slug}`);
                          setSearchQuery("");
                          setSearchResults([]);
                          setIsSearchFocused(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center text-xl">
                          🎓
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-foreground text-sm mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
                            {college.name}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>📍 {college.city}</span>
                            {college.type && (
                              <>
                                <span>•</span>
                                <span>{college.type}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
