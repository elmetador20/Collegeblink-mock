"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Plane, ArrowRight, Globe } from "lucide-react";

const countries = [
  { name: "USA", flag: "🇺🇸", slug: "usa", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "UK", flag: "🇬🇧", slug: "uk", color: "from-indigo-500/20 to-purple-500/20" },
  { name: "Canada", flag: "🇨🇦", slug: "canada", color: "from-red-500/20 to-rose-500/20" },
  { name: "Germany", flag: "🇩🇪", slug: "germany", color: "from-amber-500/20 to-yellow-500/20" },
  { name: "Australia", flag: "🇦🇺", slug: "australia", color: "from-green-500/20 to-emerald-500/20" },
  { name: "Russia", flag: "🇷🇺", slug: "russia", color: "from-red-500/20 to-pink-500/20" },
  { name: "Ireland", flag: "🇮🇪", slug: "ireland", color: "from-green-500/20 to-lime-500/20" },
  { name: "New Zealand", flag: "🇳🇿", slug: "new-zealand", color: "from-blue-500/20 to-teal-500/20" },
  { name: "Sweden", flag: "🇸🇪", slug: "sweden", color: "from-blue-500/20 to-indigo-500/20" },
  { name: "Italy", flag: "🇮🇹", slug: "italy", color: "from-green-500/20 to-emerald-500/20" },
  { name: "Uzbekistan", flag: "🇺🇿", slug: "uzbekistan", color: "from-cyan-500/20 to-blue-500/20" },
  { name: "Netherlands", flag: "🇳🇱", slug: "netherlands", color: "from-orange-500/20 to-amber-500/20" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

export function StudyAbroadSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <Badge className="mb-3 rounded-full bg-primary/10 border-primary/20 text-primary px-2.5 py-0.5 text-xs font-medium">
            <Globe className="mr-1.5 h-3 w-3" />
            Study Abroad
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Study Abroad
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Explore universities across the world for your dream education
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {countries.map((country, i) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 80 }}
              className="flex-[0_0_180px] sm:flex-[0_0_200px] snap-start"
            >
              <Link href={`/study-abroad/${country.slug}`}>
                <div className="group glass-card p-5 md:p-6 rounded-2xl border border-border/60 hover:border-primary/30 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${country.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                    {country.flag}
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                    {country.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>View Universities</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
