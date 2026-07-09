"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CollegeCard } from "@/components/college/CollegeCard";
import { CollegeFilters } from "@/components/college/CollegeFilters";
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
  GraduationCap,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Filter,
} from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { cn } from "@/lib/utils";

import { useNeuralProfile } from "@/hooks/useNeuralProfile";
import { calculateBatchMatchScores, sortCollegesByMatchScore, getMatchWeights } from "@/lib/matchScore";

type ViewMode = "grid" | "list";
type SortOption = "nirfRank" | "fees_asc" | "fees_desc" | "rating" | "match";

const STAT_ITEMS = [
  { icon: GraduationCap, label: "Top Colleges", value: "1,200+" },
  { icon: BookOpen, label: "Courses", value: "50,000+" },
  { icon: TrendingUp, label: "Avg Placement", value: "₹12 LPA" },
];

function CollegesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { compareList, addToCompare, removeFromCompare } = useAppStore();
  const profile = useNeuralProfile((state) => state.profile);

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
    states: string[];
    cities: string[];
    types: string[];
    minFees?: number;
    maxFees?: number;
    minNirfRank?: number;
    maxNirfRank?: number;
  }>({
    search: searchParams.get("search") || "",
    states: [],
    cities: [],
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
    const courseParam = searchParams.get("course");
    const cityParam = searchParams.get("city");
    const examParam = searchParams.get("exam");

    let finalColleges: any[] = [];
    let totalCount = 0;

    try {
      if (courseParam) {
        const res = await fetch(`/api/colleges?course=${encodeURIComponent(courseParam)}&country=India`);
        if (res.ok) {
          const data = await res.json();
          finalColleges = data?.colleges || [];
          totalCount = data?.total || 0;
        }
      } else if (cityParam) {
        const res = await fetch(`/api/colleges?city=${encodeURIComponent(cityParam)}&country=India`);
        if (res.ok) {
          const data = await res.json();
          finalColleges = data?.colleges || [];
          totalCount = data?.total || 0;
        }
      } else if (examParam) {
        const res = await fetch(`/api/colleges?exam=${encodeURIComponent(examParam)}&country=India`);
        if (res.ok) {
          const data = await res.json();
          finalColleges = data?.colleges || [];
          totalCount = data?.total || 0;
        }
      } else {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: "12",
          sortBy,
          sortOrder: "asc",
          country: "India",
        });
        
        if (filters.search) queryParams.append("search", filters.search);
        filters.states.forEach(s => queryParams.append("state", s));
        filters.cities.forEach(c => queryParams.append("city", c));
        filters.types.forEach(t => queryParams.append("type", t));
        if (filters.minFees) queryParams.append("feesMin", filters.minFees.toString());
        if (filters.maxFees) queryParams.append("feesMax", filters.maxFees.toString());
        if (filters.minNirfRank) queryParams.append("nirfMin", filters.minNirfRank.toString());
        if (filters.maxNirfRank) queryParams.append("nirfMax", filters.maxNirfRank.toString());

        const res = await fetch(`/api/colleges?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          finalColleges = data?.colleges || [];
          totalCount = data?.total || 0;
        }
      }

      if (profile?.isComplete) {
        const weights = await getMatchWeights();
        let budgetMax: number | undefined;
        if (profile.budget) {
          const budgetMatch = profile.budget.match(/(\d+)/);
          if (budgetMatch) budgetMax = parseInt(budgetMatch[1]) * 100000;
        }
        finalColleges = calculateBatchMatchScores(
          finalColleges,
          { stream: profile.stream, budgetMax, budgetRange: budgetMax, locations: profile.locations || [], desires: profile.priorities || [] },
          weights
        );
        if (sortBy === "match") finalColleges = sortCollegesByMatchScore(finalColleges, true);
      }

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
      console.error("Error fetching colleges:", error);
      setColleges([]);
      setTotal(0);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy, profile, searchParams]);

  useEffect(() => {
    fetchColleges(true);
  }, [filters, sortBy]);

  const handleCompareToggle = (collegeId: string) => {
    if (compareList.includes(collegeId)) removeFromCompare(collegeId);
    else if (compareList.length < 4) addToCompare(collegeId);
  };

  const clearFilters = () => {
    setFilters({ search: "", states: [], cities: [], types: [] });
    setActiveSearch("");
    router.push("/colleges");
  };

  const activeFiltersCount = [
    ...filters.states,
    ...filters.cities,
    ...filters.types,
    filters.minFees,
    filters.maxFees,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background relative">
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/6 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[100px]" />
        
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
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            {profile?.isComplete && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold uppercase tracking-widest mb-4"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Neural Profile Active — Personalised Results
              </motion.div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-4"
            >
              {profile?.isComplete ? (
                <>
                  Your Perfect{" "}
                  <span className="bg-gradient-to-r from-accent via-violet-500 to-teal-400 bg-clip-text text-transparent">
                    College Matches
                  </span>
                </>
              ) : (
                <>
                  Discover{" "}
                  <span className="bg-gradient-to-r from-accent via-violet-500 to-teal-400 bg-clip-text text-transparent">
                    Top Colleges
                  </span>{" "}
                  in India
                </>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground text-lg max-w-xl mx-auto"
            >
              {profile?.isComplete
                ? `Showing ${total} precision-matched colleges based on your preferences`
                : `Explore ${total}+ institutions ranked by NIRF, placements & student reviews`}
            </motion.p>

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-6 mt-8 flex-wrap"
            >
              {STAT_ITEMS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/60 border border-border/40 backdrop-blur-sm">
                  <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-foreground leading-none">{value}</div>
                    <div className="text-[10px] text-muted-foreground leading-none mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 via-violet-500/20 to-teal-500/20 rounded-2xl blur-lg opacity-60" />
            <div className="relative flex items-center bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl px-5 py-4 shadow-2xl shadow-black/10 gap-3">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setFilters((f) => ({ ...f, search: activeSearch }));
                }}
                placeholder="Search colleges, cities, courses…"
                className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground/60"
              />
              {activeSearch && (
                <button onClick={() => { setActiveSearch(""); setFilters((f) => ({ ...f, search: "" })); }} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
              <div className="hidden md:flex items-center gap-1 px-2.5 py-1.5 bg-muted/80 rounded-lg text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                <Command className="h-3 w-3" /> K
              </div>
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
                <Filter className="h-3.5 w-3.5 text-accent" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="bg-accent text-white ml-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 border-r border-border/50 bg-background/95 backdrop-blur-xl">
              <div className="h-full overflow-y-auto p-6">
                <CollegeFilters filters={filters} onChange={setFilters} onClear={clearFilters} />
              </div>
            </SheetContent>
          </Sheet>

          
          <div className="hidden lg:flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide">
            {activeFiltersCount === 0 && (
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-border/50">
                <Sparkles className="h-3 w-3" /> Add filters to refine results
              </span>
            )}
            <AnimatePresence>
              {[...filters.states, ...filters.cities, ...filters.types].map((val) => (
                <motion.div
                  key={val}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-accent text-xs px-3 py-1.5 rounded-full whitespace-nowrap"
                >
                  {val}
                  <button onClick={clearFilters}>
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
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-card/60 backdrop-blur-sm border border-border/50 rounded-full pl-4 pr-8 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer hover:border-accent/30 transition-colors"
              >
                {profile?.isComplete && <option value="match">✨ Smart Match</option>}
                <option value="nirfRank">🏆 Top Ranked</option>
                <option value="fees_asc">💰 Fees: Low → High</option>
                <option value="fees_desc">💰 Fees: High → Low</option>
                <option value="rating">⭐ Best Reviews</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>

            <div className="flex bg-card/60 backdrop-blur-sm border border-border/50 rounded-full p-1 gap-0.5">
              {(["grid", "list"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200 text-muted-foreground",
                    viewMode === mode ? "bg-accent text-white shadow-sm shadow-accent/30" : "hover:text-foreground hover:bg-muted"
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
                <SlidersHorizontal className="h-4 w-4 text-accent" />
                Refine Search
                {activeFiltersCount > 0 && (
                  <Badge className="ml-auto bg-accent/15 text-accent border-0 text-xs h-5">{activeFiltersCount}</Badge>
                )}
              </div>
              <CollegeFilters filters={filters} onChange={setFilters} onClear={clearFilters} />
            </div>
          </aside>

          
          <div className="flex-1 min-w-0">
            
            {!loading && colleges.length > 0 && (
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{colleges.length}</span> of{" "}
                  <span className="font-semibold text-foreground">{total}</span> colleges
                </p>
              </div>
            )}

            {loading && colleges.length === 0 ? (

              <div className={cn(
                "gap-5",
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col"
              )}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-2xl border border-border/40 bg-card/40 animate-pulse overflow-hidden relative">
                    <div className="h-32 bg-muted/60" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-muted rounded-md w-3/4" />
                      <div className="h-3 bg-muted rounded-md w-1/2" />
                      <div className="flex gap-2 mt-4">
                        <div className="h-6 w-16 bg-muted rounded-full" />
                        <div className="h-6 w-20 bg-muted rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : colleges.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-sm p-16 text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                  <Search className="h-9 w-9 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">No colleges found</h3>
                <p className="text-muted-foreground max-w-xs mx-auto mb-6 text-sm">
                  Try adjusting your filters or broadening your search criteria.
                </p>
                <Button onClick={clearFilters} className="rounded-full bg-accent hover:bg-accent/90">
                  Clear All Filters
                </Button>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className={cn(
                    "gap-5",
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col"
                  )}
                >
                  {colleges.map((college, index) => (
                    <motion.div
                      layout
                      key={college.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: index * 0.04, type: "spring", bounce: 0.2 }}
                    >
                      <CollegeCard
                        college={college}
                        viewMode={viewMode}
                        isCompared={compareList.includes(college.id)}
                        onCompareToggle={() => handleCompareToggle(college.id)}
                        matchScore={college.matchScore}
                        matchReason={college.matchReason}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            
            {hasMore && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 flex justify-center"
              >
                <button
                  onClick={() => fetchColleges()}
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm text-sm font-medium text-foreground hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4 text-accent group-hover:animate-pulse" />
                  Load More Colleges
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {!hasMore && colleges.length > 0 && (
              <div className="mt-12 flex items-center gap-3 justify-center text-xs text-muted-foreground">
                <div className="flex-1 max-w-[80px] h-px bg-border/50" />
                You've seen all {total} results
                <div className="flex-1 max-w-[80px] h-px bg-border/50" />
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
            <div className="bg-background/70 backdrop-blur-2xl border border-white/15 dark:border-white/10 shadow-2xl shadow-accent/15 rounded-2xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {compareList.slice(0, 3).map((id, i) => {
                    const college = colleges.find((c) => c.id === id);
                    return (
                      <div
                        key={id}
                        style={{ zIndex: 10 - i }}
                        className="w-9 h-9 rounded-full bg-card border-2 border-accent/30 flex items-center justify-center text-[11px] font-bold overflow-hidden shadow"
                      >
                        {college?.logo ? (
                          <img src={college.logo} alt="logo" className="w-full h-full object-cover p-0.5" />
                        ) : (
                          college?.name?.slice(0, 2) || "CO"
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
                  className="rounded-xl bg-gradient-to-r from-accent to-violet-500 text-white h-9 px-5 font-semibold shadow-lg shadow-accent/25 text-sm"
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

export default function CollegesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 border-4 border-accent/20 rounded-full" />
            <div className="w-14 h-14 border-4 border-t-accent border-r-transparent border-b-transparent border-l-transparent rounded-full absolute inset-0 animate-spin" />
          </div>
          <p className="text-muted-foreground text-sm animate-pulse font-medium">Finding your perfect colleges…</p>
        </div>
      }
    >
      <CollegesContent />
    </Suspense>
  );
}
