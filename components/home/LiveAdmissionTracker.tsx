"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, TrendingUp, MapPin, FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

interface DeadlineData {
  id: string;
  exam: string;
  deadline: string; // ISO datetime, e.g. "2026-06-21T14:00:00+05:30"
  applicantsToday: number;
  urgency: "critical" | "warning" | "safe";
  color: string;
  examTimings?: string;
  admitCardRelease?: string;
}

const mockDeadlines: DeadlineData[] = [
  {
    id: "1",
    exam: "NEET Re-Exam",
    deadline: "2026-06-21T14:00:00+05:30",
    applicantsToday: 2148,
    urgency: "warning",
    color: "yellow",
    examTimings: "02:00 PM to 05:15 PM (IST)",
    admitCardRelease: "Expected on or before June 14, 2026",
  },
];

interface TimeLeft {
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  expired: boolean;
}

function getTimeLeft(targetISO: string, now: number): TimeLeft {
  const diff = new Date(targetISO).getTime() - now;

  if (diff <= 0) {
    return { daysLeft: 0, hoursLeft: 0, minutesLeft: 0, expired: true };
  }

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const daysLeft = Math.floor(totalMinutes / (60 * 24));
  const hoursLeft = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutesLeft = totalMinutes % 60;

  return { daysLeft, hoursLeft, minutesLeft, expired: false };
}

export default function LiveAdmissionTracker() {
  const [deadlines] = useState<DeadlineData[]>(mockDeadlines);
  const [liveCounters, setLiveCounters] = useState<{ [key: string]: number }>({});
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounters((prev) => {
        const updated = { ...prev };
        deadlines.forEach((deadline) => {
          updated[deadline.id] = (prev[deadline.id] || deadline.applicantsToday) + Math.floor(Math.random() * 3);
        });
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [deadlines]);

  // Tick the countdown off the system clock
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getUrgencyBadge = (urgency: string, timeLeft: TimeLeft) => {
    if (timeLeft.expired) {
      return (
        <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">
          ⏰ Exam day is here
        </Badge>
      );
    }

    switch (urgency) {
      case "critical":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">
            🔥 Closing in {timeLeft.daysLeft} days
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20">
            ⚡ {timeLeft.daysLeft} days left
          </Badge>
        );
      case "safe":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">
            📅 {timeLeft.daysLeft} days
          </Badge>
        );
      default:
        return null;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "from-red-500/10 to-red-500/5 border-red-500/20";
      case "warning":
        return "from-yellow-500/10 to-yellow-500/5 border-yellow-500/20";
      case "safe":
        return "from-green-500/10 to-green-500/5 border-green-500/20";
      default:
        return "from-card to-card border-border/60";
    }
  };

  const getIconBg = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500/10";
      case "warning":
        return "bg-yellow-500/10";
      case "safe":
        return "bg-green-500/10";
      default:
        return "bg-primary/10";
    }
  };

  const getIconColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "safe":
        return "text-green-500";
      default:
        return "text-primary";
    }
  };

  const getBarColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "safe":
        return "bg-green-500";
      default:
        return "bg-primary";
    }
  };

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
            <Badge className="mb-4 rounded-full bg-orange-500/10 text-orange-500 border-orange-500/20 px-4 py-1.5 text-sm font-bold">
              🔥 Live Updates
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            NEET Re-Exam Deadline You Can't Miss
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-base md:text-lg">
            Track the re-exam countdown and key dates in real-time
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex"
        >
          {deadlines.map((deadline) => {
            const timeLeft = getTimeLeft(deadline.deadline, now);

            return (
              <motion.div key={deadline.id} variants={fadeUp} className="w-full">
                <div
                  className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${getUrgencyColor(
                    deadline.urgency
                  )} hover:shadow-xl hover:shadow-primary/5 transition-all duration-300`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_auto_1.35fr]">

                    {/* Left stub: countdown */}
                    <div className="p-8 lg:p-10 flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">
                          Re-Exam Countdown
                        </span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconBg(deadline.urgency)}`}>
                          <Clock className={`h-5 w-5 ${getIconColor(deadline.urgency)}`} />
                        </div>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                        {deadline.exam}
                      </h3>
                      <div className="mb-8">{getUrgencyBadge(deadline.urgency, timeLeft)}</div>

                      <div className="mt-auto grid grid-cols-3 gap-3">
                        <div className="bg-background/70 rounded-2xl p-4 text-center border border-border/40">
                          <div className="text-4xl md:text-5xl font-bold text-foreground tabular-nums">
                            {timeLeft.daysLeft}
                          </div>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">
                            Days
                          </div>
                        </div>
                        <div className="bg-background/70 rounded-2xl p-4 text-center border border-border/40">
                          <div className="text-4xl md:text-5xl font-bold text-foreground tabular-nums">
                            {timeLeft.hoursLeft}
                          </div>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">
                            Hours
                          </div>
                        </div>
                        <div className="bg-background/70 rounded-2xl p-4 text-center border border-border/40">
                          <div className="text-4xl md:text-5xl font-bold text-foreground tabular-nums">
                            {timeLeft.minutesLeft}
                          </div>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">
                            Mins
                          </div>
                        </div>
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

                    {/* Right stub: details */}
                    <div className="p-8 lg:p-10 flex flex-col">
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold mb-4">
                        Exam Details
                      </span>

                      <dl className="space-y-3 mb-6">
                        {deadline.examTimings && (
                          <div className="flex items-start gap-3 border-b border-border/40 pb-3">
                            <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <dt className="text-sm text-muted-foreground flex-1">Exam Timings</dt>
                            <dd className="text-sm font-semibold text-foreground text-right">
                              {deadline.examTimings}
                            </dd>
                          </div>
                        )}
                        {deadline.admitCardRelease && (
                          <div className="flex items-start gap-3">
                            <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <dt className="text-sm text-muted-foreground flex-1">Admit Card Release</dt>
                            <dd className="text-sm font-semibold text-foreground text-right">
                              {deadline.admitCardRelease}
                            </dd>
                          </div>
                        )}
                      </dl>

                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                            Live Activity
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-primary">
                            {liveCounters[deadline.id] || deadline.applicantsToday}
                          </span>
                          <span className="text-sm text-muted-foreground">candidates checked status today</span>
                        </div>
                        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.min((liveCounters[deadline.id] || deadline.applicantsToday) / 30, 100)}%`,
                            }}
                            transition={{ duration: 0.5 }}
                            className={`h-full ${getBarColor(deadline.urgency)}`}
                          />
                        </div>
                      </div>

                      <Link href={`/deadlines/${deadline.exam.toLowerCase().replace(/ /g, "-")}`} className="mt-auto">
                        <Button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-orange-500/25 transition-all">
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link href="/deadlines">
            <Button variant="outline" className="rounded-full px-8 py-6 text-base font-medium hover:bg-primary hover:text-white hover:border-primary transition-all">
              View All Deadlines <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}