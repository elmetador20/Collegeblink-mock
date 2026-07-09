"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Filter, X, Grid3X3, List, Layers, Users, GraduationCap, SlidersHorizontal } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { CourseFilters, CourseFilterState } from "@/components/course/CourseFilters";
import { COURSES_DATA } from "@/lib/data/courses";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DEPARTMENT_COUNT = new Set(COURSES_DATA.map((c) => c.department)).size;

const STAT_ITEMS = [
  { icon: GraduationCap, label: "Programs", value: `${COURSES_DATA.length}+` },
  { icon: Layers, label: "Departments", value: `${DEPARTMENT_COUNT}+` },
];

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<CourseFilterState>({
    departments: [],
    levels: [],
    modes: [],
  });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.fullTitle.toLowerCase().includes(search.toLowerCase()) ||
        course.department.toLowerCase().includes(search.toLowerCase());
      const matchesDepartment = filters.departments.length === 0 || filters.departments.includes(course.department);
      const matchesLevel = filters.levels.length === 0 || filters.levels.includes(course.level);
      const matchesMode = filters.modes.length === 0 || filters.modes.includes(course.mode);
      return matchesSearch && matchesDepartment && matchesLevel && matchesMode;
    });
  }, [search, filters]);

  const clearFilters = () => {
    setFilters({ departments: [], levels: [], modes: [] });
    setSearch("");
  };

  const removeFilterValue = (value: string) => {
    setFilters((f) => ({
      departments: f.departments.filter((d) => d !== value),
      levels: f.levels.filter((l) => l !== value) as CourseFilterState["levels"],
      modes: f.modes.filter((m) => m !== value) as CourseFilterState["modes"],
    }));
  };

  const activeFiltersCount = filters.departments.length + filters.levels.length + filters.modes.length;

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-500 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Complete Admission Guide
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-4"
            >
              Find Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
                Academic Program
              </span>
            </motion.h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Explore undergraduate, postgraduate, and doctoral programs across departments, with eligibility and duration at a glance.
            </p>

            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
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
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-60" />
            <div className="relative flex items-center bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl px-5 py-4 shadow-2xl shadow-black/10 gap-3">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search programs like B.Tech, MBA, MBBS, LLB..."
                className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground/60"
              />
              {search && (
                <button onClick={() => setSearch("")} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={cn(
        "sticky top-[4.5rem] z-40 border-b transition-all duration-300",
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
                <CourseFilters filters={filters} onChange={setFilters} onClear={clearFilters} />
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
              {[...filters.departments, ...filters.levels, ...filters.modes].map((val) => (
                <motion.div
                  key={val}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-accent text-xs px-3 py-1.5 rounded-full whitespace-nowrap"
                >
                  {val}
                  <button onClick={() => removeFilterValue(val)}>
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
          <aside className="hidden lg:block w-64 shrink-0 sticky top-[calc(4.5rem+3rem)] self-start max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide">
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-5 font-semibold text-sm text-foreground">
                <SlidersHorizontal className="h-4 w-4 text-accent" />
                Refine Programs
                {activeFiltersCount > 0 && (
                  <Badge className="ml-auto bg-accent/15 text-accent border-0 text-xs h-5">{activeFiltersCount}</Badge>
                )}
              </div>
              <CourseFilters filters={filters} onChange={setFilters} onClear={clearFilters} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20 bg-card/40 backdrop-blur-sm rounded-3xl border border-dashed border-border/50">
                <X className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold">No programs found</h3>
                <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters or search query.</p>
                <Button variant="outline" className="mt-6 rounded-full" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={cn(
                "gap-6",
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col"
              )}>
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}