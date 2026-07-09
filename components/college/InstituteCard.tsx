"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Building2, BookOpen, Map, Share2, Heart, Download } from "lucide-react";
import { track } from "@/lib/track";
import { toast } from "sonner";
import { Institute } from "@/lib/data/institutes";

interface InstituteCardProps {
  institute: Institute;
}

export function InstituteCard({ institute }: InstituteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Logo Section */}
            <Link href={`/institutes/${institute.slug}`} className="w-full md:w-48 bg-muted/30 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-border hover:bg-muted/50 transition-colors">
              <div className="w-24 h-24 rounded-xl bg-white shadow-sm flex items-center justify-center p-3">
                <img
                  src={institute.logo}
                  alt={institute.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(institute.name)}&background=random`;
                  }}
                />
              </div>
            </Link>

            {/* Info Section */}
            <div className="flex-1 p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Link href={`/institutes/${institute.slug}`}>
                      <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                        {institute.name}
                      </h3>
                    </Link>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2 py-0">
                      {institute.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      {institute.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-foreground">{institute.rating}</span>
                      <span className="text-xs">({institute.reviewCount} Reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Fees</div>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {institute.totalFees}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border/50 pt-5">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-3 uppercase tracking-tight">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Courses & Programs
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {institute.courses.slice(0, 4).map((course) => (
                      <Badge key={course} variant="outline" className="bg-muted/50 font-medium border-border/50">
                        {course}
                      </Badge>
                    ))}
                    {institute.courses.length > 4 && (
                      <span className="text-xs text-muted-foreground self-center">+{institute.courses.length - 4} more</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-3 uppercase tracking-tight">
                    <Map className="h-4 w-4 text-primary" />
                    Centers In
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {institute.centers.slice(0, 3).map((center) => (
                      <Badge key={center} variant="outline" className="bg-muted/50 font-medium border-border/50">
                        {center}
                      </Badge>
                    ))}
                    {institute.centers.length > 3 && (
                      <span className="text-xs text-muted-foreground self-center">+{institute.centers.length - 3} cities</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 pt-5 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/50 hover:bg-primary/10 hover:text-primary transition-all">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-10 w-10 border-border/50 hover:bg-primary/10 hover:text-primary transition-all"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + "/institutes/" + institute.slug);
                      toast.success("Link copied!");
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <Button 
                    variant="outline"
                    className="flex-1 md:w-44 rounded-full border-primary text-primary hover:bg-primary hover:text-white font-bold transition-all"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
                      toast.success("Please fill the form to download brochure");
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Brochure
                  </Button>
                  <Button 
                    className="flex-[1.5] md:w-44 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
                      track("institute_callback_clicked", { instituteId: institute.id, instituteName: institute.name });
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Callback
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
