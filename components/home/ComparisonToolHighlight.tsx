"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, CheckCircle2, XCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const mockColleges = [
  {
    id: "1",
    name: "IIT Delhi",
    ranking: "#1",
    fees: "₹8-12L/year",
    placement: "92%",
    acceptance: "5%",
    logo: "🎓",
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: "2",
    name: "IIT Bombay",
    ranking: "#2",
    fees: "₹10-14L/year",
    placement: "94%",
    acceptance: "4%",
    logo: "🎓",
    color: "from-blue-500/20 to-cyan-500/20",
  },
];

export default function ComparisonToolHighlight() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div variants={fadeUp}>
            <Badge className="mb-4 rounded-full bg-cyan-500/10 text-cyan-500 border-cyan-500/20 px-4 py-1.5 text-sm font-bold">
              ⚡ Compare in 5 Seconds
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Compare Colleges Instantly
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-base md:text-lg">
            See fees, placement, ranking side-by-side and make smarter decisions
          </motion.p>
        </motion.div>

        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-2xl shadow-orange-500/30">
                VS
              </div>
            </div>

            
            {mockColleges.map((college, index) => (
              <motion.div
                key={college.id}
                variants={fadeUp}
                className="glass-card rounded-3xl p-6 border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 relative"
              >
                
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${college.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {college.logo}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{college.name}</h3>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-bold">
                        {college.ranking}
                      </Badge>
                    </div>
                  </div>
                </div>

                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-background/60 border border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Placement</div>
                        <div className="text-lg font-bold text-foreground">{college.placement}</div>
                      </div>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-background/60 border border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <span className="text-xl">💰</span>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Fees</div>
                        <div className="text-lg font-bold text-foreground">{college.fees}</div>
                      </div>
                    </div>
                    {index === 0 ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-red-500" />}
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-background/60 border border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Acceptance</div>
                        <div className="text-lg font-bold text-foreground">{college.acceptance}</div>
                      </div>
                    </div>
                    {index === 1 ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-red-500" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          
          <motion.div
            variants={fadeUp}
            className="mt-8 glass-card rounded-2xl p-6 border border-border/60 bg-gradient-to-r from-orange-500/5 to-amber-500/5"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium">Most compared today</div>
                  <div className="text-lg font-bold text-foreground">IIT Delhi vs IIT Bombay</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">2,847</span>
                <span className="text-sm text-muted-foreground">students comparing</span>
              </div>
            </div>
          </motion.div>

          
          <motion.div
            variants={fadeUp}
            className="text-center mt-8"
          >
            <Link href="/compare">
              <Button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-6 text-base font-semibold shadow-lg hover:shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition-all">
                Compare More Colleges <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
