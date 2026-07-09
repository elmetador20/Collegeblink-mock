"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2 } from "lucide-react";
import * as backend from "@/lib/backend";

const cityColors: Record<string, string> = {
  "mumbai": "from-orange-500/20 to-amber-500/20",
  "delhi ncr": "from-indigo-500/20 to-purple-500/20",
  "delhi": "from-indigo-500/20 to-purple-500/20",
  "bangalore": "from-blue-500/20 to-cyan-500/20",
  "hyderabad": "from-green-500/20 to-emerald-500/20",
  "nagpur": "from-teal-500/20 to-cyan-500/20",
  "dehradun": "from-amber-500/20 to-yellow-500/20",
  "gurugram": "from-violet-500/20 to-purple-500/20",
  "pune": "from-pink-500/20 to-rose-500/20",
  "kolkata": "from-red-500/20 to-orange-500/20",
  "bhopal": "from-lime-500/20 to-green-500/20",
  "indore": "from-cyan-500/20 to-blue-500/20",
  "ahmedabad": "from-yellow-500/20 to-amber-500/20",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

export function CityBrowseSection({ 
  initialCities = [] 
}: { 
  initialCities?: { city: string; count: number }[] 
} = {}) {
  const [cities, setCities] = useState<{ city: string; count: number }[]>(initialCities.length > 0 ? initialCities : []);
  const [loading, setLoading] = useState(initialCities.length === 0);

  useEffect(() => {
    if (initialCities.length === 0) {
      fetchCities();
    }
  }, [initialCities]);

  const fetchCities = async () => {
    try {
      const data = await backend.getUniqueCities();
      setCities(data || []);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
      setCities([
        { city: "Mumbai", count: 7 },
        { city: "Delhi NCR", count: 6 },
        { city: "Bangalore", count: 5 },
        { city: "Hyderabad", count: 4 },
        { city: "Nagpur", count: 4 },
        { city: "Dehradun", count: 3 },
        { city: "Gurugram", count: 3 },
        { city: "Pune", count: 2 },
        { city: "Kolkata", count: 2 },
        { city: "Bhopal", count: 2 },
        { city: "Indore", count: 1 },
        { city: "Ahmedabad", count: 1 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getCityColor = (cityName: string) => {
    const key = cityName.toLowerCase();
    return cityColors[key] || "from-gray-500/20 to-gray-500/20";
  };

  const formatSlug = (cityName: string) => {
    return cityName.toLowerCase().replace(/\s+/g, "-");
  };
  return (
    <section className="py-20 bg-card/20 border-y border-border/40 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <Badge className="mb-3 rounded-full bg-primary/10 border-primary/20 text-primary px-2.5 py-0.5 text-xs font-medium">
            <MapPin className="mr-1.5 h-3 w-3" />
            Top Study Places
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by City
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Explore colleges in India's top educational hubs
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
          {loading ? (
            <div className="text-muted-foreground text-sm">Loading cities...</div>
          ) : cities.length === 0 ? (
            <div className="text-muted-foreground text-sm">No cities available</div>
          ) : (
            cities.slice(0, 12).map((cityData, i) => (
              <motion.div
                key={cityData.city}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.03, type: "spring", stiffness: 80 }}
              >
                <Link href={`/colleges?city=${formatSlug(cityData.city)}`}>
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCityColor(cityData.city)} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md`} />
                    <div className="relative glass-card px-5 py-3 rounded-full border border-border/60 hover:border-primary/30 transition-all duration-300 flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                        {cityData.city}
                      </span>
                      <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border-primary/20">
                        {cityData.count}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, type: "spring", stiffness: 60 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">40+</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Cities</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">All India</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Coverage</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
