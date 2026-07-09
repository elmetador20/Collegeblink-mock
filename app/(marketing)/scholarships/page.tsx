"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Wallet, 
  Search, 
  Clock, 
  ExternalLink, 
  Sparkles,
  GraduationCap,
  Filter,
  X
} from "lucide-react";
import { toast } from "sonner";
import { formatIndianNumber } from "@/lib/utils";

interface Scholarship {
  id: string;
  name: string;
  title?: string;
  provider: string;
  amount: number | string;
  deadline: string | number;
  type: string;
  eligibility: string | { criteria: string[]; minPercentage?: number; familyIncomeMax?: number };
  description: string;
  matchReason?: string;
  level?: string;
  location?: string;
  tags?: string[];
  category?: string;
  applyLink?: string;
  applicationLink?: string;
}

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    minAmount: "",
    maxAmount: "",
    type: "",
    deadline: "",
    category: "",
    level: "",
    location: "",
  });
  const [matchedScholarships, setMatchedScholarships] = useState<Scholarship[]>([]);
  const [showMatched, setShowMatched] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchScholarships = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (filters.minAmount) params.set("minAmount", filters.minAmount);
      if (filters.maxAmount) params.set("maxAmount", filters.maxAmount);
      if (filters.type) params.set("type", filters.type);
      if (filters.deadline) params.set("deadline", filters.deadline);
      if (filters.category) params.set("category", filters.category);
      if (filters.level) params.set("level", filters.level);
      if (filters.location) params.set("location", filters.location);

      const res = await fetch(`/api/scholarships?${params}`);
      const data = await res.json();
      const scholarshipList = data.scholarships || (Array.isArray(data) ? data : []);
      setScholarships(scholarshipList);

      const total = scholarshipList.reduce((sum: number, s: Scholarship) => {
        if (typeof s.amount === 'number') {
          return sum + s.amount;
        }
        return sum;
      }, 0);
      setTotalAmount(total);
    } catch (error) {
      toast.error("Failed to fetch scholarships");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters]);

  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  const fetchMatchedScholarships = async () => {
    try {
      const res = await fetch("/api/scholarships/match");
      if (res.ok) {
        const data = await res.json();
        setMatchedScholarships(data.scholarships);
        setShowMatched(true);
      } else {
        toast.error("Please sign in to see matched scholarships");
      }
    } catch (error) {
      toast.error("Failed to fetch matched scholarships");
    }
  };

  const clearFilters = () => {
    setFilters({ minAmount: "", maxAmount: "", type: "", deadline: "", category: "", level: "", location: "" });
    setSearchQuery("");
  };

  const getDeadlineColor = (deadline: string | number) => {
    if (typeof deadline === 'number') {
      const days = Math.ceil((deadline - Date.now()) / (1000 * 60 * 60 * 24));
      if (days < 7) return "bg-red-500/20 text-red-400 border-red-500/30";
      if (days < 30) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      return "bg-accent/20 text-accent border-accent/30";
    }
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days < 7) return "bg-red-500/20 text-red-400 border-red-500/30";
    if (days < 30) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-accent/20 text-accent border-accent/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
      
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05]" />
        <div className="container mx-auto px-4 relative py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full mb-8 border border-white/30">
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase tracking-wide">Financial Aid</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Find Your Scholarship
            </h1>
            <p className="text-white/90 mb-10 text-xl leading-relaxed">
              Discover scholarships worth{" "}
              <span className="text-white font-bold text-2xl">
                {formatIndianNumber(totalAmount)}
              </span>{" "}
              across India
            </p>

            <button
              onClick={fetchMatchedScholarships}
              className="bg-white hover:bg-white/90 text-orange-600 text-lg px-10 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Sparkles className="h-5 w-5" />
              Match Scholarships for Me
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-12 -mt-8 relative z-10">
        
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-10 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Input
                type="number"
                placeholder="Min Amount"
                value={filters.minAmount}
                onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                className="w-40 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <Input
                type="number"
                placeholder="Max Amount"
                value={filters.maxAmount}
                onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                className="w-40 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 text-gray-800 h-14 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">All Types</option>
                <option value="Merit-Based">Merit Based</option>
                <option value="Need-Based">Need Based</option>
                <option value="Category-Based">Category Based</option>
                <option value="Talent-Based">Talent Based</option>
              </select>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 text-gray-800 h-14 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">All Categories</option>
                <option value="Merit-Based">Merit-Based</option>
                <option value="Need-Based">Need-Based</option>
                <option value="Category-Based">Category-Based</option>
                <option value="Talent-Based">Talent-Based</option>
              </select>
              <select
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 text-gray-800 h-14 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">All Levels</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="School/College">School/College</option>
                <option value="College">College</option>
              </select>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 text-gray-800 h-14 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">All Locations</option>
                <option value="India">India</option>
                <option value="Abroad">Abroad</option>
              </select>
              {(searchQuery || filters.minAmount || filters.maxAmount || filters.type || filters.category || filters.level || filters.location) && (
                <Button variant="ghost" onClick={clearFilters} className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-14 px-4 rounded-xl transition-all">
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        
        {showMatched && Array.isArray(matchedScholarships) && matchedScholarships.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Matched for Your Profile</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedScholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} isMatched />
              ))}
            </div>
          </motion.div>
        )}

        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {showMatched ? "All Scholarships" : "Available Scholarships"}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-lg">{(scholarships || []).length}</span>
            <span className="text-gray-400 text-lg">results</span>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(scholarships) && scholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ScholarshipCard scholarship={scholarship} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ScholarshipCard({
  scholarship,
  isMatched = false
}: {
  scholarship: Scholarship;
  isMatched?: boolean;
}) {
  const getDeadlineColor = (deadline: string | number) => {
    if (typeof deadline === 'number') {
      const days = Math.ceil((deadline - Date.now()) / (1000 * 60 * 60 * 24));
      if (days < 7) return "bg-red-500/20 text-red-400 border-red-500/30";
      if (days < 30) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      return "bg-accent/20 text-accent border-accent/30";
    }
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days < 7) return "bg-red-500/20 text-red-400 border-red-500/30";
    if (days < 30) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-accent/20 text-accent border-accent/30";
  };

  return (
    <div className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group ${isMatched ? "ring-2 ring-orange-400 shadow-lg" : ""}`}>
      
      <div className="bg-gradient-to-r from-orange-100 to-orange-50 px-4 py-2.5 flex items-center gap-2">
        <Wallet className="h-4 w-4 text-orange-600" />
        <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
          {scholarship.category || scholarship.type || "SCHOLARSHIP"}
        </span>
      </div>

      
      <div className="p-6 flex-1 flex flex-col">
        
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{scholarship.name}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-orange-500" />
            {scholarship.provider}
          </p>
        </div>

        
        <div className="mb-4">
          <div className="inline-block bg-accent/50 px-4 py-2 rounded-lg">
            <div className="text-2xl font-bold text-accent">
              {typeof scholarship.amount === 'number' ? formatIndianNumber(scholarship.amount) : scholarship.amount}
            </div>
          </div>
        </div>

        
        <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">{scholarship.description}</p>

        
        <div className="space-y-4 mb-5">
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <GraduationCap className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">ELIGIBILITY</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {typeof scholarship.eligibility === 'string' 
                  ? scholarship.eligibility 
                  : Array.isArray(scholarship.eligibility?.criteria) 
                    ? scholarship.eligibility.criteria.join(', ')
                    : 'See details'
                }
              </div>
            </div>
          </div>

          
          {scholarship.level && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">LEVEL</div>
                <div className="text-sm text-gray-700">{scholarship.level}</div>
                {scholarship.location && (
                  <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    📍 {scholarship.location}
                  </div>
                )}
              </div>
            </div>
          )}

          
          {scholarship.tags && scholarship.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {scholarship.tags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 px-3 py-1.5 rounded-full font-medium border border-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        
        <div className="mb-5">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getDeadlineColor(scholarship.deadline)}`}>
            <Clock className="h-4 w-4" />
            <span>Deadline: {typeof scholarship.deadline === 'number' ? new Date(scholarship.deadline).toLocaleDateString() : scholarship.deadline}</span>
          </div>
        </div>

        
        {isMatched && scholarship.matchReason && (
          <div className="mb-5">
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 border border-orange-200">
              <Sparkles className="h-4 w-4" />
              {scholarship.matchReason}
            </div>
          </div>
        )}

        
        <div className="mt-auto">
          <a
            href={scholarship.applyLink || scholarship.applicationLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-center py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Apply Now
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
