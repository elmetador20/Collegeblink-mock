"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, GraduationCap, ArrowRight, FileText, Globe, Building2 } from "lucide-react";
import { Exam } from "@/lib/data/exams";
import { cn } from "@/lib/utils";

interface ExamCardProps {
  exam: Exam;
}

export function ExamCard({ exam }: ExamCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative h-full"
    >
      <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl pointer-events-none" />
      
      <Card className="bg-background/40 backdrop-blur-2xl overflow-hidden border-white/10 dark:border-white/5 rounded-2xl relative z-10 h-full flex flex-col transition-all duration-500 group-hover:shadow-2xl dark:group-hover:shadow-indigo-500/10">
        
        <div className="relative h-24 bg-gradient-to-br from-indigo-500/5 to-cyan-500/10 flex items-center justify-center p-4 border-b border-white/5">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
          <div className="relative z-10 text-3xl font-black text-indigo-500/90 tracking-tighter">
            {exam.name}
          </div>
          
          <div className="absolute top-3 right-3 flex gap-1.5">
             <Badge variant="outline" className={cn(
               "text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-md font-bold",
               exam.type === "Abroad" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-teal-500/10 text-teal-500 border-teal-500/20"
             )}>
               {exam.type}
             </Badge>
          </div>
        </div>

        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="mb-4">
            <Link
              href={`/exams/${exam.slug}`}
              className="font-bold text-base text-foreground hover:text-indigo-500 transition-colors line-clamp-1 group-hover:underline underline-offset-4"
            >
              {exam.fullName}
            </Link>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 min-h-[2.5rem]">
              {exam.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
              {exam.category}
            </Badge>
            <Badge variant="outline" className="bg-white/5 text-muted-foreground border-white/10 px-2.5 py-0.5 rounded-md text-[10px]">
              <Building2 className="h-3 w-3 mr-1" />
              {exam.colleges}+ Colleges
            </Badge>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Duration
              </div>
              <div className="font-semibold text-foreground flex items-center text-xs">
                <Clock className="h-3 w-3 mr-1.5 text-indigo-500" />
                {exam.duration}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Frequency
              </div>
              <div className="font-semibold text-foreground flex items-center text-xs">
                <Calendar className="h-3 w-3 mr-1.5 text-cyan-500" />
                {exam.frequency}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3">
             <Button asChild className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold h-10 shadow-lg shadow-indigo-500/20">
               <Link href={`/exams/${exam.slug}`}>
                 View Exam Details
                 <ArrowRight className="ml-2 h-4 w-4" />
               </Link>
             </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
