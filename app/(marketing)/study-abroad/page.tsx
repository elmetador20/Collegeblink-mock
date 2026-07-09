"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CollegeCard } from "@/components/college/CollegeCard";
import { StudyAbroadFilters } from "@/components/college/StudyAbroadFilters";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Grid3X3,
  List,
  SlidersHorizontal,
  ChevronDown,
  X,
  Search,
  Sparkles,
  Command,
  Globe,
  GraduationCap,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Filter,
} from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { cn } from "@/lib/utils";
import * as backend from "@/lib/backend";

type ViewMode = "grid" | "list";
type SortOption = "nirfRank" | "fees_asc" | "fees_desc" | "rating";

const STAT_ITEMS = [
  { icon: Globe, label: "Countries", value: "25+" },
  { icon: GraduationCap, label: "Top Universities", value: "800+" },
  { icon: BookOpen, label: "Specializations", value: "2,000+" },
];

function StudyAbroadContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { compareList, addToCompare, removeFromCompare } = useAppStore();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("nirfRank");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSearch, setActiveSearch] = useState(searchParams.get("search") || "");

  const [filters, setFilters] = useState<{
    search: string;
    countries: string[];
    types: string[];
    minFees?: number;
    maxFees?: number;
  }>({
    search: searchParams.get("search") || "",
    countries: searchParams.get("country") ? [searchParams.get("country")!] : [],
    types: [],
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchColleges = useCallback(async (reset = false) => {
    setLoading(true);
    const currentPage = reset ? 1 : page;

    try {
      const queryParams: Record<string, unknown> = {
        page: currentPage,
        limit: 12,
        sortBy,
        sortOrder: "asc" as const,
        excludeCountries: ["India"],
      };

      if (filters.countries.length) {
        queryParams.countries = filters.countries;
      }

      if (filters.search) queryParams.search = filters.search;
      if (filters.types.length) queryParams.types = filters.types;
      if (filters.minFees) queryParams.minFees = filters.minFees;
      if (filters.maxFees) queryParams.maxFees = filters.maxFees;

      const data = await backend.getColleges(queryParams);
      const finalColleges = data?.colleges || [];
      const totalCount = data?.total || 0;

      if (reset) {
        setColleges(finalColleges);
        setPage(2);
      } else {
        setColleges((prev) => [...prev, ...finalColleges]);
        setPage((prev) => prev + 1);
      }
      setTotal(totalCount);
      setHasMore(finalColleges.length === 12);
    } catch (error) {
      console.error("Error fetching study abroad institutions:", error);
      setColleges([]);
      setTotal(0);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy]);

  useEffect(() => {
    fetchColleges(true);
  }, [filters, sortBy]);

  const handleCompareToggle = (collegeId: string) => {
    if (compareList.includes(collegeId)) removeFromCompare(collegeId);
    else if (compareList.length < 4) addToCompare(collegeId);
  };

  const clearFilters = () => {
    setFilters({ search: "", countries: [], types: [] });
    setActiveSearch("");
    router.push("/study-abroad");
  };

  const activeFiltersCount = [
    ...filters.countries,
    ...filters.types,
    filters.minFees,
    filters.maxFees,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/8 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/6 blur-[120px]" />
        
        <svg className="absolute inset-0 w-full h-full opacity-[0.015] dark:opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Globe className="h-3.5 w-3.5" />
            Global Education Explorer
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-4"
          >
            Study in Your{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Dream Destination
            </span>
          </motion.h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Explore world-class universities across the globe. Get expert guidance on applications, visas, and scholarships.
          </p>

          <div className="flex items-center justify-center gap-6 mb-12 flex-wrap">
            {STAT_ITEMS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/60 border border-border/40 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-indigo-500" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-foreground leading-none">{value}</div>
                  <div className="text-[10px] text-muted-foreground leading-none mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-60" />
            <div className="relative flex items-center bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl px-5 py-4 shadow-2xl shadow-black/10 gap-3">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setFilters((f) => ({ ...f, search: activeSearch }));
                }}
                placeholder="Search universities, courses, countries…"
                className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground/60"
              />
              {activeSearch && (
                <button onClick={() => { setActiveSearch(""); setFilters((f) => ({ ...f, search: "" })); }} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className={cn(
        "sticky top-14 md:top-16 z-40 border-b transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-2xl border-border/50 shadow-lg shadow-black/5"
          : "bg-transparent border-transparent"
      )}>
        <div className="container mx-auto max-w-6xl px-4 py-2.5 flex items-center gap-3 flex-wrap">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden rounded-full border-border/50 bg-card/60 backdrop-blur-sm h-9 gap-2">
                <Filter className="h-3.5 w-3.5 text-indigo-500" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="bg-indigo-500 text-white ml-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 border-r border-border/50 bg-background/95 backdrop-blur-xl">
              <div className="h-full overflow-y-auto p-6">
                <StudyAbroadFilters filters={filters} onChange={setFilters} onClear={clearFilters} />
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden lg:flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide">
            <AnimatePresence>
              {filters.countries.map((val) => (
                <motion.div
                  key={val}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs px-3 py-1.5 rounded-full whitespace-nowrap"
                >
                  {val}
                  <button onClick={() => setFilters(f => ({ ...f, countries: f.countries.filter(c => c !== val) }))}>
                    <X className="h-3 w-3 hover:text-white" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1">
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-card/60 backdrop-blur-sm border border-border/50 rounded-full pl-4 pr-8 py-2 text-xs font-medium text-foreground focus:outline-none cursor-pointer hover:border-indigo-500/30 transition-colors"
            >
              <option value="nirfRank">🏆 Top Global Rank</option>
              <option value="fees_asc">💰 Fees: Low → High</option>
              <option value="fees_desc">💰 Fees: High → Low</option>
              <option value="rating">⭐ Best Reviews</option>
            </select>

            <div className="flex bg-card/60 backdrop-blur-sm border border-border/50 rounded-full p-1 gap-0.5">
              {(["grid", "list"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    viewMode === mode ? "bg-indigo-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mode === "grid" ? <Grid3X3 className="h-3.5 w-3.5" /> : <List className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 relative z-10">
        <div className="flex gap-8 items-start">
          <aside className="hidden lg:block w-64 shrink-0 sticky top-32 self-start max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide">
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-5 font-semibold text-sm text-foreground">
                <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
                Refine Search
                {activeFiltersCount > 0 && (
                  <Badge className="ml-auto bg-indigo-500/15 text-indigo-400 border-0 text-xs h-5">{activeFiltersCount}</Badge>
                )}
              </div>
              <StudyAbroadFilters filters={filters} onChange={setFilters} onClear={clearFilters} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {loading && colleges.length === 0 ? (
              <div className={cn("gap-5", viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col")}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 rounded-2xl bg-card/40 animate-pulse border border-border/40" />
                ))}
              </div>
            ) : colleges.length === 0 ? (
              <div className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-sm p-16 text-center">
                <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No institutions found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or target countries.</p>
                <Button onClick={clearFilters} variant="outline" className="rounded-full">Clear Filters</Button>
              </div>
            ) : (
              <div className={cn("gap-5", viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col")}>
                {colleges.map((college, index) => (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CollegeCard
                      college={college}
                      viewMode={viewMode}
                      isCompared={compareList.includes(college.id)}
                      onCompareToggle={() => handleCompareToggle(college.id)}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {hasMore && !loading && (
              <div className="mt-12 flex justify-center">
                <Button onClick={() => fetchColleges()} variant="outline" className="rounded-full px-8 py-6 h-auto">
                  <Sparkles className="mr-2 h-4 w-4 text-indigo-500" />
                  Load More Universities
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.35 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md"
          >
            <div className="bg-background/70 backdrop-blur-2xl border border-white/15 dark:border-white/10 shadow-2xl shadow-indigo-500/15 rounded-2xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {compareList.slice(0, 3).map((id, i) => {
                    const college = colleges.find((c) => c.id === id);
                    return (
                      <div
                        key={id}
                        style={{ zIndex: 10 - i }}
                        className="w-9 h-9 rounded-full bg-card border-2 border-indigo-500/30 flex items-center justify-center text-[11px] font-bold overflow-hidden shadow"
                      >
                        {college?.logo ? (
                          <img src={college.logo} alt="logo" className="w-full h-full object-cover p-0.5" />
                        ) : (
                          <div className="w-full h-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                             {college?.name?.slice(0, 2) || "CO"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {compareList.length > 3 && (
                    <div className="w-9 h-9 rounded-full bg-muted border-2 border-border/50 flex items-center justify-center text-[10px] font-medium text-muted-foreground z-0">
                      +{compareList.length - 3}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">Comparison Dock</p>
                  <p className="text-xs text-muted-foreground leading-tight">{compareList.length}/4 selected</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-red-400 hover:bg-red-400/10"
                  onClick={() => useAppStore.getState().clearCompare()}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white h-9 px-5 font-semibold shadow-lg shadow-indigo-500/25 text-sm"
                >
                  <Link href={`/compare?ids=${compareList.join(",")}`}>
                    Compare Now
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StudyAbroadPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 border-4 border-indigo-500/20 rounded-full" />
            <div className="w-14 h-14 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full absolute inset-0 animate-spin" />
          </div>
          <p className="text-muted-foreground text-sm animate-pulse font-medium">Loading universities…</p>
        </div>
      }
    >
      <StudyAbroadContent />
    </Suspense>
  );
}
