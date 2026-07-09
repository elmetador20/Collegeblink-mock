"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import HeroSection from "@/components/home/HeroSection";
import LiveAdmissionTracker from "@/components/home/LiveAdmissionTracker";

const CoursesSection = dynamic(() => import("@/components/home/CoursesSection").then(m => m.CoursesSection), { ssr: false });
const ExamsSection = dynamic(() => import("@/components/home/ExamsSection").then(m => m.ExamsSection), { ssr: false });
const StudyAbroadSection = dynamic(() => import("@/components/home/StudyAbroadSection").then(m => m.StudyAbroadSection), { ssr: false });
const CityBrowseSection = dynamic(() => import("@/components/home/CityBrowseSection").then(m => m.CityBrowseSection), { ssr: false });

import ComparisonToolHighlight from "@/components/home/ComparisonToolHighlight";
import StickySearch from "@/components/home/StickySearch";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import * as backend from "@/lib/backend";
import {
  Search,
  Sparkles,
  MapPin,
  BookOpen,
  Briefcase,
  Scale,
  Palette,
  ArrowRight,
  TrendingUp,
  Star,
  Quote,
  Zap,
  Globe,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  BadgeCheck,
  Eye
} from "lucide-react";
import RankPredictorPromo from "@/components/home/RankPredictorDemo";

const USE_MOCK = process.env.NODE_ENV === "development";

const streams = [
  { name: "Engineering", icon: BookOpen, count: "6,000+ Colleges", color: "from-blue-500/20 to-cyan-500/20", text: "text-blue-500" },
  { name: "Management", icon: Briefcase, count: "8,000+ Colleges", color: "from-accent/20 to-accent/20", text: "text-accent" },
  { name: "Commerce", icon: TrendingUp, count: "5,000+ Colleges", color: "from-accent/20 to-accent/20", text: "text-accent" },
  { name: "Medical", icon: Sparkles, count: "2,500+ Colleges", color: "from-red-500/20 to-pink-500/20", text: "text-pink-500" },
  { name: "Law", icon: Scale, count: "5,000+ Colleges", color: "from-orange-500/20 to-amber-500/20", text: "text-amber-500" },
  { name: "Arts", icon: Palette, count: "2,500+ Colleges", color: "from-purple-500/20 to-violet-500/20", text: "text-violet-500" },
];

const features = [
  { title: "Smart Matching", description: "Our Smart system pairs you with colleges where you have the highest probability of acceptance.", icon: Zap },
  { title: "Rich College Data", description: "Get immersive insights into campus life, placement data, and student reviews.", icon: TrendingUp },
  { title: "One-Click Shortlist", description: "Instantly build and compare your dream college list.", icon: Star },
  { title: "Automated Tracking", description: "Get automated alerts for tests, applications, and scholarship dates.", icon: Globe },
];

const testimonials = [
  { name: "Aarushi T.", college: "IIT Delhi", journey: "Confused → Admitted", text: "CollegeBlink's Smart system matched me to programs I didn't even know existed. The interface is just gorgeous and so easy to use.", rating: 5, verified: true },
  { name: "Karan S.", college: "IIM Bangalore", journey: "Overwhelmed → Focused", text: "The clean UI and accurate placement stats saved me hundreds of hours of research. Highly recommended.", rating: 5, verified: true },
  { name: "Riya M.", college: "NID Ahmedabad", journey: "Stressed → Accepted", text: "Finally a platform that feels like it belongs in 2026. The search is lightning fast.", rating: 5, verified: true },
];

