"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FileText, GraduationCap, Globe, PenTool, Scale, Brain, Award, Languages } from "lucide-react";
import * as backend from "@/lib/backend";

const examIcons: Record<string, { icon: any; color: string; textColor: string }> = {
  "cat": { icon: GraduationCap, color: "from-orange-500/20 to-amber-500/20", textColor: "text-orange-500" },
  "ielts": { icon: Languages, color: "from-blue-500/20 to-cyan-500/20", textColor: "text-blue-500" },
  "jee-main": { icon: FileText, color: "from-indigo-500/20 to-purple-500/20", textColor: "text-indigo-500" },
  "jee advanced": { icon: FileText, color: "from-indigo-500/20 to-purple-500/20", textColor: "text-indigo-500" },
  "neet": { icon: PenTool, color: "from-red-500/20 to-pink-500/20", textColor: "text-red-500" },
  "xat": { icon: Award, color: "from-amber-500/20 to-yellow-500/20", textColor: "text-amber-500" },
  "clat": { icon: Scale, color: "from-purple-500/20 to-violet-500/20", textColor: "text-purple-500" },
  "mat": { icon: Brain, color: "from-teal-500/20 to-cyan-500/20", textColor: "text-teal-500" },
  "gate": { icon: GraduationCap, color: "from-green-500/20 to-emerald-500/20", textColor: "text-green-500" },
  "duolingo": { icon: Globe, color: "from-lime-500/20 to-green-500/20", textColor: "text-lime-500" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

export function ExamsSection({ 
  initialExams = [] 
}: { 
  initialExams?: string[] 
} = {}) {
  const [exams, setExams] = useState<string[]>(initialExams.length > 0 ? initialExams : []);
  const [loading, setLoading] = useState(initialExams.length === 0);

  useEffect(() => {
    if (initialExams.length === 0) {
      fetchExams();
    }
  }, [initialExams]);

  const fetchExams = async () => {
    try {
      const data = await backend.getUniqueExams();
      setExams(data || []);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
      setExams(["CAT", "IELTS", "JEE Main", "NEET", "XAT", "CLAT", "MAT", "GATE", "Duolingo"]);
    } finally {
      setLoading(false);
    }
  };

  const getExamIconData = (examName: string) => {
    const key = examName.toLowerCase();
    return examIcons[key] || { icon: FileText, color: "from-gray-500/20 to-gray-500/20", textColor: "text-gray-500" };
  };

  const formatSlug = (examName: string) => {
    return examName.toLowerCase().replace(/\s+/g, "-");
  };
  return (
    <section className="py-20 bg-card/20 border-y border-border/40 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <Badge className="mb-3 rounded-full bg-primary/10 border-primary/20 text-primary px-2.5 py-0.5 text-xs font-medium">
            <FileText className="mr-1.5 h-3 w-3" />
            Top Exams
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Entrance Exams
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Prepare for India's top entrance exams with comprehensive resources
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {loading ? (
            <div className="text-muted-foreground text-sm">Loading exams...</div>
          ) : exams.length === 0 ? (
            <div className="text-muted-foreground text-sm">No exams available</div>
          ) : (
            exams.map((exam, i) => {
              const iconData = getExamIconData(exam);
              const Icon = iconData.icon;
              const slug = formatSlug(exam);
              return (
                <motion.div
                  key={exam}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 80 }}
                  className="flex-[0_0_160px] sm:flex-[0_0_180px] snap-start"
                >
                  <Link href={`/exams/${slug}`}>
                    <div className="group glass-card p-5 md:p-6 rounded-2xl border border-border/60 hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center h-full">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${iconData.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-6 w-6 ${iconData.textColor}`} />
                      </div>
                      <h3 className="font-semibold text-foreground text-base mb-1 group-hover:text-primary transition-colors">
                        {exam}
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        View Details
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
