"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, GraduationCap } from "lucide-react";
import * as backend from "@/lib/backend";

const courseIcons: Record<string, { icon: string; color: string }> = {
  "mba/pgdm": { icon: "🎓", color: "from-orange-500/20 to-amber-500/20" },
  "m.tech": { icon: "⚙️", color: "from-blue-500/20 to-cyan-500/20" },
  "b.tech": { icon: "🔧", color: "from-indigo-500/20 to-purple-500/20" },
  "m.com": { icon: "📊", color: "from-green-500/20 to-emerald-500/20" },
  "b.com": { icon: "💼", color: "from-teal-500/20 to-cyan-500/20" },
  "bams": { icon: "🌿", color: "from-lime-500/20 to-green-500/20" },
  "bba": { icon: "📈", color: "from-yellow-500/20 to-orange-500/20" },
  "bca": { icon: "💻", color: "from-violet-500/20 to-purple-500/20" },
  "ma": { icon: "📚", color: "from-pink-500/20 to-rose-500/20" },
  "ba": { icon: "🎨", color: "from-amber-500/20 to-yellow-500/20" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

export function CoursesSection({ 
  initialCourses = [], 
  initialColleges = [] 
}: { 
  initialCourses?: string[], 
  initialColleges?: any[] 
} = {}) {
  const [courses, setCourses] = useState<string[]>(initialCourses.length > 0 ? initialCourses : []);
  const [activeTab, setActiveTab] = useState(initialCourses.length > 0 ? initialCourses[0] : "");
  const [colleges, setColleges] = useState<any[]>(initialColleges);
  const [loading, setLoading] = useState(initialCourses.length === 0);

  useEffect(() => {
    if (initialCourses.length === 0) {
      fetchCourses();
    }
  }, [initialCourses]);

  useEffect(() => {
    if (activeTab && (activeTab !== initialCourses[0] || colleges.length === 0)) {
      setLoading(true);
      fetchCollegesByCourse(activeTab).finally(() => setLoading(false));
    }
  }, [activeTab, initialCourses, colleges.length]);

  const fetchCourses = async () => {
    try {
      const data = await backend.getUniqueCourses();
      const courseList = data || [];
      setCourses(courseList);
      if (courseList.length > 0) {
        setActiveTab(courseList[0]);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setCourses(["MBA/PGDM", "M.Tech", "B.Tech", "M.Com", "B.Com", "BAMS", "BBA", "BCA", "MA", "BA"]);
      setActiveTab("MBA/PGDM");
    } finally {
      if (initialColleges.length > 0) {
         setLoading(false);
      }
    }
  };

  const fetchCollegesByCourse = async (course: string) => {
    try {
      const data = await backend.getCollegesByCourse(course);
      setColleges(data?.colleges || []);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
      setColleges([]);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <Badge className="mb-3 rounded-full bg-primary/10 border-primary/20 text-primary px-2.5 py-0.5 text-xs font-medium">
            <GraduationCap className="mr-1.5 h-3 w-3" />
            Top Courses
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore by Course
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Find the best colleges for your preferred course across India
          </p>
        </div>

        
        <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-2 min-w-max px-1">
            {loading ? (
              <div className="text-muted-foreground text-sm">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="text-muted-foreground text-sm">No courses available</div>
            ) : (
              courses.map((course) => {
                const courseKey = course.toLowerCase();
                const iconData = courseIcons[courseKey] || { icon: "📚", color: "from-gray-500/20 to-gray-500/20" };
                return (
                  <motion.button
                    key={course}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(course)}
                    className={`px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeTab === course
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                        : "bg-card/60 border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <span className="mr-1.5">{iconData.icon}</span>
                    {course}
                  </motion.button>
                );
              })
            )}
          </div>
        </div>

        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card p-5 rounded-2xl border border-border/60 animate-pulse">
                <div className="h-20 bg-muted/50 rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {colleges.slice(0, 4).map((college, i) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 80 }}
              >
                <Link href={`/colleges/${college.slug}`}>
                  <div className="group glass-card p-5 rounded-2xl border border-border/60 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center text-2xl">
                        {courseIcons[activeTab.toLowerCase()]?.icon || "📚"}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {college.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                      <span>📍 {college.city}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary border-primary/20">
                      {college.type}
                    </Badge>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
            >
              <Link href={`/colleges?course=${activeTab.toLowerCase()}`}>
                <div className="group glass-card p-5 rounded-2xl border border-border/60 hover:border-primary/30 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[140px]">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">View All Colleges</h3>
                  <p className="text-xs text-muted-foreground">
                    Explore {activeTab} programs
                  </p>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
