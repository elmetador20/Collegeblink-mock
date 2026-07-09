"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Award, MapPin, IndianRupee, Star, Swords, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const MUMBAI_COLLEGES = [
  {
    name: "Indian Institute of Technology (IIT) Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 3,
    avgPackage: 23.8,
    fees: 2.3,
    placementRate: 97,
    jeeAdvancedRank: 600,
    type: "Government",
    stream: "Engineering",
  },
  {
    name: "Narsee Monjee Institute of Management Studies (NMIMS)",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 20,
    avgPackage: 18.5,
    fees: 18.0,
    placementRate: 92,
    catPercentile: 95,
    type: "Private",
    stream: "MBA",
  },
  {
    name: "SP Jain Institute of Management and Research",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 18,
    avgPackage: 25.0,
    fees: 22.0,
    placementRate: 98,
    catPercentile: 96,
    type: "Private",
    stream: "MBA",
  },
  {
    name: "Institute of Chemical Technology (ICT)",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 25,
    avgPackage: 12.5,
    fees: 1.5,
    placementRate: 88,
    type: "Government",
    stream: "Engineering",
  },
  {
    name: "Jamnalal Bajaj Institute of Management Studies (JBIMS)",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 22,
    avgPackage: 22.0,
    fees: 0.8,
    placementRate: 96,
    catPercentile: 97,
    type: "Government",
    stream: "MBA",
  },
  {
    name: "Veermata Jijabai Technological Institute (VJTI)",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 60,
    avgPackage: 8.5,
    fees: 0.6,
    placementRate: 82,
    type: "Government",
    stream: "Engineering",
  },
  {
    name: "Sydenham College",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 35,
    avgPackage: 7.5,
    fees: 0.2,
    placementRate: 85,
    type: "Government",
    stream: "Commerce",
  },
  {
    name: "H.R. College of Commerce and Economics",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 40,
    avgPackage: 8.0,
    fees: 0.2,
    placementRate: 86,
    type: "Government",
    stream: "Commerce",
  },
  {
    name: "KJ Somaiya College of Engineering",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 70,
    avgPackage: 7.8,
    fees: 1.2,
    placementRate: 84,
    type: "Private",
    stream: "Engineering",
  },
  {
    name: "Dwarkadas J. Sanghvi College of Engineering",
    city: "Mumbai",
    state: "Maharashtra",
    nirfRank: 75,
    avgPackage: 7.2,
    fees: 1.0,
    placementRate: 83,
    type: "Private",
    stream: "Engineering",
  },
];

const ENGINEERING_COLLEGES = [
  {
    name: "Indian Institute of Technology (IIT) Bombay",
    nirfRank: 3,
    avgPackage: 23.8,
    fees: 2.3,
    placementRate: 97,
    jeeAdvancedRank: 600,
  },
  {
    name: "Institute of Chemical Technology (ICT)",
    nirfRank: 25,
    avgPackage: 12.5,
    fees: 1.5,
    placementRate: 88,
    admission: "JEE Main + MHT-CET",
  },
  {
    name: "Veermata Jijabai Technological Institute (VJTI)",
    nirfRank: 60,
    avgPackage: 8.5,
    fees: 0.6,
    placementRate: 82,
    admission: "MHT-CET",
  },
  {
    name: "KJ Somaiya College of Engineering",
    nirfRank: 70,
    avgPackage: 7.8,
    fees: 1.2,
    placementRate: 84,
    admission: "MHT-CET + JEE Main",
  },
];

const MBA_COLLEGES = [
  {
    name: "Narsee Monjee Institute of Management Studies (NMIMS)",
    nirfRank: 20,
    avgPackage: 18.5,
    fees: 18.0,
    placementRate: 92,
    admission: "NMAT + CAT",
  },
  {
    name: "SP Jain Institute of Management and Research",
    nirfRank: 18,
    avgPackage: 25.0,
    fees: 22.0,
    placementRate: 98,
    admission: "CAT + GD/PI",
  },
  {
    name: "Jamnalal Bajaj Institute of Management Studies (JBIMS)",
    nirfRank: 22,
    avgPackage: 22.0,
    fees: 0.8,
    placementRate: 96,
    admission: "CAT + MAH-CET",
  },
];

