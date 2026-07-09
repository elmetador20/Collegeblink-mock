"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Clock, Calendar, ArrowRight, BookOpen, GraduationCap, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image: string;
  category: string;
  readTime: string;
  createdAt: Date;
}

export default function BlogsClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const list = new Set(initialPosts.map((p) => p.category));
    return ["All", ...Array.from(list)];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.summary.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, initialPosts]);

  // The first post of the filtered list is treated as featured
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Blur Background circles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold uppercase tracking-wider mb-4"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Latest Insights & Preparation Guides
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4"
            >
              CollegeBlink{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Knowledge Hub
              </span>
            </motion.h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get the latest updates on entrance exams, prep strategies, cutoffs, and expert counseling guides to shape your perfect career.
            </p>
          </div>

          {/* Search and Category Filter Section */}
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between border-b border-border/40 pb-6 mb-10">
            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-hide py-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 text-xs font-bold rounded-full border transition-all shrink-0 uppercase tracking-wider",
                    selectedCategory === category
                      ? "bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-500/20"
                      : "bg-card/40 border-border/50 text-muted-foreground hover:text-foreground hover:bg-card"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full h-10 pl-10 pr-9 rounded-full border border-border/60 bg-card/40 backdrop-blur-md text-sm outline-none focus:border-indigo-500 transition-all text-foreground placeholder:text-muted-foreground/60"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full text-muted-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* No results state */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-card/25 backdrop-blur-sm rounded-3xl border border-dashed border-border/60">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
              <h3 className="text-xl font-bold text-foreground">No articles found</h3>
              <p className="text-muted-foreground text-sm mt-1">Try resetting your category filters or search query.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-6 px-5 py-2.5 bg-indigo-500 text-white font-bold text-sm rounded-full shadow-lg hover:bg-indigo-600 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Featured Post Card */}
          {featuredPost && !search && selectedCategory === "All" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-card/45 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-xl mb-12 hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="relative h-64 lg:h-auto lg:col-span-7 overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent lg:hidden" />
              </div>

              <div className="p-6 md:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <Badge className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                    {featuredPost.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold leading-tight text-foreground mb-4 group-hover:text-indigo-500 transition-colors">
                  <Link href={`/blogs/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {featuredPost.summary}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(featuredPost.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>

                  <Link
                    href={`/blogs/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
                  >
                    Read Guide <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid Layout of other blogs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {(search || selectedCategory !== "All" ? filteredPosts : gridPosts).map((post, idx) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  key={post.id}
                  className="group flex flex-col bg-card/45 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-3 leading-snug group-hover:text-indigo-500 transition-colors line-clamp-2">
                      <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>

                      <Link
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
                      >
                        Read Full <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
