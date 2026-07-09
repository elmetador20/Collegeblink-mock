"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { institutes } from "@/lib/data/institutes";
import { InstituteCard } from "@/components/college/InstituteCard";
import { InstituteFilters } from "@/components/college/InstituteFilters";
import { Search, GraduationCap, Building2, Users, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function InstitutesPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (type: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  const filteredInstitutes = institutes.filter((inst) => {
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inst.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = !activeFilters.type || inst.type === activeFilters.type;
    const matchesExams = !activeFilters.exams || inst.exams.includes(activeFilters.exams);
    const matchesCity = !activeFilters.city || inst.location.includes(activeFilters.city);
    
    return matchesSearch && matchesType && matchesExams && matchesCity;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary"
            >
              <GraduationCap className="h-4 w-4" />
              Institutes & Coaching
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Find the Best <span className="text-primary">Institute</span> <br />
              For You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Compare top-rated coaching centers, professional institutes, and online learning platforms. 
              Get verified details on fees, ratings, and courses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto relative group"
            >
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <div className="relative flex items-center p-2 bg-card/80 backdrop-blur-xl border border-border/50 rounded-full shadow-2xl">
                <Search className="h-5 w-5 ml-4 text-muted-foreground" />
                <Input
                  className="border-none border-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-4 h-12"
                  placeholder="Search for institutes or courses (e.g. Akash, NEET, CAT)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mt-12"
            >
              {[
                { icon: Building2, label: "500+ Institutes", color: "text-indigo-500" },
                { icon: Users, label: "50k+ Students", color: "text-cyan-500" },
                { icon: Trophy, label: "Verified Reviews", color: "text-amber-500" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-sm font-bold text-foreground/80">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <InstituteFilters onFilterChange={handleFilterChange} activeFilters={activeFilters} />

      {/* Results Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-foreground">
              Showing {filteredInstitutes.length} Institutes
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Sort by: <span className="font-bold text-foreground cursor-pointer hover:text-primary transition-colors">Popularity</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredInstitutes.map((inst) => (
                <InstituteCard key={inst.id} institute={inst} />
              ))}
            </AnimatePresence>

            {filteredInstitutes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border"
              >
                <div className="text-muted-foreground mb-4">No institutes found matching your criteria.</div>
                <button 
                  onClick={() => {setActiveFilters({}); setSearchQuery("");}}
                  className="text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
