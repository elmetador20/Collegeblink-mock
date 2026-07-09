"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Target,
  TrendingUp,
  Calculator,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const NEXT_STEPS = [
  { icon: Target, text: "Estimate your All India Rank from your expected score" },
  { icon: TrendingUp, text: "See your category rank and qualifying percentile" },
  { icon: Calculator, text: "Check which colleges are realistically within reach" },
];

export default function RankPredictorPromo() {
  return (
    <section className="py-20 bg-card/30 border-y border-border/40 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div variants={fadeUp}>
            <Badge className="mb-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 px-4 py-1.5 text-sm font-bold">
              ✅ Exam Concluded
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            NEET UG 2026 is Over — See Where You Stand
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-base md:text-lg">
            While you wait for the official result, get an estimated rank, percentile, and college shortlist in under a minute
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex"
        >
          <motion.div variants={fadeUp} className="w-full">
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_auto_1.35fr]">

                {/* Left stub: exam status */}
                <div className="p-8 lg:p-10 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">
                      Exam Status
                    </span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/10">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                    NEET Re-Exam
                  </h3>
                  <Badge className="w-fit mb-8 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                    🎓 Exam completed · Results awaited
                  </Badge>

                  <div className="mt-auto bg-background/70 rounded-2xl p-5 border border-border/40">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                        While you wait
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      Our rank predictor uses 5 years of NEET marks-vs-rank data to give you a directional
                      estimate before NTA declares the official result.
                    </p>
                  </div>
                </div>

                {/* Perforated divider */}
                <div className="relative flex items-center justify-center self-stretch">
                  <div className="hidden lg:block relative h-full w-px mx-2">
                    <div className="absolute inset-0 border-l border-dashed border-border/60" />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-card border border-border/40" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-card border border-border/40" />
                  </div>
                  <div className="lg:hidden relative w-full h-px my-2">
                    <div className="absolute inset-0 border-t border-dashed border-border/60" />
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 rounded-full bg-card border border-border/40" />
                    <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-4 h-4 rounded-full bg-card border border-border/40" />
                  </div>
                </div>

                {/* Right stub: CTA */}
                <div className="p-8 lg:p-10 flex flex-col">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold mb-4">
                    What's Next
                  </span>

                  <ul className="space-y-3 mb-8">
                    {NEXT_STEPS.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 border-b border-border/40 last:border-b-0 pb-3 last:pb-0">
                        <step.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground/90">{step.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/neetrankpredictor" className="mt-auto">
                    <Button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-orange-500/25 transition-all">
                      Predict My Rank &amp; Colleges <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}