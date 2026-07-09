"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  GraduationCap,
  ArrowUpRight,
  ClipboardCheck,
} from "lucide-react";
import { Course } from "@/lib/data/courses";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const LEVEL_STYLES: Record<Course["level"], string> = {
  Undergraduate: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  Postgraduate: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  Doctoral: "bg-violet-500/10 text-violet-500 border-violet-500/20",
};

const MODE_STYLES: Record<Course["mode"], string> = {
  "Full Time": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Part Time": "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

interface CourseCardProps {
  course: Course;
  viewMode?: "grid" | "list";
}

export function CourseCard({
  course,
  viewMode = "grid",
}: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`} className="block">
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-xl shadow-black/5 overflow-hidden transition-colors hover:border-indigo-500/40 cursor-pointer",
          viewMode === "list" && "sm:flex sm:items-stretch"
        )}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div
          className={cn(
            "p-6 flex flex-col gap-4",
            viewMode === "list" && "sm:flex-1"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-indigo-500/20">
                {course.title.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-foreground leading-tight truncate">
                  {course.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {course.fullTitle}
                </p>
              </div>
            </div>

            <Badge
              variant="secondary"
              className={cn(
                "shrink-0 border px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                LEVEL_STYLES[course.level]
              )}
            >
              {course.level}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="bg-violet-500/10 text-violet-500 border-violet-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
            >
              {course.department}
            </Badge>

            <Badge
              variant="secondary"
              className={cn(
                "border px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                MODE_STYLES[course.mode]
              )}
            >
              {course.mode}
            </Badge>
          </div>

          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2.5 border border-border/30">
            <ClipboardCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{course.eligibility}</span>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-border/40">
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Duration
            </span>
            <span className="text-sm font-semibold text-foreground">
              {course.duration}
            </span>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-between gap-4 px-6 py-4 border-t border-border/40 bg-muted/20",
            viewMode === "list" &&
              "sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:border-l sm:w-52 sm:shrink-0 sm:gap-3"
          )}
        >
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <GraduationCap className="h-4 w-4 text-indigo-500" />
            <span className="font-medium text-foreground">
              {course.department}
            </span>
            Department
          </div>

          <div className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:bg-indigo-600 transition-colors shrink-0">
            View Program
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}