const searchPlaceholders = [
  "Search IIT colleges...",
  "Best MBA under 10L...",
  "Top Medical schools in Delhi...",
  "Design colleges with fast placement...",
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

const Counter = ({ value, label, icon: Icon }: { value: string, label: string, icon: any }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-md shadow-sm"
  >
    <div className="p-1 rounded-full bg-primary/20">
      <Icon className="h-3.5 w-3.5 text-primary" />
    </div>
    <div className="flex flex-col items-start leading-none gap-0.5">
      <span className="font-bold text-foreground text-[13px] tracking-tight">{value}</span>
      <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">{label}</span>
    </div>
  </motion.div>
);

export default function HomeClient({ 
  stats,
  featuredColleges = [],
  initialCourses = [],
  initialCourseColleges = [],
  initialExams = [],
  initialCities = []
}: { 
  stats: any,
  featuredColleges?: any[],
  initialCourses?: string[],
  initialCourseColleges?: any[],
  initialExams?: string[],
  initialCities?: any[]
}) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [showStickySearch, setShowStickySearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickySearch(scrollY.get() > 500);
    };
    const unsubscribe = scrollY.on("change", handleScroll);
    return () => unsubscribe();
  }, [scrollY]);

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickExam, setQuickExam] = useState("JEE");
  const [quickScore, setQuickScore] = useState("");
  const [quickState, setQuickState] = useState("");
  const [quickBudget, setQuickBudget] = useState("");

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

  const topMatches = useMemo(() => featuredColleges.slice(0, 2), [featuredColleges]);

  const track = async (event: string, data?: Record<string, unknown>) => {
    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, data, timestamp: Date.now() }),
      });
    } catch {

    }
  };

  const goToColleges = (params: Record<string, string | undefined>) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value && value.trim().length > 0) {
        sp.set(key, value.trim());
      }
    });
    router.push(`/colleges${sp.toString() ? `?${sp.toString()}` : ""}`);
  };

  const handleExplore = () => {
    track("home_search_submit", { query: searchQuery });
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "hero_search_used", {
        search_query: searchQuery || "empty"
      });
    }
    goToColleges({ search: searchQuery || undefined });
  };

  const handleQuickStart = () => {
    track("home_quick_start_submit", {
      exam: quickExam,
      score: quickScore,
      state: quickState,
      budget: quickBudget,
    });

    const feesMax = quickBudget ? String(parseInt(quickBudget, 10)) : undefined;
    goToColleges({
      exam: quickExam,
      search: quickScore ? `${quickExam} ${quickScore}` : undefined,
      state: quickState || undefined,
      feesMax,
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const springConfig = { stiffness: 100, damping: 25, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [cursorX, cursorY]);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [emblaTestimonialRef] = useEmblaCarousel({ loop: true, align: "center" });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="relative flex flex-col bg-background">

      <AnimatePresence>
        {showStickySearch && <StickySearch isVisible={showStickySearch} />}
      </AnimatePresence>


      <WhatsAppCTA />


      <HeroSection stats={stats} />


      {/* <LiveAdmissionTracker /> */}
      <RankPredictorPromo />


      <ComparisonToolHighlight />


      <section className="py-20 bg-card/20 border-y border-border/40 relative">
        <div className="container mx-auto px-4 mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Trending Campuses</h2>
            <p className="text-sm md:text-base text-muted-foreground">The most frequently shortlisted this week</p>
          </div>
          <div className="hidden md:flex gap-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollPrev} className="h-10 w-10 rounded-full border border-border/60 bg-card/60 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollNext} className="h-10 w-10 rounded-full border border-border/60 bg-card/60 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors">
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        <div className="pl-4 md:pl-[max(1rem,calc((100vw-1120px)/2+1rem))]">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 pb-8 pr-4">
              {featuredColleges.map((college, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                  key={college.id}
                  className="flex-[0_0_85%] sm:flex-[0_0_320px]"
                >
                  <Link href={`/colleges/${college.id}`}>
                    <div className="group relative h-[380px] w-full overflow-hidden rounded-[2rem] bg-card border border-border/30 shadow-md transition-all duration-500 hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1">
                      <div className="absolute inset-0 z-0">
                        {college.coverImage ? (
                          <Image
                            src={college.coverImage}
                            alt={college.name}
                            fill
                            sizes="(max-width: 640px) 85vw, 320px"
                            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-orange-500/20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                      </div>

                      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start">
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <TrendingUp className="h-3 w-3 text-amber-400" /> {college.ranking}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                          <Eye className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform transition-transform duration-500">
                        <div className="mb-2 inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-widest">
                          <MapPin className="h-3 w-3" />
                          {college.location}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                          {college.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-4">
                          <span className="backdrop-blur-md bg-white/10 border border-white/10 text-white/90 px-2.5 py-1 rounded-lg text-xs font-medium">{college.type}</span>
                          <span className="backdrop-blur-md bg-white/10 border border-white/10 text-white/90 px-2.5 py-1 rounded-lg text-xs font-medium">{college.acceptance}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-3 text-xs text-white/80">
                          <span>💰 {college.feesRange || "₹8-15L"}</span>
                          <span>•</span>
                          <span>📊 {college.placement || "92%"} placement</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <Badge className="mb-3 rounded-full bg-primary/10 border-primary/20 text-primary px-2.5 py-0.5 text-xs font-medium shadow-sm"><Globe className="mr-1.5 h-3 w-3" /> Over 10,000 Programs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore by Interest</h2>
            <p className="text-muted-foreground text-sm md:text-base">Browse curated lists of top colleges across every major discipline</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-center flex-wrap max-w-4xl mx-auto">
            {streams.map((stream, i) => {
              const Icon = stream.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 80 }}
                  key={stream.name}
                >
                  <Link href={`/colleges?stream=${stream.name.toLowerCase()}`}>
                    <div className="group relative bg-card border border-border/40 rounded-[1.5rem] p-4 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden whitespace-nowrap">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stream.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                      <div className="relative z-10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-background shadow-sm border border-border/50 flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                          <Icon className={`h-5 w-5 ${stream.text}`} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-foreground text-sm mb-0.5 group-hover:text-primary transition-colors">{stream.name}</h3>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{stream.count}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="glass-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">
                  Data you can trust
                </div>
                <div className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  Verified info. Clear decisions.
                </div>
                <div className="text-sm text-muted-foreground">
                  CollegeBlink blends official sources, student signals, and Smart reasoning to help you shortlist smarter.
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:w-auto">
                {[
                  { label: "Verified Profiles", value: "Weekly" },
                  { label: "Shortlisting Signals", value: "Live" },
                  { label: "Admissions Guidance", value: "Smart" },
                  { label: "Updates", value: "Ongoing" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border/60 bg-card/60 p-4 text-center">
                    <div className="text-lg font-bold text-foreground">{item.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-3">
                Trusted by
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {["IIT", "IIM", "NIT", "AIIMS", "NLSIU", "VIT"].map((name) => (
                  <div
                    key={name}
                    className="h-10 rounded-xl border border-border/60 bg-card/50 flex items-center justify-center text-xs font-semibold text-muted-foreground"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CoursesSection initialCourses={initialCourses} initialColleges={initialCourseColleges} />
      <ExamsSection initialExams={initialExams} />
      <StudyAbroadSection />
      <CityBrowseSection initialCities={initialCities} />

      <section className="py-20 bg-card/40 border-y border-border/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <Badge className="mb-3 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 px-2.5 py-0.5 text-xs font-bold"><Zap className="mr-1.5 h-3 w-3" /> Built for Fast Decisions</Badge>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                Designed for Students, Not Institutions.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-muted-foreground mb-8">
                We've completely reimagined the college search. No outdated directories. No confusing interfaces. Just pure, data-driven clarity.
              </motion.p>

              <div className="space-y-6">
                {features.map((feature, i) => (
                  <motion.div variants={fadeUp} key={feature.title} className="flex gap-4 group">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-background border border-border/80 shadow-sm flex items-center justify-center text-primary group-hover:scale-105 group-hover:shadow-primary/10 transition-all duration-300">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 1 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="relative hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/50 to-amber-400/50 rounded-2xl transform rotate-2 scale-100 opacity-20 blur-xl" />
              <div className="relative glass-card rounded-[2rem] p-6 md:p-8 border border-border/60 overflow-hidden shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Smart Prediction Engine</div>
                    <div className="text-lg font-bold text-foreground bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Optimizing Profile...</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 w-full rounded-xl bg-background/60 border border-border/50 flex items-center px-4 gap-4 shadow-sm hover:border-primary/30 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-2.5 bg-muted rounded-full w-2/3" />
                        <div className="h-2 bg-muted rounded-full w-1/3" />
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <div className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Match</div>
                        <div className="text-sm font-bold text-primary">
                          {98 - i * 4}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full rounded-xl h-11 flex items-center justify-center gap-2 text-white font-semibold text-sm shadow-md bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all">
                    Run Analysis <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 overflow-hidden relative">
        <div className="container mx-auto px-4 text-center mb-10">
          <Badge className="mb-3 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest"><Star className="mr-1 h-3 w-3 inline-block -mt-0.5" /> Verified Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">From Confused to Admitted</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">See how students are using our platform to land their dream colleges effortlessly.</p>
        </div>

        <div className="w-full cursor-grab active:cursor-grabbing">
          <div className="overflow-hidden" ref={emblaTestimonialRef}>
            <div className="flex pb-10 items-center">
              {testimonials.map((test, i) => (
                <div key={i} className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_35%] px-3">
                  <div className="glass-card rounded-[2rem] p-8 md:p-10 relative border border-border/60 hover:border-primary/20 transition-colors shadow-lg">
                    <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/5" />
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-base md:text-lg font-medium text-foreground/90 mb-8 leading-relaxed">
                      "{test.text}"
                    </p>

                    <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-base shadow-sm ring-2 ring-primary/10">
                        {test.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-bold text-sm text-foreground">{test.name}</span>
                          <BadgeCheck className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="text-[11px] font-bold text-primary">{test.college}</div>
                        <div className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-widest">{test.journey}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 mb-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-600 p-10 md:p-16 text-center shadow-xl shadow-indigo-500/10"
          >

            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
            <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-cyan-300/20 blur-[80px]" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Stop Searching.<br />Start Applying.
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-10 font-light">
                Create your free account today and let our Smart system map out your optimal college journey in seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="rounded-full bg-white text-indigo-700 hover:bg-white/90 px-8 py-6 text-base font-bold w-full shadow-lg transition-all"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
                    }}
                  >
                    Need Counselling
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white px-8 py-6 text-base font-medium w-full backdrop-blur-md transition-all" asChild>
                    <Link href="/colleges">
                      Explore Campuses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
