"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, Calendar, ArrowRight, Bell, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "JEE Main 2026 Registration Opens Next Week",
    date: "April 28, 2026",
    category: "Exam Alert",
    description: "The National Testing Agency (NTA) is set to release the application forms for JEE Main Session 1 starting next Monday. Keep your documents ready.",
    priority: "High",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
  {
    id: 2,
    title: "New AI Shortlisting Feature is Now Live!",
    date: "April 26, 2026",
    category: "Platform Update",
    description: "Our Smart engine has been upgraded to provide 30% more accurate college matches based on previous year cutoff trends.",
    priority: "New",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
  },
  {
    id: 3,
    title: "VITEEE 2026 Slot Booking Started",
    date: "April 25, 2026",
    category: "Admission",
    description: "Vellore Institute of Technology has opened the Online Test Booking System (OTBS). Book your preferred exam date and center immediately.",
    priority: "Urgent",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  {
    id: 4,
    title: "Study Abroad: University of Melbourne Webinar",
    date: "May 2, 2026",
    category: "Webinar",
    description: "Join our exclusive session with university representatives to learn about scholarships and the 2026 application process for Australian universities.",
    priority: "Upcoming",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
];

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-background to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
              Stay Updated
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
              Live Announcements
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Real-time updates on entrance exams, admission deadlines, and platform features. Never miss a critical milestone in your career journey.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {ANNOUNCEMENTS.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-border/50 hover:border-indigo-500/30 transition-all overflow-hidden group">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className={announcement.bgColor + " md:w-2 flex flex-col justify-stretch"} />
                    <div className="p-6 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={"p-2 rounded-lg " + announcement.bgColor}>
                            <Megaphone className={"h-5 w-5 " + announcement.color} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                {announcement.category}
                              </span>
                              <Badge variant="outline" className={announcement.borderColor + " " + announcement.color + " text-[10px] font-bold"}>
                                {announcement.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {announcement.date}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-indigo-400 transition-colors">
                        {announcement.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {announcement.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <Button variant="link" className="p-0 h-auto text-indigo-400 hover:text-indigo-300 font-bold text-xs" asChild>
                          <Link href="#">
                            Read Full Details <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                        <div className="flex items-center gap-2">
                           <Button size="sm" variant="outline" className="h-8 text-[11px] rounded-full">
                            <Bell className="h-3 w-3 mr-1.5" /> Remind Me
                           </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subscription Section */}
      <div className="container mx-auto px-4 py-20">
        <Card className="glass-card border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="h-32 w-32 text-indigo-500" />
          </div>
          <CardContent className="p-12 text-center relative z-10">
            <Zap className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get Alerts Directly on Your Phone
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't want to check the website every day? Join our 50,000+ students on WhatsApp to get instant notifications about exam registrations, results, and admission news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-full px-8">
                Join WhatsApp Group
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Subscribe via Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