export default function TopCollegesMumbaiPage() {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="relative overflow-hidden bg-gradient-to-b from-cyan-950 via-background to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-cyan-500/20 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30 dark:border-cyan-500/30">
              Financial Capital of India
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
              Top Colleges in Mumbai 2026
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore the best educational institutions in India's financial capital. From IIT Bombay to NMIMS, find your perfect college in Mumbai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/colleges">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  <Swords className="h-5 w-5 mr-2" />
                  Compare Mumbai Colleges
                </Button>
              </Link>
              <div onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-modal"))}>
                <Button size="lg" variant="outline">
                  Get Personalized Matches
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="glass-card border-cyan-500/20">
            <CardContent className="p-6 text-center">
              <Building2 className="h-10 w-10 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">100+</div>
              <div className="text-sm text-muted-foreground">Colleges</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-blue-500/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">90%+</div>
              <div className="text-sm text-muted-foreground">Placement Rate</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-teal-500/20">
            <CardContent className="p-6 text-center">
              <Star className="h-10 w-10 text-teal-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">Finance Hub</div>
              <div className="text-sm text-muted-foreground">Opportunities</div>
            </CardContent>
          </Card>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Top Engineering Colleges in Mumbai
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Mumbai is home to IIT Bombay and several top engineering colleges. These institutions offer excellent placement opportunities in India's financial capital.
        </p>
        <div className="max-w-5xl mx-auto space-y-4">
          {ENGINEERING_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:border-cyan-500/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl ${
                            index === 0 ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white' : 'bg-muted'
                          }`}>
                            #{index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{college.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                              Engineering
                            </Badge>
                          </div>
                          {college.admission && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              Admission: {college.admission}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Avg Package</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.avgPackage} LPA
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Fees/Year</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.fees} Lakhs
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Placement</div>
                        <div className="font-semibold text-accent">{college.placementRate}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Top MBA Colleges in Mumbai
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Mumbai offers world-class MBA education with NMIMS, SP Jain, and JBIMS leading the pack. These colleges provide excellent placement opportunities in finance and consulting.
        </p>
        <div className="max-w-5xl mx-auto space-y-4">
          {MBA_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-gradient-to-r from-purple-500/20 to-pink-500/20 hover:border-purple-500/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl ${
                            index === 0 ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' : 'bg-muted'
                          }`}>
                            #{index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{college.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-500/20">
                              MBA
                            </Badge>
                          </div>
                          {college.admission && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              Admission: {college.admission}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Avg Package</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.avgPackage} LPA
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Fees/Year</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.fees} Lakhs
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Placement</div>
                        <div className="font-semibold text-accent">{college.placementRate}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Top 10 Colleges in Mumbai 2026
        </h2>
        <div className="max-w-5xl mx-auto space-y-4">
          {MUMBAI_COLLEGES.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-border/50 hover:border-cyan-500/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl ${
                            index < 2 ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white' : 'bg-muted'
                          }`}>
                            #{index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{college.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {college.city}, {college.state}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              NIRF #{college.nirfRank}
                            </Badge>
                            <Badge variant="outline" className={college.type === "Government" ? "bg-accent/10 text-accent border-accent/20" : "bg-purple-500/10 text-purple-400 border-purple-500/20"}>
                              {college.type}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                              {college.stream}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Avg Package</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.avgPackage} LPA
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Fees/Year</div>
                        <div className="font-semibold text-foreground flex items-center justify-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {college.fees} Lakhs
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Placement</div>
                        <div className="font-semibold text-accent">{college.placementRate}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-20">
        <Card className="glass-card border-gradient-to-r from-cyan-500/30 to-blue-500/30 overflow-hidden">
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Find Your Perfect College in Mumbai
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Mumbai offers unparalleled opportunities in finance, consulting, and entertainment. Use our Smart-powered comparison tool to find the college that matches your career goals.
            </p>
            <Link href="/colleges">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                <Swords className="h-5 w-5 mr-2" />
                Compare Mumbai Colleges Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What is the admission process for IIT Bombay?",
              a: "IIT Bombay admits students through JEE Advanced rank. You need to qualify JEE Main first, then appear for JEE Advanced. The cutoff rank is typically around 600 for general category.",
            },
            {
              q: "How do I get admission to NMIMS Mumbai?",
              a: "NMIMS admits students through NMAT (NMIMS Management Aptitude Test). They also accept CAT scores. The selection process includes group discussion and personal interview.",
            },
            {
              q: "Is Mumbai good for engineering?",
              a: "Absolutely! IIT Bombay is India's #3 engineering college. Mumbai also has ICT, VJTI, and several private engineering colleges with excellent placement records.",
            },
            {
              q: "What is the cost of living in Mumbai for students?",
              a: "Mumbai has high living costs. Hostel fees range from ₹1,00,000-2,00,000 per year. PG accommodation costs ₹20,000-35,000 per month including food and utilities.",
            },
          ].map((faq, index) => (
            <Card key={index} className="glass-card border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
