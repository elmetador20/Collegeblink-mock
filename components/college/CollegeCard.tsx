"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Check, Building2, Star, MapPin, IndianRupee, TrendingUp, Plus, Lock, Globe, Building, Share2 } from "lucide-react";
import { cn, formatIndianNumber, getCollegeTypeColor } from "@/lib/utils";
import { getMatchScoreColor, getMatchScoreBadgeColor, getMatchScoreLabel } from "@/lib/explainMatch";
import { useFeatureGate } from "@/hooks/useSubscription";
import { FeatureLock } from "@/components/premium/UpgradeCard";
import { track } from "@/lib/track";
import { toast } from "sonner";

interface CollegeCardProps {
  college: any;
  viewMode?: "grid" | "list";
  isCompared?: boolean;
  onCompareToggle?: () => void;
  matchScore?: number;
  matchReason?: string;
}

export function CollegeCard({
  college,
  viewMode = "grid",
  isCompared,
  onCompareToggle,
  matchScore,
  matchReason
}: CollegeCardProps) {
  const isGrid = viewMode === "grid";
  const { canAccess: canViewAdvancedInsights } = useFeatureGate("advancedInsights");
  const isInternational = college.country && college.country !== "India";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative h-full"
    >
      <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl pointer-events-none" />
      
      <Card className={cn(
        "bg-background/40 backdrop-blur-2xl overflow-hidden border-white/10 dark:border-white/5 rounded-2xl relative z-10 h-full flex transition-all duration-500 group-hover:shadow-2xl dark:group-hover:shadow-indigo-500/10 active:scale-95",
        !isGrid ? "flex flex-col md:flex-row" : "flex-col"
      )}>
        
        <div className={cn(
          "relative overflow-hidden bg-gradient-to-br from-indigo-500/5 to-cyan-500/10 flex items-center justify-center p-4 border-b border-white/5",
          isGrid ? "h-28 md:h-32" : "w-full md:w-48 h-28 md:h-auto md:border-b-0 md:border-r"
        )}>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
          
          <motion.div 
            className="relative z-10 w-24 h-24 rounded-2xl bg-zinc-950/80 backdrop-blur-md shadow-2xl border border-white/10 flex items-center justify-center p-4 overflow-hidden"
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            {college.logo && !college.logo.includes("wikimedia") && !college.logo.includes("placeholder") ? (
              <img
                src={college.logo}
                alt={college.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ""; 
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1">
                <Building className="h-10 w-10 text-indigo-500/90" />
                <div className="w-8 h-1 bg-indigo-500/20 rounded-full" />
              </div>
            )}
          </motion.div>

          <div className="absolute top-3 right-3 glass-card bg-background/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex flex-col items-center justify-center shadow-lg">
            <span className="text-[9px] font-bold text-muted-foreground uppercase leading-none tracking-widest mb-0.5">
              {isInternational ? "Global" : "NIRF"}
            </span>
            <span className="text-sm font-extrabold text-foreground leading-none">#{college.nirfRank || "N/A"}</span>
          </div>
        </div>

        <CardContent className={cn(
          "p-4 md:p-5 flex-1 flex flex-col",
          !isGrid && "md:flex-row md:items-center gap-4 md:gap-6"
        )}>
          <div className="flex-1 min-w-0 flex flex-col">
            <div>
              <Link
                href={`/colleges/${college.slug}`}
                className="font-bold text-base text-foreground hover:text-indigo-500 transition-colors line-clamp-1 group-hover:underline underline-offset-4"
              >
                {college.name}
              </Link>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mt-1">
                {isInternational ? <Globe className="h-3 w-3 text-indigo-500" /> : <MapPin className="h-3 w-3 text-teal-500" />}
                {college.city}, {isInternational ? college.country : college.state}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-3 md:mt-4 mb-3 md:mb-5">
              <Badge variant="outline" className={cn(
                "bg-transparent border-current/20 px-2 md:px-2.5 py-0.5 rounded-md text-xs", 
                getCollegeTypeColor(college.type)
              )}>
                {college.type}
              </Badge>
              {isInternational && (
                <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 px-2 md:px-2.5 py-0.5 rounded-md text-xs">
                  International
                </Badge>
              )}
              {college.placementRate && !isInternational && (
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 px-2 md:px-2.5 py-0.5 rounded-md text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {college.placementRate}% Placed
                </Badge>
              )}
            </div>

            <div className="mt-auto pt-3 md:pt-4 border-t border-border/50 w-full" />
            
            <div className={cn(
              "grid gap-3 md:gap-4 w-full",
              !isGrid ? "grid-cols-3" : "grid-cols-2"
            )}>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {isInternational ? "Avg Salary" : "Avg Package"}
                </div>
                <div className="font-semibold text-foreground flex items-center text-[13px] md:text-sm">
                  <IndianRupee className="h-3 w-3 mr-0.5" />
                  {college.avgPackage ? (isInternational ? `${(college.avgPackage / 100).toFixed(1)} Cr` : `${college.avgPackage} LPA`) : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {isInternational ? "Tuition (Approx)" : "Fees/Year"}
                </div>
                <div className="font-semibold text-foreground flex items-center text-[13px] md:text-sm">
                  <IndianRupee className="h-3 w-3 mr-0.5" />
                  {college.tuitionFees ? `${college.tuitionFees >= 100 ? (college.tuitionFees / 100).toFixed(1) + " Cr" : college.tuitionFees + " L"}` : "N/A"}
                </div>
              </div>
            </div>
          </div>

          <div className={cn(
            "flex items-center gap-2 md:gap-3 mt-4 lg:mt-0 transition-all duration-300",
            !isGrid ? "md:flex-col md:self-stretch md:justify-center md:border-l md:border-border/50 md:pl-5" : "pt-3 border-t border-border/50 lg:opacity-0 lg:group-hover:opacity-100"
          )}>
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full flex-shrink-0 h-9 w-9 border-border/50 hover:bg-red-500/10 hover:text-red-500 transition-all"
                onClick={() => track("college_saved", { collegeId: college.id, collegeName: college.name })}
              >
                <Heart className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full flex-shrink-0 h-9 w-9 border-border/50 hover:bg-indigo-500/10 hover:text-indigo-500 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  const url = `${window.location.origin}/colleges/${college.slug}`;
                  navigator.clipboard.writeText(url);
                  toast.success("Link copied to clipboard!", {
                    description: "You can now share this college with others.",
                  });
                  track("college_shared", { collegeId: college.id, collegeName: college.name });
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>

              <Button
                variant={isCompared ? "secondary" : "outline"}
                size="icon"
                onClick={(e) => { 
                  e.preventDefault(); 
                  onCompareToggle?.(); 
                }}
                className={cn(
                  "rounded-full flex-shrink-0 h-9 w-9 border-border/50 transition-all",
                  isCompared ? "bg-indigo-600 text-white hover:bg-indigo-700" : "hover:bg-indigo-500/10 hover:text-indigo-500"
                )}
              >
                <Plus className={cn("h-4 w-4 transition-transform", isCompared && "rotate-45")} />
              </Button>
            </div>

            <Button
              className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 text-xs shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
                track("college_apply_clicked", { collegeId: college.id, collegeName: college.name });
              }}
            >
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
